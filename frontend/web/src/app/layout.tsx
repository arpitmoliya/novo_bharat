import type { Metadata } from "next";
import Script from "next/script";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { buildMetadata, fetchSeo } from "@/lib/seo";
import "./globals.css";

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
    <html lang="en">
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
