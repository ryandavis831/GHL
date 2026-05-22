import Image from "next/image";
import { site } from "@/lib/site";
import PawIcon from "./PawIcon";
import QuoteCTA from "./QuoteCTA";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Full-bleed kitchen background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/brand/hero-kitchen.png"
          alt="Bright, freshly cleaned Charleston kitchen by Summers Cleaning"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Soft white fade from the left where the text sits, clear toward the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/92 via-white/70 to-transparent" />
        {/* Subtle aqua color wash for personality */}
        <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_15%_45%,rgba(255,255,255,0.55),transparent_70%)]" />
      </div>

      <div className="container-wide relative grid lg:grid-cols-12 gap-8 items-center py-14 sm:py-20 lg:py-24 min-h-[560px] sm:min-h-[620px]">
        <div className="lg:col-span-7 xl:col-span-7 relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-sm px-3 py-1.5 text-xs font-bold tracking-wider uppercase text-brand-aquaDeep shadow-card ring-1 ring-brand-aqua/20">
            <span className="inline-block h-2 w-2 rounded-full bg-brand-aqua animate-pulse" />
            Charleston, SC · Owned &amp; Operated
          </div>

          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] text-brand-navy">
            All-Natural
            <br />
            <span className="text-brand-aquaDeep">Cleaning Services</span>{" "}
            <span className="text-brand-navy">in</span>
            <br />
            Charleston, SC
          </h1>

          <p className="mt-5 text-base sm:text-lg text-brand-navy/85 max-w-xl leading-relaxed">
            Professional residential and commercial cleaning using{" "}
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
            <a href={`tel:${site.phoneTel}`} className="btn-outline bg-white/95 backdrop-blur-sm">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1.05.37 2.08.72 3.06a2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 6 6l2.02-2.29a2 2 0 0 1 2.11-.45c.98.35 2.01.59 3.06.72A2 2 0 0 1 22 16.92z" />
              </svg>
              Call {site.phone}
            </a>
          </div>

          {/* Integrated badges */}
          <div className="mt-7 flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-sm px-3.5 py-1.5 ring-1 ring-brand-aqua/30 shadow-card">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-aquaMist text-brand-aquaDeep">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 3c-9 0-15 6-15 14 0 1.4.4 2.7 1 4 1.3-.6 2.6-1 4-1 8 0 14-6 14-15-1.3.3-2.7.5-4 .5z" />
                </svg>
              </span>
              <span className="text-[13px] font-bold text-brand-navy">All-Natural</span>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-sm px-3.5 py-1.5 ring-1 ring-brand-gold/40 shadow-card">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-gold/25 text-amber-700">
                <PawIcon className="h-3 w-3" />
              </span>
              <span className="text-[13px] font-bold text-brand-navy">Pet-Friendly</span>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-3.5 py-1.5 ring-1 ring-brand-gold shadow-gold">
              <PawIcon className="h-3.5 w-3.5 text-brand-navy" />
              <span className="text-[13px] font-bold text-brand-navy">10% Off for Pet Owners</span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-5 text-sm">
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg key={i} className="h-4 w-4 text-brand-gold" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
                  </svg>
                ))}
              </div>
              <span className="font-semibold text-brand-navy">5.0 Star Rated</span>
            </div>
            <div className="flex items-center gap-1.5 text-brand-navy/85">
              <svg className="h-4 w-4 text-brand-aquaDeep" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Lowcountry locally owned
            </div>
          </div>
        </div>

        {/* Floating logo card */}
        <div className="hidden lg:block lg:col-span-5 xl:col-span-5">
          <div className="relative ml-auto w-fit">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-brand-aqua/30 via-white/20 to-brand-gold/20 blur-2xl" />
            <div className="relative bg-white rounded-3xl shadow-soft ring-1 ring-brand-navy/5 p-6 xl:p-7 w-[260px] xl:w-[300px] animate-floaty">
              <div className="relative h-[180px] xl:h-[210px]">
                <Image
                  src="/assets/logo/logo.png"
                  alt="Summers Cleaning LLC logo"
                  fill
                  sizes="300px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
