import { useSyncExternalStore } from "react";

// Inlined at build time by next.config.ts. Prerendered HTML can't read the clock
// (Cache Components forbids it), so it shows the build year and the browser
// swaps in the live year after hydration.
const BUILD_YEAR = Number(process.env.BUILD_YEAR);

const subscribe = () => () => {};
const getYear = () => new Date().getFullYear();
const getBuildYear = () => BUILD_YEAR;

export function useCurrentYear(): number {
  return useSyncExternalStore(subscribe, getYear, getBuildYear);
}
