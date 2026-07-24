"use client";

import { useEffect, useState } from "react";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { X } from "lucide-react";

function IconLinkedin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
    </svg>
  );
}

function IconGithub(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
    </svg>
  );
}

function IconTwitter(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function IconInstagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function IconFacebook(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  description?: string;
  imageUrl: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
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

  const hasSocials = (m: TeamMember) => Boolean(m.linkedin || m.github || m.twitter || m.instagram || m.facebook);

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
              <div className="group flex flex-col p-6 sm:p-8 h-full w-full text-left border-b border-r border-onyx-edge transition-colors hover:bg-[#161616] relative">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-[18px] font-aeonik font-normal text-frost-text tracking-[-0.011em] mb-1">
                      {member.name}
                    </h3>
                    <p className="text-[13px] font-input font-normal text-amber-whisper tracking-[-0.037em] uppercase mb-2">
                      {member.role}
                    </p>

                    {/* Social Media Icons directly under Role */}
                    {hasSocials(member) && (
                      <div className="flex items-center gap-3 mt-2.5 mb-1.5">
                        {member.linkedin && (
                          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-graphite hover:text-amber-whisper transition-colors" title="LinkedIn">
                            <IconLinkedin style={{ width: 20, height: 20, minWidth: 20 }} />
                          </a>
                        )}
                        {member.github && (
                          <a href={member.github} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-graphite hover:text-amber-whisper transition-colors" title="GitHub">
                            <IconGithub style={{ width: 20, height: 20, minWidth: 20 }} />
                          </a>
                        )}
                        {member.twitter && (
                          <a href={member.twitter} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-graphite hover:text-amber-whisper transition-colors" title="X / Twitter">
                            <IconTwitter style={{ width: 20, height: 20, minWidth: 20 }} />
                          </a>
                        )}
                        {member.instagram && (
                          <a href={member.instagram} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-graphite hover:text-amber-whisper transition-colors" title="Instagram">
                            <IconInstagram style={{ width: 20, height: 20, minWidth: 20 }} />
                          </a>
                        )}
                        {member.facebook && (
                          <a href={member.facebook} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-graphite hover:text-amber-whisper transition-colors" title="Facebook">
                            <IconFacebook style={{ width: 20, height: 20, minWidth: 20 }} />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="h-28 w-28 sm:h-28 sm:w-28 lg:h-32 lg:w-32 shrink-0 overflow-hidden rounded-full border border-onyx-edge bg-charcoal-surface shadow-lg shadow-black/40">
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                </div>
                {member.description && (
                  <p className="text-[14px] font-aeonik font-normal text-smoke leading-[1.43] line-clamp-3 mb-4">
                    {member.description}
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => setSelectedMember(member)}
                  className="mt-auto pt-3 font-input text-[12px] uppercase tracking-[-0.022em] text-graphite transition-colors hover:text-frost-text flex items-center justify-between w-full"
                >
                  <span>View profile →</span>
                </button>
              </div>
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
              <p className="text-[13px] font-input font-normal text-amber-whisper tracking-[-0.037em] uppercase mb-4">
                {selectedMember.role}
              </p>
              <p className="text-[15px] font-aeonik font-normal text-smoke leading-[1.5] mb-6">
                {selectedMember.description || "Core member of the triTechies delivery team."}
              </p>

              {/* Social links inside detail modal */}
              {hasSocials(selectedMember) && (
                <div className="flex items-center justify-center gap-4 pt-4 border-t border-onyx-edge w-full">
                  {selectedMember.linkedin && (
                    <a href={selectedMember.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-[#161616] border border-onyx-edge text-slate-300 hover:text-amber-whisper hover:border-amber-whisper transition-colors" title="LinkedIn">
                      <IconLinkedin style={{ width: 18, height: 18, minWidth: 18 }} />
                    </a>
                  )}
                  {selectedMember.github && (
                    <a href={selectedMember.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-[#161616] border border-onyx-edge text-slate-300 hover:text-amber-whisper hover:border-amber-whisper transition-colors" title="GitHub">
                      <IconGithub style={{ width: 18, height: 18, minWidth: 18 }} />
                    </a>
                  )}
                  {selectedMember.twitter && (
                    <a href={selectedMember.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-[#161616] border border-onyx-edge text-slate-300 hover:text-amber-whisper hover:border-amber-whisper transition-colors" title="X / Twitter">
                      <IconTwitter style={{ width: 18, height: 18, minWidth: 18 }} />
                    </a>
                  )}
                  {selectedMember.instagram && (
                    <a href={selectedMember.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-[#161616] border border-onyx-edge text-slate-300 hover:text-amber-whisper hover:border-amber-whisper transition-colors" title="Instagram">
                      <IconInstagram style={{ width: 18, height: 18, minWidth: 18 }} />
                    </a>
                  )}
                  {selectedMember.facebook && (
                    <a href={selectedMember.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-[#161616] border border-onyx-edge text-slate-300 hover:text-amber-whisper hover:border-amber-whisper transition-colors" title="Facebook">
                      <IconFacebook style={{ width: 18, height: 18, minWidth: 18 }} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

