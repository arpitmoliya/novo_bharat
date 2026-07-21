import type { MetadataRoute } from "next";
import { absoluteUrl, fetchSitemap } from "@/lib/seo";

// Keep in sync with SEO_REVALIDATE in lib/seo.ts (Next requires a literal here).
export const revalidate = 300;

type ChangeFreq = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

const VALID_FREQ: ChangeFreq[] = [
  "always",
  "hourly",
  "daily",
  "weekly",
  "monthly",
  "yearly",
  "never",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await fetchSitemap();
  if (!data) return [];

  return data.entries.map((e) => ({
    url: absoluteUrl(e.loc, data.baseUrl),
    lastModified: e.lastmod ? new Date(e.lastmod) : undefined,
    changeFrequency: VALID_FREQ.includes(e.changefreq as ChangeFreq)
      ? (e.changefreq as ChangeFreq)
      : "weekly",
    priority: e.priority,
  }));
}
