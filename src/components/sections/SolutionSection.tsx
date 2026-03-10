"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { SECTION_SOLUTION } from "@/constants/content";
import { BorderBeam } from "@/components/ui/border-beam";
import { DotPattern } from "@/components/ui/dot-pattern";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { CheckCircle2, XCircle } from "lucide-react";

/** Custom easing matching reference sites */
const EASE_SMOOTH = [0.23, 1, 0.32, 1] as const;

export default function SolutionSection() {
  const { comparison } = SECTION_SOLUTION;
  const [titleLine1, titleLine2] = SECTION_SOLUTION.title.split("\n");

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={sectionRef}
      id="solution"
      className="relative pt-16 pb-24 md:pt-40 md:pb-32 bg-[#030513] overflow-hidden"
    >
      {/* Ambient glowing radial gradients for background depth */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      {/* Premium Subtle Dot Grid Background */}
      <DotPattern
        width={32}
        height={32}
        cx={1}
        cy={1}
        cr={1.5}
        className="absolute inset-0 h-full w-full fill-indigo-500/20 [mask-image:radial-gradient(900px_circle_at_top,white,transparent)]"
      />

      <div className="relative max-w-6xl mx-auto px-5 md:px-6 z-10">

        {/* Title Area */}
        <div className="text-center max-w-4xl mx-auto mb-10 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_SMOOTH }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-bold tracking-widest uppercase mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            {SECTION_SOLUTION.eyebrow}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_SMOOTH }}
            className="text-3xl md:text-5xl lg:text-[3.5rem] font-bold leading-tight tracking-tight text-white whitespace-pre-line"
          >
            {titleLine1}
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE_SMOOTH }}
            className="text-3xl md:text-5xl lg:text-[3.5rem] font-bold leading-tight tracking-tight text-indigo-400 mt-2 whitespace-pre-line"
          >
            {titleLine2}
          </motion.h2>
        </div>

        {/* Comparison Bento Grid relative container */}
        <div className="relative">

          {/* Central VS Badge (Absolute Center) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden lg:flex pointer-events-none">
            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: -15 }}
              whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8, ease: EASE_SMOOTH }}
              className="relative w-16 h-16 rounded-full bg-slate-900 border-[4px] border-[#0a0a0a] text-white flex items-center justify-center text-xl font-black shadow-2xl shadow-indigo-500/20"
            >
              VS
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-stretch">

            {/* Left: General Agency (Bad) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE_SMOOTH }}
              className="relative flex flex-col p-6 md:p-12 rounded-[2rem] bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 shadow-xl"
            >
              <div className="flex items-center gap-4 mb-6 md:mb-10">
                <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center shadow-inner border border-slate-700">
                  <XCircle className="w-6 h-6 text-slate-400" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-300">
                  {comparison.bad.label}
                </h3>
              </div>

              <div className="flex flex-col gap-3 md:gap-4 flex-1 justify-start relative pb-4 md:pb-6">
                {/* Connecting line behind blocks */}
                <div className="absolute left-6 top-8 bottom-16 w-px bg-slate-700 hidden md:block" />

                {comparison.bad.messages.map((msg, i) => (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: EASE_SMOOTH }}
                    key={i}
                    className="flex items-center gap-4 md:gap-5 p-4 md:p-5 rounded-2xl bg-slate-900 border border-slate-700 relative z-30 shadow-lg"
                  >
                    <div className="w-3 h-3 rounded-full bg-slate-600 shrink-0 ml-1 ring-4 ring-slate-900" />
                    <p className="text-lg font-medium text-slate-400">{msg}</p>
                  </motion.div>
                ))}

                {/* Stacked effect & Ellipsis for more requests - desktop only */}
                <div className="relative hidden md:flex flex-col items-center z-10 w-full mt-[-8px]">
                  {/* Layer 1 (Closest) */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6, ease: EASE_SMOOTH }}
                    className="h-10 rounded-b-3xl bg-[#0F172A] border-x border-b border-slate-700 w-[94%] z-20 shadow-[0_10px_10px_rgba(0,0,0,0.5)] flex items-end justify-center pb-2"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-600/80 mx-1" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-600/80 mx-1" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-600/80 mx-1" />
                  </motion.div>

                  {/* Layer 2 (Middle) */}
                  <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.7, ease: EASE_SMOOTH }}
                    className="h-8 rounded-b-3xl bg-[#0F172A]/70 border-x border-b border-slate-700/60 w-[86%] -mt-6 z-10 shadow-[0_5px_10px_rgba(0,0,0,0.4)] backdrop-blur-sm"
                  />

                  {/* Layer 3 (Furthest - Fading out) */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.8, ease: EASE_SMOOTH }}
                    className="h-6 rounded-b-3xl bg-gradient-to-b from-[#0F172A]/40 to-transparent border-x border-b border-slate-700/30 w-[78%] -mt-4 z-0 backdrop-blur-md"
                  />
                </div>
                {/* Mobile: simple ellipsis */}
                <div className="flex md:hidden items-center justify-center gap-1.5 pt-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600/80" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600/80" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600/80" />
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.9, ease: EASE_SMOOTH }}
                className="mt-auto pt-6 relative z-20 w-full"
              >
                <div className="relative p-5 md:p-6 rounded-2xl bg-[#0F1123] border border-indigo-500/30 overflow-hidden text-center shadow-2xl">
                  {/* Subtle warning stripes / danger pattern in dark mode style */}
                  <div className="absolute inset-0 opacity-[0.03] bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#fff_10px,#fff_20px)] pointer-events-none" />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-1 bg-gradient-to-r from-transparent via-indigo-500/80 to-transparent" />

                  <span className="relative z-10 text-white font-black text-xl md:text-2xl tracking-tight">
                    {comparison.bad.sub}
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Mobile VS Badge */}
            <div className="flex lg:hidden justify-center -my-3 relative z-20 pointer-events-none">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5, ease: EASE_SMOOTH }}
                className="w-12 h-12 rounded-full bg-slate-900 border-[3px] border-[#0a0a0a] text-white flex items-center justify-center text-lg font-black shadow-xl"
              >
                VS
              </motion.div>
            </div>

            {/* Right: Our Way (Good) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE_SMOOTH }}
              className="relative flex flex-col p-6 md:p-12 rounded-[2rem] bg-[#1a1c4b]/80 backdrop-blur-sm border-[2px] border-indigo-500 overflow-hidden shadow-[0_0_80px_rgba(99,102,241,0.15)]"
            >
              <BorderBeam colorFrom="#6366f1" colorTo="#ffffff" duration={10} size={200} borderWidth={2} />

              <div className="relative z-10 flex items-center gap-4 mb-6 md:mb-10">
                <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/40">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white">
                  {comparison.good.label}
                </h3>
              </div>

              <div className="relative z-10 flex flex-col gap-4 md:gap-6 flex-1 justify-start pt-2 pb-4 md:pb-6">

                {/* Full-width Unified Highlight Block */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4, ease: EASE_SMOOTH }}
                  className="relative z-20 mb-5 md:mb-8 mt-2 w-full"
                >
                  <div className="relative w-full flex items-center justify-center bg-indigo-600 px-6 py-5 md:px-8 md:py-6 rounded-2xl shadow-[0_15px_30px_rgba(79,70,229,0.5)] overflow-hidden">
                    {/* Subtle premium gradient for depth */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

                    <p className="relative z-10 flex items-center justify-center text-2xl sm:text-3xl md:text-3xl lg:text-[2.25rem] font-black text-white whitespace-nowrap tracking-tight drop-shadow-md">
                      <span className="text-indigo-200 font-serif text-3xl md:text-4xl mr-3 md:mr-4 transform -translate-y-1 opacity-90">&ldquo;</span>
                      <span className="mt-1">{comparison.good.desc.replace(/"/g, '')}</span>
                      <span className="text-indigo-200 font-serif text-3xl md:text-4xl ml-3 md:ml-4 transform -translate-y-1 opacity-90">&rdquo;</span>
                    </p>
                  </div>
                </motion.div>

                {/* Steps List */}
                <div className="space-y-3 md:space-y-4">
                  {comparison.good.steps.map((step, i) => (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: EASE_SMOOTH }}
                      key={i}
                      className="flex items-center gap-4 md:gap-5 p-3.5 md:p-4 rounded-2xl bg-[#0b0e26]/60 border border-indigo-500/30 shadow-md backdrop-blur-sm"
                    >
                      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-indigo-500 text-white font-black text-sm shrink-0 shadow-lg shadow-indigo-500/50">
                        {i + 1}
                      </div>
                      <p className="text-[1.1rem] md:text-lg font-bold text-white break-keep">{step}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

            </motion.div>
          </div>
        </div>

        {/* Closing - Borderless & Elegant & Solid Contrast */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: EASE_SMOOTH }}
          className="mt-12 md:mt-36 relative text-center"
        >
          {/* Subtle upper line */}
          <div className="mx-auto w-16 h-1 bg-slate-800 rounded-full mb-12" />

          <h3 className="text-2xl md:text-5xl lg:text-[4rem] font-black leading-[1.3] tracking-tight whitespace-pre-line">
            <span className="text-white">대표님은 그 시간에 </span>
            <span className="text-indigo-400">매출만</span>
            <span className="text-white"> 신경 쓰세요.</span>
          </h3>

        </motion.div>

      </div>
    </section>
  );
}
