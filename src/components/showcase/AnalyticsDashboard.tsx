"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { SHOWCASE_DASHBOARD } from "@/constants/content";
import { SHOWCASE_THEME } from "@/constants/theme";
import { cn } from "@/lib/utils";
import { NumberTicker } from "@/components/ui/number-ticker";

const D = SHOWCASE_DASHBOARD;
const SPRING = { type: "spring" as const, damping: 25, stiffness: 80 };

function MetricBadges() {
  return (
    <div className="flex gap-3 mb-4">
      <span className="text-xs font-medium bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full">
        {D.beforeBadge}
      </span>
      <span className="text-xs font-medium bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full">
        {D.afterBadge}
      </span>
    </div>
  );
}

/* ---- CVR Line Chart ---- */
function CvrChart({ animate }: { animate: boolean }) {
  const W = 400;
  const H = 160;
  const padY = 20;
  const padX = 40;

  // Before: flat line at 1.2% level, After: curve rising to 4.8%
  const maxVal = 6;
  const toY = (v: number) => H - padY - ((v / maxVal) * (H - padY * 2));

  const beforeY = toY(D.cvr.before);
  const afterY = toY(D.cvr.after);

  const curvePath = `M ${padX} ${beforeY} C ${padX + 100} ${beforeY}, ${W - padX - 120} ${afterY + 30}, ${W - padX} ${afterY}`;

  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <h4 className="text-sm font-semibold text-slate-700">{D.cvr.label}</h4>
        <div className="flex items-baseline gap-3">
          <span className="text-xs text-slate-400">
            {D.cvr.before}{D.cvr.unit}
          </span>
          <span className="text-xs text-slate-300">→</span>
          <span className="text-sm font-bold text-indigo-600">
            {animate ? (
              <NumberTicker value={D.cvr.after} decimalPlaces={1} />
            ) : (
              "0"
            )}
            {D.cvr.unit}
          </span>
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        {/* Grid lines */}
        {[0, 2, 4, 6].map((v) => (
          <g key={v}>
            <line
              x1={padX}
              x2={W - padX}
              y1={toY(v)}
              y2={toY(v)}
              stroke="#e2e8f0"
              strokeWidth={1}
            />
            <text x={4} y={toY(v) + 4} fontSize={10} fill="#94a3b8">
              {v}%
            </text>
          </g>
        ))}
        {/* Curve */}
        <motion.path
          d={curvePath}
          fill="none"
          stroke="#4F46E5"
          strokeWidth={3}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: animate ? 1 : 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        {/* End dot */}
        <motion.circle
          cx={W - padX}
          cy={afterY}
          r={5}
          fill="#4F46E5"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: animate ? 1 : 0, scale: animate ? 1 : 0 }}
          transition={{ delay: 1.4, duration: 0.3 }}
        />
      </svg>
    </div>
  );
}

/* ---- Bounce Rate Circle ---- */
function BounceCircle({ animate }: { animate: boolean }) {
  const r = 46;
  const circumference = 2 * Math.PI * r;
  const beforeOffset = circumference * (1 - D.bounce.before / 100);
  const afterOffset = circumference * (1 - D.bounce.after / 100);

  return (
    <div>
      <h4 className="text-sm font-semibold text-slate-700 mb-2">
        {D.bounce.label}
      </h4>
      <div className="flex justify-center">
        <div className="relative w-32 h-32">
          <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
            {/* Background */}
            <circle
              cx={60}
              cy={60}
              r={r}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth={8}
            />
            {/* Before (faded) */}
            <circle
              cx={60}
              cy={60}
              r={r}
              fill="none"
              stroke="#fca5a5"
              strokeWidth={8}
              strokeDasharray={circumference}
              strokeDashoffset={beforeOffset}
              opacity={0.3}
            />
            {/* After */}
            <motion.circle
              cx={60}
              cy={60}
              r={r}
              fill="none"
              stroke="#4F46E5"
              strokeWidth={8}
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{
                strokeDashoffset: animate ? afterOffset : circumference,
              }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-indigo-600">
              {animate ? (
                <NumberTicker value={D.bounce.after} delay={0.3} />
              ) : (
                "0"
              )}
              <span className="text-sm">%</span>
            </span>
            <span className="text-[10px] text-slate-400 line-through">
              {D.bounce.before}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Duration Bar ---- */
function DurationBar({ animate }: { animate: boolean }) {
  const maxDur = D.duration.after;
  const beforePct = (D.duration.before / maxDur) * 100;
  const afterPct = 100;

  return (
    <div>
      <h4 className="text-sm font-semibold text-slate-700 mb-3">
        {D.duration.label}
      </h4>
      <div className="space-y-3">
        {/* Before */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 w-16 shrink-0">
            {D.beforeBadge}
          </span>
          <div className="flex-1 h-6 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-slate-300 rounded-full flex items-center justify-end pr-2"
              initial={{ width: 0 }}
              animate={{ width: animate ? `${beforePct}%` : 0 }}
              transition={{ ...SPRING, delay: 0.5 }}
            >
              <span className="text-[10px] font-bold text-slate-600">
                {D.duration.before}{D.duration.unit}
              </span>
            </motion.div>
          </div>
        </div>
        {/* After */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-indigo-600 w-16 shrink-0">
            {D.afterBadge}
          </span>
          <div className="flex-1 h-6 bg-indigo-50 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-indigo-600 rounded-full flex items-center justify-end pr-2"
              initial={{ width: 0 }}
              animate={{ width: animate ? `${afterPct}%` : 0 }}
              transition={{ ...SPRING, delay: 0.7 }}
            >
              <span className="text-[10px] font-bold text-white">
                {animate ? (
                  <NumberTicker
                    value={D.duration.after}
                    delay={0.7}
                    className="text-white"
                  />
                ) : (
                  "0"
                )}
                {D.duration.unit}
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Main Dashboard ---- */
export default function AnalyticsDashboard() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn(SHOWCASE_THEME.card, "p-6 md:p-8")}>
      <MetricBadges />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Line chart - spans 2 cols */}
        <div className="md:col-span-2">
          <CvrChart animate={animate} />
        </div>
        {/* Circle */}
        <div>
          <BounceCircle animate={animate} />
        </div>
      </div>
      {/* Duration bar - full width */}
      <div className="mt-8">
        <DurationBar animate={animate} />
      </div>
    </div>
  );
}
