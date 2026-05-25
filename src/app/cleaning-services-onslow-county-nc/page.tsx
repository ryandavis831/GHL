import type { Metadata } from "next";
import AreaPage from "@/components/AreaPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Cleaning Services in Onslow County, NC | County-Wide Coverage",
  description:
    "County-wide commercial, janitorial, post-construction, and residential cleaning across Onslow County, NC. Local routes, local crews, dependable service.",
  path: "/cleaning-services-onslow-county-nc",
});

export default function Page() {
  return <AreaPage slug="onslow-county-nc" />;
}
