import type { Viewer } from "@/shared/context/DashboardContext";
import type { Tokens } from "@/shared/theme";
import type { IconComponent } from "@/shared/ui";

export type DashboardId = "employee" | "management" | "admin";

export interface NavItem {
  /** Route segment under the dashboard's basePath; "home" is the index route. */
  slug: string;
  label: string;
  icon: IconComponent;
  badge?: number;
}

export interface BottomNavItem {
  /** Omit for items that don't have a page yet. */
  slug?: string;
  label: string;
  icon: IconComponent;
}

export interface DashboardConfig {
  id: DashboardId;
  basePath: string;
  theme: Tokens;
  viewer: Viewer;
  /** Line under the viewer's name in the top bar. */
  viewerSubtitle: string;
  /** Render the subtitle in the accent colour (bold) instead of muted text. */
  viewerSubtitleAccent?: boolean;
  logo: { label: string; size: number; accentLabel?: boolean };
  searchPlaceholder: string;
  /** Environment badge shown in the top bar, e.g. "Production". */
  environment?: string;
  /** Small note under the role switcher. */
  switcherNote?: string;
  nav: NavItem[];
  bottomNav: BottomNavItem[];
}
