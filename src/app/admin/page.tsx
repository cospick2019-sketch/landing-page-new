"use client";

import { useState, useEffect, useCallback, Fragment } from "react";
import { cn } from "@/lib/utils";

interface Consultation {
  id: string;
  siteType: "landing" | "brand";
  industry: string;
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

function DetailPanel({ item }: { item: Consultation }) {
  const refLinks = item.refLinks?.filter((l) => l.trim()) || [];
  return (
    <div className="bg-gray-50 rounded-xl p-4 mt-3 space-y-3 text-sm">
      {item.purpose && (
        <div>
          <span className="font-semibold text-gray-700">목적: </span>
          <span className="text-gray-600">{item.purpose}</span>
        </div>
      )}
      {item.timeline && (
        <div>
          <span className="font-semibold text-gray-700">일정: </span>
          <span className="text-gray-600">{item.timeline}</span>
        </div>
      )}
      {refLinks.length > 0 && (
        <div>
          <span className="font-semibold text-gray-700">참고 링크:</span>
          <ul className="mt-1 space-y-1">
            {refLinks.map((link, i) => (
              <li key={i}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline break-all"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {item.extra && (
        <div>
          <span className="font-semibold text-gray-700">추가 요청:</span>
          <p className="mt-1 text-gray-600 whitespace-pre-wrap">{item.extra}</p>
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  const [data, setData] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/consultation");
      if (!res.ok) throw new Error("Fetch failed");
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error("Failed to fetch:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-900">상담 신청 관리</h1>
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
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-6">
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
          <>
            {/* Mobile: Card View */}
            <div className="md:hidden space-y-3">
              {data.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-gray-200 p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.phone}</p>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-medium">
                      {SITE_TYPE_MAP[item.siteType] || item.siteType}
                    </span>
                    <span>{item.industry}</span>
                  </div>

                  <p className="text-xs text-gray-400 mb-3">{formatDate(item.createdAt)}</p>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mb-2">
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

                  <button
                    onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                    className="w-full text-center text-sm text-indigo-600 font-medium py-1"
                  >
                    {expandedId === item.id ? "접기" : "상세 보기"}
                  </button>

                  {expandedId === item.id && <DetailPanel item={item} />}
                </div>
              ))}
            </div>

            {/* Desktop: Table View */}
            <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <th className="px-4 py-3">이름</th>
                    <th className="px-4 py-3">연락처</th>
                    <th className="px-4 py-3">유형</th>
                    <th className="px-4 py-3">업종</th>
                    <th className="px-4 py-3">상태</th>
                    <th className="px-4 py-3">신청일</th>
                    <th className="px-4 py-3 text-right">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {data.map((item) => (
                    <Fragment key={item.id}>
                      <tr
                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                      >
                        <td className="px-4 py-3 font-medium text-gray-900">{item.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{item.phone}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {SITE_TYPE_MAP[item.siteType] || item.siteType}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{item.industry}</td>
                        <td className="px-4 py-3">
                          <select
                            value={item.status}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => updateStatus(item.id, e.target.value)}
                            className="h-8 text-xs border border-gray-300 rounded-lg px-2 bg-white"
                          >
                            <option value="new">신규</option>
                            <option value="contacted">연락완료</option>
                            <option value="completed">완료</option>
                          </select>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-400">
                          {formatDate(item.createdAt)}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteSubmission(item.id);
                            }}
                            className="text-sm text-red-500 hover:text-red-700 transition-colors"
                          >
                            삭제
                          </button>
                        </td>
                      </tr>
                      {expandedId === item.id && (
                        <tr key={`${item.id}-detail`}>
                          <td colSpan={7} className="px-4 pb-4">
                            <DetailPanel item={item} />
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
