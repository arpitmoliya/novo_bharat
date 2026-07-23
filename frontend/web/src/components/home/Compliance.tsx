import { fxCompliance } from "@/content/figmaHome";
import Container from "@/components/ui/Container";
import { Eyebrow, Heading } from "@/components/ui/Typography";
import Image from "next/image";
import { cn } from "@/lib/cn";

type ComplianceProps = {
  eyebrow: string;
  title: string;
  isBg?: boolean;
};

export default function Compliance({
  eyebrow,
  title,
  isBg = false,
}: ComplianceProps) {
  return (
    <Container className="py-20 px-(--gutter-sm)">
      <div
        className={cn(
          "flex flex-col items-center gap-12 rounded-[30px] py-[clamp(48px,6vw,80px)] px-[clamp(24px,4vw,60px)]",
          isBg ? "bg-(image:--gradient-soft)" : "bg-transparent",
        )}
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <Heading>{title}</Heading>
        </div>

        <div className="mx-auto grid w-full max-w-75 grid-cols-1 gap-6 sm:mx-0 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {fxCompliance.items.map((cert) => (
            <article
              key={cert.name}
              className="flex flex-col gap-8 rounded-[20px] border border-black/10 bg-white p-6"
            >
              <div className="flex h-14 items-center">
                <Image
                  src={cert.logo}
                  alt={`${cert.name}-logo`}
                  width={100}
                  height={100}
                  className="h-full w-auto max-w-full object-contain"
                />
              </div>
              <div className="flex flex-col gap-5">
                <h3 className="m-0 font-heading text-[clamp(1.25rem,1.5vw,1.5rem)] leading-[1.2] font-semibold tracking-[-0.02em] text-black">
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
    </Container>
  );
}
