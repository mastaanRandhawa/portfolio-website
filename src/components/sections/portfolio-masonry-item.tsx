import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/types";

const ASPECT_RATIOS = [
  "aspect-[4/5]",
  "aspect-[3/4]",
  "aspect-[16/11]",
  "aspect-[5/6]",
  "aspect-[4/3]",
  "aspect-[3/5]",
] as const;

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
  const aspect = ASPECT_RATIOS[index % ASPECT_RATIOS.length];

  return (
    <article className="portfolio-masonry-item group">
      <Link href={`/portfolio/${project.slug}`} className="block">
        <div className={`relative overflow-hidden bg-stone-light ${aspect}`}>
          <Image
            src={project.thumbnail}
            alt={`${project.title} — ${project.industry}`}
            fill
            className="portfolio-thumbnail-grade object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-charcoal/[0.07] mix-blend-multiply"
            aria-hidden="true"
          />
        </div>
      </Link>

      <div className="mt-8 space-y-3">
        <p className="gallery-label">
          {project.industry}
          <span className="mx-3 text-border">·</span>
          {project.projectType}
        </p>
        <h3 className="font-serif text-2xl tracking-[0.03em] leading-snug sm:text-[1.65rem]">
          <Link
            href={`/portfolio/${project.slug}`}
            className="transition-opacity hover:opacity-60"
          >
            {project.title}
          </Link>
        </h3>
        <p className="gallery-prose line-clamp-2 text-sm">{project.shortDescription}</p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-8">
        <Link href={`/portfolio/${project.slug}`} className="gallery-link">
          View
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
