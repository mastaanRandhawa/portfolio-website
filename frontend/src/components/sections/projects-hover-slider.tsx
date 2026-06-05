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
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/types";

interface ProjectsHoverSliderProps {
  projects: Project[];
  showVisitButton?: boolean;
}

function ProjectImagePanel({ projects }: { projects: Project[] }) {
  return (
    <HoverSliderImageWrap className="relative aspect-[4/5] w-full max-w-full overflow-hidden sm:max-w-md lg:max-w-xl lg:shrink-0">
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

function ProjectTitleLink({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { activeSlide, changeSlide } = useHoverSliderContext();
  const isActive = activeSlide === index;

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      onClick={() => changeSlide(index)}
      className={cn(
        "block w-full max-w-full rounded-sm border-l-2 py-3 pl-4 pr-2 transition-[background-color,border-color] duration-300 ease-out sm:border-l-0 sm:py-1.5 sm:pl-0 sm:pr-0",
        isActive
          ? "border-foreground bg-stone-light/60 sm:bg-transparent"
          : "border-transparent hover:bg-stone-light/30 sm:hover:bg-transparent"
      )}
    >
      <TextStaggerHover
        index={index}
        text={project.title}
        className={cn(
          "cursor-pointer font-serif text-xl font-normal tracking-[0.03em] min-[375px]:text-2xl sm:text-3xl md:text-4xl lg:text-5xl lg:leading-none",
          isActive ? "text-foreground" : "text-foreground/70 sm:text-foreground"
        )}
      />
    </Link>
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
    <div className="gallery-card-muted mt-8 sm:mt-10 sm:border-0 sm:bg-transparent sm:p-0">
      <p className="gallery-label">
        {project.industry}
        <span className="mx-3 text-border">·</span>
        {project.projectType}
      </p>
      <p className="gallery-prose mt-4">{project.shortDescription}</p>
      <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8">
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
      <div className="flex min-w-0 flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-24">
        <div className="min-w-0 flex-1">
          <div className="gallery-card-muted flex flex-col gap-1 sm:gap-2 sm:border-0 sm:bg-transparent sm:p-0 md:gap-3">
            {projects.map((project, index) => (
              <ProjectTitleLink key={project.slug} project={project} index={index} />
            ))}
          </div>

          <div className="mt-10 lg:hidden">
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
