import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  PhoneCall,
  X,
  User,
  Phone,
  Clock,
  Calendar,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Check,
  Loader2,
} from "lucide-react";

interface CallbackForm {
  name: string;
  phone: string;
  date: string;
  time: string;
  message: string;
}

const EMPTY_FORM: CallbackForm = { name: "", phone: "", date: "", time: "", message: "" };

// Callback windows as ranges (2-hour blocks across business hours).
const TIME_SLOTS = [
  "7 – 9 AM",
  "9 – 11 AM",
  "11 AM – 1 PM",
  "1 – 3 PM",
  "3 – 5 PM",
  "5 – 7 PM",
];

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Rotating attention messages shown above the pill.
const NUDGE_MESSAGES = [
  "Got a question? Let's talk.",
  "We'll call you back — your time.",
  "Speak with our team in minutes.",
  "No sales script. Just a chat.",
  "Request a callback in 30 seconds.",
];

export function CallbackChip() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<CallbackForm>(EMPTY_FORM);
  const [nudgeIdx, setNudgeIdx] = useState(0);

  // Cycle the attention message every few seconds (paused while the modal is open).
  useEffect(() => {
    if (open) return;
    const timer = setInterval(() => {
      setNudgeIdx((i) => (i + 1) % NUDGE_MESSAGES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [open]);

  // Lock body scroll while the modal is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const closeModal = () => {
    setOpen(false);
    // Reset the success/form state shortly after the close animation
    setTimeout(() => {
      setSubmitted(false);
      setForm(EMPTY_FORM);
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // TODO: Plug in your backend here.
    // Send `form` (name, phone, time, message) to your API route / webhook / CRM.
    // e.g. await fetch("/api/callback", { method: "POST", body: JSON.stringify(form) });
    await new Promise((r) => setTimeout(r, 900)); // simulated request

    setSubmitting(false);
    setSubmitted(true);
  };

  const update =
    (field: keyof CallbackForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  // Min date for the picker = today (no past dates). Local component render, so Date is fine here.
  const todayStr = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD

  // Human-friendly "when" string for the success screen.
  const prettyWhen = (() => {
    if (!form.date) return form.time ? ` at ${form.time}` : " shortly";
    const d = new Date(`${form.date}T00:00:00`);
    const day = d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
    return ` on ${day}${form.time ? ` at ${form.time}` : ""}`;
  })();

  return (
    <>
      {/* ── Always-visible callback pill, bottom-left ── */}
      <div className="fixed bottom-6 left-6 z-50">
        {/* Rotating attention nudge above the pill */}
        <div className="pointer-events-none absolute bottom-full left-1 mb-3 h-8 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={nudgeIdx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex h-8 w-max items-center gap-2 whitespace-nowrap rounded-full bg-[color:var(--foreground)] px-4 text-[12px] font-semibold tracking-tight text-white shadow-[0_8px_22px_rgba(15,23,42,0.22)]"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--primary)]" />
              {NUDGE_MESSAGES[nudgeIdx]}
            </motion.div>
          </AnimatePresence>
        </div>

      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Request a callback"
        className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--primary-hover)] py-2 pl-2 pr-5 text-white shadow-[0_14px_34px_rgba(249,115,22,0.42)] transition-shadow duration-300 hover:shadow-[0_18px_44px_rgba(249,115,22,0.55)]"
      >
        {/* Continuous auto shine sweep */}
        <motion.span
          aria-hidden="true"
          initial={{ x: "-200%" }}
          animate={{ x: "350%" }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/3 -skew-x-[20deg] bg-gradient-to-r from-transparent via-white/60 to-transparent"
        />

        {/* Extra shine on hover (glides across immediately when hovered) */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/3 -translate-x-[200%] -skew-x-[20deg] bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[350%]"
        />

        {/* Icon disc */}
        <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/20 backdrop-blur">
          {/* ringing phone shake */}
          <motion.span
            animate={{ rotate: [0, 0, -18, 16, -14, 12, -8, 6, 0, 0] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              repeatDelay: 1.6,
              ease: "easeInOut",
              times: [0, 0.15, 0.28, 0.4, 0.52, 0.64, 0.76, 0.86, 0.94, 1],
            }}
            style={{ originX: "50%", originY: "70%" }}
          >
            <PhoneCall className="h-5 w-5" strokeWidth={2.2} />
          </motion.span>
          {/* green available ping */}
          <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--success)] opacity-60" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-[color:var(--success)] ring-2 ring-white" />
          </span>
        </span>

        {/* Label */}
        <span className="relative text-left leading-tight">
          <span className="block text-[13px] font-bold">Request a callback</span>
          <span className="block text-[11px] font-medium text-white/80">We'll ring you back</span>
        </span>
      </motion.button>
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            aria-modal="true"
            role="dialog"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
              onClick={closeModal}
            />

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 grid max-h-[92vh] w-full max-w-[760px] grid-cols-1 overflow-hidden rounded-[28px] bg-[color:var(--card)] shadow-[0_30px_80px_rgba(15,23,42,0.28)] md:grid-cols-[0.85fr_1fr]"
            >
              <button
                onClick={closeModal}
                aria-label="Close"
                className="absolute right-4 top-4 z-30 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white md:bg-transparent md:text-[color:var(--muted-foreground)] md:hover:bg-[color:var(--muted)] md:hover:text-[color:var(--foreground)]"
              >
                <X className="h-4 w-4" />
              </button>

              {/* ── Left brand rail ── */}
              <div className="relative hidden overflow-hidden bg-[color:var(--surface-dark)] p-8 text-white md:flex md:flex-col">
                <div className="relative z-10 flex h-full flex-col">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--primary)]">
                    Book a callback
                  </span>

                  <h3 className="mt-3 font-display text-[30px] font-bold leading-[1.1]">
                    Let's get you booked in.
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/65">
                    Pick a time that suits you and one of our specialists will call you back — at no
                    cost and with zero pressure.
                  </p>

                  <ul className="mt-8 space-y-4 border-t border-white/10 pt-7">
                    {[
                      "No cost, no obligation",
                      "You choose the day and time",
                      "A quick, friendly conversation",
                    ].map((t) => (
                      <li key={t} className="flex items-center gap-3 text-[15px] text-white/85">
                        <Check className="h-4 w-4 shrink-0 text-[color:var(--primary)]" strokeWidth={2.5} />
                        {t}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto border-t border-white/10 pt-6">
                    <div className="flex items-center gap-3">
                      {/* stacked avatars */}
                      <div className="flex -space-x-2.5">
                        {["#F97316", "#16C4B3", "#38BDF8"].map((c, i) => (
                          <span
                            key={i}
                            className="grid h-8 w-8 place-items-center rounded-full text-[11px] font-bold text-white ring-2 ring-[color:var(--surface-dark)]"
                            style={{ backgroundColor: c }}
                          >
                            {["DR", "SM", "JK"][i]}
                          </span>
                        ))}
                      </div>
                      <div className="leading-tight">
                        <div className="flex items-center gap-1 text-[13px] font-semibold text-white">
                          <span className="text-[color:var(--primary)]">★★★★★</span>
                        </div>
                        <div className="text-xs text-white/60">
                          Loved by dental teams on OpenDental
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Right form panel ── */}
              <div className="relative overflow-y-auto px-6 py-7 sm:px-8">
                {/* soft top glow */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-32"
                  style={{
                    background:
                      "radial-gradient(ellipse 70% 100% at 50% 0%, rgba(249,115,22,0.08), transparent 70%)",
                  }}
                />

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex min-h-[420px] flex-col items-center justify-center py-6 text-center"
                    >
                      <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-[color:var(--success)]/12 text-[color:var(--success)]">
                        <Check className="h-8 w-8" strokeWidth={2.5} />
                      </div>
                      <h4 className="font-display text-xl font-bold text-[color:var(--foreground)]">
                        You're all set{form.name ? `, ${form.name.split(" ")[0]}` : ""}!
                      </h4>
                      <p className="mx-auto mt-2 max-w-[280px] text-sm leading-relaxed text-[color:var(--muted-foreground)]">
                        Our team will call you{prettyWhen}. Talk soon.
                      </p>
                      <button
                        onClick={closeModal}
                        className="mt-6 inline-flex items-center justify-center rounded-xl bg-[color:var(--foreground)] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--surface-dark-2)]"
                      >
                        Done
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="relative"
                    >
                      {/* Mobile-only header (left rail is hidden on mobile) */}
                      <div className="mb-5 md:hidden">
                        <h3 className="font-display text-2xl font-bold leading-tight text-[color:var(--foreground)]">
                          Let's get you booked in
                        </h3>
                        <p className="mt-1 text-sm text-[color:var(--muted-foreground)]">
                          Pick a time and our team will call you back.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <Field icon={User} label="Name">
                            <input
                              required
                              type="text"
                              value={form.name}
                              onChange={update("name")}
                              placeholder="Jane Cooper"
                              className={inputClass}
                            />
                          </Field>

                          <Field icon={Phone} label="Phone">
                            <input
                              required
                              type="tel"
                              value={form.phone}
                              onChange={update("phone")}
                              placeholder="(555) 012-3456"
                              className={inputClass}
                            />
                          </Field>
                        </div>

                        <DateTimePicker
                          date={form.date}
                          time={form.time}
                          onDate={(d) => setForm((f) => ({ ...f, date: d }))}
                          onTime={(t) => setForm((f) => ({ ...f, time: t }))}
                        />

                        <Field icon={MessageSquare} label="Anything we should know?" optional>
                          <textarea
                            value={form.message}
                            onChange={update("message")}
                            rows={2}
                            placeholder="Tell us a bit about your practice…"
                            className={`${inputClass} resize-none`}
                          />
                        </Field>
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[color:var(--primary)] py-3.5 text-sm font-semibold text-white shadow-lg shadow-[color:var(--primary)]/25 transition hover:bg-[color:var(--primary-hover)] disabled:opacity-70"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Sending…
                          </>
                        ) : (
                          <>
                            Request my callback
                            <PhoneCall className="h-4 w-4" />
                          </>
                        )}
                      </button>

                      <p className="mt-3 text-center text-xs text-[color:var(--muted-foreground)]">
                        No spam. We only use this to call you back.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const inputClass =
  "w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3.5 py-2.5 text-sm text-[color:var(--foreground)] placeholder:text-[color:var(--muted-foreground)] outline-none transition focus:border-[color:var(--primary)] focus:ring-2 focus:ring-[color:var(--primary)]/20";

function Field({
  icon: Icon,
  label,
  optional,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  optional?: boolean;
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
    </label>
  );
}

/* ─────────────────────────────────────────────────────────────
   Custom date + time picker (fully branded, no native controls)
   ───────────────────────────────────────────────────────────── */

function toISO(d: Date) {
  return d.toLocaleDateString("en-CA"); // YYYY-MM-DD, local
}

function DateTimePicker({
  date,
  time,
  onDate,
  onTime,
}: {
  date: string;
  time: string;
  onDate: (d: string) => void;
  onTime: (t: string) => void;
}) {
  const [calOpen, setCalOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Close the calendar popover on outside click
  useEffect(() => {
    if (!calOpen) return;
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setCalOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [calOpen]);

  const prettyDate = date
    ? new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <div className="space-y-3.5">
      {/* Date trigger + popover */}
      <div ref={wrapRef} className="relative">
        <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-[color:var(--secondary-foreground)]">
          <Calendar className="h-3.5 w-3.5 text-[color:var(--primary)]" />
          Preferred date
        </span>
        <button
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

        <AnimatePresence>
          {calOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.16 }}
              className="absolute left-0 top-full z-30 mt-2 w-full min-w-[300px] rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-3 shadow-[0_16px_44px_rgba(15,23,42,0.16)]"
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
        </AnimatePresence>
      </div>

      {/* Time-range chips */}
      <div>
        <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-[color:var(--secondary-foreground)]">
          <Clock className="h-3.5 w-3.5 text-[color:var(--primary)]" />
          Preferred time
        </span>
        <div className="grid grid-cols-3 gap-2">
          {TIME_SLOTS.map((slot) => {
            const active = time === slot;
            return (
              <button
                key={slot}
                type="button"
                onClick={() => onTime(active ? "" : slot)}
                className={`rounded-xl border px-2 py-2 text-[13px] font-semibold transition ${
                  active
                    ? "border-[color:var(--primary)] bg-[color:var(--primary)] text-white shadow-sm shadow-[color:var(--primary)]/25"
                    : "border-[color:var(--border)] bg-[color:var(--background)] text-[color:var(--secondary-foreground)] hover:border-[color:var(--primary)]/40 hover:text-[color:var(--foreground)]"
                }`}
              >
                {slot}
              </button>
            );
          })}
        </div>
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
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayISO = toISO(today);

  const selDate = selected ? new Date(`${selected}T00:00:00`) : null;

  // Which month is currently shown — defaults to the selected date's month, else this month.
  const [view, setView] = useState(() => {
    const base = selDate ?? today;
    return { y: base.getFullYear(), m: base.getMonth() };
  });

  const firstOfMonth = new Date(view.y, view.m, 1);
  const startWeekday = firstOfMonth.getDay(); // 0 = Sun
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();

  // Can we go back a month? (don't allow navigating before the current month)
  const canPrev = view.y > today.getFullYear() || (view.y === today.getFullYear() && view.m > today.getMonth());

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
          const iso = toISO(new Date(view.y, view.m, day));
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
