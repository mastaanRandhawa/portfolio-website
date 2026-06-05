import { PageHeader } from "@/components/layout/page-header";
import { ProcessFlow } from "@/components/sections/process-flow";
import { fetchProcessSteps } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata({
    title: "Our Process",
    description: "A proven 7-step process from discovery to launch and ongoing support.",
    path: "/process",
  });
}

export default async function ProcessPage() {
  const steps = await fetchProcessSteps();

  return (
    <>
      <PageHeader
        title="Our Process"
        description="A structured approach that ensures every project is delivered on time, on budget, and above expectations."
      />
      <section className="gallery-section pt-0">
        <div className="gallery-container">
          <ProcessFlow steps={steps} />
        </div>
      </section>
    </>
  );
}
