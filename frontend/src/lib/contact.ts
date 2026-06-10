import type { SiteConfig } from "./types";

export function isContactFieldSet(value: string | undefined | null): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function getPhoneHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function getFormattedLocation(contact: SiteConfig["contact"]): string | null {
  if (isContactFieldSet(contact.location)) {
    return contact.location;
  }

  const parts = [
    contact.addressLocality,
    contact.addressRegion,
    contact.addressCountry,
  ].filter(isContactFieldSet);

  return parts.length > 0 ? parts.join(", ") : null;
}

export function getFormattedAddressLines(contact: SiteConfig["contact"]): string[] {
  const lines: string[] = [];

  if (isContactFieldSet(contact.streetAddress)) {
    lines.push(contact.streetAddress);
  }

  const cityLine = [
    contact.addressLocality,
    contact.addressRegion,
    contact.postalCode,
  ]
    .filter(isContactFieldSet)
    .join(", ");

  if (cityLine) {
    lines.push(cityLine);
  } else if (isContactFieldSet(contact.location)) {
    lines.push(contact.location);
  }

  if (isContactFieldSet(contact.addressCountry) && contact.addressCountry !== "CA") {
    lines.push(contact.addressCountry);
  }

  return lines;
}

export function getPostalAddressSchema(contact: SiteConfig["contact"]) {
  const address: Record<string, string> = { "@type": "PostalAddress" };

  if (isContactFieldSet(contact.streetAddress)) {
    address.streetAddress = contact.streetAddress;
  }
  if (isContactFieldSet(contact.addressLocality)) {
    address.addressLocality = contact.addressLocality;
  } else if (isContactFieldSet(contact.location)) {
    address.addressLocality = contact.location.split(",")[0]?.trim() ?? contact.location;
  }
  if (isContactFieldSet(contact.addressRegion)) {
    address.addressRegion = contact.addressRegion;
  }
  if (isContactFieldSet(contact.postalCode)) {
    address.postalCode = contact.postalCode;
  }
  if (isContactFieldSet(contact.addressCountry)) {
    address.addressCountry = contact.addressCountry;
  }

  return Object.keys(address).length > 1 ? address : undefined;
}

export function getActiveSocialLinks(social: SiteConfig["social"]) {
  return Object.entries(social).filter((entry): entry is [string, string] =>
    isContactFieldSet(entry[1]),
  );
}

export function getContactVisibility(contact: SiteConfig["contact"]) {
  return {
    email: isContactFieldSet(contact.email),
    phone: isContactFieldSet(contact.phone),
    location: Boolean(getFormattedLocation(contact)),
    address: getFormattedAddressLines(contact).length > 0,
    hours: isContactFieldSet(contact.businessHours),
  };
}
