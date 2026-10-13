import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { Card } from "./Card";
import type { IconComponent } from "./types";

export interface StatKPIProps {
  label: ReactNode;
  value: ReactNode;
  sub?: ReactNode;
  trend?: ReactNode;
  trendColor?: string;
  icon?: IconComponent;
  /** Show a "•••" overflow button in the corner. */
  menu?: boolean;
}

export const StatKPI = ({ label, value, sub, trend, trendColor, icon: Icon, menu }: StatKPIProps) => (
  <Card padding={18}>
    <div className="flex justify-between items-start mb-2.5">
      <div className="text-[13px] text-ink-2 font-semibold tracking-[-0.1px]">{label}</div>
      {menu && <button type="button" aria-label="More" className="bg-transparent border-0 text-mute p-0 text-[13.33px] leading-[normal]">•••</button>}
      {Icon && (
        <div className="size-8.5 rounded-[9px] bg-accent-soft text-accent-deep flex items-center justify-center">
          <Icon size={16}/>
        </div>
      )}
    </div>
    <div className="text-[28px] font-extrabold text-ink tracking-[-1px] leading-none font-mono">{value}</div>
    {trend && (
      <div className={cn(
        "mt-3 py-2 px-2.5 rounded-lg text-[11.5px] font-semibold flex items-center gap-1.25",
        trendColor === "amber" ? "bg-a-soft text-a-dark" : "bg-accent-soft text-accent-deep",
      )}>
        <ArrowUpRight size={12}/>{trend}
      </div>
    )}
    {sub && <div className="text-[11px] text-ink-3 mt-1.5 font-medium">{sub}</div>}
  </Card>
);
