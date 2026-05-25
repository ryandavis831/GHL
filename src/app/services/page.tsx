import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ServicesPreview from "@/components/ServicesPreview";
import FinalCTA from "@/components/FinalCTA";
import QuoteForm from "@/components/QuoteForm";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Cleaning Services in Richlands, NC | Commercial, Janitorial, Residential",
  description:
    "Explore our full range of cleaning services — commercial, janitorial, post-construction, residential, and deep cleaning across Eastern North Carolina.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Cleaning services built for every kind of space."
        subtitle="One trusted local team. Commercial, janitorial, post-construction, residential, and deep cleaning — across Eastern North Carolina."
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />
      <ServicesPreview />
      <QuoteForm />
      <FinalCTA />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
        ])}
      />
    </>
  );
}
