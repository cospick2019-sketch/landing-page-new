"use client";

import { SECTION_PRICING } from "@/constants/content";
import { cn } from "@/lib/utils";
import { TextAnimate } from "@/components/ui/text-animate";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { ShimmerButton } from "@/components/ui/shimmer-button";

function PricingCard({
  plan,
  index,
}: {
  plan: (typeof SECTION_PRICING.plans)[number];
  index: number;
}) {
  const isPopular = "popular" in plan && plan.popular;

  return (
    <BlurFade delay={0.15 + index * 0.1}>
      <div
        className={cn(
          "relative p-6 md:p-8 rounded-2xl border flex flex-col h-full text-center transition-all duration-300 overflow-hidden",
          isPopular
            ? "border-indigo-600 border-2 bg-white shadow-xl shadow-indigo-600/10 md:scale-105 md:-my-4"
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
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-1 rounded-full shadow-md z-10">
              가장 인기
            </span>
          </>
        )}

        <div className="mb-6">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-900">{plan.name}</h3>
          <p className="mt-2 text-base text-gray-500">{plan.desc}</p>
        </div>

        <div className="mb-6">
          <span className="text-3xl md:text-4xl font-extrabold text-gray-900">
            {plan.price}
          </span>
        </div>

        <ul className="space-y-3 mb-8 flex-1 text-left">
          {plan.features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-2.5 text-base text-gray-700"
            >
              <svg
                className={cn(
                  "w-5 h-5 mt-0.5 shrink-0",
                  isPopular ? "text-indigo-600" : "text-gray-400"
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {f}
            </li>
          ))}
        </ul>

        {isPopular ? (
          <ShimmerButton
            shimmerColor="#a5b4fc"
            shimmerSize="0.05em"
            background="#4F46E5"
            borderRadius="100px"
            className="w-full h-12 px-6 text-base font-medium rounded-full text-white"
          >
            시작하기
          </ShimmerButton>
        ) : (
          <a
            href="#cta"
            className="inline-flex items-center justify-center w-full h-12 px-6 text-base font-medium rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            시작하기
          </a>
        )}
      </div>
    </BlurFade>
  );
}

export default function PricingSection() {
  return (
    <section id="pricing" className="relative py-20 md:py-32 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-100/30 to-purple-100/20 blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-gradient-to-tl from-blue-100/20 to-indigo-100/10 blur-[100px]" />
      <div className="absolute top-40 right-[10%] w-48 h-48 rounded-full border border-indigo-100/40 hidden md:block" />

      <div className="relative max-w-5xl mx-auto px-4 md:px-6 text-center">
        <TextAnimate
          as="h2"
          by="word"
          animation="blurInUp"
          startOnView
          once
          className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-gray-900"
        >
          {SECTION_PRICING.title}
        </TextAnimate>
        <BlurFade delay={0.15}>
          <p className="mt-4 text-lg md:text-xl text-gray-500">
            {SECTION_PRICING.sub}
          </p>
        </BlurFade>

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:items-center">
          {SECTION_PRICING.plans.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
