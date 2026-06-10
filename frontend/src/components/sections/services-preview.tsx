import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MOBILE_LIST_LIMIT } from "@/lib/constants";
import { ServiceCard } from "./service-card";
import type { Service } from "@/lib/types";

const DESKTOP_PREVIEW_LIMIT = 8;

export function ServicesPreview({ services }: { services: Service[] }) {
  const mobileServices = services.slice(0, MOBILE_LIST_LIMIT);
  const desktopServices = services.slice(0, DESKTOP_PREVIEW_LIMIT);

  return (
    <section className="gallery-section" aria-labelledby="services-heading">
      <div className="gallery-container">
        <div className="max-w-2xl">
          <p className="gallery-label mb-3 sm:mb-4">What We Do</p>
          <h2 id="services-heading" className="gallery-heading">
            Our Services
          </h2>
          <p className="gallery-prose mt-4 sm:mt-6">
            From design to deployment, we offer end-to-end web solutions tailored to your business goals.
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:hidden">
          {mobileServices.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} animate={false} />
          ))}
        </div>

        <div className="mt-8 hidden gap-4 sm:grid sm:grid-cols-2 lg:mt-10 lg:grid-cols-4 lg:gap-6">
          {desktopServices.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} animate={false} />
          ))}
        </div>

        <div className="mt-6 flex sm:mt-8">
          <Link href="/services" className="gallery-link">
            View All
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
