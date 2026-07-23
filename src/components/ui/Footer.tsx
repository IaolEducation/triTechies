"use client";

import Link from "next/link";
import { FadeIn } from "@/components/animations/FadeIn";

export function Footer() {
  return (
    <footer className="w-full bg-obsidian-canvas px-6 pb-8 pt-32">
      <div className="max-w-[1200px] mx-auto">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 md:gap-16 mb-16">
            <div className="max-w-xl">
              <p className="text-[13px] font-aeonik font-bold uppercase tracking-[-0.011em] text-amber-whisper mb-4">
                Contact Us
              </p>
              <h3 className="text-[34px] md:text-[44px] font-aeonik font-normal leading-[1.05] tracking-[-0.48px] text-frost-text">
                Ready to build systems that drive real business results?
              </h3>
              <div className="mt-10 flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
                <div>
                  <p className="text-[13px] font-input font-normal text-graphite tracking-[-0.037em] mb-2">
                    Contact triTechies at:
                  </p>
                  <a
                    href="mailto:techiestri@gmail.com"
                    className="inline-flex items-center gap-2 text-[18px] font-aeonik font-normal text-frost-text tracking-[-0.011em] hover:text-amber-whisper transition-colors"
                  >
                    techiestri@gmail.com
                    <span aria-hidden>↗</span>
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <a
                    href="https://www.linkedin.com/company/tritechies"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-[38px] h-[38px] border border-onyx-edge bg-[#161616]/50 text-smoke hover:text-amber-whisper hover:border-silver transition-all duration-300"
                    title="LinkedIn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  </a>
                  <a
                    href="https://x.com/triTechies"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-[38px] h-[38px] border border-onyx-edge bg-[#161616]/50 text-smoke hover:text-amber-whisper hover:border-silver transition-all duration-300"
                    title="X (Twitter)"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="md:pt-20">
              <div className="flex flex-wrap md:flex-col gap-x-8 gap-y-3">
                {[
                  { href: "/services", label: "SERVICES" },
                  { href: "/work", label: "PORTFOLIO" },
                  { href: "/about", label: "PROCESS" },
                  { href: "/contact", label: "CONTACT" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[13px] font-aeonik font-bold uppercase tracking-[-0.011em] text-smoke hover:text-frost-text transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="border-t border-onyx-edge pt-8">
          <FadeIn delay={0.1} direction="up" className="w-full">
            <h1 className="text-[15vw] md:text-[14vw] xl:text-[180px] leading-none font-sans font-bold text-frost-text/95 tracking-[-0.02em] select-none w-full whitespace-nowrap overflow-hidden">
              triTechies<span className="inline-block bg-current h-[0.16em] w-[0.16em] ml-[0.02em] align-baseline" style={{ borderRadius: "50%" }} />
            </h1>
          </FadeIn>
        </div>

        <div className="mt-3 flex flex-row items-center justify-between gap-2">
          <p className="text-[9px] min-[375px]:text-[10px] sm:text-[13px] font-input font-normal text-graphite tracking-[-0.037em]">
            © {new Date().getFullYear()} triTechies. All rights reserved.
          </p>
          <p className="text-[9px] min-[375px]:text-[10px] sm:text-[13px] font-input font-normal text-graphite tracking-[-0.037em] shrink-0">
            Built for results.
          </p>
        </div>
      </div>
    </footer>
  );
}
