import type { ReactNode } from "react";

type DocumentItemProps = {
  icon: ReactNode;
  name: string;
  description: string;
};

export default function DocumentItem({
  icon,
  name,
  description,
}: DocumentItemProps) {
  return (
    <li className="flex flex-col">
      <div className="p-4 xl:p-6 rounded-2xl bg-white border border-black/10">
        {icon}
      </div>
      <div className="flex flex-col gap-2 p-4 xl:p-6 h-full rounded-2xl bg-white border border-black/10">
        <b className="block font-body text-[clamp(0.9rem,0.95vw,1.625rem)] font-semibold tracking-[-0.02em] text-black">
          {name}
        </b>
        <span className="font-body text-[clamp(0.85rem,0.9vw,1rem)] text-gray">
          {description}
        </span>
      </div>
    </li>
  );
}
