import { fxCounter } from "@/content/figmaHome";
import Container from "@/components/ui/Container";
import StatBlock from "@/components/ui/StatBlock";

export default function Counter() {
  return (
    <Container className="py-[clamp(40px,4.1667vw,80px)] px-(--gutter-sm)">
      <div className="relative overflow-hidden rounded-[30px] bg-[image:linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('/figma/img/counter-bg.png')] bg-cover bg-center bg-no-repeat py-[clamp(40px,4.1667vw,80px)] px-[clamp(24px,4vw,60px)]">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 py-[clamp(24px,4.1667vw,80px)] sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {fxCounter.stats.map((stat) => (
            <StatBlock key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </Container>
  );
}
