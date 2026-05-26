"use client";

import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

type Item =
  | { kind: "logo"; name: string; png: string; webp: string }
  | { kind: "wordmark"; name: string; sub: string };

const items: Item[] = [
  {
    kind: "logo",
    name: "Tractor Supply Co.",
    png: "/assets/clients/tractor-supply.png",
    webp: "/assets/clients/tractor-supply.webp",
  },
  {
    kind: "logo",
    name: "Wendy's",
    png: "/assets/clients/wendys.png",
    webp: "/assets/clients/wendys.webp",
  },
  {
    kind: "logo",
    name: "Dunkin' Donuts",
    png: "/assets/clients/dunkin.png",
    webp: "/assets/clients/dunkin.webp",
  },
  { kind: "wordmark", name: "Hwy 55", sub: "Burgers · Shakes · Fries" },
];

function Card({ item }: { item: Item }) {
  const base =
    "group flex h-[84px] min-w-[200px] items-center justify-center rounded-2xl bg-white px-7 shadow-[0_1px_2px_rgba(11,29,56,0.04),0_8px_20px_-10px_rgba(11,29,56,0.12)] border border-navy-900/[0.06] transition hover:-translate-y-[3px] hover:shadow-[0_4px_10px_rgba(11,29,56,0.06),0_18px_38px_-14px_rgba(11,29,56,0.22)]";

  if (item.kind === "logo") {
    return (
      <div className={base} title={item.name}>
        <picture>
          <source srcSet={item.webp} type="image/webp" />
          <img
            src={item.png}
            alt={`${item.name} logo`}
            className="max-h-12 w-auto opacity-60 transition duration-300 group-hover:opacity-100 grayscale group-hover:grayscale-0 contrast-95 group-hover:contrast-100"
            loading="lazy"
          />
        </picture>
      </div>
    );
  }

  return (
    <div
      className={`${base} flex-col gap-0.5 text-center`}
      title={item.name}
    >
      <span className="font-display text-2xl font-extrabold tracking-tight text-slate1-600 transition-colors duration-300 group-hover:text-[#D72027]">
        {item.name}
      </span>
      <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate1-400">
        {item.sub}
      </span>
    </div>
  );
}

export default function HeroLogoStrip() {
  return (
    <section
      aria-label="Featured clients"
      className="relative border-b border-navy-100 bg-white pb-10 pt-9"
    >
      <div className="container-wide">
        <p className="mb-5 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-slate1-500">
          Trusted by businesses across Eastern North Carolina
        </p>
      </div>
      <div className="relative h-[100px] w-full overflow-hidden">
        <InfiniteSlider
          className="flex h-full w-full items-center"
          duration={36}
          durationOnHover={90}
          gap={20}
        >
          {items.map((it) => (
            <Card key={it.name} item={it} />
          ))}
        </InfiniteSlider>

        <ProgressiveBlur
          className="pointer-events-none absolute left-0 top-0 h-full w-[120px]"
          direction="left"
          blurIntensity={1}
        />
        <ProgressiveBlur
          className="pointer-events-none absolute right-0 top-0 h-full w-[120px]"
          direction="right"
          blurIntensity={1}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 h-full w-[120px]"
          style={{
            background:
              "linear-gradient(to right, #fff 30%, rgba(255,255,255,0) 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-full w-[120px]"
          style={{
            background:
              "linear-gradient(to left, #fff 30%, rgba(255,255,255,0) 100%)",
          }}
        />
      </div>
    </section>
  );
}
