import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import PageHero from "@/components/PageHero";
import QuoteForm from "@/components/QuoteForm";
import FinalCTA from "@/components/FinalCTA";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, cleaningServiceSchema } from "@/lib/seo";
import { areas, services, site } from "@/lib/site";

export default function AreaPage({
  slug,
}: {
  slug: (typeof areas)[number]["slug"];
}) {
  const area = areas.find((a) => a.slug === slug)!;
  const otherAreas = areas.filter((a) => a.slug !== slug);

  return (
    <>
      <PageHero
        eyebrow="Service Area"
        title={`Cleaning Services in ${area.name}`}
        subtitle={area.blurb}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Service Areas", href: "/service-areas" },
          { label: area.name },
        ]}
      />

      <section className="section bg-white">
        <div className="container-wide grid items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-3xl font-bold text-navy-900">
              Your local cleaning team in {area.name}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate1-700">
              {area.description}
            </p>

            <h3 className="mt-10 text-xl font-semibold text-navy-900">
              What we cover in {area.shortName}
            </h3>
            <ul className="mt-4 space-y-3">
              {area.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-3 text-base text-navy-800"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-green" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <h3 className="mt-10 text-xl font-semibold text-navy-900">
              Services available in {area.shortName}
            </h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={s.url}
                  className="group flex items-center justify-between rounded-xl border border-navy-100 bg-white px-4 py-3 text-sm font-semibold text-navy-900 transition hover:border-sky2-400 hover:shadow-card"
                >
                  <span>{s.name}</span>
                  <ArrowRight className="h-4 w-4 text-sky2-600 transition group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-navy-900">
                Request {area.shortName} pricing
              </h3>
              <p className="mt-2 text-sm text-slate1-600">
                Tell us about your space and we&apos;ll send a fast, free
                estimate with scheduling options.
              </p>
              <div className="mt-5 flex flex-col gap-2">
                <Link href="/contact" className="btn-primary w-full">
                  Book Cleaning Now
                </Link>
                <a
                  href={`tel:${site.phoneRaw}`}
                  className="btn-outline w-full"
                >
                  Call {site.phone}
                </a>
              </div>

              <hr className="my-6 border-navy-100" />

              <h4 className="text-sm font-semibold uppercase tracking-wider text-navy-700">
                Other Service Areas
              </h4>
              <ul className="mt-3 space-y-1.5">
                {otherAreas.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={a.url}
                      className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm text-navy-800 hover:bg-slate1-50"
                    >
                      <span className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-sky2-600" />
                        {a.name}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-slate1-400" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <QuoteForm />
      <FinalCTA />

      <JsonLd
        data={cleaningServiceSchema({
          name: `Cleaning Services in ${area.name}`,
          description: area.description,
          url: `${site.url}${area.url}`,
          serviceType: "Cleaning Services",
          areaServed: [area.name],
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Service Areas", url: "/service-areas" },
          { name: area.name, url: area.url },
        ])}
      />
    </>
  );
}
