import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tritechies.com";
const cleanSiteUrl = SITE_URL.endsWith("/") ? SITE_URL.slice(0, -1) : SITE_URL;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admintriTechies2026", "/admintriTechies2026/"],
    },
    sitemap: `${cleanSiteUrl}/sitemap.xml`,
  };
}
