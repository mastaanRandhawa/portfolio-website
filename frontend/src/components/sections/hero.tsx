import { HeroDitheringCard } from "@/components/ui/hero-dithering-card";
import type { SiteConfig } from "@/lib/types";

export function Hero({ site }: { site: SiteConfig }) {
  return (
    <HeroDitheringCard
      badge={site.hero.badge}
      headline={site.hero.headline}
      headlineAccent={site.hero.headlineAccent}
      description={site.hero.subheadline}
      primaryCta={site.hero.primaryCta}
      secondaryCta={site.hero.secondaryCta}
    />
  );
}
