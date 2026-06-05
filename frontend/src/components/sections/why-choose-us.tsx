import { DynamicIcon } from "@/lib/icons";
import type { WhyChooseUsItem } from "@/lib/types";

export function WhyChooseUs({ items }: { items: WhyChooseUsItem[] }) {
  return (
    <section className="gallery-section" aria-labelledby="why-choose-us-heading">
      <div className="gallery-container">
        <div className="gallery-section-intro">
          <p className="gallery-label mb-4 sm:mb-6">Approach</p>
          <h2 id="why-choose-us-heading" className="gallery-heading">
            Why Choose Us
          </h2>
          <p className="gallery-prose mt-6 sm:mt-8">
            We combine design excellence with technical expertise to deliver websites that perform.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-6 lg:grid-cols-4 lg:gap-10">
          {items.map((item) => (
            <div
              key={item.title}
              className="flex flex-col gap-3 rounded-sm border border-border/50 bg-stone-light/35 p-4 sm:gap-4 sm:p-5 lg:gap-5 lg:p-6"
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border/60 bg-background sm:size-10">
                <DynamicIcon name={item.icon} className="h-4 w-4 text-foreground/70 sm:h-5 sm:w-5" />
              </div>
              <div className="flex min-w-0 flex-col gap-1.5 sm:gap-2">
                <h3 className="font-serif text-sm leading-snug tracking-[0.02em] text-foreground sm:text-base lg:text-lg">
                  {item.title}
                </h3>
                <p className="font-sans text-xs leading-relaxed text-muted-foreground sm:text-sm sm:leading-[1.7]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
