import { Building2, Factory, Hospital, Hotel, Package, Plane, Zap, type LucideIcon } from "lucide-react";

const TYPE_ICONS: Record<string, LucideIcon> = {
  "Industrial": Factory, "IT Campus": Building2, "Hospitality": Hotel,
  "Warehousing": Package, "Aviation": Plane, "Chemicals": Package,
  "Healthcare": Hospital, "Energy": Zap, "Manufacturing": Factory, "Steel": Factory,
};

export const typeIcon = (t: string): LucideIcon => TYPE_ICONS[t] || Building2;
