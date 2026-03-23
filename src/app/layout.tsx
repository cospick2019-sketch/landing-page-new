// deps: content.ts → SITE_META

import type { Metadata } from "next";
import { Suspense } from "react";
import Script from "next/script";
import { SITE_META } from "@/constants/content";
import { Analytics } from "@vercel/analytics/next";
import KakaoFloatingButton from "@/components/KakaoFloatingButton";
import PageViewTracker from "@/components/PageViewTracker";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://landing-pick.vercel.app"),
  verification: {
    google: "rfS4LKuwQyDnRAkmin3MSgHBkSO_gyzPpyBMwklPQlU",
    other: {
      "naver-site-verification": "8ba2913fbceec5fbdd2cde42d0553fed831b701c",
    },
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
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Landing Pick — 팔리는 랜딩페이지",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_META.title,
    description: SITE_META.description,
    images: ["/og-image.jpg"],
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
        <Script
          src="https://karrot-pixel.business.daangn.com/karrot-pixel.js"
          strategy="afterInteractive"
        />
        <Script id="karrot-pixel-init" strategy="afterInteractive">
          {`window.karrotPixel.init('1773645400906053001');window.karrotPixel.track('ViewPage');`}
        </Script>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1632413104550003');fbq('track','PageView');`}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1632413104550003&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
      <body className="antialiased font-[family-name:'Pretendard_Variable',system-ui,sans-serif]">
        {children}
        <KakaoFloatingButton />
        <Suspense fallback={null}>
          <PageViewTracker />
        </Suspense>
        <Analytics />
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
          strategy="afterInteractive"
        />
        <Script id="kakao-init" strategy="afterInteractive">
          {`if(window.Kakao&&!window.Kakao.isInitialized()){window.Kakao.init('${process.env.NEXT_PUBLIC_KAKAO_JS_KEY||""}');}`}
        </Script>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
