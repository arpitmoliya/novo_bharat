import type { Metadata } from "next";
import { contactPage } from "@/content/figmaPages";
import PageHero from "@/components/layout/PageHero";
import ContactInfoCard from "@/components/ui/ContactInfoCard";
import FaqAccordion from "@/components/ui/FaqAccordion";
import Section, { SectionHeader } from "@/components/ui/Section";
import { Eyebrow, Heading } from "@/components/ui/Typography";
import { buildMetadata } from "@/lib/seo";
import ContactForm from "./ContactForm";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadata("/contact");
}

export default function ContactPage() {
  const { hero, form, details, map, faq } = contactPage;

  return (
    <main className="overflow-x-clip bg-white">
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        body={hero.body}
        bg="/figma/img/contact-us-bg.png"
      />

      <Section>
        <div className="flex flex-col gap-4 items-center">
          <Eyebrow>{form.eyebrow}</Eyebrow>
          <Heading>{form.title}</Heading>
        </div>

        <ContactForm />
      </Section>

      <Section>
        <div className="rounded-3xl bg-gradient-soft p-3 sm:p-4">
          <div className="grid grid-cols-1 gap-3 overflow-hidden rounded-[20px] lg:grid-cols-2 lg:items-stretch lg:gap-0">
            <iframe
              className="block h-72 w-full rounded-[20px] border-0 grayscale-[0.4] sm:h-96 lg:h-auto lg:min-h-130 lg:rounded-l-[20px]"
              title={map.title}
              src={map.src}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <ContactInfoCard
              eyebrow="Information"
              title={details.title}
              rows={details.rows}
              className="lg:rounded-[20px]"
            />
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader className="flex flex-col items-center gap-4 text-center">
          <Eyebrow>{faq.eyebrow}</Eyebrow>
          <Heading>{faq.title}</Heading>
        </SectionHeader>
        <FaqAccordion
          items={faq.items.map((item) => ({
            question: item.q,
            answer: item.a,
          }))}
        />
      </Section>
    </main>
  );
}
