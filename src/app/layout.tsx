// deps: content.ts → SITE_META

import type { Metadata } from "next";
import { SITE_META } from "@/constants/content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://landing-pick.vercel.app"),
  verification: {
    google: "rfS4LKuwQyDnRAkmin3MSgHBkSO_gyzPpyBMwklPQlU",
  },
  title: {
    default: SITE_META.title,
    template: "%s | Landing Pick",
  },
  description: SITE_META.description,
  keywords: [
    "랜딩페이지",
    "랜딩페이지 제작",
    "이커머스 랜딩페이지",
    "상세페이지 제작",
    "전환율 최적화",
    "Landing Pick",
    "랜딩픽",
  ],
  openGraph: {
    title: SITE_META.title,
    description: SITE_META.description,
    siteName: "Landing Pick",
    locale: "ko_KR",
    type: "website",
    url: "https://landing-pick.vercel.app",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://landing-pick.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="antialiased font-[family-name:'Pretendard_Variable',system-ui,sans-serif]">
        {children}
      </body>
    </html>
  );
}
