"use client";

import { motion } from "motion/react";
import { HERO, HERO_CREDENTIALS } from "@/constants/content";
import { HERO_STYLE as H, ANIM } from "@/constants/theme";
import { InteractiveCanvas } from "@/components/ui/interactive-canvas";
import { WordRotate } from "@/components/ui/word-rotate";
import { TextAnimate } from "@/components/ui/text-animate";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { BlurFade } from "@/components/ui/blur-fade";
import { useConsultation } from "@/components/consultation/ConsultationContext";

export default function HeroSection() {
  const { open } = useConsultation();
  return (
    <section
      id="hero"
      className="relative min-h-svh flex flex-col items-center justify-center overflow-hidden bg-gray-900"
    >
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Decorative English watermark */}
      <motion.span
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] md:text-[20vw] font-black text-white/[0.03] select-none pointer-events-none whitespace-nowrap tracking-tighter"
        aria-hidden="true"
      >
        SELLING
      </motion.span>

      {/* Interactive canvas background */}
      <InteractiveCanvas
        rgb="255, 255, 255"
        count={50}
        linkDist={140}
        mouseRadius={250}
      />

      <div className="relative z-10 text-center pointer-events-none max-w-4xl mx-auto px-4 md:px-6">
        {/* Eyebrow - WordRotate */}
        <BlurFade delay={0}>
          <div className="flex justify-center">
            <WordRotate
              words={[...HERO_CREDENTIALS.rotatingCredentials]}
              duration={ANIM.wordRotate.duration}
              className="text-lg md:text-xl font-medium tracking-widest uppercase text-indigo-400"
            />
          </div>
        </BlurFade>

        {/* H1 - Character-level animation, line-break aware */}
        <h1 className="mt-4 md:mt-6 text-4xl md:text-8xl lg:text-9xl font-extrabold leading-[1.2] md:leading-[1.15] text-white">
          {HERO.h1.split("\n").map((line, i) => (
            <TextAnimate
              key={i}
              as="span"
              by="character"
              animation="blurInUp"
              startOnView={false}
              delay={0.3 + i * 0.5}
              duration={1.2}
              className="block"
            >
              {line.trim()}
            </TextAnimate>
          ))}
        </h1>

        {/* Sub-headline - Word-level animation */}
        <TextAnimate
          as="p"
          by="word"
          animation="blurInUp"
          startOnView={false}
          delay={0.8}
          duration={0.8}
          className="mt-4 md:mt-6 text-lg md:text-4xl font-normal leading-snug text-gray-300"
        >
          {HERO.subHeadline}
        </TextAnimate>

        {/* Trust Signal */}
        <BlurFade delay={1.2}>
          <div className="mt-8 md:mt-10 flex justify-center">
            <TypingAnimation
              className="text-base md:text-2xl font-medium leading-[1.7] text-indigo-400"
              duration={ANIM.typing.duration}
              loop
              pauseDelay={4000}
            >
              {HERO.trustSignal}
            </TypingAnimation>
          </div>
        </BlurFade>

        {/* CTA */}
        <BlurFade delay={1.5}>
          <div className="mt-8 md:mt-10 pointer-events-auto">
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ShimmerButton
                shimmerColor={H.cta.shimmerColor}
                shimmerSize={ANIM.shimmer.size}
                background={H.cta.hex}
                borderRadius={ANIM.shimmer.borderRadius}
                className="h-12 md:h-16 px-8 md:px-10 text-base md:text-lg font-semibold rounded-full mx-auto text-white"
                onClick={open}
              >
                {HERO.cta}
              </ShimmerButton>
            </motion.div>
          </div>
        </BlurFade>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none animate-bounce">
        <span className="text-xs font-medium tracking-widest uppercase text-gray-400">
          Scroll
        </span>
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
