"use client";

import { motion } from "motion/react";
import { PORTFOLIO_ITEMS } from "@/constants/portfolio";
import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { BlurFade } from "@/components/ui/blur-fade";

// Simple helper to get an automated screenshot of a URL
const getScreenshotUrl = (url: string) => {
    return `https://image.thum.io/get/width/1200/crop/800/noanimate/${url}`;
};

export default function PortfolioShowcase() {
    return (
        <div className="relative w-full bg-[#030513] pt-32 pb-40 min-h-screen">
            {/* Background ambient light */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none" />

            {/* Intro section */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 mb-24 md:mb-32 text-center">
                <BlurFade delay={0.1}>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-bold tracking-widest uppercase mb-6 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                        PORTFOLIO
                    </div>
                </BlurFade>
                <BlurFade delay={0.2}>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-8">
                        데이터가 검증한<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                            팔리는 웹사이트
                        </span>
                    </h1>
                </BlurFade>
                <BlurFade delay={0.3}>
                    <p className="text-lg md:text-xl text-indigo-100/70 max-w-2xl mx-auto font-medium leading-relaxed">
                        단순히 예쁘기만 한 디자인이 아닙니다. 철저한 기획과 고객 심리 분석을 바탕으로
                        실제로 전환(매출/DB)을 만들어낸 성공 사례들을 확인하세요.
                    </p>
                </BlurFade>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 flex flex-col gap-32 md:gap-40">
                {PORTFOLIO_ITEMS.map((item, i) => (
                    <PortfolioItem key={item.id} item={item} i={i} />
                ))}
            </div>
        </div>
    );
}

const PortfolioItem = ({ item, i }: { item: any; i: number }) => {
    const isEven = i % 2 === 0;

    return (
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}>
            {/* Visual / Mockup Side */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full lg:w-3/5 group"
            >
                <Link
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative rounded-2xl md:rounded-[2rem] bg-indigo-950/20 border border-white/10 p-2 md:p-4 hover:border-indigo-500/40 transition-colors duration-500 shadow-2xl"
                >
                    {/* Mac OS Style Browser Header */}
                    <div className="h-10 md:h-12 bg-black/40 rounded-t-xl md:rounded-t-[1.5rem] flex items-center px-4 md:px-6 gap-2 border-b border-white/5 backdrop-blur-md">
                        <div className="flex gap-1.5 md:gap-2">
                            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-400/80" />
                            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-amber-400/80" />
                            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-emerald-400/80" />
                        </div>
                        <div className="ml-4 flex-1 h-6 bg-white/5 rounded-md flex items-center px-3 overflow-hidden">
                            <span className="text-[10px] md:text-xs text-white/40 font-mono truncate">{item.link}</span>
                        </div>
                    </div>

                    {/* Screenshot Container */}
                    <div className="relative w-full aspect-[16/10] bg-black rounded-b-xl md:rounded-b-[1.5rem] overflow-hidden">
                        <img
                            src={`/portfolio/${item.id}.png`}
                            alt={`${item.title} preview`}
                            className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700 ease-out"
                            loading="lazy"
                        />
                        {/* Hover overlay with CTA */}
                        <div className="absolute inset-0 bg-indigo-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                            <div className="px-6 py-3 bg-white text-indigo-900 font-bold rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                사이트 방문하기 <ExternalLink className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </Link>
            </motion.div>

            {/* Text Content Side */}
            <motion.div
                initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="w-full lg:w-2/5 flex flex-col"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs md:text-sm font-bold tracking-widest uppercase mb-6 w-fit">
                    {item.category}
                </div>

                <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-6">
                    {item.title}
                </h3>

                <p className="text-base md:text-lg text-indigo-100/70 leading-relaxed font-medium mb-10 text-balance">
                    {item.description}
                </p>

                <div className="space-y-4 mb-10">
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Key Achievements</div>
                    {item.results.map((res: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-3 text-white/90 text-lg md:text-xl font-bold bg-white/5 p-4 rounded-xl border border-white/5">
                            <CheckCircle2 className="w-6 h-6 text-indigo-400 shrink-0" />
                            {res}
                        </div>
                    ))}
                </div>

                <Link
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 text-indigo-400 font-bold text-lg hover:text-indigo-300 transition-colors w-fit"
                >
                    프로젝트 전체보기
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
            </motion.div>
        </div>
    );
};
