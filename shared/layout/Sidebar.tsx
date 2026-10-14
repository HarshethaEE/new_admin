"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/cn";
import { Logo } from "@/shared/ui";
import { RoleSwitcher } from "./RoleSwitcher";
import type { DashboardConfig } from "./types";

const hrefFor = (basePath: string, slug: string) => (slug === "home" ? basePath : `${basePath}/${slug}`);

const ITEM = "w-full flex items-center gap-2.75 py-2.25 px-3 mb-0.5 rounded-[9px] text-[13px] text-left no-underline transition-colors";

/** Preline-style sidebar: logo, role switcher, primary nav and footer nav. */
export const Sidebar = ({ config }: { config: DashboardConfig }) => {
  const pathname = usePathname();
  return (
    <aside className="w-62 shrink-0 h-full flex flex-col bg-paper border-e border-border">
      <div className="py-4.5 px-5 border-b border-border">
        <Logo size={config.logo.size} label={config.logo.label} accentLabel={config.logo.accentLabel}/>
      </div>

      <RoleSwitcher active={config.id} note={config.switcherNote}/>

      <nav className="flex-1 overflow-y-auto py-3 px-2">
        <div className="text-[10px] text-ink-3 font-extrabold tracking-[1.4px] uppercase px-2.5 pt-1 pb-2">Menu</div>
        {config.nav.map(item => {
          const Icon = item.icon;
          const href = hrefFor(config.basePath, item.slug);
          const on = pathname === href;
          return (
            <Link
              key={item.slug}
              href={href}
              aria-current={on ? "page" : undefined}
              className={cn(ITEM, on ? "bg-accent text-white font-bold" : "bg-transparent text-ink-2 font-medium hover:bg-accent-mist")}
            >
              <Icon size={16} className="shrink-0"/>
              <span className="flex-1">{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className={cn(
                  "text-white text-[10px] font-extrabold py-px px-1.5 rounded-full min-w-4.5 text-center",
                  on ? "bg-white/25" : "bg-a",
                )}>{item.badge}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="pt-2 px-2 pb-3 border-t border-border">
        {config.bottomNav.map(item => {
          const Icon = item.icon;
          const content = <><Icon size={16}/><span className="flex-1">{item.label}</span></>;
          if (!item.slug) {
            return (
              <button key={item.label} type="button" className={cn(ITEM, "bg-transparent border-0 text-ink-2 font-medium hover:bg-accent-mist")}>
                {content}
              </button>
            );
          }
          const href = hrefFor(config.basePath, item.slug);
          const on = pathname === href;
          return (
            <Link
              key={item.slug}
              href={href}
              aria-current={on ? "page" : undefined}
              className={cn(ITEM, "text-ink-2 hover:bg-accent-mist", on ? "bg-accent-mist font-bold" : "bg-transparent font-medium")}
            >
              {content}
            </Link>
          );
        })}
      </div>
    </aside>
  );
};
