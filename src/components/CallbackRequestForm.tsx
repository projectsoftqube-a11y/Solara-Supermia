import { useState, useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  User,
  Phone,
  Mail,
  AlertCircle,
  Clock,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Loader2,
  PhoneCall,
} from "lucide-react";
import { PhoneInput, DEFAULT_COUNTRY, validatePhone, toE164 } from "./PhoneInput";
import { submitCallbackRequest } from "@/lib/callback";
import { EASTERN_TZ, getEasternNow, easternLabel, isoFrom } from "@/lib/eastern-time";

/* ─────────────────────────────────────────────────────────────
   Eastern-time scheduling helpers
   ───────────────────────────────────────────────────────────── */

// Callback windows as ranges (2-hour blocks across business hours).
// `start`/`end` are hours on a 24h clock in US Eastern Time. `start` doubles as
// the slot's stable id — the *displayed* range shrinks as the hour elapses.
const TIME_SLOTS = [
  { start: 7, end: 9 },
  { start: 9, end: 11 },
  { start: 11, end: 13 },
  { start: 13, end: 15 },
  { start: 15, end: 17 },
  { start: 17, end: 19 },
];

type TimeSlot = (typeof TIME_SLOTS)[number];

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const hour12 = (h: number) => (h % 12 === 0 ? 12 : h % 12);
const meridiem = (h: number) => (h < 12 ? "AM" : "PM");

/** "7 – 9 AM", "11 AM – 1 PM", "8 – 9 AM" … */
function formatSlotRange(start: number, end: number) {
  const a = meridiem(start);
  const b = meridiem(end);
  return a === b
    ? `${hour12(start)} – ${hour12(end)} ${b}`
    : `${hour12(start)} ${a} – ${hour12(end)} ${b}`;
}

/**
 * The start of the part of a window that is still bookable today.
 * Once 7am has gone by, the 7–9 window is offered as 8–9.
 *
 * An hour stays available for 30 minutes past the hour, so the 7am start is
 * still offered at 7:30 and only drops to 8–9 from 7:31.
 */
function liveStart(slot: TimeSlot, et: { hour: number; minute: number }, isToday: boolean) {
  if (!isToday) return slot.start;
  const nextWholeHour = et.minute > 30 ? et.hour + 1 : et.hour;
  return Math.max(slot.start, nextWholeHour);
}

/* ─────────────────────────────────────────────────────────────
   Form state + validation
   ───────────────────────────────────────────────────────────── */

interface FormState {
  name: string;
  email: string;
  phone: string;
  phoneCountry: string;
  date: string;
  timeSlot: number | null;
}

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  phoneCountry: DEFAULT_COUNTRY,
  date: "",
  timeSlot: null,
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

// Deliberately simple: catches the mistakes people actually make (missing @,
// missing domain, trailing dot) without rejecting valid unusual addresses.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateForm(f: FormState, requireEmail: boolean): FieldErrors {
  const errors: FieldErrors = {};

  if (!f.name.trim()) errors.name = "Please enter your name.";

  if (requireEmail) {
    const email = f.email.trim();
    if (!email) errors.email = "Please enter your email address.";
    else if (!EMAIL_PATTERN.test(email)) errors.email = "Please enter a valid email address.";
  }

  const phoneError = validatePhone(f.phone, f.phoneCountry);
  if (phoneError) errors.phone = phoneError;

  return errors;
}

export type CallbackSubmittedInfo = {
  name: string;
  phone: string;
  dateLabel: string;
  timeLabel: string;
};

type CallbackRequestFormProps = {
  /** Show and require the email field. Off on /schedule-call. */
  showEmail?: boolean;
  submitLabel?: string;
  submittingLabel?: string;
  submitIcon?: ReactNode;
  buttonClassName?: string;
  footnote?: ReactNode;
  onSubmitted: (info: CallbackSubmittedInfo) => void;
};

const DEFAULT_BUTTON =
  "mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[color:var(--primary)] py-3.5 text-sm font-semibold text-white shadow-lg shadow-[color:var(--primary)]/25 transition hover:bg-[color:var(--primary-hover)] disabled:opacity-70";

export function CallbackRequestForm({
  showEmail = true,
  submitLabel = "Reserve Your Private Demo",
  submittingLabel = "Sending…",
  submitIcon = <PhoneCall className="h-4 w-4" />,
  buttonClassName = DEFAULT_BUTTON,
  footnote,
  onSubmitted,
}: CallbackRequestFormProps) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sendError, setSendError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const update =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = e.target;
      setForm((f) => ({ ...f, [field]: value }));
      // Clear this field's error as soon as the user starts correcting it.
      setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
    };

  const validateOnBlur = (field: keyof FormState) => () => {
    const found = validateForm(form, showEmail);
    setErrors((prev) => ({ ...prev, [field]: found[field] }));
  };

  // Phone is masked per country as the user types; typing a leading "+" swaps
  // the country automatically (e.g. "+91…" → India).
  const updatePhone = (national: string, iso: string) => {
    setForm((f) => ({ ...f, phone: national, phoneCountry: iso }));
    setErrors((prev) => (prev.phone ? { ...prev, phone: undefined } : prev));
  };

  // The chosen window's label, derived fresh so it always reflects the time
  // still remaining in that window.
  const selectedTimeLabel = (() => {
    if (form.timeSlot === null) return "";
    const slot = TIME_SLOTS.find((s) => s.start === form.timeSlot);
    if (!slot) return "";
    const et = getEasternNow();
    return formatSlotRange(liveStart(slot, et, form.date === et.iso), slot.end);
  })();

  const prettyDate = form.date
    ? new Date(`${form.date}T00:00:00`).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const found = validateForm(form, showEmail);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    setSendError("");

    try {
      const result = await submitCallbackRequest({
        data: {
          name: form.name.trim(),
          email: showEmail ? form.email.trim() : "",
          phone: toE164(form.phone, form.phoneCountry),
          phoneDisplay: form.phone,
          phoneCountry: form.phoneCountry,
          date: form.date,
          time: selectedTimeLabel,
          timezone: EASTERN_TZ,
        },
      });

      if (!result.ok) {
        setSendError(result.error);
        return;
      }

      onSubmitted({
        name: form.name.trim(),
        phone: form.phone,
        dateLabel: prettyDate,
        timeLabel: selectedTimeLabel,
      });
    } catch (err) {
      console.error("[callback] submit failed", err);
      setSendError("Something went wrong. Please try again, or email solara@supermia.ai.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="relative">
      <div className="space-y-4">
        <Field icon={User} label="Name" error={errors.name}>
          <input
            type="text"
            value={form.name}
            onChange={update("name")}
            onBlur={validateOnBlur("name")}
            placeholder="Jane Cooper"
            autoComplete="name"
            aria-invalid={!!errors.name}
            className={fieldClass(!!errors.name)}
          />
        </Field>

        <Field icon={Phone} label="Phone" error={errors.phone}>
          <PhoneInput
            value={form.phone}
            countryIso={form.phoneCountry}
            onChange={updatePhone}
            onBlur={validateOnBlur("phone")}
            hasError={!!errors.phone}
            inputClassName={fieldClass(!!errors.phone, "pr-3.5")}
          />
        </Field>

        {showEmail && (
          <Field icon={Mail} label="Email" error={errors.email}>
            <input
              type="email"
              value={form.email}
              onChange={update("email")}
              onBlur={validateOnBlur("email")}
              placeholder="jane@brightsmiledental.com"
              autoComplete="email"
              aria-invalid={!!errors.email}
              className={fieldClass(!!errors.email)}
            />
          </Field>
        )}

        <DateTimePicker
          date={form.date}
          timeSlot={form.timeSlot}
          onDate={(d) => setForm((f) => ({ ...f, date: d }))}
          onTimeSlot={(slot) => setForm((f) => ({ ...f, timeSlot: slot }))}
        />
      </div>

      <button type="submit" disabled={submitting} className={buttonClassName}>
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {submittingLabel}
          </>
        ) : (
          <>
            {submitLabel}
            {submitIcon}
          </>
        )}
      </button>

      {sendError && (
        <p
          role="alert"
          className="mt-3 flex items-start justify-center gap-1.5 text-center text-xs font-medium text-[color:var(--destructive)]"
        >
          <AlertCircle className="mt-px h-3.5 w-3.5 shrink-0" />
          {sendError}
        </p>
      )}

      {footnote}
    </form>
  );
}

/* ─────────────────────────────────────────────────────────────
   Field chrome
   ───────────────────────────────────────────────────────────── */

// Horizontal padding is passed in rather than baked in, so callers can widen
// the left inset (for the country code) without fighting Tailwind conflicts.
const inputBase =
  "w-full rounded-xl border bg-[color:var(--background)] py-2.5 text-sm text-[color:var(--foreground)] placeholder:text-[color:var(--muted-foreground)] outline-none transition focus:ring-2";

const inputBorder =
  "border-[color:var(--border)] focus:border-[color:var(--primary)] focus:ring-[color:var(--primary)]/20";

const inputBorderError =
  "border-[color:var(--destructive)] focus:border-[color:var(--destructive)] focus:ring-[color:var(--destructive)]/20";

/** Border/ring colours swap to red when the field has a validation error. */
export function fieldClass(hasError: boolean, padding = "px-3.5") {
  return `${inputBase} ${padding} ${hasError ? inputBorderError : inputBorder}`;
}

export function Field({
  icon: Icon,
  label,
  optional,
  error,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-[color:var(--secondary-foreground)]">
        <Icon className="h-3.5 w-3.5 text-[color:var(--primary)]" />
        {label}
        {optional && (
          <span className="font-normal text-[color:var(--muted-foreground)]">· optional</span>
        )}
      </span>
      {children}
      {error && (
        <span
          role="alert"
          className="mt-1.5 flex items-start gap-1.5 text-xs font-medium text-[color:var(--destructive)]"
        >
          <AlertCircle className="mt-px h-3.5 w-3.5 shrink-0" />
          {error}
        </span>
      )}
    </label>
  );
}

/* ─────────────────────────────────────────────────────────────
   Date + time picker (fully branded, no native controls)
   ───────────────────────────────────────────────────────────── */

function DateTimePicker({
  date,
  timeSlot,
  onDate,
  onTimeSlot,
}: {
  date: string;
  timeSlot: number | null;
  onDate: (d: string) => void;
  onTimeSlot: (slot: number | null) => void;
}) {
  const [calOpen, setCalOpen] = useState(false);
  const [calPosition, setCalPosition] = useState({ top: 0, left: 0, width: 300 });
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close the calendar popover on outside click
  useEffect(() => {
    if (!calOpen) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        wrapRef.current &&
        !wrapRef.current.contains(target) &&
        popoverRef.current &&
        !popoverRef.current.contains(target)
      ) {
        setCalOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [calOpen]);

  useEffect(() => {
    if (!calOpen) return;

    const updatePosition = () => {
      const trigger = triggerRef.current;
      if (!trigger) return;

      const rect = trigger.getBoundingClientRect();
      const gap = 8;
      const margin = 16;
      const viewportWidth = window.innerWidth;
      const popoverWidth = Math.min(Math.max(rect.width, 300), viewportWidth - margin * 2);
      const left = Math.min(Math.max(rect.left, margin), viewportWidth - popoverWidth - margin);

      setCalPosition({ top: rect.bottom + gap, left, width: popoverWidth });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [calOpen]);

  // Re-render every 30s so a window that is elapsing visibly shrinks
  // (7 – 9 AM → 8 – 9 AM) without the user having to reload.
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 30_000);
    return () => clearInterval(id);
  }, []);

  const prettyDate = date
    ? new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : "";

  // Everything below is anchored to US Eastern Time, not the visitor's zone.
  const et = getEasternNow();
  const isEtToday = date === et.iso;
  const allSlotsPassed = TIME_SLOTS.every((s) => liveStart(s, et, isEtToday) >= s.end);
  const etLabel = easternLabel();

  // If the chosen window has fully elapsed (or the day changed to today), drop it.
  useEffect(() => {
    if (timeSlot === null) return;
    const slot = TIME_SLOTS.find((s) => s.start === timeSlot);
    if (slot && isEtToday && liveStart(slot, et, true) >= slot.end) onTimeSlot(null);
  }, [timeSlot, isEtToday, et.hour, et.minute, onTimeSlot]);

  return (
    <div className="space-y-3.5">
      {/* Date trigger + popover */}
      <div ref={wrapRef} className="relative">
        <span className="mb-1.5 flex flex-wrap items-center gap-1.5 text-xs font-semibold text-[color:var(--secondary-foreground)]">
          <Calendar className="h-3.5 w-3.5 text-[color:var(--primary)]" />
          Preferred date
          <span className="font-normal text-[color:var(--muted-foreground)]">
            · US Eastern ({etLabel})
          </span>
        </span>
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setCalOpen((o) => !o)}
          className={`flex w-full items-center justify-between rounded-xl border bg-[color:var(--background)] px-3.5 py-2.5 text-left text-sm outline-none transition ${
            calOpen
              ? "border-[color:var(--primary)] ring-2 ring-[color:var(--primary)]/20"
              : "border-[color:var(--border)]"
          } ${date ? "text-[color:var(--foreground)]" : "text-[color:var(--muted-foreground)]"}`}
        >
          {prettyDate || "Pick a day"}
          <ChevronRight
            className={`h-4 w-4 text-[color:var(--muted-foreground)] transition-transform ${calOpen ? "rotate-90" : ""}`}
          />
        </button>

        {typeof document !== "undefined" &&
          createPortal(
            <AnimatePresence>
              {calOpen && (
                <motion.div
                  ref={popoverRef}
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.16 }}
                  style={{
                    top: calPosition.top,
                    left: calPosition.left,
                    width: calPosition.width,
                  }}
                  className="fixed z-[80] max-h-[calc(100vh-2rem)] overflow-y-auto rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-3 shadow-[0_16px_44px_rgba(15,23,42,0.16)]"
                >
                  <MiniCalendar
                    selected={date}
                    onSelect={(d) => {
                      onDate(d);
                      setCalOpen(false);
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>,
            document.body,
          )}
      </div>

      {/* Time-range chips */}
      <div>
        <span className="mb-1.5 flex flex-wrap items-center gap-1.5 text-xs font-semibold text-[color:var(--secondary-foreground)]">
          <Clock className="h-3.5 w-3.5 text-[color:var(--primary)]" />
          Preferred time
          <span className="font-normal text-[color:var(--muted-foreground)]">
            · US Eastern ({etLabel})
          </span>
        </span>
        <div className="grid grid-cols-3 gap-2">
          {TIME_SLOTS.map((slot) => {
            const start = liveStart(slot, et, isEtToday);
            const passed = start >= slot.end;
            const active = timeSlot === slot.start;
            // Shrinks as the window elapses: 7 – 9 AM becomes 8 – 9 AM at 7:31.
            const label = passed
              ? formatSlotRange(slot.start, slot.end)
              : formatSlotRange(start, slot.end);
            const shortened = !passed && start !== slot.start;

            return (
              <button
                key={slot.start}
                type="button"
                disabled={passed}
                title={
                  passed
                    ? "This window has already passed today"
                    : shortened
                      ? `Part of this window has passed — ${label} ET still available`
                      : undefined
                }
                onClick={() => onTimeSlot(active ? null : slot.start)}
                className={`rounded-xl border px-2 py-2 text-[13px] font-semibold transition ${
                  active
                    ? "border-[color:var(--primary)] bg-[color:var(--primary)] text-white shadow-sm shadow-[color:var(--primary)]/25"
                    : passed
                      ? "cursor-not-allowed border-[color:var(--border)] bg-[color:var(--muted)] text-[color:var(--muted-foreground)]/50 line-through"
                      : "border-[color:var(--border)] bg-[color:var(--background)] text-[color:var(--secondary-foreground)] hover:border-[color:var(--primary)]/40 hover:text-[color:var(--foreground)]"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {isEtToday && allSlotsPassed && (
          <p className="mt-2 text-xs font-medium text-[color:var(--destructive)]">
            No callback windows left today — please pick another day.
          </p>
        )}
      </div>
    </div>
  );
}

function MiniCalendar({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (iso: string) => void;
}) {
  // "Today" is today in US Eastern Time — a visitor in Asia must not be able to
  // pick a day that is already in the past for the team taking the call.
  const todayISO = getEasternNow().iso;
  const [todayY, todayM] = todayISO.split("-").map(Number);
  const todayMonthIndex = todayM - 1;

  const [view, setView] = useState(() => {
    const base = selected || todayISO;
    const [y, m] = base.split("-").map(Number);
    return { y, m: m - 1 };
  });

  const firstOfMonth = new Date(view.y, view.m, 1);
  const startWeekday = firstOfMonth.getDay(); // 0 = Sun
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();

  // Can we go back a month? (don't allow navigating before the current month)
  const canPrev = view.y > todayY || (view.y === todayY && view.m > todayMonthIndex);

  const cells: (number | null)[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const shift = (delta: number) => {
    setView((v) => {
      const m = v.m + delta;
      if (m < 0) return { y: v.y - 1, m: 11 };
      if (m > 11) return { y: v.y + 1, m: 0 };
      return { ...v, m };
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-2 flex items-center justify-between px-1">
        <div className="font-display text-sm font-bold text-[color:var(--foreground)]">
          {MONTHS[view.m]} {view.y}
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => canPrev && shift(-1)}
            disabled={!canPrev}
            aria-label="Previous month"
            className="grid h-7 w-7 place-items-center rounded-lg text-[color:var(--secondary-foreground)] transition hover:bg-[color:var(--muted)] disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => shift(1)}
            aria-label="Next month"
            className="grid h-7 w-7 place-items-center rounded-lg text-[color:var(--secondary-foreground)] transition hover:bg-[color:var(--muted)]"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Weekday labels */}
      <div className="mb-1 grid grid-cols-7 gap-1">
        {WEEKDAYS.map((w) => (
          <div
            key={w}
            className="grid h-7 place-items-center text-[11px] font-semibold text-[color:var(--muted-foreground)]"
          >
            {w}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) return <div key={`e${i}`} />;
          const iso = isoFrom(view.y, view.m, day);
          const isPast = iso < todayISO;
          const isToday = iso === todayISO;
          const isSelected = iso === selected;

          return (
            <button
              key={iso}
              type="button"
              disabled={isPast}
              onClick={() => onSelect(iso)}
              className={`grid h-9 place-items-center rounded-lg text-[13px] font-medium transition ${
                isSelected
                  ? "bg-[color:var(--primary)] text-white shadow-sm shadow-[color:var(--primary)]/30"
                  : isPast
                    ? "cursor-not-allowed text-[color:var(--muted-foreground)]/40"
                    : "text-[color:var(--foreground)] hover:bg-[color:var(--primary-soft)]"
              } ${isToday && !isSelected ? "ring-1 ring-inset ring-[color:var(--primary)]/40" : ""}`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-2 flex items-center justify-between border-t border-[color:var(--divider)] px-1 pt-2">
        <button
          type="button"
          onClick={() => onSelect("")}
          className="text-xs font-semibold text-[color:var(--muted-foreground)] transition hover:text-[color:var(--foreground)]"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={() => onSelect(todayISO)}
          className="text-xs font-semibold text-[color:var(--primary)] transition hover:text-[color:var(--primary-hover)]"
        >
          Today
        </button>
      </div>
    </div>
  );
}
