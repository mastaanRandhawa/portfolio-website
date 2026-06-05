"use client";

import { useState } from "react";
import { PortfolioMasonryGrid } from "./portfolio-masonry-grid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Project } from "@/lib/types";

interface PortfolioFiltersProps {
  projects: Project[];
  industries: string[];
  projectTypes: string[];
  technologies: string[];
}

export function PortfolioFilters({
  projects,
  industries,
  projectTypes,
  technologies,
}: PortfolioFiltersProps) {
  const [industry, setIndustry] = useState("all");
  const [projectType, setProjectType] = useState("all");
  const [technology, setTechnology] = useState("all");

  const filtered = projects.filter((p) => {
    if (industry !== "all" && p.industry !== industry) return false;
    if (projectType !== "all" && p.projectType !== projectType) return false;
    if (technology !== "all" && !p.technologies.includes(technology)) return false;
    return true;
  });

  return (
    <div>
      <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-12">
        <Select value={industry} onValueChange={(v) => setIndustry(v as string)}>
          <SelectTrigger className="w-full rounded-none border-x-0 border-t-0 border-b border-border bg-transparent px-0 shadow-none sm:w-[200px]" aria-label="Filter by industry">
            <SelectValue placeholder="Industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Industries</SelectItem>
            {industries.map((i) => (
              <SelectItem key={i} value={i}>{i}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={projectType} onValueChange={(v) => setProjectType(v as string)}>
          <SelectTrigger className="w-full rounded-none border-x-0 border-t-0 border-b border-border bg-transparent px-0 shadow-none sm:w-[200px]" aria-label="Filter by project type">
            <SelectValue placeholder="Project Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {projectTypes.map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={technology} onValueChange={(v) => setTechnology(v as string)}>
          <SelectTrigger className="w-full rounded-none border-x-0 border-t-0 border-b border-border bg-transparent px-0 shadow-none sm:w-[200px]" aria-label="Filter by technology">
            <SelectValue placeholder="Technology" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Technologies</SelectItem>
            {technologies.map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <p className="gallery-label mt-12">
        {filtered.length} of {projects.length} projects
      </p>

      {filtered.length > 0 ? (
        <div className="mt-16">
          <PortfolioMasonryGrid projects={filtered} showVisitButton />
        </div>
      ) : (
        <p className="gallery-prose mt-20 text-center">
          No projects match your filters. Try adjusting your selection.
        </p>
      )}
    </div>
  );
}
