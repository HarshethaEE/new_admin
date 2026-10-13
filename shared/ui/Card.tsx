import type { HTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: number | string;
}

/** Preline card surface. `padding` is kept as a prop for exact per-card spacing. */
export const Card = ({ children, className, style, padding = 20, ...rest }: CardProps) => (
  <div
    className={cn("bg-paper border border-border rounded-2xl shadow-[0_1px_2px_rgba(16,24,40,0.03)]", className)}
    style={{ padding, ...style }}
    {...rest}
  >
    {children}
  </div>
);
