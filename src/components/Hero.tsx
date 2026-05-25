import Link from "next/link";
import { Phone, ShieldCheck, Building2, Home, HardHat, Award } from "lucide-react";
import { site } from "@/lib/site";

const badges = [
  { icon: Award, label: `Established ${site.founded}` },
  { icon: Building2, label: "Commercial & Residential" },
  { icon: ShieldCheck, label: "Trusted Local Company" },
  { icon: HardHat, label: "Post-Construction Specialists" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-radial text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.45) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="container-wide relative grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-12 lg:gap-10 lg:py-32">
        <div className="lg:col-span-7">
          <span className="eyebrow-dark">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
            Serving Eastern NC since {site.founded}
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            Professional Commercial &amp; Residential Cleaning in{" "}
            <span className="text-sky2-300">Richlands, NC</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate1-200 sm:text-lg">
            Carolina Commercial Cleaning Services Inc has provided dependable
            janitorial, post-construction, commercial, and residential cleaning
            services since {site.founded}.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-secondary">
              Book Cleaning Now
            </Link>
            <a href={`tel:${site.phoneRaw}`} className="btn-ghost-light">
              <Phone className="h-4 w-4" />
              Call {site.phone}
            </a>
          </div>

          <ul className="mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            {badges.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-3 text-xs font-medium text-slate1-100 backdrop-blur"
              >
                <Icon className="h-4 w-4 shrink-0 text-sky2-300" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:col-span-5">
          <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-2 backdrop-blur-sm shadow-card">
            {/* PLACEHOLDER IMAGE — swap with on-site / crew photography later */}
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=80"
              alt="Carolina Commercial Cleaning Services crew preparing a commercial space"
              className="aspect-[4/5] w-full rounded-xl object-cover"
              loading="eager"
            />
            <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-xl bg-white/95 p-3 text-navy-900 shadow-card backdrop-blur">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-green text-white">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div className="text-xs leading-tight">
                <p className="font-semibold">Fully insured &amp; locally owned</p>
                <p className="text-slate1-600">
                  {site.address.city}, {site.address.region} •{" "}
                  {site.address.postalCode}
                </p>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 -left-6 hidden rounded-xl bg-white p-4 text-navy-900 shadow-cardHover sm:block">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky2-100 text-sky2-700">
                <Home className="h-5 w-5" />
              </span>
              <div>
                <p className="text-2xl font-bold leading-none">200+</p>
                <p className="text-xs font-medium text-slate1-600">
                  Buildings on base
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
