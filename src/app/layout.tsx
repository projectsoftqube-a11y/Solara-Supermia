import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Montserrat } from "next/font/google";
import type { ReactNode } from "react";

import { RouteFloatingBots } from "@/components/RouteFloatingBots";
import { JsonLd } from "@/components/seo/JsonLd";
import { baseOpenGraph, baseTwitter } from "@/lib/metadata";
import { siteGraph } from "@/lib/seo/schema";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_NAME, SITE_URL } from "@/lib/site";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter-family",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono-family",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-montserrat-family",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  // Explicitly allow full-size snippets, image previews and video previews:
  // answer engines and rich results can only quote what they are allowed to.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: baseOpenGraph,
  twitter: baseTwitter,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#FAF8F4",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetBrainsMono.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      {/* suppressHydrationWarning: browser extensions (ColorZilla, Grammarly, etc.)
          inject attributes like cz-shortcut-listen onto <body> before React
          hydrates, which would otherwise log a hydration-mismatch warning.
          This only suppresses attribute diffs on <body> itself, not its content. */}
      <body suppressHydrationWarning>
        {/* Site-wide entities; every page's own graph references these by @id. */}
        <JsonLd nodes={siteGraph()} />
        {children}
        <RouteFloatingBots />
      </body>
    </html>
  );
}
