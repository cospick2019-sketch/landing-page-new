import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용약관",
  description: "Landing Pick 서비스 이용약관입니다.",
  openGraph: {
    title: "이용약관 | Landing Pick",
    description: "Landing Pick 서비스 이용약관입니다.",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
