"use client";

import { useCallback, useEffect, useState } from "react";
import { SHOWCASE_LIVEBUILD } from "@/constants/content";
import { SHOWCASE_THEME, PALETTE } from "@/constants/theme";
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/ui/blur-fade";
import { ShimmerButton } from "@/components/ui/shimmer-button";

const STAGES = SHOWCASE_LIVEBUILD.stages;
const STAGE_DURATION = 3200;

export default function LiveBuild() {
  const [stage, setStage] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [currentTyping, setCurrentTyping] = useState("");

  // Type code character by character
  useEffect(() => {
    if (stage < 0 || stage >= STAGES.length) return;
    const code = STAGES[stage].code;
    let charIdx = 0;
    setCurrentTyping("");

    const interval = setInterval(() => {
      charIdx++;
      setCurrentTyping(code.slice(0, charIdx));
      if (charIdx >= code.length) clearInterval(interval);
    }, 25);

    return () => clearInterval(interval);
  }, [stage]);

  // Auto-advance stages
  useEffect(() => {
    if (!isPlaying || stage >= STAGES.length - 1) {
      if (stage >= STAGES.length - 1) setIsPlaying(false);
      return;
    }
    const timer = setTimeout(() => {
      setTypedLines((prev) => [...prev, STAGES[stage].code]);
      setCurrentTyping("");
      setStage((s) => s + 1);
    }, STAGE_DURATION);
    return () => clearTimeout(timer);
  }, [stage, isPlaying]);

  const handlePlay = useCallback(() => {
    if (stage === -1 || stage >= STAGES.length - 1) {
      setTypedLines([]);
      setCurrentTyping("");
      setStage(0);
      setIsPlaying(true);
    } else {
      setIsPlaying((p) => !p);
    }
  }, [stage]);

  const handleReset = useCallback(() => {
    setStage(-1);
    setIsPlaying(false);
    setTypedLines([]);
    setCurrentTyping("");
  }, []);

  return (
    <div className={cn(SHOWCASE_THEME.card, "p-0 overflow-hidden")}>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Code editor */}
        <div className="bg-slate-900 p-5 md:p-6 min-h-[340px]">
          {/* Window dots */}
          <div className="flex items-center gap-1.5 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-3 text-slate-500 text-xs font-mono">
              page.tsx
            </span>
          </div>

          {/* Code display */}
          <div className={SHOWCASE_THEME.codeEditor.text}>
            {typedLines.map((line, i) => (
              <div key={i} className="text-emerald-400/60">
                {line}
              </div>
            ))}
            {currentTyping && (
              <div>
                {currentTyping}
                <span className="animate-blink-cursor text-emerald-300">|</span>
              </div>
            )}
            {stage === -1 && (
              <span className="text-slate-600 italic">
                {"// 재생 버튼을 눌러보세요"}
              </span>
            )}
          </div>
        </div>

        {/* Preview */}
        <div className="bg-[#F8FAFB] p-6 md:p-8 flex flex-col justify-center min-h-[340px] border-l border-slate-200">
          {stage >= 0 && (
            <BlurFade delay={0.15}>
              <h3
                className={cn(
                  "text-2xl md:text-3xl font-extrabold leading-tight",
                  PALETTE.text.primary
                )}
              >
                그들은 장사를 모릅니다
              </h3>
              <p className={cn("mt-2 text-base", PALETTE.text.secondary)}>
                연매출 30억 전문가가 직접 만드는 팔리는 페이지
              </p>
            </BlurFade>
          )}

          {stage >= 1 && (
            <BlurFade delay={0.15}>
              <p
                className={cn(
                  "mt-4 text-sm font-medium",
                  PALETTE.text.trust
                )}
              >
                효과 없으면 100% 환불해 드립니다
              </p>
            </BlurFade>
          )}

          {stage >= 2 && (
            <BlurFade delay={0.15}>
              <div className="mt-5">
                <ShimmerButton
                  shimmerColor={PALETTE.cta.shimmerColor}
                  background={PALETTE.cta.hex}
                  borderRadius="100px"
                  className="h-11 px-6 text-sm text-white"
                >
                  내 아이템 진단받고 신청하기
                </ShimmerButton>
              </div>
            </BlurFade>
          )}

          {stage === -1 && (
            <div className="flex items-center justify-center h-full">
              <p className="text-slate-300 text-sm">
                프리뷰가 여기에 표시됩니다
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="px-5 py-3 border-t border-slate-200 flex items-center gap-3 bg-white">
        <button
          onClick={handlePlay}
          className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          <span className="text-lg">{isPlaying ? "⏸" : "▶"}</span>
          {isPlaying ? "일시정지" : "재생"}
        </button>
        <button
          onClick={handleReset}
          className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
        >
          리셋
        </button>
        {/* Stage indicators */}
        <div className="ml-auto flex gap-1.5">
          {STAGES.map((s, i) => (
            <div
              key={i}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                i <= stage ? "bg-indigo-600" : "bg-slate-200"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
