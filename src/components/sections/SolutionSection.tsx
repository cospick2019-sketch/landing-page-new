"use client";

import { SECTION_SOLUTION } from "@/constants/content";
import { TextAnimate } from "@/components/ui/text-animate";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { LampContainer } from "@/components/ui/lamp";

export default function SolutionSection() {
  const { comparison } = SECTION_SOLUTION;

  return (
    <section id="solution" className="relative bg-gray-950 overflow-hidden">
      {/* Lamp heading area */}
      <LampContainer
        bgColor="bg-gray-950"
        gradientFrom="#4F46E5"
        glowColor="#4F46E5"
        lineColor="#818cf8"
        className="min-h-[60vh] !pb-0"
      >
        <TextAnimate
          as="h2"
          by="word"
          animation="blurInUp"
          once
          className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-white text-center whitespace-pre-line"
        >
          {SECTION_SOLUTION.title}
        </TextAnimate>
      </LampContainer>

      {/* Content area */}
      <div className="relative max-w-5xl mx-auto px-4 md:px-6 pb-20 md:pb-32 -mt-40 md:-mt-56">
        <div className="relative">
          {/* VS Badge - Desktop */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex">
            <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-bold shadow-lg shadow-indigo-600/30">
              VS
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Bad - Agency */}
            <BlurFade delay={0.2}>
              <div className="h-full p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-red-500/20 text-center">
                <span className="inline-block text-sm font-semibold text-gray-400 bg-white/10 px-4 py-1.5 rounded-full">
                  {comparison.bad.label}
                </span>
                <p className="mt-6 text-lg md:text-xl font-normal leading-[1.7] text-gray-400">
                  {comparison.bad.desc}
                </p>
                <div className="mt-4 h-px bg-white/10" />
                <p className="mt-4 text-base text-gray-500">
                  ({comparison.bad.sub})
                </p>
              </div>
            </BlurFade>

            {/* Mobile VS Badge */}
            <div className="flex md:hidden justify-center -my-1">
              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-indigo-600/30">
                VS
              </div>
            </div>

            {/* Good - Our way */}
            <BlurFade delay={0.3}>
              <div className="relative h-full p-6 md:p-8 rounded-2xl bg-indigo-600/10 backdrop-blur-sm border border-indigo-500/30 text-center overflow-hidden">
                <BorderBeam
                  colorFrom="#4F46E5"
                  colorTo="#818cf8"
                  duration={8}
                  size={80}
                />
                <span className="inline-block text-sm font-semibold text-white bg-indigo-600 px-4 py-1.5 rounded-full">
                  {comparison.good.label}
                </span>
                <p className="mt-6 text-lg md:text-xl font-normal leading-[1.7] text-gray-200">
                  {comparison.good.desc}
                </p>

                <div className="mt-6 space-y-3">
                  {comparison.good.steps.map((step, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3.5 rounded-xl bg-white/10 text-left"
                    >
                      <span className="shrink-0 w-7 h-7 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </span>
                      <span className="text-base font-semibold text-white">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </BlurFade>
          </div>
        </div>

        <BlurFade delay={0.45}>
          <p className="mt-12 md:mt-16 text-2xl md:text-3xl font-semibold leading-snug text-gray-300 text-center whitespace-pre-line">
            {SECTION_SOLUTION.closing}
          </p>
        </BlurFade>
      </div>
    </section>
  );
}
