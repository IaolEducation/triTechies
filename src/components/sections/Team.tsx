"use client";

import { useEffect, useState } from "react";
import { FadeIn } from "@/components/animations/FadeIn";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  description?: string;
  imageUrl: string;
}

export function Team() {
  const [team, setTeam] = useState<TeamMember[]>([]);

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
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground-primary dark:text-white transition-colors">The Team Behind the Systems</h2>
          </div>
        </FadeIn>

        <div className="flex overflow-x-auto gap-8 pb-12 pt-4 snap-x snap-mandatory scroll-smooth w-full scrollbar-hide -mx-6 px-6">
          {team.map((member, index) => (
            <FadeIn key={member.id} delay={index * 0.1} direction={index % 2 === 0 ? "left" : "right"} className="flex-none w-[22rem] snap-center">
              <div className="flex flex-col items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-slate-50 dark:border-slate-800 shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                  <img 
                    src={member.imageUrl} 
                    alt={member.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <h3 className="text-2xl font-black text-slate-800 dark:text-white transition-colors text-center mb-1">{member.name}</h3>
                <p className="text-accent-dark dark:text-accent-light text-sm font-bold tracking-widest uppercase mb-4 transition-colors text-center">{member.role}</p>
                {member.description && (
                  <p className="text-sm text-slate-600 dark:text-slate-400 text-center leading-relaxed">
                    {member.description}
                  </p>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
