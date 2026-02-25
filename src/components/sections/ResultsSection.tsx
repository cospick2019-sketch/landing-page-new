"use client";

import { SECTION_RESULTS, SHOWCASE_DASHBOARD } from "@/constants/content";
import { TYPO, SPACING, COLOR } from "@/constants/theme";
import { cn } from "@/lib/utils";
import SectionHeading from "./SectionHeading";
import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";

const METRICS = [
  {
    label: SHOWCASE_DASHBOARD.cvr.label,
    before: SHOWCASE_DASHBOARD.cvr.before,
    after: SHOWCASE_DASHBOARD.cvr.after,
    unit: SHOWCASE_DASHBOARD.cvr.unit,
    decimals: SHOWCASE_DASHBOARD.cvr.decimals,
  },
  {
    label: SHOWCASE_DASHBOARD.bounce.label,
    before: SHOWCASE_DASHBOARD.bounce.before,
    after: SHOWCASE_DASHBOARD.bounce.after,
    unit: SHOWCASE_DASHBOARD.bounce.unit,
    decimals: SHOWCASE_DASHBOARD.bounce.decimals,
    lowerBetter: true,
  },
  {
    label: SHOWCASE_DASHBOARD.duration.label,
    before: SHOWCASE_DASHBOARD.duration.before,
    after: SHOWCASE_DASHBOARD.duration.after,
    unit: SHOWCASE_DASHBOARD.duration.unit,
    decimals: SHOWCASE_DASHBOARD.duration.decimals,
  },
];

export default function ResultsSection() {
  return (
    <section id="results" className="py-12 md:py-20 bg-gray-50">
      <div className={cn(SPACING.container, "text-center")}>
        <SectionHeading
          eyebrow={SECTION_RESULTS.eyebrow}
          title={SECTION_RESULTS.title}
          sub={SECTION_RESULTS.sub}
        />

        <div className={cn(SPACING.leadToContent, "grid grid-cols-1 md:grid-cols-3 gap-6")}>
          {METRICS.map((m, i) => (
            <BlurFade key={m.label} delay={0.1 + i * 0.1}>
              <div className="p-6 rounded-xl border border-gray-200 bg-white text-center">
                <p className={cn(TYPO.caption, COLOR.light.caption)}>
                  {m.label}
                </p>

                {/* Before → After */}
                <div className="mt-4 flex items-baseline justify-center gap-3">
                  <span className={cn("text-xl font-normal text-gray-400 line-through")}>
                    {m.before}{m.unit}
                  </span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                  <span className="text-3xl md:text-4xl font-extrabold text-gray-900">
                    <NumberTicker value={m.after} decimalPlaces={m.decimals} />
                    {m.unit}
                  </span>
                </div>

                <p className={cn("mt-3", TYPO.caption, COLOR.light.caption)}>
                  {m.lowerBetter ? "감소" : "상승"}
                </p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
