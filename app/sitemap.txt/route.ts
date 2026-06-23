import { NextResponse } from "next/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tritechies.com";
const cleanSiteUrl = SITE_URL.endsWith("/") ? SITE_URL.slice(0, -1) : SITE_URL;

const STATIC_ROUTES = [
  "",
  "/services",
  "/work",
  "/about",
  "/contact",
];

export async function GET() {
  const content = STATIC_ROUTES.map((path) => `${cleanSiteUrl}${path}`).join("\n");
  
  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200",
    },
  });
}
