"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center pt-32 pb-16 px-6 overflow-hidden transition-colors duration-500">
      {/* Background gradients for depth but not blocking root */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-200 blur-3xl opacity-50 mix-blend-multiply" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-brand-400 blur-3xl opacity-40 mix-blend-multiply" />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        <FadeIn delay={0.1}>
          <div className="inline-flex items-center rounded-full border border-accent-light/30 bg-white/50 dark:bg-slate-800/50 px-3 py-1 text-sm font-medium text-accent-dark dark:text-accent-light mb-8 glass">
            <span className="flex h-2 w-2 rounded-full bg-accent-light mr-2"></span>
            WHY triTechies
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight transition-colors">
            We don’t build for looks. <br className="hidden md:block" />
            <span className="text-gradient">We build for results.</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto space-y-4 font-medium transition-colors">
            <p>We solve real business problems, not just design screens.</p>
            <p>We build custom systems, not copy-paste templates.</p>
            <p>We think like owners, not just developers.</p>
            <p className="text-accent-dark dark:text-accent-light font-semibold pt-4">
              👉 If your current system is messy, slow, or manual, We fix it.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <Link href="/contact" className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl px-8 py-4 font-bold text-slate-800 dark:text-white transition-all hover:bg-white/20 dark:hover:bg-white/10 hover:scale-105 hover:shadow-brand-500/20 focus:outline-none ring-1 ring-black/5 dark:ring-white/5">
            <span className="mr-2">Start Your Project</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
