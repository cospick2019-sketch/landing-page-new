"use client";

import { motion } from "motion/react";
import { SECTION_SCARCITY } from "@/constants/content";
import { TextAnimate } from "@/components/ui/text-animate";
import { BlurFade } from "@/components/ui/blur-fade";

export default function ScarcitySection() {
  return (
    <section className="relative py-20 md:py-32 bg-gray-950 overflow-hidden">
      {/* Giant "12" watermark */}
      <span
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] md:text-[20vw] font-black text-white/[0.03] select-none pointer-events-none leading-none"
        aria-hidden="true"
      >
        12
      </span>

      {/* Gradient meshes */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_30%_50%,rgba(99,102,241,0.1),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_20%,rgba(139,92,246,0.08),transparent)]" />

      {/* Decorative circles */}
      <div className="absolute top-16 left-[10%] w-48 h-48 rounded-full border border-white/5" />
      <div className="absolute bottom-16 right-[12%] w-36 h-36 rounded-full border border-indigo-500/10" />

      <div className="relative max-w-3xl mx-auto px-4 md:px-6 text-center">
        <BlurFade delay={0.05}>
          <p className="text-lg md:text-xl font-medium text-gray-500">
            {SECTION_SCARCITY.intro}
          </p>
        </BlurFade>

        <TextAnimate
          as="h2"
          by="character"
          animation="blurInUp"
          startOnView
          once
          className="mt-3 text-4xl md:text-6xl font-bold leading-tight tracking-tight text-white"
        >
          {SECTION_SCARCITY.title}
        </TextAnimate>

        <div className="mt-10 md:mt-12 space-y-4">
          {SECTION_SCARCITY.body.map((text, i) => (
            <BlurFade key={i} delay={0.25 + i * 0.1}>
              <div className="p-5 md:p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <p className="text-lg md:text-xl font-normal leading-[1.7] text-gray-300">
                  {text}
                </p>
              </div>
            </BlurFade>
          ))}
        </div>

        <BlurFade delay={0.45}>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mt-10 md:mt-12 inline-block px-8 py-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-700 shadow-xl shadow-indigo-600/20"
          >
            <p className="text-2xl md:text-3xl font-semibold leading-snug text-white whitespace-pre-line">
              {SECTION_SCARCITY.closing}
            </p>
          </motion.div>
        </BlurFade>
      </div>
    </section>
  );
}
