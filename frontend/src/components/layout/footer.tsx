import Link from "next/link";
import { DoxaLogo } from "@/components/brand/doxa-logo";
import { Separator } from "@/components/ui/separator";
import { mainNavLinks } from "@/lib/navigation";
import { cn } from "@/lib/utils";
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

const navigateLinks = [
  { href: "/", label: "Home" },
  ...mainNavLinks,
  { href: "/book-consultation", label: "Book Consultation" },
];

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.25" cy="6.75" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

const socialLinks = [
  { key: "linkedin", label: "LinkedIn", icon: LinkedInIcon, className: "bg-[#0A66C2]" },
  { key: "instagram", label: "Instagram", icon: InstagramIcon, className: "bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]" },
  { key: "twitter", label: "Twitter", icon: TwitterIcon, className: "bg-[#14171A]" },
  { key: "github", label: "GitHub", icon: GitHubIcon, className: "bg-off-white/15" },
] as const;

function MobileFooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-off-white">
      {children}
    </h3>
  );
}

function ContactBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <p className="font-sans text-sm font-semibold text-off-white">{label}</p>
      <div className="font-sans text-sm leading-relaxed text-off-white/75">{children}</div>
    </div>
  );
}

function SocialIconLink({
  href,
  label,
  icon: Icon,
  className,
}: {
  href: string;
  label: string;
  icon: () => React.ReactNode;
  className: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "flex size-9 items-center justify-center rounded-full text-off-white transition-opacity duration-300 ease-out hover:opacity-80",
        className
      )}
    >
      <Icon />
    </a>
  );
}

export function Footer({ site }: { site: SiteConfig }) {
  const activeSocials = socialLinks.filter((social) => site.social[social.key]);

  return (
    <footer className="pb-8 sm:pb-0">
      <div className="gallery-hairline md:hidden" />

      {/* Mobile footer */}
      <div className="bg-charcoal text-off-white md:hidden">
        <div className="gallery-container py-8">
          <Link
            href="/"
            className="mb-8 inline-flex transition-opacity duration-300 ease-out hover:opacity-75"
            aria-label={site.name}
          >
            <DoxaLogo variant="inverse" className="h-8 w-auto" />
          </Link>

          <div className="flex items-center justify-between gap-6 border-b border-off-white/15 pb-6">
            <MobileFooterHeading>Follow Us</MobileFooterHeading>
            {activeSocials.length > 0 && (
              <div className="flex items-center gap-2.5">
                {activeSocials.map((social) => (
                  <SocialIconLink
                    key={social.key}
                    href={site.social[social.key]}
                    label={social.label}
                    icon={social.icon}
                    className={social.className}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-8 py-8">
            <div>
              <MobileFooterHeading>Contact Us</MobileFooterHeading>
              <div className="mt-5 space-y-5">
                <ContactBlock label="Address:">
                  <p>{site.contact.location}</p>
                  <p>{site.contact.businessHours}</p>
                </ContactBlock>
                <ContactBlock label="Contact:">
                  <a
                    href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                    className="transition-opacity hover:opacity-70"
                  >
                    {site.contact.phone}
                  </a>
                </ContactBlock>
                <ContactBlock label="E-mail:">
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="break-all transition-opacity hover:opacity-70"
                  >
                    {site.contact.email}
                  </a>
                </ContactBlock>
              </div>
            </div>

            <div>
              <MobileFooterHeading>Navigate</MobileFooterHeading>
              <ul className="mt-5 space-y-2.5">
                {navigateLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm text-off-white/75 transition-colors duration-300 ease-out hover:text-off-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-off-white/15 pt-6">
            <p className="font-sans text-xs text-off-white/55">
              &copy; <span suppressHydrationWarning>{new Date().getFullYear()}</span> {site.name}
            </p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-sans text-xs text-off-white/55 transition-colors duration-300 ease-out hover:text-off-white/80"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop footer */}
      <div className="hidden md:block">
        <div className="gallery-hairline" />
        <div className="gallery-container py-16 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-4 lg:gap-16">
            <div className="lg:col-span-1">
              <Link
                href="/"
                className="inline-flex transition-opacity duration-300 ease-out hover:opacity-75"
                aria-label={site.name}
              >
                <DoxaLogo className="h-10 w-auto" />
              </Link>
              <p className="mt-6 gallery-prose max-w-xs">{site.description}</p>
              {activeSocials.length > 0 && (
                <div className="mt-8 flex items-center gap-3">
                  {activeSocials.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.key}
                        href={site.social[social.key]}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="text-muted-foreground transition-colors duration-300 ease-out hover:text-foreground"
                      >
                        <Icon />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            <div>
              <h3 className="gallery-footer-heading">Company</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="gallery-footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="gallery-footer-heading">Services</h3>
              <ul className="space-y-2">
                {footerLinks.services.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="gallery-footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="gallery-footer-heading">Contact</h3>
              <ul className="space-y-2 gallery-prose text-sm">
                <li>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="text-foreground/85 transition-opacity hover:opacity-60"
                  >
                    {site.contact.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                    className="text-foreground/85 transition-opacity hover:opacity-60"
                  >
                    {site.contact.phone}
                  </a>
                </li>
                <li>{site.contact.location}</li>
                <li>{site.contact.businessHours}</li>
              </ul>
            </div>
          </div>

          <Separator className="my-14 bg-border/60" />

          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <p className="gallery-prose text-sm">
              &copy; <span suppressHydrationWarning>{new Date().getFullYear()}</span> {site.name}
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              {footerLinks.legal.map((link) => (
                <Link key={link.href} href={link.href} className="gallery-footer-link">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
