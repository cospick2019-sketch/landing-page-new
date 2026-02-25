# 랜딩페이지 히어로 섹션 - 작업 진행 내역

> 최종 업데이트: 2026-02-24

---

## 프로젝트 개요

- **목적**: "장사꾼의 랜딩페이지" 세일즈 랜딩페이지의 히어로 섹션 제작
- **경로**: `C:\Users\하령\Desktop\code\landing-page-sales\hero-themes`
- **실행**: `npm run dev` (기본 포트 3000, 충돌 시 `--port 3004` 등 사용)

---

## 기술 스택

| 항목 | 버전/상세 |
|------|-----------|
| Next.js | 16.1.6 (Turbopack) |
| React | 19.2.3 |
| TypeScript | ^5 |
| Tailwind CSS | v4 (globals.css 인라인 설정) |
| Motion | 12.34.3 (framer-motion 후속) |
| 폰트 | Pretendard Variable (CDN) |
| UI 라이브러리 | shadcn/ui + Magic UI 커스텀 컴포넌트 |

---

## 의사결정 히스토리

### 1단계: 5가지 테마 제작
- Impact(화이트 미니멀), Cyber(다크 사이안 네온), Narrative(따뜻한 크림), Bold(다크 퍼플 그라데이션), Luxury(다크 골드)
- 토글 버튼으로 전환 가능하게 구현

### 2단계: 내러티브 스타일 확정
- **3번 Narrative 스타일 선택** (BlurFade + WordRotate + TypingAnimation + Marquee 조합)
- 같은 스타일에서 5가지 컬러 변형 (Teal, Indigo, Coral, Amber, Slate)
- 전체 폰트 크기 상향 조정

### 3단계: 최종 디자인 확정 (현재)
- **인디고 액센트(#4F46E5) + 슬레이트 배경(#F8FAFB)** 단일 팔레트로 통합
- 컬러 토글 제거, 단일 디자인으로 확정
- **인터랙티브 캔버스 배경** 추가 (HTML5 Canvas, 마우스 반응형 별자리 효과)

---

## 현재 파일 구조

```
src/
├── app/
│   ├── layout.tsx          # Pretendard 폰트, lang="ko", 메타데이터
│   ├── page.tsx            # HeroSection만 렌더링
│   ├── globals.css         # Tailwind v4, shadcn 테마, 커스텀 키프레임
│   └── favicon.ico
├── components/
│   ├── hero/
│   │   └── HeroSection.tsx # ★ 메인 히어로 컴포넌트
│   └── ui/                 # Magic UI / shadcn 컴포넌트 (24개)
│       ├── interactive-canvas.tsx  # ★ 커스텀 캔버스 (마우스 반응)
│       ├── blur-fade.tsx           # 블러 페이드 인 애니메이션
│       ├── word-rotate.tsx         # 텍스트 회전 애니메이션
│       ├── typing-animation.tsx    # 타이핑 애니메이션
│       ├── shimmer-button.tsx      # 쉬머 효과 CTA 버튼
│       ├── marquee.tsx             # 하단 마키 스크롤
│       ├── animated-grid-pattern.tsx
│       ├── animated-shiny-text.tsx
│       ├── aurora-text.tsx
│       ├── background-beams.tsx
│       ├── badge.tsx
│       ├── border-beam.tsx
│       ├── button.tsx
│       ├── dot-pattern.tsx
│       ├── lamp.tsx
│       ├── morphing-text.tsx
│       ├── number-ticker.tsx
│       ├── particles.tsx
│       ├── pulsating-button.tsx
│       ├── rainbow-button.tsx
│       ├── shiny-button.tsx
│       ├── sparkles-text.tsx
│       └── text-animate.tsx
├── constants/
│   ├── content.ts          # ★ 모든 텍스트/카피 상수
│   └── theme.ts            # ★ 디자인 토큰 (팔레트, 타이포, 간격, 애니메이션)
└── lib/
    └── utils.ts            # cn() 유틸리티 (clsx + tailwind-merge)
```

> ★ = 핵심 파일 (수정 빈도 높음)

---

## 핵심 파일 상세

### `src/constants/content.ts` - 텍스트 상수

```typescript
SITE_META.title = "장사꾼의 랜딩페이지 | 그들은 장사를 모릅니다"
SITE_META.description = "연매출 30억 장사꾼이 직접 만드는 팔리는 페이지. 효과 없으면 100% 환불."

HERO.eyebrow = "디자이너에게 맡기지 마세요"
HERO.h1 = "그들은 장사를 모릅니다"
HERO.subHeadline = "연매출 30억 장사꾼이 직접 만드는 '팔리는 페이지'"
HERO.trustSignal = "효과 없으면 100% 환불해 드립니다"
HERO.cta = "내 아이템 진단받고 신청하기"

HERO_CREDENTIALS.rotatingCredentials = ["이커머스 10년차 전문가", "매출 30억 달성"]
HERO_CREDENTIALS.marqueeItems = ["연매출 30억 달성", "10년 이커머스 전문", ...]
```

### `src/constants/theme.ts` - 디자인 토큰

| 토큰 | 값 |
|------|-----|
| 배경색 | `#F8FAFB` (슬레이트 화이트) |
| 액센트 | `#4F46E5` (인디고 600) |
| H1 크기 | `text-5xl md:text-7xl font-extrabold` |
| 서브헤드 | `text-2xl md:text-4xl` |
| CTA 버튼 | `h-14 md:h-16 px-10 rounded-full` |
| 캔버스 RGB | `79, 70, 229` |
| BlurFade 딜레이 | `[0, 0.15, 0.3, 0.45, 0.6, 0.75]` |

### `src/components/hero/HeroSection.tsx` - 히어로 구조

```
<section> (min-h-svh, flex center)
  ├── <InteractiveCanvas />        ← 배경: 인터랙티브 별자리 캔버스
  ├── <div spotlight />            ← 은은한 방사형 그라데이션 오버레이
  ├── <div content>                ← pointer-events-none (캔버스 인터랙션 통과)
  │   ├── BlurFade → WordRotate    ← 아이브로우 (자격 증명 회전)
  │   ├── BlurFade → H1            ← "그들은 장사를 모릅니다"
  │   ├── BlurFade → Sub           ← 서브헤드라인
  │   ├── BlurFade → TypingAnim    ← 신뢰 문구 (타이핑 효과)
  │   └── BlurFade → ShimmerBtn    ← CTA 버튼 (pointer-events-auto)
  └── <Marquee />                  ← 하단 크레덴셜 스크롤
```

### `src/components/ui/interactive-canvas.tsx` - 캔버스 효과

- **70개 인디고 점**이 화면에서 부유하며 이동
- **마우스 근접 시**: 점들이 커지고 밝아짐 + 점 사이 연결선 표시 (별자리 효과)
- **앰비언트**: 마우스 없이도 가까운 점들 사이에 은은한 연결선 표시
- **커서 글로우**: 마우스 위치에 부드러운 방사형 빛
- Props: `rgb`, `count(70)`, `linkDist(140)`, `mouseRadius(250)`

---

## 사용 중인 UI 컴포넌트 (히어로에서 실제 사용)

| 컴포넌트 | 역할 | 출처 |
|----------|------|------|
| `InteractiveCanvas` | 배경 인터랙티브 캔버스 | 커스텀 |
| `BlurFade` | 콘텐츠 등장 애니메이션 | Magic UI |
| `WordRotate` | 아이브로우 텍스트 회전 | Magic UI |
| `TypingAnimation` | 신뢰 문구 타이핑 효과 | Magic UI |
| `ShimmerButton` | CTA 버튼 쉬머 효과 | Magic UI |
| `Marquee` | 하단 크레덴셜 스크롤 | Magic UI |

> 나머지 ui/ 컴포넌트들은 이전 테마에서 사용했으며, 향후 다른 섹션에서 재사용 가능

---

## 삭제된 파일 (참고)

이전 단계에서 사용 후 삭제된 파일들:
- `HeroTheme1Clean.tsx` ~ `HeroTheme4Story.tsx` (1단계 테마들)
- `HeroTheme1Impact.tsx` ~ `HeroTheme5Luxury.tsx` (2단계 테마들)
- `ThemeSwitcher.tsx` (컬러 토글 스위처)

---

## 해결된 이슈

| 이슈 | 해결 방법 |
|------|-----------|
| 포트 3000 충돌 | `--port 3004` 사용 |
| `.next/dev/lock` 잠금 | `rm -rf .next/dev/lock` 후 재시작 |
| TypeScript 유니온 타입 에러 | `(typeof PALETTES)[number]` 로 타입 추론 |
| ThemeSwitcher 임포트 에러 | 불필요한 파일 삭제 |
| 캔버스 점 안 보임 (투명도 0.12) | 기본 투명도 0.3으로 상향, 앰비언트 연결선 추가 |

---

## 다음 작업 (TODO)

- [ ] 히어로 섹션 아래 추가 섹션 구현 (문제 제기, 서비스 소개, 포트폴리오, 가격, FAQ 등)
- [ ] CTA 버튼 클릭 시 동작 연결 (폼, 외부 링크 등)
- [ ] 모바일 반응형 최적화 검수
- [ ] 캔버스 모바일 터치 이벤트 대응 (현재 마우스만)
- [ ] 미사용 ui 컴포넌트 정리 (필요 시)
- [ ] 다크모드 대응 (필요 시)
- [ ] 배포 설정

---

## 실행 방법

```bash
cd C:\Users\하령\Desktop\code\landing-page-sales\hero-themes
npm run dev
# 포트 충돌 시:
# npx next dev --port 3004
```

브라우저에서 `http://localhost:3000` (또는 지정 포트) 접속
