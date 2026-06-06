import { PortfolioMasonryItem } from "./portfolio-masonry-item";
import type { Project } from "@/lib/types";

interface PortfolioMasonryGridProps {
  projects: Project[];
  showVisitButton?: boolean;
  className?: string;
}

export function PortfolioMasonryGrid({
  projects,
  showVisitButton = false,
  className = "",
}: PortfolioMasonryGridProps) {
  if (projects.length === 0) {
    return (
      <p className={`gallery-prose py-20 text-center ${className}`}>
        No projects to display.
      </p>
    );
  }

  return (
    <div className={`portfolio-grid ${className}`.trim()}>
      {projects.map((project, index) => (
        <PortfolioMasonryItem
          key={project.slug}
          project={project}
          index={index}
          showVisitButton={showVisitButton}
        />
      ))}
    </div>
  );
}
