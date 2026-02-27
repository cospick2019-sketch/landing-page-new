"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SECTION_FAQ } from "@/constants/content";
import { cn } from "@/lib/utils";
import { TextAnimate } from "@/components/ui/text-animate";
import { BlurFade } from "@/components/ui/blur-fade";

function FaqItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: (typeof SECTION_FAQ.items)[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <BlurFade delay={0.1 + index * 0.06}>
      <div className={cn(
        "border border-gray-200 rounded-2xl transition-all duration-300 overflow-hidden",
        isOpen ? "bg-white shadow-md border-indigo-200" : "bg-white hover:border-gray-300"
      )}>
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between p-5 md:p-6 text-left group"
        >
          <span
            className={cn(
              "text-lg md:text-xl font-semibold pr-4 transition-colors",
              isOpen ? "text-gray-900" : "text-gray-700 group-hover:text-gray-900"
            )}
          >
            {item.q}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "text-xl shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-colors",
              isOpen
                ? "bg-gradient-to-br from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/20"
                : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
            )}
          >
            +
          </motion.span>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-5 md:px-6 pb-5 md:pb-6">
                <div className="h-px bg-gradient-to-r from-indigo-200 via-indigo-100 to-transparent mb-5" />
                <p className="text-lg md:text-xl font-normal leading-[1.7] text-gray-600">
                  {item.a}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </BlurFade>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-20 md:py-32 bg-gradient-to-b from-white via-gray-50/50 to-white overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-1/3 -right-20 w-72 h-72 rounded-full bg-gradient-to-br from-indigo-100/30 to-purple-100/20 blur-[100px]" />
      <div className="absolute bottom-1/4 -left-16 w-56 h-56 rounded-full bg-gradient-to-tr from-blue-50/40 to-indigo-50/30 blur-[80px]" />

      <div className="relative max-w-5xl mx-auto px-4 md:px-6 text-center">
        <TextAnimate
          as="h2"
          by="word"
          animation="blurInUp"
          startOnView
          className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-gray-900"
        >
          {SECTION_FAQ.title}
        </TextAnimate>

        <div className="mt-12 md:mt-16 max-w-3xl mx-auto space-y-3 text-left">
          {SECTION_FAQ.items.map((item, i) => (
            <FaqItem
              key={i}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
