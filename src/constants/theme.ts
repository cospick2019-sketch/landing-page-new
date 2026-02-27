/**
 * theme.ts — 디자인 토큰
 *
 * layout-spec.md 기반 gray 스케일 + 2단계 반응형(md: only)
 */

/* ═══════════════════════════════════════════════════════
   타이포그래피 (layout-spec 5장)
   ═══════════════════════════════════════════════════════ */

export const TYPO = {
  h1: "text-4xl md:text-6xl font-extrabold leading-tight tracking-tight",
  h2: "text-4xl md:text-6xl font-bold leading-tight tracking-tight",
  heroLead: "text-2xl md:text-3xl font-normal leading-snug",
  h3: "text-2xl md:text-3xl font-semibold leading-snug tracking-normal",
  bodyLead: "text-2xl md:text-3xl font-normal leading-relaxed",
  body: "text-lg md:text-xl font-normal leading-[1.7] tracking-normal",
  caption: "text-base font-normal leading-relaxed tracking-normal",
  eyebrow: "text-base md:text-lg font-medium tracking-widest uppercase",
  navLink: "text-base font-medium leading-none tracking-normal",
} as const;

/* ═══════════════════════════════════════════════════════
   간격 (layout-spec 3장, 6장)
   ═══════════════════════════════════════════════════════ */

export const SPACING = {
  section: "py-12 md:py-20",
  footer: "py-12 md:py-16",
  container: "max-w-7xl mx-auto px-4 md:px-6",
  containerNarrow: "max-w-3xl mx-auto px-4 md:px-6",
  eyebrowToH2: "mt-3 md:mt-4",
  h2ToLead: "mt-3 md:mt-4",
  h2ToBody: "mt-4 md:mt-6",
  leadToContent: "mt-8 md:mt-12",
  h3ToBody: "mt-3 md:mt-4",
  bodyToBody: "mt-4",
  bodyToCta: "mt-6 md:mt-8",
} as const;

/* ═══════════════════════════════════════════════════════
   CTA 버튼 (layout-spec 12장)
   ═══════════════════════════════════════════════════════ */

export const CTA_STYLE = {
  large: "h-12 md:h-14 px-8 text-base font-semibold rounded-full",
  default: "h-10 md:h-12 px-6 text-sm md:text-base font-medium rounded-full",
  small: "h-9 px-4 text-sm font-medium rounded-full",
  header: "h-10 px-4 text-sm font-medium rounded-full",
  primary: "bg-indigo-600 text-white hover:bg-indigo-700 transition-colors",
  secondary: "border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors",
  ghost: "text-gray-700 underline-offset-4 hover:underline font-medium",
  primaryDark: "bg-white text-gray-900 hover:bg-gray-100 transition-colors",
} as const;

/* ═══════════════════════════════════════════════════════
   텍스트 색상 (layout-spec 13장)
   ═══════════════════════════════════════════════════════ */

export const COLOR = {
  light: {
    title: "text-gray-900",
    lead: "text-gray-600",
    body: "text-gray-700",
    eyebrow: "text-indigo-600",
    caption: "text-gray-500",
  },
  dark: {
    title: "text-white",
    lead: "text-gray-300",
    body: "text-gray-300",
    eyebrow: "text-indigo-400",
    caption: "text-gray-400",
  },
  brand: {
    accent: "text-indigo-600",
    accentBg: "bg-indigo-600",
    accentBgLight: "bg-indigo-50",
    accentBorder: "border-indigo-600",
  },
} as const;

/* ═══════════════════════════════════════════════════════
   카드 컴포넌트 (layout-spec 8장)
   ═══════════════════════════════════════════════════════ */

export const CARD = {
  base: "p-6 rounded-xl border border-gray-200 text-center",
  titleToBody: "mt-3",
  bodyToCaption: "mt-4",
} as const;

/* ═══════════════════════════════════════════════════════
   애니메이션
   ═══════════════════════════════════════════════════════ */

export const ANIM = {
  blurFadeDelays: [0, 0.15, 0.3, 0.45, 0.6, 0.75] as const,
  wordRotate: { duration: 2500 },
  typing: { duration: 60 },
  shimmer: { size: "0.05em", borderRadius: "100px" },
} as const;

/* ═══════════════════════════════════════════════════════
   히어로 전용 스타일
   ═══════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════
   팔레트 (공통 색상 토큰)
   ═══════════════════════════════════════════════════════ */

export const PALETTE = {
  surface: "bg-[#F8FAFB]",
  text: {
    primary: "text-slate-900",
    secondary: "text-slate-500",
    muted: "text-slate-400",
    trust: "text-indigo-600",
  },
  cta: {
    hex: "#4F46E5",
    shimmerColor: "#a5b4fc",
  },
} as const;

/* ═══════════════════════════════════════════════════════
   Showcase 섹션 테마
   ═══════════════════════════════════════════════════════ */

export const SHOWCASE_THEME = {
  section: "py-16 md:py-24",
  container: "max-w-6xl mx-auto px-4 md:px-6",
  vizContainer: "max-w-4xl mx-auto",
  card: "rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden",
  toggle: {
    wrapper:
      "inline-flex items-center gap-1 rounded-full bg-slate-100 p-1",
    item: "relative px-4 py-2 text-sm font-medium rounded-full transition-colors",
    active: "text-slate-900",
    inactive: "text-slate-500 hover:text-slate-700",
    indicator: "absolute inset-0 rounded-full bg-white shadow-sm",
  },
  codeEditor: {
    text: "font-mono text-xs md:text-sm leading-relaxed text-emerald-300 whitespace-pre-wrap",
  },
} as const;

import type { CSSProperties } from "react";

export const HERO_STYLE = {
  surface: "bg-[#F8FAFB]",
  section: "py-16 md:py-24",
  containerNarrow: "max-w-4xl mx-auto px-4 md:px-6",

  typo: {
    eyebrow: "text-base md:text-lg font-medium tracking-widest uppercase",
    h1: "text-5xl md:text-7xl font-extrabold leading-tight tracking-tight",
    heroLead: "text-2xl md:text-4xl font-normal leading-snug",
    trustBody: "text-lg md:text-xl font-medium leading-[1.7]",
    ctaSub: "mt-4 text-base",
    marqueeItem: "text-sm md:text-base font-medium",
  },

  spacing: {
    eyebrowToH1: "mt-4 md:mt-6",
    h1ToLead: "mt-4 md:mt-6",
    contentToCta: "mt-8 md:mt-10",
  },

  color: {
    primary: "text-slate-900",
    secondary: "text-slate-500",
    muted: "text-slate-400",
    accent: "text-indigo-600",
    trust: "text-indigo-600",
  },

  badge: {
    eyebrowPill:
      "inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5",
  },

  cta: {
    large: "h-14 md:h-16 px-10 text-lg font-semibold rounded-full",
    hex: "#4F46E5",
    shimmerColor: "#a5b4fc",
  },

  canvas: {
    rgb: "79, 70, 229",
  },

  effects: {
    spotlight: {
      background:
        "radial-gradient(ellipse 700px 500px at 50% 40%, rgba(79,70,229,0.04), transparent)",
    } satisfies CSSProperties,
  },
} as const;
