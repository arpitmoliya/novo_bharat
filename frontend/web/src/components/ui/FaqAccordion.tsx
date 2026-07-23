type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: FaqItem[];
};

export default function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <div className="mx-auto flex max-w-250 flex-col gap-3.5">
      {items.map((item) => (
        <details
          key={item.question}
          className="group overflow-hidden bg-white text-black"
        >
          <summary className="flex rounded-2xl border border-black/10 cursor-pointer list-none items-center justify-between gap-4 px-6.5 py-5.5 font-heading text-[clamp(1.05rem,1.2vw,1.375rem)] font-normal tracking-[-0.02em] text-black [&::-webkit-details-marker]:hidden after:flex-none after:text-[1.6rem] after:leading-none after:text-blue after:transition-transform after:duration-200 after:content-['+'] group-open:after:content-['−']">
            {item.question}
          </summary>
          <div className="px-6.5 p-6 rounded-2xl  font-body text-[clamp(0.95rem,1vw,1.125rem)] leading-[1.6] tracking-[-0.02em] bg-(image:--gradient-soft)">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
