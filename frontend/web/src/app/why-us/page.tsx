import type { Metadata } from "next";
import { whyUsPage } from "@/content/figmaPages";
import { ICON_MAP } from "@/components/home/icons";
import WhyUs from "@/components/home/WhyUs";
import FxCta from "@/components/pages/FxCta";
import FxPageHero from "@/components/pages/FxPageHero";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadata("/why-us");
}

// Why Us — Figma "Why Us" design language on the fx- system.
export default function WhyUsPage() {
  const { hero, reasons, compare, cta } = whyUsPage;

  return (
    <main className="bg-white overflow-x-clip">
      <FxPageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        body={hero.body}
        bg="/figma/img/hero-bg.png"
      />

      {/* Signature photo + trust bullets panel (reused from Home) */}
      <WhyUs />

      {/* Six reasons */}
      <section className="section">
        <div className="section-head flex flex-col items-center gap-4 text-center">
          <p className="eyebrow">{reasons.eyebrow}</p>
          <h2 className="heading">{reasons.title}</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 mx-auto max-w-[560px] md:mx-0 md:max-w-none md:grid-cols-2 lg:grid-cols-3">
          {reasons.cards.map((r) => {
            const Icon = ICON_MAP[r.icon];
            return (
              <article key={r.title} className="feature-card">
                <div className="feature-icon">{Icon && <Icon />}</div>
                <h3 className="feature-title">{r.title}</h3>
                <p className="feature-desc">{r.desc}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Comparison table */}
      <section className="section">
        <div className="section-head flex flex-col items-center gap-4 text-center">
          <p className="eyebrow">{compare.eyebrow}</p>
          <h2 className="heading">{compare.title}</h2>
        </div>
        <table className="compare-table block w-full overflow-x-auto whitespace-nowrap md:table md:whitespace-normal">
          <thead>
            <tr>
              <th>Feature</th>
              <th className="compare-ours">{compare.columns[0]}</th>
              <th>{compare.columns[1]}</th>
            </tr>
          </thead>
          <tbody>
            {compare.rows.map((row) => (
              <tr key={row.feature}>
                <td>{row.feature}</td>
                <td className="compare-ours">
                  <span className="compare-mark compare-mark-yes">✓</span>
                  {row.ours}
                </td>
                <td className="compare-theirs">
                  <span className="compare-mark compare-mark-no">✕</span>
                  {row.theirs}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <FxCta content={cta} />
    </main>
  );
}
