import type { Metadata } from "next";
import { productsPage } from "@/content/figmaPages";
import FxCta from "@/components/pages/FxCta";
import FxPageHero from "@/components/pages/FxPageHero";
import { buildMetadata } from "@/lib/seo";
import ProductsClient from "./ProductsClient";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadata("/products");
}

// Products — Figma "Product Page": hero + filterable catalogue + banner CTA.
export default function ProductsPage() {
  const { hero, cta } = productsPage;

  return (
    <main className="overflow-x-clip bg-white">
      <FxPageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        body={hero.body}
        bg="/figma/img/counter-bg.png"
      />

      <section className="container-fx px-(--gutter) py-10 md:py-16">
        <ProductsClient />
      </section>

      <FxCta content={cta} variant="banner" withPhoto />
    </main>
  );
}
