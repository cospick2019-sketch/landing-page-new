/**
 * content.ts — 모든 텍스트/카피라이팅 상수
 * 사용자 기획안 기반
 */

export const SITE_META = {
  title: "랜딩픽(Landing Pick) | 매출이 오르는 랜딩페이지 제작",
  description:
    "연매출 30억 전문가가 직접 만드는 팔리는 페이지. 효과 없으면 100% 환불.",
} as const;

/* ═══════════════════════════════════════════════════════
   Section 1: 메인 (Hero)
   ═══════════════════════════════════════════════════════ */

export const HERO = {
  eyebrow: "디자이너에게 맡기지 마세요",
  h1: "그들은\n 장사를 모릅니다",
  subHeadline: "연매출 30억 전문가가 직접 만드는 '팔리는 페이지'",
  trustSignal: "효과 없으면 100% 환불해 드립니다",
  cta: "내 아이템 진단받고 신청하기",
  ctaSub: "월 10건 한정",
} as const;

export const HERO_CREDENTIALS = {
  rotatingCredentials: [
    "이커머스 10년차 전문가",
    "매출 30억 달성",
  ],
  marqueeItems: [
    "연매출 30억 달성",
    "10년 이커머스 전문",
    "100% 환불 보장",
    "데이터 기반 최적화",
  ],
} as const;

/* ═══════════════════════════════════════════════════════
   Section 2: 문제 제기
   ═══════════════════════════════════════════════════════ */

export const SECTION_PROBLEM = {
  eyebrow: "매출 0원의 진짜 이유",
  title: "혹시 비싼 돈 주고 만든 랜딩페이지,\n'예쁜 쓰레기'가 되진 않았나요?",
  points: [
    { text: "디자인은 그럴싸한데 매출은 0원이었던 경험." },
    { text: "밑 빠진 독에 광고비만 날리고 속 쓰렸던 경험." },
    { text: "페이지는 완성됐는데, 문의는 0건." },
    { text: "그건 대표님 상품 탓이 아닙니다." },
  ],
  conclusion: "고객을 설득하는 '기획' 없이,\n'디자인'만 했기 때문입니다.",
} as const;

/* ═══════════════════════════════════════════════════════
   Section 3: 솔루션
   ═══════════════════════════════════════════════════════ */

export const SECTION_SOLUTION = {
  eyebrow: "팔리는 기획의 시작",
  title: "머리 아픈 기획, 하지 마세요.\n팔리는 논리는 제가 짭니다.",
  comparison: {
    bad: {
      label: "일반 웹 에이전시",
      messages: [
        "원고 주세요",
        "사진 주세요",
        "기획안 주세요",
      ],
      sub: "결국 대표님이 다 해야 합니다.",
    },
    good: {
      label: "우리의 제작 방식",
      desc: "\"제품과 장점만 던져주세요.\"",
      steps: [
        "연매출 30억 노하우로 기획",
        "고객 심리를 꿰뚫는 카피라이팅",
        "구매 전환 디자인",
      ],
    },
  },
  closing: "대표님은 그 시간에 매출만 신경 쓰세요.",
} as const;

/* ═══════════════════════════════════════════════════════
   Section 4: 마케팅 확장
   ═══════════════════════════════════════════════════════ */

export const SECTION_MARKETING = {
  intro: "페이지 제작이 끝이 아닙니다.",
  title: "결국 '매출'이 목적 아닌가요?",
  lead: "랜딩페이지만 덩그러니 있으면 무용지물입니다.\n저희는 지금도 물건을 파는 '이커머스 마케팅 회사'입니다.",
  points: [
    {
      icon: "✓",
      title: "성과 중심 설계",
      body: "단순히 보기 좋은 디자인을 넘어서, 철저한 수익(ROI)과 전환율 데이터를 기반으로 행동을 유도하는 구조를 설계합니다.",
    },
    {
      icon: "2",
      title: "완벽한 이해도",
      body: "페이지를 기획한 놈이, 그 페이지의 소구점을 제일 잘 압니다.",
    },
    {
      icon: "3",
      title: "실전 마케팅",
      body: "만든 사람이 직접 광고까지 해야 제대로 팔립니다. 기획, 제작, 광고까지 전부 책임져드리겠습니다.",
    },
  ],
} as const;

/* ═══════════════════════════════════════════════════════
   Section 5: 증명
   ═══════════════════════════════════════════════════════ */

export const SECTION_PROOF = {
  intro: "말로만 전문가?",
  title: "숫자로 증명합니다.",
  stats: [
    { value: 340, suffix: "%+", label: "평균 광고 ROAS", sub: "자사 광고 운영 기준", tooltip: "ROAS(Return On Ad Spend)란 광고비 대비 매출 수익률입니다." },
    { value: 10, suffix: "억+", label: "누적 광고비 집행", sub: "검증된 마케팅 노하우" },
    { value: 120, suffix: "억+", label: "누적 매출", sub: "자사 총 매출 기준" },
  ],
  closingTitle: "지난 10년간 직접 팔아본\n수십만 개의 택배 상자",
  closingBody: "그리고 수십억 원의 매출 데이터.\n이 매출을 만든 '설득 공식'과 '유입 공식'을\n대표님 사업에 그대로 적용해드립니다.",
  closingCta: "상담 신청하기",
} as const;

/* ═══════════════════════════════════════════════════════
   Section 6: 제안 (보장)
   ═══════════════════════════════════════════════════════ */

export const SECTION_GUARANTEE = {
  title: "자신 없으면 돈 안 받습니다\n매출 안 나오면 100% 환불",
  body: "저에게 의뢰하는 건 비용(Cost)이 아니라 투자(Investment)입니다.\n실패 시 리스크는 제가 집니다.\n대표님은 성공의 열매만 가져가세요.",
  disclaimer: "단, 단순 변심 제외, 기획 및 마케팅 패키지 진행 시 기준 협의",
} as const;

export const SECTION_SCARCITY = {
  intro: "죄송합니다",
  title: "월 10팀만 받습니다",
  body: [
    "공장식으로 찍어내지 않습니다. 한 땀 한 땀 제 사업처럼 기획하고 광고까지 해야 직성이 풀립니다.",
    "환불 공약을 걸었기 때문에,\n제가 봐도 확신이 없는 아이템은 정중히 거절합니다.",
  ],
  closing: "즉, 제가 계약을 수락했다면?\n대표님의 아이템은 성공 가능성이 매우 높다는 뜻입니다.",
} as const;

/* ═══════════════════════════════════════════════════════
   Section 7+: 후기 / 가격 / FAQ / 최종CTA
   (사용자 기획안 추가 대기중 — 기존 내용 유지)
   ═══════════════════════════════════════════════════════ */

export const SECTION_TESTIMONIALS = {
  title: "직접 경험한 분들의 이야기",
  items: [
    {
      name: "김민수",
      role: "건강식품 쇼핑몰 대표",
      content:
        "랜딩페이지 바꾸고 첫 달에 전환율이 2배 뛰었습니다. 광고비는 그대로인데 매출이 올랐어요.",
      metric: "전환율 2.1배 상승",
    },
    {
      name: "이서연",
      role: "온라인 교육 플랫폼 운영",
      content:
        "디자이너한테 3번 맡겨서 실패하고, 여기서 한 번에 성공했습니다. 장사를 아는 사람이 만들어야 합니다.",
      metric: "월 매출 4,200만원 달성",
    },
    {
      name: "박준혁",
      role: "패션 브랜드 마케터",
      content:
        "데이터 기반으로 A/B 테스트까지 해주니까 확실히 다릅니다. 체류시간이 3배 늘었어요.",
      metric: "체류시간 312% 증가",
    },
    {
      name: "최유진",
      role: "뷰티 스타트업 CEO",
      content:
        "100% 환불 보장이라 반신반의했는데, 환불 요청할 이유가 없었습니다. 첫 주에 ROI 달성.",
      metric: "7일 만에 ROI 달성",
    },
    {
      name: "정태우",
      role: "전자기기 쇼핑몰",
      content:
        "페이지 하나 바꿨을 뿐인데 광고 효율이 완전히 달라졌습니다. 같은 예산으로 매출 3배.",
      metric: "ROAS 300% 개선",
    },
    {
      name: "한소희",
      role: "프리미엄 식품 브랜드",
      content:
        "카피라이팅부터 구조 설계까지 전부 다르더라고요. 고객이 자연스럽게 구매까지 이어집니다.",
      metric: "이탈률 58% 감소",
    },
  ],
} as const;

export const SECTION_PRICING = {
  eyebrow: "",
  title: "가격 안내",
  sub: "합리적인 가격으로 팔리는 랜딩페이지를 만들어 드립니다.",
  plans: [
    {
      tag: "LIGHT",
      name: "라이트",
      desc: "빠르게 시작하고 싶은 분들을 위한 플랜",
      priceNum: "20",
      originalPriceNum: "40",
      priceSuffix: "만원~",
      pages: "2섹션",
    },
    {
      tag: "BASIC",
      name: "베이직",
      desc: "전환율을 높이고 싶은 분들을 위한 플랜",
      priceNum: "30",
      originalPriceNum: "50",
      priceSuffix: "만원~",
      popular: true,
      pages: "4섹션",
    },
    {
      tag: "PREMIUM",
      name: "프리미엄",
      desc: "최고의 퍼포먼스를 원하는 분들을 위한 플랜",
      priceNum: "50",
      originalPriceNum: "80",
      priceSuffix: "만원~",
      pages: "7섹션 이상",
    },
  ],
  baseFeatures: [
    "페이지 기획 및 카피라이팅 포함",
    "반응형 웹 디자인",
    "관리자 페이지 제공",
    "기본 유지보수 1개월",
    "네이버 웹마스터 도구 설정 지원",
  ],
} as const;

export const SECTION_FAQ = {
  title: "자주 묻는 질문",
  items: [
    {
      q: "정말 효과 없으면 100% 환불 해주나요?",
      a: "네, 계약서에 명시합니다. 저희가 세운 가설과 기획이 빗나가서 매출 변화가 전혀 없다면, 변명 없이 100% 환불해 드립니다. 그만큼 실패할 기획은 애초에 맡지 않기도 합니다.",
    },
    {
      q: "일반적인 랜딩페이지 제작 업체랑 뭐가 다른가요?",
      a: "일반 업체는 '디자인'을 팝니다. 대표님이 문구와 기획을 다 떠먹여 줘야 예쁘게 그려주죠.\n반면, 저희는 '설득의 논리'를 팝니다. 제품의 소구점만 주시면, 고객이 지갑을 열게 만드는 타겟팅, 카피라이팅, 시각적 흐름까지 저희가 알아서 기획하고 디자인합니다.",
    },
    {
      q: "따로 기획서나 디자인이 없어요. 그래도 되나요?",
      a: "오히려 완벽합니다. 어설픈 기획서는 저희가 전부 갈아엎게 됩니다.\n제품 샘플이나 기존 상세페이지, 그리고 제품의 특장점 세 줄만 남겨주세요. 나머지는 저희가 고객 심리를 분석해 완벽한 '세일즈 페이지'로 조립해 드립니다.",
    },
    {
      q: "서비스를 이용하면 실제로 효과가 있을까요?",
      a: "물론입니다. 저희는 지금까지 수백 건의 페이지를 런칭하고 수십억 원의 광고비를 직접 써본 데이터가 있습니다.\n수많은 A/B 테스트를 거쳐 '가장 잘 팔리는 구조'의 정답지를 이미 가지고 시작하기 때문에 당연히 전환율이 다릅니다.",
    },
    {
      q: "수정은 몇 번이나 가능한가요?",
      a: "단순 텍스트나 이미지 교체 등의 유지보수성 수정은 런칭 후 30일 이내라면 기본적으로 제한 없이 진행해 드립니다.\n단, 전체 기획의 틀을 바꾸는 큰 수정은 상호 협의가 필요합니다. 하지만 저희가 제안한 기획이 워낙 탄탄해서 큰 수정을 요청하시는 경우는 거의 없습니다.",
    },
    {
      q: "제작기간은 얼마나 걸리나요?",
      a: "기획안 확정 후 디자인 및 퍼블리싱까지 평균 7영업일~14영업일 소요됩니다.\n공장식으로 찍어내지 않고 철저하게 고민해서 만들기 때문에, 물리적인 시간이 필요합니다. 급하게 내일 당장 만들어 달라는 요청은 정중히 거절합니다.",
    },
  ],
} as const;

export const SECTION_FINAL_CTA = {
  title: "지금 시작하면 \n다음달 매출이 달라집니다",
  sub: "월 10건 한정 · 효과 없으면 100% 환불",
  cta: "내 아이템 진단받고 신청하기",
  ctaSub: "무료 상담 · 부담 없이 시작하세요",
  trustBadges: ["100% 환불 보장", "월 10건 한정", "무료 상담"],
} as const;

export const SECTION_PROCESS = {
  eyebrow: "진행 프로세스",
  title: "이렇게 진행됩니다",
  sub: "체계적인 4단계 프로세스로 확실한 결과를 만듭니다.",
} as const;

export const SECTION_RESULTS = {
  eyebrow: "실제 성과",
  title: "데이터가 증명하는 결과",
  sub: "랜딩페이지 도입 전후 실제 지표 변화입니다.",
} as const;

export const SECTION_REVENUE = {
  eyebrow: "매출 시뮬레이션",
  title: "전환율 차이가 만드는 매출 격차",
  sub: "슬라이더를 움직여 직접 확인해보세요.",
} as const;

/* ═══════════════════════════════════════════════════════
   Showcase — 인터랙티브 데모 섹션
   ═══════════════════════════════════════════════════════ */

export const SHOWCASE = {
  sectionTitle: "직접 체험해보세요",
  sectionSub: "팔리는 페이지가 어떻게 다른지 눈으로 확인하세요.",
  tabs: [
    { id: "morph", label: "Before → After", shortLabel: "B/A" },
    { id: "calculator", label: "매출 계산기", shortLabel: "계산기" },
    { id: "livebuild", label: "라이브 빌드", shortLabel: "빌드" },
    { id: "dashboard", label: "성과 대시보드", shortLabel: "대시보드" },
    { id: "particle", label: "파티클 텍스트", shortLabel: "파티클" },
  ],
} as const;

export const SHOWCASE_MORPH = {
  bad: {
    headline: "고품질 프리미엄 제품을 만나보세요",
    sub: "다양한 제품 라인업으로 고객님의 니즈에 맞는 최적의 솔루션을 제공합니다.",
    extras: ["무료배송", "정품보장", "AS가능", "빠른배송"],
    cta: "구매하기",
  },
  good: {
    headline: "3일 만에 피부가\n달라집니다",
    sub: "2,847명이 이미 경험한 변화",
    trust: "효과 없으면 100% 환불",
    cta: "3일 체험팩 무료 받기",
  },
  sliderLabel: "슬라이더를 움직여 비교해보세요",
} as const;

export const SHOWCASE_CALCULATOR = {
  normalCvr: 0.012,
  proCvr: 0.048,
  visitorsLabel: "일일 방문자 수",
  avgOrderLabel: "평균 객단가",
  normalLabel: "일반 랜딩페이지",
  normalCvrLabel: "전환율 1.2%",
  proLabel: "Landing Pick",
  proCvrLabel: "전환율 4.8%",
  monthlyLabel: "월 예상 매출",
  annualDiffLabel: "연간 매출 차이",
} as const;

export const SHOWCASE_LIVEBUILD = {
  stages: [
    { code: '<h1 className="text-4xl font-bold">그들은 장사를 모릅니다</h1>' },
    { code: '<p className="text-indigo-600">효과 없으면 100% 환불해 드립니다</p>' },
    { code: '<Button variant="shimmer">내 아이템 진단받고 신청하기</Button>' },
  ],
} as const;

export const SHOWCASE_DASHBOARD = {
  beforeBadge: "도입 전",
  afterBadge: "도입 후",
  cvr: {
    label: "전환율 (CVR)",
    before: 1.2,
    after: 4.8,
    unit: "%",
    decimals: 1,
  },
  bounce: {
    label: "이탈률",
    before: 72,
    after: 31,
    unit: "%",
    decimals: 0,
  },
  duration: {
    label: "평균 체류시간",
    before: 45,
    after: 187,
    unit: "초",
    decimals: 0,
  },
} as const;

export const SHOWCASE_PARTICLE = {
  text: "SELLING",
  subtitle: "마우스를 움직여보세요",
} as const;

/* ═══════════════════════════════════════════════════════
   Visual Breaks — 섹션 간 시각적 리듬 요소
   ═══════════════════════════════════════════════════════ */

export const VISUAL_BREAKS = {
  credentialsBand: [
    "매출 성장",
    "CONVERSION",
    "데이터 분석",
    "DATA-DRIVEN",
    "전환 최적화",
    "A/B TESTING",
    "카피라이팅",
    "MARKETING",
    "ROI 극대화",
    "STRATEGY",
  ],
  serviceMarquee: [
    "기획",
    "카피라이팅",
    "디자인",
    "개발",
    "광고 세팅",
    "A/B 테스트",
    "데이터 분석",
    "전환 최적화",
    "퍼널 설계",
  ],
  bigQuote: {
    stat: "340",
    suffix: "%",
    label: "평균 전환율 상승",
    subtext: "랜딩페이지 도입 후 고객사 평균 성과",
  },
} as const;
