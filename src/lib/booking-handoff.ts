/**
 * Hands the booking details from /schedule-call to /thank-you.
 *
 * Kept in sessionStorage rather than the URL so the visitor's name and phone
 * number never land in analytics, referrers or browser history. It is scoped
 * to the tab, so a direct visit to /thank-you simply renders the generic copy.
 */

import { useMemo, useSyncExternalStore } from "react";

export type BookingHandoff = {
  name?: string;
  phone?: string;
  /** YYYY-MM-DD */
  date?: string;
  time?: string;
};

const STORAGE_KEY = "solara:booking";

export function saveBookingHandoff(booking: BookingHandoff) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(booking));
  } catch {
    // Storage can be disabled (private mode, strict settings); the thank-you
    // page still works without the personalised details.
  }
}

function readRaw(): string | null {
  try {
    return sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

// The value is written before navigation and never changes while a page is
// open, so there is nothing to subscribe to.
const subscribe = () => () => {};

/** The handed-over booking, or `{}` on the server and for direct visits. */
export function useBookingHandoff(): BookingHandoff {
  const raw = useSyncExternalStore(subscribe, readRaw, () => null);
  return useMemo(() => {
    if (!raw) return {};
    try {
      return JSON.parse(raw) as BookingHandoff;
    } catch {
      return {};
    }
  }, [raw]);
}
