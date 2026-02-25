"use client";

import { motion } from "motion/react";
import { SHOWCASE_THEME } from "@/constants/theme";
import { cn } from "@/lib/utils";

interface ShowcaseToggleProps {
  tabs: readonly { id: string; label: string; shortLabel: string }[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

export default function ShowcaseToggle({
  tabs,
  activeTab,
  onTabChange,
}: ShowcaseToggleProps) {
  const t = SHOWCASE_THEME.toggle;

  return (
    <div className={t.wrapper}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            t.item,
            activeTab === tab.id ? t.active : t.inactive
          )}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="showcase-tab-indicator"
              className={t.indicator}
              style={{ zIndex: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10 hidden md:inline">{tab.label}</span>
          <span className="relative z-10 md:hidden">{tab.shortLabel}</span>
        </button>
      ))}
    </div>
  );
}
