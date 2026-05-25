import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import AboutTeam from "@/components/AboutTeam";
import LegacyBanner from "@/components/LegacyBanner";
import ClientsHighlight from "@/components/ClientsHighlight";
import FinalCTA from "@/components/FinalCTA";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: `About ${site.shortName} | Trusted Cleaning Company Since 2006`,
  description: `${site.name} has served commercial and residential clients across Eastern North Carolina since ${site.founded}. Locally owned, family-rooted, quality-focused.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="A locally-owned cleaning company built on trust and quality."
        subtitle={`Since ${site.founded}, ${site.name} has grown by doing more than customers expect — one happy client at a time.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />
      <LegacyBanner />
      <AboutTeam />
      <ClientsHighlight />
      <FinalCTA />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
        ])}
      />
    </>
  );
}
