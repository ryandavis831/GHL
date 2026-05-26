import { Phone, ShieldCheck, Award, Building2 } from "lucide-react";
import { site } from "@/lib/site";
import QuoteButton from "@/components/QuoteButton";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 text-white min-h-[560px] sm:min-h-[620px] lg:min-h-[720px]">
      {/* Background image layer */}
      <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
        <picture>
          <source
            srcSet="/assets/brand/hero-commercial.webp"
            type="image/webp"
          />
          <img
            src="/assets/brand/hero-commercial.jpg"
            alt=""
            className="hero-image h-full w-full object-cover object-[center_right]"
            loading="eager"
            fetchPriority="high"
            width={1600}
            height={1920}
          />
        </picture>
      </div>

      {/* Navy gradient overlay — strong on the left, transparent on the right */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] hidden lg:block"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,18,40,0) 60%, rgba(5,18,40,0.55) 100%), linear-gradient(90deg, rgba(5,18,40,0.92) 0%, rgba(5,18,40,0.85) 30%, rgba(5,18,40,0.65) 55%, rgba(5,18,40,0.35) 80%, rgba(5,18,40,0.15) 100%)",
        }}
      />
      {/* Mobile / tablet overlay — darker overall for readability */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] lg:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,18,40,0) 50%, rgba(5,18,40,0.6) 100%), linear-gradient(90deg, rgba(5,18,40,0.92) 0%, rgba(5,18,40,0.88) 50%, rgba(5,18,40,0.62) 100%)",
        }}
      />

      {/* Dot pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.45) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Content */}
      <div className="container-wide relative z-[3] flex min-h-[inherit] items-center py-24 sm:py-28 lg:py-36">
        <div className="max-w-[620px]">
          <span className="eyebrow-dark">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
            Serving Eastern NC since {site.founded}
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-[3.625rem]">
            Professional Commercial &amp; Residential Cleaning in{" "}
            <span className="text-sky2-300">Richlands, NC</span>
          </h1>
          <p className="mt-4 max-w-[520px] text-base leading-relaxed text-slate1-200 sm:text-lg">
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

          <ul className="mt-8 flex flex-wrap gap-2.5">
            {[
              { icon: Award, strong: "Established", rest: `Since ${site.founded}` },
              { icon: Building2, strong: "200+", rest: "Buildings Maintained" },
              {
                icon: ShieldCheck,
                strong: "Fully Insured",
                rest: "& Locally Owned",
              },
            ].map(({ icon: Icon, strong, rest }) => (
              <li
                key={strong}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-2 text-xs font-semibold text-slate1-200 backdrop-blur"
              >
                <Icon className="h-3.5 w-3.5 shrink-0 text-sky2-300" />
                <span>
                  <strong className="font-bold text-white">{strong}</strong>{" "}
                  {rest}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
