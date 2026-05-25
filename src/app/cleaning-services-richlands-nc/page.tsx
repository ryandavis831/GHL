import type { Metadata } from "next";
import AreaPage from "@/components/AreaPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Cleaning Services in Richlands, NC | Local Crews Since 2006",
  description:
    "Commercial, janitorial, post-construction, and residential cleaning in Richlands, NC (28574). Family-owned, locally-rooted, and trusted since 2006.",
  path: "/cleaning-services-richlands-nc",
});

export default function Page() {
  return <AreaPage slug="richlands-nc" />;
}
