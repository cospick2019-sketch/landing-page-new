import Header from "@/components/Header";
import PricingSection from "@/components/sections/PricingSection";
import Footer from "@/components/Footer";

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="pt-14 md:pt-16">
        <PricingSection />
      </main>
      <Footer />
    </>
  );
}
