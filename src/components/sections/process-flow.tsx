import { GalleryGlyph } from "@/components/ui/gallery-glyphs";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import type { ProcessStep } from "@/lib/types";

export function ProcessFlow({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute bottom-0 left-[1.35rem] top-0 hidden w-px bg-foreground/10 sm:left-[1.65rem] lg:block"
        aria-hidden="true"
      />

      <div className="space-y-28 sm:space-y-36">
        {steps.map((step, index) => (
          <ScrollReveal key={step.step} delay={index * 0.05}>
            <article className="relative grid gap-10 sm:grid-cols-[5rem_1fr] sm:gap-16 lg:grid-cols-[7rem_1fr] lg:gap-24">
              <div className="flex items-start gap-6 sm:flex-col sm:gap-8">
                <p className="font-serif text-5xl tracking-[0.06em] text-foreground/20 sm:text-6xl">
                  {String(step.step).padStart(2, "0")}
                </p>
                <GalleryGlyph
                  name={step.icon}
                  className="h-9 w-9 shrink-0 text-foreground/35 sm:h-10 sm:w-10"
                />
              </div>

              <div className="max-w-2xl">
                <h2 className="font-serif text-3xl tracking-[0.04em] leading-tight sm:text-4xl">
                  {step.title}
                </h2>
                <p className="gallery-prose mt-8 text-base leading-[1.9] sm:text-lg">
                  {step.description}
                </p>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
