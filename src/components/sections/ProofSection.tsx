"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "motion/react";
import { createPortal } from "react-dom";
import { Package, HelpCircle } from "lucide-react";

import { SECTION_PROOF } from "@/constants/content";
import { TextAnimate } from "@/components/ui/text-animate";
import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Particles } from "@/components/ui/particles";
import { BorderBeam } from "@/components/ui/border-beam";
import { useConsultation } from "@/components/consultation/ConsultationContext";

function Tooltip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  const toggle = useCallback(() => {
    if (!open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setPos({ top: rect.bottom + 6, left: rect.left + rect.width / 2 });
    }
    setOpen(!open);
  }, [open]);

  return (
    <span className="relative inline-flex ml-1.5 -top-5">
      <button
        ref={btnRef}
        type="button"
        onClick={toggle}
        className="w-4 h-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-colors cursor-pointer"
        aria-label="도움말"
      >
        <HelpCircle className="w-2.5 h-2.5 text-gray-400" />
      </button>
      {open &&
        createPortal(
          <>
            <div className="fixed inset-0" style={{ zIndex: 9998 }} onClick={toggle} />
            <div
              className="fixed w-56 p-3 rounded-xl border border-white/10 text-sm text-gray-200 font-normal leading-relaxed text-center cursor-pointer"
              style={{ top: pos.top, left: pos.left, transform: "translateX(-50%)", backgroundColor: "#1e1e2e", boxShadow: "0 8px 32px rgba(0,0,0,0.6)", zIndex: 9999 }}
              onClick={toggle}
            >
              {text}
            </div>
          </>,
          document.body
        )}
    </span>
  );
}

export default function ProofSection() {
  const { open } = useConsultation();
  return (
    <section id="proof" className="relative py-16 md:py-32 lg:py-48 bg-[#030513] overflow-hidden">
      {/* Absolute Dark Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[50vh] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

      {/* Top Transition Line from Light Section */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      {/* Giant watermark */}
      <span className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white/[0.02] select-none pointer-events-none whitespace-nowrap tracking-tighter hidden md:block" aria-hidden="true">
        RESULTS
      </span>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 z-10">
        <div className="text-center max-w-3xl mx-auto">
          <BlurFade delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-bold tracking-widest uppercase mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              {SECTION_PROOF.intro}
            </div>
          </BlurFade>
          <TextAnimate
            as="h2"
            by="word"
            animation="blurInUp"
            startOnView
            className="mt-3 text-3xl md:text-6xl lg:text-[4rem] font-black leading-tight tracking-tight text-white mb-10 md:mb-24"
          >
            {SECTION_PROOF.title}
          </TextAnimate>
        </div>

        {/* 3 Massive Number Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {SECTION_PROOF.stats.map((stat, i) => (
            <BlurFade key={stat.label} delay={0.25 + i * 0.15}>
              <div className="group relative text-center p-8 md:p-10 lg:p-10 rounded-[2.5rem] bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-indigo-500/40 hover:bg-white/[0.04] transition-all duration-500 shadow-2xl overflow-hidden">

                {/* Glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-transparent to-purple-500/0 group-hover:from-indigo-500/10 transition-colors duration-500 pointer-events-none" />

                {/* Border Beam - Hidden by default, bright on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2.5rem] overflow-hidden">
                  <BorderBeam size={200} duration={8} delay={i * 2} colorFrom="#6366f1" colorTo="#a855f7" borderWidth={2} />
                </div>

                <div className="relative z-10 flex flex-col items-center justify-center">
                  <div className="flex items-baseline justify-center text-5xl md:text-7xl lg:text-[5.5rem] font-black text-white leading-none tracking-tighter mb-6 group-hover:scale-110 transition-transform duration-500 ease-out whitespace-nowrap min-w-0 md:min-w-[200px]">
                    <div className="inline-block text-right">
                      <NumberTicker value={stat.value} delay={0.1 + i * 0.1} className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_40px_rgba(99,102,241,0.5)] transition-all duration-500" />
                    </div>
                    <span className="text-3xl md:text-4xl lg:text-5xl ml-1 text-indigo-400 group-hover:text-indigo-300 transition-colors duration-500 shrink-0">
                      {stat.suffix}
                    </span>
                  </div>

                  <div className="h-px w-12 bg-indigo-500/50 rounded-full mb-6 group-hover:w-24 group-hover:bg-indigo-400 transition-all duration-500" />

                  <div className="text-xl md:text-2xl font-bold text-white mb-2 flex items-start justify-center">
                    {stat.label}
                    {"tooltip" in stat && stat.tooltip && (
                      <Tooltip text={stat.tooltip as string} />
                    )}
                  </div>
                  <p className="text-base text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                    {stat.sub}
                  </p>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>

        {/* Closing CTA block - Live Rolling Tape Concept */}
        <BlurFade delay={0.6}>
          <div className="relative mt-16 md:mt-32 p-6 md:p-16 rounded-2xl md:rounded-[2.5rem] bg-indigo-950/20 border border-indigo-500/20 overflow-hidden group">

            {/* Background Ambient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15),transparent_70%)] pointer-events-none" />

            {/* Animated Marquee Tapes (Background) */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none overflow-hidden flex flex-col justify-around -rotate-3 scale-110">
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="whitespace-nowrap font-mono text-4xl md:text-6xl font-black"
              >
                DATA DRIVEN MARKETING • 10 YEARS PROVEN RECORD • ROI MAXIMIZATION • DATA DRIVEN MARKETING • 10 YEARS PROVEN RECORD • ROI MAXIMIZATION •
              </motion.div>
              <motion.div
                animate={{ x: ["-50%", "0%"] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="whitespace-nowrap font-mono text-4xl md:text-6xl font-black mt-12"
              >
                DATA DRIVEN MARKETING • 10 YEARS PROVEN RECORD • ROI MAXIMIZATION • DATA DRIVEN MARKETING • 10 YEARS PROVEN RECORD • ROI MAXIMIZATION •
              </motion.div>
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">

              {/* Left Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-bold tracking-widest uppercase mb-6 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                  10년의 실전 데이터
                </div>

                <h3 className="text-2xl md:text-5xl lg:text-6xl font-black leading-[1.2] text-white whitespace-pre-line mb-6 tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    지난 10년간 직접 팔아본
                  </span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                    수십만 개
                  </span>
                  의 택배 상자
                </h3>

                <p className="text-lg md:text-xl font-medium leading-[1.6] text-indigo-100/70 whitespace-pre-line mb-8 max-w-xl">
                  그리고 수십억 원의 매출 데이터.{"\n"}이 매출을 만든 '설득 공식'과 '유입 공식'을{"\n"}대표님 사업에 그대로 적용해드립니다.
                </p>

                <div className="group/btn relative inline-flex">
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded border border-indigo-400/50 opacity-0 group-hover/btn:opacity-100 transition duration-300 blur-sm" />
                  <button
                    type="button"
                    onClick={open}
                    className="relative inline-flex items-center justify-center h-14 px-8 text-base font-bold bg-indigo-600 text-white hover:bg-indigo-500 transition-all rounded cursor-pointer"
                  >
                    {SECTION_PROOF.closingCta}
                    <svg className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Right Decorative Element (Delivery Boxes Grid) */}
              <div className="hidden lg:grid grid-cols-4 gap-3 shrink-0 opacity-90 pr-4">
                {[...Array(16)].map((_, i) => (
                  <div
                    key={i}
                    className="w-14 h-14 rounded-xl bg-indigo-950/60 border border-indigo-500/30 flex items-center justify-center relative overflow-hidden group-hover:bg-indigo-900/60 group-hover:border-indigo-400/60 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all duration-500 animate-pulse"
                    style={{ animationDelay: `${(i % 4) * 200 + Math.floor(i / 4) * 100}ms`, animationDuration: "3s" }}
                  >
                    <Package className="w-6 h-6 text-indigo-400/70 group-hover:text-indigo-200 transition-colors duration-500" strokeWidth={1.5} />
                  </div>
                ))}
              </div>

            </div>
          </div>
        </BlurFade>

      </div>
    </section>
  );
}
