import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

const COLLECTION = "consultations";

function isAuthenticated(request: NextRequest) {
  return request.cookies.get("admin_session")?.value === "authenticated";
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const validStatuses = ["new", "intake-sent", "quote-sent", "contracted", "in-progress", "done", "cancelled", "on-hold", "contacted", "completed"];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "유효하지 않은 상태입니다." },
        { status: 400 }
      );
    }

    await updateDoc(doc(db, COLLECTION, id), { status });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update consultation:", error);
    return NextResponse.json(
      { error: "업데이트에 실패했습니다." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await deleteDoc(doc(db, COLLECTION, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete consultation:", error);
    return NextResponse.json(
      { error: "삭제에 실패했습니다." },
      { status: 500 }
    );
  }
}
