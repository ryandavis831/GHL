"use client";

import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import {
  Building2,
  Dumbbell,
  GraduationCap,
  Home,
  Landmark,
  Lock,
  Plane,
  Shield,
  Stethoscope,
} from "lucide-react";

type LogoCard =
  | {
      kind: "logo";
      name: string;
      logoUrl: string;
      logoWebp?: string;
      logoClassName?: string;
    }
  | {
      kind: "wordmark";
      name: string;
      color: string;
      sublabel?: string;
    }
  | {
      kind: "icon";
      label: string;
      sublabel: string;
      Icon: typeof Building2;
      accent: "blue" | "purple";
    };

/*
  Mixed deck: real client logos + experience-point text cards.
  Per the brief, only real brand logos are used as logos; everything
  else renders as a uniform icon card so we don't fabricate artwork.
*/
const items: LogoCard[] = [
  {
    kind: "logo",
    name: "Tractor Supply Co.",
    logoUrl: "/assets/clients/tractor-supply.png",
    logoWebp: "/assets/clients/tractor-supply.webp",
    logoClassName: "max-h-14 w-auto",
  },
  {
    kind: "logo",
    name: "Wendy's",
    logoUrl: "/assets/clients/wendys.png",
    logoWebp: "/assets/clients/wendys.webp",
    logoClassName: "max-h-14 w-auto",
  },
  {
    kind: "logo",
    name: "Dunkin' Donuts",
    logoUrl: "/assets/clients/dunkin.png",
    logoWebp: "/assets/clients/dunkin.webp",
    logoClassName: "max-h-14 w-auto",
  },
  {
    kind: "wordmark",
    name: "Hwy 55",
    color: "#D72027",
    sublabel: "Burgers · Shakes · Fries",
  },
  { kind: "icon", label: "Health Department", sublabel: "Government Facility", Icon: Stethoscope, accent: "blue" },
  { kind: "icon", label: "Court House",       sublabel: "Government Facility", Icon: Landmark,    accent: "blue" },
  { kind: "icon", label: "Jail",              sublabel: "Government Facility", Icon: Lock,        accent: "blue" },
  { kind: "icon", label: "3 Hangars",         sublabel: "Aviation",            Icon: Plane,       accent: "blue" },
  { kind: "icon", label: "5 Gyms",            sublabel: "Fitness",             Icon: Dumbbell,    accent: "purple" },
  { kind: "icon", label: "3 Schools",         sublabel: "Education",           Icon: GraduationCap, accent: "purple" },
  { kind: "icon", label: "Hundreds of Houses", sublabel: "Residential",        Icon: Home,        accent: "purple" },
  { kind: "icon", label: "200+ Buildings on Bases", sublabel: "Camp Lejeune & MCAS", Icon: Shield, accent: "purple" },
  { kind: "icon", label: "Government Facilities", sublabel: "Multi-site",      Icon: Landmark,    accent: "blue" },
  { kind: "icon", label: "Commercial Properties", sublabel: "Offices & Retail", Icon: Building2,  accent: "blue" },
];

function Card({ item }: { item: LogoCard }) {
  // Uniform: 88px tall, ~240px wide white card so the rhythm stays consistent.
  const base =
    "group flex h-[88px] w-[240px] shrink-0 rounded-xl bg-white shadow-card ring-1 ring-navy-900/5 transition hover:-translate-y-1 hover:shadow-cardHover";

  if (item.kind === "logo") {
    return (
      <div
        className={`${base} items-center justify-center px-6`}
        title={item.name}
      >
        <picture>
          {item.logoWebp && (
            <source srcSet={item.logoWebp} type="image/webp" />
          )}
          <img
            src={item.logoUrl}
            alt={`${item.name} logo`}
            className={`${item.logoClassName ?? "max-h-14 w-auto"} transition duration-300`}
            loading="lazy"
          />
        </picture>
      </div>
    );
  }

  if (item.kind === "wordmark") {
    return (
      <div
        className={`${base} items-center justify-center px-6`}
        title={item.name}
      >
        <div className="flex flex-col items-center text-center">
          <span
            className="font-display text-2xl font-extrabold tracking-tight"
            style={{ color: item.color }}
          >
            {item.name}
          </span>
          {item.sublabel && (
            <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate1-500">
              {item.sublabel}
            </span>
          )}
        </div>
      </div>
    );
  }

  const Icon = item.Icon;
  const accentClass =
    item.accent === "purple"
      ? "bg-brand-purple-50 text-brand-purple-600 ring-1 ring-brand-purple-100"
      : "bg-brand-blue-50 text-brand-blue-600 ring-1 ring-brand-blue-100";

  return (
    <div
      className={`${base} items-center gap-3 px-4`}
      title={item.label}
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${accentClass}`}
      >
        <Icon className="h-5 w-5" strokeWidth={2.2} />
      </span>
      <div className="min-w-0">
        <p className="truncate text-[13px] font-bold leading-tight text-navy-900">
          {item.label}
        </p>
        <p className="mt-1 truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-slate1-500">
          {item.sublabel}
        </p>
      </div>
    </div>
  );
}

export default function ClientsSlider() {
  return (
    <section className="relative overflow-hidden bg-navy-deep py-16 text-white sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.45) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="container-wide relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow-dark">Trusted Partners</span>
          <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Trusted by Businesses, Facilities &amp; Homeowners Across Eastern
            North Carolina
          </h2>
          <p className="mt-3 text-sm text-slate1-300 sm:text-base">
            From national restaurant brands to government buildings, hangars,
            schools, gyms, and hundreds of homes &mdash; we&apos;ve cleaned
            them all.
          </p>
        </div>
      </div>

      <div className="relative mt-12 h-[120px] w-full">
        <InfiniteSlider
          className="flex h-full w-full items-center"
          duration={60}
          durationOnHover={140}
          gap={20}
        >
          {items.map((item) => (
            <Card
              key={item.kind === "icon" ? item.label : item.name}
              item={item}
            />
          ))}
        </InfiniteSlider>

        <ProgressiveBlur
          className="pointer-events-none absolute left-0 top-0 h-full w-[180px]"
          direction="left"
          blurIntensity={1}
        />
        <ProgressiveBlur
          className="pointer-events-none absolute right-0 top-0 h-full w-[180px]"
          direction="right"
          blurIntensity={1}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 h-full w-[180px]"
          style={{
            background:
              "linear-gradient(to right, rgba(11,29,56,1) 5%, rgba(11,29,56,0) 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-full w-[180px]"
          style={{
            background:
              "linear-gradient(to left, rgba(11,29,56,1) 5%, rgba(11,29,56,0) 100%)",
          }}
        />
      </div>
    </section>
  );
}
