import type { Metadata } from "next";
import { Work } from "@/components/sections/Work";

export const metadata: Metadata = {
  title: "Our Work | Custom Software Case Studies & Portfolios",
  description: "Browse the triTechies portfolio of custom software systems, e-commerce platforms, attendance automation tools, and mobile apps built for real business impact.",
  alternates: {
    canonical: "/work",
  },
};

export default function WorkPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20">
      <Work limit={null} />
    </div>
  );
}
