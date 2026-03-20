"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  DESIRED_ACTIONS,
  PAGE_COUNTS,
  SECTIONS,
  REQUIRED_FEATURES,
  ADDITIONAL_FEATURES,
  LOGO_OPTIONS,
  COPYWRITING_OPTIONS,
  ASSETS_OPTIONS,
} from "@/constants/intake";

interface IntakeData {
  name: string;
  phone: string;
  productDetail: string;
  targetCustomer: string;
  refSites: [string, string, string];
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
}

const INITIAL: IntakeData = {
  name: "",
  phone: "",
  productDetail: "",
  targetCustomer: "",
  refSites: ["", "", ""],
  desiredActions: [],
  existingWebsite: "",
  pageCount: "",
  sections: [],
  requiredFeatures: [],
  additionalFeatures: [],
  brandColor: "",
  hasLogo: "",
  copywriting: "",
  hasAssets: "",
};

/* ─── Reusable field components ─── */

function SectionTitle({ number, title }: { number: number; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
        {number}
      </span>
      <h3 className="text-base font-bold text-gray-900">{title}</h3>
    </div>
  );
}

function CheckboxGroup({
  options,
  selected,
  onChange,
}: {
  options: readonly { value: string; label: string }[];
  selected: string[];
  onChange: (values: string[]) => void;
}) {
  const toggle = (value: string) => {
    onChange(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value]
    );
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map((opt) => {
        const checked = selected.includes(opt.value);
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => toggle(opt.value)}
            className={cn(
              "px-3 py-2.5 rounded-lg border text-sm text-left transition-all duration-150 cursor-pointer",
              checked
                ? "border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
            )}
          >
            <span className="flex items-center gap-2">
              <span
                className={cn(
                  "w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-colors",
                  checked ? "bg-indigo-600 border-indigo-600" : "border-gray-300"
                )}
              >
                {checked && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function RadioGroup({
  options,
  selected,
  onChange,
}: {
  options: readonly { value: string; label: string }[];
  selected: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const checked = selected === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "px-4 py-2.5 rounded-lg border text-sm transition-all duration-150 cursor-pointer",
              checked
                ? "border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
            )}
          >
            <span className="flex items-center gap-2">
              <span
                className={cn(
                  "w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors",
                  checked ? "border-indigo-600" : "border-gray-300"
                )}
              >
                {checked && <span className="w-2 h-2 rounded-full bg-indigo-600" />}
              </span>
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ─── Success Screen ─── */
function SuccessScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-5">
        <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-900">작성이 완료되었습니다!</h2>
      <p className="mt-3 text-gray-500 leading-relaxed">
        작성해주신 내용을 바탕으로<br />
        <span className="font-semibold text-gray-700">카카오톡으로 맞춤 견적을 안내</span>드리겠습니다.
      </p>
      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 text-sm text-amber-800 leading-relaxed">
        보통 <span className="font-bold">1영업일 이내</span>에 안내드리고 있으며,<br />
        추가 확인이 필요한 경우 먼저 연락드릴 수 있습니다.
      </div>
      <p className="mt-6 text-sm text-gray-400">이 페이지는 닫으셔도 됩니다.</p>
    </motion.div>
  );
}

/* ─── Main Form ─── */
export default function IntakeForm() {
  const [data, setData] = useState<IntakeData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const update = (partial: Partial<IntakeData>) => setData((prev) => ({ ...prev, ...partial }));

  const updateRefSite = (index: number, value: string) => {
    const sites = [...data.refSites] as [string, string, string];
    sites[index] = value;
    update({ refSites: sites });
  };

  const handleSubmit = async () => {
    if (!data.name.trim() || !data.phone.trim()) {
      setError("성함과 연락처는 필수입니다.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("API error");
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      alert("제출에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return <SuccessScreen />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm font-bold text-indigo-600 mb-1">LANDING PICK</p>
        <h1 className="text-2xl font-bold text-gray-900">맞춤 견적을 위한 사전 확인서</h1>
        <p className="mt-2 text-sm text-gray-500 leading-relaxed">
          아래 내용을 작성해주시면 더 정확한 견적 안내가 가능합니다.<br />
          모든 항목이 필수는 아니지만, 자세히 작성할수록 좋습니다.
        </p>
      </div>

      {/* 기본 정보 */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
        <p className="text-sm font-bold text-indigo-700 mb-1">확인용 정보</p>
        <p className="text-xs text-indigo-500 mb-4">상담 신청 시 입력하신 정보를 한 번 더 입력해주세요.</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">성함 *</label>
            <input
              type="text"
              placeholder="홍길동"
              value={data.name}
              onChange={(e) => update({ name: e.target.value })}
              className="w-full h-10 px-3 rounded-lg border border-indigo-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-sm bg-white"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">연락처 *</label>
            <input
              type="tel"
              inputMode="numeric"
              placeholder="01012345678"
              value={data.phone}
              onChange={(e) => {
                const v = e.target.value.replace(/[^0-9]/g, "");
                if (v.length <= 11) update({ phone: v });
              }}
              className="w-full h-10 px-3 rounded-lg border border-indigo-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-sm bg-white"
            />
          </div>
        </div>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>

      {/* 1. 핵심 상품/서비스 */}
      <div>
        <SectionTitle number={1} title="소개할 핵심 상품이나 서비스는 무엇인가요?" />
        <textarea
          placeholder="랜딩페이지에서 소개할 핵심 상품이나 서비스를 자세히 알려주세요."
          value={data.productDetail}
          onChange={(e) => update({ productDetail: e.target.value })}
          rows={3}
          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-sm bg-white resize-none"
        />
      </div>

      {/* 2. 타겟 고객 */}
      <div>
        <SectionTitle number={2} title="주 고객층은 누구인가요?" />
        <textarea
          placeholder="연령대, 성별, 직업 등 타겟 고객에 대해 알려주세요."
          value={data.targetCustomer}
          onChange={(e) => update({ targetCustomer: e.target.value })}
          rows={2}
          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-sm bg-white resize-none"
        />
      </div>

      {/* 3. 참고 사이트 */}
      <div>
        <SectionTitle number={3} title="참고하고 싶은 사이트가 있나요?" />
        <div className="space-y-2">
          {[0, 1, 2].map((i) => (
            <input
              key={i}
              type="url"
              placeholder={`https://example${i + 1}.com`}
              value={data.refSites[i]}
              onChange={(e) => updateRefSite(i, e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-sm bg-white"
            />
          ))}
        </div>
      </div>

      {/* 4. 원하는 고객 행동 */}
      <div>
        <SectionTitle number={4} title="홈페이지 방문자가 무엇을 하길 원하세요?" />
        <p className="text-xs text-gray-400 mb-3 -mt-2">복수 선택 가능</p>
        <CheckboxGroup
          options={DESIRED_ACTIONS}
          selected={data.desiredActions}
          onChange={(v) => update({ desiredActions: v })}
        />
      </div>

      {/* 5. 기존 사이트 */}
      <div>
        <SectionTitle number={5} title="이미 운영 중인 사이트가 있나요?" />
        <input
          type="url"
          placeholder="https://기존사이트.com (없으면 비워두세요)"
          value={data.existingWebsite}
          onChange={(e) => update({ existingWebsite: e.target.value })}
          className="w-full h-10 px-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-sm bg-white"
        />
      </div>

      {/* 6. 페이지 수 */}
      <div>
        <SectionTitle number={6} title="페이지는 몇 페이지 정도 생각하세요?" />
        <RadioGroup
          options={PAGE_COUNTS}
          selected={data.pageCount}
          onChange={(v) => update({ pageCount: v })}
        />
      </div>

      {/* 7. 필요 섹션 */}
      <div>
        <SectionTitle number={7} title="필요한 섹션을 선택해주세요" />
        <p className="text-xs text-gray-400 mb-3 -mt-2">복수 선택 가능</p>
        <CheckboxGroup
          options={SECTIONS}
          selected={data.sections}
          onChange={(v) => update({ sections: v })}
        />
      </div>

      {/* 8. 필수 기능 */}
      <div>
        <SectionTitle number={8} title="필요한 기능을 선택해주세요" />
        <p className="text-xs text-gray-400 mb-3 -mt-2">복수 선택 가능</p>
        <CheckboxGroup
          options={REQUIRED_FEATURES}
          selected={data.requiredFeatures}
          onChange={(v) => update({ requiredFeatures: v })}
        />
      </div>

      {/* 9. 추가 기능 */}
      <div>
        <SectionTitle number={9} title="추가 기능이 필요하신가요?" />
        <p className="text-xs text-gray-400 mb-3 -mt-2">해당하는 항목을 모두 선택해주세요</p>
        <CheckboxGroup
          options={ADDITIONAL_FEATURES}
          selected={data.additionalFeatures}
          onChange={(v) => update({ additionalFeatures: v })}
        />
      </div>

      {/* 10. 브랜드 색상 */}
      <div>
        <SectionTitle number={10} title="브랜드 색상이 있나요?" />
        <input
          type="text"
          placeholder="예: 파란색, 빨간색 계열 (없으면 선호 색상)"
          value={data.brandColor}
          onChange={(e) => update({ brandColor: e.target.value })}
          className="w-full h-10 px-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-sm bg-white"
        />
      </div>

      {/* 11. 로고 */}
      <div>
        <SectionTitle number={11} title="로고 파일을 갖고 계신가요?" />
        <RadioGroup
          options={LOGO_OPTIONS}
          selected={data.hasLogo}
          onChange={(v) => update({ hasLogo: v })}
        />
      </div>

      {/* 12. 카피 */}
      <div>
        <SectionTitle number={12} title="소개 문구는 직접 준비하시나요?" />
        <RadioGroup
          options={COPYWRITING_OPTIONS}
          selected={data.copywriting}
          onChange={(v) => update({ copywriting: v })}
        />
      </div>

      {/* 13. 소재 */}
      <div>
        <SectionTitle number={13} title="상품 사진, 매장 사진 등 보유 소재가 있나요?" />
        <RadioGroup
          options={ASSETS_OPTIONS}
          selected={data.hasAssets}
          onChange={(v) => update({ hasAssets: v })}
        />
      </div>

      {/* Submit */}
      <div className="pt-4 pb-8">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitting}
          className={cn(
            "w-full h-14 rounded-xl text-white font-bold text-base transition-all duration-200 shadow-lg shadow-indigo-600/25",
            submitting
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-500 cursor-pointer"
          )}
        >
          {submitting ? "제출 중..." : "작성 완료"}
        </button>
      </div>
    </div>
  );
}
