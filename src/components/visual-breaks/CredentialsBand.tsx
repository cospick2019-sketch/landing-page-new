"use client";

import { VISUAL_BREAKS } from "@/constants/content";
import { Marquee } from "@/components/ui/marquee";

export default function CredentialsBand() {
  const items = VISUAL_BREAKS.credentialsBand;

  return (
    <section className="bg-gray-950 border-y border-white/10 py-3 md:py-4 overflow-hidden">
      <Marquee className="[--duration:20s] [--gap:2rem]">
        {items.map((item) => (
          <span
            key={item}
            className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-white/25"
          >
            {item}
          </span>
        ))}
      </Marquee>
      <Marquee reverse className="[--duration:25s] [--gap:2rem] mt-2">
        {[...items].reverse().map((item) => (
          <span
            key={item}
            className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-white/15"
          >
            {item}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
