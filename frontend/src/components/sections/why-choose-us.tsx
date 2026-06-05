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
        <div className="grid gap-4 sm:mt-4 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-12">
          {items.map((item) => (
            <div key={item.title} className="gallery-card flex flex-col gap-4">
              <DynamicIcon name={item.icon} className="h-5 w-5 text-foreground/70" />
              <h3 className="gallery-item-title">{item.title}</h3>
              <p className="gallery-prose text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
