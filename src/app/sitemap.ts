import type { MetadataRoute } from "next";
import { getSiteConfig, getProjectSlugs } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteConfig();
  const baseUrl = site.url;

  const staticRoutes = [
    "",
    "/portfolio",
    "/services",
    "/about",
    "/process",
    "/testimonials",
    "/contact",
    "/book-consultation",
    "/privacy",
    "/terms",
  ];

  const projectRoutes = getProjectSlugs().map((slug) => `/portfolio/${slug}`);

  return [...staticRoutes, ...projectRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
    priority: route === "" ? 1 : route.startsWith("/portfolio/") ? 0.8 : 0.7,
  }));
}
