"use client";

import dynamic from "next/dynamic";
import Header from "@/components/Header";
import HeroSection from "@/components/hero/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import SolutionSection from "@/components/sections/SolutionSection";
import ServiceMarquee from "@/components/visual-breaks/ServiceMarquee";
const MarketingSection = dynamic(() => import("@/components/sections/MarketingSection"), { ssr: false });
const ProofSection = dynamic(() => import("@/components/sections/ProofSection"), { ssr: false });
const GuaranteeSection = dynamic(() => import("@/components/sections/GuaranteeSection"), { ssr: false });
const FaqSection = dynamic(() => import("@/components/sections/FaqSection"), { ssr: false });
const FinalCtaSection = dynamic(() => import("@/components/sections/FinalCtaSection"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

export default function Home() {
  return (
    <>
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
