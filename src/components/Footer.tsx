"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useConsultation } from "@/components/consultation/ConsultationContext";

export default function Footer() {
  const { open } = useConsultation();
  return (
    <footer className="relative py-12 md:py-16 bg-[#050711] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-10">
          <div>
            <p className="text-xl font-bold text-white tracking-tight mb-2">
              Landing Pick
            </p>
            <p className="text-sm text-gray-400">
              연매출 30억 전문가가 직접 만드는 팔리는 페이지
            </p>
          </div>

          <div className="flex flex-wrap gap-4 md:gap-6">
            <Link href="/terms" className="text-xs md:text-sm font-medium text-gray-400 hover:text-white transition-colors">이용약관</Link>
            <Link href="/privacy" className="text-xs md:text-sm font-medium text-gray-400 hover:text-white transition-colors">개인정보처리방침</Link>
            <button type="button" onClick={open} className="text-xs md:text-sm font-medium text-gray-400 hover:text-white transition-colors cursor-pointer">문의하기</button>
          </div>
        </div>

        <div className="h-px w-full bg-white/5 mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-gray-500 leading-relaxed">
          <div>
            <p>상호명 : 주식회사 픽소코퍼레이션 | 대표 : 윤서준</p>
            <p>사업자등록번호 : 875-87-01802 | 통신판매업신고 : 제 2020-전북군산-00431호</p>
            <p>이메일 : cospick2019@gmail.com</p>
            <p>주소 : 전북특별자치도 군산시 월명로 206(수송동) 삼익빌딩 3층 픽소코퍼레이션</p>
          </div>
          <div className="md:text-right flex flex-col justify-end">
            <p>&copy; {new Date().getFullYear()} Landing Pick. All rights reserved.</p>
            <p className="mt-2 text-gray-600">
              본 사이트의 모든 콘텐츠는 저작권법의 보호를 받으며 무단 전재 및 복사를 금합니다.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
