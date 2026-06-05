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
      <article className="group flex flex-col gap-5">
        <GalleryGlyph
          name={service.icon}
          className="h-8 w-8 text-foreground/40"
        />
        <p className="gallery-label">From {service.pricingFrom}</p>
        <h3 className="font-serif text-2xl tracking-[0.03em] leading-snug">
          {service.title}
        </h3>
        <p className="gallery-prose">{service.shortDescription}</p>
        <Link
          href="/services"
          className="gallery-link mt-1 translate-y-1 opacity-0 transition-[opacity,transform] duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
        >
          Learn more
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </article>
    </ScrollReveal>
  );
}
