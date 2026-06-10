export const DOXA_LOGO_PATH = "/icon.svg";

export function getLogoUrl(siteUrl: string): string {
  return `${siteUrl.replace(/\/$/, "")}${DOXA_LOGO_PATH}`;
}
