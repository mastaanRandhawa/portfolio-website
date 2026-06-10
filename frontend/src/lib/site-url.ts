const trailingSlashEnabled = process.env.NEXT_PUBLIC_TRAILING_SLASH === "true";

export function getSiteUrl(configuredUrl: string): string {
  const override = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const base = override && override.length > 0 ? override : configuredUrl;
  return base.replace(/\/$/, "");
}

export function normalizePath(path: string): string {
  if (!path || path === "/") return "";
  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  return withLeadingSlash.replace(/\/+$/, "") || "";
}

export function getCanonicalPath(path: string): string {
  const normalized = normalizePath(path);
  if (!trailingSlashEnabled || normalized === "") {
    return normalized;
  }
  return `${normalized}/`;
}

export function getCanonicalUrl(siteUrl: string, path: string): string {
  return `${getSiteUrl(siteUrl)}${getCanonicalPath(path)}`;
}

export function getOgImageUrl(siteUrl: string, imagePath = "/opengraph-image"): string {
  if (imagePath.startsWith("http")) {
    return imagePath;
  }
  return `${getSiteUrl(siteUrl)}${imagePath.startsWith("/") ? imagePath : `/${imagePath}`}`;
}
