// Figma "Why Us" (#117:26596 / #30:201) — gradient-framed white panel split into
// a tall photo (left) and a heading + list of six pill-style trust bullets (right).
import { fxWhyUs } from "@/content/figmaHome";
import CircleCheckMarkIcon from "../icons/CircleCheckMarkIcon";
import Image from "next/image";

export default function WhyUs() {
  return (
    <section className="container-fx px-(--gutter-sm) py-10 md:py-14">
      <div className="rounded-[20px] bg-(image:--gradient-soft) p-3 sm:rounded-[30px] sm:p-5">
        <div className="grid grid-cols-1 gap-3 overflow-hidden rounded-[16px] bg-white sm:rounded-[20px] md:grid-cols-2 md:gap-3.5">
          <Image
            src={fxWhyUs.image}
            alt="Novo Bharat pharmaceutical operations"
            width={500}
            height={500}
            className="h-56 w-full rounded-[16px] object-cover sm:h-72 sm:rounded-[20px] md:h-full md:min-h-[480px]"
          />

          <div className="flex flex-col justify-center gap-5 px-4 py-6 sm:gap-6 sm:px-6 sm:py-8 md:gap-8 md:px-10 md:py-9">
            <div className="flex flex-col gap-3 sm:gap-4">
              <p className="eyebrow">{fxWhyUs.eyebrow}</p>
              <h2 className="heading">
                {fxWhyUs.titleTop}
                <br />
                {fxWhyUs.titleBottom}
              </h2>
            </div>

            <div className="flex flex-col gap-2 sm:gap-2.5">
              {fxWhyUs.bullets.map((bullet) => (
                <div
                  key={bullet}
                  className="flex items-start gap-2.5 rounded-2xl bg-f6 px-3 py-3 sm:items-center sm:gap-3 sm:px-4 sm:py-3.5"
                >
                  <CircleCheckMarkIcon className="mt-0.5 size-6 shrink-0 sm:mt-0 sm:size-7" />
                  <span className="font-body text-base leading-normal tracking-tight text-black sm:text-lg md:text-xl">
                    {bullet}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
