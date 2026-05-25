import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ClientsHighlight from "@/components/ClientsHighlight";
import ClientsSlider from "@/components/ClientsSlider";
import FinalCTA from "@/components/FinalCTA";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Our Clients | Trusted Cleaning Across Eastern NC",
  description:
    "From Tractor Supply, Wendy's, and Dunkin' Donuts to military base buildings, schools, and gyms — see who trusts Carolina Commercial Cleaning Services Inc.",
  path: "/clients",
});

export default function ClientsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Clients"
        title="Trusted by businesses, facilities, and homeowners across Eastern North Carolina."
        subtitle="Hundreds of jobs across restaurants, retail, government, gyms, schools, hangars, and military base buildings."
        crumbs={[{ label: "Home", href: "/" }, { label: "Clients" }]}
      />
      <ClientsSlider />
      <ClientsHighlight />
      <FinalCTA />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Clients", url: "/clients" },
        ])}
      />
    </>
  );
}
