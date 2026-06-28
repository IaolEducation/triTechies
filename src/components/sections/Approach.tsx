"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Search, Scissors, Hammer, TrendingUp } from "lucide-react";

export function Approach() {
  const steps = [
    {
      num: "01",
      title: "Understand",
      desc: "We study how your business actually works.",
      icon: Search,
    },
    {
      num: "02",
      title: "Simplify",
      desc: "We remove unnecessary steps and confusion.",
      icon: Scissors,
    },
    {
      num: "03",
      title: "Build",
      desc: "Fast, clean, and reliable systems.",
      icon: Hammer,
    },
    {
      num: "04",
      title: "Improve",
      desc: "We stay with you after launch.",
      icon: TrendingUp,
    },
  ];

  return (
    <section className="py-[5rem] px-6 w-full bg-obsidian-canvas">
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader
          label="PROCESS"
          title="Four steps, no wasted motion"
          subtitle="How we go from your messy reality to a system that runs itself."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 border-t border-l border-onyx-edge">
          {steps.map((step, idx) => (
            <FadeIn key={idx} delay={0.12 * idx}>
              <div className="group relative h-full p-8 border-b border-r border-onyx-edge transition-colors hover:bg-[#161616]">
                <div className="absolute right-0 top-0 flex h-14 w-14 items-center justify-center border-b border-l border-onyx-edge bg-charcoal-surface shadow-lg shadow-black/40">
                  <step.icon strokeWidth={1.5} className="h-6 w-6 text-amber-whisper" />
                </div>
                <span className="block font-input text-[44px] leading-none text-charcoal-surface tracking-[-0.48px] mb-8 transition-colors group-hover:text-amber-whisper">
                  {step.num}
                </span>
                <h3 className="font-input text-[14px] uppercase tracking-[-0.022em] text-frost-text mb-3">
                  {step.title}
                </h3>
                <p className="text-[14px] font-normal text-smoke leading-[1.43]">
                  {step.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
