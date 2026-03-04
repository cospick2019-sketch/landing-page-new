"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { SECTION_PROBLEM } from "@/constants/content";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { NumberTicker } from "@/components/ui/number-ticker";
import Image from "next/image";
import { TrendingDown, Wallet } from "lucide-react";

/* Custom easing matching reference sites */
const EASE_SMOOTH = [0.23, 1, 0.32, 1] as const;
const EASE_SNAP = [0.785, 0.135, 0.15, 0.86] as const;

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* Parallax values */
  const glowY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const mockupY = useTransform(scrollYProgress, [0, 1], [40, -20]);

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="relative pt-16 md:pt-28 pb-24 md:pb-40 bg-[#F8FAFB] overflow-hidden"
    >
      {/* Background: single dramatic spotlight */}
      <motion.div
        style={{ y: glowY }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none"
      >
        <div
          className="w-full h-full rounded-full blur-[140px] opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(79,70,229,0.10) 0%, rgba(129,140,248,0.05) 40%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Animated top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="h-full w-1/3"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(79,70,229,0.4), transparent)",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 md:px-6">
        {/* Eyebrow */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_SMOOTH }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-bold tracking-widest uppercase mb-6 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
            </span>
            {SECTION_PROBLEM.eyebrow}
          </motion.div>

          {/* Heading: staggered word reveal */}
          <div className="mt-5 md:mt-8">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE_SMOOTH }}
              className="text-3xl md:text-[3.2rem] font-bold leading-tight tracking-tight text-gray-900"
            >
              혹시 비싼 돈 주고 만든 랜딩페이지,
            </motion.h2>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25, ease: EASE_SMOOTH }}
              className="text-3xl md:text-[3.2rem] font-bold leading-tight tracking-tight mt-1 md:mt-3"
            >
              <motion.span
                className="relative inline-block text-indigo-600"
                initial={{ backgroundSize: "0% 40%" }}
                whileInView={{ backgroundSize: "100% 40%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(79,70,229,0.12), rgba(79,70,229,0.12))",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "0 85%",
                }}
              >
                &lsquo;예쁜 쓰레기&rsquo;
              </motion.span>
              <span className="text-gray-900">가 되진 않았나요?</span>
            </motion.h2>
          </div>
        </div>

        {/* Two Column: Mockup + Pain Points */}
        <div className="mt-10 md:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Browser Mockup with parallax */}
          <motion.div
            style={{ y: mockupY }}
            className="relative flex justify-center lg:justify-end"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE_SMOOTH }}
              className="relative w-full max-w-[380px] md:max-w-[440px]"
            >
              {/* Glow behind mockup */}
              <div className="absolute -inset-8 bg-indigo-100/40 rounded-[2rem] blur-2xl pointer-events-none" />

              {/* Browser chrome frame */}
              <div className="relative rounded-2xl shadow-2xl shadow-gray-900/8 border border-gray-200/80 overflow-hidden bg-white">
                <BorderBeam
                  size={140}
                  duration={8}
                  colorFrom="#4F46E5"
                  colorTo="#a5b4fc"
                  borderWidth={1.5}
                />

                {/* Title bar */}
                <div className="h-9 bg-gray-50 border-b border-gray-200 flex items-center px-3.5 gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  <div className="ml-4 flex-1 h-4 bg-gray-200/60 rounded-md" />
                </div>

                {/* Page content */}
                <div className="relative aspect-[3/4] bg-gray-50">
                  <Image
                    src="/images/bad-landing-page.png"
                    alt="매출이 나오지 않는 랜딩페이지 예시"
                    fill
                    sizes="(max-width: 768px) 100vw, 440px"
                    loading="lazy"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
                </div>
              </div>

              {/* Floating card: CVR metric */}
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7, ease: EASE_SMOOTH }}
                className="absolute -bottom-3 left-0 md:-left-8 z-20"
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="bg-white/95 backdrop-blur-md px-4 py-3.5 rounded-xl shadow-lg shadow-gray-900/8 border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
                      <TrendingDown className="w-[18px] h-[18px]" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-400 tracking-wide">
                        전환율 (CVR)
                      </p>
                      <p className="text-base font-bold text-gray-900">
                        <NumberTicker
                          value={0.3}
                          decimalPlaces={1}
                          delay={0.8}
                        />
                        %
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Floating card: Ad spend */}
              <motion.div
                initial={{ opacity: 0, y: -24, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.9, ease: EASE_SMOOTH }}
                className="absolute top-20 right-0 md:-right-8 z-20"
              >
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="bg-white/95 backdrop-blur-md px-4 py-3.5 rounded-xl shadow-lg shadow-gray-900/8 border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Wallet className="w-[18px] h-[18px]" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-400 tracking-wide">
                        광고비 소진
                      </p>
                      <p className="text-base font-bold text-gray-900">
                        -5,000,000원
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right: Pain Points + Conclusion */}
          <div className="flex flex-col gap-10 lg:gap-12">
            {/* Big emotional line */}
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4, ease: EASE_SMOOTH }}
              className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 leading-snug break-keep"
            >
              디자인은 그럴싸한데
              <br />
              <motion.span
                className="inline-block text-indigo-600"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8, ease: EASE_SNAP }}
              >
                매출은 0원.
              </motion.span>
            </motion.h3>

            {/* Pain points — staggered entrance */}
            <div className="space-y-5">
              {SECTION_PROBLEM.points.slice(1).map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + i * 0.15,
                    ease: EASE_SMOOTH,
                  }}
                  className="flex items-start gap-3.5"
                >
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                  <p className="text-lg md:text-xl font-normal leading-[1.8] text-gray-500 break-keep">
                    {point.text}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Conclusion card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 1, ease: EASE_SMOOTH }}
              className="relative rounded-2xl bg-white border border-gray-200/80 shadow-lg shadow-gray-900/5 p-7 md:p-9"
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-8 md:left-10 w-12 h-1 bg-indigo-600 rounded-b-full" />
              <p className="text-xl md:text-2xl font-medium leading-relaxed text-gray-900 break-keep">
                고객을 설득하는{" "}
                <span className="font-bold bg-indigo-100 px-2 py-1 rounded-md">
                  기획
                </span>{" "}
                없이,
                <br />
                <span className="font-bold bg-gray-200 px-2 py-1 rounded-md">
                  디자인
                </span>
                만 했기 때문입니다.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
