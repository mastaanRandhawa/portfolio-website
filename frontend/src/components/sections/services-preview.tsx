import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MOBILE_LIST_LIMIT } from "@/components/ui/mobile-truncated-list";
import { ServiceCard } from "./service-card";
import { cn } from "@/lib/utils";
import type { Service } from "@/lib/types";

const DESKTOP_PREVIEW_LIMIT = 8;

export function ServicesPreview({ services }: { services: Service[] }) {
  const previewServices = services.slice(0, DESKTOP_PREVIEW_LIMIT);

  return (
    <section className="gallery-section" aria-labelledby="services-heading">
      <div className="gallery-container">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <div className="max-w-2xl">
            <p className="gallery-label mb-3 sm:mb-4">What We Do</p>
            <h2 id="services-heading" className="gallery-heading">
              Our Services
            </h2>
            <p className="gallery-prose mt-4 sm:mt-6">
              From design to deployment, we offer end-to-end web solutions tailored to your business goals.
            </p>
          </div>
          <Link href="/services" className="gallery-link hidden shrink-0 sm:inline-flex">
            View All
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-6">
          {previewServices.map((service, index) => (
            <div
              key={service.id}
              className={cn(index >= MOBILE_LIST_LIMIT && "hidden sm:block")}
            >
              <ServiceCard service={service} index={index} animate={false} />
            </div>
          ))}
        </div>

        <Link href="/services" className="gallery-link mt-6 sm:hidden">
          View All
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}
