"use client";

import { useEffect, useRef, useState } from "react";

type StatBlockProps = {
  value: string;
  label: string;
};

function parseStatValue(value: string) {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { target: 0, suffix: value, decimals: 0 };
  const numeric = match[1];
  return {
    target: Number(numeric),
    suffix: match[2] ?? "",
    decimals: numeric.includes(".") ? numeric.split(".")[1].length : 0,
  };
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function StatBlock({ value, label }: StatBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { target, suffix, decimals } = parseStatValue(value);
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      setDisplay(target);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  useEffect(() => {
    if (!started) return;

    const duration = 1400;
    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(target * easeOutCubic(progress));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, target]);

  return (
    <div ref={ref} className="flex flex-col gap-4 text-white">
      <p className="m-0 font-heading text-[clamp(2.25rem,4.1667vw,5rem)] leading-[1.2] font-normal tracking-[-0.02em] tabular-nums">
        {display.toFixed(decimals)}
        {suffix}
      </p>
      <p className="m-0 font-heading text-[clamp(1rem,1.25vw,1.5rem)] leading-[1.2] font-normal tracking-[-0.02em]">
        {label}
      </p>
    </div>
  );
}
