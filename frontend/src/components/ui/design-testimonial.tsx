"use client";

import type React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLiteAnimations } from "@/lib/use-reduced-motion";
import type { Testimonial } from "@/lib/types";

interface DesignTestimonialProps {
  testimonials: Testimonial[];
  className?: string;
  autoAdvanceMs?: number;
}

const fadeTransition = { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const };

export function DesignTestimonial({
  testimonials,
  className,
  autoAdvanceMs = 12000,
}: DesignTestimonialProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const liteAnimations = useLiteAnimations();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 180 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  const numberX = useTransform(x, [-200, 200], [-12, 12]);
  const numberY = useTransform(y, [-200, 200], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (liteAnimations) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    }
  };

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (testimonials.length <= 1 || isPaused) return;
    const timer = setInterval(goNext, autoAdvanceMs);
    return () => clearInterval(timer);
  }, [goNext, autoAdvanceMs, testimonials.length, isPaused]);

  const isLeavingContainer = (relatedTarget: EventTarget | null) => {
    if (!containerRef.current) return true;
    if (!(relatedTarget instanceof Node)) return true;
    return !containerRef.current.contains(relatedTarget);
  };

  const handlePointerEnter = () => setIsPaused(true);

  const handlePointerLeave = (e: React.PointerEvent) => {
    if (isLeavingContainer(e.relatedTarget)) {
      setIsPaused(false);
    }
  };

  const handleFocusCapture = () => setIsPaused(true);

  const handleBlurCapture = (e: React.FocusEvent) => {
    if (isLeavingContainer(e.relatedTarget)) {
      setIsPaused(false);
    }
  };

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
  const marqueeText = testimonials.map((t) => t.company).join(" · ");

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full min-w-0 overflow-hidden pb-12 sm:pb-16 lg:pb-20", className)}
      onMouseMove={handleMouseMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onFocusCapture={handleFocusCapture}
      onBlurCapture={handleBlurCapture}
      aria-live="polite"
      aria-atomic="true"
    >
      <motion.div
        className="pointer-events-none absolute -left-4 top-1/2 hidden -translate-y-1/2 select-none font-serif text-[12rem] font-normal leading-none tracking-tighter text-foreground/[0.04] lg:-left-8 lg:block lg:text-[20rem] xl:text-[28rem]"
        style={liteAnimations ? undefined : { x: numberX, y: numberY }}
        aria-hidden="true"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={fadeTransition}
            className="block"
          >
            {String(activeIndex + 1).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </motion.div>

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
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={fadeTransition}
                  className="absolute left-0 top-0"
                >
                  <span className="gallery-label inline-flex max-w-full items-center gap-3 border border-border px-3 py-2 sm:px-4">
                    <span className="h-1.5 w-1.5 bg-foreground" aria-hidden="true" />
                    {current.company}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="relative mb-8 sm:mb-14 lg:mb-20 lg:min-h-[16rem] xl:min-h-[18rem]">
              <AnimatePresence mode="wait">
                {liteAnimations ? (
                  <motion.blockquote
                    key={activeIndex}
                    className="w-full font-serif text-2xl font-normal leading-[1.35] tracking-[0.02em] text-foreground min-[375px]:text-[1.625rem] sm:text-3xl md:text-4xl lg:absolute lg:inset-x-0 lg:top-0 lg:text-5xl lg:leading-[1.25]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={fadeTransition}
                  >
                    &ldquo;{current.review}&rdquo;
                  </motion.blockquote>
                ) : (
                  <motion.blockquote
                    key={activeIndex}
                    className="w-full font-serif text-2xl font-normal leading-[1.35] tracking-[0.02em] text-foreground min-[375px]:text-[1.625rem] sm:text-3xl md:text-4xl lg:absolute lg:inset-x-0 lg:top-0 lg:text-5xl lg:leading-[1.25]"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    &ldquo;
                    {current.review.split(" ").map((word, i) => (
                      <motion.span
                        key={`${activeIndex}-${i}`}
                        className="mr-[0.3em] inline-block"
                        variants={{
                          hidden: { opacity: 0, y: 12 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                              duration: 0.4,
                              delay: i * 0.03,
                              ease: [0.22, 1, 0.36, 1],
                            },
                          },
                          exit: {
                            opacity: 0,
                            y: -6,
                            transition: { duration: 0.2, delay: i * 0.015 },
                          },
                        }}
                      >
                        {word}
                      </motion.span>
                    ))}
                    &rdquo;
                  </motion.blockquote>
                )}
              </AnimatePresence>
            </div>

            <div className="relative flex shrink-0 flex-col gap-6 pt-2 sm:flex-row sm:items-end sm:justify-between sm:gap-8 lg:mt-auto lg:min-h-[3.5rem] lg:pt-0">
              <div className="relative min-w-0 lg:min-h-14 lg:min-w-[12rem]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ ...fadeTransition, delay: 0.1 }}
                    className="flex items-center gap-4 lg:absolute lg:left-0 lg:top-0"
                  >
                    <div className="h-px w-8 origin-left scale-x-100 bg-foreground" />
                    <div>
                      <p className="font-serif text-lg tracking-[0.02em] text-foreground">
                        {current.name}
                      </p>
                      <p className="gallery-label mt-2 normal-case tracking-[0.12em]">
                        {current.role}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
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

      <div className="pointer-events-none absolute -bottom-12 left-0 right-0 hidden overflow-hidden opacity-[0.06] sm:block lg:-bottom-20">
        <div className="animate-testimonial-marquee flex w-max whitespace-nowrap font-serif text-4xl font-normal tracking-tight text-foreground motion-reduce:animate-none lg:text-6xl">
          <span className="mx-8">{marqueeText} ·</span>
          <span className="mx-8" aria-hidden="true">
            {marqueeText} ·
          </span>
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
      className="flex h-12 w-12 items-center justify-center border border-border bg-transparent text-foreground transition-[background-color,border-color,color,transform] duration-300 ease-out hover:border-foreground hover:bg-foreground hover:text-background active:scale-95"
    >
      {children}
    </button>
  );
}
