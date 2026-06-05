import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { ServicesPreview } from "@/components/sections/services-preview";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel";
import { FinalCta } from "@/components/sections/final-cta";
import { JsonLd } from "@/components/layout/json-ld";
import {
  fetchSiteConfig,
  fetchFeaturedProjects,
  fetchServices,
  fetchTestimonials,
} from "@/lib/api";
import { aggregateRatingSchema, reviewSchema } from "@/lib/schema";

export default async function HomePage() {
  const [site, projects, services, testimonials] = await Promise.all([
    fetchSiteConfig(),
    fetchFeaturedProjects(),
    fetchServices(),
    fetchTestimonials(),
  ]);

  return (
    <>
      <JsonLd data={[aggregateRatingSchema(site, testimonials), ...testimonials.map(reviewSchema)]} />
      <Hero site={site} />
      <TrustBar stats={site.trustStats} />
      <ServicesPreview services={services} />
      <FeaturedProjects projects={projects} />
      <WhyChooseUs items={site.whyChooseUs} />
      <TestimonialsCarousel testimonials={testimonials} />
      <FinalCta site={site} />
    </>
  );
}
