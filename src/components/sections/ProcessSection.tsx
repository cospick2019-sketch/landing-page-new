"use client";

import { SECTION_PROCESS } from "@/constants/content";
import { TYPO, SPACING, COLOR, CARD } from "@/constants/theme";
import { cn } from "@/lib/utils";
import SectionHeading from "./SectionHeading";
import { BlurFade } from "@/components/ui/blur-fade";

const STEPS = [
  {
    step: "01",
    title: "사업 분석",
    body: "당신의 상품, 고객, 경쟁사를 분석합니다. 장사꾼의 눈으로 '왜 사야 하는지'를 찾아냅니다.",
  },
  {
    step: "02",
    title: "전환 구조 설계",
    body: "고객 심리 흐름에 맞춰 페이지 구조를 설계합니다. 관심 → 신뢰 → 욕구 → 행동의 순서입니다.",
  },
  {
    step: "03",
    title: "카피라이팅",
    body: "팔리는 문장을 직접 씁니다. 디자이너가 쓰는 예쁜 문구가 아니라, 장사꾼이 쓰는 설득하는 문장입니다.",
  },
  {
    step: "04",
    title: "개발 & 최적화",
    body: "코드를 직접 작성합니다. 빠른 로딩, 모바일 최적화, A/B 테스트까지. 데이터로 계속 개선합니다.",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="py-12 md:py-20 bg-white">
      <div className={cn(SPACING.container, "text-center")}>
        <SectionHeading
          eyebrow={SECTION_PROCESS.eyebrow}
          title={SECTION_PROCESS.title}
          sub={SECTION_PROCESS.sub}
        />

        <div className={cn(SPACING.leadToContent, "grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto")}>
          {STEPS.map((item, i) => (
            <BlurFade key={item.step} delay={0.1 + i * 0.1}>
              <div className={CARD.base}>
                <span className="inline-block text-2xl font-extrabold text-gray-200 mb-3">
                  {item.step}
                </span>
                <h3 className={cn(TYPO.h3, COLOR.light.title)}>
                  {item.title}
                </h3>
                <p className={cn(CARD.titleToBody, TYPO.body, COLOR.light.body)}>
                  {item.body}
                </p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
