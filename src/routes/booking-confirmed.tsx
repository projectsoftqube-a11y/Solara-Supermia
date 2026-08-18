import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  Check,
  Mail,
  CalendarPlus,
  Video,
  Sparkles,
  Clock,
  Calendar as CalendarIcon,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

/**
 * Post-Calendly confirmation page for the /book-a-demo flow.
 *
 * Calendly is configured to redirect here after a successful booking. If
 * "Pass event details to your redirect URL" is enabled in the Calendly event
 * settings, these query params arrive and the page personalises itself;
 * otherwise it renders a clean generic confirmation.
 */
type BookingSearch = {
  invitee_full_name?: string;
  invitee_email?: string;
  event_type_name?: string;
  event_start_time?: string;
  assigned_to?: string;
};

export const Route = createFileRoute("/booking-confirmed")({
  validateSearch: (search: Record<string, unknown>): BookingSearch => ({
    invitee_full_name: asString(search.invitee_full_name),
    invitee_email: asString(search.invitee_email),
    event_type_name: asString(search.event_type_name),
    event_start_time: asString(search.event_start_time),
    assigned_to: asString(search.assigned_to),
  }),
  head: () => ({
    meta: [
      { title: "Your Demo Is Confirmed | Solara Dental AI" },
      {
        name: "description",
        content:
          "Your Solara demo is booked. Check your inbox for the calendar invite and video link.",
      },
      // Conversion pages shouldn't be indexed â€” they skew organic traffic data.
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: BookingConfirmedPage,
});

function asString(v: unknown): string | undefined {
  return typeof v === "string" && v.trim() ? v : undefined;
}

const TITLES = new Set(["dr", "mr", "mrs", "ms", "miss", "prof", "dr.", "mr.", "mrs.", "ms."]);

/** First name for the greeting, skipping a leading title like "Dr." */
function firstNameFrom(fullName?: string): string {
  if (!fullName) return "";
  const parts = fullName.trim().split(/\s+/);
  if (parts.length > 1 && TITLES.has(parts[0].toLowerCase())) return parts[1];
  return parts[0];
}

/**
 * Reads the wall-clock time straight out of the ISO string rather than
 * converting through Date â€” so we display the exact slot the invitee picked,
 * in their own timezone, without shifting it to the viewer's.
 * e.g. "2026-08-05T12:00:00-04:00"
 */
function parseCalendlyTime(iso?: string) {
  if (!iso) return null;
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (!m) return null;

  const [, y, mo, d, hh, mm] = m.map(Number) as unknown as number[];
  const dt = new Date(Date.UTC(y, mo - 1, d));
  if (Number.isNaN(dt.getTime())) return null;

  const WEEKDAYS = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
  ];
  const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const meridiem = hh < 12 ? "AM" : "PM";
  const hour12 = hh % 12 === 0 ? 12 : hh % 12;

  return {
    dateLabel: `${WEEKDAYS[dt.getUTCDay()]}, ${MONTHS[mo - 1]} ${d}`,
    time: `${hour12}:${String(mm).padStart(2, "0")}`,
    meridiem,
  };
}

const STEPS = [
  {
    icon: Mail,
    title: "Check your inbox",
    body: "Your confirmation email is on its way with the meeting link and everything you need.",
  },
  {
    icon: CalendarPlus,
    title: "Add to your calendar",
    body: "Save the invite so the time is blocked and you get a reminder before we meet.",
  },
  {
    icon: Video,
    title: "Show up & see it live",
    body: "We'll walk through exactly what Solara does for a practice like yours.",
  },
];

function BookingConfirmedPage() {
  const search = Route.useSearch();
  const when = parseCalendlyTime(search.event_start_time);
  const firstName = firstNameFrom(search.invitee_full_name);
  const eventName = search.event_type_name || "Solara demo";

  return (
    // Mobile scrolls; desktop locks to a single viewport (no scroll).
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-[color:var(--background)] selection:bg-[#FF6A55]/20 lg:h-dvh lg:min-h-0">
      {/* â•â• Home-style backdrop: subtle grid + warm radial glow â•â• */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div
          className="absolute inset-x-0 top-0 h-[560px]"
          style={{
            background:
              "radial-gradient(ellipse 75% 55% at 50% 0%, rgba(249,115,22,0.10), transparent 66%)",
          }}
        />
        <div
          className="absolute -bottom-24 right-0 h-[380px] w-[380px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(22,196,179,0.12), transparent 65%)" }}
        />
      </div>

      {/* â•â• Header â•â• */}
      <header className="relative z-10 flex shrink-0 items-center justify-between px-5 py-5 sm:px-10 lg:py-4">
        <a href="/" className="flex items-center gap-2.5">
          <img src="/images/secondary-logo.svg" alt="" className="h-8 w-8" />
          <span className="font-display text-[16px] font-extrabold tracking-tight text-slate-900">
            Solara
          </span>
        </a>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#16C4B3]/25 bg-white px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#0B7A70] shadow-sm">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#16C4B3]" />
          Demo confirmed
        </span>
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center px-5 py-8 sm:px-6 sm:py-10 lg:py-6">
        <div className="grid w-full max-w-[520px] gap-8 lg:max-w-[1060px] lg:grid-cols-2 lg:items-center lg:gap-14">
          {/* â”€â”€ Left: message â”€â”€ */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            {/* success emblem */}
            <span className="relative grid h-16 w-16 place-items-center">
              <motion.span
                aria-hidden="true"
                className="absolute inset-0 rounded-[24px] bg-[#16C4B3]/15"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              />
              <motion.span
                aria-hidden="true"
                className="absolute inset-0 rounded-[24px] ring-1 ring-[#16C4B3]/30"
                initial={{ scale: 0.9, opacity: 0.7 }}
                animate={{ scale: [0.9, 1.18], opacity: [0.7, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
              />
              <motion.span
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.16, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative grid h-12 w-12 place-items-center rounded-[20px] bg-gradient-to-br from-[#1FE0CC] to-[#0E9C8E] text-white shadow-[0_14px_34px_-8px_rgba(22,196,179,0.75)]"
              >
                <Check className="h-6 w-6" strokeWidth={3.5} />
              </motion.span>
            </span>

            <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--primary-soft)] px-4 py-1.5 text-[12px] font-semibold text-[color:var(--foreground)]">
              <Sparkles className="h-3.5 w-3.5 text-[color:var(--primary)]" />
              You're confirmed
            </span>

            <h1 className="mt-5 font-display text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em] text-slate-900 sm:text-[46px] lg:text-[50px]">
              {firstName ? (
                <>
                  See you soon,{" "}
                  <span className="bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--primary-hover)] bg-clip-text text-transparent">
                    {firstName}.
                  </span>
                </>
              ) : (
                <>
                  Your demo is{" "}
                  <span className="bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--primary-hover)] bg-clip-text text-transparent">
                    locked in.
                  </span>
                </>
              )}
            </h1>

            <p className="mx-auto mt-4 max-w-[460px] text-[15px] leading-relaxed text-[color:var(--secondary-foreground)] lg:mx-0">
              Your {eventName} is on the calendar. We can't wait to show you how much of your front
              office can simply run itself.
            </p>

            {/* Actions */}
            <div className="mt-7 flex w-full flex-col items-center gap-3 sm:flex-row lg:w-auto lg:justify-start">
              <a
                href="/"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[color:var(--primary)] px-7 py-3.5 text-[14px] font-semibold text-white shadow-lg shadow-[color:var(--primary)]/25 transition-colors hover:bg-[color:var(--primary-hover)] sm:w-auto"
              >
                Back to home
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="mailto:solara@supermia.ai"
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-[color:var(--border)] bg-white px-7 py-3.5 text-[14px] font-semibold text-[color:var(--foreground)] transition-all hover:border-[color:var(--primary)]/40 hover:shadow-md sm:w-auto"
              >
                Reschedule
                <ArrowUpRight className="h-4 w-4 text-[color:var(--primary)]" />
              </a>
            </div>
          </motion.div>

          {/* â”€â”€ Right: booking details + steps â”€â”€ */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            {/* Appointment card â€” home-style feature card */}
            <div className="relative overflow-hidden rounded-[28px] border border-[#FF6A55]/15 bg-gradient-to-br from-[#FFF9F2] via-white to-[#FFF9F2] p-6 shadow-[0_24px_48px_rgba(249,115,22,0.07)] sm:p-7">
              <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-tl from-[#FF6A55]/10 to-transparent blur-3xl" />

              <div className="relative flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  {when ? "Your live demo" : "Booking"}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#16C4B3]/12 px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-[0.14em] text-[#0E8C80]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#16C4B3]" />
                  Reserved
                </span>
              </div>

              {when ? (
                <div className="relative mt-5">
                  <div className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.12em] text-[#FF6A55]">
                    <CalendarIcon className="h-4 w-4" />
                    {when.dateLabel}
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="font-display text-[52px] font-extrabold leading-none tracking-tight text-slate-900 sm:text-[58px]">
                      {when.time}
                    </span>
                    <span className="font-display text-[20px] font-bold text-slate-400">
                      {when.meridiem}
                    </span>
                  </div>

                  {/* inline stats */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3.5 py-1.5 text-[12.5px] font-semibold text-slate-600 shadow-sm ring-1 ring-slate-200/70">
                      <Clock className="h-3.5 w-3.5 text-[#FF6A55]" />
                      {eventName}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3.5 py-1.5 text-[12.5px] font-semibold text-slate-600 shadow-sm ring-1 ring-slate-200/70">
                      <Video className="h-3.5 w-3.5 text-[#16C4B3]" />
                      Live walkthrough
                    </span>
                  </div>
                </div>
              ) : (
                <div className="relative mt-5">
                  <div className="font-display text-[24px] font-extrabold leading-tight tracking-tight text-slate-900">
                    You're all set.
                  </div>
                  <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-slate-500">
                    Your confirmation and calendar invite are on their way to your inbox.
                  </p>
                </div>
              )}

              {search.invitee_email && (
                <div className="relative mt-5 flex items-center justify-between gap-3 border-t border-slate-200/70 pt-4">
                  <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                    <Mail className="h-3.5 w-3.5 text-[#FF6A55]" />
                    Invite sent to
                  </span>
                  <span className="min-w-0 truncate text-[13px] font-bold tracking-tight text-slate-900">
                    {search.invitee_email}
                  </span>
                </div>
              )}
            </div>

            {/* What happens next â€” compact rows */}
            <div className="rounded-[28px] border border-slate-200/70 bg-white p-5 shadow-[0_12px_32px_rgba(15,23,42,0.05)] sm:p-6">
              <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                What happens next
              </div>
              <ol className="space-y-3.5">
                {STEPS.map((step, i) => (
                  <li key={step.title} className="flex items-start gap-3.5">
                    <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#FFDFD2] text-[#FF6A55]">
                      <step.icon className="h-5 w-5" strokeWidth={1.9} />
                      <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-slate-900 text-[9px] font-bold text-white">
                        {i + 1}
                      </span>
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <div className="text-[14px] font-bold tracking-tight text-slate-900">
                        {step.title}
                      </div>
                      <p className="mt-0.5 text-[12.5px] leading-relaxed text-slate-500">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        </div>
      </main>

      {/* â•â• Footer â•â• */}
      <footer className="relative z-10 flex shrink-0 flex-wrap items-center justify-center gap-x-3 gap-y-1 px-5 py-6 text-center lg:py-4">
        <span className="text-[11.5px] font-medium text-slate-400">
          Solara â€” the AI front office for dental practices.
        </span>
        <span className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-slate-400">
          <ShieldCheck className="h-3.5 w-3.5 text-[#16C4B3]" />
          HIPAA compliant
        </span>
      </footer>
    </div>
  );
}
