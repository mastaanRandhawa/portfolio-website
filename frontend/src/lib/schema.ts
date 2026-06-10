import {
  getActiveSocialLinks,
  getPostalAddressSchema,
  isContactFieldSet,
} from "./contact";
import { getLogoUrl } from "./brand";
import { getCanonicalUrl } from "./site-url";
import type { Project, Service, SiteConfig, Testimonial } from "./types";

function orgId(site: SiteConfig) {
  return `${getCanonicalUrl(site.url, "")}#organization`;
}

function businessId(site: SiteConfig) {
  return `${getCanonicalUrl(site.url, "")}#localbusiness`;
}

function websiteId(site: SiteConfig) {
  return `${getCanonicalUrl(site.url, "")}#website`;
}

function buildContactFields(site: SiteConfig) {
  const fields: Record<string, unknown> = {};
  if (isContactFieldSet(site.contact.email)) fields.email = site.contact.email;
  if (isContactFieldSet(site.contact.phone)) fields.telephone = site.contact.phone;
  const address = getPostalAddressSchema(site.contact);
  if (address) fields.address = address;
  return fields;
}

export function organizationSchema(site: SiteConfig) {
  const sameAs = getActiveSocialLinks(site.social).map(([, url]) => url);
  return {
    "@type": "Organization",
    "@id": orgId(site),
    name: site.name,
    url: getCanonicalUrl(site.url, ""),
    logo: getLogoUrl(site.url),
    description: site.description,
    ...buildContactFields(site),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function websiteSchema(site: SiteConfig) {
  return {
    "@type": "WebSite",
    "@id": websiteId(site),
    name: site.name,
    url: getCanonicalUrl(site.url, ""),
    description: site.description,
    publisher: { "@id": orgId(site) },
  };
}

export function localBusinessSchema(site: SiteConfig, testimonials: Testimonial[] = []) {
  const avgRating =
    testimonials.length > 0
      ? testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
      : null;

  const schema: Record<string, unknown> = {
    "@type": "LocalBusiness",
    "@id": businessId(site),
    name: site.name,
    url: getCanonicalUrl(site.url, ""),
    description: site.description,
    image: getLogoUrl(site.url),
    ...buildContactFields(site),
    ...(site.serviceArea?.length
      ? { areaServed: site.serviceArea.map((area) => ({ "@type": "Place", name: area })) }
      : {}),
    ...(isContactFieldSet(site.contact.businessHours)
      ? { openingHours: site.contact.businessHours }
      : {}),
  };

  if (avgRating !== null && testimonials.length > 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: avgRating.toFixed(1),
      reviewCount: testimonials.length,
      bestRating: 5,
    };
    schema.review = testimonials.map((testimonial) => reviewSchema(testimonial));
  }

  return schema;
}

export function webPageSchema(
  site: SiteConfig,
  { name, description, path }: { name: string; description: string; path: string },
) {
  return {
    "@type": "WebPage",
    "@id": `${getCanonicalUrl(site.url, path)}#webpage`,
    url: getCanonicalUrl(site.url, path),
    name,
    description,
    isPartOf: { "@id": websiteId(site) },
    about: { "@id": orgId(site) },
  };
}

export function breadcrumbSchema(
  site: SiteConfig,
  items: { name: string; path: string }[],
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(site.url, item.path),
    })),
  };
}

export function serviceSchema(service: Service, site: SiteConfig) {
  return {
    "@type": "Service",
    name: service.title,
    description: service.shortDescription,
    provider: { "@id": orgId(site) },
    areaServed: site.serviceArea?.map((area) => ({ "@type": "Place", name: area })),
    url: getCanonicalUrl(site.url, `/services#${service.id}`),
  };
}

export function projectSchema(project: Project, site: SiteConfig) {
  return {
    "@type": "CreativeWork",
    name: project.title,
    description: project.shortDescription,
    url: getCanonicalUrl(site.url, `/portfolio/${project.slug}`),
    image: project.thumbnail,
    keywords: project.technologies.join(", "),
    creator: { "@id": orgId(site) },
  };
}

export function reviewSchema(testimonial: Testimonial) {
  return {
    "@type": "Review",
    author: {
      "@type": "Person",
      name: testimonial.name,
      jobTitle: testimonial.role,
      worksFor: { "@type": "Organization", name: testimonial.company },
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: testimonial.rating,
      bestRating: 5,
    },
    reviewBody: testimonial.review,
  };
}

export function buildGlobalSchemaGraph(site: SiteConfig) {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(site), websiteSchema(site), localBusinessSchema(site)],
  };
}

export function buildHomeSchemaGraph(site: SiteConfig, testimonials: Testimonial[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      localBusinessSchema(site, testimonials),
      webPageSchema(site, {
        name: `${site.name} — ${site.tagline}`,
        description: site.description,
        path: "",
      }),
    ],
  };
}

export function buildPageSchemaGraph(
  site: SiteConfig,
  {
    name,
    description,
    path,
    breadcrumbs,
    extra = [],
  }: {
    name: string;
    description: string;
    path: string;
    breadcrumbs?: { name: string; path: string }[];
    extra?: Record<string, unknown>[];
  },
) {
  const graph: Record<string, unknown>[] = [
    webPageSchema(site, { name, description, path }),
  ];

  if (breadcrumbs?.length) {
    graph.push(breadcrumbSchema(site, breadcrumbs));
  }

  graph.push(...extra);

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

/** @deprecated Use buildHomeSchemaGraph instead */
export function aggregateRatingSchema(site: SiteConfig, testimonials: Testimonial[]) {
  return localBusinessSchema(site, testimonials);
}

export function jsonLdScript(data: Record<string, unknown> | Record<string, unknown>[]) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
