import {
  getContactVisibility,
  getFormattedAddressLines,
  getFormattedLocation,
  getPhoneHref,
} from "@/lib/contact";
import type { SiteConfig } from "@/lib/types";

interface ContactDetailsProps {
  site: SiteConfig;
  className?: string;
  emailClassName?: string;
  phoneClassName?: string;
  textClassName?: string;
}

export function ContactDetails({
  site,
  className,
  emailClassName,
  phoneClassName,
  textClassName,
}: ContactDetailsProps) {
  const visibility = getContactVisibility(site.contact);
  const location = getFormattedLocation(site.contact);
  const addressLines = getFormattedAddressLines(site.contact);

  if (
    !visibility.email &&
    !visibility.phone &&
    !visibility.location &&
    !visibility.address &&
    !visibility.hours
  ) {
    return null;
  }

  return (
    <ul className={className}>
      {visibility.email && (
        <li>
          <a
            href={`mailto:${site.contact.email}`}
            className={emailClassName}
          >
            {site.contact.email}
          </a>
        </li>
      )}
      {visibility.phone && (
        <li>
          <a href={getPhoneHref(site.contact.phone)} className={phoneClassName}>
            {site.contact.phone}
          </a>
        </li>
      )}
      {visibility.address &&
        addressLines.map((line) => (
          <li key={line} className={textClassName}>
            {line}
          </li>
        ))}
      {!visibility.address && visibility.location && location && (
        <li className={textClassName}>{location}</li>
      )}
      {visibility.hours && (
        <li className={textClassName}>{site.contact.businessHours}</li>
      )}
    </ul>
  );
}
