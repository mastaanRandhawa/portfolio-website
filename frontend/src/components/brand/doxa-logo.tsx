import { DOXA_LOGO_PATH } from "@/lib/brand";
import { cn } from "@/lib/utils";

type DoxaLogoProps = {
  className?: string;
  /** Use on dark backgrounds (e.g. mobile footer) */
  variant?: "default" | "inverse";
  priority?: boolean;
};

export function DoxaLogo({
  className,
  variant = "default",
  priority = false,
}: DoxaLogoProps) {
  return (
    // Native img preserves SVG aspect ratio better than next/image here.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={DOXA_LOGO_PATH}
      alt=""
      width={112}
      height={68}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      className={cn(
        "block shrink-0 object-contain object-left",
        variant === "inverse" && "brightness-0 invert",
        className
      )}
    />
  );
}
