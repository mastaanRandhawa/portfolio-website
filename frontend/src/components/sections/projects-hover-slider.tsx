"use client";

import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
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

function MobileProjectNav({ projects }: { projects: Project[] }) {
  const { activeSlide, changeSlide } = useHoverSliderContext();

  const goPrev = () => {
    changeSlide((activeSlide - 1 + projects.length) % projects.length);
  };

  const goNext = () => {
    changeSlide((activeSlide + 1) % projects.length);
  };

  if (projects.length <= 1) return null;

  return (
    <div className="mt-4 flex items-center justify-between gap-4 lg:hidden">
      <p className="gallery-label">
        {String(activeSlide + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous project"
          className="flex size-11 items-center justify-center border border-border bg-background text-foreground transition-colors duration-300 ease-out hover:border-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next project"
          className="flex size-11 items-center justify-center border border-border bg-background text-foreground transition-colors duration-300 ease-out hover:border-foreground"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function ProjectTitleSelector({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { activeSlide, changeSlide } = useHoverSliderContext();
  const isActive = activeSlide === index;

  return (
    <>
      <button
        type="button"
        onClick={() => changeSlide(index)}
        aria-pressed={isActive}
        aria-label={`Preview ${project.title}`}
        className={cn(
          "block w-full max-w-full rounded-sm border-l-2 py-3 pl-4 pr-2 text-left transition-[background-color,border-color] duration-300 ease-out lg:hidden",
          isActive
            ? "border-foreground bg-stone-light/60"
            : "border-transparent"
        )}
      >
        <span
          className={cn(
            "block font-serif text-xl font-normal leading-snug tracking-[0.03em] min-[375px]:text-2xl",
            isActive ? "text-foreground" : "text-foreground/55"
          )}
        >
          {project.title}
        </span>
      </button>

      <Link
        href={`/portfolio/${project.slug}`}
        onMouseEnter={() => changeSlide(index)}
        className={cn(
          "hidden w-full max-w-full lg:block",
          isActive ? "text-foreground" : "text-foreground/70"
        )}
      >
        <TextStaggerHover
          index={index}
          text={project.title}
          className="cursor-pointer font-serif text-3xl font-normal tracking-[0.03em] md:text-4xl lg:text-5xl lg:leading-none"
        />
      </Link>
    </>
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
    <div className="gallery-card-muted mt-6 sm:mt-8 lg:mt-10 lg:border-0 lg:bg-transparent lg:p-0">
      <p className="gallery-label">
        {project.industry}
        <span className="mx-3 text-border">·</span>
        {project.projectType}
      </p>
      <p className="gallery-prose mt-4">{project.shortDescription}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8">
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
          <div className="gallery-card-muted flex flex-col gap-0.5 lg:gap-3 lg:border-0 lg:bg-transparent lg:p-0">
            {projects.map((project, index) => (
              <ProjectTitleSelector key={project.slug} project={project} index={index} />
            ))}
          </div>

          <div className="mt-8 lg:hidden">
            <ProjectImagePanel projects={projects} />
            <MobileProjectNav projects={projects} />
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
