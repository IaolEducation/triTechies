"use client";

import React from "react";
import { Monitor, Smartphone, AppWindow, Palette, Code2, Sparkles, ArrowDown, type LucideIcon } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";

// Single source of truth — add a service by dropping one object in here.
type ServiceItem = { title: string; description: string; icon: LucideIcon; href?: string };

const services: ServiceItem[] = [
  {
    title: "Business Websites",
    description:
      "Websites that don't just look good — they build trust and bring clients. Seamless tracking, hyper-fast load times, and perfect SEO frameworks.",
    icon: Monitor,
  },
  {
    title: "Custom Web Applications",
    description:
      "We turn your daily operational chaos into structured systems. Admin dashboards, automated tracking grids, and raw data processors built from scratch.",
    icon: AppWindow,
  },
  {
    title: "Mobile Apps & PWA",
    description:
      "Built natively for real users. Unbreakable offline modes, instantaneous interactions, and pure native hardware connectivity.",
    icon: Smartphone,
  },
  {
    title: "UI/UX Design",
    description:
      "Simple matrices that people actually understand. We strip away generic interfaces and build highly aggressive, targeted structural user flows.",
    icon: Palette,
  },
  {
    title: "Custom Software",
    description:
      "Your business model is extremely unique. Your software should be too. We build exact systems customized specifically for your physical workflow.",
    icon: Code2,
  },
  {
    title: "AI Automation",
    description:
      "We kill repetitive manual work across 10+ sectors — bots, AI workflows, and custom systems tailored to your industry.",
    icon: Sparkles,
    href: "#automation",
  },
];

export function Services() {
  // ponytail: pad to an even count so the ruled grid stays a clean rectangle
  const cells = services.length % 2 ? [...services, null] : services;

  return (
    <section className="pb-[5rem] w-full bg-obsidian-canvas">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionHeader
          label="SERVICES"
          title="Invest today, stand out tomorrow"
          subtitle="We replace messy manual processes with fast, reliable digital systems built across web, mobile, and custom software."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 border-t border-l border-onyx-edge">
          {cells.map((service, idx) =>
            service ? (
              <FadeIn key={service.title} delay={(idx % 2) * 0.08}>
                {React.createElement(
                  service.href ? "a" : "div",
                  {
                    ...(service.href ? { href: service.href } : {}),
                    className:
                      "group relative block p-10 h-full border-b border-r border-onyx-edge transition-colors hover:bg-[#161616]",
                  },
                  <>
                    <div className="absolute right-0 top-0 flex h-14 w-14 items-center justify-center border-b border-l border-onyx-edge bg-charcoal-surface shadow-lg shadow-black/40">
                      <service.icon
                        strokeWidth={1.5}
                        className="h-6 w-6 text-amber-whisper"
                      />
                    </div>
                    <h3 className="font-input text-[14px] uppercase tracking-[-0.022em] text-frost-text mb-3 pr-16">
                      {service.title}
                    </h3>
                    <p className="text-[14px] font-normal leading-[1.43] text-smoke">
                      {service.description}
                    </p>
                    {service.href && (
                      <span className="mt-4 inline-flex items-center gap-1.5 font-input text-[12px] uppercase tracking-[-0.022em] text-amber-whisper">
                        See sectors
                        <ArrowDown
                          strokeWidth={1.5}
                          className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5"
                        />
                      </span>
                    )}
                  </>
                )}
              </FadeIn>
            ) : (
              <div
                key="filler"
                className="hidden md:block border-b border-r border-onyx-edge"
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}
