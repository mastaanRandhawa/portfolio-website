"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { MOBILE_LIST_LIMIT } from "@/lib/constants";
import type { AboutContent } from "@/lib/types";

const categories = ["frontend", "backend", "design"] as const;

interface SkillsSectionProps {
  skills: AboutContent["skills"];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const syncFromHash = () => {
      setShowAll(window.location.hash === "#expertise");
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const hasHiddenSkills = categories.some(
    (category) => skills[category].length > MOBILE_LIST_LIMIT
  );

  return (
    <div id="expertise" className="mt-12 scroll-mt-28 sm:mt-20 lg:mt-28">
      <div className="max-w-2xl">
        <p className="gallery-label mb-3 sm:mb-4">Expertise</p>
        <h2 className="gallery-subheading">Skills & Expertise</h2>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-6">
        {categories.map((category) => (
          <div
            key={category}
            className="rounded-sm border border-border/50 bg-stone-light/30 p-4 sm:p-5"
          >
            <h3 className="font-serif text-base capitalize tracking-[0.04em] text-foreground sm:text-sm sm:font-sans sm:font-medium sm:uppercase sm:tracking-[0.2em] sm:text-muted-foreground">
              {category}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {skills[category].map((skill, index) => (
                <li
                  key={skill}
                  className={cn(
                    "rounded-sm border border-border/60 bg-background px-3 py-1.5 font-sans text-xs tracking-wide text-foreground/80 sm:text-sm",
                    !showAll && index >= MOBILE_LIST_LIMIT && "max-md:hidden"
                  )}
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {!showAll && hasHiddenSkills && (
        <div className="mt-5 md:hidden">
          <Link href="#expertise" className="gallery-link">
            View all skills
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
