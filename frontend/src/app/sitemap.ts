import type { MetadataRoute } from "next";
import { fetchSiteConfig, fetchProjectSlugs } from "@/lib/api";
import { getProjectLastModified } from "@/lib/content";
import { getCanonicalUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [site, slugs] = await Promise.all([fetchSiteConfig(), fetchProjectSlugs()]);

  const staticRoutes: { path: string; priority: number; lastModified: Date }[] = [
    { path: "", priority: 1, lastModified: new Date("2026-06-01") },
    { path: "/portfolio", priority: 0.9, lastModified: new Date("2026-06-01") },
    { path: "/services", priority: 0.8, lastModified: new Date("2026-06-01") },
    { path: "/about", priority: 0.7, lastModified: new Date("2026-06-01") },
    { path: "/process", priority: 0.7, lastModified: new Date("2026-06-01") },
    { path: "/contact", priority: 0.8, lastModified: new Date("2026-06-01") },
    { path: "/book-consultation", priority: 0.7, lastModified: new Date("2026-06-01") },
    { path: "/privacy", priority: 0.3, lastModified: new Date("2026-06-01") },
    { path: "/terms", priority: 0.3, lastModified: new Date("2026-06-01") },
  ];

  const projectRoutes = slugs.map((slug) => ({
    path: `/portfolio/${slug}`,
    priority: 0.8,
    lastModified: getProjectLastModified(slug),
  }));

  return [...staticRoutes, ...projectRoutes].map((route) => ({
    url: getCanonicalUrl(site.url, route.path),
    lastModified: route.lastModified,
    changeFrequency: route.path === "" ? ("weekly" as const) : ("monthly" as const),
    priority: route.priority,
  }));
}
