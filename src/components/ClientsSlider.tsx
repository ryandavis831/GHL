"use client";

import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import {
  Building2,
  Dumbbell,
  GraduationCap,
  Landmark,
  Shield,
} from "lucide-react";

type LogoCard =
  | {
      kind: "logo";
      name: string;
      /**
       * SimpleIcons CDN URL — real brand SVG for recognizable companies.
       * Renders in the brand's official color.
       */
      logoUrl: string;
      logoClassName?: string;
    }
  | {
      kind: "wordmark";
      name: string;
      /** Brand-colored wordmark for companies without a public mark on the CDN */
      color: string;
      /** Optional smaller subtitle line under the wordmark (e.g. "Burgers • Shakes • Fries") */
      sublabel?: string;
    }
  | {
      kind: "icon";
      name: string;
      sublabel?: string;
      Icon: typeof Building2;
    };

/*
  NOTE on logos:
  - SimpleIcons (cdn.simpleicons.org) hosts official, freely-usable SVG marks
    for many recognizable brands (Wendy's, Dunkin', etc).
  - For Tractor Supply and Hwy 55 the SimpleIcons CDN doesn't host the mark,
    so we render a clean styled brand-name card on a white background.
  - For Health Dept., Court House, Schools, Gyms, Military Base Buildings
    we use Lucide icon cards (per the brief — no fake artwork for orgs that
    don't have a published brand logo).
*/

const items: LogoCard[] = [
  {
    kind: "logo",
    name: "Wendy's",
    logoUrl: "https://cdn.simpleicons.org/wendys/E2231A",
    logoClassName: "h-9 w-auto",
  },
  {
    kind: "logo",
    name: "Dunkin'",
    logoUrl: "https://cdn.simpleicons.org/dunkin/FF671F",
    logoClassName: "h-10 w-auto",
  },
  {
    kind: "wordmark",
    name: "Tractor Supply",
    color: "#D2232A",
  },
  {
    kind: "wordmark",
    name: "Hwy 55",
    color: "#D72027",
    sublabel: "Burgers · Shakes · Fries",
  },
  {
    kind: "icon",
    name: "Health Department",
    sublabel: "Government",
    Icon: Landmark,
  },
  { kind: "icon", name: "Court House", sublabel: "Government", Icon: Landmark },
  {
    kind: "icon",
    name: "Local Schools",
    sublabel: "Education",
    Icon: GraduationCap,
  },
  { kind: "icon", name: "Local Gyms", sublabel: "Fitness", Icon: Dumbbell },
  {
    kind: "icon",
    name: "Military Base Buildings",
    sublabel: "200+ on Lejeune & MCAS",
    Icon: Shield,
  },
];

function Card({ item }: { item: LogoCard }) {
  const baseCard =
    "group flex h-20 min-w-[210px] items-center justify-center rounded-xl bg-white px-6 shadow-card ring-1 ring-navy-900/5 transition hover:-translate-y-1 hover:shadow-cardHover sm:min-w-[230px]";

  if (item.kind === "logo") {
    return (
      <div className={baseCard} title={item.name}>
        <img
          src={item.logoUrl}
          alt={`${item.name} logo`}
          className={item.logoClassName ?? "h-9 w-auto"}
          loading="lazy"
        />
      </div>
    );
  }

  if (item.kind === "wordmark") {
    return (
      <div className={baseCard} title={item.name}>
        <div className="flex flex-col items-center text-center">
          <span
            className="font-display text-xl font-extrabold tracking-tight sm:text-2xl"
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
  return (
    <div
      className="group flex h-20 min-w-[210px] items-center gap-3 rounded-xl bg-white px-5 shadow-card ring-1 ring-navy-900/5 transition hover:-translate-y-1 hover:shadow-cardHover sm:min-w-[230px]"
      title={item.name}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-deep text-white transition group-hover:bg-sky2-600">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm font-bold text-navy-900">{item.name}</p>
        {item.sublabel && (
          <p className="truncate text-[11px] font-medium uppercase tracking-wider text-slate1-500">
            {item.sublabel}
          </p>
        )}
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
            Trusted By Businesses &amp; Facilities Across Eastern North
            Carolina
          </h2>
          <p className="mt-3 text-sm text-slate1-300 sm:text-base">
            From national restaurant brands to government, schools, gyms, and
            over 200 buildings on local military bases &mdash; we&apos;ve
            cleaned them all.
          </p>
        </div>
      </div>

      <div className="relative mt-12 h-[120px] w-full">
        <InfiniteSlider
          className="flex h-full w-full items-center"
          duration={42}
          durationOnHover={120}
          gap={20}
        >
          {items.map((item) => (
            <Card key={item.name} item={item} />
          ))}
        </InfiniteSlider>

        {/* Edge fades — progressive blur + solid navy gradient for a clean blend */}
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
