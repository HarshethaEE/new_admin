import { cn } from "@/shared/lib/cn";

export type AvatarTone = "primary" | "amber" | "green" | "purple" | "info";

export interface AvatarProps {
  name?: string;
  size?: number;
  tone?: AvatarTone | string;
  online?: boolean;
}

const TONES: Record<AvatarTone, string> = {
  primary: "bg-accent-soft text-accent-deep",
  amber:   "bg-a-soft text-a-dark",
  green:   "bg-g-soft text-g-deep",
  purple:  "bg-p-soft text-p-deep",
  info:    "bg-info-soft text-[#1E40AF]",
};

/** Preline initials avatar with optional online indicator. Size is in px. */
export const Avatar = ({ name, size = 36, tone = "primary", online }: AvatarProps) => {
  const initials = (name || "?").split(" ").map(p => p[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div className="relative shrink-0">
      <div
        className={cn("inline-flex items-center justify-center rounded-full font-extrabold tracking-[0.3px]", TONES[tone as AvatarTone] || TONES.primary)}
        style={{ width: size, height: size, fontSize: size * 0.38 }}
      >
        {initials}
      </div>
      {online && (
        <span
          className="absolute bottom-0 right-0 rounded-full bg-g border-2 border-paper"
          style={{ width: size * 0.3, height: size * 0.3 }}
        />
      )}
    </div>
  );
};
