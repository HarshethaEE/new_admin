"use client";

import { createContext, useCallback, useContext, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { greenTheme, type Tokens } from "@/shared/theme";

export interface Viewer {
  name: string;
  role: string;
}

interface DashboardContextValue {
  theme: Tokens;
  viewer: Viewer;
  basePath: string;
}

const DashboardContext = createContext<DashboardContextValue>({
  theme: greenTheme,
  viewer: { name: "", role: "" },
  basePath: "",
});

export function DashboardProvider({ children, ...value }: DashboardContextValue & { children: ReactNode }) {
  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export const useTheme = () => useContext(DashboardContext).theme;
export const useViewer = () => useContext(DashboardContext).viewer;
export const useBasePath = () => useContext(DashboardContext).basePath;

/** Navigate to a sibling view of the current dashboard, e.g. `nav("projects")`. */
export function useDashboardNav() {
  const router = useRouter();
  const basePath = useBasePath();
  return useCallback((slug: string) => router.push(slug === "home" ? basePath : `${basePath}/${slug}`), [router, basePath]);
}
