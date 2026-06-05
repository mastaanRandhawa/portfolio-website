import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type {
  AboutContent,
  ProcessStep,
  Project,
  ProjectFilters,
  Service,
  SiteConfig,
  Testimonial,
} from "./types";

const contentDir = path.join(process.cwd(), "content");
const projectsDir = path.join(contentDir, "projects");

function readJson<T>(filename: string): T {
  const filePath = path.join(contentDir, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

function parseProjectContent(content: string, data: Record<string, unknown>): Project {
  const sections = content.split(/^## /m).filter(Boolean);
  const getSection = (name: string) => {
    const section = sections.find((s) => s.startsWith(name));
    return section ? section.replace(`${name}\n`, "").trim() : "";
  };

  return {
    slug: data.slug as string,
    title: data.title as string,
    industry: data.industry as string,
    projectType: data.projectType as string,
    technologies: data.technologies as string[],
    featured: data.featured as boolean,
    liveUrl: data.liveUrl as string,
    thumbnail: data.thumbnail as string,
    shortDescription: data.shortDescription as string,
    gallery: data.gallery as Project["gallery"],
    results: data.results as Project["results"],
    overview: getSection("Overview"),
    challenge: getSection("Challenge"),
    solution: getSection("Solution"),
  };
}

export function getSiteConfig(): SiteConfig {
  return readJson<SiteConfig>("site.json");
}

export function getServices(): Service[] {
  return readJson<Service[]>("services.json");
}

export function getTestimonials(): Testimonial[] {
  return readJson<Testimonial[]>("testimonials.json");
}

export function getFeaturedTestimonials(): Testimonial[] {
  return getTestimonials().filter((t) => t.featured);
}

export function getProcessSteps(): ProcessStep[] {
  return readJson<ProcessStep[]>("process.json");
}

export function getAboutContent(): AboutContent {
  return readJson<AboutContent>("about.json");
}

export function getAllProjects(): Project[] {
  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith(".md"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(projectsDir, file), "utf-8");
      const { data, content } = matter(raw);
      return parseProjectContent(content, data as Record<string, unknown>);
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured);
}

export function getProjectSlugs(): string[] {
  return getAllProjects().map((p) => p.slug);
}

export function filterProjects(filters: ProjectFilters): Project[] {
  return getAllProjects().filter((project) => {
    if (filters.industry && filters.industry !== "all" && project.industry !== filters.industry) {
      return false;
    }
    if (filters.projectType && filters.projectType !== "all" && project.projectType !== filters.projectType) {
      return false;
    }
    if (filters.technology && filters.technology !== "all" && !project.technologies.includes(filters.technology)) {
      return false;
    }
    return true;
  });
}

export function getFilterOptions() {
  const projects = getAllProjects();
  const industries = [...new Set(projects.map((p) => p.industry))].sort();
  const projectTypes = [...new Set(projects.map((p) => p.projectType))].sort();
  const technologies = [...new Set(projects.flatMap((p) => p.technologies))].sort();
  return { industries, projectTypes, technologies };
}
