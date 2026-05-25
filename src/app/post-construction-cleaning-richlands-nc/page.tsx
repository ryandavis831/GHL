import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Post-Construction Cleaning in Richlands, NC | Punch-List Ready",
  description:
    "Rough, final, and touch-up post-construction cleaning in Richlands, NC. Hundreds of new builds and remodels delivered punch-list ready for inspections.",
  path: "/post-construction-cleaning-richlands-nc",
});

export default function Page() {
  return (
    <ServicePage slug="post-construction-cleaning" cityName="Richlands, NC" />
  );
}
