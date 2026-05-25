import type { MetadataRoute } from "next";
import { areas, services, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticUrls: MetadataRoute.Sitemap = [
    "/",
    "/about",
    "/services",
    "/service-areas",
    "/clients",
    "/contact",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));

  const serviceUrls: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${site.url}${s.url}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const areaUrls: MetadataRoute.Sitemap = areas.map((a) => ({
    url: `${site.url}${a.url}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [...staticUrls, ...serviceUrls, ...areaUrls];
}
