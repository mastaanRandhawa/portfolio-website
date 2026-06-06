import type { Metadata } from "next";
import { fetchSiteConfig } from "./api";
import { DOXA_LOGO_PATH, getLogoUrl } from "./brand";

interface BuildMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

export async function buildMetadata({
  title,
  description,
  path = "",
  image,
  noIndex = false,
}: BuildMetadataOptions = {}): Promise<Metadata> {
  const site = await fetchSiteConfig();
  const pageTitle = title ? `${title} | ${site.name}` : `${site.name} — ${site.tagline}`;
  const pageDescription = description ?? site.description;
  const url = `${site.url}${path}`;
  const ogImage = image ?? "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=630&fit=crop";

  const logoUrl = getLogoUrl(site.url);

  return {
    title: pageTitle,
    description: pageDescription,
    metadataBase: new URL(site.url),
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
      type: "website",
      images: [
        { url: ogImage, width: 1200, height: 630, alt: pageTitle },
        { url: logoUrl, width: 260, height: 160, alt: `${site.name} logo` },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [ogImage],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
