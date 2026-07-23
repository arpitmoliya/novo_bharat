import type { Metadata } from "next";
import About from "@/components/home/About";
import Compliance from "@/components/home/Compliance";
import Counter from "@/components/home/Counter";
import Cta from "@/components/home/Cta";
import Footprint from "@/components/home/Footprint";
import Hero from "@/components/home/Hero";
import Products from "@/components/home/Products";
import WhyUs from "@/components/home/WhyUs";
import { buildMetadata } from "@/lib/seo";
import { fxCompliance } from "@/content/figmaHome";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadata("/");
}

// Home page — pixel-faithful rebuild of the Figma "Home" frame (#30:6).
// Section order mirrors the design top-to-bottom.
export default function HomePage() {
  return (
    <main className="bg-white overflow-x-clip">
      <Hero />
      <About />
      <Counter />
      <Products />
      <WhyUs />
      <Footprint />
      <Compliance
        eyebrow={fxCompliance.eyebrow}
        title={fxCompliance.title}
        isBg
      />
      <Cta />
    </main>
  );
}
