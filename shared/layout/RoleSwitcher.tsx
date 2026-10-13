import Link from "next/link";
import { Shield, Sparkles, User, Users } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import type { DashboardId } from "./types";

/* Each option keeps its own role colour regardless of the current dashboard. */
const OPTIONS = [
  { id: "employee",   label: "Employee", icon: User,   href: "/employee",   on: "bg-g-soft text-g-deep border-g-soft", tile: "bg-g text-white", idle: "bg-g-soft text-g-deep", dot: "bg-g" },
  { id: "management", label: "Mngt",     icon: Users,  href: "/management", on: "bg-g-soft text-g-deep border-g-soft", tile: "bg-g text-white", idle: "bg-g-soft text-g-deep", dot: "bg-g" },
  { id: "admin",      label: "Admin",    icon: Shield, href: "/admin",      on: "bg-p-soft text-p-deep border-p-soft", tile: "bg-p text-white", idle: "bg-p-soft text-p-deep", dot: "bg-p" },
] as const;

export const RoleSwitcher = ({ active, note }: { active: DashboardId; note?: string }) => (
  <div className="p-3 border-b border-border">
    <div className="text-[10px] text-ink-3 font-extrabold tracking-[1.4px] uppercase px-1 pt-1 pb-2">Dashboard</div>
    <div className="flex flex-col gap-1">
      {OPTIONS.map(o => {
        const Icon = o.icon;
        const isActive = o.id === active;
        return (
          <Link
            key={o.id}
            href={o.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex items-center gap-2.5 w-full py-2.25 px-2.75 rounded-[9px] border text-left text-[12.5px] no-underline",
              isActive ? cn(o.on, "font-bold") : "bg-transparent text-ink-2 border-transparent font-semibold hover:bg-canvas",
            )}
          >
            <div className={cn("size-6 rounded-[7px] flex items-center justify-center", isActive ? o.tile : o.idle)}>
              <Icon size={13}/>
            </div>
            <span className="flex-1">{o.label}</span>
            {isActive && <span className={cn("size-1.5 rounded-full", o.dot)}/>}
          </Link>
        );
      })}
    </div>
    {note && (
      <div className="mt-2 py-1.5 px-2.5 bg-p-mist rounded-md flex items-center gap-1.5">
        <Sparkles size={10} className="text-p-deep"/>
        <span className="text-[10px] text-p-deep font-bold tracking-[0.2px]">{note}</span>
      </div>
    )}
  </div>
);
