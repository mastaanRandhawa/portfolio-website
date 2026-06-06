const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const DOXA_LOGO_PATH = `${basePath}/doxa-logo.svg`;

export function getLogoUrl(siteUrl: string): string {
  return `${siteUrl.replace(/\/$/, "")}${DOXA_LOGO_PATH}`;
}
