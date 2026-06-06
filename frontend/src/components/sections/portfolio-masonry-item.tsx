import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/types";

interface PortfolioMasonryItemProps {
  project: Project;
  index: number;
  showVisitButton?: boolean;
}

export function PortfolioMasonryItem({
  project,
  index,
  showVisitButton = false,
}: PortfolioMasonryItemProps) {
  return (
    <article className="portfolio-card group">
      <Link
        href={`/portfolio/${project.slug}`}
        className="block overflow-hidden border border-border/50 bg-stone-light/40"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={project.thumbnail}
            alt={`${project.title} — ${project.industry}`}
            fill
            className="portfolio-thumbnail-grade object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={index < 3}
          />
          <div
            className="pointer-events-none absolute inset-0 bg-charcoal/[0.06] mix-blend-multiply"
            aria-hidden="true"
          />
        </div>
      </Link>

      <div className="mt-5 space-y-2 sm:mt-6">
        <p className="gallery-label">
          {project.industry}
          <span className="mx-2 text-border sm:mx-3">·</span>
          {project.projectType}
        </p>
        <h3 className="font-serif text-xl tracking-[0.03em] leading-snug sm:text-2xl">
          <Link
            href={`/portfolio/${project.slug}`}
            className="transition-opacity duration-300 ease-out hover:opacity-60"
          >
            {project.title}
          </Link>
        </h3>
        <p className="gallery-prose line-clamp-2 text-sm leading-relaxed">
          {project.shortDescription}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-6 sm:mt-5 sm:gap-8">
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
    </article>
  );
}
