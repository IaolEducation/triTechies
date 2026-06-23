import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
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
    <div className="relative flex flex-col min-h-screen items-center justify-center w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.16),transparent_32%),radial-gradient(circle_at_30%_22%,rgba(59,130,246,0.14),transparent_34%)]" />
      <Hero />
      <Services />
      <Work />
      <Approach />
      <Team />
      <div className="w-full mt-auto">
        <Footer />
      </div>
    </div>
  );
}
