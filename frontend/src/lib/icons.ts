import { createElement } from "react";
import {
  BarChart,
  CheckCircle,
  Code,
  Headphones,
  Layers,
  Layout,
  Map,
  Palette,
  RefreshCw,
  Rocket,
  Search,
  Server,
  Settings,
  Shield,
  ShoppingCart,
  Smartphone,
  Sparkles,
  TrendingUp,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Zap,
  Smartphone,
  Search,
  TrendingUp,
  Shield,
  Settings,
  Palette,
  Layers,
  Code,
  ShoppingCart,
  Sparkles,
  Layout,
  RefreshCw,
  Wrench,
  Server,
  BarChart,
  Map,
  CheckCircle,
  Rocket,
  Headphones,
};

export function DynamicIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = iconMap[name] ?? Sparkles;
  return createElement(Icon, { className });
}
