"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { MOBILE_LIST_LIMIT } from "@/components/ui/mobile-truncated-list";
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
    <div id="expertise" className="mt-16 scroll-mt-28 sm:mt-28">
      <div className="gallery-section-intro">
        <p className="gallery-label mb-4 sm:mb-6">Expertise</p>
        <h2 className="gallery-subheading">Skills & Expertise</h2>
      </div>

      <div className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-10">
        {categories.map((category) => (
          <div key={category} className="gallery-card-muted">
            <h3 className="gallery-footer-heading capitalize">{category}</h3>
            <ul className="mt-4 divide-y divide-border/50 sm:mt-0 sm:divide-none sm:space-y-3">
              {skills[category].map((skill, index) => (
                <li
                  key={skill}
                  className={cn(
                    "gallery-list-item",
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
        <div className="mt-6 md:hidden">
          <Link href="#expertise" className="gallery-link">
            View all skills
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
