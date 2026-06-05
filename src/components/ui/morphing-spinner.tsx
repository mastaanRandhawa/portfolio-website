"use client";

import { cn } from "@/lib/utils";

interface MorphingSpinnerProps {
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  xs: "h-4 w-4",
  sm: "h-6 w-6",
  md: "h-8 w-8",
  lg: "h-12 w-12",
} as const;

export function MorphingSpinner({ size = "md", className }: MorphingSpinnerProps) {
  return (
    <div
      className={cn("relative", sizeClasses[size], className)}
      role="status"
      aria-label="Loading"
    >
      <div className="absolute inset-0 animate-smooth-morph bg-primary" />
    </div>
  );
}
