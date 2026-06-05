import type {
  AboutContent,
  ProcessStep,
  Project,
  Service,
  SiteConfig,
  Testimonial,
} from "@portfolio/shared";
import {
  getAboutContent,
  getAllProjects,
  getFeaturedProjects,
  getProcessSteps,
  getProjectBySlug,
  getProjectSlugs,
  getServices,
  getSiteConfig,
  getTestimonials,
} from "./content";

export async function fetchSiteConfig(): Promise<SiteConfig> {
  return getSiteConfig();
}

export async function fetchServices(): Promise<Service[]> {
  return getServices();
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  return getTestimonials();
}

export async function fetchProcessSteps(): Promise<ProcessStep[]> {
  return getProcessSteps();
}

export async function fetchAboutContent(): Promise<AboutContent> {
  return getAboutContent();
}

export async function fetchAllProjects(): Promise<Project[]> {
  return getAllProjects();
}

export async function fetchFeaturedProjects(): Promise<Project[]> {
  return getFeaturedProjects();
}

export async function fetchProjectBySlug(slug: string): Promise<Project | undefined> {
  return getProjectBySlug(slug);
}

export async function fetchProjectSlugs(): Promise<string[]> {
  return getProjectSlugs();
}
