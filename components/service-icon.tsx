import {
  BarChart3,
  Cloud,
  Compass,
  Cpu,
  Globe2,
  Landmark,
  Settings2,
  ShieldCheck,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  compass: Compass,
  cpu: Cpu,
  chart: BarChart3,
  cloud: Cloud,
  shield: ShieldCheck,
  users: Users,
  landmark: Landmark,
  trending: TrendingUp,
  settings: Settings2,
  globe: Globe2,
};

export function ServiceIcon({ name, className = "size-6" }: { name?: string | null; className?: string }) {
  const Icon = (name && ICONS[name]) || Compass;
  return <Icon aria-hidden strokeWidth={1.5} className={className} />;
}
