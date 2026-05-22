import Image from "next/image";
import { site } from "@/lib/site";
import PawIcon from "./PawIcon";
import QuoteCTA from "./QuoteCTA";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Branded kitchen background (logo already imprinted on the right) */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/brand/hero-branded.png"
          alt="Branded Summers Cleaning kitchen — bright, freshly cleaned home in Charleston, SC"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Strong readability wash on the left where the text sits.
            The gradient stops well before the logo on the right side. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.95) 35%, rgba(255,255,255,0.6) 55%, rgba(255,255,255,0) 72%)",
          }}
        />
        {/* Cool aqua text-panel tint behind the headline only */}
        <div className="absolute inset-0 bg-[radial-gradient(55%_70%_at_22%_45%,rgba(226,242,247,0.85),transparent_75%)]" />
        {/* Soft top/bottom polish */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-aquaMist/20 via-transparent to-brand-aquaMist/15" />
      </div>

      <div className="container-wide relative grid lg:grid-cols-12 gap-8 items-center py-14 sm:py-20 lg:py-24 min-h-[560px] sm:min-h-[620px]">
        {/* Content column — kept narrower so the right side stays clear for the imprinted logo */}
        <div className="lg:col-span-7 xl:col-span-6 relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-sm px-3 py-1.5 text-xs font-bold tracking-wider uppercase text-brand-aquaDeep shadow-card ring-1 ring-brand-aqua/20">
            <span className="inline-block h-2 w-2 rounded-full bg-brand-aqua animate-pulse" />
            Charleston, SC · Owned &amp; Operated
          </div>

          <h1
            className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] text-brand-navyDeep"
            style={{ textShadow: "0 1px 0 rgba(255,255,255,0.85)" }}
          >
            All-Natural
            <br />
            <span className="text-brand-aquaDeep">Cleaning Services</span>{" "}
            <span className="text-brand-navyDeep">in</span>
            <br />
            Charleston, SC
          </h1>

          <p
            className="mt-5 text-base sm:text-lg text-brand-navyDeep/90 max-w-xl leading-relaxed font-medium"
            style={{ textShadow: "0 1px 0 rgba(255,255,255,0.7)" }}
          >
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

        {/* Right side stays empty so the logo imprinted in the image remains visible and unobstructed */}
        <div className="hidden lg:block lg:col-span-5 xl:col-span-6" aria-hidden="true" />
      </div>
    </section>
  );
}
