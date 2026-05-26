import { Phone, ShieldCheck, Award, Building2 } from "lucide-react";
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

      <div className="container-wide relative grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-14 lg:py-28">
        <div className="lg:col-span-5">
          <span className="eyebrow-dark">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
            Serving Eastern NC since {site.founded}
          </span>
          <h1 className="mt-3.5 max-w-[560px] text-4xl font-bold leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-[3.375rem]">
            Professional Commercial &amp; Residential Cleaning in{" "}
            <span className="text-sky2-300">Richlands, NC</span>
          </h1>
          <p className="mt-3.5 max-w-[460px] text-base leading-relaxed text-slate1-200 sm:text-lg">
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

        <div className="relative lg:col-span-7">
          {/* Soft blue depth glow behind the image */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-[6%] -inset-y-[8%] z-0 blur-2xl"
            style={{
              background:
                "radial-gradient(55% 55% at 70% 45%, rgba(59,111,230,0.28) 0%, rgba(59,111,230,0) 70%), radial-gradient(55% 55% at 30% 65%, rgba(133,168,210,0.18) 0%, rgba(133,168,210,0) 70%)",
            }}
          />

          {/*
            HERO IMAGE — commercial cleaning crew + ride-on floor scrubber
            in a modern office lobby. Reduced corner radius and a left-edge
            navy blend so it feels integrated rather than framed.
          */}
          <div className="relative z-[1] overflow-hidden rounded-[20px] ring-1 ring-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
            <picture>
              <source
                srcSet="/assets/brand/hero-commercial.webp"
                type="image/webp"
              />
              <img
                src="/assets/brand/hero-commercial.jpg"
                alt="Carolina Commercial Cleaning Services Inc crew operating a ride-on floor scrubber in a modern office lobby"
                className="hero-image aspect-[4/5] w-full object-cover lg:aspect-[5/6]"
                loading="eager"
                width={1600}
                height={1920}
              />
            </picture>

            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 lg:block"
              style={{
                background:
                  "linear-gradient(to right, rgba(6,17,42,0.55) 0%, rgba(6,17,42,0) 100%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
              style={{
                background:
                  "linear-gradient(to top, rgba(6,17,42,0.4) 0%, rgba(6,17,42,0) 100%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[20px] ring-1 ring-inset ring-white/[0.08]"
            />
          </div>

          {/* Top-left: small "Established" glass badge */}
          <div
            className="absolute left-3 top-3.5 z-[4] hidden items-center gap-2.5 rounded-[10px] border border-white/20 bg-navy-950/55 px-3 py-2 text-white shadow-[0_10px_28px_-10px_rgba(0,0,0,0.4)] backdrop-blur-md backdrop-saturate-150 sm:flex sm:left-4.5 sm:top-4.5"
          >
            <span className="flex h-[30px] w-[30px] items-center justify-center rounded-[7px] bg-sky2-500/85 text-white">
              <Award className="h-[15px] w-[15px]" strokeWidth={2.25} />
            </span>
            <div className="leading-tight">
              <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-sky2-200">
                Established
              </p>
              <p className="mt-0.5 text-[12.5px] font-extrabold">
                Since {site.founded}
              </p>
            </div>
          </div>

          {/* Top-right: "200+ Buildings Maintained" stat pill */}
          <div
            className="absolute right-3 top-3.5 z-[4] hidden items-center gap-2.5 rounded-[10px] border border-white/20 bg-navy-950/55 px-3 py-2 text-white shadow-[0_10px_28px_-10px_rgba(0,0,0,0.4)] backdrop-blur-md backdrop-saturate-150 sm:flex sm:right-4.5 sm:top-4.5"
          >
            <span className="flex h-[30px] w-[30px] items-center justify-center rounded-[7px] bg-accent-green/85 text-white">
              <Building2 className="h-[15px] w-[15px]" strokeWidth={2.25} />
            </span>
            <div className="leading-tight">
              <p className="text-base font-extrabold leading-none tracking-tight">
                200+
              </p>
              <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-sky2-200">
                Buildings Maintained
              </p>
            </div>
          </div>

          {/* Bottom-left: white anchor card */}
          <div className="absolute bottom-3.5 left-3 right-3 z-[4] flex items-center gap-2.5 rounded-[12px] border border-white/40 bg-white/95 px-3.5 py-2.5 text-navy-900 shadow-cardHover backdrop-blur-md sm:bottom-4.5 sm:left-4.5 sm:right-auto sm:max-w-[310px]">
            <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-lg bg-accent-green text-white">
              <ShieldCheck className="h-[17px] w-[17px]" />
            </span>
            <div className="leading-tight">
              <p className="text-[13px] font-extrabold">
                Fully Insured &amp; Locally Owned
              </p>
              <p className="text-[11px] font-medium text-slate1-600">
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
