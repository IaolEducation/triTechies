"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";

interface LiveProjectCardProps {
  title: string;
  description: string;
  url: string;
  tags: string[];
  imageUrl?: string;
}

export function LiveProjectCard({ title, description, url, tags, imageUrl }: LiveProjectCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const normalizedUrl = useMemo(() => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `https://${url}`;
  }, [url]);

  const host = useMemo(() => {
    try {
      return new URL(normalizedUrl).host;
    } catch {
      return url;
    }
  }, [normalizedUrl, url]);

  const canPreview = Boolean(normalizedUrl);

  return (
    <>
      <div className="group flex h-full flex-col border border-onyx-edge bg-obsidian-canvas transition-colors duration-300 hover:bg-charcoal-surface/20">
        {/* Project image (lazy <img>, no live iframe → no load flicker) */}
        <div className="relative h-64 w-full overflow-hidden border-b border-onyx-edge bg-charcoal-surface/30">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              loading="lazy"
              className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
            />
          ) : canPreview ? (
            <iframe
              src={normalizedUrl}
              title={`${title} website preview`}
              loading="lazy"
              referrerPolicy="no-referrer"
              tabIndex={-1}
              className="pointer-events-none h-[1000px] w-[1280px] origin-top-left scale-[0.34] border-0 bg-charcoal-surface"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center px-4 text-center text-[26px] font-aeonik font-normal tracking-[-0.011em] text-graphite/40">
              {title}
            </div>
          )}
          <div className="absolute inset-x-0 top-0 flex items-center gap-3 border-b border-onyx-edge bg-obsidian-canvas/85 px-4 py-2 backdrop-blur-sm">
            <div className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-graphite" />
              <span className="h-2 w-2 rounded-full bg-graphite" />
              <span className="h-2 w-2 rounded-full bg-graphite" />
            </div>
            <span className="flex-1 truncate font-input text-[11px] tracking-[-0.037em] text-fog">
              {host}
            </span>
            <a
              href={normalizedUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${title}`}
              className="text-smoke transition-colors group-hover:text-amber-whisper"
            >
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-7">
          <h3 className="mb-2 text-[18px] font-aeonik font-normal tracking-[-0.011em] text-frost-text">
            {title}
          </h3>
          <p className="mb-5 text-[14px] font-aeonik font-normal leading-[1.43] text-smoke line-clamp-3">
            {description}
          </p>

          {tags?.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className="font-input text-[11px] tracking-[-0.022em] text-silver border border-onyx-edge px-2 py-0.5"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className="mt-auto flex items-center gap-3">
            <a
              href={normalizedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-pure-white px-4 py-2 text-[13px] font-aeonik font-bold uppercase tracking-[-0.011em] text-obsidian-canvas transition-opacity hover:opacity-90"
            >
              Visit Site
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={() => setShowDetails(true)}
              className="border border-onyx-edge px-4 py-2 text-[13px] font-aeonik font-bold uppercase tracking-[-0.011em] text-frost-text transition-colors hover:bg-charcoal-surface/50"
            >
              Details
            </button>
          </div>
        </div>
      </div>

      {showDetails && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-surface-void/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl overflow-hidden border border-onyx-edge bg-obsidian-canvas">
            <button
              type="button"
              onClick={() => setShowDetails(false)}
              aria-label="Close details"
              className="absolute right-4 top-4 z-20 p-2 text-smoke transition-colors hover:text-frost-text"
            >
              <X className="h-5 w-5" />
            </button>
            {/* Iframe loads only on open — not on the listing grid */}
            <div className="relative h-72 w-full">
              {canPreview ? (
                <iframe
                  src={normalizedUrl}
                  title={`${title} website preview`}
                  className="h-full w-full border-0 bg-charcoal-surface"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-charcoal-surface text-[34px] font-aeonik font-normal text-graphite">
                  {title}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-canvas via-transparent to-transparent" />
            </div>
            <div className="space-y-4 p-6">
              <h3 className="text-[23px] font-aeonik font-normal tracking-[-0.011em] text-frost-text">
                {title}
              </h3>
              <p className="text-[14px] font-aeonik font-normal leading-[1.43] text-smoke">
                {description}
              </p>
              <a
                href={normalizedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-pure-white px-4 py-2 text-[13px] font-aeonik font-bold uppercase tracking-[-0.011em] text-obsidian-canvas transition-opacity hover:opacity-90"
              >
                Visit Website
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
