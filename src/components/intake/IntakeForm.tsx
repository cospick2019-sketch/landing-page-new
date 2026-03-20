"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import {
  SITE_TYPES,
  DESIGN_CONCEPTS,
  DESIRED_ACTIONS,
  PAGE_COUNTS,
  SECTIONS,
  REQUIRED_FEATURES,
  ADDITIONAL_FEATURES,
  LOGO_OPTIONS,
  COPYWRITING_OPTIONS,
  ASSETS_OPTIONS,
  TIMELINES,
} from "@/constants/intake";

interface IntakeData {
  name: string;
  phone: string;
  industry: string;
  company: string;
  siteType: string;
  designConcept: string;
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
  timeline: string;
  extra: string;
}

const INITIAL: IntakeData = {
  name: "",
  phone: "",
  industry: "",
  company: "",
  siteType: "",
  designConcept: "",
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
  timeline: "",
  extra: "",
};

const TOTAL_STEPS = 6;

const STEP_LABELS = [
  "기본 정보",
  "사이트 유형",
  "상품·고객",
  "페이지 구성",
  "기능 선택",
  "마무리",
];

/* ─── Reusable field components ─── */

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

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="text-sm font-semibold text-gray-700 mb-2 block">
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
}

/* ─── Progress Bar ─── */
function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = ((current - 1) / (total - 1)) * 100;
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-bold text-indigo-600">
          STEP {current} / {total}
        </span>
        <span className="text-xs font-semibold text-gray-400">
          {STEP_LABELS[current - 1]}
        </span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-indigo-600 rounded-full"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}

/* ─── Step Components ─── */

function Step1({ data, update, error }: { data: IntakeData; update: (d: Partial<IntakeData>) => void; error: string }) {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-lg font-semibold text-gray-900 leading-snug">
          기본 정보를 입력해주세요
        </p>
        <p className="mt-1 text-sm text-gray-400">모든 항목을 입력해주세요.</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <FieldLabel required>성함</FieldLabel>
          <input
            type="text"
            placeholder="홍길동"
            value={data.name}
            onChange={(e) => update({ name: e.target.value })}
            className="w-full h-11 px-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-sm bg-white"
          />
        </div>
        <div>
          <FieldLabel required>연락처</FieldLabel>
          <input
            type="tel"
            inputMode="numeric"
            placeholder="01012345678"
            value={data.phone}
            onChange={(e) => {
              const v = e.target.value.replace(/[^0-9]/g, "");
              if (v.length <= 11) update({ phone: v });
            }}
            className="w-full h-11 px-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-sm bg-white"
          />
        </div>
        <div>
          <FieldLabel required>업종</FieldLabel>
          <input
            type="text"
            placeholder="예: 음식점, 쇼핑몰, 병원"
            value={data.industry}
            onChange={(e) => update({ industry: e.target.value })}
            className="w-full h-11 px-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-sm bg-white"
          />
        </div>
        <div>
          <FieldLabel required>업체명</FieldLabel>
          <input
            type="text"
            placeholder="업체명"
            value={data.company}
            onChange={(e) => update({ company: e.target.value })}
            className="w-full h-11 px-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-sm bg-white"
          />
        </div>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

function Step2({ data, update, error }: { data: IntakeData; update: (d: Partial<IntakeData>) => void; error: string }) {
  return (
    <div className="space-y-8">
      {/* 사이트 유형 */}
      <div>
        <FieldLabel required>어떤 유형의 홈페이지를 만들고 싶으세요?</FieldLabel>
        <p className="text-sm text-gray-400 mb-4 -mt-1">하나를 선택해주세요.</p>
        <div className="grid grid-cols-2 gap-3">
          {/* 랜딩형 */}
          <button
            type="button"
            onClick={() => update({ siteType: "landing" })}
            className={cn(
              "p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer",
              data.siteType === "landing"
                ? "border-indigo-600 bg-indigo-50/50 shadow-sm"
                : "border-gray-200 hover:border-gray-300 bg-white"
            )}
          >
            <p className={cn("text-sm font-bold", data.siteType === "landing" ? "text-indigo-600" : "text-gray-900")}>랜딩형 홈페이지</p>
            <p className="mt-1 text-xs text-gray-500 leading-relaxed">한 페이지에 모든 정보를 담는 일자 형태</p>
            <div className="mt-3 mx-auto w-full max-w-[80px]">
              <svg viewBox="0 0 60 80" fill="none" className="w-full">
                <rect x="2" y="2" width="56" height="76" rx="4" stroke={data.siteType === "landing" ? "#4F46E5" : "#d1d5db"} strokeWidth="1.5" fill={data.siteType === "landing" ? "#EEF2FF" : "#f9fafb"} />
                <rect x="8" y="8" width="44" height="6" rx="1" fill={data.siteType === "landing" ? "#4F46E5" : "#d1d5db"} opacity="0.5" />
                <rect x="8" y="18" width="44" height="3" rx="1" fill={data.siteType === "landing" ? "#4F46E5" : "#d1d5db"} opacity="0.3" />
                <rect x="8" y="24" width="44" height="3" rx="1" fill={data.siteType === "landing" ? "#4F46E5" : "#d1d5db"} opacity="0.3" />
                <rect x="8" y="30" width="44" height="3" rx="1" fill={data.siteType === "landing" ? "#4F46E5" : "#d1d5db"} opacity="0.3" />
                <rect x="8" y="38" width="44" height="6" rx="1" fill={data.siteType === "landing" ? "#4F46E5" : "#d1d5db"} opacity="0.2" />
                <rect x="8" y="48" width="44" height="3" rx="1" fill={data.siteType === "landing" ? "#4F46E5" : "#d1d5db"} opacity="0.3" />
                <rect x="8" y="54" width="44" height="3" rx="1" fill={data.siteType === "landing" ? "#4F46E5" : "#d1d5db"} opacity="0.3" />
              </svg>
            </div>
          </button>
          {/* 브랜드형 */}
          <button
            type="button"
            onClick={() => update({ siteType: "brand" })}
            className={cn(
              "p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer",
              data.siteType === "brand"
                ? "border-indigo-600 bg-indigo-50/50 shadow-sm"
                : "border-gray-200 hover:border-gray-300 bg-white"
            )}
          >
            <p className={cn("text-sm font-bold", data.siteType === "brand" ? "text-indigo-600" : "text-gray-900")}>브랜드형 홈페이지</p>
            <p className="mt-1 text-xs text-gray-500 leading-relaxed">다양한 페이지로 구성된 브랜드 중심 유형</p>
            <div className="mt-3 mx-auto w-full max-w-[80px]">
              <svg viewBox="0 0 60 80" fill="none" className="w-full">
                <rect x="2" y="2" width="56" height="76" rx="4" stroke={data.siteType === "brand" ? "#4F46E5" : "#d1d5db"} strokeWidth="1.5" fill={data.siteType === "brand" ? "#EEF2FF" : "#f9fafb"} />
                <rect x="8" y="8" width="20" height="30" rx="2" fill={data.siteType === "brand" ? "#4F46E5" : "#d1d5db"} opacity="0.3" />
                <rect x="32" y="8" width="20" height="30" rx="2" fill={data.siteType === "brand" ? "#4F46E5" : "#d1d5db"} opacity="0.3" />
                <rect x="8" y="42" width="20" height="30" rx="2" fill={data.siteType === "brand" ? "#4F46E5" : "#d1d5db"} opacity="0.3" />
                <rect x="32" y="42" width="20" height="30" rx="2" fill={data.siteType === "brand" ? "#4F46E5" : "#d1d5db"} opacity="0.3" />
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* 디자인 컨셉 */}
      <div>
        <FieldLabel required>원하시는 디자인 느낌을 선택해주세요</FieldLabel>
        <p className="text-sm text-gray-400 mb-4 -mt-1">가장 가까운 느낌 하나를 선택해주세요.</p>
        <div className="grid grid-cols-2 gap-3">
          {DESIGN_CONCEPTS.map((concept) => {
            const selected = data.designConcept === concept.value;
            return (
              <button
                key={concept.value}
                type="button"
                onClick={() => update({ designConcept: concept.value })}
                className={cn(
                  "p-4 rounded-xl border-2 text-center transition-all duration-200 cursor-pointer",
                  selected
                    ? "border-indigo-600 bg-indigo-50/50 shadow-sm"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                )}
              >
                <p className={cn("text-sm font-bold", selected ? "text-indigo-600" : "text-gray-900")}>
                  {concept.label}
                </p>
                <p className="mt-1 text-xs text-gray-500">{concept.desc}</p>
              </button>
            );
          })}
        </div>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

function Step3({ data, update, error }: { data: IntakeData; update: (d: Partial<IntakeData>) => void; error: string }) {
  const updateRefSite = (index: number, value: string) => {
    const sites = [...data.refSites] as [string, string, string];
    sites[index] = value;
    update({ refSites: sites });
  };

  return (
    <div className="space-y-7">
      <div>
        <FieldLabel required>소개할 핵심 상품이나 서비스는 무엇인가요?</FieldLabel>
        <textarea
          placeholder="랜딩페이지에서 소개할 핵심 상품이나 서비스를 자세히 알려주세요."
          value={data.productDetail}
          onChange={(e) => update({ productDetail: e.target.value })}
          rows={3}
          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-sm bg-white resize-none"
        />
      </div>

      <div>
        <FieldLabel>주 고객층은 누구인가요?</FieldLabel>
        <textarea
          placeholder="연령대, 성별, 직업 등 타겟 고객에 대해 알려주세요."
          value={data.targetCustomer}
          onChange={(e) => update({ targetCustomer: e.target.value })}
          rows={2}
          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-sm bg-white resize-none"
        />
      </div>

      <div>
        <FieldLabel>참고하고 싶은 사이트가 있나요?</FieldLabel>
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
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

function Step4({ data, update, error }: { data: IntakeData; update: (d: Partial<IntakeData>) => void; error: string }) {
  return (
    <div className="space-y-7">
      <div>
        <FieldLabel required>홈페이지 방문자가 무엇을 하길 원하세요?</FieldLabel>
        <p className="text-xs text-gray-400 mb-3 -mt-1">복수 선택 가능</p>
        <CheckboxGroup
          options={DESIRED_ACTIONS}
          selected={data.desiredActions}
          onChange={(v) => update({ desiredActions: v })}
        />
      </div>

      <div>
        <FieldLabel>이미 운영 중인 사이트가 있나요?</FieldLabel>
        <input
          type="url"
          placeholder="https://기존사이트.com (없으면 비워두세요)"
          value={data.existingWebsite}
          onChange={(e) => update({ existingWebsite: e.target.value })}
          className="w-full h-10 px-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-sm bg-white"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div>
        <FieldLabel>페이지는 몇 페이지 정도 생각하세요?</FieldLabel>
        <RadioGroup
          options={PAGE_COUNTS}
          selected={data.pageCount}
          onChange={(v) => update({ pageCount: v })}
        />
      </div>
    </div>
  );
}

function Step5({ data, update, error }: { data: IntakeData; update: (d: Partial<IntakeData>) => void; error: string }) {
  return (
    <div className="space-y-7">
      <div>
        <FieldLabel required>필요한 섹션을 선택해주세요</FieldLabel>
        <p className="text-xs text-gray-400 mb-3 -mt-1">복수 선택 가능</p>
        <CheckboxGroup
          options={SECTIONS}
          selected={data.sections}
          onChange={(v) => update({ sections: v })}
        />
      </div>

      <div>
        <FieldLabel required>필요한 기능을 선택해주세요</FieldLabel>
        <p className="text-xs text-gray-400 mb-3 -mt-1">복수 선택 가능</p>
        <CheckboxGroup
          options={REQUIRED_FEATURES}
          selected={data.requiredFeatures}
          onChange={(v) => update({ requiredFeatures: v })}
        />
      </div>

      <div>
        <FieldLabel>추가 기능이 필요하신가요?</FieldLabel>
        <p className="text-xs text-gray-400 mb-3 -mt-1">해당하는 항목을 모두 선택해주세요</p>
        <CheckboxGroup
          options={ADDITIONAL_FEATURES}
          selected={data.additionalFeatures}
          onChange={(v) => update({ additionalFeatures: v })}
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

function Step6({ data, update, error }: { data: IntakeData; update: (d: Partial<IntakeData>) => void; error: string }) {
  return (
    <div className="space-y-7">
      <p className="text-lg font-semibold text-gray-900">거의 다 왔어요! 마지막 단계입니다.</p>

      <div>
        <FieldLabel>브랜드 색상이 있나요?</FieldLabel>
        <input
          type="text"
          placeholder="예: 파란색, 빨간색 계열 (없으면 선호 색상)"
          value={data.brandColor}
          onChange={(e) => update({ brandColor: e.target.value })}
          className="w-full h-10 px-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-sm bg-white"
        />
      </div>

      <div>
        <FieldLabel required>사용할 로고가 있으신가요?</FieldLabel>
        <RadioGroup options={LOGO_OPTIONS} selected={data.hasLogo} onChange={(v) => update({ hasLogo: v })} />
      </div>

      <div>
        <FieldLabel required>소개 문구는 직접 준비하시나요?</FieldLabel>
        <RadioGroup options={COPYWRITING_OPTIONS} selected={data.copywriting} onChange={(v) => update({ copywriting: v })} />
      </div>

      <div>
        <FieldLabel required>상품 사진, 매장 사진 등 보유 소재가 있나요?</FieldLabel>
        <RadioGroup options={ASSETS_OPTIONS} selected={data.hasAssets} onChange={(v) => update({ hasAssets: v })} />
      </div>

      <div>
        <FieldLabel required>제작 희망 기간이 있으신가요?</FieldLabel>
        <RadioGroup options={TIMELINES} selected={data.timeline} onChange={(v) => update({ timeline: v })} />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div>
        <FieldLabel>그 외 요청사항이 있으신가요?</FieldLabel>
        <textarea
          placeholder="추가로 원하시는 기능이나 요청사항을 자유롭게 적어주세요."
          value={data.extra}
          onChange={(e) => update({ extra: e.target.value })}
          rows={3}
          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-sm bg-white resize-none"
        />
      </div>
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
      <h2 className="text-2xl font-bold text-gray-900">신청이 완료되었습니다!</h2>
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
  const [step, setStep] = useState(1);
  const [data, setData] = useState<IntakeData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const update = (partial: Partial<IntakeData>) => setData((prev) => ({ ...prev, ...partial }));

  const canNext = (): boolean => {
    if (step === 1) {
      return (
        data.name.trim() !== "" &&
        data.phone.trim() !== "" &&
        data.industry.trim() !== "" &&
        data.company.trim() !== ""
      );
    }
    if (step === 2) {
      return data.siteType !== "" && data.designConcept !== "";
    }
    if (step === 3) {
      return data.productDetail.trim() !== "";
    }
    if (step === 4) {
      return data.desiredActions.length > 0;
    }
    if (step === 5) {
      return data.sections.length > 0 && data.requiredFeatures.length > 0;
    }
    return true;
  };

  const canSubmit = (): boolean => {
    return data.hasLogo !== "" && data.copywriting !== "" && data.hasAssets !== "" && data.timeline !== "";
  };

  const handleNext = () => {
    if (step === 1) {
      if (!data.name.trim() || !data.phone.trim() || !data.industry.trim() || !data.company.trim()) {
        setError("모든 필수 항목을 입력해주세요.");
        return;
      }
    }
    if (step === 2) {
      if (!data.siteType || !data.designConcept) {
        setError("사이트 유형과 디자인 컨셉을 선택해주세요.");
        return;
      }
    }
    if (step === 3) {
      if (!data.productDetail.trim()) {
        setError("핵심 상품/서비스는 필수입니다.");
        return;
      }
    }
    if (step === 4) {
      if (data.desiredActions.length === 0) {
        setError("원하는 행동을 1개 이상 선택해주세요.");
        return;
      }
    }
    if (step === 5) {
      if (data.sections.length === 0 || data.requiredFeatures.length === 0) {
        setError("각 항목에서 1개 이상 선택해주세요.");
        return;
      }
    }
    setError("");
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrev = () => {
    setError("");
    setStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    if (!data.hasLogo || !data.copywriting || !data.hasAssets || !data.timeline) {
      setError("선택 항목을 모두 선택해주세요.");
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
    <div>
      {/* Header */}
      <div className="mb-6">
        <p className="text-sm font-bold text-indigo-600 mb-1">LANDING PICK</p>
        <h1 className="text-2xl font-bold text-gray-900">맞춤 견적 신청</h1>
        <p className="mt-1 text-sm text-gray-400">
          자세히 작성할수록 더 정확한 견적을 받으실 수 있습니다.
        </p>
      </div>

      {/* Progress */}
      <ProgressBar current={step} total={TOTAL_STEPS} />

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -40, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {step === 1 && <Step1 data={data} update={update} error={error} />}
          {step === 2 && <Step2 data={data} update={update} error={error} />}
          {step === 3 && <Step3 data={data} update={update} error={error} />}
          {step === 4 && <Step4 data={data} update={update} error={error} />}
          {step === 5 && <Step5 data={data} update={update} error={error} />}
          {step === 6 && <Step6 data={data} update={update} error={error} />}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="mt-10 flex items-center gap-3 pb-8">
        {step > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            className="h-12 px-6 rounded-full border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors cursor-pointer"
          >
            이전
          </button>
        )}
        {step < TOTAL_STEPS ? (
          <button
            type="button"
            disabled={!canNext()}
            onClick={handleNext}
            className={cn(
              "flex-1 h-12 rounded-full text-white font-bold text-base transition-all duration-200",
              canNext()
                ? "bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/25 cursor-pointer"
                : "bg-gray-300 cursor-not-allowed"
            )}
          >
            다음 단계로
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting || !canSubmit()}
            className={cn(
              "flex-1 h-12 rounded-full text-white font-bold text-base transition-all duration-200 shadow-lg shadow-indigo-600/25",
              submitting || !canSubmit()
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-500 cursor-pointer"
            )}
          >
            {submitting ? "제출 중..." : "견적 신청하기"}
          </button>
        )}
      </div>
    </div>
  );
}
