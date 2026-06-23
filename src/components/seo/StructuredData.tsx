// SEO 구조화 데이터(JSON-LD). 서버 컴포넌트에서 렌더되어 초기 HTML에 포함된다.
// deps: content.ts → SITE_META, SECTION_FAQ

import { SITE_META, SECTION_FAQ } from "@/constants/content";

const SITE_URL = "https://landing-pick.vercel.app";

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// 사이트 공통: Organization + WebSite + Service
export function SiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "랜딩픽",
        alternateName: "Landing Pick",
        legalName: "주식회사 픽소코퍼레이션",
        url: SITE_URL,
        logo: `${SITE_URL}/icon.png`,
        email: "cospick2019@gmail.com",
        founder: { "@type": "Person", name: "윤서준" },
        description: SITE_META.description,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_META.title,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "ko-KR",
      },
      {
        "@type": "Service",
        serviceType: "랜딩페이지 제작",
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: "KR",
        description:
          "전환율 최적화에 특화된 이커머스 랜딩페이지·상세페이지 제작 서비스",
      },
    ],
  };
  return <JsonLd data={data} />;
}

// 홈: FAQPage (SECTION_FAQ 기반)
export function FaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: SECTION_FAQ.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
  return <JsonLd data={data} />;
}
