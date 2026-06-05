import { ArrowRight } from "lucide-react";
import { GalleryGlyph } from "@/components/ui/gallery-glyphs";
import { LinkButton } from "@/components/ui/link-button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import type { Service } from "@/lib/types";

function ServiceTextList({
  label,
  items,
}: {
  label: string;
  items: string[];
}) {
  return (
    <div>
      <h3 className="gallery-label">{label}</h3>
      <ul className="mt-8 space-y-5">
        {items.map((item) => (
          <li
            key={item}
            className="font-serif text-xl tracking-[0.02em] leading-snug text-foreground/85"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ServicesList({ services }: { services: Service[] }) {
  return (
    <div className="space-y-24 sm:space-y-40 lg:space-y-48">
      {services.map((service, index) => (
        <ScrollReveal key={service.id} delay={index * 0.04}>
          <article id={service.id} className="scroll-mt-24 sm:scroll-mt-28">
            <div className="flex items-start gap-5 sm:gap-8 lg:gap-12">
              <GalleryGlyph
                name={service.icon}
                className="mt-1 h-9 w-9 shrink-0 text-foreground/40 sm:h-11 sm:w-11"
              />
              <div className="min-w-0 flex-1">
                <p className="gallery-label">From {service.pricingFrom}</p>
                <h2 className="gallery-subheading mt-6 max-w-3xl">{service.title}</h2>
                <p className="gallery-prose mt-6 max-w-3xl text-base sm:mt-10 sm:text-lg">
                  {service.description}
                </p>
                <p className="gallery-prose mt-4 max-w-3xl text-sm sm:mt-6">
                  {service.shortDescription}
                </p>

                <div className="mt-12 grid gap-10 sm:mt-20 sm:grid-cols-2 sm:gap-16 lg:grid-cols-3 lg:gap-20">
                  <ServiceTextList label="Benefits" items={service.benefits} />
                  <ServiceTextList label="Deliverables" items={service.deliverables} />
                  <ServiceTextList label="Approach" items={service.process} />
                </div>

                <div className="mt-10 sm:mt-16">
                  <LinkButton href="/contact" className="w-full sm:w-auto">
                    Get a Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </LinkButton>
                </div>
              </div>
            </div>
          </article>
        </ScrollReveal>
      ))}
    </div>
  );
}
