"use client";

import type { ReactNode } from "react";
import { DashboardProvider } from "@/shared/context/DashboardContext";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import type { DashboardConfig } from "./types";

/** Sidebar + header app shell. The window never scrolls: sidebar and header stay put and
    `<main>` is the scroll container for every page. `data-dashboard` switches brand colours. */
export const DashboardShell = ({ config, children }: { config: DashboardConfig; children: ReactNode }) => (
  <DashboardProvider theme={config.theme} viewer={config.viewer} basePath={config.basePath}>
    <div data-dashboard={config.id} className="flex h-screen overflow-hidden bg-canvas font-sans text-ink">
      <Sidebar config={config}/>
      <div className="flex-1 min-w-0 min-h-0 flex flex-col">
        <TopBar config={config}/>
        <main className="flex-1 min-h-0 flex flex-col overflow-y-auto pt-7 px-8 pb-15">
          {children}
        </main>
      </div>
    </div>
  </DashboardProvider>
);
