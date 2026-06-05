import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { MOBILE_LIST_LIMIT } from "@/components/ui/mobile-truncated-list";
import { ServiceCard } from "./service-card";
import type { Service } from "@/lib/types";

const DESKTOP_PREVIEW_LIMIT = 8;

export function ServicesPreview({ services }: { services: Service[] }) {
  const mobileServices = services.slice(0, MOBILE_LIST_LIMIT);
  const desktopServices = services.slice(0, DESKTOP_PREVIEW_LIMIT);
  const hasMoreServices = services.length > MOBILE_LIST_LIMIT;

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

        <div className="grid gap-4 md:hidden">
          {mobileServices.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        <div className="mt-4 hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {desktopServices.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {hasMoreServices && (
          <ScrollReveal className="mt-8 md:mt-20">
            <Link href="/services" className="gallery-link">
              View all services
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
