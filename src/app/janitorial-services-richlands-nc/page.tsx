import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Janitorial Services in Richlands, NC | Schools, Gyms & Facilities",
  description:
    "Daily and nightly janitorial services in Richlands, NC for schools, gyms, hangars, and base buildings. Supervised crews, detailed scopes, dependable results.",
  path: "/janitorial-services-richlands-nc",
});

export default function Page() {
  return <ServicePage slug="janitorial-services" cityName="Richlands, NC" />;
}
