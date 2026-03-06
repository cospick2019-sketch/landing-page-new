import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FinalCtaSection from "@/components/sections/FinalCtaSection";
import PortfolioShowcase from "@/components/portfolio/PortfolioShowcase";
import { ConsultationProvider } from "@/components/consultation/ConsultationContext";
import ConsultationForm from "@/components/consultation/ConsultationForm";

export const metadata = {
  title: "포트폴리오",
  description:
    "연매출 30억 전문가가 직접 만든 팔리는 랜딩페이지 포트폴리오를 확인하세요.",
  openGraph: {
    title: "포트폴리오 | Landing Pick",
    description:
      "연매출 30억 전문가가 직접 만든 팔리는 랜딩페이지 포트폴리오를 확인하세요.",
  },
};

export default function PortfolioPage() {
  return (
    <ConsultationProvider>
      <Header />
      <main className="bg-[#030513]">
        <PortfolioShowcase />
        <FinalCtaSection />
      </main>
      <Footer />
      <ConsultationForm />
    </ConsultationProvider>
  );
}
