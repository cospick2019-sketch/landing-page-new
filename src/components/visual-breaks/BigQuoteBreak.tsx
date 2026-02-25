"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { VISUAL_BREAKS } from "@/constants/content";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function BigQuoteBreak() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const { stat, suffix, label, subtext } = VISUAL_BREAKS.bigQuote;

  return (
    <section
      ref={ref}
      className="relative min-h-[50vh] flex items-center justify-center bg-gray-950 overflow-hidden"
    >
      <BackgroundBeams className="opacity-40" />

      <motion.div
        style={{ y, scale, opacity }}
        className="relative z-10 text-center px-4"
      >
        <span className="text-[20vw] md:text-[15vw] lg:text-[12vw] font-black text-white/10 leading-none">
          {stat}
          <span className="text-indigo-500/20">{suffix}</span>
        </span>
        <p className="mt-2 text-lg md:text-xl font-semibold text-gray-400">
          {label}
        </p>
        <p className="mt-1 text-sm md:text-base text-gray-600">
          {subtext}
        </p>
      </motion.div>
    </section>
  );
}
