import Link from "next/link";
import { ArrowRight, Building2, Sparkles, HardHat, Home, Droplets } from "lucide-react";
import { services } from "@/lib/site";

const iconMap = {
  Building2,
  Sparkles,
  HardHat,
  Home,
  Droplets,
} as const;

export default function ServicesPreview() {
  return (
    <section className="section bg-white">
      <div className="container-wide">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Our Services</span>
          <h2 className="mt-4 text-3xl font-bold text-navy-900 sm:text-4xl">
            Commercial-grade cleaning, built for every kind of space
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate1-600 sm:text-lg">
            From restaurants and retail to military base buildings and hundreds
            of homes — we deliver the same dependable quality everywhere we
            work.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = iconMap[s.icon];
            return (
              <Link
                key={s.slug}
                href={s.url}
                className="card group flex flex-col p-6"
              >
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-navy-deep text-white shadow-card transition group-hover:scale-105">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="text-lg font-semibold text-navy-900">
                  {s.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate1-600">
                  {s.blurb}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-sky2-700 transition group-hover:gap-2.5">
                  Learn more <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
