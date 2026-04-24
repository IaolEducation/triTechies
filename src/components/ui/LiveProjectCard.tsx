"use client";

import { ExternalLink, MousePointerClick } from "lucide-react";

interface LiveProjectCardProps {
  title: string;
  description: string;
  url: string;
  tags: string[];
  imageUrl?: string;
}

export function LiveProjectCard({ title, description, url, tags, imageUrl }: LiveProjectCardProps) {
  return (
    <div className="group flex flex-col bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative h-full w-full cursor-pointer">
      <div className="relative w-full h-[250px] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 overflow-hidden border-b border-slate-100/10 flex flex-col justify-between p-6">
        <div className="w-full bg-slate-800/80 dark:bg-slate-950/80 flex items-center px-4 py-2 rounded-xl backdrop-blur-md relative z-20 shadow-lg">
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-red-400"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
          </div>
          <div className="ml-4 text-[10px] font-mono text-white/50 opacity-60 group-hover:opacity-100 transition-opacity flex-1 truncate">
            {url}
          </div>
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-105 pointer-events-none">
           {imageUrl ? (
             <img src={imageUrl} alt={title} className="absolute inset-0 w-full h-full object-cover" />
           ) : (
             <div className="text-4xl font-black text-slate-300 dark:text-slate-700 tracking-tighter text-center">
               {title}
             </div>
           )}
        </div>
        
        <div className="absolute inset-0 z-30 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        
        <a href={url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-40 pointer-events-auto flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300 bg-white dark:bg-slate-800/90 backdrop-blur-md px-6 py-3 rounded-full text-accent-dark dark:text-accent-light font-bold shadow-2xl flex items-center gap-2 border border-slate-200 dark:border-slate-600/50">
                <MousePointerClick className="w-5 h-5" /> Visit Site
            </div>
        </a>
      </div>

      <div className="p-8 flex flex-col flex-1 bg-white dark:bg-slate-900 relative z-50">
        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">{title}</h3>
        <p className="text-slate-600 dark:text-slate-300 font-medium mb-6 flex-1 text-sm md:text-base leading-relaxed">{description}</p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((tag, i) => (
             <span key={i} className="px-3 py-1 bg-brand-50 dark:bg-slate-800 text-accent-dark dark:text-accent-light text-xs font-bold rounded-md border border-brand-100 dark:border-slate-700 shadow-sm transition-colors">
                {tag}
             </span>
          ))}
        </div>
      </div>
    </div>
  );
}

