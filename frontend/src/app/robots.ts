import type { MetadataRoute } from "next";
import { getSiteConfig } from "@/lib/content";
import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const site = getSiteConfig();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${getSiteUrl(site.url)}/sitemap.xml`,
  };
}
