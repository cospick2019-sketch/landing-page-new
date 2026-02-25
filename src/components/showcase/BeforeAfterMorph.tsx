"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { SHOWCASE_MORPH } from "@/constants/content";
import { SHOWCASE_THEME, PALETTE } from "@/constants/theme";
import { cn } from "@/lib/utils";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export default function BeforeAfterMorph() {
  const [sliderValue, setSliderValue] = useState(0);
  const progress = useMotionValue(0);

  const badOpacity = useTransform(progress, [0, 1], [1, 0]);
  const goodOpacity = useTransform(progress, [0, 1], [0, 1]);
  const previewBg = useTransform(
    progress,
    [0, 1],
    ["#f1f1f1", "#F8FAFB"]
  );

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setSliderValue(v);
    progress.set(v / 100);
  };

  const B = SHOWCASE_MORPH.bad;
  const G = SHOWCASE_MORPH.good;

  return (
    <div className={cn(SHOWCASE_THEME.card, "p-0 overflow-hidden")}>
      {/* Preview area */}
      <motion.div
        className="relative overflow-hidden"
        style={{ backgroundColor: previewBg, minHeight: 380 }}
      >
        {/* Bad page */}
        <motion.div
          style={{ opacity: badOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 py-10 text-center"
        >
          <div className="max-w-md mx-auto space-y-3">
            <p className="text-xs text-slate-400 uppercase tracking-wide">
              상품 소개
            </p>
            <h3 className="text-lg md:text-xl font-normal text-slate-500">
              {B.headline}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">{B.sub}</p>
            <div className="flex flex-wrap justify-center gap-1.5 pt-2">
              {B.extras.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] border border-slate-300 text-slate-400 rounded px-2 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>
            <button className="mt-4 text-xs bg-slate-300 text-slate-500 px-4 py-1.5 rounded">
              {B.cta}
            </button>
          </div>
        </motion.div>

        {/* Good page */}
        <motion.div
          style={{ opacity: goodOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 py-10 text-center"
        >
          <div className="max-w-lg mx-auto space-y-4">
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight whitespace-pre-line">
              {G.headline}
            </h3>
            <p className="text-lg md:text-xl text-slate-500">{G.sub}</p>
            <p className="text-sm font-medium text-indigo-600">{G.trust}</p>
            <div className="pt-2">
              <ShimmerButton
                shimmerColor={PALETTE.cta.shimmerColor}
                background={PALETTE.cta.hex}
                borderRadius="100px"
                className="h-12 px-8 text-base text-white mx-auto"
              >
                {G.cta}
              </ShimmerButton>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Slider */}
      <div className="px-6 py-5 border-t border-slate-100">
        <div className="flex items-center gap-4">
          <span className="text-xs font-medium text-slate-400 shrink-0">
            못 파는 페이지
          </span>
          <input
            type="range"
            min={0}
            max={100}
            value={sliderValue}
            onChange={handleSlider}
            className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-indigo-600 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:shadow-md"
          />
          <span className="text-xs font-medium text-indigo-600 shrink-0">
            파는 페이지
          </span>
        </div>
        <p className="text-center text-slate-400 text-xs mt-2">
          {SHOWCASE_MORPH.sliderLabel}
        </p>
      </div>
    </div>
  );
}
