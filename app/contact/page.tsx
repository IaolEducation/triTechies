import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact Us | Consultations & Technical Project Inquiries",
  description: "Get in touch with triTechies to discuss your technical problems, get project estimates, and schedule a consultation to build systems that produce real results.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Contact />
    </div>
  );
}
