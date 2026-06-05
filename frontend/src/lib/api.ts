import type {
  AboutContent,
  ProcessStep,
  Project,
  Service,
  SiteConfig,
  Testimonial,
} from "@portfolio/shared";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    next: { revalidate: false },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${path}: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export function getApiUrl(): string {
  return API_URL;
}

export async function fetchSiteConfig(): Promise<SiteConfig> {
  return apiFetch<SiteConfig>("/api/site");
}

export async function fetchServices(): Promise<Service[]> {
  return apiFetch<Service[]>("/api/services");
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  return apiFetch<Testimonial[]>("/api/testimonials");
}

export async function fetchProcessSteps(): Promise<ProcessStep[]> {
  return apiFetch<ProcessStep[]>("/api/process");
}

export async function fetchAboutContent(): Promise<AboutContent> {
  return apiFetch<AboutContent>("/api/about");
}

export async function fetchAllProjects(): Promise<Project[]> {
  return apiFetch<Project[]>("/api/projects");
}

export async function fetchFeaturedProjects(): Promise<Project[]> {
  return apiFetch<Project[]>("/api/projects?featured=true");
}

export async function fetchProjectBySlug(slug: string): Promise<Project | undefined> {
  const res = await fetch(`${API_URL}/api/projects/${slug}`, {
    next: { revalidate: false },
  });
  if (res.status === 404) return undefined;
  if (!res.ok) throw new Error(`Failed to fetch project ${slug}: ${res.status}`);
  return res.json() as Promise<Project>;
}

export async function fetchProjectSlugs(): Promise<string[]> {
  const projects = await fetchAllProjects();
  return projects.map((p) => p.slug);
}
