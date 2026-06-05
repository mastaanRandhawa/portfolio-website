import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GalleryGlyph } from "@/components/ui/gallery-glyphs";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import type { Service } from "@/lib/types";

export function ServiceCard({
  service,
  index = 0,
}: {
  service: Service;
  index?: number;
}) {
  return (
    <ScrollReveal delay={index * 0.04}>
      <article className="gallery-card group flex h-full flex-col gap-4 sm:gap-5">
        <GalleryGlyph
          name={service.icon}
          className="h-7 w-7 text-foreground/40 sm:h-8 sm:w-8"
        />
        <p className="gallery-label">From {service.pricingFrom}</p>
        <h3 className="gallery-item-title">{service.title}</h3>
        <p className="gallery-prose flex-1">{service.shortDescription}</p>
        <Link
          href="/services"
          className="gallery-link mt-2 translate-y-0 opacity-100 transition-[opacity,transform] duration-300 ease-out sm:mt-1 sm:translate-y-1 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100"
        >
          Learn more
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </article>
    </ScrollReveal>
  );
}
