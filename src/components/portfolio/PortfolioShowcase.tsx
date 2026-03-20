"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { ArrowRight, ExternalLink } from "lucide-react";

const KAKAO_CHAT_URL = "http://pf.kakao.com/_DLuZX/chat";

const PORTFOLIO_ITEMS = [
    { name: "샴푸", url: "https://smartstore.naver.com/mirr-n/products/4240937675", image: "/portfolio/mirrn-shampoo.JPEG" },
    { name: "바디로션", url: "https://smartstore.naver.com/mirr-n/products/4666979547", image: "/portfolio/mirrn-bodylotion.JPEG" },
    { name: "솝", url: "https://smartstore.naver.com/mirr-n/products/4666976563", image: "/portfolio/mirrn-soap.JPEG" },
    { name: "탈모샴푸", url: "https://smartstore.naver.com/mirr-n/products/7872684016", image: "/portfolio/mirrn-hairloss.JPEG" },
    { name: "트리트먼트", url: "https://smartstore.naver.com/mirr-n/products/9648504106", image: "/portfolio/mirrn-treatment.JPEG" },
    { name: "크림", url: "https://smartstore.naver.com/red-skini/products/5614214866", image: "/portfolio/votre-cream.JPEG" },
    { name: "토너", url: "https://smartstore.naver.com/red-skini/products/7452545362", image: "/portfolio/votre-toner.JPEG" },
    { name: "마스크팩", url: "https://smartstore.naver.com/red-skini/products/7452599362", image: "/portfolio/votre-maskpack.JPEG" },
    { name: "거치대", url: "https://smartstore.naver.com/barmm/products/5591628244", image: "/portfolio/barm-holder.JPEG" },
    { name: "바른자세밴드", url: "https://smartstore.naver.com/1gong/products/6736470457", image: "/portfolio/posture-band.JPEG" },
    { name: "무릎보호대", url: "https://smartstore.naver.com/1gong/products/6736437953", image: "/portfolio/anapers-knee.JPEG" },
    { name: "견인기", url: "https://smartstore.naver.com/1gong/products/6736411664", image: "/portfolio/anapers-traction.JPEG" },
    { name: "술렐루야", url: "https://smartstore.naver.com/1gong/products/5148292922", image: "/portfolio/sulleluya.JPEG" },
    { name: "코뽕", url: "https://smartstore.naver.com/1gong/products/6735536604", image: "/portfolio/coppong.JPEG" },
    { name: "수호밤", url: "https://smartstore.naver.com/barmm/products/497265512", image: "/portfolio/suhobam.JPEG" },
    { name: "손목보호대", url: "https://smartstore.naver.com/1gong/products/6736223780", image: "/portfolio/anapers-wrist.JPEG" },
];

export default function PortfolioShowcase() {

    return (
        <div className="relative w-full bg-[#030513] pt-32 pb-20 md:pb-32">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none" />

            {/* Hero */}
            <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-6 text-center pb-10 mb-10 md:pb-0 md:mb-24">
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
                    <p className="text-lg md:text-xl text-indigo-100/70 max-w-2xl mx-auto font-medium leading-[1.8]">
                        우리의 포트폴리오는 클라이언트를 위해 만든 페이지가 아닙니다.<br />
                        직접 기획하고, 직접 광고하고, 직접 매출을 만든<br />
                        자사 상품 페이지입니다.
                    </p>
                </BlurFade>
            </div>

            {/* Gallery */}
            <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {PORTFOLIO_ITEMS.map((item, i) => (
                        <BlurFade key={item.name} delay={0.05 * (i % 4)}>
                            <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative block rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-indigo-500/20"
                            >
                                <div className="relative overflow-hidden h-56 md:h-72 lg:h-[360px]">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        loading="lazy"
                                        className="w-full h-full object-cover object-top transition-all duration-[2000ms] ease-out group-hover:object-bottom group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                                        <ExternalLink className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 drop-shadow-md" />
                                    </div>
                                    {/* 밝은 배경 이미지에서 흰색 텍스트가 잘 보이도록 하단에 어두운 그라데이션 추가 */}
                                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 px-3 py-3 md:px-4 md:py-4 bg-black/60 backdrop-blur-md border-t border-white/10 z-10">
                                    <p className="text-sm md:text-base font-bold text-white truncate drop-shadow-md">{item.name}</p>
                                </div>
                            </a>
                        </BlurFade>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-16 md:mt-24 text-center pb-8">
                    <BlurFade delay={0.2}>
                        <div className="h-px w-16 bg-indigo-500/30 mx-auto mb-10" />
                        <p className="text-lg md:text-xl text-white font-bold mb-12">
                            대표님이 우리의 다음 포트폴리오가 되어주세요.
                        </p>
                    </BlurFade>

                    <BlurFade delay={0.3}>
                        <div className="group/btn relative inline-flex">
                            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded border border-indigo-400/50 opacity-40 group-hover/btn:opacity-100 transition duration-500 blur-md" />
                            <button
                                type="button"
                                onClick={() => window.open(KAKAO_CHAT_URL, "_blank")}
                                className="relative inline-flex items-center justify-center h-16 px-10 text-lg font-bold bg-indigo-600 text-white hover:bg-indigo-500 transition-all rounded shadow-xl hover:shadow-indigo-500/50 cursor-pointer"
                            >
                                상담 신청하기
                                <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </BlurFade>
                </div>
            </div>
        </div>
    );
}
