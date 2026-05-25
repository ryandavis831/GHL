import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import PageHero from "@/components/PageHero";
import QuoteForm from "@/components/QuoteForm";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact & Book Cleaning Now | Richlands, NC",
  description: `Call ${site.phone} or request a free cleaning quote online. Serving Richlands, Jacksonville, Onslow County, and Sneads Ferry, NC.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="Book your cleaning. Get a free quote."
        subtitle={`Call ${site.phone}, email ${site.email}, or use the form below — we'll respond quickly with pricing and scheduling.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="section bg-soft-blue">
        <div className="container-wide grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Phone,
              title: "Phone",
              value: site.phone,
              href: `tel:${site.phoneRaw}`,
            },
            {
              icon: Mail,
              title: "Email",
              value: site.email,
              href: `mailto:${site.email}`,
            },
            {
              icon: MapPin,
              title: "Location",
              value: `${site.address.city}, ${site.address.region} ${site.address.postalCode}`,
            },
            {
              icon: Clock,
              title: "Hours",
              value: "Mon–Fri 7AM–6PM",
            },
          ].map((c) => {
            const Icon = c.icon;
            const inner = (
              <>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-deep text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate1-500">
                  {c.title}
                </p>
                <p className="mt-1 text-base font-semibold text-navy-900">
                  {c.value}
                </p>
              </>
            );
            return c.href ? (
              <a key={c.title} href={c.href} className="card block p-5">
                {inner}
              </a>
            ) : (
              <div key={c.title} className="card p-5">
                {inner}
              </div>
            );
          })}
        </div>
      </section>

      <QuoteForm />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
        ])}
      />
    </>
  );
}
