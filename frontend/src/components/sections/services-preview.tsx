import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ServiceCard } from "./service-card";
import type { Service } from "@/lib/types";

export function ServicesPreview({ services }: { services: Service[] }) {
  const previewServices = services.slice(0, 8);

  return (
    <section className="gallery-section" aria-labelledby="services-heading">
      <div className="gallery-container">
        <ScrollReveal>
          <div className="gallery-section-intro">
            <p className="gallery-label mb-4 sm:mb-6">What We Do</p>
            <h2 id="services-heading" className="gallery-heading">
              Our Services
            </h2>
            <p className="gallery-prose mt-6 sm:mt-8">
              From design to deployment, we offer end-to-end web solutions tailored to your business goals.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-4 sm:mt-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {previewServices.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        <ScrollReveal className="mt-10 sm:mt-20">
          <Link href="/services" className="gallery-link">
            View All Services
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
