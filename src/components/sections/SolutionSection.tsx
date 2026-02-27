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
      className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-[#030513] overflow-hidden"
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

      <div className="relative max-w-6xl mx-auto px-4 md:px-6 z-10">

        {/* Title Area */}
        <div className="text-center max-w-4xl mx-auto mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, ease: EASE_SMOOTH }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-bold tracking-widest uppercase mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            {SECTION_SOLUTION.eyebrow}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, ease: EASE_SMOOTH }}
            className="text-3xl md:text-5xl lg:text-[3.5rem] font-bold leading-tight tracking-tight text-white whitespace-pre-line"
          >
            {titleLine1}
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
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
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.8, ease: EASE_SMOOTH }}
              className="relative w-16 h-16 rounded-full bg-slate-900 border-[4px] border-[#0a0a0a] text-white flex items-center justify-center text-xl font-black shadow-2xl shadow-indigo-500/20"
            >
              VS
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-stretch">

            {/* Left: General Agency (Bad) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, ease: EASE_SMOOTH }}
              className="relative flex flex-col p-8 md:p-12 rounded-[2rem] bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 shadow-xl"
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center shadow-inner border border-slate-700">
                  <XCircle className="w-6 h-6 text-slate-400" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-300">
                  {comparison.bad.label}
                </h3>
              </div>

              <div className="flex flex-col gap-5 flex-1 justify-start relative">
                {/* Connecting line behind blocks */}
                <div className="absolute left-6 top-8 bottom-8 w-px bg-slate-700" />

                {comparison.bad.messages.map((msg, i) => (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: EASE_SMOOTH }}
                    key={i}
                    className="flex items-center gap-5 p-5 rounded-2xl bg-slate-900 border border-slate-700 relative z-10 shadow-lg"
                  >
                    <div className="w-3 h-3 rounded-full bg-slate-600 shrink-0 ml-1 ring-4 ring-slate-900" />
                    <p className="text-lg font-medium text-slate-400">{msg}</p>
                  </motion.div>
                ))}
              </div>

              <p className="mt-auto pt-8 text-center text-slate-500 font-bold text-sm md:text-base bg-transparent">
                <span className="bg-slate-900/50 py-3 px-6 rounded-xl block">
                  ({comparison.bad.sub})
                </span>
              </p>
            </motion.div>

            {/* Mobile VS Badge */}
            <div className="flex lg:hidden justify-center -my-3 relative z-20 pointer-events-none">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: false }}
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
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE_SMOOTH }}
              className="relative flex flex-col p-8 md:p-12 rounded-[2rem] bg-[#1a1c4b]/80 backdrop-blur-sm border-[2px] border-indigo-500 overflow-hidden shadow-[0_0_80px_rgba(99,102,241,0.15)]"
            >
              <BorderBeam colorFrom="#6366f1" colorTo="#ffffff" duration={10} size={200} borderWidth={2} />

              <div className="relative z-10 flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/40">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white">
                  {comparison.good.label}
                </h3>
              </div>

              <div className="relative z-10 flex flex-col gap-8 flex-1 justify-start pt-2">

                {/* Highlight Quote Box */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.4, ease: EASE_SMOOTH }}
                  className="p-6 md:p-8 rounded-2xl bg-white/10 border border-white/20 relative overflow-hidden"
                >
                  <AnimatedShinyText className="inline-flex items-center justify-center text-white dark:text-white font-bold text-center break-keep leading-snug">
                    <span className="text-xl md:text-2xl">"{comparison.good.desc.replace(/"/g, '')}"</span>
                  </AnimatedShinyText>
                </motion.div>

                {/* Steps List */}
                <div className="space-y-4">
                  {comparison.good.steps.map((step, i) => (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.5, delay: 0.6 + i * 0.1, ease: EASE_SMOOTH }}
                      key={i}
                      className="flex items-center gap-5"
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white font-black text-sm shrink-0 shadow-sm">
                        {i + 1}
                      </div>
                      <p className="text-lg font-bold text-slate-100 break-keep">{step}</p>
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
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.4, ease: EASE_SMOOTH }}
          className="mt-24 md:mt-36 relative text-center"
        >
          {/* Subtle upper line */}
          <div className="mx-auto w-16 h-1 bg-slate-800 rounded-full mb-12" />

          <h3 className="text-3xl md:text-5xl lg:text-[4rem] font-black leading-[1.3] tracking-tight whitespace-pre-line">
            <span className="text-white">대표님은 그 시간에</span>
            <br />
            <span className="text-indigo-400">
              제품 소싱과 배송에만
            </span>
            <span className="text-white"> 신경 쓰세요.</span>
          </h3>

        </motion.div>

      </div>
    </section>
  );
}
