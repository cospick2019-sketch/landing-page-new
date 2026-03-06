"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { useConsultation } from "@/components/consultation/ConsultationContext";
import { ArrowRight } from "lucide-react";

export default function PortfolioShowcase() {
    const { open } = useConsultation();

    return (
        <div className="relative w-full bg-[#030513] pt-32 pb-40 min-h-screen flex items-center">
            {/* Background ambient light */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center">
                <BlurFade delay={0.1}>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-bold tracking-widest uppercase mb-6 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                        PORTFOLIO
                    </div>
                </BlurFade>

                <BlurFade delay={0.2}>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-8">
                        직접 팔아본 사람의<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                            진짜 포트폴리오
                        </span>
                    </h1>
                </BlurFade>

                <BlurFade delay={0.3}>
                    <p className="text-lg md:text-xl text-indigo-100/70 max-w-2xl mx-auto font-medium leading-[1.8] mb-10">
                        우리의 포트폴리오는 클라이언트를 위해 만든 페이지가 아닙니다.<br />
                        직접 기획하고, 직접 광고하고, 직접 매출을 만든<br />
                        자사 상품 페이지입니다.
                    </p>
                </BlurFade>

                <BlurFade delay={0.4}>
                    <div className="h-px w-16 bg-indigo-500/30 mx-auto mb-10" />
                    <p className="text-lg md:text-xl text-white font-bold mb-12">
                        대표님이 우리의 다음 포트폴리오가 되어주세요.
                    </p>
                </BlurFade>

                <BlurFade delay={0.5}>
                    <div className="group/btn relative inline-flex">
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded border border-indigo-400/50 opacity-0 group-hover/btn:opacity-100 transition duration-300 blur-sm" />
                        <button
                            type="button"
                            onClick={open}
                            className="relative inline-flex items-center justify-center h-14 px-8 text-base font-bold bg-indigo-600 text-white hover:bg-indigo-500 transition-all rounded cursor-pointer"
                        >
                            상담 신청하기
                            <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </BlurFade>
            </div>
        </div>
    );
}
