"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SECTION_MARKETING } from "@/constants/content";
import { BorderBeam } from "@/components/ui/border-beam";
import { Target, Lightbulb, TrendingUp } from "lucide-react";

// Custom easing for premium feel
const EASE_SMOOTH = [0.23, 1, 0.32, 1] as const;

const ICONS = [Target, Lightbulb, TrendingUp];

export default function MarketingSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Overall section scroll progress (can be used for parallax if desired)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax the backgrounds slightly
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={containerRef}
      id="marketing"
      className="relative bg-[#F8FAFB] overflow-clip"
    >
      {/* Top subtle visual separator from the Marquee */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* Soft Ambient Light Orbs - Changed to light colors */}
      <motion.div
        style={{ y: bgY }}
        className="absolute top-[5%] left-[-5%] w-[40vw] h-[40vw] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none mix-blend-multiply"
      />
      <motion.div
        style={{ y: bgY }}
        className="absolute bottom-[5%] right-[-5%] w-[35vw] h-[35vw] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none mix-blend-multiply"
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-24 md:py-32 lg:py-48 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

          {/* Left Side: Sticky Content (40%) */}
          <div className="lg:w-[40%] lg:sticky top-24 lg:top-40 shrink-0 z-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: EASE_SMOOTH }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-bold tracking-widest uppercase mb-6 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
                </span>
                {SECTION_MARKETING.intro}
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-black leading-[1.15] tracking-tight whitespace-pre-line mb-8 drop-shadow-sm text-gray-900">
                <span className="bg-clip-text text-transparent bg-gradient-to-br from-gray-900 to-gray-600">
                  결국 <span className="text-indigo-600">'매출'</span>이
                  <br />
                  목적 아닌가요?
                </span>
              </h2>

              <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-medium">
                {SECTION_MARKETING.lead}
              </p>
            </motion.div>
          </div>

          {/* Right Side: Scrolling Cards (60%) */}
          <div className="lg:w-[60%] flex flex-col gap-8 md:gap-12 mt-8 lg:mt-0 relative z-10 lg:pb-[20vh]">

            {/* Vertical connector line behind cards */}
            <div className="absolute left-10 md:left-14 top-10 bottom-10 w-px bg-gradient-to-b from-indigo-200/0 via-indigo-200 to-indigo-200/0 hidden lg:block" />

            {SECTION_MARKETING.points.map((point, i) => {
              const Icon = ICONS[i] || Target;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 0.8, delay: 0.1, ease: EASE_SMOOTH }}
                  className="relative group p-8 md:p-10 rounded-[2rem] bg-white/80 backdrop-blur-md border border-gray-200 hover:border-indigo-300 transition-colors duration-500 overflow-hidden shadow-xl shadow-gray-200/50"
                >
                  {/* Hover Soft Background inside card */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 via-transparent to-blue-50/0 group-hover:from-indigo-50/50 transition-colors duration-500" />

                  {/* Persistent Subtle Border Beam that gets brighter on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2rem] overflow-hidden">
                    <BorderBeam size={250} duration={12} delay={i * 2} colorFrom="#4f46e5" colorTo="#c7d2fe" borderWidth={1.5} />
                  </div>

                  <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 items-start">

                    {/* Icon Container */}
                    <div className="w-16 h-16 shrink-0 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-indigo-600 shadow-[0_8px_16px_rgba(79,70,229,0.1)] group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 group-hover:shadow-[0_12px_24px_rgba(79,70,229,0.25)]">
                      <Icon className="w-8 h-8" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl font-black text-gray-400 group-hover:text-indigo-500 transition-colors hidden md:block">0{i + 1}</span>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-indigo-900 transition-colors">
                          {point.title}
                        </h3>
                      </div>
                      <p className="text-lg text-gray-600 leading-relaxed font-medium group-hover:text-gray-700 transition-colors">
                        {point.body}
                      </p>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
