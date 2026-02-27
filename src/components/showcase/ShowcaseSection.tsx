"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SHOWCASE } from "@/constants/content";
import { PALETTE, SHOWCASE_THEME } from "@/constants/theme";
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/ui/blur-fade";
import ShowcaseToggle from "./ShowcaseToggle";
import BeforeAfterMorph from "./BeforeAfterMorph";
import RevenueCalculator from "./RevenueCalculator";
import LiveBuild from "./LiveBuild";
import AnalyticsDashboard from "./AnalyticsDashboard";
import ParticleText from "./ParticleText";

const vizMap: Record<string, React.ComponentType> = {
  morph: BeforeAfterMorph,
  calculator: RevenueCalculator,
  livebuild: LiveBuild,
  dashboard: AnalyticsDashboard,
  particle: ParticleText,
};

export default function ShowcaseSection() {
  const [activeTab, setActiveTab] = useState<string>(SHOWCASE.tabs[0].id);
  const ActiveViz = vizMap[activeTab];

  return (
    <section
      className={cn(SHOWCASE_THEME.section, PALETTE.surface)}
    >
      <div className={SHOWCASE_THEME.container}>
        <BlurFade delay={0.1}>
          <div className="text-center mb-10">
            <h2
              className={cn(
                "text-3xl md:text-5xl font-extrabold tracking-tight",
                PALETTE.text.primary
              )}
            >
              {SHOWCASE.sectionTitle}
            </h2>
            <p
              className={cn("mt-3 text-lg md:text-xl", PALETTE.text.secondary)}
            >
              {SHOWCASE.sectionSub}
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.25}>
          <div className="flex justify-center mb-8">
            <ShowcaseToggle
              tabs={SHOWCASE.tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
        </BlurFade>

        <div className={SHOWCASE_THEME.vizContainer}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <ActiveViz />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
