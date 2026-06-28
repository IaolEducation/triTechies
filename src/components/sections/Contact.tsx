"use client";

import { useState } from "react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Phone, Mail, Send, Loader2 } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      budget: formData.get("budget"),
      timeline: formData.get("timeline"),
      description: formData.get("description"),
      createdAt: serverTimestamp(),
      status: "new"
    };

    try {
      await addDoc(collection(db, "contacts"), data);
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.error(err);
      alert("Failed to submit request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-40 pb-32 px-6 w-full bg-obsidian-canvas flex flex-col items-center">
      <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col justify-center">
          <FadeIn>
            <div className="flex items-center gap-2 mb-8">
              <Phone className="w-4 h-4 text-frost-text" strokeWidth={1.5} />
              <span className="text-[13px] font-aeonik font-bold uppercase tracking-[-0.011em] text-frost-text">
                INITIATE SECURE LINK
              </span>
            </div>
            <h2 className="text-[44px] md:text-[63px] font-aeonik font-normal text-frost-text tracking-[-0.69px] leading-[0.95] mb-6">
              Skip The<br />
              Small Talk.
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="pl-6 md:pl-8 border-l border-onyx-edge mb-10">
              <p className="text-[18px] font-aeonik font-normal text-frost-text tracking-[-0.011em] leading-[1.34] mb-3">
                We engage directly with your exact technical hurdles.
              </p>
              <p className="text-[14px] font-aeonik font-normal text-smoke leading-[1.43]">
                Send us your budget, operational timeline, and a raw description of the core problem. We&apos;ll immediately begin architecting the exact engine required to automate the solution.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex items-center gap-5 p-5 border border-onyx-edge max-w-sm">
              <div className="w-14 h-14 border border-onyx-edge bg-charcoal-surface flex items-center justify-center flex-shrink-0 text-frost-text">
                <Mail className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[13px] font-aeonik font-bold uppercase tracking-[-0.011em] text-frost-text mb-1">
                  Direct Comms Channel
                </p>
                <a href="mailto:techiestri@gmail.com" className="text-[16px] font-aeonik font-normal text-amber-whisper border-b border-amber-whisper/30 hover:border-amber-whisper transition-colors inline-block tracking-[-0.011em]">
                  techiestri@gmail.com
                </a>
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.4}>
          <div className="border border-onyx-edge p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-aeonik font-normal text-smoke tracking-[-0.011em]">Name</label>
                  <input
                    required
                    name="name"
                    type="text"
                    className="bg-charcoal-surface/50 border border-onyx-edge px-4 py-3 outline-none focus:border-silver transition-colors text-frost-text placeholder-fog font-aeonik text-[14px] tracking-[-0.011em]"
                    placeholder="John Doe"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-aeonik font-normal text-smoke tracking-[-0.011em]">Phone</label>
                  <input
                    required
                    name="phone"
                    type="tel"
                    className="bg-charcoal-surface/50 border border-onyx-edge px-4 py-3 outline-none focus:border-silver transition-colors text-frost-text placeholder-fog font-aeonik text-[14px] tracking-[-0.011em]"
                    placeholder="+1..."
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-aeonik font-normal text-smoke tracking-[-0.011em]">Email Address</label>
                <input
                  required
                  name="email"
                  type="email"
                  className="bg-charcoal-surface/50 border border-onyx-edge px-4 py-3 outline-none focus:border-silver transition-colors text-frost-text placeholder-fog font-aeonik text-[14px] tracking-[-0.011em]"
                  placeholder="john@company.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-aeonik font-normal text-smoke tracking-[-0.011em]">Budget Range</label>
                  <select
                    name="budget"
                    className="bg-charcoal-surface/50 border border-onyx-edge px-4 py-3 outline-none focus:border-silver transition-all text-frost-text font-aeonik text-[14px] tracking-[-0.011em] appearance-none"
                  >
                    <option className="text-frost-text bg-charcoal-surface" value="Under $5k">Under $5k</option>
                    <option className="text-frost-text bg-charcoal-surface" value="$5k - $15k">$5k - $15k</option>
                    <option className="text-frost-text bg-charcoal-surface" value="$15k - $50k">$15k - $50k</option>
                    <option className="text-frost-text bg-charcoal-surface" value="$50k+">$50k+</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-aeonik font-normal text-smoke tracking-[-0.011em]">Timeline</label>
                  <select
                    name="timeline"
                    className="bg-charcoal-surface/50 border border-onyx-edge px-4 py-3 outline-none focus:border-silver transition-all text-frost-text font-aeonik text-[14px] tracking-[-0.011em] appearance-none"
                  >
                    <option className="text-frost-text bg-charcoal-surface" value="ASAP">ASAP</option>
                    <option className="text-frost-text bg-charcoal-surface" value="1-3 months">1-3 months</option>
                    <option className="text-frost-text bg-charcoal-surface" value="3-6 months">3-6 months</option>
                    <option className="text-frost-text bg-charcoal-surface" value="Flexible">Flexible</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-aeonik font-normal text-smoke tracking-[-0.011em]">Project Details</label>
                <textarea
                  required
                  name="description"
                  rows={4}
                  className="bg-charcoal-surface/50 border border-onyx-edge px-4 py-3 outline-none focus:border-silver transition-colors text-frost-text placeholder-fog font-aeonik text-[14px] tracking-[-0.011em] resize-none"
                  placeholder="Tell us about the problems you are facing..."
                />
              </div>

              <button
                disabled={loading}
                type="submit"
                className="group mt-2 inline-flex items-center justify-center bg-pure-white border border-pure-white px-8 py-3.5 text-[14px] font-aeonik font-bold uppercase tracking-[-0.011em] text-obsidian-canvas transition-all hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span className="mr-2">{success ? "Request Sent!" : "Submit Request"}</span>
                    {!success && <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}
                  </>
                )}
              </button>
            </form>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
