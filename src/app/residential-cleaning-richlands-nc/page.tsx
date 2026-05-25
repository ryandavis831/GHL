import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Residential Cleaning in Richlands, NC | Weekly, Bi-Weekly & One-Time",
  description:
    "House cleaning in Richlands, NC trusted by hundreds of local families. Weekly, bi-weekly, monthly, move-in / move-out, and one-time service. Free quote.",
  path: "/residential-cleaning-richlands-nc",
});

export default function Page() {
  return <ServicePage slug="residential-cleaning" cityName="Richlands, NC" />;
}
