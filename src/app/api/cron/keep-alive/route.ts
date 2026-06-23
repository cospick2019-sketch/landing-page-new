import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Supabase 무료 플랜은 약 1주일간 활동이 없으면 DB를 자동 일시정지합니다.
// 이 라우트는 Vercel Cron이 매일 호출하여 가벼운 조회로 DB를 깨어 있게 유지합니다.
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  // CRON_SECRET이 설정돼 있으면 Vercel Cron 호출만 허용
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const { error } = await supabase
      .from("pageviews")
      .select("*", { count: "exact", head: true });

    if (error) throw error;

    return NextResponse.json({ ok: true, ts: new Date().toISOString() });
  } catch (error) {
    console.error("Keep-alive error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
