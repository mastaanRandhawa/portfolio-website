import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import type { SiteConfig } from "@/lib/types";

const footerLinks = {
  company: [
    { href: "/about", label: "About" },
    { href: "/process", label: "Process" },
    { href: "/contact", label: "Contact" },
  ],
  services: [
    { href: "/services", label: "All Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/book-consultation", label: "Book Consultation" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
};

export function Footer({ site }: { site: SiteConfig }) {
  return (
    <footer>
      <div className="gallery-hairline" />
      <div className="gallery-container py-24">
        <div className="grid gap-20 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="font-serif text-2xl tracking-[0.06em]">
              {site.name}
            </Link>
            <p className="mt-6 gallery-prose max-w-xs">
              {site.description}
            </p>
          </div>

          <div>
            <h3 className="gallery-label mb-6">Company</h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="gallery-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="gallery-label mb-6">Services</h3>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="gallery-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="gallery-label mb-6">Contact</h3>
            <ul className="space-y-4 gallery-prose text-sm">
              <li>
                <a href={`mailto:${site.contact.email}`} className="hover:opacity-60 transition-opacity">
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="hover:opacity-60 transition-opacity">
                  {site.contact.phone}
                </a>
              </li>
              <li>{site.contact.location}</li>
              <li>{site.contact.businessHours}</li>
            </ul>
          </div>
        </div>

        <Separator className="my-16 bg-border/60" />

        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="gallery-prose text-sm">
            &copy; <span suppressHydrationWarning>{new Date().getFullYear()}</span> {site.name}
          </p>
          <div className="flex gap-8">
            {footerLinks.legal.map((link) => (
              <Link key={link.href} href={link.href} className="gallery-link">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
