"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Crown, TrendingUp } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { Avatar } from "@/shared/ui";
import type { LeaderboardEntry } from "./types";

const MEDALS = ["#F59E0B", "#94A3B8", "#B45309"];

/** Crown button in the top bar: your rank as a badge, click for a top-5 popover. */
export const LeaderboardButton = ({ entries, href, className }: { entries: LeaderboardEntry[]; href: string; className: string }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const me = entries.find(e => e.isMe);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("mousedown", close); document.removeEventListener("keydown", esc); };
  }, [open]);

  const top = entries.slice(0, 5);
  const showMeBelow = me && me.rank > 5;

  const row = (e: LeaderboardEntry) => (
    <div key={e.rank} className={cn("flex items-center gap-2.5 py-2 px-3 rounded-lg", e.isMe && "bg-accent-mist")}>
      <span className="w-6 text-center text-[12px] font-extrabold font-mono" style={{ color: MEDALS[e.rank - 1] ?? undefined }}>
        {e.rank <= 3 ? <Crown size={14} className="inline" fill="currentColor"/> : `#${e.rank}`}
      </span>
      <Avatar name={e.name} size={28} tone={e.isMe ? "green" : "primary"}/>
      <div className="flex-1 min-w-0">
        <div className="text-[12.5px] font-bold text-ink truncate">{e.isMe ? "You" : e.name}</div>
        <div className="text-[10.5px] text-ink-3 truncate">{e.dept}</div>
      </div>
      <span className="text-[12px] font-extrabold font-mono text-ink">{e.points.toLocaleString("en-IN")}</span>
    </div>
  );

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label={me ? `Leaderboard — you're #${me.rank}` : "Leaderboard"}
        title={me ? `Leaderboard · you're #${me.rank}` : "Leaderboard"}
        onClick={() => setOpen(o => !o)}
        className={cn(className, open && "bg-accent-mist border-accent")}
      >
        <Crown size={16} className="text-a"/>
        {me && (
          <span className="absolute -top-1.5 -right-1.5 min-w-4.5 h-4.5 px-1 bg-a text-white text-[10px] font-extrabold font-mono rounded-full border-2 border-paper flex items-center justify-center">
            {me.rank}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 w-80 bg-paper border border-border rounded-xl shadow-[0_12px_40px_rgba(15,23,42,0.18)] z-50 overflow-hidden">
          {me && (
            <div className="py-3.5 px-4 bg-accent-mist border-b border-border flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-a text-white flex items-center justify-center text-[15px] font-extrabold font-mono">#{me.rank}</div>
              <div className="flex-1">
                <div className="text-[13.5px] font-extrabold text-ink">Your position</div>
                <div className="text-[11.5px] text-ink-3 mt-0.5">
                  {me.points.toLocaleString("en-IN")} pts
                  {me.rank > 1 && <> · {(entries[me.rank - 2].points - me.points).toLocaleString("en-IN")} behind #{me.rank - 1}</>}
                </div>
              </div>
              <span className="text-[11px] font-bold text-accent-deep flex items-center gap-1"><TrendingUp size={12}/>+{me.delta}</span>
            </div>
          )}
          <div className="p-1.5">
            {top.map(row)}
            {showMeBelow && <>
              <div className="text-center text-ink-3 text-[11px] leading-none py-1">⋯</div>
              {row(me)}
            </>}
          </div>
          <Link href={href} onClick={() => setOpen(false)} className="flex items-center justify-center gap-1.5 py-2.5 border-t border-border text-[12px] font-bold text-accent-deep hover:bg-accent-mist">
            View full leaderboard<ArrowRight size={13}/>
          </Link>
        </div>
      )}
    </div>
  );
};
