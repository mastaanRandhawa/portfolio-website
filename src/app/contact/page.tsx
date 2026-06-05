import { PageHeader } from "@/components/layout/page-header";
import { ContactForm } from "@/components/sections/contact-form";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { getSiteConfig } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Get in touch to discuss your next web project. We'd love to hear from you.",
  path: "/contact",
});

export default function ContactPage() {
  const site = getSiteConfig();

  return (
    <>
      <PageHeader
        title="Contact Us"
        description="Tell us about your project and we'll get back to you within 24 hours."
      />
      <section className="gallery-section pt-0">
        <div className="gallery-container">
          <div className="grid gap-24 lg:grid-cols-12 lg:gap-32">
            <ScrollReveal className="lg:col-span-7">
              <p className="gallery-label mb-6">Inquiry</p>
              <p className="gallery-prose max-w-xl">
                Share a few details about your project. We review every message personally and respond within one business day.
              </p>
              <div className="mt-16">
                <ContactForm />
              </div>
            </ScrollReveal>

            <aside className="lg:col-span-5 lg:pt-2">
              <ScrollReveal delay={0.08}>
                <p className="gallery-label mb-12">Details</p>
                <ul className="space-y-12">
                  <li>
                    <p className="gallery-label mb-3">Email</p>
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="font-serif text-xl tracking-[0.02em] text-foreground/85 transition-opacity hover:opacity-60"
                    >
                      {site.contact.email}
                    </a>
                  </li>
                  <li>
                    <p className="gallery-label mb-3">Phone</p>
                    <a
                      href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                      className="font-serif text-xl tracking-[0.02em] text-foreground/85 transition-opacity hover:opacity-60"
                    >
                      {site.contact.phone}
                    </a>
                  </li>
                  <li>
                    <p className="gallery-label mb-3">Location</p>
                    <p className="gallery-prose">{site.contact.location}</p>
                  </li>
                  <li>
                    <p className="gallery-label mb-3">Hours</p>
                    <p className="gallery-prose">{site.contact.businessHours}</p>
                  </li>
                </ul>
              </ScrollReveal>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
