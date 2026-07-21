import type { Metadata } from "next";
import { contactPage } from "@/content/figmaPages";
import FxPageHero from "@/components/pages/FxPageHero";
import { buildMetadata } from "@/lib/seo";
import ContactForm from "./ContactForm";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadata("/contact");
}

// Contact — Figma "Contact Us" design language on the fx- system.
export default function ContactPage() {
  const { hero, form, details, map, faq } = contactPage;

  return (
    <main className="bg-white overflow-x-clip">
      <FxPageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        body={hero.body}
        bg="/figma/img/hero-bg.png"
      />

      {/* Form + contact details */}
      <section className="section">
        <div className="grid grid-cols-1 items-start gap-[clamp(28px,3vw,56px)] md:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="flex flex-col gap-4">
              <p className="eyebrow">{form.eyebrow}</p>
              <h2 className="heading">{form.title}</h2>
            </div>
            <ContactForm />
          </div>

          <aside className="contact-card">
            <h3>{details.title}</h3>
            <dl>
              {details.rows.map((row) => (
                <div key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>
                    {"href" in row && row.href ? (
                      <a href={row.href}>{row.value}</a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      {/* Map */}
      <div className="container-fx px-(--gutter)">
        <iframe
          className="map-frame"
          title={map.title}
          src={map.src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* FAQ */}
      <section className="section">
        <div className="section-head flex flex-col items-center gap-4 text-center">
          <p className="eyebrow">{faq.eyebrow}</p>
          <h2 className="heading">{faq.title}</h2>
        </div>
        <div className="faq mx-auto flex max-w-[1000px] flex-col gap-[14px]">
          {faq.items.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <div className="faq-answer">{item.a}</div>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
