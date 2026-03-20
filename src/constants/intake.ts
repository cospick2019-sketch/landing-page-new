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
export const DESIRED_ACTIONS_MAP = Object.fromEntries(DESIRED_ACTIONS.map((o) => [o.value, o.label]));
export const PAGE_COUNTS_MAP = Object.fromEntries(PAGE_COUNTS.map((o) => [o.value, o.label]));
export const SECTIONS_MAP = Object.fromEntries(SECTIONS.map((o) => [o.value, o.label]));
export const REQUIRED_FEATURES_MAP = Object.fromEntries(REQUIRED_FEATURES.map((o) => [o.value, o.label]));
export const ADDITIONAL_FEATURES_MAP = Object.fromEntries(ADDITIONAL_FEATURES.map((o) => [o.value, o.label]));
export const LOGO_OPTIONS_MAP = Object.fromEntries(LOGO_OPTIONS.map((o) => [o.value, o.label]));
export const COPYWRITING_OPTIONS_MAP = Object.fromEntries(COPYWRITING_OPTIONS.map((o) => [o.value, o.label]));
export const ASSETS_OPTIONS_MAP = Object.fromEntries(ASSETS_OPTIONS.map((o) => [o.value, o.label]));
