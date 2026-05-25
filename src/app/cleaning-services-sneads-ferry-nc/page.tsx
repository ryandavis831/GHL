import type { Metadata } from "next";
import AreaPage from "@/components/AreaPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Cleaning Services in Sneads Ferry, NC | Coastal Homes & Rentals",
  description:
    "Residential, commercial, vacation-rental turn cleans, and deep cleaning in Sneads Ferry, NC. Coastal experience and dependable scheduling year-round.",
  path: "/cleaning-services-sneads-ferry-nc",
});

export default function Page() {
  return <AreaPage slug="sneads-ferry-nc" />;
}
