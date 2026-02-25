"use client";

import { VISUAL_BREAKS } from "@/constants/content";
import { Marquee } from "@/components/ui/marquee";

export default function ServiceMarquee() {
  const items = VISUAL_BREAKS.serviceMarquee;

  return (
    <section className="bg-white py-5 md:py-6 overflow-hidden border-y border-gray-100">
      <Marquee className="[--duration:30s] [--gap:1rem]">
        {items.map((item) => (
          <span
            key={item}
            className="inline-block text-sm md:text-base font-medium text-indigo-600 border border-indigo-200 bg-indigo-50/50 rounded-full px-4 py-1.5"
          >
            {item}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
