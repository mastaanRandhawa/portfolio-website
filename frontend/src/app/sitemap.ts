import type { MetadataRoute } from "next";
import { fetchSiteConfig, fetchProjectSlugs } from "@/lib/api";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [site, slugs] = await Promise.all([fetchSiteConfig(), fetchProjectSlugs()]);
  const baseUrl = site.url;

  const staticRoutes = [
    "",
    "/portfolio",
    "/services",
    "/about",
    "/process",
    "/contact",
    "/book-consultation",
    "/privacy",
    "/terms",
  ];

  const projectRoutes = slugs.map((slug) => `/portfolio/${slug}`);

  return [...staticRoutes, ...projectRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
    priority: route === "" ? 1 : route.startsWith("/portfolio/") ? 0.8 : 0.7,
  }));
}
