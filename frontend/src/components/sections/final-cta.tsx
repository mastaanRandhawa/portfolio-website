import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import type { SiteConfig } from "@/lib/types";

export function FinalCta({ site }: { site: SiteConfig }) {
  return (
    <section className="pt-20 pb-0 sm:pt-32 lg:pt-40" aria-labelledby="final-cta-heading">
      <div className="w-full bg-charcoal px-4 py-16 text-center sm:px-8 sm:py-24 md:px-16 lg:py-32">
        <div className="mx-auto max-w-4xl">
          <p className="gallery-label mb-6 text-off-white/60 sm:mb-8">Get Started</p>
          <h2
            id="final-cta-heading"
            className="font-serif text-[1.625rem] font-normal tracking-[0.04em] text-off-white text-balance min-[375px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
          >
            {site.finalCta.headline}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-[1.8] tracking-[0.02em] text-off-white/70 sm:mt-8 sm:text-base">
            Let&apos;s discuss your project and create a website that drives real business results.
          </p>
          <div className="mt-10 flex w-full max-w-xs flex-col items-stretch justify-center gap-4 sm:mx-auto sm:mt-14 sm:max-w-none sm:flex-row sm:items-center sm:gap-12">
            <Link
              href={site.finalCta.primaryCta.href}
              className="inline-flex min-h-11 items-center justify-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-off-white underline-offset-[6px] transition-[color,opacity] duration-300 ease-out hover:text-off-white/70 sm:justify-start"
            >
              {site.finalCta.primaryCta.label}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <LinkButton
              href={site.finalCta.secondaryCta.href}
              variant="outline"
              size="lg"
              className="w-full border-off-white/30 text-off-white hover:border-off-white hover:bg-off-white hover:text-charcoal sm:w-auto"
            >
              {site.finalCta.secondaryCta.label}
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
