import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "Landing Pick 개인정보처리방침입니다.",
  openGraph: {
    title: "개인정보처리방침 | Landing Pick",
    description: "Landing Pick 개인정보처리방침입니다.",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
