/**
 * All scheduling is anchored to US Eastern Time, never the visitor's own
 * timezone — otherwise someone in Asia could book a slot that is already in
 * the past for the team taking the call.
 */

export const EASTERN_TZ = "America/New_York";

/**
 * "Now" as seen in US Eastern Time. Handles EST/EDT automatically — the IANA
 * zone knows when the clocks change.
 */
export function getEasternNow(): { iso: string; hour: number; minute: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: EASTERN_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "00";

  return {
    iso: `${get("year")}-${get("month")}-${get("day")}`,
    hour: parseInt(get("hour"), 10),
    minute: parseInt(get("minute"), 10),
  };
}

/** Short zone label that follows daylight saving: "EST" in winter, "EDT" in summer. */
export function easternLabel(): string {
  return (
    new Intl.DateTimeFormat("en-US", { timeZone: EASTERN_TZ, timeZoneName: "short" })
      .formatToParts(new Date())
      .find((p) => p.type === "timeZoneName")?.value ?? "ET"
  );
}

/** Build a YYYY-MM-DD key without going through Date (avoids timezone drift). */
export function isoFrom(year: number, monthIndex: number, day: number) {
  return `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}
