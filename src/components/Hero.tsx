import { Phone, ShieldCheck, Award } from "lucide-react";
import { site } from "@/lib/site";
import QuoteButton from "@/components/QuoteButton";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-radial text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.45) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="container-wide relative grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-12 lg:py-28">
        <div className="lg:col-span-6 xl:col-span-5">
          <span className="eyebrow-dark">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
            Serving Eastern NC since {site.founded}
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-[3.5rem]">
            Professional Commercial &amp; Residential Cleaning in{" "}
            <span className="text-sky2-300">Richlands, NC</span>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate1-200 sm:text-lg">
            {site.name} has provided dependable janitorial, post-construction,
            commercial, and residential cleaning services since {site.founded}.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <QuoteButton variant="secondary">Book Cleaning Now</QuoteButton>
            <a href={`tel:${site.phoneRaw}`} className="btn-ghost-light">
              <Phone className="h-4 w-4" />
              Call {site.phone}
            </a>
          </div>
        </div>

        <div className="relative lg:col-span-6 xl:col-span-7">
          {/*
            HERO IMAGE — commercial cleaning crew + ride-on floor scrubber
            in a modern office lobby. Naturally integrated (no boxed frame),
            with a subtle dark gradient on the LEFT edge to blend into the
            navy hero background and improve text readability on mobile.
            Source: /public/assets/brand/hero-commercial.jpg (+ .webp)
          */}
          <div className="relative overflow-hidden rounded-3xl ring-1 ring-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
            <picture>
              <source
                srcSet="/assets/brand/hero-commercial.webp"
                type="image/webp"
              />
              <img
                src="/assets/brand/hero-commercial.jpg"
                alt="Carolina Commercial Cleaning Services Inc crew operating a ride-on floor scrubber in a modern office lobby"
                className="hero-image aspect-[5/6] w-full object-cover sm:aspect-[4/5] lg:aspect-[6/7]"
                loading="eager"
                width={1600}
                height={1856}
              />
            </picture>

            {/* Left-edge blend overlay (desktop only — keeps mobile image clean) */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 lg:block"
              style={{
                background:
                  "linear-gradient(to right, rgba(6,17,42,0.55) 0%, rgba(6,17,42,0) 100%)",
              }}
            />
            {/* Bottom subtle vignette for depth */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
              style={{
                background:
                  "linear-gradient(to top, rgba(6,17,42,0.4) 0%, rgba(6,17,42,0) 100%)",
              }}
            />
            {/* Soft inner highlight ring */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/[0.08]"
            />
          </div>

          {/* Floating trust cards — only the strongest two, glassmorphic */}
          <div
            className="absolute left-3 top-4 hidden items-center gap-2.5 rounded-xl border border-white/20 bg-navy-950/85 px-3.5 py-2.5 text-white shadow-lg backdrop-blur-md sm:flex lg:left-5 lg:top-6"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky2-500 text-white">
              <Award className="h-[18px] w-[18px]" strokeWidth={2.25} />
            </span>
            <div className="leading-tight">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sky2-200">
                Established
              </p>
              <p className="text-sm font-bold">Since {site.founded}</p>
            </div>
          </div>

          <div className="absolute bottom-4 left-3 right-3 flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/95 px-3.5 py-2.5 text-navy-900 shadow-cardHover backdrop-blur-md sm:right-auto sm:max-w-xs lg:bottom-6 lg:left-5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-green text-white">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold">
                Fully Insured &amp; Locally Owned
              </p>
              <p className="text-xs font-medium text-slate1-600">
                {site.address.city}, {site.address.region} •{" "}
                {site.address.postalCode}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
