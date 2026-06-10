import type { MetadataRoute } from "next";
import { fetchSiteConfig } from "@/lib/api";
import { DOXA_LOGO_PATH } from "@/lib/brand";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const site = await fetchSiteConfig();

  return {
    name: site.name,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#faf9f7",
    theme_color: "#1a1a1a",
    icons: [
      {
        src: DOXA_LOGO_PATH,
        sizes: "260x68",
        type: "image/svg+xml",
      },
    ],
  };
}
