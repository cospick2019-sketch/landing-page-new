import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query as firestoreQuery,
  where,
  orderBy,
  limit,
  serverTimestamp,
} from "firebase/firestore";
import nodemailer from "nodemailer";

const COLLECTION = "intakes";

async function sendAdminNotification(data: Record<string, unknown>) {
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!gmailUser || !gmailPass || !adminEmail) return;

  const now = new Date();
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const timeStr = `${kst.getUTCFullYear()}.${String(kst.getUTCMonth() + 1).padStart(2, "0")}.${String(kst.getUTCDate()).padStart(2, "0")} ${String(kst.getUTCHours()).padStart(2, "0")}:${String(kst.getUTCMinutes()).padStart(2, "0")}`;

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:520px;margin:0 auto;padding:24px">
      <div style="background:#059669;color:#fff;padding:16px 20px;border-radius:12px 12px 0 0">
        <h2 style="margin:0;font-size:18px">📋 새 사전 확인서가 접수되었습니다</h2>
        <p style="margin:4px 0 0;font-size:13px;opacity:0.85">${timeStr} (KST)</p>
      </div>
      <div style="background:#f9fafb;padding:20px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px">
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:8px 0;color:#6b7280;width:80px;vertical-align:top">이름</td><td style="padding:8px 0;color:#111827;font-weight:600">${data.name}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;vertical-align:top">연락처</td><td style="padding:8px 0;color:#059669;font-weight:600">${data.phone}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;vertical-align:top">핵심 상품</td><td style="padding:8px 0;color:#111827">${data.productDetail || "-"}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;vertical-align:top">타겟 고객</td><td style="padding:8px 0;color:#111827">${data.targetCustomer || "-"}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;vertical-align:top">페이지 수</td><td style="padding:8px 0;color:#111827">${data.pageCount || "-"}</td></tr>
        </table>
        <div style="margin-top:16px;text-align:center">
          <a href="https://landing-pick.vercel.app/admin" style="display:inline-block;background:#059669;color:#fff;padding:10px 24px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600">관리자 페이지에서 확인하기</a>
        </div>
      </div>
    </div>
  `;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailPass },
    });

    await transporter.sendMail({
      from: `"랜딩픽 알림" <${gmailUser}>`,
      to: adminEmail,
      subject: `[랜딩픽] 새 사전 확인서 — ${data.name} (${data.phone})`,
      html,
    });
  } catch (err) {
    console.error("Failed to send intake notification email:", err);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone } = body;

    if (!name?.trim() || !phone?.trim()) {
      return NextResponse.json(
        { error: "성함과 연락처는 필수입니다." },
        { status: 400 }
      );
    }

    // Try to match with existing consultation by phone number
    let consultationId: string | null = null;
    try {
      const normalizedPhone = phone.replace(/[^0-9]/g, "");
      const q = firestoreQuery(
        collection(db, "consultations"),
        where("phone", "==", normalizedPhone),
        orderBy("createdAt", "desc"),
        limit(1)
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        consultationId = snapshot.docs[0].id;
      }
    } catch {
      // Matching is optional, continue without it
    }

    const saveData = {
      name: body.name,
      phone: body.phone.replace(/[^0-9]/g, ""),
      consultationId,
      productDetail: body.productDetail || "",
      targetCustomer: body.targetCustomer || "",
      refSites: (body.refSites || []).filter((s: string) => s.trim()),
      desiredActions: body.desiredActions || [],
      existingWebsite: body.existingWebsite || "",
      pageCount: body.pageCount || "",
      sections: body.sections || [],
      requiredFeatures: body.requiredFeatures || [],
      additionalFeatures: body.additionalFeatures || [],
      brandColor: body.brandColor || "",
      hasLogo: body.hasLogo || "",
      copywriting: body.copywriting || "",
      hasAssets: body.hasAssets || "",
      status: "new",
    };

    const docRef = await addDoc(collection(db, COLLECTION), {
      ...saveData,
      createdAt: serverTimestamp(),
    });

    await sendAdminNotification(saveData);

    return NextResponse.json({ id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error("Failed to save intake:", error);
    return NextResponse.json(
      { error: "저장에 실패했습니다." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const session = request.cookies.get("admin_session")?.value;
  if (session !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const q = firestoreQuery(
      collection(db, COLLECTION),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() ?? null,
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch intakes:", error);
    return NextResponse.json(
      { error: "데이터를 불러오는데 실패했습니다." },
      { status: 500 }
    );
  }
}
