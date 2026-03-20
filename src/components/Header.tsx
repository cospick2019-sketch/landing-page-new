"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
const KAKAO_CHAT_URL = "http://pf.kakao.com/_DLuZX/chat?text=견적문의";

const NAV_ITEMS = [
  { label: "서비스 소개", href: "/#solution" },
  { label: "포트폴리오", href: "/portfolio" },
  { label: "가격 안내", href: "/pricing" },
  { label: "자주 묻는 질문", href: "/#faq" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const showDark = scrolled || !isHome;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 다른 페이지에서 /#faq 등으로 이동해 왔을 때 해시 스크롤 처리
  useEffect(() => {
    if (pathname !== "/") return;
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    let cancelled = false;
    const scrollToHash = () => {
      const el = document.getElementById(hash);
      if (el) {
        const offsetPosition = el.getBoundingClientRect().top + window.pageYOffset - 72;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        return true;
      }
      return false;
    };

    // 동적 로드 섹션을 위해 엘리먼트가 나타날 때까지 폴링
    let attempts = 0;
    const poll = setInterval(() => {
      if (cancelled || scrollToHash() || ++attempts > 20) clearInterval(poll);
    }, 200);

    return () => { cancelled = true; clearInterval(poll); };
  }, [pathname]);

  const isHashLink = (href: string) => href.includes("#");

  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileOpen(false);

    // /#faq 같은 형태에서 hash 추출
    const hash = href.split("#")[1];
    if (!hash) return;

    // 현재 메인 페이지가 아니면 일반 네비게이션 (Next.js가 처리)
    if (pathname !== "/") return;

    e.preventDefault();
    const targetElement = document.getElementById(hash);
    if (targetElement) {
      const headerOffset = 72;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 w-full h-16 md:h-[72px] z-50 transition-all duration-300",
        showDark
          ? "bg-white/90 backdrop-blur-md border-b border-white/20 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="relative h-full max-w-7xl mx-auto px-5 md:px-6 flex items-center">
        {/* 좌측: 로고 */}
        <Link href="/" className="flex-shrink-0 flex items-end -gap-px" onClick={() => { if (pathname === "/") window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <div className="relative h-9 w-9 md:h-10 md:w-10 shrink-0">
            <img
              src="/LandingPick-simple-white.png"
              alt=""
              className={cn(
                "absolute inset-0 h-full w-full object-contain transition-opacity duration-300",
                showDark ? "opacity-0" : "opacity-100"
              )}
            />
            <img
              src="/LandingPick-simple-black.png"
              alt=""
              className={cn(
                "absolute inset-0 h-full w-full object-contain transition-opacity duration-300",
                showDark ? "opacity-100" : "opacity-0"
              )}
            />
          </div>
          <span className="text-base md:text-lg font-bold tracking-tight -ml-0.5 leading-none mb-px">
            <span className={cn(
              "transition-colors duration-300",
              showDark ? "text-gray-900" : "text-white"
            )}>Landing </span>
            <span className="text-indigo-600">Pick</span>
          </span>
        </Link>

        {/* 중앙: 네비게이션 (뷰포트 정중앙) */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
          {NAV_ITEMS.map((item) =>
            isHashLink(item.href) ? (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleHashClick(e, item.href)}
                className={cn(
                  "text-base font-medium transition-colors duration-150 cursor-pointer",
                  showDark
                    ? "text-gray-600 hover:text-gray-900"
                    : "text-gray-300 hover:text-white"
                )}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-base font-medium transition-colors duration-150 cursor-pointer",
                  showDark
                    ? "text-gray-600 hover:text-gray-900"
                    : "text-gray-300 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* 우측: CTA 버튼 */}
        <button
          onClick={() => window.open(KAKAO_CHAT_URL, "_blank")}
          className={cn(
            "hidden md:inline-flex ml-auto items-center text-sm font-bold h-10 px-5 rounded-full transition-colors duration-150 shadow-sm",
            showDark
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-white text-gray-900 hover:bg-gray-100"
          )}
        >
          상담 신청
        </button>

        {/* 모바일: 햄버거 */}
        <button
          className="md:hidden ml-auto p-2"
          aria-label="메뉴 열기"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg
            className={cn(
              "w-6 h-6 transition-colors",
              showDark ? "text-gray-900" : "text-white"
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
          <nav className="max-w-7xl mx-auto px-5 py-4 flex flex-col gap-3">
            {NAV_ITEMS.map((item) =>
              isHashLink(item.href) ? (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleHashClick(e, item.href)}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 py-2 transition-colors cursor-pointer"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 py-2 transition-colors cursor-pointer"
                >
                  {item.label}
                </Link>
              )
            )}
            <button
              onClick={() => {
                setMobileOpen(false);
                window.open(KAKAO_CHAT_URL, "_blank");
              }}
              className="mt-2 inline-flex items-center justify-center text-sm font-bold h-10 px-4 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-sm"
            >
              상담 신청
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
