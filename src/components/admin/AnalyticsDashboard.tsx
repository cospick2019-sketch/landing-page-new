"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { 
  Calendar, RefreshCw, Eye, Users, MousePointerClick, Activity,
  FileText, Globe, Link as LinkIcon, Smartphone, Monitor
} from "lucide-react";

interface DailyData {
  date: string;
  views: number;
  visitors: number;
}

interface AnalyticsData {
  today: number;
  week: number;
  total: number;
  uniqueVisitors: number;
  uniqueSessions: number;
  daily: DailyData[];
  topPages: { path: string; views: number }[];
  topReferrers: { source: string; views: number }[];
  topUtmSources: { source: string; views: number }[];
  topUtmCampaigns: { campaign: string; views: number }[];
  devices: { mobile: number; desktop: number };
}

const PAGE_NAMES: Record<string, string> = {
  "/": "홈",
  "/pricing": "가격 안내",
  "/portfolio": "포트폴리오",
  "/terms": "이용약관",
  "/privacy": "개인정보처리방침",
};

const REF_NAMES: Record<string, string> = {
  direct: "직접 방문",
  "www.google.com": "Google",
  "search.naver.com": "Naver",
  "m.search.naver.com": "Naver (모바일)",
  "www.google.co.kr": "Google (한국)",
  "m.facebook.com": "Facebook",
  "www.facebook.com": "Facebook",
  "t.co": "Twitter/X",
  "www.instagram.com": "Instagram",
  "l.instagram.com": "Instagram",
};

type PresetKey = "today" | "7d" | "30d" | "90d" | "custom";

const AUTO_REFRESH_MS = 60_000; // 1분

function formatDateInput(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function formatDateTime(d: Date): string {
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  return `${mm}.${dd} ${hh}:${mi}:${ss}`;
}

function getPresetRange(key: PresetKey): { from: string; to: string } {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const to = formatDateInput(today);

  switch (key) {
    case "today":
      return { from: to, to };
    case "7d": {
      const d = new Date(today);
      d.setDate(d.getDate() - 6);
      return { from: formatDateInput(d), to };
    }
    case "30d": {
      const d = new Date(today);
      d.setDate(d.getDate() - 29);
      return { from: formatDateInput(d), to };
    }
    case "90d": {
      const d = new Date(today);
      d.setDate(d.getDate() - 89);
      return { from: formatDateInput(d), to };
    }
    default:
      return { from: formatDateInput(today), to };
  }
}

const PRESETS: { key: PresetKey; label: string }[] = [
  { key: "today", label: "오늘" },
  { key: "7d", label: "7일" },
  { key: "30d", label: "30일" },
  { key: "90d", label: "90일" },
  { key: "custom", label: "직접 선택" },
];

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activePreset, setActivePreset] = useState<PresetKey>("7d");
  const [dateRange, setDateRange] = useState(getPresetRange("7d"));
  const [customFrom, setCustomFrom] = useState(dateRange.from);
  const [customTo, setCustomTo] = useState(dateRange.to);
  const [chartMode, setChartMode] = useState<"views" | "visitors">("views");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchAnalytics = useCallback(
    async (from: string, to: string, isManual = false) => {
      setLoading(true);
      if (isManual) setRefreshing(true);

      const minDelay = isManual
        ? new Promise((r) => setTimeout(r, 600))
        : Promise.resolve();

      try {
        const [res] = await Promise.all([
          fetch(`/api/admin/analytics?from=${from}&to=${to}`),
          minDelay,
        ]);
        if (res.ok) {
          setData(await res.json());
          setLastUpdated(new Date());
        }
      } catch {
        console.error("Failed to fetch analytics");
      } finally {
        setLoading(false);
        if (isManual) setRefreshing(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchAnalytics(dateRange.from, dateRange.to);

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      fetchAnalytics(dateRange.from, dateRange.to);
    }, AUTO_REFRESH_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [dateRange, fetchAnalytics]);

  const handleRefresh = () => {
    fetchAnalytics(dateRange.from, dateRange.to, true);
  };

  const handlePreset = (key: PresetKey) => {
    setActivePreset(key);
    if (key !== "custom") {
      const range = getPresetRange(key);
      setDateRange(range);
      setCustomFrom(range.from);
      setCustomTo(range.to);
    }
  };

  const applyCustomRange = () => {
    if (customFrom && customTo) {
      setDateRange({ from: customFrom, to: customTo });
    }
  };

  if (loading && !data) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-400">
        <RefreshCw className="w-8 h-8 animate-spin text-indigo-500 mb-4" />
        <p className="text-sm font-medium">통계를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-400">
        <Activity className="w-8 h-8 text-red-400 mb-4" />
        <p className="text-sm font-medium">통계를 불러올 수 없습니다.</p>
      </div>
    );
  }

  const maxDaily = Math.max(
    ...data.daily.map((d) =>
      chartMode === "views" ? d.views : d.visitors
    ),
    1
  );
  const totalDevices = data.devices.mobile + data.devices.desktop;
  const mobilePercent =
    totalDevices > 0
      ? Math.round((data.devices.mobile / totalDevices) * 100)
      : 0;

  const showEveryN =
    data.daily.length > 31 ? 7 : data.daily.length > 14 ? 3 : 1;

  const statCards = [
    {
      label: "총 조회수",
      value: data.total,
      desc: "선택 기간 내 전체 페이지 열람",
      icon: Eye,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "순 방문자",
      value: data.uniqueVisitors,
      desc: "고유 브라우저 기준 방문자",
      icon: Users,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      label: "세션 수",
      value: data.uniqueSessions,
      desc: "새로운 브라우저 탭 방문",
      icon: Activity,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      label: "인당 조회수",
      value: data.uniqueVisitors > 0 ? (data.total / data.uniqueVisitors).toFixed(1) : "-",
      desc: "방문자 1명당 평균 조회 페이지",
      icon: MousePointerClick,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 md:p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-gray-50 rounded-lg w-fit border border-gray-100">
            {PRESETS.map((p) => (
              <button
                key={p.key}
                onClick={() => handlePreset(p.key)}
                className={cn(
                  "px-3 py-1.5 text-sm font-semibold rounded-md transition-all duration-200",
                  activePreset === p.key
                    ? "bg-white text-indigo-600 shadow-sm ring-1 ring-black/5"
                    : "text-gray-500 hover:text-gray-900 hover:bg-white/60"
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-3">
            {lastUpdated && (
              <span className="text-[11px] font-medium text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">
                {formatDateTime(lastUpdated)} 갱신
              </span>
            )}
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed",
                refreshing
                  ? "bg-indigo-50 text-indigo-600 border border-indigo-200"
                  : "text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
              )}
            >
              <RefreshCw className={cn("w-4 h-4 transition-transform", refreshing && "animate-spin")} />
              {refreshing ? "갱신 중..." : "새로고침"}
            </button>
          </div>
        </div>

        <p className="text-[11px] text-gray-400 mt-3">
          1분 간격으로 자동 갱신됩니다. 이 통계는 사이트 자체 수집 데이터이며 Google Analytics와 별도로 집계됩니다.
        </p>

        {activePreset === "custom" && (
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-gray-100">
            <div className="relative flex items-center">
              <Calendar className="absolute left-3 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={customFrom}
                onChange={(e) => setCustomFrom(e.target.value)}
                className="h-10 pl-9 pr-3 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
            <span className="text-gray-400 font-medium">~</span>
            <div className="relative flex items-center">
              <Calendar className="absolute left-3 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={customTo}
                onChange={(e) => setCustomTo(e.target.value)}
                className="h-10 pl-9 pr-3 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
            <button
              onClick={applyCustomRange}
              className="h-10 px-6 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-colors shadow-sm"
            >
              조회하기
            </button>
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-2xl border border-gray-100 p-4 md:p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                  <h4 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                    {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
                  </h4>
                </div>
                <div className={cn("p-2 md:p-3 rounded-xl", stat.bgColor, stat.color)}>
                  <Icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />
                </div>
              </div>
              <p className="mt-3 text-[10px] md:text-xs font-medium text-gray-400 border-t border-gray-50 pt-2.5">
                {stat.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Daily Chart */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 md:p-6 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm md:text-base font-bold text-gray-900">방문자 추이</h3>
            <p className="text-xs md:text-sm text-gray-500 mt-0.5">일별 {chartMode === "views" ? "조회수" : "순 방문자"} 현황</p>
          </div>
          <div className="flex p-1 bg-gray-50 rounded-lg border border-gray-100">
            <button
              onClick={() => setChartMode("views")}
              className={cn(
                "px-3 py-1 text-xs md:text-sm font-semibold rounded-md transition-all",
                chartMode === "views"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              )}
            >
              조회수
            </button>
            <button
              onClick={() => setChartMode("visitors")}
              className={cn(
                "px-3 py-1 text-xs md:text-sm font-semibold rounded-md transition-all",
                chartMode === "visitors"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              )}
            >
              방문자
            </button>
          </div>
        </div>

        {data.daily.length === 0 ? (
          <div className="h-48 flex flex-col items-center justify-center text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <Activity className="w-6 h-6 mb-2 opacity-50" />
            <p className="text-sm font-medium">데이터 없음</p>
          </div>
        ) : (() => {
          const barColor = chartMode === "views" ? "#818cf8" : "#6ee7b7";
          const lineColor = chartMode === "views" ? "#4f46e5" : "#059669";
          const dotColor = chartMode === "views" ? "#4f46e5" : "#059669";
          const areaColor = chartMode === "views" ? "rgba(79,70,229,0.08)" : "rgba(5,150,105,0.08)";

          return (
          <div>
            {/* Chart */}
            <div className="relative h-56 md:h-[280px]">
              {/* Y-axis grid lines */}
              {[0, 25, 50, 75, 100].map((pct) => (
                <div
                  key={pct}
                  className="absolute left-8 md:left-10 right-0 border-t border-gray-100"
                  style={{ bottom: `${pct}%` }}
                >
                  <span className="absolute -top-2.5 right-full mr-1.5 text-[9px] font-medium text-gray-300 tabular-nums whitespace-nowrap">
                    {Math.round((maxDaily * pct) / 100).toLocaleString()}
                  </span>
                </div>
              ))}

              {/* SVG line + area + dots overlay */}
              <svg
                className="absolute left-8 md:left-10 right-0 top-0 bottom-0 overflow-visible"
                preserveAspectRatio="none"
                style={{ width: "calc(100% - 2rem)", height: "100%" }}
              >
                {/* Area fill under line */}
                <polygon
                  points={
                    data.daily
                      .map((d, i) => {
                        const val = chartMode === "views" ? d.views : d.visitors;
                        const x = data.daily.length === 1 ? 50 : (i / (data.daily.length - 1)) * 100;
                        const y = 100 - (val / maxDaily) * 100;
                        return `${x}%,${y}%`;
                      })
                      .join(" ") +
                    ` 100%,100% 0%,100%`
                  }
                  fill={areaColor}
                />
                {/* Line */}
                <polyline
                  points={data.daily
                    .map((d, i) => {
                      const val = chartMode === "views" ? d.views : d.visitors;
                      const x = data.daily.length === 1 ? 50 : (i / (data.daily.length - 1)) * 100;
                      const y = 100 - (val / maxDaily) * 100;
                      return `${x}%,${y}%`;
                    })
                    .join(" ")}
                  fill="none"
                  stroke={lineColor}
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {/* Bars + Dots + Tooltips (HTML for hover) */}
              <div className="absolute left-8 md:left-10 right-0 top-0 bottom-0 flex items-end">
                {data.daily.map((d, i) => {
                  const val = chartMode === "views" ? d.views : d.visitors;
                  const heightPercent = (val / maxDaily) * 100;

                  return (
                    <div
                      key={d.date}
                      className="flex-1 h-full flex flex-col items-center justify-end min-w-0 group relative"
                    >
                      {/* Tooltip */}
                      <div
                        className="absolute z-20 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none"
                        style={{ bottom: `${Math.max(heightPercent, 4) + 4}%` }}
                      >
                        <div className="bg-gray-900 text-white text-[10px] md:text-xs font-bold px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap text-center">
                          {val.toLocaleString()}
                          <span className="block text-[9px] font-medium text-gray-400 mt-0.5">
                            {d.date.slice(5).replace("-", "/")}
                          </span>
                        </div>
                        <div className="w-2 h-2 bg-gray-900 rotate-45 mx-auto -mt-1" />
                      </div>

                      {/* Dot at top */}
                      <div
                        className="absolute w-2 h-2 md:w-2.5 md:h-2.5 rounded-full z-10 transition-transform duration-200 group-hover:scale-150 border-2 border-white"
                        style={{
                          bottom: `${(val / maxDaily) * 100}%`,
                          backgroundColor: dotColor,
                          transform: "translateY(50%)",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
                        }}
                      />

                      {/* Bar */}
                      <div
                        className="w-[40%] max-w-[12px] rounded-t-sm transition-all duration-300 group-hover:opacity-80"
                        style={{
                          height: `${Math.max(heightPercent, val > 0 ? 3 : 0)}%`,
                          backgroundColor: val > 0 ? barColor : "transparent",
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* X-axis labels */}
            <div className="flex pl-8 md:pl-10 mt-2 border-t border-gray-100 pt-2">
              {data.daily.map((d, i) => (
                <div key={d.date} className="flex-1 min-w-0 text-center">
                  {(i % showEveryN === 0 || i === data.daily.length - 1) && (
                    <span className="text-[8px] sm:text-[10px] font-medium text-gray-400">
                      {d.date.slice(5).replace("-", "/")}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          );
        })()}
      </div>

      {/* Lists Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {/* Top Pages */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 md:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
              <FileText className="w-4 h-4" />
            </div>
            <h3 className="text-sm md:text-base font-bold text-gray-900">인기 페이지</h3>
          </div>

          {data.topPages.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">데이터 없음</p>
          ) : (
            <div className="space-y-3">
              {data.topPages.map((p, i) => (
                <div key={p.path} className="flex items-center gap-2.5">
                  <span className={cn(
                    "w-5 text-center text-xs font-bold shrink-0",
                    i === 0 ? "text-blue-600" : "text-gray-400"
                  )}>
                    {i + 1}
                  </span>
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-sm font-medium text-gray-700 truncate pr-2">
                        {PAGE_NAMES[p.path] || p.path}
                      </span>
                      <span className="text-sm font-bold text-gray-900 tabular-nums shrink-0">
                        {p.views.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${(p.views / (data.topPages[0]?.views || 1)) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Referrers */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 md:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
              <Globe className="w-4 h-4" />
            </div>
            <h3 className="text-sm md:text-base font-bold text-gray-900">유입 경로</h3>
          </div>

          {data.topReferrers.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">데이터 없음</p>
          ) : (
            <div className="space-y-3">
              {data.topReferrers.map((r, i) => (
                <div key={r.source} className="flex items-center gap-2.5">
                  <span className={cn(
                    "w-5 text-center text-xs font-bold shrink-0",
                    i === 0 ? "text-emerald-600" : "text-gray-400"
                  )}>
                    {i + 1}
                  </span>
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-sm font-medium text-gray-700 truncate pr-2">
                        {REF_NAMES[r.source] || r.source}
                      </span>
                      <span className="text-sm font-bold text-gray-900 tabular-nums shrink-0">
                        {r.views.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${(r.views / (data.topReferrers[0]?.views || 1)) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <p className="text-[10px] text-gray-400 mt-3 pt-2 border-t border-gray-50">
            &quot;직접 방문&quot;은 URL 직접 입력, 북마크, 카카오톡/문자 링크 등을 포함합니다.
          </p>
        </div>
      </div>

      {/* UTM & Devices Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        {/* UTM Sources */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 md:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-purple-50 text-purple-600 rounded-lg">
              <LinkIcon className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">UTM 소스</h3>
          </div>
          {data.topUtmSources.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-xs text-gray-400">데이터 없음</p>
              <p className="text-[10px] text-gray-400 mt-1">
                ?utm_source=... 파라미터로 유입 추적
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {data.topUtmSources.map((s, i) => (
                <div key={s.source} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-gray-400 text-xs font-bold w-4 shrink-0">{i + 1}</span>
                    <span className="font-medium text-gray-700 truncate">{s.source}</span>
                  </div>
                  <span className="font-bold text-gray-900 tabular-nums shrink-0 ml-2">{s.views}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* UTM Campaigns */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 md:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-purple-50 text-purple-600 rounded-lg">
              <LinkIcon className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">UTM 캠페인</h3>
          </div>
          {data.topUtmCampaigns.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-xs text-gray-400">데이터 없음</p>
              <p className="text-[10px] text-gray-400 mt-1">
                ?utm_campaign=... 으로 캠페인별 추적
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {data.topUtmCampaigns.map((c, i) => (
                <div key={c.campaign} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-gray-400 text-xs font-bold w-4 shrink-0">{i + 1}</span>
                    <span className="font-medium text-gray-700 truncate">{c.campaign}</span>
                  </div>
                  <span className="font-bold text-gray-900 tabular-nums shrink-0 ml-2">{c.views}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Devices */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 md:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 bg-gray-100 text-gray-600 rounded-lg">
              <Smartphone className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">기기 비율</h3>
          </div>
          {totalDevices === 0 ? (
            <p className="text-xs text-gray-400 text-center py-4">데이터 없음</p>
          ) : (
            <div>
              <div className="flex h-8 rounded-lg overflow-hidden mb-3">
                {mobilePercent > 0 && (
                  <div
                    className="bg-indigo-500 flex items-center justify-center transition-all duration-500"
                    style={{ width: `${mobilePercent}%` }}
                  >
                    {mobilePercent > 20 && (
                      <span className="text-[10px] font-bold text-white">{mobilePercent}%</span>
                    )}
                  </div>
                )}
                {mobilePercent < 100 && (
                  <div
                    className="bg-gray-200 flex items-center justify-center transition-all duration-500"
                    style={{ width: `${100 - mobilePercent}%` }}
                  >
                    {(100 - mobilePercent) > 20 && (
                      <span className="text-[10px] font-bold text-gray-600">{100 - mobilePercent}%</span>
                    )}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-indigo-50/60 p-2.5 rounded-lg border border-indigo-100">
                  <div className="flex items-center gap-1.5 text-indigo-600 mb-0.5">
                    <Smartphone className="w-3.5 h-3.5" />
                    <span className="text-xs font-bold">모바일</span>
                  </div>
                  <div className="flex items-end gap-1.5">
                    <span className="text-lg font-black text-indigo-700">{mobilePercent}%</span>
                    <span className="text-[10px] font-medium text-indigo-500 mb-0.5">({data.devices.mobile})</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                  <div className="flex items-center gap-1.5 text-gray-500 mb-0.5">
                    <Monitor className="w-3.5 h-3.5" />
                    <span className="text-xs font-bold">데스크톱</span>
                  </div>
                  <div className="flex items-end gap-1.5">
                    <span className="text-lg font-black text-gray-700">{100 - mobilePercent}%</span>
                    <span className="text-[10px] font-medium text-gray-400 mb-0.5">({data.devices.desktop})</span>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-gray-400 mt-2.5">
                태블릿은 모바일에 포함됩니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
