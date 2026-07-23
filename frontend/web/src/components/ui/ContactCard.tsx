type ContactDetailRow = {
  label: string;
  value: string;
  href?: string;
};

type ContactCardProps = {
  title: string;
  rows: readonly ContactDetailRow[];
};

export default function ContactCard({ title, rows }: ContactCardProps) {
  return (
    <aside className="flex flex-col gap-6 rounded-[20px] bg-(image:--gradient-soft) p-[clamp(28px,3vw,44px)]">
      <h3 className="m-0 font-heading text-[clamp(1.25rem,1.5vw,1.75rem)] font-normal tracking-[-0.02em] text-black">
        {title}
      </h3>
      <dl className="m-0 flex flex-col gap-4.5">
        {rows.map((row) => (
          <div key={row.label}>
            <dt className="mb-1 font-body text-[clamp(0.8rem,0.85vw,0.9375rem)] font-semibold tracking-[0.04em] text-blue uppercase">
              {row.label}
            </dt>
            <dd className="m-0 font-body text-[clamp(0.95rem,1vw,1.125rem)] leading-normal tracking-[-0.02em] text-black">
              {row.href ? (
                <a
                  href={row.href}
                  className="text-black transition-colors duration-180 hover:text-blue"
                >
                  {row.value}
                </a>
              ) : (
                row.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
