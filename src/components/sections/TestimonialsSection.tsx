"use client";

import { SECTION_TESTIMONIALS } from "@/constants/content";
import { TextAnimate } from "@/components/ui/text-animate";
import { Marquee } from "@/components/ui/marquee";

function TestimonialCard({
  item,
}: {
  item: (typeof SECTION_TESTIMONIALS.items)[number];
}) {
  return (
    <div className="w-[320px] md:w-[360px] shrink-0 p-6 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-indigo-200 transition-all duration-300 text-left">
      <p className="text-lg md:text-xl font-normal leading-[1.7] text-gray-700">
        &ldquo;{item.content}&rdquo;
      </p>
      <div className="mt-5 flex items-center justify-between">
        <div>
          <p className="text-base font-semibold text-gray-900">{item.name}</p>
          <p className="text-sm text-gray-500">{item.role}</p>
        </div>
        <span className="text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 px-3 py-1.5 rounded-full shadow-sm">
          {item.metric}
        </span>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const items = SECTION_TESTIMONIALS.items;
  const firstRow = items.slice(0, Math.ceil(items.length / 2));
  const secondRow = items.slice(Math.ceil(items.length / 2));

  return (
    <section id="testimonials" className="relative py-20 md:py-32 bg-gradient-to-b from-white via-indigo-50/30 to-white overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
      <div className="absolute top-20 left-[5%] w-72 h-72 rounded-full bg-gradient-to-br from-indigo-100/40 to-purple-100/20 blur-[100px]" />
      <div className="absolute bottom-20 right-[8%] w-56 h-56 rounded-full bg-gradient-to-tl from-blue-100/30 to-indigo-100/20 blur-[80px]" />
      <div className="absolute top-1/3 right-[5%] w-44 h-44 rounded-full border border-indigo-100/50" />

      <div className="relative max-w-5xl mx-auto px-4 md:px-6 text-center">
        <TextAnimate
          as="h2"
          by="word"
          animation="blurInUp"
          startOnView
          once
          className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-gray-900"
        >
          {SECTION_TESTIMONIALS.title}
        </TextAnimate>
      </div>
      <div className="relative mt-12 md:mt-16 space-y-4 overflow-hidden">
        <Marquee pauseOnHover className="[--duration:40s]">
          {firstRow.map((item) => (
            <TestimonialCard key={item.name} item={item} />
          ))}
        </Marquee>
        <Marquee pauseOnHover reverse className="[--duration:40s]">
          {secondRow.map((item) => (
            <TestimonialCard key={item.name} item={item} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
