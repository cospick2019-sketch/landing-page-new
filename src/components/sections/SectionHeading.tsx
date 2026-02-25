"use client";

import { TYPO, SPACING, COLOR } from "@/constants/theme";
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/ui/blur-fade";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  sub?: string;
  dark?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  sub,
  dark = false,
}: SectionHeadingProps) {
  const c = dark ? COLOR.dark : COLOR.light;

  return (
    <div className="text-center">
      <BlurFade delay={0.05}>
        <span className={cn(TYPO.eyebrow, c.eyebrow)}>
          {eyebrow}
        </span>
      </BlurFade>
      <BlurFade delay={0.15}>
        <h2
          className={cn(
            SPACING.eyebrowToH2,
            TYPO.h2,
            c.title,
            "whitespace-pre-line"
          )}
        >
          {title}
        </h2>
      </BlurFade>
      {sub && (
        <BlurFade delay={0.25}>
          <p
            className={cn(
              SPACING.h2ToLead,
              TYPO.bodyLead,
              c.lead,
              "whitespace-pre-line"
            )}
          >
            {sub}
          </p>
        </BlurFade>
      )}
    </div>
  );
}
