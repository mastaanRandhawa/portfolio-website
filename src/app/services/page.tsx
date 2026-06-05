import { PageHeader } from "@/components/layout/page-header";
import { ServicesList } from "@/components/sections/services-list";
import { getServices } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Services",
  description: "Web design, development, e-commerce, SEO, branding, and more — tailored to your business goals.",
  path: "/services",
});

export default function ServicesPage() {
  const services = getServices();

  return (
    <>
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
