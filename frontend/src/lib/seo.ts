import type { Metadata, Viewport } from "next";
import { fetchSiteConfig } from "./api";
import { DOXA_LOGO_PATH, getLogoUrl } from "./brand";
import { getCanonicalUrl, getOgImageUrl } from "./site-url";

interface BuildMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  openGraphType?: "website" | "article";
}

export async function buildMetadata({
  title,
  description,
  path = "",
  image,
  noIndex = false,
  openGraphType = "website",
}: BuildMetadataOptions = {}): Promise<Metadata> {
  const site = await fetchSiteConfig();
  const pageTitle = title ? `${title} | ${site.name}` : `${site.name} — ${site.tagline}`;
  const pageDescription = description ?? site.description;
  const url = getCanonicalUrl(site.url, path);
  const ogImage = image ? getOgImageUrl(site.url, image) : getOgImageUrl(site.url);
  const logoUrl = getLogoUrl(site.url);
  const twitterHandle = site.twitterHandle?.startsWith("@")
    ? site.twitterHandle
    : site.twitterHandle
      ? `@${site.twitterHandle}`
      : undefined;

  return {
    title: pageTitle,
    description: pageDescription,
    metadataBase: new URL(getCanonicalUrl(site.url, "")),
    alternates: { canonical: url },
    icons: {
      icon: DOXA_LOGO_PATH,
      apple: DOXA_LOGO_PATH,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      siteName: site.name,
      type: openGraphType,
      locale: "en_CA",
      images: [
        { url: ogImage, width: 1200, height: 630, alt: pageTitle },
        { url: logoUrl, width: 260, height: 68, alt: `${site.name} logo` },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [ogImage],
      ...(twitterHandle ? { site: twitterHandle, creator: twitterHandle } : {}),
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export const defaultViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a1a1a",
};
