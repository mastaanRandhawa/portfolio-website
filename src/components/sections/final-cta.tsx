import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import type { SiteConfig } from "@/lib/types";

export function FinalCta({ site }: { site: SiteConfig }) {
  return (
    <section className="gallery-section" aria-labelledby="final-cta-heading">
      <div className="gallery-container">
        <div className="bg-charcoal px-8 py-24 text-center sm:px-16 sm:py-32">
          <p className="gallery-label mb-8 text-off-white/60">Get Started</p>
          <h2
            id="final-cta-heading"
            className="font-serif text-4xl font-normal tracking-[0.04em] text-off-white sm:text-5xl lg:text-6xl"
          >
            {site.finalCta.headline}
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-base leading-[1.8] tracking-[0.02em] text-off-white/70">
            Let&apos;s discuss your project and create a website that drives real business results.
          </p>
          <div className="mt-14 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-12">
            <Link
              href={site.finalCta.primaryCta.href}
              className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-off-white underline-offset-[6px] transition-[color,opacity] duration-300 ease-out hover:text-off-white/70"
            >
              {site.finalCta.primaryCta.label}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <LinkButton
              href={site.finalCta.secondaryCta.href}
              variant="outline"
              size="lg"
              className="border-off-white/30 text-off-white hover:border-off-white hover:bg-off-white hover:text-charcoal"
            >
              {site.finalCta.secondaryCta.label}
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
