"use client";

import { useEffect, useState } from "react";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
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
      } catch {
        setTeam([
          { id: "1", name: "Talib", role: "Founder & Lead Developer", imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Talib" },
          { id: "2", name: "Sarah", role: "UI/UX Lead", imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" }
        ]);
      }
    }
    loadTeam();
  }, []);

  return (
    <section className="py-[5rem] px-6 w-full bg-obsidian-canvas">
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader
          label="TEAM"
          title="The people who build it"
          subtitle="A small, senior team — the people who scope your problem also ship the fix."
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-onyx-edge">
          {team.map((member, index) => (
            <FadeIn key={member.id} delay={index * 0.08}>
              <button
                type="button"
                onClick={() => setSelectedMember(member)}
                className="group flex flex-col p-8 h-full w-full text-left border-b border-r border-onyx-edge transition-colors hover:bg-[#161616]"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-[18px] font-aeonik font-normal text-frost-text tracking-[-0.011em] mb-1">
                      {member.name}
                    </h3>
                    <p className="text-[13px] font-input font-normal text-amber-whisper tracking-[-0.037em] uppercase">
                      {member.role}
                    </p>
                  </div>
                  <div className="h-24 w-24 sm:h-28 sm:w-28 lg:h-32 lg:w-32 shrink-0 overflow-hidden rounded-full border border-onyx-edge bg-charcoal-surface shadow-lg shadow-black/40">
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="h-full w-full object-cover grayscale"
                    />
                  </div>
                </div>
                {member.description && (
                  <p className="text-[14px] font-aeonik font-normal text-smoke leading-[1.43] line-clamp-3">
                    {member.description}
                  </p>
                )}
                <span className="mt-auto pt-5 font-input text-[12px] uppercase tracking-[-0.022em] text-graphite transition-colors group-hover:text-frost-text">
                  View profile →
                </span>
              </button>
            </FadeIn>
          ))}
        </div>
      </div>

      {selectedMember && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-surface-void/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md border border-onyx-edge bg-obsidian-canvas p-8">
            <button
              type="button"
              onClick={() => setSelectedMember(null)}
              aria-label="Close member details"
              className="absolute right-4 top-4 p-2 text-smoke transition-colors hover:text-frost-text"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-28 h-28 rounded-full overflow-hidden mb-5 border border-onyx-edge">
                <img src={selectedMember.imageUrl} alt={selectedMember.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-[23px] font-aeonik font-normal text-frost-text tracking-[-0.011em] mb-1">
                {selectedMember.name}
              </h3>
              <p className="text-[13px] font-input font-normal text-amber-whisper tracking-[-0.037em] uppercase mb-5">
                {selectedMember.role}
              </p>
              <p className="text-[16px] font-aeonik font-normal text-smoke leading-[1.5]">
                {selectedMember.description || "Core member of the triTechies delivery team."}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
