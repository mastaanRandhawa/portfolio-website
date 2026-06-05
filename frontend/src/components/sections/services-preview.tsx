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

  return (
    <section className="gallery-section" aria-labelledby="services-heading">
      <div className="gallery-container">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end sm:gap-10">
          <ScrollReveal className="gallery-section-intro">
            <p className="gallery-label mb-4 sm:mb-6">What We Do</p>
            <h2 id="services-heading" className="gallery-heading">
              Our Services
            </h2>
            <p className="gallery-prose mt-6 sm:mt-8">
              From design to deployment, we offer end-to-end web solutions tailored to your business goals.
            </p>
          </ScrollReveal>
          <Link href="/services" className="gallery-link shrink-0">
            View All
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 md:hidden">
          {mobileServices.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} animate={false} />
          ))}
        </div>

        <div className="mt-10 hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {desktopServices.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
