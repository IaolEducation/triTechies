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
              <div className="mt-10">
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
