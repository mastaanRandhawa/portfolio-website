"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TestimonialCard } from "./testimonial-card";
import type { Testimonial } from "@/lib/types";

export function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="gallery-section" aria-labelledby="testimonials-heading">
      <div className="gallery-container">
        <div className="flex flex-col items-start justify-between gap-10 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="gallery-label mb-6">Testimonials</p>
            <h2 id="testimonials-heading" className="gallery-heading">
              What Our Clients Say
            </h2>
            <p className="gallery-prose mt-8">
              Don&apos;t just take our word for it — hear from businesses we&apos;ve helped grow.
            </p>
          </div>
          <Link href="/testimonials" className="gallery-link shrink-0">
            All Testimonials
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-20">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-12">
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-12 md:basis-1/2 lg:basis-1/3">
                  <TestimonialCard testimonial={testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden border-0 bg-transparent shadow-none sm:flex" />
            <CarouselNext className="hidden border-0 bg-transparent shadow-none sm:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
