import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Commercial Cleaning in Richlands, NC | Carolina Commercial Cleaning",
  description:
    "Reliable, fully-insured commercial cleaning for offices, retail, restaurants, and facilities in Richlands, NC. Locally owned since 2006. Free quotes.",
  path: "/commercial-cleaning-richlands-nc",
});

export default function Page() {
  return <ServicePage slug="commercial-cleaning" cityName="Richlands, NC" />;
}
