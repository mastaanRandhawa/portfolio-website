import { PageHeader } from "@/components/layout/page-header";
import { fetchSiteConfig } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata({
    title: "Terms of Service",
    description: "Terms and conditions for using our website and services.",
    path: "/terms",
  });
}

export default async function TermsPage() {
  const site = await fetchSiteConfig();

  return (
    <>
      <PageHeader title="Terms of Service" />
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="gallery-container max-w-3xl">
          <p className="text-muted-foreground">Last updated: June 2026</p>
          <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
            <p>
              By accessing and using the {site.name} website, you agree to be bound by these Terms of Service.
              If you do not agree with any part of these terms, please do not use our website.
            </p>
            <h2 className="text-xl font-semibold text-foreground">Use of Website</h2>
            <p>
              You may use our website for lawful purposes only. You agree not to use the website in any way that
              violates applicable laws or regulations.
            </p>
            <h2 className="text-xl font-semibold text-foreground">Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos, and images, is the property of {site.name}
              and is protected by copyright and other intellectual property laws.
            </p>
            <h2 className="text-xl font-semibold text-foreground">Limitation of Liability</h2>
            <p>
              {site.name} shall not be liable for any indirect, incidental, or consequential damages arising from
              your use of our website or services.
            </p>
            <h2 className="text-xl font-semibold text-foreground">Contact</h2>
            <p>
              For questions about these Terms, contact us at{" "}
              <a href={`mailto:${site.contact.email}`} className="text-primary underline">
                {site.contact.email}
              </a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
