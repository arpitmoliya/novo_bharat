import PageHero from "@/components/layout/PageHero";
import Section from "@/components/ui/Section";
import { Heading } from "@/components/ui/Typography";
import type {
  PolicyBlock,
  PolicyPageContent,
  PolicySection,
} from "@/content/figmaPolicies";

const bodyClass =
  "m-0 font-body text-[clamp(0.90rem,1.05vw,1.25rem)] leading-[1.6] tracking-[-0.02em] text-gray";

function linkifyEmail(text: string) {
  const email = "info@novobharat.com";
  if (!text.includes(email)) return text;

  const [before, after] = text.split(email);
  return (
    <>
      {before}
      <a
        href={`mailto:${email}`}
        className="text-blue transition-colors duration-180 hover:text-gold"
      >
        {email}
      </a>
      {after}
    </>
  );
}

function PolicyBlockView({ block }: { block: PolicyBlock }) {
  if (block.type === "paragraph") {
    return <p className={bodyClass}>{linkifyEmail(block.text)}</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {block.intro ? <p className={bodyClass}>{block.intro}</p> : null}
      <ol className="m-0 flex list-decimal flex-col gap-3 pl-6">
        {block.items.map((item) => (
          <li key={item.slice(0, 48)} className={`${bodyClass} pl-1`}>
            {item}
          </li>
        ))}
      </ol>
    </div>
  );
}

function PolicySectionView({ section }: { section: PolicySection }) {
  return (
    <div className="flex flex-col gap-4">
      {section.title ? <Heading>{section.title}</Heading> : null}
      {section.blocks.map((block, index) => (
        <PolicyBlockView
          key={`${section.title ?? "section"}-${block.type}-${index}`}
          block={block}
        />
      ))}
    </div>
  );
}

type PolicyPageProps = {
  content: PolicyPageContent;
};

export default function PolicyPage({ content }: PolicyPageProps) {
  const { hero, intro, sections } = content;

  return (
    <main className="overflow-x-clip bg-white">
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        body={hero.body}
        bg="/figma/img/about-us-bg.png"
      />

      <Section>
        <div className="mx-auto flex max-w-4xl flex-col gap-10 sm:gap-12">
          {intro ? <p className={bodyClass}>{intro}</p> : null}
          {sections.map((section, index) => (
            <PolicySectionView
              key={section.title ?? `section-${index}`}
              section={section}
            />
          ))}
        </div>
      </Section>
    </main>
  );
}
