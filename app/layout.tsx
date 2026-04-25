import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/ui/Navbar";
import { FirstVisitPopup } from "@/components/ui/FirstVisitPopup";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "triTechies | We build for results",
  description: "We solve real business problems. Custom systems, web apps, mobile apps, and beautiful websites.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "triTechies",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1120",
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
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={cn(inter.variable, "antialiased overflow-x-hidden flex flex-col min-h-screen bg-background text-foreground")}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <FirstVisitPopup />
      </body>
    </html>
  );
}
