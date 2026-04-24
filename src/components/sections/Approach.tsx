"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { Search, Scissors, Hammer, TrendingUp } from "lucide-react";

export function Approach() {
  const steps = [
    {
      num: "1",
      title: "Understand",
      desc: "We study how your business actually works.",
      icon: <Search className="w-6 h-6 text-accent-dark" />,
    },
    {
      num: "2",
      title: "Simplify",
      desc: "We remove unnecessary steps and confusion.",
      icon: <Scissors className="w-6 h-6 text-accent-dark" />,
    },
    {
      num: "3",
      title: "Build",
      desc: "Fast, clean, and reliable systems.",
      icon: <Hammer className="w-6 h-6 text-accent-dark" />,
    },
    {
      num: "4",
      title: "Improve",
      desc: "We stay with you after launch.",
      icon: <TrendingUp className="w-6 h-6 text-accent-dark" />,
    },
  ];

  return (
    <section className="py-24 px-6 w-full relative overflow-hidden transition-colors duration-500">
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full bg-brand-200 blur-3xl opacity-50 mix-blend-multiply" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground-primary dark:text-white transition-colors">🧠 Our Approach</h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-[45px] left-[10%] right-[10%] h-1 bg-brand-200 z-0"></div>

          {steps.map((step, idx) => (
            <FadeIn key={idx} delay={0.15 * idx} direction={idx % 2 === 0 ? "left" : "right"} className="relative z-10">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-900 border-4 border-brand-100 dark:border-slate-800 flex items-center justify-center mb-6 relative transition-colors">
                  {step.icon}
                  <div className="absolute -top-2 -right-2 bg-accent-light text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                    {step.num}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white transition-colors">{step.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 font-medium transition-colors">{step.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
