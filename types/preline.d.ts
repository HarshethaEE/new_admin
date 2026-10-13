import type { HSStaticMethods } from "preline";

declare global {
  interface Window {
    /** Set once Preline's JS has loaded (see app/_components/PrelineScript). */
    HSStaticMethods?: typeof HSStaticMethods;
  }
}

export {};
