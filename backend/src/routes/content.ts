import { Hono } from "hono";
import {
  getAboutContent,
  getAllProjects,
  getFeaturedProjects,
  getProcessSteps,
  getProjectBySlug,
  getServices,
  getSiteConfig,
  getTestimonials,
} from "../lib/content.js";

export const contentRoutes = new Hono();

contentRoutes.get("/api/site", (c) => c.json(getSiteConfig()));
contentRoutes.get("/api/services", (c) => c.json(getServices()));
contentRoutes.get("/api/testimonials", (c) => c.json(getTestimonials()));
contentRoutes.get("/api/about", (c) => c.json(getAboutContent()));
contentRoutes.get("/api/process", (c) => c.json(getProcessSteps()));

contentRoutes.get("/api/projects", (c) => {
  const featured = c.req.query("featured");
  const projects = featured === "true" ? getFeaturedProjects() : getAllProjects();
  return c.json(projects);
});

contentRoutes.get("/api/projects/:slug", (c) => {
  const slug = c.req.param("slug");
  const project = getProjectBySlug(slug);
  if (!project) {
    return c.json({ error: "Project not found" }, 404);
  }
  return c.json(project);
});
