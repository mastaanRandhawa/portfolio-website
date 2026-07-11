import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero";
import { ServicesPreview } from "@/components/sections/services-preview";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { FinalCta } from "@/components/sections/final-cta";
import { JsonLd } from "@/components/layout/json-ld";
import {
  getFeaturedProjects,
  getServices,
  getSiteConfig,
  getTestimonials,
} from "@/lib/content";
import { buildHomeSchemaGraph } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const FeaturedProjects = dynamic(
  () =>
    import("@/components/sections/featured-projects").then((mod) => ({
      default: mod.FeaturedProjects,
    })),
  { ssr: true },
);

const TestimonialsCarousel = dynamic(
  () =>
    import("@/components/sections/testimonials-carousel").then((mod) => ({
      default: mod.TestimonialsCarousel,
    })),
  { ssr: true },
);

export async function generateMetadata() {
  const site = getSiteConfig();
  return buildMetadata({
    description: `${site.description} Based in Vancouver, BC. Request a free quote today.`,
    path: "",
  });
}

export default function HomePage() {
  const site = getSiteConfig();
  const projects = getFeaturedProjects();
  const services = getServices();
  const testimonials = getTestimonials();

  return (
    <>
      <JsonLd data={buildHomeSchemaGraph(site, testimonials)} />
      <Hero site={site} />
      <ServicesPreview services={services} />
      <FeaturedProjects projects={projects} />
      <WhyChooseUs items={site.whyChooseUs} />
      {testimonials.length > 0 && <TestimonialsCarousel testimonials={testimonials} />}
      <FinalCta site={site} />
    </>
  );
}
