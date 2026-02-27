"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "서비스 소개", href: "#process" },
  { label: "포트폴리오", href: "#results" },
  { label: "가격 안내", href: "#pricing" },
  { label: "자주 묻는 질문", href: "#faq" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full h-14 md:h-16 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-white/20"
          : "bg-transparent"
      )}
    >
      <div className="relative h-full max-w-7xl mx-auto px-4 md:px-6 flex items-center">
        {/* 좌측: 로고 */}
        <a href="/" className="flex-shrink-0 relative h-8 w-24">
          <img
            src="/logo_white.png"
            alt="장사꾼"
            className={cn(
              "absolute inset-0 h-full w-auto object-contain transition-opacity duration-300",
              scrolled ? "opacity-0" : "opacity-100"
            )}
          />
          <img
            src="/logo_black.png"
            alt="장사꾼"
            className={cn(
              "absolute inset-0 h-full w-auto object-contain transition-opacity duration-300",
              scrolled ? "opacity-100" : "opacity-0"
            )}
          />
        </a>

        {/* 중앙: 네비게이션 (뷰포트 정중앙) */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "text-base font-medium transition-colors duration-150",
                scrolled
                  ? "text-gray-600 hover:text-gray-900"
                  : "text-gray-300 hover:text-white"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* 우측: CTA 버튼 */}
        <a
          href="#cta"
          className={cn(
            "hidden md:inline-flex ml-auto items-center text-sm font-medium h-10 px-4 rounded-full transition-colors duration-150",
            scrolled
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-white text-gray-900 hover:bg-gray-100"
          )}
        >
          상담 신청
        </a>

        {/* 모바일: 햄버거 */}
        <button
          className="md:hidden ml-auto p-2"
          aria-label="메뉴 열기"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg
            className={cn(
              "w-6 h-6 transition-colors",
              scrolled ? "text-gray-900" : "text-white"
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 py-2 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#cta"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center text-sm font-medium h-10 px-4 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            >
              상담 신청
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
