"use client";

import { useState, useEffect, useCallback } from "react";

import { cn } from "@/lib/utils";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";
import {
  SITE_TYPES_MAP,
  DESIGN_CONCEPTS_MAP,
  TIMELINES_MAP,
  DESIRED_ACTIONS_MAP,
  PAGE_COUNTS_MAP,
  SECTIONS_MAP,
  REQUIRED_FEATURES_MAP,
  ADDITIONAL_FEATURES_MAP,
  LOGO_OPTIONS_MAP,
  COPYWRITING_OPTIONS_MAP,
  ASSETS_OPTIONS_MAP,
} from "@/constants/intake";

interface Consultation {
  id: string;
  siteType: "landing" | "brand";
  designConcept: string;
  industry: string;
  company: string;
  name: string;
  phone: string;
  refLinks: string[];
  purpose: string;
  timeline: string;
  extra: string;
  status: "new" | "intake-sent" | "quote-sent" | "contracted" | "in-progress" | "done" | "cancelled" | "on-hold";
  createdAt: string | null;
}

interface Intake {
  id: string;
  name: string;
  phone: string;
  consultationId: string | null;
  industry: string;
  company: string;
  siteType: string;
  designConcept: string;
  productDetail: string;
  targetCustomer: string;
  refSites: string[];
  desiredActions: string[];
  existingWebsite: string;
  pageCount: string;
  sections: string[];
  requiredFeatures: string[];
  additionalFeatures: string[];
  brandColor: string;
  hasLogo: string;
  copywriting: string;
  hasAssets: string;
  timeline: string;
  extra: string;
  status: "new" | "reviewed";
  createdAt: string | null;
}

const STATUS_MAP: Record<string, { label: string; bg: string }> = {
  "new": { label: "신규", bg: "bg-blue-100 text-blue-700" },
  "intake-sent": { label: "폼 발송", bg: "bg-violet-100 text-violet-700" },
  "quote-sent": { label: "견적 발송", bg: "bg-amber-100 text-amber-700" },
  "contracted": { label: "계약완료", bg: "bg-emerald-100 text-emerald-700" },
  "in-progress": { label: "진행중", bg: "bg-indigo-100 text-indigo-700" },
  "done": { label: "제작완료", bg: "bg-green-100 text-green-700" },
  "cancelled": { label: "취소", bg: "bg-red-100 text-red-600" },
  "on-hold": { label: "보류", bg: "bg-gray-100 text-gray-600" },
  // 이전 상태 호환
  "contacted": { label: "연락완료(이전)", bg: "bg-amber-100 text-amber-700" },
  "completed": { label: "완료(이전)", bg: "bg-green-100 text-green-700" },
};

const INTAKE_STATUS_MAP = {
  new: { label: "신규", bg: "bg-emerald-100 text-emerald-700" },
  reviewed: { label: "확인완료", bg: "bg-gray-100 text-gray-600" },
} as const;

const SITE_TYPE_MAP = {
  landing: "랜딩페이지",
  brand: "브랜드 사이트",
} as const;

const DESIGN_CONCEPT_MAP: Record<string, string> = {
  minimal: "심플/미니멀",
  modern: "모던/트렌디",
  premium: "고급/프리미엄",
  friendly: "친근/캐주얼",
  bold: "강렬/임팩트",
  natural: "자연/감성",
};

function formatDate(iso: string | null) {
  if (!iso) return "-";
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_MAP[status] || { label: status, bg: "bg-gray-100 text-gray-600" };
  return (
    <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold", s.bg)}>
      {s.label}
    </span>
  );
}

function IntakeStatusBadge({ status }: { status: keyof typeof INTAKE_STATUS_MAP }) {
  const s = INTAKE_STATUS_MAP[status];
  return (
    <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold", s.bg)}>
      {s.label}
    </span>
  );
}

function InfoRow({ label, value }: { label: string; value: string | undefined | null }) {
  return (
    <div className="flex gap-2">
      <span className="text-xs font-semibold text-gray-500 shrink-0 w-16">{label}</span>
      <span className={cn("text-sm", value?.trim() ? "text-gray-800" : "text-gray-300")}>
        {value?.trim() || "-"}
      </span>
    </div>
  );
}

function TagList({ label, values, labelMap }: { label: string; values: string[]; labelMap: Record<string, string> }) {
  return (
    <div className="flex gap-2">
      <span className="text-xs font-semibold text-gray-500 shrink-0 w-16">{label}</span>
      {values.length > 0 ? (
        <div className="flex flex-wrap gap-1">
          {values.map((v) => (
            <span key={v} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded-md font-medium">
              {labelMap[v] || v}
            </span>
          ))}
        </div>
      ) : (
        <span className="text-sm text-gray-300">-</span>
      )}
    </div>
  );
}

function LoginGate({ onAuth }: { onAuth: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      if (res.ok) {
        onAuth();
      } else {
        setError("비밀번호가 올바르지 않습니다.");
      }
    } catch {
      setError("서버 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-2xl border border-gray-200 p-8 space-y-5"
      >
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-900">관리자 인증</h1>
          <p className="text-sm text-gray-500 mt-1">비밀번호를 입력하세요</p>
        </div>
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="비밀번호"
          className="w-full h-11 px-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          autoFocus
        />
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        <button
          type="submit"
          disabled={loading || !pw}
          className="w-full h-11 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-colors disabled:opacity-50 text-sm"
        >
          {loading ? "확인 중..." : "로그인"}
        </button>
      </form>
    </div>
  );
}

/* ─── Intake Detail (expandable) ─── */
function IntakeDetail({ item }: { item: Intake }) {
  const [open, setOpen] = useState(false);
  const refSites = item.refSites?.filter((s) => s.trim()) || [];

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 flex items-center gap-1 cursor-pointer"
      >
        {open ? "접기" : "확인서 내용 보기"}
        <svg
          className={cn("w-3 h-3 transition-transform", open && "rotate-180")}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="mt-3 bg-gray-50 rounded-lg p-3.5 space-y-2.5">
          <InfoRow label="업종" value={item.industry} />
          <InfoRow label="업체명" value={item.company} />
          <InfoRow label="사이트유형" value={SITE_TYPES_MAP[item.siteType] || item.siteType} />
          <InfoRow label="디자인컨셉" value={DESIGN_CONCEPTS_MAP[item.designConcept] || item.designConcept} />
          <InfoRow label="핵심상품" value={item.productDetail} />
          <InfoRow label="타겟고객" value={item.targetCustomer} />
          <div className="flex gap-2">
            <span className="text-xs font-semibold text-gray-500 shrink-0 w-16">참고사이트</span>
            {refSites.length > 0 ? (
              <div className="space-y-1">
                {refSites.map((link, i) => (
                  <a
                    key={i}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-indigo-600 hover:underline break-all block"
                  >
                    {link}
                  </a>
                ))}
              </div>
            ) : (
              <span className="text-sm text-gray-300">-</span>
            )}
          </div>
          <TagList label="원하는행동" values={item.desiredActions} labelMap={DESIRED_ACTIONS_MAP} />
          <InfoRow label="기존사이트" value={item.existingWebsite} />
          <InfoRow label="페이지수" value={PAGE_COUNTS_MAP[item.pageCount] || item.pageCount} />
          <TagList label="섹션" values={item.sections} labelMap={SECTIONS_MAP} />
          <TagList label="필수기능" values={item.requiredFeatures} labelMap={REQUIRED_FEATURES_MAP} />
          <TagList label="추가기능" values={item.additionalFeatures} labelMap={ADDITIONAL_FEATURES_MAP} />
          <InfoRow label="브랜드색상" value={item.brandColor} />
          <InfoRow label="로고" value={LOGO_OPTIONS_MAP[item.hasLogo] || item.hasLogo} />
          <InfoRow label="카피" value={COPYWRITING_OPTIONS_MAP[item.copywriting] || item.copywriting} />
          <InfoRow label="보유소재" value={ASSETS_OPTIONS_MAP[item.hasAssets] || item.hasAssets} />
          <InfoRow label="희망기간" value={TIMELINES_MAP[item.timeline] || item.timeline} />
          <div className="flex gap-2">
            <span className="text-xs font-semibold text-gray-500 shrink-0 w-16">추가요청</span>
            {item.extra?.trim() ? (
              <p className="text-sm text-gray-800 whitespace-pre-wrap">{item.extra}</p>
            ) : (
              <span className="text-sm text-gray-300">-</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [activeTab, setActiveTab] = useState<"consultations" | "intakes" | "analytics">("consultations");
  const [data, setData] = useState<Consultation[]>([]);
  const [intakes, setIntakes] = useState<Intake[]>([]);
  const [loading, setLoading] = useState(true);
  const [intakeLoading, setIntakeLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/consultation");
      if (res.status === 401) {
        setAuthed(false);
        return;
      }
      if (!res.ok) throw new Error("Fetch failed");
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error("Failed to fetch:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchIntakes = useCallback(async () => {
    setIntakeLoading(true);
    try {
      const res = await fetch("/api/intake");
      if (res.status === 401) {
        setAuthed(false);
        return;
      }
      if (!res.ok) throw new Error("Fetch failed");
      const json = await res.json();
      setIntakes(json);
    } catch (error) {
      console.error("Failed to fetch intakes:", error);
    } finally {
      setIntakeLoading(false);
    }
  }, []);

  // Check existing session on mount
  useEffect(() => {
    fetch("/api/consultation")
      .then((res) => {
        if (res.ok) {
          setAuthed(true);
          return res.json();
        }
        return null;
      })
      .then((json) => {
        if (json) setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Fetch intakes when tab is selected
  useEffect(() => {
    if (authed && activeTab === "intakes" && intakes.length === 0) {
      fetchIntakes();
    }
  }, [authed, activeTab, intakes.length, fetchIntakes]);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/consultation/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Update failed");
      setData((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: status as Consultation["status"] } : item
        )
      );
    } catch (error) {
      console.error("Failed to update:", error);
      alert("상태 변경에 실패했습니다.");
    }
  };

  const deleteSubmission = async (id: string) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      const res = await fetch(`/api/consultation/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete:", error);
      alert("삭제에 실패했습니다.");
    }
  };

  const updateIntakeStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/intake/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Update failed");
      setIntakes((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: status as Intake["status"] } : item
        )
      );
    } catch (error) {
      console.error("Failed to update intake:", error);
      alert("상태 변경에 실패했습니다.");
    }
  };

  const deleteIntake = async (id: string) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      const res = await fetch(`/api/intake/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setIntakes((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete intake:", error);
      alert("삭제에 실패했습니다.");
    }
  };

  const counts = {
    total: data.length,
    new: data.filter((d) => d.status === "new").length,
    "intake-sent": data.filter((d) => d.status === "intake-sent").length,
    "quote-sent": data.filter((d) => d.status === "quote-sent").length,
    contracted: data.filter((d) => d.status === "contracted").length,
    "in-progress": data.filter((d) => d.status === "in-progress").length,
    done: data.filter((d) => d.status === "done").length,
    cancelled: data.filter((d) => d.status === "cancelled").length,
    "on-hold": data.filter((d) => d.status === "on-hold").length,
  };

  const intakeCounts = {
    total: intakes.length,
    new: intakes.filter((d) => d.status === "new").length,
    reviewed: intakes.filter((d) => d.status === "reviewed").length,
  };

  if (!authed) {
    return (
      <LoginGate
        onAuth={() => {
          setAuthed(true);
          fetchData();
        }}
      />
    );
  }

  const RefreshButton = ({ onClick, isLoading }: { onClick: () => void; isLoading: boolean }) => (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
    >
      <svg
        className={cn("w-4 h-4", isLoading && "animate-spin")}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
      새로고침
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {(["consultations", "intakes", "analytics"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors",
                  activeTab === tab
                    ? "bg-gray-900 text-white"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                )}
              >
                {tab === "consultations" ? "상담 신청" : tab === "intakes" ? "견적 신청" : "통계"}
                {tab === "intakes" && intakeCounts.new > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-bold bg-emerald-500 text-white rounded-full">
                    {intakeCounts.new}
                  </span>
                )}
              </button>
            ))}
          </div>
          {activeTab === "consultations" && (
            <RefreshButton onClick={fetchData} isLoading={loading} />
          )}
          {activeTab === "intakes" && (
            <RefreshButton onClick={fetchIntakes} isLoading={intakeLoading} />
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-6 isolate">
        {activeTab === "analytics" && <AnalyticsDashboard />}

        {/* ─── 상담 신청 탭 ─── */}
        {activeTab === "consultations" && (
        <>
        {/* Stats */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2 mb-6">
          {[
            { label: "전체", value: counts.total },
            { label: "신규", value: counts.new },
            { label: "폼발송", value: counts["intake-sent"] },
            { label: "견적", value: counts["quote-sent"] },
            { label: "계약", value: counts.contracted },
            { label: "진행중", value: counts["in-progress"] },
            { label: "완료", value: counts.done },
            { label: "보류/취소", value: counts["on-hold"] + counts.cancelled },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-3 text-center">
              <p className="text-[10px] text-gray-500 mb-0.5">{stat.label}</p>
              <p className="text-xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {loading && data.length === 0 ? (
          <div className="text-center py-20 text-gray-400">불러오는 중...</div>
        ) : data.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            아직 신청 내역이 없습니다.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.map((item) => {
              const refLinks = item.refLinks?.filter((l) => l.trim()) || [];

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col"
                >
                  {/* Header: 상태 + 날짜 */}
                  <div className="flex items-center justify-between mb-4">
                    <StatusBadge status={item.status} />
                    <span className="text-xs text-gray-400">{formatDate(item.createdAt)}</span>
                  </div>

                  {/* 전체 정보 */}
                  <div className="bg-gray-50 rounded-lg p-3.5 mb-4 space-y-2.5">
                    <InfoRow label="이름" value={item.name} />
                    <InfoRow label="업체명" value={item.company} />
                    <div className="flex gap-2">
                      <span className="text-xs font-semibold text-gray-500 shrink-0 w-16">연락처</span>
                      <a
                        href={`tel:${item.phone}`}
                        className="text-sm text-indigo-600 font-medium hover:underline"
                      >
                        {item.phone}
                      </a>
                    </div>
                    <InfoRow label="유형" value={SITE_TYPE_MAP[item.siteType] || item.siteType} />
                    <InfoRow label="컨셉" value={DESIGN_CONCEPT_MAP[item.designConcept] || item.designConcept} />
                    <InfoRow label="업종" value={item.industry} />
                    <InfoRow label="목적" value={item.purpose} />
                    <InfoRow label="희망일정" value={item.timeline} />
                    <div className="flex gap-2">
                      <span className="text-xs font-semibold text-gray-500 shrink-0 w-16">참고링크</span>
                      {refLinks.length > 0 ? (
                        <div className="space-y-1">
                          {refLinks.map((link, i) => (
                            <a
                              key={i}
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-indigo-600 hover:underline break-all block"
                            >
                              {link}
                            </a>
                          ))}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-300">-</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <span className="text-xs font-semibold text-gray-500 shrink-0 w-16">추가요청</span>
                      {item.extra?.trim() ? (
                        <p className="text-sm text-gray-800 whitespace-pre-wrap">{item.extra}</p>
                      ) : (
                        <span className="text-sm text-gray-300">-</span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-auto pt-2">
                    <select
                      value={item.status}
                      onChange={(e) => updateStatus(item.id, e.target.value)}
                      className="flex-1 h-9 text-sm border border-gray-300 rounded-lg px-2 bg-white"
                    >
                      <option value="new">신규</option>
                      <option value="intake-sent">폼 발송</option>
                      <option value="quote-sent">견적 발송</option>
                      <option value="contracted">계약완료</option>
                      <option value="in-progress">진행중</option>
                      <option value="done">제작완료</option>
                      <option value="cancelled">취소</option>
                      <option value="on-hold">보류</option>
                    </select>
                    <button
                      onClick={() => deleteSubmission(item.id)}
                      className="h-9 px-3 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        </>
        )}

        {/* ─── 견적 신청 탭 ─── */}
        {activeTab === "intakes" && (
        <>
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "전체", value: intakeCounts.total },
            { label: "신규", value: intakeCounts.new },
            { label: "확인완료", value: intakeCounts.reviewed },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {intakeLoading && intakes.length === 0 ? (
          <div className="text-center py-20 text-gray-400">불러오는 중...</div>
        ) : intakes.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            아직 견적 신청 내역이 없습니다.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {intakes.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <IntakeStatusBadge status={item.status} />
                    {item.consultationId && (
                      <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-full">
                        상담 매칭됨
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">{formatDate(item.createdAt)}</span>
                </div>

                {/* 기본 정보 */}
                <div className="bg-gray-50 rounded-lg p-3.5 mb-3 space-y-2.5">
                  <InfoRow label="이름" value={item.name} />
                  <div className="flex gap-2">
                    <span className="text-xs font-semibold text-gray-500 shrink-0 w-16">연락처</span>
                    <a
                      href={`tel:${item.phone}`}
                      className="text-sm text-indigo-600 font-medium hover:underline"
                    >
                      {item.phone}
                    </a>
                  </div>
                  <InfoRow label="업체명" value={item.company} />
                  <InfoRow label="업종" value={item.industry} />
                </div>

                {/* 신청 내용 (펼침/접힘) */}
                <div className="mb-4">
                  <IntakeDetail item={item} />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-auto pt-2">
                  <select
                    value={item.status}
                    onChange={(e) => updateIntakeStatus(item.id, e.target.value)}
                    className="flex-1 h-9 text-sm border border-gray-300 rounded-lg px-2 bg-white"
                  >
                    <option value="new">신규</option>
                    <option value="reviewed">확인완료</option>
                  </select>
                  <button
                    onClick={() => deleteIntake(item.id)}
                    className="h-9 px-3 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        </>
        )}
      </main>
    </div>
  );
}
