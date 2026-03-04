"use client";

import { SECTION_FINAL_CTA } from "@/constants/content";
import { TextAnimate } from "@/components/ui/text-animate";
import { BlurFade } from "@/components/ui/blur-fade";
import { Particles } from "@/components/ui/particles";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { useConsultation } from "@/components/consultation/ConsultationContext";

export default function FinalCtaSection() {
  const { open } = useConsultation();
  return (
    <section id="cta" className="relative py-20 md:py-48 lg:py-56 bg-[#030513] overflow-hidden flex flex-col items-center justify-center min-h-[60vh] md:min-h-[85vh]">

      {/* Background Particles - Sparse and slow, like stardust */}
      <Particles
        className="absolute inset-0 opacity-40 z-0"
        quantity={40}
        color="#818cf8"
        size={0.5}
        staticity={50}
        vy={-0.1}
      />

      {/* Mega Spotlight / Black Hole Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-gradient-radial from-indigo-600/20 via-purple-900/10 to-transparent rounded-full blur-[100px] pointer-events-none mix-blend-screen z-0" />

      {/* Intense Center Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none mix-blend-screen z-0" />

      {/* Subtle Grid overlay for texture */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] mix-blend-overlay pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 md:px-6 text-center flex flex-col items-center">

        {/* Eyebrow Label */}
        <BlurFade delay={0.1}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-bold tracking-widest uppercase mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            마지막 단계
          </div>
        </BlurFade>

        {/* Massive Headline */}
        <div className="flex flex-col items-center">
          {SECTION_FINAL_CTA.title.split("\n").map((line, i) => (
            <TextAnimate
              key={i}
              as="h2"
              by="word"
              animation="blurInUp"
              startOnView
              className="text-3xl md:text-7xl lg:text-[5rem] font-black leading-[1.3] md:leading-[1.2] tracking-tight text-white whitespace-pre-line drop-shadow-2xl"
            >
              {line.trim()}
            </TextAnimate>
          ))}
        </div>

        <BlurFade delay={0.3}>
          <p className="mt-8 text-xl md:text-2xl font-medium text-indigo-200/80 max-w-2xl mx-auto">
            {SECTION_FINAL_CTA.sub}
          </p>
        </BlurFade>

        {/* Action Area */}
        <BlurFade delay={0.5} className="mt-14 w-full flex flex-col items-center">

          <button
            type="button"
            onClick={open}
            className="group relative inline-flex justify-center items-center py-4 px-8 md:py-5 md:px-14 border border-transparent text-lg md:text-2xl font-bold rounded-2xl text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-[#030513] transition-all duration-300 overflow-hidden shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:shadow-[0_0_50px_rgba(99,102,241,0.5)] hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
            <span className="relative z-10 flex items-center gap-3">
              {SECTION_FINAL_CTA.cta}
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
            </span>
          </button>

          <p className="mt-6 text-sm md:text-base text-gray-400 font-medium">
            {SECTION_FINAL_CTA.ctaSub}
          </p>
        </BlurFade>

        {/* Trust badges - Elegant List */}
        <BlurFade delay={0.7} className="w-full mt-12 md:mt-16 border-t border-white/10 pt-10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
            {SECTION_FINAL_CTA.trustBadges.map((badge, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-300 font-medium text-base md:text-lg">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" strokeWidth={3} />
                </div>
                {badge}
              </div>
            ))}
          </div>
        </BlurFade>

      </div>
    </section>
  );
}
