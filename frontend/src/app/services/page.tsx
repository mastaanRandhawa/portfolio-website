import { PageHeader } from "@/components/layout/page-header";
import { ServicesList } from "@/components/sections/services-list";
import { JsonLd } from "@/components/layout/json-ld";
import { fetchServices, fetchSiteConfig } from "@/lib/api";
import { buildPageSchemaGraph, serviceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata({
    title: "Services",
    description:
      "Web design, development, e-commerce, SEO, and branding services in Vancouver, BC. Custom websites built for speed, conversions, and growth.",
    path: "/services",
  });
}

export default async function ServicesPage() {
  const [services, site] = await Promise.all([fetchServices(), fetchSiteConfig()]);

  return (
    <>
      <JsonLd
        data={buildPageSchemaGraph(site, {
          name: "Our Services",
          description: "End-to-end web design and development services from Doxa Studios.",
          path: "/services",
          breadcrumbs: [
            { name: "Home", path: "" },
            { name: "Services", path: "/services" },
          ],
          extra: services.map((service) => serviceSchema(service, site)),
        })}
      />
      <PageHeader
        title="Our Services"
        description="End-to-end web solutions designed to help your business grow online."
      />
      <section className="gallery-section pt-0">
        <div className="gallery-container">
          <ServicesList services={services} />
        </div>
      </section>
    </>
  );
}
