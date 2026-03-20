import type { Metadata } from "next";
import IntakeForm from "@/components/intake/IntakeForm";

export const metadata: Metadata = {
  title: "맞춤 견적 신청 | 랜딩픽",
  description: "간단한 작성으로 정확한 맞춤 견적을 받아보세요.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "맞춤 견적 신청",
    description: "간단한 작성으로 정확한 맞춤 견적을 받아보세요.",
    siteName: "Landing Pick",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/intake-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Landing Pick — 맞춤 견적 신청",
      },
    ],
  },
};

export default function IntakePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
        <IntakeForm />
      </div>
    </div>
  );
}
