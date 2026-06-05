import { PageHeader } from "@/components/layout/page-header";
import { TestimonialCard } from "@/components/sections/testimonial-card";
import { JsonLd } from "@/components/layout/json-ld";
import { getTestimonials } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { reviewSchema, aggregateRatingSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Testimonials",
  description: "Read what our clients say about working with Studio North.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  const testimonials = getTestimonials();

  return (
    <>
      <JsonLd data={[aggregateRatingSchema(), ...testimonials.map(reviewSchema)]} />
      <PageHeader
        title="Client Testimonials"
        description="Real feedback from businesses we've partnered with to build their digital presence."
      />
      <section className="gallery-section pt-0">
        <div className="gallery-container">
          <div className="grid gap-20 sm:grid-cols-2 lg:grid-cols-3 lg:gap-24">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>

          {testimonials.some((t) => t.videoUrl) && (
            <div className="mt-32">
              <p className="gallery-label mb-12">Video</p>
              <div className="grid gap-16 sm:grid-cols-2">
                {testimonials
                  .filter((t) => t.videoUrl)
                  .map((testimonial) => (
                    <div key={testimonial.id}>
                      <div className="aspect-video bg-stone-light">
                        <iframe
                          src={testimonial.videoUrl}
                          title={`Video testimonial from ${testimonial.name}`}
                          className="h-full w-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                      <div className="mt-6">
                        <p className="font-serif text-lg tracking-wide">{testimonial.name}</p>
                        <p className="gallery-label mt-2 normal-case tracking-[0.12em]">{testimonial.company}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
