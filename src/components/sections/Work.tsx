"use client";

import { useEffect, useState } from "react";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LiveProjectCard } from "@/components/ui/LiveProjectCard";
import { ArrowRight } from "lucide-react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  tags: string[];
  imageUrl?: string;
}

export function Work({ limit = 6 }: { limit?: number | null }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const fetchedProjects = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Project[];
        
        if (fetchedProjects.length > 0) {
          setProjects(fetchedProjects);
        } else {
          setProjects([
            {
              id: "1",
              title: "Banuhashim Management",
              description: "Replaced manual attendance and fines with automated tracking and enforcement system.",
              url: "https://banuhashim.vercel.app",
              tags: ["Next.js", "PWA", "Firebase"]
            },
            {
              id: "2",
              title: "Next.js E-Commerce",
              description: "Built high-performance digital storefronts that increased business credibility and sales.",
              url: "https://nextjs.org",
              tags: ["E-Commerce", "Stripe"]
            }
          ]);
        }
      } catch {
        console.error("Firebase not configured or no connection, using fallback.");
        setProjects([
          {
            id: "1",
            title: "Banuhashim Management",
            description: "Replaced manual attendance and fines with automated tracking and enforcement system.",
            url: "https://banuhashim.vercel.app",
            tags: ["Next.js", "PWA", "Firebase"]
          },
          {
            id: "2",
            title: "Modern Landing Page",
            description: "Dynamic landing page with sleek animations and scroll effects.",
            url: "https://vitejs.dev",
            tags: ["React", "Framer Motion"]
          }
        ]);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  return (
    <section className="py-[5rem] px-6 w-full bg-obsidian-canvas">
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader
          label="PORTFOLIO"
          title="Work that replaced the manual way"
          subtitle="Live systems we shipped — in production, solving real operational pain."
        />

        {loading ? (
          <div className="flex justify-center items-center h-64 mt-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-silver"></div>
          </div>
        ) : (
          <div className="w-full mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProjects.map((project, index) => (
                <FadeIn key={project.id} delay={0.1 * index} direction="up">
                  <div className="h-full">
                    <LiveProjectCard
                      title={project.title}
                      description={project.description}
                      url={project.url}
                      tags={project.tags || []}
                      imageUrl={project.imageUrl}
                    />
                  </div>
                </FadeIn>
              ))}
            </div>
            
            {limit && projects.length > limit && (
              <div className="mt-16 text-center">
                <a
                  href="/work"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 border border-silver bg-transparent text-frost-text text-[14px] font-aeonik font-bold uppercase tracking-[-0.011em] hover:bg-white/5 transition-colors"
                >
                  <span>VIEW ALL PROJECTS</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
