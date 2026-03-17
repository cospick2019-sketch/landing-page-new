import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
  orderBy,
} from "firebase/firestore";

interface PageviewDoc {
  path: string;
  ref: string;
  device: string;
  ts: Date | undefined;
  vid?: string;
  sid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

function toDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export async function GET(req: NextRequest) {
  const session = req.cookies.get("admin_session")?.value;
  if (session !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const url = new URL(req.url);
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Parse date range from query params
    const fromParam = url.searchParams.get("from");
    const toParam = url.searchParams.get("to");

    let fromDate: Date;
    let toDate: Date;

    if (fromParam) {
      fromDate = new Date(fromParam);
      fromDate.setHours(0, 0, 0, 0);
    } else {
      fromDate = new Date(todayStart);
      fromDate.setDate(fromDate.getDate() - 30);
    }

    if (toParam) {
      toDate = new Date(toParam);
      toDate.setHours(23, 59, 59, 999);
    } else {
      toDate = new Date(now);
    }

    const q = query(
      collection(db, "pageviews"),
      where("ts", ">=", Timestamp.fromDate(fromDate)),
      where("ts", "<=", Timestamp.fromDate(toDate)),
      orderBy("ts", "desc")
    );

    const snap = await getDocs(q);
    const docs: PageviewDoc[] = snap.docs.map((d) => {
      const data = d.data();
      return {
        path: data.path as string,
        ref: data.ref as string,
        device: data.device as string,
        ts: data.ts?.toDate?.() as Date | undefined,
        vid: data.vid as string | undefined,
        sid: data.sid as string | undefined,
        utm_source: data.utm_source as string | undefined,
        utm_medium: data.utm_medium as string | undefined,
        utm_campaign: data.utm_campaign as string | undefined,
      };
    });

    const weekStart = new Date(todayStart);
    weekStart.setDate(weekStart.getDate() - 7);

    let todayViews = 0;
    let weekViews = 0;
    const uniqueVisitors = new Set<string>();
    const uniqueSessions = new Set<string>();
    const dailyCounts: Record<string, { views: number; visitors: Set<string> }> = {};
    const pageCounts: Record<string, number> = {};
    const refCounts: Record<string, number> = {};
    const deviceCounts: Record<string, number> = { mobile: 0, desktop: 0 };
    const utmSources: Record<string, number> = {};
    const utmCampaigns: Record<string, number> = {};

    for (const doc of docs) {
      const ts = doc.ts;
      if (!ts) continue;

      const dateStr = toDateStr(ts);

      // Daily
      if (!dailyCounts[dateStr]) {
        dailyCounts[dateStr] = { views: 0, visitors: new Set() };
      }
      dailyCounts[dateStr].views++;
      if (doc.vid) dailyCounts[dateStr].visitors.add(doc.vid);

      // Today / Week
      if (ts >= todayStart) todayViews++;
      if (ts >= weekStart) weekViews++;

      // Unique
      if (doc.vid) uniqueVisitors.add(doc.vid);
      if (doc.sid) uniqueSessions.add(doc.sid);

      // Pages
      pageCounts[doc.path] = (pageCounts[doc.path] || 0) + 1;

      // Referrers
      refCounts[doc.ref] = (refCounts[doc.ref] || 0) + 1;

      // Devices
      if (doc.device === "mobile" || doc.device === "desktop") {
        deviceCounts[doc.device]++;
      }

      // UTM
      if (doc.utm_source) {
        utmSources[doc.utm_source] = (utmSources[doc.utm_source] || 0) + 1;
      }
      if (doc.utm_campaign) {
        utmCampaigns[doc.utm_campaign] = (utmCampaigns[doc.utm_campaign] || 0) + 1;
      }
    }

    // Build daily array for the full date range
    const daily = [];
    const dayMs = 86400000;
    const rangeStart = new Date(fromDate);
    rangeStart.setHours(0, 0, 0, 0);
    const rangeEnd = new Date(toDate);
    rangeEnd.setHours(0, 0, 0, 0);
    const totalDays = Math.round((rangeEnd.getTime() - rangeStart.getTime()) / dayMs) + 1;

    for (let i = 0; i < totalDays; i++) {
      const d = new Date(rangeStart);
      d.setDate(d.getDate() + i);
      const dateStr = toDateStr(d);
      const dayData = dailyCounts[dateStr];
      daily.push({
        date: dateStr,
        views: dayData?.views || 0,
        visitors: dayData?.visitors.size || 0,
      });
    }

    // Build hourly array for today
    const hourlyCounts: Record<number, { views: number; visitors: Set<string> }> = {};
    for (let h = 0; h < 24; h++) {
      hourlyCounts[h] = { views: 0, visitors: new Set() };
    }
    for (const doc of docs) {
      const ts = doc.ts;
      if (!ts || ts < todayStart) continue;
      const hour = ts.getHours();
      hourlyCounts[hour].views++;
      if (doc.vid) hourlyCounts[hour].visitors.add(doc.vid);
    }
    const hourly = Array.from({ length: 24 }, (_, h) => ({
      hour: h,
      label: `${String(h).padStart(2, "0")}시`,
      views: hourlyCounts[h].views,
      visitors: hourlyCounts[h].visitors.size,
    }));

    const topPages = Object.entries(pageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([path, views]) => ({ path, views }));

    const topReferrers = Object.entries(refCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([source, views]) => ({ source, views }));

    const topUtmSources = Object.entries(utmSources)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([source, views]) => ({ source, views }));

    const topUtmCampaigns = Object.entries(utmCampaigns)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([campaign, views]) => ({ campaign, views }));

    return NextResponse.json({
      today: todayViews,
      week: weekViews,
      total: docs.length,
      uniqueVisitors: uniqueVisitors.size,
      uniqueSessions: uniqueSessions.size,
      daily,
      hourly,
      topPages,
      topReferrers,
      topUtmSources,
      topUtmCampaigns,
      devices: deviceCounts,
    });
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
