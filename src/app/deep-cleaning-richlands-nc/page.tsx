import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Deep Cleaning in Richlands, NC | Top-to-Bottom Reset",
  description:
    "Detailed deep cleans in Richlands, NC for homes, restaurants, gyms, and commercial spaces. Hand-detailed surfaces, kitchens, baths, and fixtures.",
  path: "/deep-cleaning-richlands-nc",
});

export default function Page() {
  return <ServicePage slug="deep-cleaning" cityName="Richlands, NC" />;
}
