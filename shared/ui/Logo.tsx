"use client";

import { useId } from "react";
import { cn } from "@/shared/lib/cn";

export interface LogoProps {
  size?: number;
  /** Small caps line under the wordmark, e.g. "Energy", "HR Console". */
  label: string;
  /** Colour the label with the dashboard accent instead of muted ink. */
  accentLabel?: boolean;
}

export const Logo = ({ size = 36, label, accentLabel }: LogoProps) => {
  const id = useId();
  const sun = `${id}-sun`;
  const earth = `${id}-earth`;
  return (
    <div className="flex items-center gap-2.5">
      <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id={sun}>
            <circle cx="44" cy="20" r="16"/>
          </clipPath>
          <clipPath id={earth}>
            <circle cx="24" cy="38" r="20"/>
          </clipPath>
        </defs>
        {/* Sun — behind */}
        <circle cx="44" cy="20" r="16" fill="#F4C842"/>
        <g clipPath={`url(#${sun})`} stroke="#D4951A" strokeWidth="2" strokeLinecap="round" opacity="0.7">
          <line x1="26" y1="26" x2="56" y2="-4"/>
          <line x1="30" y1="30" x2="60" y2="0"/>
          <line x1="34" y1="34" x2="64" y2="4"/>
          <line x1="38" y1="38" x2="68" y2="8"/>
        </g>
        {/* Earth — front */}
        <circle cx="24" cy="38" r="20" fill="#607F7C"/>
        <g clipPath={`url(#${earth})`}>
          <path d="M8 22 Q16 20, 24 22 L32 24 Q38 26, 34 32 L36 36 Q34 42, 30 44 L28 50 Q24 54, 22 52 L18 50 Q14 46, 14 42 L10 36 Q6 30, 8 22 Z" fill="#263339"/>
        </g>
      </svg>
      <div className="leading-none">
        <div className="text-[15px] font-extrabold text-ink tracking-[-0.5px]">elements</div>
        <div className={cn("text-[8.5px] font-bold tracking-[2.6px] uppercase mt-0.5", accentLabel ? "text-accent" : "text-ink-2")}>{label}</div>
      </div>
    </div>
  );
};
