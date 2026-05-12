import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/ui/Navbar";
import { FirstVisitPopup } from "@/components/ui/FirstVisitPopup";
import Script from "next/script";

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
        <Script 
          src="https://app.ashna.ai/embed/agent-widget.js" 
          data-agent-id="6a0382db667fcb04605f22d7" 
          data-token="eyJhbGciOiJIUzI1NiJ9.eyJhZ2VudElkIjoiNmEwMzgyZGI2NjdmY2IwNDYwNWYyMmQ3IiwidXNlcklkIjoiNjdkMDdkOWJkNzAxN2MyZWJlODRhOTZjIiwiYWxsb3dlZE9yaWdpbnMiOlsidHJpdGVjaGllcy52ZXJjZWwuYXBwIl0sIm9yaWdpbkRvbWFpbiI6InRyaXRlY2hpZXMudmVyY2VsLmFwcCIsImFzc2lnbmVkT3JnSWQiOiIiLCJpYXQiOjE3Nzg2MTUwODYsImlzcyI6ImFzaG5hQUkiLCJhdWQiOiJhc2huYUFJIiwic3ViIjoiNmEwMzgyZGI2NjdmY2IwNDYwNWYyMmQ3In0.IHZlWnN1GAihhxlXfNfHuPc9D1sJlIOSKmZFIAldncs" 
          data-icon-color="#0b0740" 
          data-icon-shape="circle" 
          data-icon-style="message-circle" 
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
