"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Monitor, Smartphone, AppWindow, Palette, Code2 } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";

const services = [
  {
    title: "Business Websites",
    description: "Websites that don’t just look good — they build trust and bring clients. Seamless tracking, hyper-fast load times, and perfect SEO frameworks.",
    icon: <Monitor />,
    color: "from-blue-500 to-cyan-400"
  },
  {
    title: "Custom Web Applications",
    description: "We turn your daily operational chaos into structured systems. Admin dashboards, automated tracking grids, and raw data processors built from scratch.",
    icon: <AppWindow />,
    color: "from-brand-500 to-accent-light"
  },
  {
    title: "Mobile Apps & PWA",
    description: "Built natively for real users. Unbreakable offline modes, instantaneous interactions, and pure native hardware connectivity.",
    icon: <Smartphone />,
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "UI/UX Design",
    description: "Simple matrices that people actually understand. We strip away generic interfaces and build highly aggressive, targeted structural user flows.",
    icon: <Palette />,
    color: "from-orange-500 to-yellow-500"
  },
  {
    title: "Custom Software Solutions",
    description: "Your business model is extremely unique. Your software should be too. We build exact systems customized specifically for your physical workflow.",
    icon: <Code2 />,
    color: "from-emerald-400 to-cyan-500"
  },
];

const CardStack = ({ service, index, total }: { service: any, index: number, total: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position exclusively for this card's segment in the viewport
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"]
  });
  
  // When the card above it scrolls down, this current card will push back in 3D space
  const scrollYLeaveProgress = useScroll({
    target: cardRef,
    offset: ["start start", "end start"]
  }).scrollYProgress;

  // 3D Math Logic
  const scale = useTransform(scrollYLeaveProgress, [0, 1], [1, 0.9 - (index * 0.05)]);
  const opacity = useTransform(scrollYLeaveProgress, [0, 1], [1, 0.3]);
  const yOffset = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [20, 0]);
  
  return (
    <motion.div
      ref={cardRef}
      style={{
        scale,
        opacity,
        y: yOffset,
        rotateX,
        top: `calc(15vh + ${index * 30}px)`, 
        transformOrigin: "top center",
      }}
      className="sticky w-full origin-top"
    >
      <div className="w-full max-w-5xl mx-auto min-h-[40vh] bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl border-t border-x border-slate-200 dark:border-slate-800 rounded-t-[3rem] shadow-2xl p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
         
         {/* Sub-Card Glow Accent */}
         <div className={`absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br ${service.color} blur-[120px] opacity-20 pointer-events-none rounded-full`} />

         <div className="flex-1 order-2 md:order-1 relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xl font-black text-slate-300 dark:text-slate-700">0{index + 1}</span>
              <div className="w-12 h-1 bg-accent-light rounded-full" />
            </div>
            <h3 className="text-4xl md:text-5xl font-black mb-6 text-slate-800 dark:text-white tracking-tight leading-[1.1]">
              {service.title}
            </h3>
            <p className="text-xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-2xl">
              {service.description}
            </p>
         </div>

         <div className="order-1 md:order-2 w-40 h-40 md:w-64 md:h-64 flex-shrink-0 flex items-center justify-center relative z-10">
            <div className="absolute inset-0 bg-white/10 dark:bg-slate-800/20 backdrop-blur-xl rounded-full shadow-2xl flex items-center justify-center border-4 border-white/40 dark:border-white/10 transform transition-transform duration-700 hover:rotate-12 hover:scale-105">
               {React.cloneElement(service.icon, { className: "w-16 h-16 md:w-28 md:h-28 text-slate-800 dark:text-slate-100 stroke-[1.5px]" })}
               <div className={`absolute inset-0 bg-gradient-to-br ${service.color} mix-blend-overlay opacity-30 rounded-full pointer-events-none`} />
            </div>
         </div>
         
      </div>
    </motion.div>
  );
};

export function Services() {
  return (
    <section className="py-32 w-full relative overflow-hidden transition-colors duration-500">
      
      {/* Background Ambience */}
      <div className="absolute top-[20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-accent-dark blur-[150px] opacity-[0.1] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-200 blur-[150px] opacity-[0.12] mix-blend-screen pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-20">
        <FadeIn>
          <div className="flex flex-col items-center justify-center text-center mb-24 pt-8">
            <div className="inline-flex items-center rounded-full border border-accent-light/30 bg-white/50 dark:bg-slate-800/50 px-3 py-1 text-sm font-medium text-accent-dark dark:text-accent-light mb-8 glass">
              ⚡ OUR ARSENAL
            </div>
            <div className="bg-white/10 dark:bg-slate-900/40 backdrop-blur-3xl border border-white/20 dark:border-white/5 p-10 md:p-14 rounded-[3rem] shadow-2xl max-w-3xl">
               <h2 className="text-5xl md:text-7xl font-black text-slate-800 dark:text-white tracking-tighter leading-[1.1]">
                 Engineered <br/> Solutions.
               </h2>
            </div>
          </div>
        </FadeIn>
      </div>

      <div className="relative w-full pb-[20vh] px-4 md:px-10" style={{ perspective: "1500px" }}>
        {services.map((svc, idx) => (
           <CardStack key={idx} service={svc} index={idx} total={services.length} />
        ))}
      </div>

    </section>
  );
}
