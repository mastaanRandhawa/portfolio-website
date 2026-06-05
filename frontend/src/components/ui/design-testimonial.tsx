"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import type { Testimonial } from "@/lib/types";

interface DesignTestimonialProps {
  testimonials: Testimonial[];
  className?: string;
  autoAdvanceMs?: number;
}

export function DesignTestimonial({
  testimonials,
  className,
  autoAdvanceMs = 12000,
}: DesignTestimonialProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reducedMotion = useReducedMotion();

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (testimonials.length <= 1 || isPaused || reducedMotion) return;
    const timer = setInterval(goNext, autoAdvanceMs);
    return () => clearInterval(timer);
  }, [goNext, autoAdvanceMs, testimonials.length, isPaused, reducedMotion]);

  useEffect(() => {
    setActiveIndex(0);
  }, [testimonials]);

  if (testimonials.length === 0) {
    return (
      <p className="gallery-prose py-20 text-center">No testimonials to display.</p>
    );
  }

  const current = testimonials[activeIndex];
  const progress = ((activeIndex + 1) / testimonials.length) * 100;
  const fadeClass = reducedMotion ? "" : "testimonial-fade-in";

  return (
    <div
      className={cn("relative w-full min-w-0 overflow-hidden pb-12 sm:pb-16 lg:pb-20", className)}
      onPointerEnter={() => setIsPaused(true)}
      onPointerLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="pointer-events-none absolute -left-4 top-1/2 hidden -translate-y-1/2 select-none font-serif text-[12rem] font-normal leading-none tracking-tighter text-foreground/[0.04] sm:-left-8 sm:block lg:text-[20rem] xl:text-[28rem]">
        <span key={activeIndex} className={cn("block", fadeClass)}>
          {String(activeIndex + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="relative flex flex-col lg:flex-row">
        <div className="mb-8 flex items-center gap-6 border-b border-border pb-6 sm:mb-10 sm:gap-8 sm:pb-8 lg:mb-0 lg:flex-col lg:items-center lg:justify-center lg:border-b-0 lg:border-r lg:pb-0 lg:pr-12 xl:pr-16">
          <span className="gallery-label shrink-0 lg:[writing-mode:vertical-rl]">
            Testimonials
          </span>

          <div className="relative hidden h-32 w-px bg-border lg:block">
            <div
              className="absolute left-0 top-0 w-full origin-top bg-foreground transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ height: `${progress}%` }}
            />
          </div>
        </div>

        <div className="min-w-0 flex-1 lg:pl-12 xl:pl-16">
          <div className="relative flex flex-col">
            <div className="relative mb-6 h-11 shrink-0 sm:mb-8">
              <div key={`company-${activeIndex}`} className={cn("absolute left-0 top-0", fadeClass)}>
                <span className="gallery-label inline-flex max-w-full items-center gap-3 border border-border px-3 py-2 sm:px-4">
                  <span className="h-1.5 w-1.5 bg-foreground" aria-hidden="true" />
                  {current.company}
                </span>
              </div>
            </div>

            <div className="relative mb-8 sm:mb-14 lg:mb-20 lg:min-h-[16rem] xl:min-h-[18rem]">
              <blockquote
                key={`quote-${activeIndex}`}
                className={cn(
                  "w-full font-serif text-2xl font-normal leading-[1.35] tracking-[0.02em] text-foreground min-[375px]:text-[1.625rem] sm:text-3xl md:text-4xl lg:absolute lg:inset-x-0 lg:top-0 lg:text-5xl lg:leading-[1.25]",
                  fadeClass
                )}
              >
                &ldquo;{current.review}&rdquo;
              </blockquote>
            </div>

            <div className="relative flex shrink-0 flex-col gap-6 pt-2 sm:flex-row sm:items-end sm:justify-between sm:gap-8 lg:mt-auto lg:min-h-[3.5rem] lg:pt-0">
              <div className="relative min-w-0 lg:min-h-14 lg:min-w-[12rem]">
                <div
                  key={`author-${activeIndex}`}
                  className={cn(
                    "flex items-center gap-4 lg:absolute lg:left-0 lg:top-0",
                    fadeClass
                  )}
                >
                  <span className="h-px w-8 shrink-0 bg-foreground" aria-hidden="true" />
                  <div>
                    <p className="font-serif text-lg tracking-[0.02em] text-foreground">
                      {current.name}
                    </p>
                    <p className="gallery-label mt-2 normal-case tracking-[0.12em]">
                      {current.role}
                    </p>
                  </div>
                </div>
              </div>

              {testimonials.length > 1 && (
                <div className="flex shrink-0 items-center gap-4">
                  <NavButton onClick={goPrev} label="Previous testimonial">
                    <ChevronLeft className="h-4 w-4" />
                  </NavButton>
                  <NavButton onClick={goNext} label="Next testimonial">
                    <ChevronRight className="h-4 w-4" />
                  </NavButton>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="testimonial-marquee pointer-events-none absolute -bottom-12 left-0 right-0 hidden overflow-hidden opacity-[0.06] sm:block lg:-bottom-20">
        <div className="testimonial-marquee-track flex whitespace-nowrap font-serif text-4xl font-normal tracking-tight text-foreground lg:text-6xl">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="mx-8">
              {testimonials.map((t) => t.company).join(" · ")} ·
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function NavButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-12 w-12 items-center justify-center border border-border bg-transparent text-foreground transition-[background-color,border-color,color,transform] duration-300 ease-out hover:border-foreground hover:bg-foreground hover:text-background active:scale-[0.98]"
    >
      {children}
    </button>
  );
}
