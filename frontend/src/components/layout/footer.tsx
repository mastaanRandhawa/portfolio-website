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
    <footer className="pb-8 sm:pb-0">
      <div className="gallery-hairline" />
      <div className="gallery-container py-16 sm:py-24">
        <div className="grid gap-8 sm:gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-16">
          <div className="gallery-card-muted lg:col-span-1 lg:border-0 lg:bg-transparent lg:p-0">
            <Link href="/" className="font-serif text-xl tracking-[0.06em] sm:text-2xl">
              {site.name}
            </Link>
            <p className="mt-4 gallery-prose max-w-xs sm:mt-6">
              {site.description}
            </p>
          </div>

          <div className="gallery-card-muted lg:border-0 lg:bg-transparent lg:p-0">
            <h3 className="gallery-footer-heading">Company</h3>
            <ul className="space-y-1 sm:space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="gallery-footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="gallery-card-muted lg:border-0 lg:bg-transparent lg:p-0">
            <h3 className="gallery-footer-heading">Services</h3>
            <ul className="space-y-1 sm:space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="gallery-footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="gallery-card-muted lg:border-0 lg:bg-transparent lg:p-0">
            <h3 className="gallery-footer-heading">Contact</h3>
            <ul className="space-y-2 gallery-prose text-sm">
              <li>
                <a href={`mailto:${site.contact.email}`} className="text-foreground/85 transition-opacity hover:opacity-60">
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="text-foreground/85 transition-opacity hover:opacity-60">
                  {site.contact.phone}
                </a>
              </li>
              <li>{site.contact.location}</li>
              <li>{site.contact.businessHours}</li>
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-border/60 sm:my-14" />

        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center sm:gap-6">
          <p className="gallery-prose text-sm">
            &copy; <span suppressHydrationWarning>{new Date().getFullYear()}</span> {site.name}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 sm:gap-x-8">
            {footerLinks.legal.map((link) => (
              <Link key={link.href} href={link.href} className="gallery-footer-link">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
