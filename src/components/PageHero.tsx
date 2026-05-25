import Link from "next/link";
import { Phone, ChevronRight } from "lucide-react";
import { site } from "@/lib/site";
import QuoteButton from "@/components/QuoteButton";

type Crumb = { label: string; href?: string };

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  crumbs = [],
  prefillService,
  secondaryCta,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
  /** Service to pre-select when the quote modal opens from this hero. */
  prefillService?: string;
  secondaryCta?: { label: string; href: string };
}) {
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
      <div className="container-wide relative py-16 sm:py-20 lg:py-24">
        {crumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="mb-5 flex items-center gap-1 text-xs text-slate1-300"
          >
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1">
                {c.href ? (
                  <Link href={c.href} className="hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-slate1-200">{c.label}</span>
                )}
                {i < crumbs.length - 1 && (
                  <ChevronRight className="h-3 w-3 text-slate1-500" />
                )}
              </span>
            ))}
          </nav>
        )}

        {eyebrow && <span className="eyebrow-dark">{eyebrow}</span>}
        <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate1-200 sm:text-lg">
            {subtitle}
          </p>
        )}

        <div className="mt-7 flex flex-wrap gap-3">
          <QuoteButton variant="secondary" prefillService={prefillService}>
            Book Cleaning Now
          </QuoteButton>
          {secondaryCta ? (
            <Link href={secondaryCta.href} className="btn-ghost-light">
              {secondaryCta.label}
            </Link>
          ) : (
            <a href={`tel:${site.phoneRaw}`} className="btn-ghost-light">
              <Phone className="h-4 w-4" />
              Call {site.phone}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
