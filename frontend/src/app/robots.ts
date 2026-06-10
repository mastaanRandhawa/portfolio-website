import type { MetadataRoute } from "next";
import { fetchSiteConfig } from "@/lib/api";
import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const site = await fetchSiteConfig();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${getSiteUrl(site.url)}/sitemap.xml`,
  };
}
