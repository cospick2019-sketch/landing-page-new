"use client";

import Header from "@/components/Header";
import HeroSection from "@/components/hero/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import SolutionSection from "@/components/sections/SolutionSection";
import ServiceMarquee from "@/components/visual-breaks/ServiceMarquee";
import MarketingSection from "@/components/sections/MarketingSection";
import ProofSection from "@/components/sections/ProofSection";
import GuaranteeSection from "@/components/sections/GuaranteeSection";
import FaqSection from "@/components/sections/FaqSection";
import FinalCtaSection from "@/components/sections/FinalCtaSection";
import Footer from "@/components/Footer";
import { ConsultationProvider } from "@/components/consultation/ConsultationContext";
import ConsultationForm from "@/components/consultation/ConsultationForm";

export default function Home() {
  return (
    <ConsultationProvider>
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
      <ConsultationForm />
    </ConsultationProvider>
  );
}
