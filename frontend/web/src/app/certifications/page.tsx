import type { Metadata } from "next";
import { certificationsPage } from "@/content/figmaPages";
import { DocsIcon } from "@/components/home/icons";
import FxCta from "@/components/pages/FxCta";
import FxPageHero from "@/components/pages/FxPageHero";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadata("/certifications");
}

// Certifications — Figma "Certifications" design language on the fx- system.
export default function CertificationsPage() {
  const { hero, certs, docs, statements, cta } = certificationsPage;

  return (
    <main className="bg-white overflow-x-clip">
      <FxPageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        body={hero.body}
        bg="/figma/img/counter-bg.png"
      />

      {/* Certification badges — gradient panel of cert cards (Home style) */}
      <section className="container-fx py-20 px-(--gutter-sm)">
        <div className="flex flex-col items-center gap-12 rounded-[30px] bg-(image:--gradient-soft) py-[clamp(48px,6vw,80px)] px-[clamp(24px,4vw,60px)]">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="eyebrow">{certs.eyebrow}</p>
            <h2 className="heading">{certs.title}</h2>
          </div>
          <div className="grid w-full grid-cols-1 gap-6 mx-auto max-w-75 sm:mx-0 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {certs.items.map((cert) => (
              <article
                key={cert.name}
                className="flex flex-col gap-8 rounded-[20px] border border-black/10 bg-white p-6"
              >
                <div className="flex h-14 items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cert.logo}
                    alt={`${cert.name} logo`}
                    className="h-full w-auto max-w-full object-contain"
                  />
                </div>
                <div className="flex flex-col gap-5">
                  <h3 className="m-0 font-heading text-[clamp(1.25rem,1.5vw,1.5rem)] leading-[1.2] font-normal tracking-[-0.02em] text-black">
                    {cert.name}
                  </h3>
                  <p className="m-0 font-body text-[clamp(0.95rem,0.95vw,1.125rem)] leading-normal tracking-[-0.02em] text-gray">
                    {cert.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Documents provided with every shipment */}
      <section className="section">
        <div className="section-head flex flex-col gap-4">
          <p className="eyebrow">{docs.eyebrow}</p>
          <h2 className="heading">{docs.title}</h2>
        </div>
        <div className="grid grid-cols-1 items-start gap-[clamp(28px,3vw,56px)] lg:grid-cols-[1.1fr_1fr]">
          <ul className="m-0 grid list-none grid-cols-1 gap-[14px] p-0 md:grid-cols-2">
            {docs.items.map((doc) => (
              <li key={doc.name} className="doc-item">
                <DocsIcon />
                <span>
                  <b>{doc.name}</b>
                  <span>{doc.desc}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="docs-panel">
            <p>{docs.lead}</p>
            <p className="docs-note">{docs.note}</p>
            <a href={docs.action.href} className="btn btn-solid">
              {docs.action.label}
            </a>
          </div>
        </div>
      </section>

      {/* Regulatory statements */}
      <section className="section section-tight">
        <div className="flex flex-col gap-5">
          {statements.map((s) => (
            <div key={s.slice(0, 24)} className="statement">
              <p>{s}</p>
            </div>
          ))}
        </div>
      </section>

      <FxCta content={cta} />
    </main>
  );
}
