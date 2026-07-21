import type { Metadata } from "next";
import { productsPage } from "@/content/figmaPages";
import FxCta from "@/components/pages/FxCta";
import FxPageHero from "@/components/pages/FxPageHero";
import { buildMetadata } from "@/lib/seo";
import ProductsClient from "./ProductsClient";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadata("/products");
}

// Products — Figma "Product Page" design language on the fx- system. The
// catalogue itself (search / filter / grid) is the client component below.
export default function ProductsPage() {
  const { hero, cta } = productsPage;

  return (
    <main className="bg-white overflow-x-clip">
      <FxPageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        body={hero.body}
        bg="/figma/img/hero-bg.png"
      />

      <section className="section">
        <ProductsClient />
      </section>

      <FxCta content={cta} />
    </main>
  );
}
