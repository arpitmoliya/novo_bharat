import type { MetadataRoute } from "next";
import { absoluteUrl, fetchRobots } from "@/lib/seo";

// Keep in sync with SEO_REVALIDATE in lib/seo.ts (Next requires a literal here).
export const revalidate = 300;

export default async function robots(): Promise<MetadataRoute.Robots> {
  const data = await fetchRobots();

  // Backend unreachable — be conservative and allow indexing.
  if (!data) {
    return { rules: { userAgent: "*", allow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      // When the site is globally set to noindex, disallow everything.
      ...(data.index
        ? { allow: "/", disallow: data.disallow.length ? data.disallow : undefined }
        : { disallow: "/" }),
    },
    sitemap: data.sitemapUrl
      ? absoluteUrl("/sitemap.xml", data.baseUrl)
      : undefined,
  };
}
