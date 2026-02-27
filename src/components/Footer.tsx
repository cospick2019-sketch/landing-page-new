"use client";

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
              장사꾼의 랜딩페이지
            </p>
            <p className="text-sm text-gray-400">
              연매출 30억 장사꾼이 직접 만드는 팔리는 페이지
            </p>
          </div>

          <div className="flex gap-6">
            <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">이용약관</a>
            <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">개인정보처리방침</a>
            <button type="button" onClick={open} className="text-sm font-medium text-gray-400 hover:text-white transition-colors cursor-pointer">문의하기</button>
          </div>
        </div>

        <div className="h-px w-full bg-white/5 mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-gray-500 leading-relaxed">
          <div>
            <p>상호명 : 주식회사 샐링(Selling) | 대표 : 김대표</p>
            <p>사업자등록번호 : 123-45-67890 | 통신판매업신고 : 제2025-서울강남-0000호</p>
            <p>개인정보보호책임자 : 박책임</p>
            <p>이메일 : hello@selling.com | 전화 : 02-0000-0000</p>
            <p>주소 : 서울특별시 강남구 업무대로 123, 4층 402호 (장사꾼빌딩)</p>
          </div>
          <div className="md:text-right flex flex-col justify-end">
            <p>&copy; {new Date().getFullYear()} 장사꾼의 랜딩페이지. All rights reserved.</p>
            <p className="mt-2 text-gray-600">
              본 사이트의 모든 콘텐츠는 저작권법의 보호를 받으며 무단 전재 및 복사를 금합니다.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
