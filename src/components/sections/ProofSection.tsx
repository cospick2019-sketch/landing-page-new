"use client";

import { SECTION_PROOF } from "@/constants/content";
import { TextAnimate } from "@/components/ui/text-animate";
import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";
import { AuroraText } from "@/components/ui/aurora-text";
import { Marquee } from "@/components/ui/marquee";
import { Particles } from "@/components/ui/particles";

function PortfolioPlaceholder({ index }: { index: number }) {
  const gradients = [
    "from-indigo-400/80 to-indigo-600/80",
    "from-gray-700 to-gray-900",
    "from-slate-500 to-slate-700",
    "from-indigo-500/70 to-purple-600/70",
    "from-gray-800 to-gray-600",
    "from-slate-600 to-indigo-500/60",
  ];
  return (
    <div
      className={`w-[340px] md:w-[420px] aspect-[16/10] rounded-xl bg-gradient-to-br ${gradients[index % gradients.length]} border border-white/10 flex items-center justify-center shrink-0 shadow-lg group hover:scale-[1.02] transition-transform duration-300`}
    >
      <span className="text-sm text-white/40 font-medium group-hover:text-white/60 transition-colors">
        Portfolio {index + 1}
      </span>
    </div>
  );
}

export default function ProofSection() {
  return (
    <section id="proof" className="relative py-20 md:py-32 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 overflow-hidden">
      {/* Radial gradient mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(99,102,241,0.12),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_80%_80%,rgba(139,92,246,0.08),transparent)]" />

      {/* Giant watermark */}
      <span className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white/[0.02] select-none pointer-events-none whitespace-nowrap tracking-tighter hidden md:block" aria-hidden="true">
        RESULTS
      </span>

      {/* Decorative circles */}
      <div className="absolute top-20 right-[15%] w-32 h-32 rounded-full border border-indigo-500/10" />
      <div className="absolute bottom-32 left-[10%] w-24 h-24 rounded-full border border-purple-500/10" />

      {/* Stats header */}
      <div className="relative max-w-5xl mx-auto px-4 md:px-6">
        <div className="text-center">
          <BlurFade delay={0.05}>
            <p className="text-lg md:text-xl font-medium text-indigo-400">
              {SECTION_PROOF.intro}
            </p>
          </BlurFade>
          <TextAnimate
            as="h2"
            by="character"
            animation="blurInUp"
            startOnView
            once
            className="mt-3 text-4xl md:text-6xl font-bold leading-tight tracking-tight text-white"
          >
            {SECTION_PROOF.title}
          </TextAnimate>
        </div>

        {/* Number counters - massive */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {SECTION_PROOF.stats.map((stat, i) => (
            <BlurFade key={stat.label} delay={0.25 + i * 0.1}>
              <div className="relative text-center p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-indigo-500/30 transition-all duration-300 group">
                <div className="text-6xl md:text-8xl font-black text-white leading-none">
                  <NumberTicker value={stat.value} delay={0.5 + i * 0.2} className="text-white" />
                  <AuroraText
                    colors={["#6366f1", "#8b5cf6", "#a78bfa", "#6366f1"]}
                    speed={2}
                    className="text-6xl md:text-8xl font-black"
                  >
                    {stat.suffix}
                  </AuroraText>
                </div>
                <p className="mt-4 text-lg font-semibold text-white">
                  {stat.label}
                </p>
                <p className="mt-1 text-base text-gray-500">{stat.sub}</p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>

      {/* Portfolio carousel - 3 rows */}
      <div className="relative mt-12 md:mt-16 space-y-4 overflow-hidden">
        <Marquee pauseOnHover className="[--duration:30s]">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <PortfolioPlaceholder key={i} index={i} />
          ))}
        </Marquee>
        <Marquee pauseOnHover reverse className="[--duration:35s]">
          {[3, 4, 5, 0, 1, 2].map((i) => (
            <PortfolioPlaceholder key={`r-${i}`} index={i} />
          ))}
        </Marquee>
        <Marquee pauseOnHover className="[--duration:32s]">
          {[1, 3, 5, 2, 4, 0].map((i) => (
            <PortfolioPlaceholder key={`t-${i}`} index={i} />
          ))}
        </Marquee>
      </div>

      {/* Closing CTA block */}
      <div className="relative max-w-5xl mx-auto px-4 md:px-6 mt-16 md:mt-20">
        <BlurFade delay={0.3}>
          <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-indigo-600 to-indigo-700 text-center md:text-left overflow-hidden">
            <Particles
              className="absolute inset-0"
              quantity={40}
              color="#ffffff"
              size={0.3}
              staticity={30}
            />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px]" />
            <div className="relative">
              <h3 className="text-3xl md:text-4xl font-bold leading-snug text-white whitespace-pre-line">
                {SECTION_PROOF.closingTitle}
              </h3>
              <p className="mt-4 text-lg md:text-xl font-normal leading-[1.7] text-indigo-100 whitespace-pre-line">
                {SECTION_PROOF.closingBody}
              </p>
              <a
                href="#cta"
                className="mt-6 inline-flex items-center justify-center h-12 md:h-14 px-8 text-base font-semibold rounded-full bg-white text-indigo-700 hover:bg-indigo-50 transition-colors shadow-lg"
              >
                {SECTION_PROOF.closingCta}
              </a>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
