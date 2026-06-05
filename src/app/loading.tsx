import { MorphingSpinner } from "@/components/ui/morphing-spinner";

export default function Loading() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-5">
      <MorphingSpinner size="lg" />
      <p className="gallery-label text-muted-foreground">Loading</p>
    </div>
  );
}
