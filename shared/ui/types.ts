import type { ComponentType } from "react";

/** Any icon component taking a numeric size (lucide icons, `X`). */
export type IconComponent = ComponentType<{ size?: number; color?: string; className?: string }>;
