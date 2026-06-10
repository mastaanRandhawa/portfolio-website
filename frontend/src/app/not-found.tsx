import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Page Not Found",
    description: "The page you requested could not be found.",
    path: "/404",
    noIndex: true,
  });
}

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center gallery-section">
      <div className="gallery-container text-center">
        <p className="font-serif text-6xl tracking-[0.06em] text-foreground/20 sm:text-8xl">404</p>
        <h1 className="gallery-subheading mt-6 sm:mt-8">Page Not Found</h1>
        <p className="gallery-prose mx-auto mt-4 max-w-md sm:mt-6">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <LinkButton href="/" className="mt-10 w-full sm:mt-12 sm:w-auto">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </LinkButton>
      </div>
    </section>
  );
}
