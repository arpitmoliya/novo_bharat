import Compliance from "@/components/home/Compliance";
import DocumentAttachIcon from "@/components/icons/DocumentAttachIcon";
import PageHero from "@/components/layout/PageHero";
import ButtonLink from "@/components/ui/ButtonLink";
import DocsPanel from "@/components/ui/DocsPanel";
import DocumentItem from "@/components/ui/DocumentItem";
import Section, { SectionHeader } from "@/components/ui/Section";
import Statement from "@/components/ui/Statement";
import { Eyebrow, Heading } from "@/components/ui/Typography";
import { certificationsPage } from "@/content/figmaPages";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadata("/certifications");
}

export default function CertificationsPage() {
  const { hero, certs, docs, statements } = certificationsPage;

  return (
    <main className="overflow-x-clip bg-white">
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        body={hero.body}
        bg="/figma/img/certificate-bg.png"
      />

      <Section tight>
        <div className="flex flex-col gap-5 lg:flex-row">
          {statements.map((statement) => (
            <Statement key={statement.slice(0, 24)}>{statement}</Statement>
          ))}
        </div>
      </Section>

      {/* Certifications */}
      <Compliance eyebrow={certs.eyebrow} title={certs.title} isBg={false} />

      <Section className="py-20 px-(--gutter-sm)">
        <div
          className={
            "flex flex-col items-center gap-12 rounded-[30px] bg-gradient-soft py-[clamp(48px,6vw,80px)] px-[clamp(24px,4vw,60px)]"
          }
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <Eyebrow>{docs.eyebrow}</Eyebrow>
            <Heading>{docs.title}</Heading>
          </div>

          <DocsPanel
            lead={docs.lead}
            note={docs.note}
            action={
              <ButtonLink
                href={docs.action.href}
                variant="solid"
                className="mt-1 self-start"
              >
                {docs.action.label}
              </ButtonLink>
            }
          />

          <ul className="mx-auto grid w-full max-w-75 grid-cols-1 gap-6 sm:mx-0 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {docs.items.map((doc) => (
              <DocumentItem
                key={doc.name}
                icon={<DocumentAttachIcon className="size-8 md:size-10 lg:size-12 xl:size-15" />}
                name={doc.name}
                description={doc.desc}
              />
            ))}
          </ul>
        </div>
      </Section>
    </main>
  );
}
