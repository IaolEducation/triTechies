"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  if (pathname.startsWith("/admintriTechies2026")) {
    return null;
  }

  const links = [
    { href: "/services", label: "SERVICES" },
    { href: "/work", label: "PORTFOLIO" },
    { href: "/about", label: "PROCESS" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-obsidian-canvas/95 backdrop-blur-sm border-b border-onyx-edge">
      <div className="mx-auto max-w-[1200px]">
        <div className="px-6 py-4 flex items-center justify-between">
          {/* Left: Wordmark + divider + nav links */}
          <div className="flex items-center gap-5">
            <Link href="/" className="text-[21px] font-aeonik font-normal text-frost-text tracking-[-0.011em] hover:opacity-80 transition-opacity">
              triTechies
            </Link>

            <div className="hidden md:block w-px h-5 bg-silver" />

            <nav className="hidden md:flex items-center gap-5">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-[13px] font-aeonik font-bold uppercase tracking-[-0.011em] transition-colors",
                    pathname === link.href ? "text-frost-text" : "text-smoke hover:text-frost-text"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right: Chat pill CTA */}
          <div className="hidden md:flex items-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-pure-white text-obsidian-canvas text-[13px] font-aeonik font-bold uppercase tracking-[-0.011em] hover:opacity-90 transition-opacity"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="w-5 h-5"><path d="M0 0h24v24H0z" fill="none"/><path fill="currentColor" d="M20 2H2v20h2V4h16v12H6v2H4v2h2v-2h16V2z"/></svg>
              LET&apos;S CHAT
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-frost-text"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile nav dropdown — flows directly under the bar */}
        {isOpen && (
          <div className="md:hidden border-t border-onyx-edge px-6 py-6 flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-[13px] font-aeonik font-bold uppercase tracking-[-0.011em] py-3 border-b border-onyx-edge",
                  pathname === link.href ? "text-frost-text" : "text-smoke"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-4 inline-flex items-center justify-center gap-2 px-5 py-3 bg-pure-white text-obsidian-canvas text-[13px] font-aeonik font-bold uppercase tracking-[-0.011em]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="w-5 h-5"><path d="M0 0h24v24H0z" fill="none"/><path fill="currentColor" d="M20 2H2v20h2V4h16v12H6v2H4v2h2v-2h16V2z"/></svg>
              LET&apos;S CHAT
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
