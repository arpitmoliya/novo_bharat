import type { Metadata } from "next";
import {
  IBM_Plex_Mono,
  Inter,
  Manrope,
  Playfair_Display,
} from "next/font/google";
import Script from "next/script";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { buildMetadata, fetchSeo } from "@/lib/seo";
import "./globals.css";

// Brief §1.2 typography. Exposed as CSS variables consumed by globals.css.
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
// Display face for the Figma home rebuild. Stand-in for the commercial
// "Stack Sans Text" used in the design (not available on Google Fonts).
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

// Site-wide default metadata, pulled from the admin-managed SEO config.
// Individual pages override title/description/canonical via their own
// generateMetadata(); anything they omit falls back to these defaults.
export async function generateMetadata(): Promise<Metadata> {
  const meta = await buildMetadata("/");
  const seo = await fetchSeo("/");
  if (seo?.canonicalUrl) {
    try {
      meta.metadataBase = new URL(new URL(seo.canonicalUrl).origin);
    } catch {
      // Invalid base URL configured — leave metadataBase unset.
    }
  }
  return meta;
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const seo = await fetchSeo("/");
  const gaId = seo?.googleAnalyticsId ?? null;

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${plexMono.variable} ${manrope.variable}`}
    >
      <body id="body">
        <Header />
        {children}
        <Footer />
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
