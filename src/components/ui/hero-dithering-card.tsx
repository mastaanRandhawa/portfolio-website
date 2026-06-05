"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState, Suspense, lazy } from "react";
import { LinkButton } from "@/components/ui/link-button";

const Dithering = lazy(() =>
  import("@paper-design/shaders-react").then((mod) => ({ default: mod.Dithering }))
);

export interface HeroDitheringCardProps {
  badge: string;
  headline: string;
  headlineAccent: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export function HeroDitheringCard({
  badge,
  headline,
  headlineAccent,
  description,
  primaryCta,
  secondaryCta,
}: HeroDitheringCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      className="pb-16 sm:pb-24"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="gallery-container">
        <div className="relative grid min-h-screen place-items-center py-12">
          <Suspense fallback={null}>
            <div className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-multiply">
              <Dithering
                colorBack="#00000000"
                colorFront="#1a1a1a"
                shape="warp"
                type="4x4"
                speed={isHovered ? 0.5 : 0.15}
                className="size-full"
                minPixelRatio={1}
              />
            </div>
          </Suspense>

          <div className="relative z-10 flex w-full max-w-4xl flex-col items-center justify-center text-center">
            <p className="gallery-label mb-10">{badge}</p>

            <h1 className="gallery-heading mb-10 text-center text-balance">
              {headline} <br />
              <span className="text-foreground/70">{headlineAccent}</span>
            </h1>

            <p className="gallery-prose mb-14 max-w-2xl text-center text-balance text-lg md:text-xl">
              {description}
            </p>

            <div className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10">
              <Link
                href={primaryCta.href}
                className="gallery-link text-sm hover:underline"
              >
                {primaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
              {secondaryCta && (
                <LinkButton href={secondaryCta.href} variant="outline" size="lg">
                  {secondaryCta.label}
                </LinkButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { HeroDitheringCard as CTASection };
