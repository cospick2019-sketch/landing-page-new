"use client";

import { motion } from "motion/react";
import { SECTION_GUARANTEE, SECTION_SCARCITY } from "@/constants/content";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { Particles } from "@/components/ui/particles";
import { ShieldCheck, Lock } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const }
  },
};

export default function GuaranteeSection() {
  return (
    <section id="guarantee" className="relative py-16 md:py-32 lg:py-48 bg-slate-50 overflow-hidden">
      {/* Background ambient particles (dark & light mixed) */}
      <Particles className="absolute inset-0 z-0 opacity-40 mix-blend-multiply" quantity={40} color="#4f46e5" size={0.5} />

      {/* Soft background orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-indigo-200/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-stretch">

          {/* =======================
              LEFT: Guarantee Card (Light Theme)
              ======================= */}
          <BlurFade delay={0.1} className="h-full">
            <div className="relative h-full flex flex-col justify-between p-6 md:p-12 lg:p-14 rounded-2xl md:rounded-[2.5rem] bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden group hover:shadow-[0_20px_40px_rgba(99,102,241,0.08)] hover:-translate-y-1 transition-all duration-500">

              {/* Subtle hover glow in bottom right */}
              <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-colors duration-700 pointer-events-none" />

              {/* Subtle watermark */}
              <div className="absolute -bottom-4 -right-4 opacity-[0.03] pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12">
                <ShieldCheck className="w-[400px] h-[400px] text-indigo-900" />
              </div>

              <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="relative z-10 flex flex-col items-start h-full">

                <motion.div variants={itemVariants} className="mb-10 p-4 bg-gradient-to-br from-indigo-50 to-white rounded-2xl border border-indigo-100 shadow-[0_4px_20px_rgb(99,102,241,0.05)] group-hover:scale-110 transition-transform duration-500">
                  <ShieldCheck className="w-10 h-10 md:w-12 md:h-12 text-indigo-600" strokeWidth={1.5} />
                </motion.div>

                <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl lg:text-[3.25rem] font-black text-gray-900 leading-[1.2] tracking-tight mb-8 whitespace-pre-line text-balance">
                  자신 없으면<br />
                  돈 안 받습니다.<br />
                  <span className="text-indigo-600">매출 안 나오면<br />100% 환불.</span>
                </motion.h2>

                <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-600 leading-[1.8] mb-12 flex-grow text-balance font-medium whitespace-pre-line">
                  {SECTION_GUARANTEE.body}
                </motion.p>

                <motion.div variants={itemVariants} className="w-full mt-auto pt-8 flex items-end justify-between gap-4 relative">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-gray-200 to-transparent" />

                  <p className="text-sm font-medium text-gray-400 max-w-[70%]">
                    * {SECTION_GUARANTEE.disclaimer}
                  </p>

                  {/* Fake Stamp - Positioned elegantly */}
                  <div className="absolute right-0 bottom-0 opacity-90 group-hover:rotate-[-10deg] group-hover:scale-110 transition-all duration-700 delay-100 origin-bottom-right">
                    <div className="w-[84px] h-[84px] rounded-full border-[3px] border-rose-500 flex items-center justify-center -rotate-12 bg-white/90 backdrop-blur-sm shadow-xl relative overflow-hidden">
                      <div className="absolute inset-0 border-[2px] border-dashed border-rose-300 rounded-full m-1" />
                      <span className="text-[12px] font-black text-rose-600 tracking-tighter leading-[1.1] text-center">100%<br />REFUND<br />GUARANTEE</span>
                    </div>
                  </div>
                </motion.div>

              </motion.div>
            </div>
          </BlurFade>

          {/* =======================
              RIGHT: Scarcity Card (Dark Theme)
              ======================= */}
          <BlurFade delay={0.3} className="h-full">
            <div className="relative h-full flex flex-col justify-between p-6 md:p-12 lg:p-14 rounded-2xl md:rounded-[2.5rem] bg-[#030513] border border-white/10 shadow-[0_8px_40px_rgb(0,0,0,0.2)] overflow-hidden group hover:shadow-[0_20px_50px_rgba(99,102,241,0.2)] hover:-translate-y-1 transition-all duration-500">

              {/* Internal Particles for dark card */}
              <Particles className="absolute inset-0 z-0 opacity-50" quantity={20} color="#818cf8" size={0.6} staticity={20} />

              {/* Top ambient glow */}
              <div className="absolute -top-32 -left-32 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-colors duration-700 pointer-events-none" />

              {/* Glowing Border effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-20 pointer-events-none rounded-[2.5rem] overflow-hidden">
                <BorderBeam size={250} duration={8} delay={0} colorFrom="#6366f1" colorTo="#c084fc" borderWidth={2} />
              </div>

              <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="relative z-10 flex flex-col h-full">

                <div className="pb-10 md:pb-12 flex-grow flex flex-col items-start">

                  {/* Unified Icon Style matching the Left Card */}
                  <motion.div variants={itemVariants} className="mb-10 p-4 bg-gradient-to-br from-indigo-900/40 to-indigo-950/40 rounded-2xl border border-indigo-500/30 shadow-[0_4px_20px_rgb(99,102,241,0.1)] group-hover:scale-110 transition-transform duration-500">
                    <Lock className="w-10 h-10 md:w-12 md:h-12 text-indigo-400" strokeWidth={1.5} />
                  </motion.div>

                  <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl lg:text-[3.25rem] font-black text-white leading-[1.2] tracking-tight mb-8 whitespace-pre-line text-balance">
                    매월 딱 <span className="bg-clip-text text-transparent bg-gradient-to-br from-indigo-400 to-purple-400">12팀</span>만<br />
                    계약합니다.
                  </motion.h2>

                  <motion.div variants={itemVariants} className="space-y-6">
                    {SECTION_SCARCITY.body.map((text, i) => (
                      <p key={i} className="text-lg md:text-xl text-indigo-100/70 leading-[1.8] font-medium text-balance whitespace-pre-line">
                        {text}
                      </p>
                    ))}
                  </motion.div>
                </div>

                <motion.div variants={itemVariants} className="pt-10 md:pt-12 mt-auto w-full relative">
                  {/* Fake Perforation Line connecting dark aesthetic */}
                  <div className="absolute top-0 left-0 right-0 h-px border-t border-dashed border-white/20" />

                  <div className="mt-8 relative p-8 md:p-10 rounded-2xl bg-gradient-to-br from-indigo-900/40 via-purple-900/40 to-[#030513] border border-indigo-500/30 overflow-hidden group-hover:border-indigo-400/60 transition-colors duration-500 shadow-[0_0_30px_rgba(99,102,241,0.1)] group-hover:shadow-[0_0_40px_rgba(99,102,241,0.2)]">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.2),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    {/* Glowing highlight line */}
                    <div className="absolute top-0 left-0 w-1/2 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-50" />

                    <p className="relative z-10 text-xl md:text-2xl font-bold text-white leading-[1.6] whitespace-pre-line text-center group-hover:text-indigo-50 transition-colors text-balance">
                      {SECTION_SCARCITY.closing}
                    </p>
                  </div>
                </motion.div>

              </motion.div>
            </div>
          </BlurFade>

        </div>
      </div>
    </section>
  );
}
