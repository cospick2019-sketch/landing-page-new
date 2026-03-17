"use client";

import { useState, useEffect, useCallback } from "react";

import { cn } from "@/lib/utils";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";

interface Consultation {
  id: string;
  siteType: "landing" | "brand";
  industry: string;
  company: string;
  name: string;
  phone: string;
  refLinks: string[];
  purpose: string;
  timeline: string;
  extra: string;
  status: "new" | "contacted" | "completed";
  createdAt: string | null;
}

const STATUS_MAP = {
  new: { label: "신규", bg: "bg-blue-100 text-blue-700" },
  contacted: { label: "연락완료", bg: "bg-amber-100 text-amber-700" },
  completed: { label: "완료", bg: "bg-green-100 text-green-700" },
} as const;

const SITE_TYPE_MAP = {
  landing: "랜딩페이지",
  brand: "브랜드 사이트",
} as const;

function formatDate(iso: string | null) {
  if (!iso) return "-";
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function StatusBadge({ status }: { status: keyof typeof STATUS_MAP }) {
  const s = STATUS_MAP[status];
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

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [activeTab, setActiveTab] = useState<"consultations" | "analytics">("consultations");
  const [data, setData] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);

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

  const counts = {
    total: data.length,
    new: data.filter((d) => d.status === "new").length,
    contacted: data.filter((d) => d.status === "contacted").length,
    completed: data.filter((d) => d.status === "completed").length,
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab("consultations")}
              className={cn(
                "px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors",
                activeTab === "consultations"
                  ? "bg-gray-900 text-white"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              )}
            >
              상담 신청
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={cn(
                "px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors",
                activeTab === "analytics"
                  ? "bg-gray-900 text-white"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              )}
            >
              통계
            </button>
          </div>
          {activeTab === "consultations" && (
            <button
              onClick={fetchData}
              disabled={loading}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <svg
                className={cn("w-4 h-4", loading && "animate-spin")}
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
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-6 isolate">
        {activeTab === "analytics" && <AnalyticsDashboard />}

        {activeTab === "consultations" && (
        <>
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: "전체", value: counts.total, color: "bg-gray-900 text-white" },
            { label: "신규", value: counts.new, color: "bg-blue-100 text-blue-700" },
            { label: "연락완료", value: counts.contacted, color: "bg-amber-100 text-amber-700" },
            { label: "완료", value: counts.completed, color: "bg-green-100 text-green-700" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
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
                  {/* Header: 이름/업체/연락처 + 상태/날짜 */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-base font-bold text-gray-900">{item.name}</p>
                      {item.company && (
                        <p className="text-sm text-gray-600 mt-0.5">{item.company}</p>
                      )}
                      <a
                        href={`tel:${item.phone}`}
                        className="text-sm text-indigo-600 font-medium mt-0.5 block hover:underline"
                      >
                        {item.phone}
                      </a>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <StatusBadge status={item.status} />
                      <span className="text-xs text-gray-400">{formatDate(item.createdAt)}</span>
                    </div>
                  </div>

                  {/* 필수 정보 */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-semibold">
                      {SITE_TYPE_MAP[item.siteType] || item.siteType}
                    </span>
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
                      {item.industry}
                    </span>
                  </div>

                  {/* 선택 정보 */}
                  <div className="bg-gray-50 rounded-lg p-3.5 mb-4 space-y-2.5">
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
                      <option value="contacted">연락완료</option>
                      <option value="completed">완료</option>
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
      </main>
    </div>
  );
}
