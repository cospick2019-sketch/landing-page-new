"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

interface DecorativeWatermarkProps {
  text: string;
  className?: string;
}

export default function DecorativeWatermark({
  text,
  className,
}: DecorativeWatermarkProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
      <motion.span
        style={{ y }}
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10vw] md:text-[8vw] font-black tracking-tighter select-none whitespace-nowrap",
          className
        )}
        aria-hidden="true"
      >
        {text}
      </motion.span>
    </div>
  );
}
