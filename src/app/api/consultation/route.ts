import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import nodemailer from "nodemailer";

const COLLECTION = "consultations";

const SITE_TYPE_LABEL: Record<string, string> = {
  landing: "랜딩페이지",
  brand: "브랜드 사이트",
};

const CONCEPT_LABEL: Record<string, string> = {
  minimal: "심플/미니멀",
  modern: "모던/트렌디",
  premium: "고급/프리미엄",
  friendly: "친근/캐주얼",
  bold: "강렬/임팩트",
  natural: "자연/감성",
};

async function sendAdminNotification(data: Record<string, unknown>) {
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!gmailUser || !gmailPass || !adminEmail) {
    console.error("Email env vars missing:", { gmailUser: !!gmailUser, gmailPass: !!gmailPass, adminEmail: !!adminEmail });
    return;
  }

  const now = new Date();
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const timeStr = `${kst.getUTCFullYear()}.${String(kst.getUTCMonth() + 1).padStart(2, "0")}.${String(kst.getUTCDate()).padStart(2, "0")} ${String(kst.getUTCHours()).padStart(2, "0")}:${String(kst.getUTCMinutes()).padStart(2, "0")}`;

  const refLinks = (data.refLinks as string[] || []).filter((l: string) => l.trim());

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:520px;margin:0 auto;padding:24px">
      <div style="background:#4f46e5;color:#fff;padding:16px 20px;border-radius:12px 12px 0 0">
        <h2 style="margin:0;font-size:18px">📩 새 상담 신청이 접수되었습니다</h2>
        <p style="margin:4px 0 0;font-size:13px;opacity:0.85">${timeStr} (KST)</p>
      </div>
      <div style="background:#f9fafb;padding:20px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px">
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:8px 0;color:#6b7280;width:80px;vertical-align:top">유형</td><td style="padding:8px 0;color:#111827;font-weight:600">${SITE_TYPE_LABEL[data.siteType as string] || data.siteType}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;vertical-align:top">디자인</td><td style="padding:8px 0;color:#111827;font-weight:600">${CONCEPT_LABEL[data.designConcept as string] || data.designConcept}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;vertical-align:top">업종</td><td style="padding:8px 0;color:#111827">${data.industry}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;vertical-align:top">업체명</td><td style="padding:8px 0;color:#111827;font-weight:600">${data.company}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;vertical-align:top">이름</td><td style="padding:8px 0;color:#111827">${data.name}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;vertical-align:top">연락처</td><td style="padding:8px 0;color:#4f46e5;font-weight:600">${data.phone}</td></tr>
          ${data.purpose ? `<tr><td style="padding:8px 0;color:#6b7280;vertical-align:top">목적</td><td style="padding:8px 0;color:#111827">${data.purpose}</td></tr>` : ""}
          ${data.timeline ? `<tr><td style="padding:8px 0;color:#6b7280;vertical-align:top">희망일정</td><td style="padding:8px 0;color:#111827">${data.timeline}</td></tr>` : ""}
          ${refLinks.length > 0 ? `<tr><td style="padding:8px 0;color:#6b7280;vertical-align:top">참고링크</td><td style="padding:8px 0;color:#4f46e5">${refLinks.map((l: string) => `<a href="${l}" style="color:#4f46e5;display:block">${l}</a>`).join("")}</td></tr>` : ""}
          ${data.extra ? `<tr><td style="padding:8px 0;color:#6b7280;vertical-align:top">추가요청</td><td style="padding:8px 0;color:#111827;white-space:pre-wrap">${data.extra}</td></tr>` : ""}
        </table>
        <div style="margin-top:16px;text-align:center">
          <a href="https://landingpick.co.kr/admin" style="display:inline-block;background:#4f46e5;color:#fff;padding:10px 24px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600">관리자 페이지에서 확인하기</a>
        </div>
      </div>
    </div>
  `;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailPass },
    });

    const info = await transporter.sendMail({
      from: `"랜딩픽 알림" <${gmailUser}>`,
      to: adminEmail,
      subject: `[랜딩픽] 새 상담 신청 — ${data.company} (${data.name})`,
      html,
    });
    console.log("Admin notification sent:", info.messageId);
  } catch (err) {
    console.error("Failed to send admin notification email:", err);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { siteType, designConcept, industry, company, name, phone } = body;

    if (!siteType || !designConcept || !industry?.trim() || !company?.trim() || !name?.trim() || !phone?.trim()) {
      return NextResponse.json(
        { error: "필수 항목을 모두 입력해주세요." },
        { status: 400 }
      );
    }

    const saveData = {
      siteType: body.siteType,
      designConcept: body.designConcept,
      industry: body.industry,
      company: body.company,
      name: body.name,
      phone: body.phone,
      refLinks: body.refLinks || ["", "", ""],
      purpose: body.purpose || "",
      timeline: body.timeline || "",
      extra: body.extra || "",
      status: "new",
    };

    const docRef = await addDoc(collection(db, COLLECTION), {
      ...saveData,
      createdAt: serverTimestamp(),
    });

    // Send email notification (non-blocking)
    sendAdminNotification(saveData);

    return NextResponse.json({ id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error("Failed to save consultation:", error);
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
    const q = query(
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
    console.error("Failed to fetch consultations:", error);
    return NextResponse.json(
      { error: "데이터를 불러오는데 실패했습니다." },
      { status: 500 }
    );
  }
}
