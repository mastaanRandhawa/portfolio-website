"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GalleryGlyph } from "@/components/ui/gallery-glyphs";
import { LinkButton } from "@/components/ui/link-button";
import { MOBILE_LIST_LIMIT } from "@/lib/constants";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { cn } from "@/lib/utils";
import type { Service } from "@/lib/types";

function ServiceTextList({
  label,
  items,
}: {
  label: string;
  items: string[];
}) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = items.length > MOBILE_LIST_LIMIT;

  return (
    <div className="gallery-card-muted">
      <h3 className="gallery-footer-heading mb-3 sm:mb-4">{label}</h3>
      <ul className="divide-y divide-border/50 sm:divide-none sm:space-y-5">
        {items.map((item, index) => (
          <li
            key={item}
            className={cn(
              "gallery-list-item",
              !expanded && index >= MOBILE_LIST_LIMIT && "max-md:hidden"
            )}
          >
            {item}
          </li>
        ))}
      </ul>
      {hasMore && !expanded && (
        <div className="mt-4 md:hidden">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="gallery-link text-[0.6875rem]"
          >
            View all {label.toLowerCase()}
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  );
}

function ServiceArticle({ service, index }: { service: Service; index: number }) {
  return (
    <ScrollReveal delay={index * 0.04}>
      <article id={service.id} className="scroll-mt-24 sm:scroll-mt-28">
        <div className="gallery-card flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8 lg:gap-12">
          <GalleryGlyph
            name={service.icon}
            className="h-8 w-8 shrink-0 text-foreground/40 sm:mt-1 sm:h-11 sm:w-11"
          />
          <div className="min-w-0 flex-1">
            <p className="gallery-label">From {service.pricingFrom}</p>
            <h2 className="gallery-subheading mt-4 max-w-3xl sm:mt-6">{service.title}</h2>
            <p className="gallery-prose mt-5 max-w-3xl sm:mt-8 sm:text-lg">
              {service.description}
            </p>
            <p className="gallery-prose mt-4 max-w-3xl text-sm sm:mt-6">
              {service.shortDescription}
            </p>

            <div className="mt-10 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10">
              <ServiceTextList label="Benefits" items={service.benefits} />
              <ServiceTextList label="Deliverables" items={service.deliverables} />
              <ServiceTextList label="Approach" items={service.process} />
            </div>

            <div className="mt-8 sm:mt-12">
              <LinkButton href="/contact" className="w-full sm:w-auto">
                Get a Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </LinkButton>
            </div>
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
}

export function ServicesList({ services }: { services: Service[] }) {
  const [showAllServices, setShowAllServices] = useState(false);

  useEffect(() => {
    const syncFromHash = () => {
      setShowAllServices(window.location.hash === "#all-services");
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const hasMoreServices = services.length > MOBILE_LIST_LIMIT;

  return (
    <div id="all-services" className="scroll-mt-28 space-y-16 sm:space-y-32 lg:space-y-48">
      {services.map((service, index) => (
        <div
          key={service.id}
          className={cn(
            !showAllServices && index >= MOBILE_LIST_LIMIT && "max-md:hidden"
          )}
        >
          <ServiceArticle service={service} index={index} />
        </div>
      ))}

      {!showAllServices && hasMoreServices && (
        <div className="pt-2 md:hidden">
          <Link href="#all-services" className="gallery-link">
            View all services
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
