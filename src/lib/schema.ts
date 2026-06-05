import { getSiteConfig, getTestimonials } from "./content";
import type { Project, Testimonial } from "./types";

export function organizationSchema() {
  const site = getSiteConfig();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    description: site.description,
    email: site.contact.email,
    telephone: site.contact.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.contact.location,
    },
    sameAs: Object.values(site.social),
  };
}

export function websiteSchema() {
  const site = getSiteConfig();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
    publisher: { "@type": "Organization", name: site.name },
  };
}

export function projectSchema(project: Project) {
  const site = getSiteConfig();
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.shortDescription,
    url: `${site.url}/portfolio/${project.slug}`,
    image: project.thumbnail,
    creator: { "@type": "Organization", name: site.name },
  };
}

export function reviewSchema(testimonial: Testimonial) {
  return {
    "@context": "https://schema.org",
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

export function aggregateRatingSchema() {
  const testimonials = getTestimonials();
  const avgRating = testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: getSiteConfig().name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avgRating.toFixed(1),
      reviewCount: testimonials.length,
      bestRating: 5,
    },
  };
}

export function jsonLdScript(data: Record<string, unknown> | Record<string, unknown>[]) {
  return JSON.stringify(data);
}
