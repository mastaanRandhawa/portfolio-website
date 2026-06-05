import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectsHoverSlider } from "./projects-hover-slider";
import type { Project } from "@/lib/types";

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  return (
    <section className="gallery-section" aria-labelledby="featured-projects-heading">
      <div className="gallery-container">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <div className="max-w-2xl">
            <p className="gallery-label mb-3 sm:mb-4">Selected Work</p>
            <h2 id="featured-projects-heading" className="gallery-heading">
              Featured Projects
            </h2>
            <p className="gallery-prose mt-4 sm:mt-6">
              Explore our latest work across industries — each project crafted for performance and conversions.
            </p>
          </div>
          <Link href="/portfolio" className="gallery-link hidden shrink-0 sm:inline-flex">
            View All
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-6 sm:mt-10">
          <ProjectsHoverSlider projects={projects.slice(0, 6)} />
        </div>

        <Link href="/portfolio" className="gallery-link mt-6 sm:hidden">
          View All
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}
