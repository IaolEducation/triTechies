"use client";

import { useEffect, useState } from "react";
import { FadeIn } from "@/components/animations/FadeIn";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { X } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  description?: string;
  imageUrl: string;
}

export function Team() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    async function loadTeam() {
      try {
        const q = query(collection(db, "team"), orderBy("createdAt", "asc"));
        const snapshot = await getDocs(q);
        const fetchedTeam = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as TeamMember[];
        
        if (fetchedTeam.length > 0) {
          setTeam(fetchedTeam);
        } else {
          setTeam([
            { id: "1", name: "Talib", role: "Founder & Lead Developer", imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Talib" },
            { id: "2", name: "Sarah", role: "UI/UX Lead", imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" }
          ]);
        }
      } catch (e) {
        setTeam([
          { id: "1", name: "Talib", role: "Founder & Lead Developer", imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Talib" },
          { id: "2", name: "Sarah", role: "UI/UX Lead", imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" }
        ]);
      }
    }
    loadTeam();
  }, []);

  return (
    <section className="py-24 px-6 w-full relative transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white transition-colors">The Team Behind the Systems</h2>
          </div>
        </FadeIn>

        <div className="flex justify-start md:justify-center overflow-x-auto gap-4 md:gap-8 pb-10 md:pb-12 pt-2 md:pt-4 snap-x snap-mandatory scroll-smooth w-full scrollbar-hide -mx-6 px-4 md:px-10">
          {team.map((member, index) => (
            <FadeIn key={member.id} delay={index * 0.1} direction={index % 2 === 0 ? "left" : "right"} className="flex-none w-[calc(100vw-4.5rem)] max-w-[20rem] md:w-[22rem] md:max-w-[22rem] snap-center">
              <button
                type="button"
                onClick={() => setSelectedMember(member)}
                className="relative overflow-hidden flex flex-col items-center rounded-3xl p-6 md:p-8 h-full border border-white/10 bg-[#05070f]/95 shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition-all duration-300 hover:shadow-[0_28px_75px_rgba(0,0,0,0.58)] hover:-translate-y-2 group w-full text-left"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_80%,rgba(139,92,246,0.15),transparent_35%),radial-gradient(circle_at_24%_20%,rgba(59,130,246,0.14),transparent_35%)]" />

                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-5 md:mb-6 border border-white/20 shadow-lg transform group-hover:scale-105 transition-transform duration-300 relative z-10">
                  <img 
                    src={member.imageUrl} 
                    alt={member.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <h3 className="relative z-10 text-xl md:text-2xl font-black text-white transition-colors text-center mb-1">{member.name}</h3>
                <p className="relative z-10 text-accent-light text-xs md:text-sm font-bold tracking-[0.14em] uppercase mb-3 md:mb-4 transition-colors text-center">{member.role}</p>
                {member.description && (
                  <p className="relative z-10 text-sm md:text-[15px] text-slate-300/95 text-center leading-relaxed line-clamp-4 max-w-[28ch] mx-auto">
                    {member.description}
                  </p>
                )}
              </button>
            </FadeIn>
          ))}
        </div>
      </div>

      {selectedMember && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#05070f]/95 p-6 md:p-8 shadow-[0_30px_80px_rgba(0,0,0,0.65)]">
            <button
              type="button"
              onClick={() => setSelectedMember(null)}
              aria-label="Close member details"
              className="absolute right-4 top-4 rounded-full p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_78%_80%,rgba(139,92,246,0.16),transparent_35%),radial-gradient(circle_at_24%_20%,rgba(59,130,246,0.15),transparent_35%)]" />

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-28 h-28 rounded-full overflow-hidden mb-5 border border-white/20 shadow-lg">
                <img src={selectedMember.imageUrl} alt={selectedMember.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-black text-white mb-1">{selectedMember.name}</h3>
              <p className="text-accent-light text-xs font-bold tracking-[0.14em] uppercase mb-5">{selectedMember.role}</p>
              <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                {selectedMember.description || "Core member of the triTechies delivery team."}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
