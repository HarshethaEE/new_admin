/* Design tokens shared by every dashboard.
   Employee + HR Management use the green theme; Admin uses purple.
   `accent*` keys are the theme's primary colour, used by shared UI. */

const palette = {
  p: "#8B5CF6", pDark: "#7C3AED", pDeep: "#5B21B6", pLight: "#A78BFA",
  pSoft: "#EDE9FE", pMist: "#F5F3FF", pBg: "#FAFAFC",
  g: "#10B981", gDark: "#059669", gDeep: "#047857", gLight: "#34D399",
  gSoft: "#D1FAE5", gMist: "#ECFDF5", gBg: "#F6FBF8",
  a: "#F59E0B", aDark: "#D97706", aSoft: "#FEF3C7", aMist: "#FFFBEB",
  b: "#3B82F6", bDark: "#2563EB", bSoft: "#DBEAFE",
  err: "#EF4444", errSoft: "#FEE2E2",
  warn: "#F59E0B", info: "#3B82F6", infoSoft: "#DBEAFE",
  gold: "#F59E0B", silver: "#9CA3AF", bronze: "#D97706",
  paper: "#FFFFFF", borderStrong: "#D1D5DB",
  ink: "#0F172A", ink2: "#334155", ink3: "#64748B",
  mute: "#94A3B8", faint: "#CBD5E1",
};

export interface Tokens extends Record<keyof typeof palette, string> {
  bg: string;
  border: string;
  accent: string;
  accentDark: string;
  accentDeep: string;
  accentLight: string;
  accentSoft: string;
  accentMist: string;
}

export const greenTheme: Tokens = {
  ...palette,
  bg: "#F7F9F8",
  border: "#E5E9EB",
  accent: palette.g, accentDark: palette.gDark, accentDeep: palette.gDeep,
  accentLight: palette.gLight, accentSoft: palette.gSoft, accentMist: palette.gMist,
};

export const purpleTheme: Tokens = {
  ...palette,
  bg: "#F8F7FB",
  border: "#E8E6EE",
  accent: palette.p, accentDark: palette.pDark, accentDeep: palette.pDeep,
  accentLight: palette.pLight, accentSoft: palette.pSoft, accentMist: palette.pMist,
};

export const FONT = `var(--font-jakarta), 'Plus Jakarta Sans', var(--font-lato), 'Lato', -apple-system, BlinkMacSystemFont, sans-serif`;
export const MONO = `var(--font-jetbrains), 'JetBrains Mono', 'SF Mono', Menlo, monospace`;

export type Tone = "neutral" | "primary" | "purple" | "green" | "amber" | "blue" | "info" | "err" | "ok";
