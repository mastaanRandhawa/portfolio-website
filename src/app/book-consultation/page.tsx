import { PageHeader } from "@/components/layout/page-header";
import { CalendlyEmbed } from "@/components/sections/calendly-embed";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Book Consultation",
  description: "Schedule a free consultation to discuss your web project goals and requirements.",
  path: "/book-consultation",
});

export default function BookConsultationPage() {
  return (
    <>
      <PageHeader
        title="Book a Consultation"
        description="Pick a time that works for you. We'll discuss your project goals and how we can help."
      />
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <CalendlyEmbed />
        </div>
      </section>
    </>
  );
}
