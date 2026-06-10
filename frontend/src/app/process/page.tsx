import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { ProcessFlow } from "@/components/sections/process-flow";
import { JsonLd } from "@/components/layout/json-ld";
import { fetchProcessSteps, fetchSiteConfig } from "@/lib/api";
import { buildPageSchemaGraph } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata({
    title: "Our Process",
    description:
      "Our proven 7-step web design and development process — from discovery and strategy through launch and ongoing support.",
    path: "/process",
  });
}

export default async function ProcessPage() {
  const [steps, site] = await Promise.all([fetchProcessSteps(), fetchSiteConfig()]);

  return (
    <>
      <JsonLd
        data={buildPageSchemaGraph(site, {
          name: "Our Process",
          description: "A structured approach to delivering web projects on time and on budget.",
          path: "/process",
          breadcrumbs: [
            { name: "Home", path: "" },
            { name: "Process", path: "/process" },
          ],
        })}
      />
      <PageHeader
        title="Our Process"
        description="A structured approach that ensures every project is delivered on time, on budget, and above expectations."
      />
      <section className="gallery-section pt-0">
        <div className="gallery-container">
          <ProcessFlow steps={steps} />
          <div className="mt-16 flex flex-wrap gap-6 sm:mt-24">
            <Link href="/contact" className="gallery-link">
              Start Your Project
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link href="/book-consultation" className="gallery-link">
              Book a Consultation
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
