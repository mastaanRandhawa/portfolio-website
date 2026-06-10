import { PageHeader } from "@/components/layout/page-header";
import { CalendlyEmbed } from "@/components/sections/calendly-embed";
import { JsonLd } from "@/components/layout/json-ld";
import { fetchSiteConfig } from "@/lib/api";
import { buildPageSchemaGraph } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata({
    title: "Book Consultation",
    description:
      "Schedule a free web design consultation with Doxa Studios in Vancouver, BC. Discuss your goals, timeline, and budget.",
    path: "/book-consultation",
  });
}

export default async function BookConsultationPage() {
  const site = await fetchSiteConfig();

  return (
    <>
      <JsonLd
        data={buildPageSchemaGraph(site, {
          name: "Book a Consultation",
          description: "Schedule a free consultation with Doxa Studios.",
          path: "/book-consultation",
          breadcrumbs: [
            { name: "Home", path: "" },
            { name: "Book Consultation", path: "/book-consultation" },
          ],
        })}
      />
      <PageHeader
        title="Book a Consultation"
        description="Pick a time that works for you. We'll discuss your project goals and how we can help."
      />
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="gallery-container max-w-4xl">
          <CalendlyEmbed />
        </div>
      </section>
    </>
  );
}
