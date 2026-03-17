import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

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

    const doc: Record<string, unknown> = {
      path,
      ref: refSource,
      device: isMobile ? "mobile" : "desktop",
      ts: serverTimestamp(),
    };

    if (vid) doc.vid = vid;
    if (sid) doc.sid = sid;
    if (utm_source) doc.utm_source = utm_source;
    if (utm_medium) doc.utm_medium = utm_medium;
    if (utm_campaign) doc.utm_campaign = utm_campaign;
    if (utm_term) doc.utm_term = utm_term;
    if (utm_content) doc.utm_content = utm_content;

    await addDoc(collection(db, "pageviews"), doc);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Track error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
