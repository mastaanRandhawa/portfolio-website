import { DynamicIcon } from "@/lib/icons";
import type { WhyChooseUsItem } from "@/lib/types";

export function WhyChooseUs({ items }: { items: WhyChooseUsItem[] }) {
  return (
    <section className="gallery-section" aria-labelledby="why-choose-us-heading">
      <div className="gallery-container">
        <div className="max-w-2xl">
          <p className="gallery-label mb-6">Approach</p>
          <h2 id="why-choose-us-heading" className="gallery-heading">
            Why Choose Us
          </h2>
          <p className="gallery-prose mt-8">
            We combine design excellence with technical expertise to deliver websites that perform.
          </p>
        </div>
        <div className="mt-12 grid gap-10 sm:mt-20 sm:grid-cols-2 sm:gap-16 lg:grid-cols-4 lg:gap-20">
          {items.map((item) => (
            <div key={item.title} className="flex flex-col gap-5">
              <DynamicIcon name={item.icon} className="h-5 w-5 text-foreground/70" />
              <h3 className="font-serif text-xl tracking-[0.03em]">{item.title}</h3>
              <p className="gallery-prose text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
