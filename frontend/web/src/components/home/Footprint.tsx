// Figma "Global Footprint" (#30:254) — two-line heading with right-aligned
// eyebrow above a wrapping grid of country cards (flag frame + blue label pill).
import { fxFootprint } from "@/content/figmaHome";
import Image from "next/image";

export default function Footprint() {
  return (
    <section className="container-fx flex flex-col gap-[clamp(40px,5vw,64px)] bg-white py-20 px-(--gutter)">
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="eyebrow">{fxFootprint.eyebrow}</p>
        <h2 className="heading">
          {fxFootprint.titleTop}
          <br />
          {fxFootprint.titleBottom}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] sm:gap-7.5">
        {fxFootprint.countries.map((country) => (
          <div key={country.name} className="flex flex-col">
            <div className="flex h-42.5 items-center justify-center rounded-[20px] border border-black/20 bg-white p-6">
              <Image
                src={country.flag}
                alt={`${country.name} flag`}
                width={100}
                height={100}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex h-21.25 flex-col items-center justify-center gap-0.5 rounded-[20px] bg-bluepill text-center">
              <span className="font-heading text-[clamp(1.1rem,1.5vw,1.5rem)] leading-[1.2] font-semibold tracking-[-0.02em] text-black">
                {country.name}
              </span>
              {"note" in country && country.note ? (
                <span className="font-heading text-sm opacity-50">
                  {country.note}
                </span>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
