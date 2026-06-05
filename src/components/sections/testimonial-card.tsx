import Image from "next/image";
import type { Testimonial } from "@/lib/types";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col gap-8">
      <blockquote className="gallery-prose text-lg leading-[1.9] tracking-[0.02em]">
        &ldquo;{testimonial.review}&rdquo;
      </blockquote>
      <figcaption className="flex items-center gap-5">
        <Image
          src={testimonial.image}
          alt={testimonial.name}
          width={56}
          height={56}
          className="object-cover grayscale"
        />
        <div>
          <p className="font-serif text-lg tracking-wide">{testimonial.name}</p>
          <p className="gallery-label mt-1 normal-case tracking-[0.12em]">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
