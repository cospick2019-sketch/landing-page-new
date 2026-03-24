"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SECTION_FAQ } from "@/constants/content";
import { cn } from "@/lib/utils";
import { TextAnimate } from "@/components/ui/text-animate";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { Plus } from "lucide-react";

function FaqItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: (typeof SECTION_FAQ.items)[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <BlurFade delay={0.1 + index * 0.08}>
      <div
        className={cn(
          "relative border rounded-2xl transition-all duration-500 overflow-hidden group",
          isOpen
            ? "bg-[#0A0D18] border-indigo-500/50 shadow-[0_10px_40px_rgba(99,102,241,0.15)]"
            : "bg-white/5 border-white/10 hover:border-indigo-500/30 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(99,102,241,0.05)]"
        )}
      >
        {/* Active state BorderBeam */}
        {isOpen && (
          <div className="absolute inset-0 z-0 pointer-events-none rounded-2xl overflow-hidden">
            <BorderBeam size={300} duration={8} delay={0} colorFrom="#6366f1" colorTo="#c084fc" borderWidth={1.5} />
          </div>
        )}

        <button
          onClick={onToggle}
          className="relative z-10 w-full flex items-center justify-between p-6 md:p-8 text-left bg-transparent"
        >
          <span
            className={cn(
              "text-lg md:text-xl lg:text-2xl font-bold pr-6 transition-colors duration-300",
              isOpen ? "text-white" : "text-gray-300 group-hover:text-white"
            )}
          >
            <span className="text-indigo-400 mr-3 font-black text-sm md:text-base opacity-80">
              Q{index + 1}.
            </span>
            {item.q}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 135 : 0 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 15 }}
            className={cn(
              "shrink-0 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 border",
              isOpen
                ? "bg-indigo-600 border-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                : "bg-white/5 border-white/10 text-gray-400 group-hover:bg-white/10 group-hover:text-white"
            )}
          >
            <Plus className="w-5 h-5" strokeWidth={2.5} />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="relative z-10 overflow-hidden"
            >
              <div className="px-6 md:px-8 pb-6 md:pb-8 pt-2">
                <div className="h-px w-full bg-gradient-to-r from-indigo-500/50 via-indigo-500/20 to-transparent mb-6" />
                <div className="flex items-start gap-4">
                  <span className="text-indigo-400 font-black text-xl md:text-2xl leading-none mt-1">A.</span>
                  <p className="text-base md:text-lg lg:text-xl font-medium leading-[1.8] text-gray-300 whitespace-pre-line">
                    {item.a}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </BlurFade>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-16 md:py-32 lg:py-40 bg-[#030513] overflow-hidden">

      {/* Dark Ambient Glows */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vh] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Giant watermark */}
      <span className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-black text-white/[0.02] select-none pointer-events-none whitespace-nowrap tracking-tighter hidden md:block" aria-hidden="true">
        QUESTIONS
      </span>

      <div className="relative max-w-4xl mx-auto px-5 md:px-6 z-10">
        <div className="text-center mb-8 md:mb-24">
          <BlurFade delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-bold tracking-widest uppercase mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              FAQ
            </div>
          </BlurFade>

          <TextAnimate
            as="h2"
            by="word"
            animation="blurInUp"
            startOnView
            className="text-3xl md:text-6xl font-black leading-tight tracking-tight text-white drop-shadow-lg"
          >
            {SECTION_FAQ.title}
          </TextAnimate>

          <BlurFade delay={0.2}>
            <p className="mt-6 text-lg text-gray-400 font-medium">
              전문가에게 일을 맡기기 전, 마지막 의문점들을 해소해 드립니다.
            </p>
          </BlurFade>
        </div>

        <div className="space-y-4 md:space-y-6">
          {SECTION_FAQ.items.map((item, i) => (
            <FaqItem
              key={i}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        <BlurFade delay={0.3}>
          <div className="mt-10 md:mt-14 text-center">
            <a
              href="https://blog.naver.com/salesupto"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm md:text-base text-gray-400 hover:text-indigo-400 transition-colors"
            >
              <span>더 많은 정보가 궁금하다면</span>
              <span className="font-semibold underline underline-offset-4 decoration-indigo-500/40">블로그 보러가기 →</span>
            </a>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
