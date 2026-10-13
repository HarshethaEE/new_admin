import type { CSSProperties, MouseEventHandler, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import type { IconComponent } from "./types";

export type BtnVariant = "primary" | "dark" | "amber" | "ghost" | "soft" | "danger";
export type BtnSize = "xs" | "sm" | "md" | "lg";

export interface BtnProps {
  children?: ReactNode;
  variant?: BtnVariant;
  icon?: IconComponent;
  iconRight?: IconComponent;
  size?: BtnSize;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const SIZES: Record<BtnSize, { cls: string; ic: number }> = {
  xs: { cls: "py-1.25 px-2.25 text-[11.5px]", ic: 12 },
  sm: { cls: "py-1.75 px-3 text-[12.5px]", ic: 14 },
  md: { cls: "py-2.25 px-4 text-[13.5px]", ic: 15 },
  lg: { cls: "py-3 px-5.5 text-[14.5px]", ic: 17 },
};

const VARIANTS: Record<BtnVariant, string> = {
  primary: "bg-accent text-white border-accent hover:bg-accent-dark focus:bg-accent-dark",
  dark:    "bg-ink text-white border-ink hover:bg-ink-2 focus:bg-ink-2",
  amber:   "bg-a text-white border-a hover:bg-a-dark focus:bg-a-dark",
  ghost:   "bg-paper text-ink border-border hover:bg-accent-mist focus:bg-accent-mist",
  soft:    "bg-accent-soft text-accent-deep border-accent-soft hover:bg-accent-mist focus:bg-accent-mist",
  danger:  "bg-err text-white border-err hover:bg-[#DC2626] focus:bg-[#DC2626]",
};

/** Preline-style solid / outline button themed with the dashboard accent. */
export const Btn = ({ children, variant = "primary", icon: Icon, iconRight: IconRight, size = "md", onClick, className, style, disabled, type = "button" }: BtnProps) => {
  const s = SIZES[size];
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-1.75 rounded-[10px] border font-sans font-semibold tracking-[-0.1px]",
        "transition-all duration-120 ease-in-out focus:outline-hidden disabled:opacity-50 disabled:cursor-not-allowed",
        s.cls, VARIANTS[variant], className,
      )}
      style={style}
    >
      {Icon && <Icon size={s.ic}/>}{children}{IconRight && <IconRight size={s.ic}/>}
    </button>
  );
};
