import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  
  // If the host is exactly "tritechies.com", redirect to "www.tritechies.com"
  if (host === "tritechies.com") {
    const url = request.nextUrl.clone();
    url.hostname = "www.tritechies.com";
    url.port = ""; // Clear port if any, just to be clean
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

// Only match page routes, bypass static assets and API paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - manifest.json (manifest file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|manifest.json|icon-192.png|icon-512.png|og-image.png|apple-icon.png|icon.png).*)",
  ],
};
