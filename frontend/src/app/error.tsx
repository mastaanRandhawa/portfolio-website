"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="gallery-section min-h-[50vh] flex items-center">
      <div className="gallery-container text-center">
        <p className="gallery-label">Error</p>
        <h1 className="gallery-heading mt-6">Something went wrong</h1>
        <p className="gallery-prose mt-8 max-w-md mx-auto">
          We couldn&apos;t load this page. Please try again.
        </p>
        <Button className="mt-10 w-full sm:mt-12 sm:w-auto" onClick={reset}>
          Try Again
        </Button>
      </div>
    </section>
  );
}
