import Link from "next/link";
import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LinkButtonProps = React.ComponentProps<typeof Link> &
  VariantProps<typeof buttonVariants>;

export function LinkButton({
  className,
  variant,
  size,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

type ExternalLinkButtonProps = React.ComponentProps<"a"> &
  VariantProps<typeof buttonVariants>;

export function ExternalLinkButton({
  className,
  variant,
  size,
  ...props
}: ExternalLinkButtonProps) {
  return (
    <a
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
