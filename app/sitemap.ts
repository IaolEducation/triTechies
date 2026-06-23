import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tritechies.com";
const cleanSiteUrl = SITE_URL.endsWith("/") ? SITE_URL.slice(0, -1) : SITE_URL;

const STATIC_ROUTES = [
  { path: "", changeFrequency: "weekly" as const, priority: 1.0 },
  { path: "/services", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/work", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/about", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly" as const, priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return STATIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${cleanSiteUrl}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
