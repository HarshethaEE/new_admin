"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* Loads Preline's JS plugins (dropdowns, overlays, tabs, tooltips…) in the
   browser and re-initialises them after every client-side navigation, so any
   `hs-*` markup rendered by a new route becomes interactive. */
export function PrelineScript() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    import("preline").then(() => {
      if (!cancelled) window.HSStaticMethods?.autoInit();
    });
    return () => { cancelled = true; };
  }, [pathname]);

  return null;
}
