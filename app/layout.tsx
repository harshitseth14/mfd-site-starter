import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Instrument_Sans, Libre_Caslon_Text } from "next/font/google";

import { Motion } from "@/components/motion";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";
import { jsonLdScript, organizationJsonLd } from "@/lib/structured-data";

import "./globals.css";

const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Libre_Caslon_Text({ subsets: ["latin"], weight: ["400"], style: ["normal", "italic"], variable: "--font-serif", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  // The homepage title and description say what we are before anything else: a Mutual Fund Distributor.
  title: { default: `${site.name} · Mutual Fund Distributor, insurance and loans in ${site.city}`, template: `%s · ${site.name}` },
  description: site.summary,
  metadataBase: new URL(`https://${site.domain}`),
  openGraph: { type: "website", locale: "en_IN", siteName: site.name },
  // Search engines are welcome (app/robots.ts, app/sitemap.ts).
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#f1ebe0" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${sans.variable} ${serif.variable} ${mono.variable}`} data-scroll-behavior="smooth">
      <body>
        <a className="skip" href="#main">
          Skip to the content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <Motion />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(organizationJsonLd()) }} />
      </body>
    </html>
  );
}
