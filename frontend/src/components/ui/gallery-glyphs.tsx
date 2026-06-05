import type { ReactElement, SVGProps } from "react";

type GlyphProps = SVGProps<SVGSVGElement>;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 0.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function PaletteGlyph(props: GlyphProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <rect x="8" y="10" width="32" height="28" {...stroke} />
      <path d="M8 18h32M20 10v8M32 10v8" {...stroke} />
      <circle cx="16" cy="30" r="2.5" {...stroke} />
      <circle cx="24" cy="30" r="2.5" {...stroke} />
      <circle cx="32" cy="30" r="2.5" {...stroke} />
    </svg>
  );
}

function CodeGlyph(props: GlyphProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <path d="M18 14L8 24l10 10M30 14l10 10-10 10M26 8L22 40" {...stroke} />
    </svg>
  );
}

function ShoppingCartGlyph(props: GlyphProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <path d="M10 12h4l3 18h18l4-14H16" {...stroke} />
      <circle cx="22" cy="36" r="2.5" {...stroke} />
      <circle cx="34" cy="36" r="2.5" {...stroke} />
    </svg>
  );
}

function SearchGlyph(props: GlyphProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <circle cx="22" cy="22" r="10" {...stroke} />
      <path d="M30 30l8 8" {...stroke} />
    </svg>
  );
}

function SparklesGlyph(props: GlyphProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <path d="M24 8v8M24 32v8M8 24h8M32 24h8" {...stroke} />
      <path d="M14 14l5.5 5.5M28.5 28.5 34 34M34 14l-5.5 5.5M14 34l5.5-5.5" {...stroke} />
    </svg>
  );
}

function LayoutGlyph(props: GlyphProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <rect x="8" y="8" width="32" height="32" {...stroke} />
      <path d="M8 20h32M20 20v20" {...stroke} />
    </svg>
  );
}

function RefreshCwGlyph(props: GlyphProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <path d="M34 18a12 12 0 0 0-20-6M14 30a12 12 0 0 0 20 6" {...stroke} />
      <path d="M34 10v8h-8M14 38v-8h8" {...stroke} />
    </svg>
  );
}

function WrenchGlyph(props: GlyphProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <path d="M30 10a8 8 0 0 1 2.5 14.5L16 41l-5-5 16.5-16.5A8 8 0 0 1 30 10z" {...stroke} />
    </svg>
  );
}

function ServerGlyph(props: GlyphProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <rect x="10" y="10" width="28" height="10" {...stroke} />
      <rect x="10" y="24" width="28" height="10" {...stroke} />
      <circle cx="16" cy="15" r="1.5" {...stroke} />
      <circle cx="16" cy="29" r="1.5" {...stroke} />
      <path d="M24 38v4M18 42h12" {...stroke} />
    </svg>
  );
}

function BarChartGlyph(props: GlyphProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <path d="M10 38V26M20 38V18M30 38V22M40 38V12" {...stroke} />
      <path d="M8 38h32" {...stroke} />
    </svg>
  );
}

function MapGlyph(props: GlyphProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <path d="M10 12l10 4 10-4 10 4v24l-10-4-10 4-10-4V12z" {...stroke} />
      <path d="M20 16v24M30 12v24" {...stroke} />
    </svg>
  );
}

function CheckCircleGlyph(props: GlyphProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <circle cx="24" cy="24" r="14" {...stroke} />
      <path d="M17 24l5 5 9-10" {...stroke} />
    </svg>
  );
}

function RocketGlyph(props: GlyphProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <path d="M24 8c8 6 12 16 10 28l-6-2-6 6-2-6C32 24 30 14 24 8z" {...stroke} />
      <path d="M18 34l-4 6M30 34l4 6" {...stroke} />
    </svg>
  );
}

function HeadphonesGlyph(props: GlyphProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <path d="M14 28a10 10 0 0 1 20 0" {...stroke} />
      <rect x="10" y="28" width="6" height="10" {...stroke} />
      <rect x="32" y="28" width="6" height="10" {...stroke} />
    </svg>
  );
}

function DefaultGlyph(props: GlyphProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <circle cx="24" cy="24" r="14" {...stroke} />
      <path d="M24 16v16M16 24h16" {...stroke} />
    </svg>
  );
}

const glyphMap: Record<string, (props: GlyphProps) => ReactElement> = {
  Palette: PaletteGlyph,
  Code: CodeGlyph,
  ShoppingCart: ShoppingCartGlyph,
  Search: SearchGlyph,
  Sparkles: SparklesGlyph,
  Layout: LayoutGlyph,
  RefreshCw: RefreshCwGlyph,
  Wrench: WrenchGlyph,
  Server: ServerGlyph,
  BarChart: BarChartGlyph,
  Map: MapGlyph,
  CheckCircle: CheckCircleGlyph,
  Rocket: RocketGlyph,
  Headphones: HeadphonesGlyph,
};

export function GalleryGlyph({
  name,
  className = "h-10 w-10 text-foreground/50",
}: {
  name: string;
  className?: string;
}) {
  const Glyph = glyphMap[name] ?? DefaultGlyph;
  return <Glyph className={className} />;
}
