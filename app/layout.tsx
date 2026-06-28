import type { Metadata, Viewport } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/ui/Navbar";
import { FirstVisitPopup } from "@/components/ui/FirstVisitPopup";
import Script from "next/script";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tritechies.com";
const cleanSiteUrl = SITE_URL.endsWith("/") ? SITE_URL.slice(0, -1) : SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(cleanSiteUrl),
  title: {
    default: "triTechies | We build for results",
    template: "%s | triTechies",
  },
  description: "We solve real business problems with custom digital systems, dynamic web applications, mobile apps, and beautiful websites built for measurable results.",
  keywords: [
    "triTechies",
    "software engineering",
    "web development agency",
    "mobile app development",
    "custom software",
    "business systems automation",
    "premium digital products",
    "next.js developer",
  ],
  manifest: "/manifest.json",
  alternates: {
    canonical: "./",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "triTechies",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "./",
    title: "triTechies | We build for results",
    description: "We solve real business problems with custom digital systems, dynamic web applications, mobile apps, and beautiful websites built for measurable results.",
    siteName: "triTechies",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 1200,
        alt: "triTechies - We build for results",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "triTechies | We build for results",
    description: "We solve real business problems with custom digital systems, dynamic web applications, mobile apps, and beautiful websites built for measurable results.",
    images: ["/og-image.png"],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  themeColor: "#101010",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark", "font-sans", geist.variable)} suppressHydrationWarning>
      <body className={cn(inter.variable, "antialiased overflow-x-hidden flex flex-col min-h-screen bg-obsidian-canvas text-frost-text font-aeonik")}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <FirstVisitPopup />
        <Script 
          src="https://app.ashna.ai/embed/agent-widget.js" 
          data-agent-id="6a0382db667fcb04605f22d7" 
          data-token="eyJhbGciOiJIUzI1NiJ9.eyJhZ2VudElkIjoiNmEwMzgyZGI2NjdmY2IwNDYwNWYyMmQ3IiwidXNlcklkIjoiNjdkMDdkOWJkNzAxN2MyZWJlODRhOTZjIiwiYWxsb3dlZE9yaWdpbnMiOlsidHJpdGVjaGllcy52ZXJjZWwuYXBwIl0sIm9yaWdpbkRvbWFpbiI6InRyaXRlY2hpZXMudmVyY2VsLmFwcCIsImFzc2lnbmVkT3JnSWQiOiIiLCJpYXQiOjE3Nzg2MTUwODYsImlzcyI6ImFzaG5hQUkiLCJhdWQiOiJhc2huYUFJIiwic3ViIjoiNmEwMzgyZGI2NjdmY2IwNDYwNWYyMmQ3In0.IHZlWnN1GAihhxlXfNfHuPc9D1sJlIOSKmZFIAldncs" 
          data-icon-color="#101010" 
          data-icon-shape="circle" 
          data-icon-style="message-circle" 
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
