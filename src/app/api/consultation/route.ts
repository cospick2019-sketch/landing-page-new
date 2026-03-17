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

const COLLECTION = "consultations";

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

    const docRef = await addDoc(collection(db, COLLECTION), {
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
      createdAt: serverTimestamp(),
    });

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
