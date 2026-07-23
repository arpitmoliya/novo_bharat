import type { Metadata } from "next";
import { productsPage } from "@/content/figmaPages";
import PageCta from "@/components/sections/PageCta";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo";
import ProductsClient from "./ProductsClient";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadata("/products");
}

export default function ProductsPage() {
  const { hero, cta } = productsPage;

  return (
    <main className="overflow-x-clip bg-white">
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        body={hero.body}
        bg="/figma/img/counter-bg.png"
      />

      <Container className="px-(--gutter) py-10 md:py-16">
        <ProductsClient />
      </Container>

      <PageCta content={cta} variant="banner" withPhoto />
    </main>
  );
}
