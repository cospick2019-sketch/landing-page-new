"use client";

import { TYPO, SPACING, COLOR } from "@/constants/theme";
import { cn } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="py-12 md:py-16 bg-gray-50">
      <div className={cn(SPACING.container, "text-center")}>
        <p className={cn("text-base font-bold", COLOR.light.title)}>
          장사꾼의 랜딩페이지
        </p>
        <p className={cn("mt-3", TYPO.caption, COLOR.light.caption)}>
          연매출 30억 장사꾼이 직접 만드는 팔리는 페이지
        </p>
        <div className="mt-6 flex items-center justify-center gap-6">
          <a href="#" className={cn(TYPO.caption, "font-medium", COLOR.light.caption, "hover:text-gray-700 transition-colors")}>
            이용약관
          </a>
          <a href="#" className={cn(TYPO.caption, "font-medium", COLOR.light.caption, "hover:text-gray-700 transition-colors")}>
            개인정보처리방침
          </a>
          <a href="#" className={cn(TYPO.caption, "font-medium", COLOR.light.caption, "hover:text-gray-700 transition-colors")}>
            문의하기
          </a>
        </div>
        <p className={cn("mt-6", TYPO.caption, COLOR.light.caption)}>
          &copy; 2025 장사꾼의 랜딩페이지. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
