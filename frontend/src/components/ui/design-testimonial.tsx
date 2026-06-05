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
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const numberX = useTransform(x, [-200, 200], [-20, 20]);
  const numberY = useTransform(y, [-200, 200], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
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
        className="pointer-events-none absolute -left-4 top-1/2 hidden -translate-y-1/2 select-none font-serif text-[12rem] font-normal leading-none tracking-tighter text-foreground/[0.04] sm:-left-8 sm:block lg:text-[20rem] xl:text-[28rem]"
        style={{ x: numberX, y: numberY }}
        aria-hidden="true"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            {String(activeIndex + 1).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </motion.div>

      <div className="relative flex flex-col lg:flex-row">
        <div className="mb-8 flex items-center gap-6 border-b border-border pb-6 sm:mb-10 sm:gap-8 sm:pb-8 lg:mb-0 lg:flex-col lg:items-center lg:justify-center lg:border-b-0 lg:border-r lg:pb-0 lg:pr-12 xl:pr-16">
          <motion.span
            className="gallery-label shrink-0 lg:[writing-mode:vertical-rl]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Testimonials
          </motion.span>

          <div className="relative hidden h-32 w-px bg-border lg:block">
            <motion.div
              className="absolute left-0 top-0 w-full origin-top bg-foreground"
              animate={{ height: `${progress}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        <div className="min-w-0 flex-1 lg:pl-12 xl:pl-16">
          <div className="relative flex flex-col">
            <div className="relative mb-6 h-11 shrink-0 sm:mb-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                  className="absolute left-0 top-0"
                >
                  <span className="gallery-label inline-flex max-w-full items-center gap-3 border border-border px-3 py-2 sm:px-4">
                    <span className="h-1.5 w-1.5 bg-foreground" aria-hidden="true" />
                    {current.company}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="relative mb-10 min-h-[9rem] sm:mb-14 sm:min-h-[12rem] lg:mb-20 lg:min-h-[16rem] xl:min-h-[18rem]">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={activeIndex}
                  className="absolute inset-x-0 top-0 w-full font-serif text-2xl font-normal leading-[1.25] tracking-[0.02em] text-foreground min-[375px]:text-[1.625rem] sm:text-3xl md:text-4xl lg:text-5xl"
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
                        hidden: { opacity: 0, y: 20, rotateX: 90 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          rotateX: 0,
                          transition: {
                            duration: 0.5,
                            delay: i * 0.05,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        },
                        exit: {
                          opacity: 0,
                          y: -10,
                          transition: { duration: 0.2, delay: i * 0.02 },
                        },
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                  &rdquo;
                </motion.blockquote>
              </AnimatePresence>
            </div>

            <div className="relative mt-6 flex shrink-0 flex-col gap-6 sm:mt-auto sm:min-h-[3.5rem] sm:flex-row sm:items-end sm:justify-between sm:gap-8">
              <div className="relative min-h-14 min-w-0 sm:min-w-[12rem]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="absolute left-0 top-0 flex items-center gap-4"
                  >
                    <motion.div
                      className="h-px w-8 origin-left bg-foreground"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    />
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
        <motion.div
          className="flex whitespace-nowrap font-serif text-4xl font-normal tracking-tight text-foreground lg:text-6xl"
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          aria-hidden="true"
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="mx-8">
              {testimonials.map((t) => t.company).join(" · ")} ·
            </span>
          ))}
        </motion.div>
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
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-12 w-12 items-center justify-center border border-border bg-transparent text-foreground transition-[background-color,border-color,color] duration-300 ease-out hover:border-foreground hover:bg-foreground hover:text-background"
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}
