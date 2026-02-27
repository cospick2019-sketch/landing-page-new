"use client";

import { SECTION_FINAL_CTA } from "@/constants/content";
import { TextAnimate } from "@/components/ui/text-animate";
import { BlurFade } from "@/components/ui/blur-fade";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Particles } from "@/components/ui/particles";

export default function FinalCtaSection() {
  return (
    <section id="cta" className="relative py-24 md:py-40 bg-gray-950 overflow-hidden">
      {/* BackgroundBeams */}
      <BackgroundBeams className="opacity-50" />

      {/* Particles */}
      <Particles
        className="absolute inset-0"
        quantity={25}
        color="#ffffff"
        size={0.3}
        staticity={40}
        vy={-0.2}
      />

      {/* Gradient accents */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent to-indigo-500/30" />

      {/* Decorative circles */}
      <div className="absolute top-1/4 left-[5%] w-64 h-64 rounded-full border border-white/5" />
      <div className="absolute bottom-1/4 right-[8%] w-48 h-48 rounded-full border border-indigo-500/10" />

      {/* Glowing orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-600/10 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-6 text-center">
        <TextAnimate
          as="h2"
          by="character"
          animation="blurInUp"
          startOnView
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight text-white whitespace-pre-line"
        >
          {SECTION_FINAL_CTA.title}
        </TextAnimate>

        <BlurFade delay={0.3}>
          <p className="mt-4 md:mt-6 text-lg md:text-xl font-normal leading-relaxed text-gray-400">
            {SECTION_FINAL_CTA.sub}
          </p>
        </BlurFade>

        <BlurFade delay={0.5}>
          <div className="mt-8 md:mt-10">
            <RainbowButton className="h-16 md:h-18 px-12 text-lg md:text-xl font-semibold rounded-full">
              {SECTION_FINAL_CTA.cta}
            </RainbowButton>
            <p className="mt-4 text-base text-gray-500">
              {SECTION_FINAL_CTA.ctaSub}
            </p>
          </div>
        </BlurFade>

        {/* Trust badges */}
        <BlurFade delay={0.65}>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {SECTION_FINAL_CTA.trustBadges.map((badge) => (
              <span
                key={badge}
                className="text-sm font-medium text-gray-500 border border-white/10 rounded-full px-4 py-1.5 bg-white/5"
              >
                {badge}
              </span>
            ))}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
