// Figma "Why Us" (#30:201) — gradient-framed white panel split into a tall photo
// (left) and a heading + list of six pill-style trust bullets (right).
import { fxWhyUs } from "@/content/figmaHome";
import CircleCheckMarkIcon from "../icons/CircleCheckMarkIcon";
import Image from "next/image";

export default function WhyUs() {
  return (
    <section className="container-fx py-13.75 px-(--gutter-sm)">
      <div className="rounded-[30px] bg-(image:--gradient-soft) p-5">
        <div className="grid grid-cols-1 gap-3.5 rounded-[20px] bg-white md:grid-cols-2">
          <Image
            src={fxWhyUs.image}
            alt="Novo Bharat pharmaceutical operations"
            width={500}
            height={500}
            className="h-full min-h-120 w-full rounded-[20px] object-cover"
          />

          <div className="flex flex-col justify-center gap-7.5 px-10 py-9">
            <div className="flex flex-col gap-4">
              <p className="eyebrow">{fxWhyUs.eyebrow}</p>
              <h2 className="heading">
                {fxWhyUs.titleTop}
                <br />
                {fxWhyUs.titleBottom}
              </h2>
            </div>

            <div className="flex flex-col gap-2.5">
              {fxWhyUs.bullets.map((bullet) => (
                <div
                  key={bullet}
                  className="flex items-center gap-3 rounded-2xl bg-f6 px-4 py-3.25"
                >
                  <CircleCheckMarkIcon className="shrink-0 size-7" />
                  <span className="font-body text-[clamp(1rem,1.15vw,1.375rem)] leading-normal tracking-[-0.02em] text-black">
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
