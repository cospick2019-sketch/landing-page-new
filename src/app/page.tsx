"use client";

import Header from "@/components/Header";
import HeroSection from "@/components/hero/HeroSection";
import CredentialsBand from "@/components/visual-breaks/CredentialsBand";
import ProblemSection from "@/components/sections/ProblemSection";
import SolutionSection from "@/components/sections/SolutionSection";
import ServiceMarquee from "@/components/visual-breaks/ServiceMarquee";
import MarketingSection from "@/components/sections/MarketingSection";
import ProofSection from "@/components/sections/ProofSection";
import BigQuoteBreak from "@/components/visual-breaks/BigQuoteBreak";
import GuaranteeSection from "@/components/sections/GuaranteeSection";
import ScarcitySection from "@/components/sections/ScarcitySection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import PricingSection from "@/components/sections/PricingSection";
import FaqSection from "@/components/sections/FaqSection";
import FinalCtaSection from "@/components/sections/FinalCtaSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <CredentialsBand />
        <ProblemSection />
        <SolutionSection />
        <ServiceMarquee />
        <MarketingSection />
        <ProofSection />
        <BigQuoteBreak />
        <GuaranteeSection />
        <ScarcitySection />
        <TestimonialsSection />
        <PricingSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  );
}
