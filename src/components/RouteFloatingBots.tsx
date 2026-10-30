"use client";

import { usePathname } from "next/navigation";

import { FloatingBots } from "@/components/FloatingBots";

// Focused conversion pages: the floating bot competes with the form/confirmation,
// so it is suppressed there and left in place everywhere else.
const HIDE_FLOATING_BOTS_ON = ["/schedule-call", "/thank-you"];

export function RouteFloatingBots() {
  const pathname = usePathname();
  const normalized = pathname.replace(/\/+$/, "") || "/";

  if (HIDE_FLOATING_BOTS_ON.includes(normalized)) return null;
  return <FloatingBots />;
}
