import Image from "next/image";
import { site } from "@/lib/site";
import PawIcon from "./PawIcon";
import QuoteCTA from "./QuoteCTA";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-24">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/brand/hero-cover.png"
          alt="Bright, freshly cleaned Charleston home — Summers Cleaning all-natural service"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Soft white + blue wash for readability without darkening */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/70 to-white/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-brand-aquaMist/40 to-white/40 mix-blend-lighten" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(63,184,210,0.18),transparent_60%)]" />
      </div>

      {/* Watermark logo - integrated, subtle */}
      <div
        className="pointer-events-none absolute right-[-5%] sm:right-[2%] lg:right-[6%] top-[55%] sm:top-1/2 -translate-y-1/2 opacity-[0.07] sm:opacity-[0.10] lg:opacity-[0.12]"
        aria-hidden="true"
      >
        <div className="relative h-[280px] w-[280px] sm:h-[420px] sm:w-[420px] lg:h-[540px] lg:w-[540px]">
          <Image
            src="/assets/logo/logo.png"
            alt=""
            fill
            sizes="(min-width: 1024px) 540px, (min-width: 640px) 420px, 280px"
            className="object-contain"
          />
        </div>
      </div>

      {/* Decorative accents */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand-aqua/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -right-24 h-72 w-72 rounded-full bg-brand-gold/15 blur-3xl" />

      <div className="container-wide relative">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 text-xs font-bold tracking-wider uppercase text-brand-aquaDeep shadow-card ring-1 ring-brand-aqua/20">
            <span className="inline-block h-2 w-2 rounded-full bg-brand-aqua animate-pulse" />
            Charleston, SC · Owned by Summer
          </div>

          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] text-brand-navy">
            All-Natural{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-brand-aquaDeep">Cleaning Services</span>
              <span className="absolute inset-x-0 bottom-1 h-3 bg-brand-gold/40 -z-0 rounded-sm" />
            </span>{" "}
            in Charleston, SC
          </h1>

          <p className="mt-5 text-lg text-brand-navy/80 max-w-xl leading-relaxed">
            Hi, I&apos;m{" "}
            <strong className="text-brand-navy">Summer</strong>
            <span className="text-brand-slate"> — the owner and cleaner behind every job.</span>{" "}
            I provide professional residential and commercial cleaning using{" "}
            <strong className="text-brand-aquaDeep">pet-friendly, all-natural products</strong> that leave
            your home with <strong className="text-brand-aquaDeep">Clean Fresh Vibes</strong>.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <QuoteCTA className="btn-primary">
              Get a Free Quote
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </QuoteCTA>
            <a href={`tel:${site.phoneTel}`} className="btn-outline bg-white/80 backdrop-blur-sm">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1.05.37 2.08.72 3.06a2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 6 6l2.02-2.29a2 2 0 0 1 2.11-.45c.98.35 2.01.59 3.06.72A2 2 0 0 1 22 16.92z" />
              </svg>
              Call {site.phone}
            </a>
          </div>

          {/* Integrated badges */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-3 rounded-full bg-white/90 backdrop-blur-sm px-4 py-2.5 ring-1 ring-brand-aqua/20 shadow-card">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-aquaMist text-brand-aquaDeep">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 3c-9 0-15 6-15 14 0 1.4.4 2.7 1 4 1.3-.6 2.6-1 4-1 8 0 14-6 14-15-1.3.3-2.7.5-4 .5z" />
                </svg>
              </span>
              <span className="text-sm font-bold text-brand-navy">All-Natural</span>
            </div>

            <div className="inline-flex items-center gap-3 rounded-full bg-white/90 backdrop-blur-sm px-4 py-2.5 ring-1 ring-brand-gold/30 shadow-card">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-gold/20 text-amber-700">
                <PawIcon className="h-4 w-4" />
              </span>
              <span className="text-sm font-bold text-brand-navy">Pet-Friendly</span>
            </div>

            <div className="inline-flex items-center gap-3 rounded-full bg-brand-gold/95 backdrop-blur-sm px-4 py-2.5 ring-1 ring-brand-gold shadow-gold">
              <PawIcon className="h-4 w-4 text-brand-navy" />
              <span className="text-sm font-bold text-brand-navy">10% Off for Pet Owners</span>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-6 text-sm">
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
            <div className="flex items-center gap-2 text-brand-navy/80">
              <svg className="h-4 w-4 text-brand-aquaDeep" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Lowcountry locally owned
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
