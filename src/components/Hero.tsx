import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import PawIcon from "./PawIcon";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-wash pt-28 pb-16 sm:pt-36 sm:pb-24">
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand-aqua/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-brand-gold/20 blur-3xl" />

      <div className="container-wide relative grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold tracking-wider uppercase text-brand-aquaDeep shadow-card ring-1 ring-brand-aqua/20">
            <span className="inline-block h-2 w-2 rounded-full bg-brand-aqua animate-pulse" />
            Charleston, SC · Locally Owned by Summer
          </div>

          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] text-brand-navy">
            All-Natural{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-brand-aquaDeep">Cleaning Services</span>
              <span className="absolute inset-x-0 bottom-1 h-3 bg-brand-gold/40 -z-0 rounded-sm" />
            </span>{" "}
            in Charleston, SC
          </h1>

          <p className="mt-5 text-lg text-brand-slate max-w-xl leading-relaxed">
            Professional residential and commercial cleaning by{" "}
            <strong className="text-brand-navy">Summer</strong>, using pet-friendly,
            all-natural products that leave your home with{" "}
            <strong className="text-brand-aquaDeep">Clean Fresh Vibes</strong>.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">
              Get a Free Quote
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <a href={`tel:${site.phoneTel}`} className="btn-outline">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1.05.37 2.08.72 3.06a2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 6 6l2.02-2.29a2 2 0 0 1 2.11-.45c.98.35 2.01.59 3.06.72A2 2 0 0 1 22 16.92z" />
              </svg>
              Call {site.phone}
            </a>
          </div>

          <div className="mt-7 inline-flex items-center gap-3 rounded-2xl bg-brand-gold/15 px-4 py-3 ring-1 ring-brand-gold/40">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-gold text-brand-navy">
              <PawIcon className="h-5 w-5" />
            </span>
            <div className="text-sm">
              <div className="font-bold text-brand-navy">10% Off for Pet Owners</div>
              <div className="text-brand-slate">Safe for cats, dogs &amp; the whole family.</div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg key={i} className="h-4 w-4 text-brand-gold" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
                  </svg>
                ))}
              </div>
              <span className="font-semibold text-brand-navy">5.0 Star Rated</span>
            </div>
            <div className="flex items-center gap-2 text-brand-slate">
              <svg className="h-4 w-4 text-brand-aquaDeep" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Lowcountry locally owned
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] sm:aspect-[5/6] w-full max-w-lg mx-auto">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-brand-aqua/30 via-transparent to-brand-gold/20 blur-2xl" />
            <div className="relative h-full w-full rounded-[2rem] overflow-hidden shadow-soft ring-1 ring-white/60">
              <Image
                src="/assets/brand/hero-cover.png"
                alt="Bright, freshly cleaned Charleston home with Summers Cleaning logo"
                fill
                sizes="(min-width: 1024px) 520px, 90vw"
                className="object-cover"
                priority
              />
            </div>

            {/* floating badge */}
            <div className="absolute -left-4 sm:-left-8 bottom-8 rounded-2xl bg-white/95 backdrop-blur-md px-4 py-3 shadow-soft ring-1 ring-brand-navy/5 animate-floaty">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-aquaMist text-brand-aquaDeep">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L9 7H4l4 3-1.5 6L12 13l5.5 3L16 10l4-3h-5z" />
                  </svg>
                </span>
                <div className="text-sm leading-tight">
                  <div className="font-bold text-brand-navy">All-Natural</div>
                  <div className="text-brand-slate text-xs">Plant-based · Non-toxic</div>
                </div>
              </div>
            </div>

            <div className="absolute -right-3 sm:-right-6 top-10 rounded-2xl bg-white/95 backdrop-blur-md px-4 py-3 shadow-soft ring-1 ring-brand-navy/5">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-gold/20 text-amber-700">
                  <PawIcon className="h-5 w-5" />
                </span>
                <div className="text-sm leading-tight">
                  <div className="font-bold text-brand-navy">Pet Safe</div>
                  <div className="text-brand-slate text-xs">Cats &amp; dogs approved</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
