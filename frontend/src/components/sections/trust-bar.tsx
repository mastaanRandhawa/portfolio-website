import type { TrustStat } from "@/lib/types";

export function TrustBar({ stats }: { stats: TrustStat[] }) {
  return (
    <section className="py-12 sm:py-20" aria-label="Trust indicators">
      <div className="gallery-container">
        <div className="gallery-hairline mb-12 sm:mb-20" />
        <div className="grid grid-cols-2 gap-3 sm:gap-8 md:grid-cols-4 md:gap-16">
          {stats.map((stat) => (
            <div key={stat.label} className="gallery-card-muted flex flex-col gap-2 py-5 sm:gap-3 sm:py-0 sm:border-0 sm:bg-transparent">
              <p className="font-serif text-2xl tracking-[0.04em] min-[375px]:text-3xl sm:text-5xl">
                {stat.value}
              </p>
              <p className="gallery-label">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="gallery-hairline mt-12 sm:mt-20" />
      </div>
    </section>
  );
}
