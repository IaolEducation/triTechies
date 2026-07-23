import type { Metadata } from "next";
import { About } from "@/components/sections/About";
import { Approach } from "@/components/sections/Approach";
import { Team } from "@/components/sections/Team";

export const metadata: Metadata = {
  title: "About Us | Our Story & Tech Delivery Team",
  description: "Learn about the triTechies (tri techies) story, our client-focused development approach, and our high-performing team of engineers and designers who build for results.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-full bg-obsidian-canvas">
      <About />
      <Approach />
      <Team />
    </div>
  );
}
