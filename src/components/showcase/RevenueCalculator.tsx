"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { SHOWCASE_CALCULATOR } from "@/constants/content";
import { SHOWCASE_THEME } from "@/constants/theme";
import { cn } from "@/lib/utils";
import { AuroraText } from "@/components/ui/aurora-text";

function formatWon(n: number): string {
  if (n >= 100_000_000) {
    return `${(n / 100_000_000).toFixed(1)}억원`;
  }
  if (n >= 10_000) {
    return `${Math.round(n / 10_000).toLocaleString("ko-KR")}만원`;
  }
  return `${n.toLocaleString("ko-KR")}원`;
}

function SpringNumber({
  value,
  className,
  formatter = formatWon,
}: {
  value: number;
  className?: string;
  formatter?: (n: number) => string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { damping: 40, stiffness: 120 });

  useEffect(() => {
    mv.set(value);
  }, [mv, value]);

  useEffect(
    () =>
      spring.on("change", (latest) => {
        if (ref.current) ref.current.textContent = formatter(latest);
      }),
    [spring, formatter]
  );

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {formatter(0)}
    </span>
  );
}

function SliderControl({
  label,
  min,
  max,
  step,
  value,
  onChange,
  format,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
}) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-sm font-medium text-slate-600">{label}</span>
        <span className="text-sm font-bold text-slate-900">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-indigo-600 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:shadow-md"
      />
    </div>
  );
}

const C = SHOWCASE_CALCULATOR;

export default function RevenueCalculator() {
  const [visitors, setVisitors] = useState(1000);
  const [avgOrder, setAvgOrder] = useState(50000);

  const normalMonthly = Math.round(visitors * 30 * avgOrder * C.normalCvr);
  const proMonthly = Math.round(visitors * 30 * avgOrder * C.proCvr);
  const annualDiff = (proMonthly - normalMonthly) * 12;
  const barMax = proMonthly || 1;

  return (
    <div className={cn(SHOWCASE_THEME.card, "p-6 md:p-8")}>
      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <SliderControl
          label={C.visitorsLabel}
          min={100}
          max={10000}
          step={100}
          value={visitors}
          onChange={setVisitors}
          format={(v) => `${v.toLocaleString("ko-KR")}명`}
        />
        <SliderControl
          label={C.avgOrderLabel}
          min={10000}
          max={500000}
          step={5000}
          value={avgOrder}
          onChange={setAvgOrder}
          format={(v) => `${v.toLocaleString("ko-KR")}원`}
        />
      </div>

      {/* Comparison bars */}
      <div className="space-y-4">
        {/* Normal */}
        <div>
          <div className="flex justify-between items-baseline mb-1.5">
            <span className="text-sm text-slate-500">{C.normalLabel}</span>
            <span className="text-xs text-slate-400">{C.normalCvrLabel}</span>
          </div>
          <div className="h-8 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-slate-300 rounded-full"
              animate={{ width: `${(normalMonthly / barMax) * 100}%` }}
              transition={{ type: "spring", damping: 30, stiffness: 120 }}
            />
          </div>
          <div className="mt-1 text-right">
            <span className="text-sm text-slate-500">{C.monthlyLabel} </span>
            <SpringNumber
              value={normalMonthly}
              className="text-lg font-bold text-slate-700"
            />
          </div>
        </div>

        {/* Pro */}
        <div>
          <div className="flex justify-between items-baseline mb-1.5">
            <span className="text-sm font-medium text-indigo-600">
              {C.proLabel}
            </span>
            <span className="text-xs text-indigo-400">{C.proCvrLabel}</span>
          </div>
          <div className="h-8 bg-indigo-50 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-indigo-600 rounded-full"
              animate={{ width: `${(proMonthly / barMax) * 100}%` }}
              transition={{ type: "spring", damping: 30, stiffness: 120 }}
            />
          </div>
          <div className="mt-1 text-right">
            <span className="text-sm text-indigo-500">{C.monthlyLabel} </span>
            <SpringNumber
              value={proMonthly}
              className="text-lg font-bold text-indigo-600"
            />
          </div>
        </div>
      </div>

      {/* Annual difference */}
      <div className="mt-10 text-center">
        <p className="text-sm text-slate-400 mb-2">{C.annualDiffLabel}</p>
        <AuroraText
          className="text-4xl md:text-5xl font-extrabold"
          colors={["#4F46E5", "#7C3AED", "#2563EB", "#818CF8"]}
        >
          +<SpringNumber value={annualDiff} className="" />
        </AuroraText>
      </div>
    </div>
  );
}
