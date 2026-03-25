"use client";

import { SECTION_PRICING } from "@/constants/content";
import { cn } from "@/lib/utils";
import { TextAnimate } from "@/components/ui/text-animate";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { useConsultation } from "@/components/consultation/ConsultationContext";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("w-5 h-5 shrink-0", className)}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function PricingCard({
  plan,
  index,
  onCtaClick,
}: {
  plan: (typeof SECTION_PRICING.plans)[number];
  index: number;
  onCtaClick: () => void;
}) {
  const isPopular = "popular" in plan && plan.popular;

  return (
    <BlurFade delay={0.15 + index * 0.1} className="flex">
      <div
        className={cn(
          "relative pt-10 p-6 md:p-8 md:pt-10 rounded-2xl border flex flex-col w-full transition-all duration-300 overflow-visible",
          isPopular
            ? "border-indigo-500 border-2 bg-white shadow-xl shadow-indigo-500/10"
            : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg"
        )}
      >
        {isPopular && (
          <>
            <BorderBeam
              colorFrom="#4F46E5"
              colorTo="#818cf8"
              duration={8}
              size={60}
            />
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-white bg-indigo-600 px-4 py-1.5 rounded-full shadow-md z-10 tracking-wide whitespace-nowrap">
              BEST
            </span>
          </>
        )}

        {/* Event Badge */}
        {"originalPriceNum" in plan && (
          <span className="inline-flex items-center gap-1.5 w-fit px-3 py-1.5 mb-3 rounded-md bg-indigo-600 text-white text-xs font-bold tracking-wide animate-shimmer bg-[length:200%_100%] bg-[linear-gradient(110deg,#4f46e5_0%,#818cf8_40%,#4f46e5_60%,#4f46e5_100%)] shadow-sm">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            기간 한정 특가
          </span>
        )}

        {/* Tag */}
        <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
          {plan.tag}
        </p>

        {/* Name & Desc */}
        <h3 className="mt-2 text-2xl md:text-3xl font-bold text-gray-900">
          {plan.name}
        </h3>
        <p className="mt-1 text-sm text-gray-500">{plan.desc}</p>

        {/* Price */}
        <div className="mt-6 flex flex-col items-center gap-1">
          {"originalPriceNum" in plan && (
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg md:text-xl text-gray-400 line-through font-medium decoration-indigo-300 decoration-2">
                {plan.originalPriceNum}{plan.priceSuffix}
              </span>
            </div>
          )}
          <div className="flex items-baseline justify-center gap-1">
            <span className={cn(
              "text-5xl md:text-6xl font-extrabold leading-none tracking-tight",
              "originalPriceNum" in plan ? "text-indigo-600" : "text-gray-900"
            )}>
              {plan.priceNum}
            </span>
            <span className={cn(
              "text-lg md:text-xl font-medium",
              "originalPriceNum" in plan ? "text-indigo-500" : "text-gray-500"
            )}>
              {plan.priceSuffix}
            </span>
          </div>
        </div>

        {/* Pages */}
        <div className="mt-4 mb-6">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold",
              isPopular
                ? "bg-indigo-50 text-indigo-700"
                : "bg-gray-100 text-gray-700"
            )}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {plan.pages}
          </span>
        </div>

        {/* Base Features */}
        <ul className="space-y-3 mb-8 flex-1">
          {SECTION_PRICING.baseFeatures.map((f) => (
            <li
              key={f}
              className="flex items-start gap-2.5 text-sm text-gray-600"
            >
              <CheckIcon
                className={cn(
                  "mt-0.5",
                  isPopular ? "text-indigo-600" : "text-gray-400"
                )}
              />
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        {isPopular ? (
          <ShimmerButton
            shimmerColor="#a5b4fc"
            shimmerSize="0.05em"
            background="#4F46E5"
            borderRadius="100px"
            className="w-full h-12 px-6 text-base font-semibold rounded-full text-white"
            onClick={onCtaClick}
          >
            무료 상담 신청
          </ShimmerButton>
        ) : (
          <button
            type="button"
            onClick={onCtaClick}
            className="inline-flex items-center justify-center w-full h-12 px-6 text-base font-semibold rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            무료 상담 신청
          </button>
        )}
      </div>
    </BlurFade>
  );
}

export default function PricingSection() {
  const { open: openConsultation } = useConsultation();
  return (
    <section
      id="pricing"
      className="relative py-20 md:py-32 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden"
    >
      {/* Decorative */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-100/30 to-purple-100/20 blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-gradient-to-tl from-blue-100/20 to-indigo-100/10 blur-[100px]" />

      <div className="relative max-w-5xl mx-auto px-4 md:px-6 text-center">
        {/* Eyebrow */}
        {SECTION_PRICING.eyebrow && (
          <BlurFade delay={0.05}>
            <p className="text-sm font-semibold tracking-widest text-indigo-500 uppercase mb-3">
              {SECTION_PRICING.eyebrow}
            </p>
          </BlurFade>
        )}

        {/* Title */}
        <TextAnimate
          as="h2"
          by="word"
          animation="blurInUp"
          startOnView
          className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-gray-900"
        >
          {SECTION_PRICING.title}
        </TextAnimate>

        {/* Sub */}
        <BlurFade delay={0.15}>
          <p className="mt-4 text-lg md:text-xl text-gray-500">
            {SECTION_PRICING.sub}
          </p>
        </BlurFade>

        {/* Cards */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:items-stretch">
          {SECTION_PRICING.plans.map((plan, i) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              index={i}
              onCtaClick={openConsultation}
            />
          ))}
        </div>

        {/* Notice */}
        <BlurFade delay={0.4}>
          <p className="mt-14 text-sm text-gray-400 leading-relaxed">
            * 관리자 페이지는 문의 폼, 로그인, 결제 기능 포함 시 제공됩니다.
            <br />
            * VAT 미포함 · 작업량과 요청에 따라 추가비용이 발생할 수 있습니다.
          </p>
        </BlurFade>
      </div>
    </section>
  );
}
