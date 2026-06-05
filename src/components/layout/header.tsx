"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mainNavLinks, ctaNavLink, isNavLinkActive } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 32;

function NavLink({
  href,
  label,
  pathname,
  onNavigate,
  className,
}: {
  href: string;
  label: string;
  pathname: string;
  onNavigate?: () => void;
  className?: string;
}) {
  const active = isNavLinkActive(pathname, href);

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "font-sans text-xs uppercase tracking-[0.18em] transition-colors duration-300 ease-out",
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
        className
      )}
    >
      {label}
    </Link>
  );
}

export function Header({ siteName }: { siteName: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300 ease-out",
        scrolled
          ? "border-b border-border/50 bg-background/72 shadow-[0_8px_32px_rgba(26,26,26,0.04)] backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-background/65"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-8 px-8 py-4 sm:px-12 sm:py-5 lg:px-16 xl:px-20">
        <Link
          href="/"
          className="shrink-0 font-serif text-xl tracking-[0.06em] text-foreground transition-colors duration-300 ease-out hover:text-foreground/75"
          aria-current={pathname === "/" ? "page" : undefined}
        >
          {siteName}
        </Link>

        <nav className="hidden items-center gap-10 md:flex" aria-label="Main navigation">
          {mainNavLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              pathname={pathname}
            />
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <LinkButton href={ctaNavLink.href} className="hidden md:inline-flex">
            {ctaNavLink.label}
          </LinkButton>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm border-l border-border/60">
              <SheetHeader>
                <SheetTitle className="font-serif text-2xl tracking-wide">{siteName}</SheetTitle>
              </SheetHeader>
              <nav className="mt-12 flex flex-col gap-8" aria-label="Mobile navigation">
                {mainNavLinks.map((link) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    pathname={pathname}
                    onNavigate={closeMenu}
                    className="text-sm"
                  />
                ))}
                <LinkButton
                  href={ctaNavLink.href}
                  className="mt-4 w-full"
                  onClick={closeMenu}
                >
                  {ctaNavLink.label}
                </LinkButton>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
