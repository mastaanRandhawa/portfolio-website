import type { TrustStat } from "@/lib/types";

export function TrustBar({ stats }: { stats: TrustStat[] }) {
  return (
    <section className="py-20" aria-label="Trust indicators">
      <div className="gallery-container">
        <div className="gallery-hairline mb-20" />
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4 md:gap-16">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-3">
              <p className="font-serif text-4xl tracking-[0.04em] sm:text-5xl">{stat.value}</p>
              <p className="gallery-label">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="gallery-hairline mt-20" />
      </div>
    </section>
  );
}
