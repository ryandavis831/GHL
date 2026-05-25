import Link from "next/link";
import { CheckCircle2, ArrowRight, MapPin } from "lucide-react";
import PageHero from "@/components/PageHero";
import QuoteForm from "@/components/QuoteForm";
import FinalCTA from "@/components/FinalCTA";
import JsonLd from "@/components/JsonLd";
import {
  cleaningServiceSchema,
  breadcrumbSchema,
} from "@/lib/seo";
import { areas, services, site } from "@/lib/site";

export default function ServicePage({
  slug,
  cityName,
}: {
  slug: (typeof services)[number]["slug"];
  cityName: string;
}) {
  const service = services.find((s) => s.slug === slug)!;
  const otherServices = services.filter((s) => s.slug !== slug);

  return (
    <>
      <PageHero
        eyebrow={service.shortName}
        title={`${service.name} in ${cityName}`}
        subtitle={service.blurb}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.name },
        ]}
      />

      <section className="section bg-white">
        <div className="container-wide grid items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-3xl font-bold text-navy-900">
              Dependable {service.name.toLowerCase()} for {cityName} &amp; the
              surrounding area
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate1-700">
              {service.description}
            </p>

            <h3 className="mt-10 text-xl font-semibold text-navy-900">
              What&apos;s included
            </h3>
            <ul className="mt-4 space-y-3">
              {service.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 text-base text-navy-800"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-green" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <h3 className="mt-10 text-xl font-semibold text-navy-900">
              Who we serve
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {service.audiences.map((a) => (
                <span
                  key={a}
                  className="rounded-full bg-sky2-50 px-3 py-1.5 text-xs font-semibold text-sky2-700 ring-1 ring-sky2-100"
                >
                  {a}
                </span>
              ))}
            </div>

            <h3 className="mt-10 text-xl font-semibold text-navy-900">
              Why {site.shortName}?
            </h3>
            <p className="mt-3 text-base leading-relaxed text-slate1-700">
              We&apos;ve been serving {cityName} and Eastern North Carolina
              since {site.founded}. From hundreds of homes to over 200
              buildings on local military bases, our crews bring consistent,
              commercial-grade quality to every job — and we back it with
              direct, local communication.
            </p>
          </div>

          <aside className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-navy-900">
                Get a fast, free quote
              </h3>
              <p className="mt-2 text-sm text-slate1-600">
                Tell us about your {service.shortName.toLowerCase()} needs in{" "}
                {cityName} and we&apos;ll respond quickly with pricing and
                scheduling.
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
                Service Areas
              </h4>
              <ul className="mt-3 space-y-1.5">
                {areas.map((a) => (
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

      <section className="bg-soft-blue py-16">
        <div className="container-wide">
          <h2 className="text-2xl font-bold text-navy-900">
            Other cleaning services we offer
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {otherServices.map((s) => (
              <Link key={s.slug} href={s.url} className="card group p-5">
                <h3 className="text-base font-semibold text-navy-900">
                  {s.name}
                </h3>
                <p className="mt-2 text-sm text-slate1-600">{s.tagline}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-sky2-700 group-hover:gap-2">
                  Learn more <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <QuoteForm />
      <FinalCTA />

      <JsonLd
        data={cleaningServiceSchema({
          name: `${service.name} in ${cityName}`,
          description: service.description,
          url: `${site.url}${service.url}`,
          serviceType: service.name,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: service.name, url: service.url },
        ])}
      />
    </>
  );
}
