export const SITE_TYPES = [
  { value: "landing", label: "랜딩형 홈페이지", desc: "한 페이지에 모든 정보를 담는 일자 형태" },
  { value: "brand", label: "브랜드형 홈페이지", desc: "다양한 페이지로 구성된 브랜드 중심 유형" },
] as const;

export const DESIGN_CONCEPTS = [
  { value: "minimal", label: "심플/미니멀", desc: "깔끔하고 군더더기 없는" },
  { value: "modern", label: "모던/트렌디", desc: "세련되고 감각적인" },
  { value: "premium", label: "고급/프리미엄", desc: "럭셔리하고 격조 있는" },
  { value: "friendly", label: "친근/캐주얼", desc: "따뜻하고 편안한" },
  { value: "bold", label: "강렬/임팩트", desc: "눈에 확 띄는 파워풀한" },
  { value: "natural", label: "자연/감성", desc: "내추럴하고 감성적인" },
] as const;

export const TIMELINES = [
  { value: "1주 이내", label: "1주 이내" },
  { value: "2주 이내", label: "2주 이내" },
  { value: "1개월 이내", label: "1개월 이내" },
  { value: "1개월 이상", label: "1개월 이상" },
  { value: "미정", label: "미정" },
] as const;

export const DESIRED_ACTIONS = [
  { value: "call", label: "전화 문의" },
  { value: "kakao", label: "카톡 상담" },
  { value: "form", label: "폼 제출" },
  { value: "purchase", label: "구매" },
  { value: "reservation", label: "예약" },
  { value: "app-download", label: "앱 다운로드" },
] as const;

export const PAGE_COUNTS = [
  { value: "1", label: "1페이지 (원페이지 랜딩)" },
  { value: "2-3", label: "2~3페이지 (메인 + 서브)" },
  { value: "5+", label: "5페이지 이상 (소규모 홈페이지급)" },
] as const;

export const SECTIONS = [
  { value: "hero", label: "히어로(메인 비주얼)" },
  { value: "service-intro", label: "서비스 소개" },
  { value: "portfolio", label: "포트폴리오·사례" },
  { value: "testimonials", label: "후기·리뷰" },
  { value: "pricing", label: "가격표" },
  { value: "team", label: "팀 소개" },
  { value: "faq", label: "FAQ" },
  { value: "map", label: "오시는 길(지도)" },
  { value: "contact-form", label: "문의 폼" },
  { value: "cta", label: "CTA 배너" },
] as const;

export const REQUIRED_FEATURES = [
  { value: "contact-form", label: "문의 폼 (이름, 연락처, 내용 등)" },
  { value: "call-button", label: "전화 버튼 (모바일 클릭 시 바로 연결)" },
  { value: "kakao-channel", label: "카카오톡 채널 연결" },
  { value: "map", label: "지도 삽입 (네이버/구글 지도)" },
  { value: "popup", label: "팝업 (공지, 이벤트 등)" },
] as const;

export const ADDITIONAL_FEATURES = [
  { value: "reservation", label: "예약/신청 시스템" },
  { value: "payment", label: "결제 연동" },
  { value: "board", label: "게시판" },
  { value: "auth", label: "회원가입/로그인" },
  { value: "multilingual", label: "다국어 지원" },
  { value: "chatbot", label: "챗봇" },
] as const;

export const LOGO_OPTIONS = [
  { value: "yes", label: "있음" },
  { value: "no", label: "없음" },
] as const;

export const COPYWRITING_OPTIONS = [
  { value: "self", label: "직접 제공 가능" },
  { value: "outsource", label: "제작 대행 필요" },
] as const;

export const ASSETS_OPTIONS = [
  { value: "yes", label: "있음" },
  { value: "partial", label: "일부 있음" },
  { value: "no", label: "없음" },
] as const;

/* Label lookup maps for admin display */
export const SITE_TYPES_MAP = Object.fromEntries(SITE_TYPES.map((o) => [o.value, o.label]));
export const DESIGN_CONCEPTS_MAP = Object.fromEntries(DESIGN_CONCEPTS.map((o) => [o.value, o.label]));
export const TIMELINES_MAP = Object.fromEntries(TIMELINES.map((o) => [o.value, o.label]));
export const DESIRED_ACTIONS_MAP = Object.fromEntries(DESIRED_ACTIONS.map((o) => [o.value, o.label]));
export const PAGE_COUNTS_MAP = Object.fromEntries(PAGE_COUNTS.map((o) => [o.value, o.label]));
export const SECTIONS_MAP = Object.fromEntries(SECTIONS.map((o) => [o.value, o.label]));
export const REQUIRED_FEATURES_MAP = Object.fromEntries(REQUIRED_FEATURES.map((o) => [o.value, o.label]));
export const ADDITIONAL_FEATURES_MAP = Object.fromEntries(ADDITIONAL_FEATURES.map((o) => [o.value, o.label]));
export const LOGO_OPTIONS_MAP = Object.fromEntries(LOGO_OPTIONS.map((o) => [o.value, o.label]));
export const COPYWRITING_OPTIONS_MAP = Object.fromEntries(COPYWRITING_OPTIONS.map((o) => [o.value, o.label]));
export const ASSETS_OPTIONS_MAP = Object.fromEntries(ASSETS_OPTIONS.map((o) => [o.value, o.label]));
