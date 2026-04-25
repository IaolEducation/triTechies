"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // If we scroll down past 50px, hide. If we scroll up, show.
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  if (pathname.startsWith("/admintriTechies2026")) {
    return null;
  }

  const links = [
    { href: "/about", label: "ABOUT US" },
    { href: "/services", label: "SERVICES" },
    { href: "/work", label: "OUR WORK" },
  ];

  return (
    <>
      {/* Floating Glassmorphic Pill */}
      <div 
        className={cn(
          "fixed top-4 left-0 right-0 z-50 flex justify-center px-4 transition-transform duration-500 pointer-events-none",
          isVisible ? "translate-y-0" : "-translate-y-[150%]"
        )}
      >
        <nav className="pointer-events-auto flex items-center justify-between px-6 py-3.5 rounded-full bg-[#05070f]/95 bg-[radial-gradient(circle_at_72%_80%,rgba(139,92,246,0.20),transparent_35%),radial-gradient(circle_at_28%_20%,rgba(59,130,246,0.16),transparent_34%)] backdrop-blur-xl border border-white/10 shadow-2xl w-full max-w-5xl transition-all duration-300">
          
          <Link href="/" className="text-xl font-black text-white tracking-tighter hover:opacity-80 transition-opacity">
            <span className="text-accent-light">tri</span>Techies.
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={cn(
                  "text-xs font-bold tracking-widest transition-colors",
                  pathname === link.href ? "text-white" : "text-slate-400 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link 
              href="/contact" 
              className="px-6 py-2.5 rounded-full bg-accent-light text-slate-900 text-sm font-bold hover:bg-white hover:scale-105 transition-all shadow-lg"
            >
              Start Project
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </nav>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div className="md:hidden fixed top-24 left-4 right-4 z-40 rounded-3xl bg-[#05070f]/95 bg-[radial-gradient(circle_at_72%_80%,rgba(139,92,246,0.20),transparent_35%),radial-gradient(circle_at_28%_20%,rgba(59,130,246,0.16),transparent_34%)] backdrop-blur-xl border border-white/10 px-6 py-6 flex flex-col gap-4 shadow-2xl">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-sm font-bold tracking-widest py-3 border-b border-white/5",
                pathname === link.href ? "text-accent-light" : "text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link 
            href="/contact" 
            onClick={() => setIsOpen(false)}
            className="mt-4 text-center px-6 py-3.5 rounded-full bg-accent-light text-slate-900 text-sm font-bold shadow-lg"
          >
            Start Project
          </Link>
        </div>
      )}
    </>
  );
}
