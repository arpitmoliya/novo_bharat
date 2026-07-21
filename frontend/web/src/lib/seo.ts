// Server-side SEO helpers. These run inside the web container during render,
// so they reach the backend over the internal Docker network (API_INTERNAL_URL),
// NOT the browser-facing NEXT_PUBLIC_API_URL.

import type { Metadata } from "next";

const SEO_API_BASE =
  process.env.API_INTERNAL_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:3003/api";

// How often (seconds) the website re-pulls SEO config from the admin. Changes
// made in the admin panel go live within this window via ISR.
export const SEO_REVALIDATE = 300;

// Fallback origin used for sitemap/robots when no canonical base is configured.
const FALLBACK_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:8080";

export interface ResolvedSeo {
  path: string;
  title: string;
  description: string | null;
  keywords: string | null;
  canonicalUrl: string | null;
  siteName: string;
  ogTitle: string;
  ogDescription: string | null;
  ogImage: string | null;
  ogType: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string | null;
  twitterImage: string | null;
  twitterHandle: string | null;
  index: boolean;
  follow: boolean;
  googleSiteVerification: string | null;
  bingSiteVerification: string | null;
  googleAnalyticsId: string | null;
}

export interface SitemapEntry {
  loc: string;
  changefreq: string;
  priority: number;
  lastmod: string | null;
}

async function fetchJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${SEO_API_BASE}${path}`, {
      next: { revalidate: SEO_REVALIDATE },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export function fetchSeo(path: string): Promise<ResolvedSeo | null> {
  return fetchJson<ResolvedSeo>(`/seo/resolve?path=${encodeURIComponent(path)}`);
}

/** Build a Next.js Metadata object for a given route from admin-managed SEO. */
export async function buildMetadata(path: string): Promise<Metadata> {
  const seo = await fetchSeo(path);
  if (!seo) {
    // Backend unreachable — fall back to a sane minimum so the page still renders.
    return {
      title: "Novo Bharat",
      icons: { icon: "/imgs/logo/favicon.png" },
    };
  }

  const twitterCard = (
    ["summary", "summary_large_image", "app", "player"].includes(seo.twitterCard)
      ? seo.twitterCard
      : "summary_large_image"
  ) as "summary" | "summary_large_image" | "app" | "player";

  const metadata: Metadata = {
    title: seo.title,
    description: seo.description ?? undefined,
    keywords: seo.keywords ?? undefined,
    icons: { icon: "/imgs/logo/favicon.png" },
    alternates: seo.canonicalUrl ? { canonical: seo.canonicalUrl } : undefined,
    robots: { index: seo.index, follow: seo.follow },
    openGraph: {
      title: seo.ogTitle,
      description: seo.ogDescription ?? undefined,
      siteName: seo.siteName,
      type: "website",
      url: seo.canonicalUrl ?? undefined,
      images: seo.ogImage ? [{ url: seo.ogImage }] : undefined,
    },
    twitter: {
      card: twitterCard,
      title: seo.twitterTitle,
      description: seo.twitterDescription ?? undefined,
      images: seo.twitterImage ? [seo.twitterImage] : undefined,
      site: seo.twitterHandle ?? undefined,
    },
    verification: {
      google: seo.googleSiteVerification ?? undefined,
      other: seo.bingSiteVerification
        ? { "msvalidate.01": seo.bingSiteVerification }
        : undefined,
    },
  };
  return metadata;
}

export function fetchSitemap(): Promise<{
  baseUrl: string | null;
  entries: SitemapEntry[];
} | null> {
  return fetchJson("/seo/sitemap");
}

export function fetchRobots(): Promise<{
  baseUrl: string | null;
  sitemapUrl: string | null;
  index: boolean;
  disallow: string[];
} | null> {
  return fetchJson("/seo/robots");
}

/** Resolve a (possibly relative) sitemap loc to an absolute URL. */
export function absoluteUrl(loc: string, baseUrl: string | null): string {
  if (/^https?:\/\//i.test(loc)) return loc;
  const base = (baseUrl ?? FALLBACK_SITE_URL).replace(/\/+$/, "");
  return `${base}${loc.startsWith("/") ? "" : "/"}${loc}`;
}

export { FALLBACK_SITE_URL };
