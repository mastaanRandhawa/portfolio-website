export interface ProjectResult {
  label: string;
  value: string;
}

export interface ProjectGallery {
  desktop: string[];
  tablet: string[];
  mobile: string[];
}

export interface Project {
  slug: string;
  title: string;
  industry: string;
  projectType: string;
  technologies: string[];
  featured: boolean;
  liveUrl: string;
  thumbnail: string;
  shortDescription: string;
  gallery: ProjectGallery;
  results: ProjectResult[];
  overview: string;
  challenge: string;
  solution: string;
}

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  deliverables: string[];
  process: string[];
  pricingFrom: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  review: string;
  rating: number;
  image: string;
  featured: boolean;
  videoUrl?: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface WhyChooseUsItem {
  title: string;
  description: string;
  icon: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  hero: {
    badge: string;
    headline: string;
    headlineAccent: string;
    subheadline: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  whyChooseUs: WhyChooseUsItem[];
  finalCta: {
    headline: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  contact: {
    email: string;
    phone: string;
    location: string;
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
    businessHours?: string;
  };
  social: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    github?: string;
  };
  serviceArea?: string[];
  twitterHandle?: string;
}

export interface AboutContent {
  introduction: string;
  mission: {
    title: string;
    statement: string;
    values: { title: string; description: string }[];
  };
  skills: {
    frontend: string[];
    backend: string[];
    design: string[];
  };
}
