"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Inbox, Search, Settings } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { useFindInPage } from "@/shared/lib/useFindInPage";
import { Avatar, Pill } from "@/shared/ui";
import type { DashboardConfig } from "./types";

const ICON_BTN = "relative size-10 bg-canvas border border-border rounded-[10px] flex items-center justify-center text-ink-2 hover:bg-accent-mist";

/** Preline-style header: search input, environment badge, actions, viewer. */
export const TopBar = ({ config }: { config: DashboardConfig }) => {
  const { viewer } = config;
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const find = useFindInPage(() => document.querySelector("main"), query);

  // A new page starts with an empty search.
  useEffect(() => setQuery(""), [pathname]);
  return (
    <header className="h-17.5 shrink-0 bg-paper border-b border-border px-8 flex items-center gap-5">
      <div className="relative flex-1 max-w-105">
        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3.5">
          <Search size={16} className="text-mute"/>
        </div>
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={find.onKeyDown}
          placeholder={config.searchPlaceholder}
          className="block w-full py-2.5 ps-10 pe-16 bg-canvas border border-border rounded-[10px] text-[13.5px] text-ink placeholder:text-mute focus:outline-hidden focus:border-accent focus:ring-1 focus:ring-accent"
        />
        {query.trim() && (
          <span className={cn("absolute inset-y-0 end-3.5 flex items-center text-[11px] font-bold font-mono pointer-events-none", find.count ? "text-ink-3" : "text-err")}>
            {find.current}/{find.count}
          </span>
        )}
      </div>

      <div className="flex-1"/>

      {config.environment && <Pill tone="green" dot>{config.environment}</Pill>}

      {config.inbox && (
        <Link
          href={`${config.basePath}/inbox`}
          aria-label="Inbox"
          title="Inbox"
          className={cn(ICON_BTN, pathname === `${config.basePath}/inbox` && "bg-accent-mist border-accent text-accent-deep")}
        >
          <Inbox size={16}/>
          {!!config.inbox.badge && (
            <span className="absolute -top-1.5 -right-1.5 min-w-4.5 h-4.5 px-1 bg-accent text-white text-[10px] font-extrabold font-mono rounded-full border-2 border-paper flex items-center justify-center">
              {config.inbox.badge}
            </span>
          )}
        </Link>
      )}
      <button type="button" aria-label="Settings" className={ICON_BTN}>
        <Settings size={16}/>
      </button>
      <button type="button" aria-label="Notifications" className={ICON_BTN}>
        <Bell size={16}/>
        <span className="absolute top-2 right-2 size-2 bg-err rounded-full border-2 border-paper"/>
      </button>

      <div className="flex items-center gap-2.5">
        <Avatar name={viewer.name} size={40}/>
        <div>
          <div className="text-[13.5px] font-bold text-ink tracking-[-0.2px] leading-[1.1]">{viewer.name}</div>
          <div className={cn("text-[11px] mt-0.5", config.viewerSubtitleAccent ? "text-accent font-bold" : "text-ink-3")}>
            {config.viewerSubtitle}
          </div>
        </div>
      </div>
    </header>
  );
};
