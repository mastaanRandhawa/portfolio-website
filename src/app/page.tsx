import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { ServicesPreview } from "@/components/sections/services-preview";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel";
import { FinalCta } from "@/components/sections/final-cta";
import {
  getSiteConfig,
  getFeaturedProjects,
  getServices,
  getFeaturedTestimonials,
} from "@/lib/content";

export default function HomePage() {
  const site = getSiteConfig();
  const projects = getFeaturedProjects();
  const services = getServices();
  const testimonials = getFeaturedTestimonials();

  return (
    <>
      <Hero site={site} />
      <TrustBar stats={site.trustStats} />
      <FeaturedProjects projects={projects} />
      <ServicesPreview services={services} />
      <WhyChooseUs items={site.whyChooseUs} />
      <TestimonialsCarousel testimonials={testimonials} />
      <FinalCta site={site} />
    </>
  );
}
