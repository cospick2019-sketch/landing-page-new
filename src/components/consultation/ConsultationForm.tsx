"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useConsultation } from "./ConsultationContext";
import { cn } from "@/lib/utils";

/* ─── Types ─── */
interface FormData {
  siteType: "landing" | "brand" | null;
  designConcept: string | null;
  industry: string;
  company: string;
  name: string;
  phone: string;
  refLinks: [string, string, string];
  purpose: string;
  timeline: string;
  extra: string;
}

const INITIAL: FormData = {
  siteType: null,
  designConcept: null,
  industry: "",
  company: "",
  name: "",
  phone: "",
  refLinks: ["", "", ""],
  purpose: "",
  timeline: "",
  extra: "",
};

const DESIGN_CONCEPTS = [
  { value: "minimal", label: "심플/미니멀", desc: "깔끔하고 군더더기 없는" },
  { value: "modern", label: "모던/트렌디", desc: "세련되고 감각적인" },
  { value: "premium", label: "고급/프리미엄", desc: "럭셔리하고 격조 있는" },
  { value: "friendly", label: "친근/캐주얼", desc: "따뜻하고 편안한" },
  { value: "bold", label: "강렬/임팩트", desc: "눈에 확 띄는 파워풀한" },
  { value: "natural", label: "자연/감성", desc: "내추럴하고 감성적인" },
] as const;

/* ─── Step Indicator ─── */
function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-0 mx-auto w-fit">
      {Array.from({ length: total }, (_, i) => {
        const step = i + 1;
        const done = step < current;
        const active = step === current;
        return (
          <div key={step} className="flex items-center">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300",
                done && "bg-indigo-600 text-white",
                active && "bg-indigo-600 text-white ring-4 ring-indigo-100",
                !done && !active && "bg-gray-100 text-gray-400"
              )}
            >
              {done ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                step
              )}
            </div>
            {i < total - 1 && (
              <div className={cn("w-6 h-0.5 transition-colors duration-300", step < current ? "bg-indigo-600" : "bg-gray-200")} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Step 1: Site Type ─── */
function Step1({ data, update }: { data: FormData; update: (d: Partial<FormData>) => void }) {
  return (
    <div>
      <p className="text-indigo-500 text-sm font-bold tracking-wide">STEP 1</p>
      <p className="mt-2 text-lg font-semibold text-gray-900 leading-snug">
        제작하시려는<br />홈페이지의 유형을 정해주세요.
      </p>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => update({ siteType: "landing" })}
          className={cn(
            "relative p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer",
            data.siteType === "landing"
              ? "border-indigo-600 bg-indigo-50/50 shadow-sm"
              : "border-gray-200 hover:border-gray-300 bg-white"
          )}
        >
          <span className={cn("text-xs font-bold", data.siteType === "landing" ? "text-indigo-600" : "text-gray-400")}>01</span>
          <p className={cn("mt-1 text-sm font-bold", data.siteType === "landing" ? "text-indigo-600" : "text-gray-900")}>랜딩형 홈페이지</p>
          <p className="mt-1 text-xs text-gray-500 leading-relaxed">한 페이지에 모든 정보를 담는 일자 형태의 유형</p>
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
        <button
          type="button"
          onClick={() => update({ siteType: "brand" })}
          className={cn(
            "relative p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer",
            data.siteType === "brand"
              ? "border-indigo-600 bg-indigo-50/50 shadow-sm"
              : "border-gray-200 hover:border-gray-300 bg-white"
          )}
        >
          <span className={cn("text-xs font-bold", data.siteType === "brand" ? "text-indigo-600" : "text-gray-400")}>02</span>
          <p className={cn("mt-1 text-sm font-bold", data.siteType === "brand" ? "text-indigo-600" : "text-gray-900")}>브랜드형 홈페이지</p>
          <p className="mt-1 text-xs text-gray-500 leading-relaxed">다양한 페이지로 구성된 브랜드 중심의 유형</p>
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
  );
}

/* ─── Step 2: Design Concept ─── */
function Step2({ data, update }: { data: FormData; update: (d: Partial<FormData>) => void }) {
  return (
    <div>
      <p className="text-indigo-500 text-sm font-bold tracking-wide">STEP 2</p>
      <p className="mt-2 text-lg font-semibold text-gray-900 leading-snug">
        원하시는 디자인 컨셉을<br />선택해주세요.
      </p>
      <div className="mt-6 grid grid-cols-2 gap-3">
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
  );
}

/* ─── Step 3: Required Info ─── */
function Step3({ data, update }: { data: FormData; update: (d: Partial<FormData>) => void }) {
  return (
    <div>
      <p className="text-indigo-500 text-sm font-bold tracking-wide">STEP 3</p>
      <p className="mt-2 text-lg font-semibold text-gray-900 leading-snug">
        필수 항목을 포함한<br />항목을 입력해주세요.
      </p>
      <div className="mt-6 space-y-5">
        {/* 업종 + 업체명 + 성함 */}
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-3 text-base text-gray-700">
          <span className="font-medium">저는</span>
          <input
            type="text"
            placeholder="업종"
            value={data.industry}
            onChange={(e) => update({ industry: e.target.value })}
            className="w-24 border-b-2 border-gray-300 focus:border-indigo-500 outline-none bg-transparent text-center font-semibold text-gray-900 pb-0.5 transition-colors"
          />
          <span className="font-medium">업종</span>
          <input
            type="text"
            placeholder="업체명"
            value={data.company}
            onChange={(e) => update({ company: e.target.value })}
            className="w-24 border-b-2 border-gray-300 focus:border-indigo-500 outline-none bg-transparent text-center font-semibold text-gray-900 pb-0.5 transition-colors"
          />
          <span className="font-medium">의</span>
          <input
            type="text"
            placeholder="성함"
            value={data.name}
            onChange={(e) => update({ name: e.target.value })}
            className="w-24 border-b-2 border-gray-300 focus:border-indigo-500 outline-none bg-transparent text-center font-semibold text-gray-900 pb-0.5 transition-colors"
          />
          <span className="font-medium">입니다.</span>
        </div>

        {/* 전화번호 */}
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-3 text-base text-gray-700">
          <span className="font-medium">전화번호는</span>
          <input
            type="tel"
            inputMode="numeric"
            placeholder="01012345678"
            value={data.phone}
            onChange={(e) => {
              const v = e.target.value.replace(/[^0-9]/g, "");
              if (v.length <= 11) update({ phone: v });
            }}
            className="w-40 border-b-2 border-gray-300 focus:border-indigo-500 outline-none bg-transparent text-center font-semibold text-gray-900 pb-0.5 transition-colors"
          />
          <span className="font-medium">입니다.</span>
        </div>
      </div>
      <p className="mt-6 text-xs text-gray-400">* 모든 필수 항목을 입력해주세요</p>
    </div>
  );
}

/* ─── Step 4: Optional Info ─── */
function Step4({ data, update }: { data: FormData; update: (d: Partial<FormData>) => void }) {
  const updateRefLink = (index: number, value: string) => {
    const links = [...data.refLinks] as [string, string, string];
    links[index] = value;
    update({ refLinks: links });
  };

  return (
    <div>
      <p className="text-indigo-500 text-sm font-bold tracking-wide">
        STEP 4 <span className="text-gray-400 font-normal">선택사항</span>
      </p>
      <p className="mt-2 text-lg font-semibold text-gray-900">추가 정보를 입력해주세요.</p>

      <div className="mt-6 space-y-5">
        {/* 예시 링크 */}
        <div>
          <p className="text-sm font-semibold text-gray-700">
            원하는 페이지 예시 링크 <span className="text-gray-400 font-normal">(최대 3개)</span>
          </p>
          <div className="mt-2 space-y-2">
            {[0, 1, 2].map((i) => (
              <input
                key={i}
                type="url"
                placeholder={`https://example${i + 1}.com`}
                value={data.refLinks[i]}
                onChange={(e) => updateRefLink(i, e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-sm text-gray-900 bg-white transition-colors"
              />
            ))}
          </div>
        </div>

        {/* 목적 */}
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-3 text-base text-gray-700">
          <span className="font-medium text-sm">랜딩페이지 목적은</span>
          <input
            type="text"
            placeholder="판매, 홍보 등"
            value={data.purpose}
            onChange={(e) => update({ purpose: e.target.value })}
            className="w-32 border-b-2 border-gray-300 focus:border-indigo-500 outline-none bg-transparent text-center font-semibold text-gray-900 text-sm pb-0.5 transition-colors"
          />
          <span className="font-medium text-sm">입니다.</span>
        </div>

        {/* 희망 기간 */}
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-3 text-base text-gray-700">
          <span className="font-medium text-sm">제작 희망기간은</span>
          <select
            value={data.timeline}
            onChange={(e) => update({ timeline: e.target.value })}
            className="border-b-2 border-gray-300 focus:border-indigo-500 outline-none bg-transparent text-center font-semibold text-sm text-indigo-600 pb-0.5 transition-colors cursor-pointer appearance-none pr-4"
          >
            <option value="">-선택-</option>
            <option value="1주 이내">1주 이내</option>
            <option value="2주 이내">2주 이내</option>
            <option value="1개월 이내">1개월 이내</option>
            <option value="1개월 이상">1개월 이상</option>
            <option value="미정">미정</option>
          </select>
          <span className="font-medium text-sm">입니다.</span>
        </div>

        {/* 추가 요청 */}
        <div>
          <p className="text-sm font-semibold text-gray-700">그 외 원하는 기능</p>
          <textarea
            placeholder="추가로 원하시는 기능이나 요청사항을 자유롭게 적어주세요."
            value={data.extra}
            onChange={(e) => update({ extra: e.target.value })}
            rows={3}
            className="mt-2 w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-sm text-gray-900 bg-white resize-none transition-colors"
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Success Screen ─── */
function SuccessScreen({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const MESSAGE = "상담신청";

  const handleKakaoChat = () => {
    onClose();
    window.open("http://pf.kakao.com/_DLuZX/chat", "_blank");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(MESSAGE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = MESSAGE;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-5">
        <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-900">신청이 완료되었습니다!</h3>

      {/* 카카오톡 메시지 안내 */}
      <div className="mt-5 w-full bg-indigo-50 border-2 border-indigo-200 rounded-xl p-4">
        <p className="text-xs font-bold text-indigo-600 tracking-wide">마지막 한 단계!</p>
        <p className="mt-2 text-[15px] font-extrabold text-gray-900 leading-snug">
          카카오톡이 열리면<br />
          아래 문구를 보내주세요!
        </p>

        {/* 복사 가능한 메시지 박스 */}
        <button
          type="button"
          onClick={handleCopy}
          className="mt-3 w-full flex items-center justify-between bg-white border-2 border-indigo-300 rounded-lg px-4 py-3 cursor-pointer hover:border-indigo-400 transition-colors"
        >
          <span className="text-lg font-bold text-indigo-600">{MESSAGE}</span>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full transition-colors ${copied ? "bg-green-100 text-green-600" : "bg-indigo-100 text-indigo-600"}`}>
            {copied ? "복사됨!" : "복사"}
          </span>
        </button>

        <p className="mt-2.5 text-sm text-gray-500 leading-relaxed">
          * 메시지를 보내셔야 상담이 시작됩니다
        </p>
      </div>

      <button
        type="button"
        onClick={handleKakaoChat}
        style={{ backgroundColor: "#FEE500" }}
        className="mt-5 w-full h-14 rounded-xl font-bold text-base flex items-center justify-center gap-2 hover:brightness-95 transition-all cursor-pointer shadow-lg"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3C6.48 3 2 6.58 2 10.94c0 2.8 1.86 5.27 4.66 6.67-.15.53-.96 3.4-.99 3.63 0 0-.02.17.09.24.11.06.24.01.24.01.32-.04 3.7-2.44 4.28-2.85.56.08 1.14.12 1.72.12 5.52 0 10-3.58 10-7.82C22 6.58 17.52 3 12 3Z"
            fill="#3C1E1E"
          />
        </svg>
        <span style={{ color: "#3C1E1E" }}>카카오톡으로 상담 시작하기</span>
      </button>

      <p className="mt-2 text-xs text-red-500 font-semibold">
        메시지를 보내지 않으면 할인가 적용이 불가합니다
      </p>
    </div>
  );
}

/* ─── Main Form Modal ─── */
export default function ConsultationForm() {
  const { isOpen, close } = useConsultation();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setStep(1);
        setData(INITIAL);
        setSubmitted(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const update = (partial: Partial<FormData>) => setData((prev) => ({ ...prev, ...partial }));

  const canNext = (): boolean => {
    if (step === 1) return data.siteType !== null;
    if (step === 2) return data.designConcept !== null;
    if (step === 3) return data.industry.trim() !== "" && data.company.trim() !== "" && data.name.trim() !== "" && data.phone.trim() !== "";
    return true;
  };

  const isRequiredFilled = (): boolean => {
    return (
      data.siteType !== null &&
      data.designConcept !== null &&
      data.industry.trim() !== "" &&
      data.company.trim() !== "" &&
      data.name.trim() !== "" &&
      data.phone.trim() !== ""
    );
  };

  const handleSubmit = async () => {
    if (!isRequiredFilled()) {
      alert("필수 항목을 모두 입력해주세요.");
      setStep(3);
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("API error");
      if (typeof window !== "undefined" && typeof window.fbq === "function") {
        window.fbq("track", "Lead");
      }
      setSubmitted(true);
    } catch (error) {
      console.error("Submission failed:", error);
      alert("신청에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    close();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={backdropRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm p-0 md:p-4"
          onClick={(e) => {
            if (e.target === backdropRef.current) handleClose();
          }}
        >
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white rounded-t-2xl md:rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 px-6 pt-6 pb-4 border-b border-gray-100 rounded-t-2xl">
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="닫기"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <h3 className="text-xl font-bold text-gray-900">무료 제작 신청</h3>
              <p className="mt-1 text-sm text-gray-500">간단한 정보를 입력해주시면 빠르게 연락드리겠습니다.</p>

              {!submitted && (
                <div className="mt-5">
                  <StepIndicator current={step} total={4} />
                </div>
              )}
            </div>

            {/* Body */}
            <div className="px-6 py-6">
              {submitted ? (
                <SuccessScreen onClose={handleClose} />
              ) : (
                <>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ x: 30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -30, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {step === 1 && <Step1 data={data} update={update} />}
                      {step === 2 && <Step2 data={data} update={update} />}
                      {step === 3 && <Step3 data={data} update={update} />}
                      {step === 4 && <Step4 data={data} update={update} />}
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation */}
                  <div className="mt-8 flex items-center gap-3">
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={() => setStep((s) => s - 1)}
                        className="h-12 px-6 rounded-full border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                      >
                        이전
                      </button>
                    )}
                    {step < 4 ? (
                      <button
                        type="button"
                        disabled={!canNext()}
                        onClick={() => setStep((s) => s + 1)}
                        className={cn(
                          "flex-1 h-12 rounded-full text-white font-bold text-base transition-all duration-200",
                          canNext()
                            ? "bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/25"
                            : "bg-gray-300 cursor-not-allowed"
                        )}
                      >
                        다음 단계로
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={submitting}
                        className={`flex-1 h-12 rounded-full text-white font-bold text-base transition-all duration-200 shadow-lg shadow-indigo-600/25 ${submitting ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-500"}`}
                      >
                        {submitting ? "신청 중..." : "무료 신청하기"}
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
