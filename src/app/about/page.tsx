import { About } from "@/components/sections/About";
import { Approach } from "@/components/sections/Approach";
import { Team } from "@/components/sections/Team";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <About />
      <Approach />
      <Team />
    </div>
  );
}
