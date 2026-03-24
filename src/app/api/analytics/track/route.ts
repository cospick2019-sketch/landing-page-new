import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { path, referrer, vid, sid, utm_source, utm_medium, utm_campaign, utm_term, utm_content } = body;
    if (!path) return NextResponse.json({ error: "Missing path" }, { status: 400 });

    const ua = req.headers.get("user-agent") || "";

    // Skip bots
    if (/bot|crawler|spider|scraper|lighthouse|pingdom|uptimerobot/i.test(ua)) {
      return NextResponse.json({ ok: true });
    }

    const isMobile = /mobile|android|iphone|ipad/i.test(ua);

    // Parse referrer
    let refSource = "direct";
    if (referrer) {
      try {
        const refUrl = new URL(referrer);
        const reqHost = (req.headers.get("host") || "").split(":")[0];
        if (refUrl.hostname !== reqHost && refUrl.hostname !== "localhost") {
          refSource = refUrl.hostname;
        }
      } catch {
        // Invalid URL
      }
    }

    const row: Record<string, unknown> = {
      path,
      ref: refSource,
      device: isMobile ? "mobile" : "desktop",
    };

    if (vid) row.vid = vid;
    if (sid) row.sid = sid;
    if (utm_source) row.utm_source = utm_source;
    if (utm_medium) row.utm_medium = utm_medium;
    if (utm_campaign) row.utm_campaign = utm_campaign;
    if (utm_term) row.utm_term = utm_term;
    if (utm_content) row.utm_content = utm_content;

    const { error } = await supabase.from("pageviews").insert(row);
    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Track error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
