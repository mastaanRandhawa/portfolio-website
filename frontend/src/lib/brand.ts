export const DOXA_LOGO_PATH = "/doxa-logo.svg";

export function getLogoUrl(siteUrl: string): string {
  return `${siteUrl.replace(/\/$/, "")}${DOXA_LOGO_PATH}`;
}
