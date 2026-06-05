import { GalleryGlyph } from "@/components/ui/gallery-glyphs";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import type { Service } from "@/lib/types";

export function ServiceCard({
  service,
  index = 0,
  animate = true,
}: {
  service: Service;
  index?: number;
  animate?: boolean;
}) {
  const card = (
      <article className="flex h-full flex-col gap-3 rounded-sm border border-border/50 bg-stone-light/35 p-4 sm:gap-4 sm:border-border/60 sm:bg-stone-light/50 sm:p-5 lg:border-0 lg:bg-transparent lg:p-0">
        <GalleryGlyph
          name={service.icon}
          className="h-7 w-7 text-foreground/40 sm:h-8 sm:w-8"
        />
        <p className="gallery-label">From {service.pricingFrom}</p>
        <h3 className="gallery-item-title">{service.title}</h3>
        <p className="gallery-prose flex-1">{service.shortDescription}</p>
      </article>
  );

  if (!animate) return card;

  return <ScrollReveal delay={index * 0.04}>{card}</ScrollReveal>;
}
