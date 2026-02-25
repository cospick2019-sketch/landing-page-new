// deps: content.ts → SITE_META

import type { Metadata } from "next";
import { SITE_META } from "@/constants/content";
import "./globals.css";

export const metadata: Metadata = {
  title: SITE_META.title,
  description: SITE_META.description,
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
