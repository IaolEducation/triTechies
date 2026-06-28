"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative w-full flex flex-col items-center justify-center pt-20 pb-10 px-6 overflow-hidden bg-obsidian-canvas">
      <div className="relative z-10 max-w-[900px] mx-auto text-center flex flex-col items-center">
        <FadeIn delay={0.1}>
          <div className="flex items-center gap-2 mb-[3em]">
            <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
            <span className="text-[13px] font-aeonik font-normal text-frost-text tracking-[-0.011em]">
              3/5 SPOTS LEFT FOR JULY
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h1 className="text-[48px] sm:text-[56px] md:text-[68px] lg:text-[78px] font-aeonik font-normal text-frost-text mb-4 leading-[0.95] tracking-[-0.69px]">
            We don&apos;t build for looks,<br className="hidden md:block" />
            {" "}we build for results.
          </h1>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p className="text-[16px] md:text-[18px] text-smoke mb-6 max-w-[640px] mx-auto font-aeonik font-normal tracking-[-0.011em] leading-[1.5]">
            We replace messy manual processes with fast, reliable digital systems that help your team work smarter and scale confidently.
          </p>
        </FadeIn>

        <FadeIn delay={0.4} className="flex flex-col sm:flex-row items-center gap-3 mb-3">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-5 py-2.5 bg-pure-white text-obsidian-canvas text-[14px] font-aeonik font-bold uppercase tracking-[-0.011em] hover:opacity-90 transition-opacity"
          >
            START NOW
          </Link>
          <Link
            href="/work"
            className="group inline-flex items-center justify-center pl-5 pr-3  py-2.5 border border-silver bg-transparent text-frost-text text-[14px] font-aeonik font-bold uppercase tracking-[-0.011em] hover:bg-white/5 transition-colors"
          >
            <span className="mr-2">VIEW WORK</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </FadeIn>

        <FadeIn delay={0.5} className="w-full max-w-[1000px]">
          <Image
            src="/dot-matrix-1782574388927.svg"
            alt="Global reach dot matrix map"
            width={1920}
            height={1080}
            className="w-full h-auto opacity-60 -mt-[4em] mx-auto"
            priority
          />
        </FadeIn>
      </div>
    </section>
  );
}
