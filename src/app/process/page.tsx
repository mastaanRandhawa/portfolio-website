import { PageHeader } from "@/components/layout/page-header";
import { ProcessFlow } from "@/components/sections/process-flow";
import { getProcessSteps } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Our Process",
  description: "A proven 7-step process from discovery to launch and ongoing support.",
  path: "/process",
});

export default function ProcessPage() {
  const steps = getProcessSteps();

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
