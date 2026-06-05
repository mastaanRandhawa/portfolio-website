import { PageHeader } from "@/components/layout/page-header";
import { fetchSiteConfig } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata({
    title: "Privacy Policy",
    description: "How we collect, use, and protect your personal information.",
    path: "/privacy",
  });
}

export default async function PrivacyPage() {
  const site = await fetchSiteConfig();

  return (
    <>
      <PageHeader title="Privacy Policy" />
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-neutral">
          <p className="text-muted-foreground">Last updated: June 2026</p>
          <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
            <p>
              {site.name} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website
              or use our services.
            </p>
            <h2 className="text-xl font-semibold text-foreground">Information We Collect</h2>
            <p>
              We may collect personal information you voluntarily provide, including your name, email address, phone number,
              company name, and project details when you fill out our contact form or book a consultation.
            </p>
            <h2 className="text-xl font-semibold text-foreground">How We Use Your Information</h2>
            <p>
              We use the information we collect to respond to your inquiries, provide our services, improve our website,
              and send you relevant communications about our services.
            </p>
            <h2 className="text-xl font-semibold text-foreground">Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information. However, no method of
              transmission over the Internet is 100% secure.
            </p>
            <h2 className="text-xl font-semibold text-foreground">Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at{" "}
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
