import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

interface PageviewDoc {
  path: string;
  ref: string;
  device: string;
  ts: string | null;
  vid?: string;
  sid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

const KST_OFFSET = 9 * 60 * 60 * 1000; // UTC+9

function toKSTDateStr(d: Date): string {
  const kst = new Date(d.getTime() + KST_OFFSET);
  return `${kst.getUTCFullYear()}-${String(kst.getUTCMonth() + 1).padStart(2, "0")}-${String(kst.getUTCDate()).padStart(2, "0")}`;
}

function toKSTHour(d: Date): number {
  const kst = new Date(d.getTime() + KST_OFFSET);
  return kst.getUTCHours();
}

function getKSTTodayStart(): Date {
  const now = new Date();
  const kst = new Date(now.getTime() + KST_OFFSET);
  const kstMidnight = new Date(Date.UTC(kst.getUTCFullYear(), kst.getUTCMonth(), kst.getUTCDate()));
  return new Date(kstMidnight.getTime() - KST_OFFSET);
}

export async function GET(req: NextRequest) {
  const session = req.cookies.get("admin_session")?.value;
  if (session !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const url = new URL(req.url);
    const now = new Date();
    const todayStart = getKSTTodayStart();

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

    const { data: rows, error } = await supabase
      .from("pageviews")
      .select("*")
      .gte("ts", fromDate.toISOString())
      .lte("ts", toDate.toISOString())
      .order("ts", { ascending: false });

    if (error) throw error;

    const docs: PageviewDoc[] = (rows || []).map((row) => ({
      path: row.path,
      ref: row.ref,
      device: row.device,
      ts: row.ts,
      vid: row.vid,
      sid: row.sid,
      utm_source: row.utm_source,
      utm_medium: row.utm_medium,
      utm_campaign: row.utm_campaign,
    }));

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
      if (!doc.ts) continue;
      const ts = new Date(doc.ts);

      const dateStr = toKSTDateStr(ts);

      if (!dailyCounts[dateStr]) {
        dailyCounts[dateStr] = { views: 0, visitors: new Set() };
      }
      dailyCounts[dateStr].views++;
      if (doc.vid) dailyCounts[dateStr].visitors.add(doc.vid);

      if (ts >= todayStart) todayViews++;
      if (ts >= weekStart) weekViews++;

      if (doc.vid) uniqueVisitors.add(doc.vid);
      if (doc.sid) uniqueSessions.add(doc.sid);

      pageCounts[doc.path] = (pageCounts[doc.path] || 0) + 1;
      refCounts[doc.ref] = (refCounts[doc.ref] || 0) + 1;

      if (doc.device === "mobile" || doc.device === "desktop") {
        deviceCounts[doc.device]++;
      }

      if (doc.utm_source) {
        utmSources[doc.utm_source] = (utmSources[doc.utm_source] || 0) + 1;
      }
      if (doc.utm_campaign) {
        utmCampaigns[doc.utm_campaign] = (utmCampaigns[doc.utm_campaign] || 0) + 1;
      }
    }

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
      const dateStr = toKSTDateStr(d);
      const dayData = dailyCounts[dateStr];
      daily.push({
        date: dateStr,
        views: dayData?.views || 0,
        visitors: dayData?.visitors.size || 0,
      });
    }

    const hourlyCounts: Record<number, { views: number; visitors: Set<string> }> = {};
    for (let h = 0; h < 24; h++) {
      hourlyCounts[h] = { views: 0, visitors: new Set() };
    }
    for (const doc of docs) {
      if (!doc.ts) continue;
      const ts = new Date(doc.ts);
      if (ts < todayStart) continue;
      const hour = toKSTHour(ts);
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
