type StatBlockProps = {
  value: string;
  label: string;
};

export default function StatBlock({ value, label }: StatBlockProps) {
  return (
    <div className="flex flex-col gap-4 text-white">
      <p className="m-0 font-heading text-[clamp(2.25rem,4.1667vw,5rem)] leading-[1.2] font-normal tracking-[-0.02em]">
        {value}
      </p>
      <p className="m-0 font-heading text-[clamp(1rem,1.25vw,1.5rem)] leading-[1.2] font-normal tracking-[-0.02em]">
        {label}
      </p>
    </div>
  );
}
