import type { TrustStat } from "@/lib/types";

export function TrustBar({ stats }: { stats: TrustStat[] }) {
  return (
    <section className="py-12 sm:py-20" aria-label="Trust indicators">
      <div className="gallery-container">
        <div className="gallery-hairline mb-12 sm:mb-20" />
        <div className="grid grid-cols-2 gap-8 sm:gap-12 md:grid-cols-4 md:gap-16">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-2 sm:gap-3">
              <p className="font-serif text-3xl tracking-[0.04em] min-[375px]:text-4xl sm:text-5xl">
                {stat.value}
              </p>
              <p className="gallery-label text-[0.625rem] min-[375px]:text-[0.6875rem]">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="gallery-hairline mt-12 sm:mt-20" />
      </div>
    </section>
  );
}
