import { PageHeader } from "@/components/layout/page-header";
import { ContactForm } from "@/components/sections/contact-form";
import { JsonLd } from "@/components/layout/json-ld";
import { getSiteConfig } from "@/lib/content";
import {
  getContactVisibility,
  getFormattedAddressLines,
  getFormattedLocation,
  getPhoneHref,
} from "@/lib/contact";
import { buildPageSchemaGraph } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata({
    title: "Contact",
    description:
      "Contact Doxa Studios in Vancouver, BC for web design and development. Call +1 (604) 367-8091 or email info@doxastudios.ca.",
    path: "/contact",
  });
}

export default function ContactPage() {
  const site = getSiteConfig();
  const visibility = getContactVisibility(site.contact);
  const location = getFormattedLocation(site.contact);
  const addressLines = getFormattedAddressLines(site.contact);

  return (
    <>
      <JsonLd
        data={buildPageSchemaGraph(site, {
          name: "Contact Us",
          description: "Get in touch with Doxa Studios to discuss your web project.",
          path: "/contact",
          breadcrumbs: [
            { name: "Home", path: "" },
            { name: "Contact", path: "/contact" },
          ],
        })}
      />
      <PageHeader
        title="Contact Us"
        description="Tell us about your project and we'll get back to you within 24 hours."
      />
      <section className="pb-16 pt-6 sm:pb-24 sm:pt-8 lg:pb-32">
        <div className="gallery-container">
          <div className="grid gap-10 sm:gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-7">
              <p className="gallery-label mb-3">Inquiry</p>
              <p className="gallery-prose max-w-xl">
                Share a few details about your project. We review every message personally and respond within one business day.
              </p>
              <div className="mt-8 sm:mt-10">
                <ContactForm contactEmail={site.contact.email} />
              </div>
            </div>

            <aside className="lg:col-span-5 lg:pt-1">
              <p className="gallery-label mb-6 sm:mb-8">Details</p>
              <ul className="space-y-6 sm:space-y-8">
                {visibility.email && (
                  <li>
                    <p className="gallery-label mb-2">Email</p>
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="font-serif text-lg tracking-[0.02em] text-foreground/85 transition-opacity hover:opacity-60 sm:text-xl"
                    >
                      {site.contact.email}
                    </a>
                  </li>
                )}
                {visibility.phone && (
                  <li>
                    <p className="gallery-label mb-2">Phone</p>
                    <a
                      href={getPhoneHref(site.contact.phone)}
                      className="font-serif text-lg tracking-[0.02em] text-foreground/85 transition-opacity hover:opacity-60 sm:text-xl"
                    >
                      {site.contact.phone}
                    </a>
                  </li>
                )}
                {(visibility.address || visibility.location) && (
                  <li>
                    <p className="gallery-label mb-2">Location</p>
                    <div className="gallery-prose space-y-1">
                      {addressLines.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                      {!visibility.address && location && <p>{location}</p>}
                    </div>
                  </li>
                )}
                {visibility.hours && (
                  <li>
                    <p className="gallery-label mb-2">Hours</p>
                    <p className="gallery-prose">{site.contact.businessHours}</p>
                  </li>
                )}
              </ul>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
