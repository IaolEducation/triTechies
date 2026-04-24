"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { ArrowRight, Phone } from "lucide-react";

export function About() {
  return (
    <section className="py-32 px-6 w-full relative overflow-hidden transition-colors duration-500">
      {/* Futuristic Background Accents */}
      <div className="absolute top-[20%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-brand-200 blur-[150px] opacity-[0.15] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-accent-dark blur-[150px] opacity-[0.1] mix-blend-screen pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          <div className="lg:col-span-5 relative">
            <FadeIn>
              <div className="inline-flex items-center rounded-full border border-accent-light/30 bg-white/50 dark:bg-slate-800/50 px-3 py-1 text-sm font-medium text-accent-dark dark:text-accent-light mb-6 glass">
                ⚡ THE VISION
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-slate-800 dark:text-white tracking-tighter leading-[0.9] mb-8">
                Build <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-dark to-accent-light">Systems.</span><br />
                Not Pages.
              </h2>
            </FadeIn>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-8">
            <FadeIn delay={0.2}>
              <div className="relative pl-8 md:pl-12 border-l-4 border-accent-dark/30">
                <h3 className="text-2xl md:text-4xl font-bold mb-4 text-slate-800 dark:text-white leading-tight">
                  Technology should make your life <span className="text-accent-dark">easier</span> — not more complicated.
                </h3>
                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  We don’t chase fleeting digital trends or build pretty pages that do nothing. We architect raw, high-performance engines that automate growth, secure data, and actively solve real-world problems.
                </p>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.3}>
              <div className="grid grid-cols-2 gap-6 mt-4">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
                   <div className="text-3xl font-black text-accent-dark mb-2">01</div>
                   <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Automate Reality</h4>
                   <p className="text-sm text-slate-500 font-medium">Replace manual labor with flawless automated pipelines.</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
                   <div className="text-3xl font-black text-accent-dark mb-2">02</div>
                   <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Scale Infinitely</h4>
                   <p className="text-sm text-slate-500 font-medium">Architectures designed to never bottleneck your traffic.</p>
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
    <section className="py-24 px-6 w-full text-foreground-primary dark:text-white flex flex-col items-center text-center relative overflow-hidden transition-colors duration-500">
      <div className="absolute top-[-50%] left-[-10%] w-[100vw] h-[100vw] rounded-full bg-accent-dark blur-3xl opacity-30 mix-blend-multiply" />
      
      <div className="max-w-3xl mx-auto relative z-10">
        <FadeIn>
          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white mb-8 glass">
            <Phone className="w-4 h-4 mr-2" />
            CONTACT US
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Your system doesn’t need <br className="hidden md:block"/> to stay broken.
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-xl text-brand-100 mb-12 font-medium">
            Tell us your problem. We’ll design the solution.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-10 py-5 font-bold text-accent-dark transition-all hover:bg-brand-50 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-background">
            <span className="mr-2 text-lg">Start Your Project</span>
            <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
          </button>
        </FadeIn>
      </div>
    </section>
  );
}
