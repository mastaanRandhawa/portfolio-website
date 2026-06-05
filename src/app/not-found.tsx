import { ArrowLeft } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center gallery-section">
      <div className="gallery-container text-center">
        <p className="font-serif text-8xl tracking-[0.06em] text-foreground/20">404</p>
        <h1 className="gallery-subheading mt-8">Page Not Found</h1>
        <p className="gallery-prose mx-auto mt-6 max-w-md">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <LinkButton href="/" className="mt-12">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </LinkButton>
      </div>
    </section>
  );
}
