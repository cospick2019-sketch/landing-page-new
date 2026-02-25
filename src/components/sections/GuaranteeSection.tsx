"use client";

import { motion } from "motion/react";
import { SECTION_GUARANTEE } from "@/constants/content";
import { TextAnimate } from "@/components/ui/text-animate";
import { BlurFade } from "@/components/ui/blur-fade";
import { Particles } from "@/components/ui/particles";
import { BorderBeam } from "@/components/ui/border-beam";

export default function GuaranteeSection() {
  return (
    <section id="guarantee" className="relative py-20 md:py-32 bg-gray-950 overflow-hidden">
      {/* Particles background */}
      <Particles
        className="absolute inset-0"
        quantity={30}
        color="#6366f1"
        size={0.4}
        staticity={40}
      />

      {/* Gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/8 rounded-full blur-[150px]" />

      {/* Decorative circles */}
      <div className="absolute top-20 right-[15%] w-48 h-48 rounded-full border border-white/5" />
      <div className="absolute bottom-16 left-[10%] w-32 h-32 rounded-full border border-indigo-500/10" />

      <div className="relative max-w-4xl mx-auto px-4 md:px-6 text-center">
        <BlurFade delay={0.1}>
          <motion.div
            animate={{ rotate: [0, 3, -3, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 mb-8"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-700 shadow-xl shadow-indigo-600/25" />
            <div className="absolute -inset-2 rounded-full border border-indigo-400/30" />
            <div className="absolute -inset-4 rounded-full border border-indigo-400/15" />
            <svg
              className="relative w-9 h-9 md:w-11 md:h-11 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </motion.div>
        </BlurFade>

        <TextAnimate
          as="h2"
          by="word"
          animation="blurInUp"
          startOnView
          once
          className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-white whitespace-pre-line"
        >
          {SECTION_GUARANTEE.title}
        </TextAnimate>

        <BlurFade delay={0.3}>
          <div className="relative mt-8 md:mt-10 max-w-2xl mx-auto p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden">
            <BorderBeam
              colorFrom="#4F46E5"
              colorTo="#818cf8"
              duration={10}
              size={60}
            />
            <p className="text-lg md:text-xl font-normal leading-[1.7] text-gray-300">
              {SECTION_GUARANTEE.body}
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.4}>
          <p className="mt-6 text-base text-gray-600">
            ({SECTION_GUARANTEE.disclaimer})
          </p>
        </BlurFade>
      </div>
    </section>
  );
}
