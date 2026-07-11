import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Automation } from "@/components/sections/Automation";
import { Work } from "@/components/sections/Work";
import { Approach } from "@/components/sections/Approach";
import { Team } from "@/components/sections/Team";
import { Footer } from "@/components/ui/Footer";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Software & Web App Development Studio",
  description: "triTechies is a software engineering and development studio building result-driven custom platforms, web applications, mobile apps, and robust business systems.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen w-full bg-obsidian-canvas">
      <Hero />
      <Services />
      <Automation />
      <Work />
      <Approach />
      <Team />
      <div className="w-full mt-auto">
        <Footer />
      </div>
    </div>
  );
}
