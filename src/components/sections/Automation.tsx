"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Stethoscope,
  HardHat,
  PawPrint,
  Scale,
  Building,
  UtensilsCrossed,
  Calculator,
  GraduationCap,
  Factory,
  Users,
  Check,
  type LucideIcon,
} from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";

// Public-safe playbook — internal sales data (revenue, pitch, close time) intentionally omitted.
type Sector = {
  name: string;
  icon: LucideIcon;
  pains: string[];
  solutions: string[];
  stack: string[];
};

const sectors: Sector[] = [
  {
    name: "Hospitals & Clinics",
    icon: Stethoscope,
    pains: [
      "Manual OPD scheduling drives 25–35% no-show rates",
      "Paper intake forms re-keyed into the HMS by staff",
      "No automated follow-up, so patients drop off",
    ],
    solutions: [
      "WhatsApp appointment bot with smart rescheduling",
      "Digital intake auto-synced to your HMS",
      "Post-visit follow-up + medication reminders",
    ],
    stack: ["WATI", "n8n", "Supabase", "GPT-4o mini"],
  },
  {
    name: "Construction",
    icon: HardHat,
    pains: [
      "Daily site reports are unstructured WhatsApp photos",
      "Material procurement runs on gut instinct",
      "Subcontractor billing disputes drag for weeks",
    ],
    solutions: [
      "Photo → structured daily site report (AI vision)",
      "Material estimation + low-stock procurement alerts",
      "AI invoice matching + approval workflows",
    ],
    stack: ["GPT-4o Vision", "Airtable", "WhatsApp", "n8n"],
  },
  {
    name: "Pet Shops & Vets",
    icon: PawPrint,
    pains: [
      "Vaccination reminders sent manually by staff",
      "Pet health records kept in notebooks",
      "No post-visit follow-up, repeat visits drop",
    ],
    solutions: [
      "Auto-reminders for appointments, vaccines, deworming",
      "Pet health profiles with scheduled owner nudges",
      "Post-visit care instructions sent via WhatsApp",
    ],
    stack: ["WATI", "Airtable", "Zapier"],
  },
  {
    name: "Law Firms",
    icon: Scale,
    pains: [
      "NDA / contract drafting takes associates 4–6 hours",
      "Client intake is unstructured email chaos",
      "Court date tracking is manual — misses happen",
    ],
    solutions: [
      "AI contract drafter with a legal clause library",
      "Structured intake with AI case classification",
      "Court calendar sync + multi-channel deadline alerts",
    ],
    stack: ["GPT-4o", "LangChain RAG", "Cal.com", "n8n"],
  },
  {
    name: "Real Estate",
    icon: Building,
    pains: [
      "Portal leads go cold within 2 hours",
      "Agents waste hours qualifying weak leads",
      "Follow-up is inconsistent across every agent",
    ],
    solutions: [
      "Instant lead-response bot, replies in under 2 min",
      "AI lead qualifier scoring budget, location, intent",
      "Automated drip sequences per lead stage",
    ],
    stack: ["GPT-4o", "WATI", "Zoho CRM", "n8n"],
  },
  {
    name: "Restaurants",
    icon: UtensilsCrossed,
    pains: [
      "Aggregator commissions eat 25–30% of revenue",
      "Inventory waste from daily over/under-ordering",
      "Platforms own the customer relationship, not you",
    ],
    solutions: [
      "Direct WhatsApp ordering channel",
      "AI demand forecast + auto inventory reorder",
      "Loyalty automation + re-engagement campaigns",
    ],
    stack: ["WATI", "Razorpay", "Zoho Inventory", "n8n"],
  },
  {
    name: "CA & Accounting",
    icon: Calculator,
    pains: [
      "Filing season means 14-hour days for the team",
      "Client document collection is WhatsApp chaos",
      "Compliance deadlines tracked manually",
    ],
    solutions: [
      "Document collection bot with automated nudges",
      "AI-assisted GST reconciliation + error flagging",
      "Compliance calendar with per-client alerts",
    ],
    stack: ["n8n", "Supabase", "Tally", "WhatsApp API"],
  },
  {
    name: "Coaching & EdTech",
    icon: GraduationCap,
    pains: [
      "Fee reminders sent one-by-one by admin",
      "Teachers burn hours on after-hours doubts",
      "Student progress tracked in scattered Excel sheets",
    ],
    solutions: [
      "Automated fee reminders + payment links",
      "AI doubt-solving bot trained on course material",
      "Performance dashboard with auto parent alerts",
    ],
    stack: ["GPT-4o", "WATI", "Razorpay", "Notion"],
  },
  {
    name: "Manufacturing",
    icon: Factory,
    pains: [
      "Production reports arrive 2 days after the fact",
      "Quality defects caught late, expensive rework",
      "Near-zero supply chain visibility",
    ],
    solutions: [
      "Real-time production dashboard from floor data",
      "AI quality inspection via camera vision",
      "Supplier tracking + automated PO generation",
    ],
    stack: ["Python", "GPT-4o Vision", "Metabase", "n8n"],
  },
  {
    name: "HR & Staffing",
    icon: Users,
    pains: [
      "Screening 200+ applications per role by hand",
      "Interview scheduling is a 5-email back-and-forth",
      "Candidate follow-up drops off after 3 days",
    ],
    solutions: [
      "AI resume screener scored against the JD",
      "Automated interview scheduling synced to calendars",
      "Candidate nurture flow with status updates",
    ],
    stack: ["GPT-4o", "Cal.com", "DocuSign", "n8n"],
  },
];

export function Automation() {
  const [cur, setCur] = useState(0);
  const active = sectors[cur];

  useEffect(() => {
    const timer = setInterval(() => {
      setCur((prev) => (prev + 1) % sectors.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [cur]);

  return (
    <section id="automation" className="scroll-mt-24 py-[5rem] w-full bg-obsidian-canvas">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionHeader
          label="AI AUTOMATION"
          title="Automation built for your sector"
          subtitle="Pick an industry to see the manual work we kill and the systems we put in its place."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-[260px_1fr] border-t border-l border-onyx-edge">
          {/* Sector list */}
          <div className="border-b border-r border-onyx-edge flex md:flex-col overflow-x-auto md:overflow-visible">
            {sectors.map((s, i) => (
              <button
                key={s.name}
                onClick={() => setCur(i)}
                className={`flex items-center gap-3 px-5 py-4 text-left whitespace-nowrap transition-colors w-full border-l-2 ${
                  i === cur
                    ? "bg-[#161616] border-amber-whisper text-frost-text"
                    : "border-transparent text-smoke hover:bg-[#161616] hover:text-frost-text"
                }`}
              >
                <s.icon
                  strokeWidth={1.5}
                  className={`w-[18px] h-[18px] flex-shrink-0 ${
                    i === cur ? "text-amber-whisper" : "text-smoke"
                  }`}
                />
                <span className="text-[14px]">{s.name}</span>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div className="border-b border-r border-onyx-edge p-8 md:p-10 overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={cur}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <active.icon strokeWidth={1.5} className="w-6 h-6 text-amber-whisper" />
                  <h3 className="text-[23px] font-normal tracking-[-0.011em] text-frost-text">
                    {active.name}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <p className="font-input text-[11px] uppercase tracking-[-0.022em] text-graphite mb-4">
                      The manual grind
                    </p>
                    <ul className="flex flex-col gap-3">
                      {active.pains.map((p) => (
                        <li key={p} className="flex gap-2.5 text-[14px] leading-[1.5] text-smoke">
                          <span className="text-ash mt-0.5">—</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-input text-[11px] uppercase tracking-[-0.022em] text-graphite mb-4">
                      What we automate
                    </p>
                    <ul className="flex flex-col gap-3">
                      {active.solutions.map((x) => (
                        <li key={x} className="flex gap-2.5 text-[14px] leading-[1.5] text-frost-text">
                          <Check strokeWidth={1.5} className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-whisper" />
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className="font-input text-[11px] uppercase tracking-[-0.022em] text-graphite mb-3">
                  Tech stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {active.stack.map((t) => (
                    <span
                      key={t}
                      className="font-input text-[12px] text-silver border border-onyx-edge px-2.5 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
