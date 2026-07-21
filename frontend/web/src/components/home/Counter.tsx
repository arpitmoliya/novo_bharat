// Figma "Counter" (#30:91) — a rounded photo panel with a dark overlay holding
// a 4-up row of big stat figures.
import { fxCounter } from "@/content/figmaHome";

export default function Counter() {
  return (
    <section className="container-fx py-[clamp(40px,4.1667vw,80px)] px-(--gutter-sm)">
      <div className="relative overflow-hidden rounded-[30px] bg-[image:linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('/figma/img/counter-bg.png')] bg-cover bg-center bg-no-repeat py-[clamp(40px,4.1667vw,80px)] px-[clamp(24px,4vw,60px)]">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 py-[clamp(24px,4.1667vw,80px)] sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {fxCounter.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-4 text-white">
              <p className="stat-value">{stat.value}</p>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
