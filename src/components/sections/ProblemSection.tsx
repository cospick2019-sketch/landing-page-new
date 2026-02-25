"use client";

import { motion } from "motion/react";
import { SECTION_PROBLEM } from "@/constants/content";
import { TextAnimate } from "@/components/ui/text-animate";
import { BlurFade } from "@/components/ui/blur-fade";
import DecorativeWatermark from "@/components/shared/DecorativeWatermark";

function PointCard({
  point,
  index,
  isLast,
}: {
  point: { text: string };
  index: number;
  isLast: boolean;
}) {
  const num = String(index + 1).padStart(2, "0");
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      className={`relative flex flex-col ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } items-center gap-6 md:gap-10`}
    >
      {/* Large number */}
      <div className="relative shrink-0">
        <span
          className={`text-[7rem] md:text-[10rem] font-black leading-none select-none ${
            isLast
              ? "text-transparent bg-clip-text bg-gradient-to-b from-indigo-200 to-indigo-100"
              : "text-gray-100"
          }`}
        >
          {num}
        </span>
      </div>

      {/* Text */}
      <div
        className={`relative flex-1 ${isEven ? "md:text-left" : "md:text-right"} text-center`}
      >
        {isLast && (
          <div className="absolute -inset-4 md:-inset-6 rounded-2xl bg-indigo-50/60 -z-10" />
        )}
        <p
          className={`text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug ${
            isLast ? "text-indigo-900" : "text-gray-800"
          }`}
        >
          {point.text}
        </p>
        {isLast && (
          <div className="mt-3 flex justify-center md:justify-start">
            <div
              className={`h-1 w-16 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-400 ${
                !isEven ? "md:ml-auto" : ""
              }`}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function ProblemSection() {
  const points = SECTION_PROBLEM.points;

  return (
    <section
      id="problem"
      className="relative py-24 md:py-36 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden"
    >
      <DecorativeWatermark text="PROBLEM" className="text-gray-100/70" />

      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Decorative */}
      <div className="absolute top-20 -right-20 w-80 h-80 rounded-full border border-indigo-100/40" />
      <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-indigo-100/20 blur-[60px]" />

      <div className="relative max-w-5xl mx-auto px-4 md:px-6">
        <TextAnimate
          as="h2"
          by="word"
          animation="blurInUp"
          startOnView
          once
          className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-gray-900 text-center whitespace-pre-line"
        >
          {SECTION_PROBLEM.title}
        </TextAnimate>

        {/* Pain points — 대형 넘버 + 좌우 교차 */}
        <div className="mt-16 md:mt-28 space-y-12 md:space-y-20">
          {points.map((point, i) => (
            <PointCard
              key={i}
              point={point}
              index={i}
              isLast={i === points.length - 1}
            />
          ))}
        </div>

        {/* Conclusion */}
        <BlurFade delay={0.3}>
          <motion.div
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-20 md:mt-28 relative bg-gray-900 rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.15),_transparent_60%)]" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

            <div className="relative px-6 md:px-16 py-14 md:py-20 text-center">
              <p className="text-3xl md:text-5xl font-bold leading-[1.35] text-white/90">
                고객을 설득하는{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-indigo-400">
                  &apos;기획&apos;
                </span>{" "}
                없이,
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-indigo-400">
                  &apos;디자인&apos;
                </span>
                만 했기 때문입니다.
              </p>
            </div>
          </motion.div>
        </BlurFade>
      </div>
    </section>
  );
}
