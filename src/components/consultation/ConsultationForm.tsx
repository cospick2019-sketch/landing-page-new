"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useConsultation } from "./ConsultationContext";
import { cn } from "@/lib/utils";

/* ─── Constants ─── */
const PHONE_NUMBER = "1899-0511";
const KAKAO_CHAT_URL = "http://pf.kakao.com/_DLuZX/chat?text=견적문의";

const DESIRED_FEATURES = [
  { value: "call", label: "전화 연결 버튼" },
  { value: "kakao", label: "카카오톡 상담" },
  { value: "form", label: "문의하기 양식" },
  { value: "purchase", label: "구매/결제" },
  { value: "reservation", label: "예약/신청" },
  { value: "auto", label: "알아서 해주세요" },
] as const;

const DESIRED_PAGES = [
  { value: "service-intro", label: "서비스 소개" },
  { value: "portfolio", label: "작업 사례" },
  { value: "testimonials", label: "고객 후기" },
  { value: "pricing", label: "가격 안내" },
  { value: "team", label: "회사 소개" },
  { value: "faq", label: "자주 묻는 질문" },
  { value: "map", label: "오시는 길" },
  { value: "contact-form", label: "문의 페이지" },
  { value: "auto", label: "알아서 해주세요" },
] as const;

const ADDITIONAL_FEATURES = [
  { value: "payment", label: "결제 연동", price: "+150,000원" },
  { value: "auth", label: "회원가입/로그인", price: "+100,000원" },
  { value: "logo", label: "로고 제작", price: "+50,000원" },
  { value: "auto", label: "알아서 추천해주세요" },
] as const;

const TIMELINES = [
  { value: "1주 이내", label: "1주 이내" },
  { value: "2주 이내", label: "2주 이내" },
  { value: "1개월 이내", label: "1개월 이내" },
  { value: "1개월 이상", label: "1개월 이상" },
  { value: "미정", label: "알아서 해주세요" },
] as const;

/* ─── Types ─── */
interface FormData {
  consultType: "phone" | "kakao" | null;
  name: string;
  phone: string;
  company: string;
  siteType: "landing" | "brand" | "";
  desiredFeatures: string[];
  desiredPages: string[];
  additionalFeatures: string[];
  timeline: string;
  extra: string;
}

const INITIAL: FormData = {
  consultType: null,
  name: "",
  phone: "",
  company: "",
  siteType: "",
  desiredFeatures: [],
  desiredPages: [],
  additionalFeatures: [],
  timeline: "",
  extra: "",
};

const TOTAL_STEPS = 4;

/* ─── Reusable Components ─── */

function CheckboxGroup({
  options,
  selected,
  onChange,
}: {
  options: readonly { value: string; label: string; price?: string }[];
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
              <span className="flex-1">
                {opt.label}
                {"price" in opt && opt.price && (
                  <span className="block text-xs text-indigo-500 font-medium mt-0.5">{opt.price}</span>
                )}
              </span>
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

/* ─── Step 1: Consultation Type ─── */
function ConsultStep1({ onPhone, onKakao }: { onPhone: () => void; onKakao: () => void }) {
  return (
    <div>
      <p className="text-indigo-500 text-sm font-bold tracking-wide">STEP 1</p>
      <p className="mt-2 text-lg font-semibold text-gray-900 leading-snug">
        어떤 방법으로<br />상담을 받으시겠어요?
      </p>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={onPhone}
          className="relative p-5 rounded-xl border-2 border-gray-200 hover:border-indigo-400 hover:bg-indigo-50/30 text-center transition-all duration-200 cursor-pointer group"
        >
          <div className="w-12 h-12 mx-auto rounded-full bg-indigo-100 group-hover:bg-indigo-200 flex items-center justify-center transition-colors">
            <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <p className="mt-3 text-sm font-bold text-gray-900">전화상담</p>
          <p className="mt-1 text-xs text-gray-500 leading-relaxed">지금 바로 연결됩니다</p>
        </button>
        <button
          type="button"
          onClick={onKakao}
          className="relative p-5 rounded-xl border-2 border-gray-200 hover:border-indigo-400 hover:bg-indigo-50/30 text-center transition-all duration-200 cursor-pointer group"
        >
          <div className="w-12 h-12 mx-auto rounded-full bg-yellow-100 group-hover:bg-yellow-200 flex items-center justify-center transition-colors">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3C6.48 3 2 6.58 2 10.94c0 2.8 1.86 5.27 4.66 6.67-.15.53-.96 3.4-.99 3.63 0 0-.02.17.09.24.11.06.24.01.24.01.32-.04 3.7-2.44 4.28-2.85.56.08 1.14.12 1.72.12 5.52 0 10-3.58 10-7.82C22 6.58 17.52 3 12 3Z"
                fill="#3C1E1E"
              />
            </svg>
          </div>
          <p className="mt-3 text-sm font-bold text-gray-900">카톡상담</p>
          <p className="mt-1 text-xs text-gray-500 leading-relaxed">간단한 정보 입력 후 상담</p>
        </button>
      </div>
    </div>
  );
}

/* ─── Step 2: Basic Info + Site Type ─── */
function ConsultStep2({ data, update, tried }: { data: FormData; update: (d: Partial<FormData>) => void; tried: boolean }) {
  const nameEmpty = tried && data.name.trim() === "";
  const phoneInvalid = tried && (data.phone.trim() === "" || data.phone.length < 10);
  const companyEmpty = tried && data.company.trim() === "";
  const siteEmpty = tried && data.siteType === "";

  return (
    <div className="space-y-6">
      <div>
        <p className="text-indigo-500 text-sm font-bold tracking-wide">STEP 2</p>
        <p className="mt-2 text-lg font-semibold text-gray-900 leading-snug">
          기본 정보를 입력해주세요
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <FieldLabel required>성함</FieldLabel>
            <input
              type="text"
              placeholder="홍길동"
              value={data.name}
              onChange={(e) => update({ name: e.target.value })}
              className={cn(
                "w-full h-11 px-3 rounded-lg border outline-none text-sm bg-white transition-colors",
                nameEmpty ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              )}
            />
            {nameEmpty && <p className="mt-1 text-xs text-red-500">성함을 입력해주세요</p>}
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
              className={cn(
                "w-full h-11 px-3 rounded-lg border outline-none text-sm bg-white transition-colors",
                phoneInvalid ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              )}
            />
            {phoneInvalid && (
              <p className="mt-1 text-xs text-red-500">
                {data.phone.trim() === "" ? "연락처를 입력해주세요" : "연락처를 다시 확인해주세요"}
              </p>
            )}
          </div>
        </div>
        <div>
          <FieldLabel required>업체명</FieldLabel>
          <input
            type="text"
            placeholder="업체명"
            value={data.company}
            onChange={(e) => update({ company: e.target.value })}
            className={cn(
              "w-full h-11 px-3 rounded-lg border outline-none text-sm bg-white transition-colors",
              companyEmpty ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            )}
          />
          {companyEmpty && <p className="mt-1 text-xs text-red-500">업체명을 입력해주세요</p>}
        </div>
      </div>

      {/* Site Type */}
      <div>
        <FieldLabel required>어떤 유형의 홈페이지를 만들고 싶으세요?</FieldLabel>
        {siteEmpty && <p className="text-xs text-red-500 mb-2">홈페이지 유형을 선택해주세요</p>}
        <div className="grid grid-cols-2 gap-3">
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
            <p className="mt-1 text-xs text-gray-500 leading-relaxed">스크롤 한 번에 모든 정보를 보여주는 1페이지</p>
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
              "p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer",
              data.siteType === "brand"
                ? "border-indigo-600 bg-indigo-50/50 shadow-sm"
                : "border-gray-200 hover:border-gray-300 bg-white"
            )}
          >
            <p className={cn("text-sm font-bold", data.siteType === "brand" ? "text-indigo-600" : "text-gray-900")}>브랜드형 홈페이지</p>
            <p className="mt-1 text-xs text-gray-500 leading-relaxed">메뉴가 있는 여러 페이지 사이트</p>
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
    </div>
  );
}

/* ─── Step 3: Desired Features + Pages ─── */
function ConsultStep3({ data, update }: { data: FormData; update: (d: Partial<FormData>) => void }) {
  return (
    <div className="space-y-7">
      <div>
        <p className="text-indigo-500 text-sm font-bold tracking-wide">STEP 3</p>
        <p className="mt-2 text-lg font-semibold text-gray-900 leading-snug">
          홈페이지에 어떤 것들을<br />넣고 싶으세요?
        </p>
        <p className="mt-1 text-sm text-gray-400">잘 모르시면 &apos;알아서 해주세요&apos;를 선택하시면 돼요!</p>
      </div>

      <div>
        <FieldLabel>넣고 싶은 기능</FieldLabel>
        <p className="text-xs text-gray-400 mb-3 -mt-1">여러 개 선택 가능</p>
        <CheckboxGroup
          options={DESIRED_FEATURES}
          selected={data.desiredFeatures}
          onChange={(v) => update({ desiredFeatures: v })}
        />
      </div>

      <div>
        <FieldLabel>넣고 싶은 페이지</FieldLabel>
        <p className="text-xs text-gray-400 mb-3 -mt-1">여러 개 선택 가능</p>
        <CheckboxGroup
          options={DESIRED_PAGES}
          selected={data.desiredPages}
          onChange={(v) => update({ desiredPages: v })}
        />
      </div>
    </div>
  );
}

/* ─── Step 4: Additional Features + Timeline + Extra ─── */
function ConsultStep4({ data, update }: { data: FormData; update: (d: Partial<FormData>) => void }) {
  return (
    <div className="space-y-7">
      <div>
        <p className="text-indigo-500 text-sm font-bold tracking-wide">STEP 4</p>
        <p className="mt-2 text-lg font-semibold text-gray-900 leading-snug">
          거의 다 왔어요!<br />마지막 단계입니다.
        </p>
      </div>

      <div>
        <FieldLabel>추가 기능이 필요하신가요?</FieldLabel>
        <p className="text-xs text-gray-400 mb-3 -mt-1">필요한 것만 선택 · 없으면 넘어가셔도 돼요</p>
        <CheckboxGroup
          options={ADDITIONAL_FEATURES}
          selected={data.additionalFeatures}
          onChange={(v) => update({ additionalFeatures: v })}
        />
      </div>

      <div>
        <FieldLabel>제작 희망 기간</FieldLabel>
        <RadioGroup
          options={TIMELINES}
          selected={data.timeline}
          onChange={(v) => update({ timeline: v })}
        />
      </div>

      <div>
        <FieldLabel>그 외 요청사항</FieldLabel>
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
function SuccessScreen({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const MESSAGE = "상담신청";

  const handleKakaoChat = () => {
    onClose();
    window.open(KAKAO_CHAT_URL, "_blank");
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

      <div className="mt-5 w-full bg-indigo-50 border-2 border-indigo-200 rounded-xl p-4">
        <p className="text-xs font-bold text-indigo-600 tracking-wide">마지막 한 단계!</p>
        <p className="mt-2 text-[15px] font-extrabold text-gray-900 leading-snug">
          카카오톡이 열리면<br />
          아래 문구를 보내주세요!
        </p>

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

/* ─── Main Form — Right Slide Panel ─── */
export default function ConsultationForm() {
  const { isOpen, close } = useConsultation();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [tried, setTried] = useState(false);
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
        setTried(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const update = (partial: Partial<FormData>) => setData((prev) => ({ ...prev, ...partial }));

  const handlePhone = () => {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "Lead");
    }
    window.location.href = `tel:${PHONE_NUMBER}`;
    close();
  };

  const handleKakao = () => {
    update({ consultType: "kakao" });
    setStep(2);
  };

  const canNext = (): boolean => {
    if (step === 2) {
      return (
        data.name.trim() !== "" &&
        data.phone.length >= 10 &&
        data.company.trim() !== "" &&
        data.siteType !== ""
      );
    }
    return true;
  };

  const handleSubmit = async () => {
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
        <>
          {/* Backdrop */}
          <motion.div
            ref={backdropRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Slide Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed top-0 right-0 z-[101] h-full w-full max-w-[440px] bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex-shrink-0 px-6 pt-6 pb-4 border-b border-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">무료 상담 신청</h3>
                  <p className="mt-1 text-sm text-gray-500">간단한 정보만 입력해주세요.</p>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
                  aria-label="닫기"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {!submitted && step > 1 && (
                <div className="mt-5">
                  <StepIndicator current={step - 1} total={TOTAL_STEPS - 1} />
                </div>
              )}
            </div>

            {/* Body — scrollable */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {submitted ? (
                <SuccessScreen onClose={handleClose} />
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -30, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {step === 1 && <ConsultStep1 onPhone={handlePhone} onKakao={handleKakao} />}
                    {step === 2 && <ConsultStep2 data={data} update={update} tried={tried} />}
                    {step === 3 && <ConsultStep3 data={data} update={update} />}
                    {step === 4 && <ConsultStep4 data={data} update={update} />}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            {/* Footer Navigation — fixed at bottom (Step 2+) */}
            {!submitted && step > 1 && (
              <div className="flex-shrink-0 px-6 py-4 border-t border-gray-100 bg-white">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => { setTried(false); setStep((s) => s - 1); }}
                    className="h-12 px-6 rounded-full border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    이전
                  </button>
                  {step < TOTAL_STEPS ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (canNext()) {
                          setTried(false);
                          setStep((s) => s + 1);
                        } else {
                          setTried(true);
                        }
                      }}
                      className={cn(
                        "flex-1 h-12 rounded-full text-white font-bold text-base transition-all duration-200",
                        "bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/25 cursor-pointer"
                      )}
                    >
                      다음 단계로
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={submitting}
                      className={`flex-1 h-12 rounded-full text-white font-bold text-base transition-all duration-200 shadow-lg shadow-indigo-600/25 ${submitting ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-500 cursor-pointer"}`}
                    >
                      {submitting ? "신청 중..." : "무료 신청하기"}
                    </button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
