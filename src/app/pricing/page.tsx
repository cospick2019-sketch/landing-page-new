"use client";

import Header from "@/components/Header";
import PricingSection from "@/components/sections/PricingSection";
import Footer from "@/components/Footer";
import { ConsultationProvider } from "@/components/consultation/ConsultationContext";
import ConsultationForm from "@/components/consultation/ConsultationForm";

export default function PricingPage() {
  return (
    <ConsultationProvider>
      <Header />
      <main className="pt-14 md:pt-16">
        <PricingSection />
      </main>
      <Footer />
      <ConsultationForm />
    </ConsultationProvider>
  );
}
