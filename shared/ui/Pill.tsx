import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import type { Tone } from "@/shared/theme";

export interface PillProps {
  children?: ReactNode;
  tone?: Tone | string;
  size?: "sm" | "md";
  dot?: boolean;
  className?: string;
}

const TONES: Record<Tone, { pill: string; dot: string }> = {
  neutral: { pill: "bg-[#F1F5F9] text-ink-2",          dot: "bg-mute" },
  primary: { pill: "bg-accent-soft text-accent-deep",  dot: "bg-accent" },
  purple:  { pill: "bg-p-soft text-p-deep",            dot: "bg-p" },
  green:   { pill: "bg-g-soft text-g-deep",            dot: "bg-g" },
  amber:   { pill: "bg-a-soft text-a-dark",            dot: "bg-a" },
  blue:    { pill: "bg-b-soft text-b-dark",            dot: "bg-b" },
  info:    { pill: "bg-info-soft text-[#1E40AF]",      dot: "bg-info" },
  err:     { pill: "bg-err-soft text-[#B91C1C]",       dot: "bg-err" },
  ok:      { pill: "bg-g-soft text-g-deep",            dot: "bg-g" },
};

/** Preline soft badge. */
export const Pill = ({ children, tone = "neutral", size = "sm", dot, className }: PillProps) => {
  const c = TONES[tone as Tone] || TONES.neutral;
  return (
    <span className={cn(
      "inline-flex items-center rounded-full font-bold tracking-[-0.1px] whitespace-nowrap",
      dot ? "gap-1.25" : "gap-1",
      size === "sm" ? "py-0.75 px-2.25 text-[11px]" : "py-1.25 px-3 text-[12.5px]",
      c.pill, className,
    )}>
      {dot && <span className={cn("size-1.5 rounded-full", c.dot)}/>}
      {children}
    </span>
  );
};
