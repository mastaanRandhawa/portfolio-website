import type { MetadataRoute } from "next";
import { getSiteConfig } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  const site = getSiteConfig();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
