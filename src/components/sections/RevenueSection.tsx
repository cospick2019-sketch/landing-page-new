"use client";

import { useState } from "react";
import { SECTION_REVENUE, SHOWCASE_CALCULATOR } from "@/constants/content";
import { TYPO, SPACING, COLOR } from "@/constants/theme";
import { cn } from "@/lib/utils";
import SectionHeading from "./SectionHeading";
import { BlurFade } from "@/components/ui/blur-fade";

function formatKRW(n: number) {
  if (n >= 100_000_000) return `${(n / 100_000_000).toFixed(1)}억원`;
  if (n >= 10_000) return `${Math.round(n / 10_000).toLocaleString()}만원`;
  return `${n.toLocaleString()}원`;
}

export default function RevenueSection() {
  const [visitors, setVisitors] = useState(500);
  const [avgOrder, setAvgOrder] = useState(50000);

  const normalMonthly = visitors * 30 * SHOWCASE_CALCULATOR.normalCvr * avgOrder;
  const proMonthly = visitors * 30 * SHOWCASE_CALCULATOR.proCvr * avgOrder;
  const annualDiff = (proMonthly - normalMonthly) * 12;

  return (
    <section id="revenue" className="py-12 md:py-20 bg-gray-50">
      <div className={cn(SPACING.container, "text-center")}>
        <SectionHeading
          eyebrow={SECTION_REVENUE.eyebrow}
          title={SECTION_REVENUE.title}
          sub={SECTION_REVENUE.sub}
        />

        <BlurFade delay={0.3}>
          <div className={cn(SPACING.leadToContent, "max-w-3xl mx-auto")}>
            {/* 슬라이더 */}
            <div className="space-y-6 text-left">
              <div>
                <div className="flex justify-between mb-2">
                  <span className={cn(TYPO.caption, COLOR.light.caption)}>{SHOWCASE_CALCULATOR.visitorsLabel}</span>
                  <span className={cn(TYPO.caption, COLOR.light.title, "font-semibold")}>{visitors.toLocaleString()}명/일</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={5000}
                  step={100}
                  value={visitors}
                  onChange={(e) => setVisitors(Number(e.target.value))}
                  className="w-full accent-gray-900"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className={cn(TYPO.caption, COLOR.light.caption)}>{SHOWCASE_CALCULATOR.avgOrderLabel}</span>
                  <span className={cn(TYPO.caption, COLOR.light.title, "font-semibold")}>{avgOrder.toLocaleString()}원</span>
                </div>
                <input
                  type="range"
                  min={10000}
                  max={500000}
                  step={5000}
                  value={avgOrder}
                  onChange={(e) => setAvgOrder(Number(e.target.value))}
                  className="w-full accent-gray-900"
                />
              </div>
            </div>

            {/* 결과 비교 */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 rounded-xl border border-gray-200 bg-white">
                <p className={cn(TYPO.caption, COLOR.light.caption)}>{SHOWCASE_CALCULATOR.normalLabel}</p>
                <p className={cn("mt-1", TYPO.caption, COLOR.light.caption)}>{SHOWCASE_CALCULATOR.normalCvrLabel}</p>
                <p className={cn("mt-3 text-2xl md:text-3xl font-bold", COLOR.light.title)}>
                  {formatKRW(normalMonthly)}
                </p>
                <p className={cn("mt-1", TYPO.caption, COLOR.light.caption)}>{SHOWCASE_CALCULATOR.monthlyLabel}</p>
              </div>
              <div className="p-6 rounded-xl border-2 border-gray-900 bg-white">
                <p className={cn(TYPO.caption, COLOR.light.caption)}>{SHOWCASE_CALCULATOR.proLabel}</p>
                <p className={cn("mt-1", TYPO.caption, COLOR.light.caption)}>{SHOWCASE_CALCULATOR.proCvrLabel}</p>
                <p className={cn("mt-3 text-2xl md:text-3xl font-bold", COLOR.light.title)}>
                  {formatKRW(proMonthly)}
                </p>
                <p className={cn("mt-1", TYPO.caption, COLOR.light.caption)}>{SHOWCASE_CALCULATOR.monthlyLabel}</p>
              </div>
            </div>

            {/* 연간 차이 */}
            <div className="mt-6 p-6 rounded-xl bg-indigo-600 text-white text-center">
              <p className={cn(TYPO.caption, "text-indigo-200")}>{SHOWCASE_CALCULATOR.annualDiffLabel}</p>
              <p className="mt-2 text-3xl md:text-4xl font-extrabold">
                +{formatKRW(annualDiff)}
              </p>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
