import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FinalCtaSection from "@/components/sections/FinalCtaSection";
import PortfolioShowcase from "@/components/portfolio/PortfolioShowcase";
import { ConsultationProvider } from "@/components/consultation/ConsultationContext";
import ConsultationForm from "@/components/consultation/ConsultationForm";

export const metadata = {
  title: "포트폴리오",
  description:
    "남의 포트폴리오가 아닌, 직접 팔아본 페이지만 보여드립니다. 대표님이 우리의 포트폴리오가 되어주세요.",
  openGraph: {
    title: "포트폴리오 | Landing Pick",
    description:
      "남의 포트폴리오가 아닌, 직접 팔아본 페이지만 보여드립니다. 대표님이 우리의 포트폴리오가 되어주세요.",
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
