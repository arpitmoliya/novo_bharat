import { cn } from "@/lib/cn";

type FeatureCardProps = {
  icon: React.ElementType;
  title: string;
  description: string;
  className?: string;
};

export default function FeatureCard({
  icon,
  title,
  description,
  className,
}: FeatureCardProps) {
  const Icon = icon;
  return (
    <article className={cn("flex flex-col bg-transparent", className)}>
      <div className="flex p-6 rounded-[20px] bg-gradient-soft gap-5 items-center">
        <Icon className="xl:size-15 lg:size-10 md:size-8 size-6" />
        <h3 className="m-0 font-heading text-[clamp(1.25rem,1.5vw,1.5rem)] leading-[1.2] font-semibold tracking-[-0.02em] text-black">
          {title}
        </h3>
      </div>
      <div className="p-6 rounded-[20px] bg-white border border-black/10 h-full">
        <p className="m-0 font-body text-[clamp(0.85rem,0.95vw,1.125rem)] leading-[1.55] tracking-[-0.02em] text-gray">
          {description}
        </p>
      </div>
    </article>
  );
}
