import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ServiceAreasPreview from "@/components/ServiceAreasPreview";
import FinalCTA from "@/components/FinalCTA";
import QuoteForm from "@/components/QuoteForm";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Service Areas | Cleaning in Richlands, Jacksonville & Onslow County, NC",
  description:
    "Carolina Commercial Cleaning Services Inc serves Richlands, Jacksonville, Onslow County, and Sneads Ferry, NC with commercial and residential cleaning.",
  path: "/service-areas",
});

export default function ServiceAreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Service Areas"
        title="Serving Richlands &amp; Eastern North Carolina."
        subtitle="Local crews, local routes, and dependable scheduling across Onslow County and beyond."
        crumbs={[{ label: "Home", href: "/" }, { label: "Service Areas" }]}
      />
      <ServiceAreasPreview />
      <QuoteForm />
      <FinalCTA />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Service Areas", url: "/service-areas" },
        ])}
      />
    </>
  );
}
