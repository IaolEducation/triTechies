import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { Approach } from "@/components/sections/Approach";
import { Team } from "@/components/sections/Team";
import { Footer } from "@/components/ui/Footer";

export const metadata = {
  title: "triTechies | Home",
  description: "We build for results.",
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center w-full overflow-hidden">
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
