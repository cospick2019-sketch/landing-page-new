import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "가격 안내",
  description:
    "Landing Pick의 합리적인 가격으로 전환율 높은 랜딩페이지를 제작하세요. 이벤트 특가 진행 중.",
  openGraph: {
    title: "가격 안내 | Landing Pick",
    description:
      "Landing Pick의 합리적인 가격으로 전환율 높은 랜딩페이지를 제작하세요. 이벤트 특가 진행 중.",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
