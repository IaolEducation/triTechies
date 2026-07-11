import type { Metadata } from "next";
import { Services } from "@/components/sections/Services";
import { Automation } from "@/components/sections/Automation";

export const metadata: Metadata = {
  title: "Services | Custom Web, Mobile & Business Automation Systems",
  description: "Explore our range of engineering services, including custom software systems, scalable web apps, mobile apps, design systems, and business process automation built for results.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Services />
      <Automation />
    </div>
  );
}
