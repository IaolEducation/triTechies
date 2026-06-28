"use client";

import { FadeIn } from "@/components/animations/FadeIn";

export function About() {
  return (
    <section className="pt-40 pb-32 px-6 w-full bg-obsidian-canvas">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-5">
            <FadeIn>
              <h2 className="text-[44px] md:text-[63px] font-aeonik font-normal text-frost-text tracking-[-0.69px] leading-[0.95] mb-8">
                Build<br />
                Systems.<br />
                Not Pages.
              </h2>
            </FadeIn>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-10">
            <FadeIn delay={0.2}>
              <div className="pl-8 md:pl-12 border-l border-onyx-edge">
                <h3 className="text-[23px] md:text-[34px] font-aeonik font-normal mb-4 text-frost-text leading-[1.11] tracking-[-0.011em]">
                  Technology should make your life easier — not more complicated.
                </h3>
                <p className="text-[16px] font-aeonik font-normal text-smoke leading-[1.5]">
                  We don&apos;t chase fleeting digital trends or build pretty pages that do nothing. We architect raw, high-performance engines that automate growth, secure data, and actively solve real-world problems.
                </p>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.3}>
              <div className="grid grid-cols-2 gap-px bg-onyx-edge">
                <div className="bg-obsidian-canvas p-8">
                  <div className="text-[34px] font-aeonik font-normal text-amber-whisper tracking-[-0.011em] mb-3">
                    01
                  </div>
                  <h4 className="text-[16px] font-aeonik font-normal text-frost-text tracking-[-0.011em] mb-2">
                    Automate Reality
                  </h4>
                  <p className="text-[14px] font-aeonik font-normal text-smoke leading-[1.43]">
                    Replace manual labor with flawless automated pipelines.
                  </p>
                </div>
                <div className="bg-obsidian-canvas p-8">
                  <div className="text-[34px] font-aeonik font-normal text-amber-whisper tracking-[-0.011em] mb-3">
                    02
                  </div>
                  <h4 className="text-[16px] font-aeonik font-normal text-frost-text tracking-[-0.011em] mb-2">
                    Scale Infinitely
                  </h4>
                  <p className="text-[14px] font-aeonik font-normal text-smoke leading-[1.43]">
                    Architectures designed to never bottleneck your traffic.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section className="py-[5rem] px-6 w-full bg-obsidian-canvas flex flex-col items-center text-center">
      <div className="max-w-[680px] mx-auto">
        <FadeIn>
          <h2 className="text-[34px] md:text-[44px] font-aeonik font-normal text-frost-text tracking-[-0.48px] leading-[1.05] mb-6">
            Your system doesn&apos;t need to stay broken.
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="text-[16px] font-aeonik font-normal text-smoke mb-12 leading-[1.5]">
            Tell us your problem. We&apos;ll design the solution.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <a
            href="/contact"
            className="group inline-flex items-center justify-center px-5 py-2.5 border border-silver bg-transparent text-frost-text text-[14px] font-aeonik font-bold uppercase tracking-[-0.011em] hover:bg-white/5 transition-colors"
          >
            <span className="mr-2">START PROJECT</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
