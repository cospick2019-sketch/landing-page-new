"use client";

import dynamic from "next/dynamic";
import Header from "@/components/Header";
import HeroSection from "@/components/hero/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import SolutionSection from "@/components/sections/SolutionSection";
import ServiceMarquee from "@/components/visual-breaks/ServiceMarquee";
import { FaqJsonLd } from "@/components/seo/StructuredData";
// SEO: 검색엔진이 본문을 읽을 수 있도록 서버 렌더(ssr: true) 유지 + 지연 로딩
const MarketingSection = dynamic(() => import("@/components/sections/MarketingSection"), { ssr: true });
const ProofSection = dynamic(() => import("@/components/sections/ProofSection"), { ssr: true });
const GuaranteeSection = dynamic(() => import("@/components/sections/GuaranteeSection"), { ssr: true });
const FaqSection = dynamic(() => import("@/components/sections/FaqSection"), { ssr: true });
const FinalCtaSection = dynamic(() => import("@/components/sections/FinalCtaSection"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

export default function Home() {
  return (
    <>
      <FaqJsonLd />
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <ServiceMarquee />
        <MarketingSection />
        <ProofSection />
        <GuaranteeSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  );
}
