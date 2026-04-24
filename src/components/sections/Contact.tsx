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
    <section className="py-24 px-6 w-full text-foreground-primary dark:text-white flex flex-col items-center relative overflow-hidden transition-colors duration-500">
      <div className="absolute top-0 right-[-10%] w-[50vw] h-[50vw] rounded-full bg-accent-light blur-[100px] opacity-20 pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col justify-center">
          <FadeIn>
            <div className="inline-flex items-center rounded-full border border-accent-light/30 bg-white/50 dark:bg-slate-800/50 px-3 py-1 text-sm font-medium text-accent-dark dark:text-accent-light mb-6 glass">
              <Phone className="w-4 h-4 mr-2" />
              INITIATE SECURE LINK
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-slate-800 dark:text-white tracking-tighter leading-[0.9] mb-6">
              Skip The <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-dark to-accent-light">Small Talk.</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="relative pl-6 md:pl-8 border-l-4 border-accent-dark/30 mb-10">
               <p className="text-xl md:text-2xl text-slate-800 dark:text-white font-bold leading-tight mb-2">
                 We engage directly with your exact technical hurdles.
               </p>
               <p className="text-md text-slate-600 dark:text-slate-400 font-medium">
                 Send us your budget, operational timeline, and a raw description of the core problem. We’ll immediately begin architecting the exact engine required to automate the solution.
               </p>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
             <div className="flex items-center gap-5 p-5 bg-white/40 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl backdrop-blur-md shadow-lg max-w-sm transition-all hover:-translate-y-1">
                <div className="w-14 h-14 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center flex-shrink-0 shadow-sm text-accent-dark dark:text-accent-light">
                    <Mail className="w-6 h-6" />
                </div>
                <div>
                   <p className="font-bold text-slate-800 dark:text-white text-sm tracking-widest uppercase mb-1">Direct Comms Channel</p>
                   <a href="mailto:hello@tritechies.com" className="text-accent-dark dark:text-accent-light font-bold border-b border-accent-dark/30 hover:border-accent-dark transition-colors inline-block text-lg">
                      hello@tritechies.com
                   </a>
                </div>
             </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.4} className="bg-white/5 border border-white/10 p-8 rounded-3xl glass shadow-2xl relative">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-brand-100">Name</label>
                <input required name="name" type="text" className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-accent-light transition-colors text-white placeholder-white/30 font-medium" placeholder="John Doe" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-brand-100">Phone</label>
                <input required name="phone" type="tel" className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-accent-light transition-colors text-white placeholder-white/30 font-medium" placeholder="+1..." />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-brand-100">Email Address</label>
              <input required name="email" type="email" className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-accent-light transition-colors text-white placeholder-white/30 font-medium" placeholder="john@company.com" />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-brand-100">Budget Range</label>
                <select name="budget" className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-accent-light transition-colors text-white font-medium appearance-none">
                  <option className="text-slate-900" value="Under $5k">Under $5k</option>
                  <option className="text-slate-900" value="$5k - $15k">$5k - $15k</option>
                  <option className="text-slate-900" value="$15k - $50k">$15k - $50k</option>
                  <option className="text-slate-900" value="$50k+">$50k+</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-brand-100">Timeline</label>
                <select name="timeline" className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-accent-light transition-colors text-white font-medium appearance-none">
                  <option className="text-slate-900" value="ASAP">ASAP</option>
                  <option className="text-slate-900" value="1-3 months">1-3 months</option>
                  <option className="text-slate-900" value="3-6 months">3-6 months</option>
                  <option className="text-slate-900" value="Flexible">Flexible</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-brand-100">Project Details</label>
              <textarea required name="description" rows={4} className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-accent-light transition-colors text-white placeholder-white/30 font-medium resize-none" placeholder="Tell us about the problems you are facing..." />
            </div>

            <button disabled={loading} type="submit" className="group mt-2 relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-accent-light border border-accent-light/50 px-8 py-4 font-bold text-white transition-all hover:bg-white hover:text-accent-dark focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-background disabled:opacity-70 disabled:cursor-not-allowed">
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <span className="mr-2 text-lg">{success ? "Request Sent!" : "Submit Request"}</span>
                  {!success && <Send className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}
                </>
              )}
            </button>
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
