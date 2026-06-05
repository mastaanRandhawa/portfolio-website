import { DesignTestimonial } from "@/components/ui/design-testimonial";
import type { Testimonial } from "@/lib/types";

export function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="gallery-section" aria-labelledby="testimonials-heading">
      <div className="gallery-container">
        <div className="gallery-section-intro">
          <p className="gallery-label mb-4 sm:mb-6">Testimonials</p>
          <h2 id="testimonials-heading" className="gallery-heading">
            What Our Clients Say
          </h2>
          <p className="gallery-prose mt-6 sm:mt-8">
            Don&apos;t just take our word for it — hear from businesses we&apos;ve helped grow.
          </p>
        </div>

        <div className="mt-12 sm:mt-20">
          <DesignTestimonial testimonials={testimonials} />
        </div>
      </div>
    </section>
  );
}
