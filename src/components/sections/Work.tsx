"use client";

import { useEffect, useState } from "react";
import { FadeIn } from "@/components/animations/FadeIn";
import { LiveProjectCard } from "@/components/ui/LiveProjectCard";
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
          // Fallback static data if Firebase is empty/unconfigured
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
      } catch (e) {
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
    <section className="py-24 px-6 w-full relative overflow-hidden transition-colors duration-500">
      <div className="absolute bottom-[-20%] left-[-20%] w-[50vw] h-[50vw] rounded-full bg-accent-light blur-3xl opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full border border-accent-light/30 bg-white/50 dark:bg-slate-800/50 px-3 py-1 text-sm font-medium text-accent-dark dark:text-accent-light mb-4 glass">
              💼 OUR WORK
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground-primary dark:text-white">
              We don’t just deliver projects. <br/>
              <span className="text-gradient">We remove problems.</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-medium">
              👉 Real results. Real impact.
            </p>
          </div>
        </FadeIn>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-dark"></div>
          </div>
        ) : (
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {displayedProjects.map((project, index) => (
                <FadeIn key={project.id} delay={0.1 * index} direction="up" className="h-[450px]">
                  <LiveProjectCard 
                    title={project.title}
                    description={project.description}
                    url={project.url}
                    tags={project.tags || []}
                    imageUrl={project.imageUrl}
                  />
                </FadeIn>
              ))}
            </div>
            
            {limit && projects.length > limit && (
              <div className="mt-16 text-center">
                <a href="/work" className="inline-flex items-center gap-3 px-8 py-4 bg-accent-dark text-white font-bold rounded-full transition-all group hover:bg-white hover:text-accent-dark hover:scale-105 shadow-xl">
                  View All Projects <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
