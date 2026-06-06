"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PortfolioMasonryGrid } from "./portfolio-masonry-grid";
import type { Project } from "@/lib/types";

interface PortfolioFiltersProps {
  projects: Project[];
}

function matchesSearch(project: Project, query: string) {
  const haystack = [
    project.title,
    project.industry,
    project.projectType,
    project.shortDescription,
    ...project.technologies,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query);
}

export function PortfolioFilters({ projects }: PortfolioFiltersProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return projects;
    return projects.filter((project) => matchesSearch(project, query));
  }, [projects, search]);

  return (
    <div>
      <div className="flex flex-col gap-6 border-b border-border/60 pb-8 sm:flex-row sm:items-end sm:justify-between sm:gap-10 sm:pb-10">
        <div className="gallery-form-group max-w-xl flex-1">
          <label htmlFor="portfolio-search" className="gallery-label">
            Search
          </label>
          <div className="flex items-center gap-4 border-b border-foreground/20 transition-[border-color] duration-300 focus-within:border-foreground">
            <Search
              className="h-4 w-4 shrink-0 text-muted-foreground/50"
              aria-hidden="true"
            />
            <Input
              id="portfolio-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Name, industry, or technology"
              className="h-auto min-h-11 w-full rounded-none border-0 bg-transparent px-0 py-3 text-base font-sans leading-relaxed tracking-[0.02em] shadow-none outline-none placeholder:text-muted-foreground/45 focus-visible:ring-0"
            />
          </div>
        </div>

        <p className="gallery-label shrink-0">
          {filtered.length} of {projects.length} projects
        </p>
      </div>

      {filtered.length > 0 ? (
        <div className="mt-10 sm:mt-14">
          <PortfolioMasonryGrid projects={filtered} showVisitButton />
        </div>
      ) : (
        <p className="gallery-prose mt-20 text-center">
          No projects match your search. Try a different keyword.
        </p>
      )}
    </div>
  );
}
