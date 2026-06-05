import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectsHoverSlider } from "./projects-hover-slider";
import type { Project } from "@/lib/types";

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  return (
    <section className="gallery-section" aria-labelledby="featured-projects-heading">
      <div className="gallery-container">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end sm:gap-10">
          <div className="max-w-2xl">
            <p className="gallery-label mb-6">Selected Work</p>
            <h2 id="featured-projects-heading" className="gallery-heading">
              Featured Projects
            </h2>
            <p className="gallery-prose mt-8">
              Explore our latest work across industries — each project crafted for performance and conversions.
            </p>
          </div>
          <Link href="/portfolio" className="gallery-link shrink-0">
            View All
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-12 sm:mt-20">
          <ProjectsHoverSlider projects={projects.slice(0, 6)} />
        </div>
      </div>
    </section>
  );
}
