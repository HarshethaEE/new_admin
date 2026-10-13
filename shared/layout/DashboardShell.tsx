"use client";

import type { ReactNode } from "react";
import { DashboardProvider } from "@/shared/context/DashboardContext";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import type { DashboardConfig } from "./types";

/** Sidebar + header layout. `data-dashboard` switches the brand colours in brand.css. */
export const DashboardShell = ({ config, children }: { config: DashboardConfig; children: ReactNode }) => (
  <DashboardProvider theme={config.theme} viewer={config.viewer} basePath={config.basePath}>
    <div data-dashboard={config.id} className="flex min-h-screen bg-canvas font-sans text-ink">
      <Sidebar config={config}/>
      <div className="flex-1 min-w-0 flex flex-col">
        <TopBar config={config}/>
        <main className="flex-1 pt-7 px-8 pb-15 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  </DashboardProvider>
);
