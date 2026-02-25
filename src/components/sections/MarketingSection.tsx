"use client";

import { SECTION_MARKETING } from "@/constants/content";
import { TextAnimate } from "@/components/ui/text-animate";
import { BlurFade } from "@/components/ui/blur-fade";
import DecorativeWatermark from "@/components/shared/DecorativeWatermark";

export default function MarketingSection() {
  return (
    <section id="marketing" className="relative py-20 md:py-32 bg-white overflow-hidden">
      <DecorativeWatermark text="REVENUE" className="text-gray-100" />

      {/* Accent gradient bar at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-600 to-transparent" />

      {/* Decorative */}
      <div className="absolute top-1/3 right-0 w-64 h-64 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 blur-[80px] opacity-60" />
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-gradient-to-tr from-indigo-50 to-blue-50 blur-[60px] opacity-80" />

      <div className="relative max-w-5xl mx-auto px-4 md:px-6">
        <div className="text-center md:text-left">
          <BlurFade delay={0.05}>
            <p className="text-lg md:text-xl font-medium text-indigo-600">
              {SECTION_MARKETING.intro}
            </p>
          </BlurFade>
          <TextAnimate
            as="h2"
            by="word"
            animation="blurInUp"
            startOnView
            once
            className="mt-3 text-4xl md:text-6xl font-bold leading-tight tracking-tight text-gray-900"
          >
            {SECTION_MARKETING.title}
          </TextAnimate>
        </div>

        <div className="mt-12 md:mt-16 space-y-5">
          {SECTION_MARKETING.points.map((point, i) => (
            <BlurFade key={point.title} delay={0.2 + i * 0.1}>
              <div className="group flex gap-4 md:gap-6 p-5 md:p-6 rounded-2xl bg-gray-50 border border-gray-200 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/50 transition-all duration-300">
                <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-indigo-600/20 transition-transform duration-300 group-hover:scale-110">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-base md:text-lg font-normal leading-[1.7] text-gray-600">
                    {point.body}
                  </p>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
