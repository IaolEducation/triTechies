"use client";

import Link from "next/link";
import { FadeIn } from "@/components/animations/FadeIn";

export function Footer() {
  return (
    <footer className="w-full bg-slate-50 dark:bg-[#060b13] pt-24 px-6 md:px-12 pb-6 border-t border-slate-200 dark:border-slate-800 transition-colors duration-500 overflow-hidden flex flex-col justify-end">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
        
        {/* Left Col */}
        <div className="flex flex-col gap-6">
          <Link href="/" className="text-3xl font-black text-accent-dark dark:text-white tracking-tighter">
            triTechies.
          </Link>
          <p className="text-slate-600 dark:text-slate-400 font-medium max-w-sm">
            We don’t build for looks. We build for results. Custom systems, web applications, and problem-solving software.
          </p>
        </div>

        {/* Mid Col */}
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-slate-900 dark:text-white text-lg">Services</h4>
          <Link href="/services" className="text-slate-600 dark:text-slate-400 hover:text-accent-dark dark:hover:text-accent-light font-medium transition-colors">Business Websites</Link>
          <Link href="/services" className="text-slate-600 dark:text-slate-400 hover:text-accent-dark dark:hover:text-accent-light font-medium transition-colors">Web Applications</Link>
          <Link href="/services" className="text-slate-600 dark:text-slate-400 hover:text-accent-dark dark:hover:text-accent-light font-medium transition-colors">Mobile Apps</Link>
          <Link href="/services" className="text-slate-600 dark:text-slate-400 hover:text-accent-dark dark:hover:text-accent-light font-medium transition-colors">UI/UX Design</Link>
        </div>

        {/* Right Col */}
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-slate-900 dark:text-white text-lg">Company</h4>
          <Link href="/work" className="text-slate-600 dark:text-slate-400 hover:text-accent-dark dark:hover:text-accent-light font-medium transition-colors">Our Work</Link>
          <Link href="/about" className="text-slate-600 dark:text-slate-400 hover:text-accent-dark dark:hover:text-accent-light font-medium transition-colors">About Us</Link>
          <Link href="/contact" className="text-slate-600 dark:text-slate-400 hover:text-accent-dark dark:hover:text-accent-light font-medium transition-colors">Contact</Link>
          <Link href="/admin" className="text-slate-600 dark:text-slate-400 hover:text-accent-dark dark:hover:text-accent-light font-medium transition-colors">Admin Dashboard</Link>
        </div>

      </div>

      <div className="w-full flex-col items-center justify-center pt-8 border-t border-slate-200 dark:border-slate-800">
        <FadeIn delay={0.1} direction="up" className="w-full">
            <h1 className="text-[12vw] leading-none font-black text-slate-200 dark:text-slate-800 tracking-tighter text-center select-none w-full whitespace-nowrap overflow-hidden">
              triTechies.
            </h1>
        </FadeIn>
      </div>
      
      <div className="flex w-full justify-between items-center max-w-7xl mx-auto pt-6 mt-[-4vw]">
          <p className="text-slate-500 dark:text-slate-500 text-sm font-medium z-10 bg-slate-50 dark:bg-[#060b13] px-2">
            © {new Date().getFullYear()} triTechies. All rights reserved.
          </p>
          <p className="text-slate-500 dark:text-slate-500 text-sm font-medium z-10 bg-slate-50 dark:bg-[#060b13] px-2">
            Built for results.
          </p>
      </div>
    </footer>
  );
}
