"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import {
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover,
  useHoverSliderContext,
} from "@/components/ui/animated-slideshow";
import type { Project } from "@/lib/types";

interface ProjectsHoverSliderProps {
  projects: Project[];
  showVisitButton?: boolean;
}

function ProjectImagePanel({ projects }: { projects: Project[] }) {
  return (
    <HoverSliderImageWrap className="relative aspect-[4/5] w-full max-w-full sm:max-w-md lg:max-w-xl lg:shrink-0">
      {projects.map((project, index) => (
        <HoverSliderImage
          key={project.slug}
          index={index}
          imageUrl={project.thumbnail}
          alt={`${project.title} — ${project.industry}`}
          className="portfolio-thumbnail-grade size-full object-cover"
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
        />
      ))}
    </HoverSliderImageWrap>
  );
}

function ActiveProjectDetails({
  projects,
  showVisitButton,
}: {
  projects: Project[];
  showVisitButton: boolean;
}) {
  const { activeSlide } = useHoverSliderContext();
  const project = projects[activeSlide];
  if (!project) return null;

  return (
    <div className="mt-6 max-w-md sm:mt-10">
      <p className="gallery-label">
        {project.industry}
        <span className="mx-3 text-border">·</span>
        {project.projectType}
      </p>
      <p className="gallery-prose mt-4 sm:mt-5">{project.shortDescription}</p>
      <div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8">
        <Link href={`/portfolio/${project.slug}`} className="gallery-link">
          View Project
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
        {showVisitButton && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="gallery-link"
          >
            Live Site
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}

export function ProjectsHoverSlider({
  projects,
  showVisitButton = false,
}: ProjectsHoverSliderProps) {
  if (projects.length === 0) {
    return (
      <p className="gallery-prose py-20 text-center">No projects to display.</p>
    );
  }

  return (
    <HoverSlider
      key={projects.map((project) => project.slug).join("-")}
      className="w-full min-w-0"
    >
      <div className="flex min-w-0 flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-24">
        <div className="min-w-0 flex-1">
          <div className="flex flex-col space-y-1 sm:space-y-2 md:space-y-4">
            {projects.map((project, index) => (
              <Link
                key={project.slug}
                href={`/portfolio/${project.slug}`}
                className="block w-full max-w-full"
              >
                <TextStaggerHover
                  index={index}
                  text={project.title}
                  className="cursor-pointer font-serif text-2xl font-normal tracking-[0.03em] text-foreground min-[375px]:text-3xl sm:text-4xl lg:text-5xl lg:leading-none"
                />
              </Link>
            ))}
          </div>

          <div className="mt-8 lg:hidden">
            <ProjectImagePanel projects={projects} />
          </div>

          <ActiveProjectDetails
            projects={projects}
            showVisitButton={showVisitButton}
          />
        </div>

        <div className="hidden lg:block">
          <ProjectImagePanel projects={projects} />
        </div>
      </div>
    </HoverSlider>
  );
}
