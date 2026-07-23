type StatementProps = {
  children: string;
};

export default function Statement({ children }: StatementProps) {
  return (
    <div className="rounded-2xl border border-l-4 border-blue bg-gradient-soft p-4">
      <p className="m-0 font-body text-[clamp(0.95rem,1.05vw,1.25rem)] leading-[1.6] tracking-[-0.02em] text-black">
        {children}
      </p>
    </div>
  );
}
