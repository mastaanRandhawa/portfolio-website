"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, Suspense, lazy } from "react";
import { LinkButton } from "@/components/ui/link-button";
import { useReducedMotion } from "@/lib/use-reduced-motion";

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
  const reducedMotion = useReducedMotion();
  const [enableShader, setEnableShader] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    const update = () => setEnableShader(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return (
    <section
      className="pb-12 sm:pb-24"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="gallery-container">
        <div className="relative grid min-h-[calc(100dvh-4.5rem)] place-items-center py-10 sm:min-h-screen sm:py-12">
          {enableShader && !reducedMotion && (
            <Suspense fallback={null}>
              <div className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-multiply">
                <Dithering
                  colorBack="#00000000"
                  colorFront="#1a1a1a"
                  shape="warp"
                  type="4x4"
                  speed={isHovered ? 0.35 : 0.1}
                  className="size-full"
                  minPixelRatio={1}
                />
              </div>
            </Suspense>
          )}

          <div className="relative z-10 flex w-full max-w-4xl flex-col items-center justify-center px-1 text-center">
            <p className="gallery-label mb-6 sm:mb-10">{badge}</p>

            <h1 className="gallery-heading mb-6 text-center text-balance sm:mb-10">
              {headline} <br />
              <span className="text-foreground/70">{headlineAccent}</span>
            </h1>

            <p className="gallery-prose mb-10 max-w-2xl text-center text-balance text-base sm:mb-14 sm:text-lg md:text-xl">
              {description}
            </p>

            <div className="flex w-full max-w-xs flex-col items-stretch justify-center gap-4 sm:max-w-none sm:flex-row sm:items-center sm:gap-10">
              <Link
                href={primaryCta.href}
                className="gallery-link justify-center text-sm hover:underline sm:justify-start"
              >
                {primaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
              {secondaryCta && (
                <LinkButton href={secondaryCta.href} variant="outline" size="lg" className="w-full sm:w-auto">
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
