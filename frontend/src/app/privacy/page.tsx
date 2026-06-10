import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { getSiteConfig } from "@/lib/content";
import { buildPageSchemaGraph } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/layout/json-ld";

export async function generateMetadata() {
  return buildMetadata({
    title: "Privacy Policy",
    description: "How Doxa Studios collects, uses, and protects your personal information.",
    path: "/privacy",
  });
}

export default function PrivacyPage() {
  const site = getSiteConfig();

  return (
    <>
      <JsonLd
        data={buildPageSchemaGraph(site, {
          name: "Privacy Policy",
          description: "Privacy policy for Doxa Studios website and services.",
          path: "/privacy",
          breadcrumbs: [
            { name: "Home", path: "" },
            { name: "Privacy Policy", path: "/privacy" },
          ],
        })}
      />
      <PageHeader title="Privacy Policy" />
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="gallery-container max-w-3xl prose prose-neutral prose-sm sm:prose-base">
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
              </a>
              {" "}or read our{" "}
              <Link href="/terms" className="text-primary underline">
                Terms of Service
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
