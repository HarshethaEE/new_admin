"use client";

import type { ReactNode } from "react";
import { DASHBOARDS } from "@/config/dashboards";
import { DashboardShell, type DashboardId } from "@/shared/layout";

/* Client boundary for the dashboard shell: nav config holds icon
   components, which can't be passed as props from a server layout. */
export function RoleShell({ dashboard, children }: { dashboard: DashboardId; children: ReactNode }) {
  return <DashboardShell config={DASHBOARDS[dashboard]}>{children}</DashboardShell>;
}
