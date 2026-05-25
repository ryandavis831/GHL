import type { Metadata } from "next";
import AreaPage from "@/components/AreaPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Cleaning Services in Jacksonville, NC | Commercial & Residential",
  description:
    "Commercial, janitorial, post-construction, and residential cleaning in Jacksonville, NC. Experienced with Camp Lejeune and MCAS New River facilities.",
  path: "/cleaning-services-jacksonville-nc",
});

export default function Page() {
  return <AreaPage slug="jacksonville-nc" />;
}
