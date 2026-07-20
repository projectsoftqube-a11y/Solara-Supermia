import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  ArrowLeft,
  Calendar as CalendarIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  Star,
  User,
  Mail,
  Phone,
  Building2,
  Loader2,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "Book a Demo — Supercharge Your Dental Practice with Solara" },
      {
        name: "description",
        content:
          "Book a 20-minute demo and see how Solara runs your entire dental front office — insurance, calls, booking, intake, recall — on autopilot.",
      },
    ],
  }),
  component: DemoPage,
});

/* ── constants ── */
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const TIME_SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM",
];
function toISO(d: Date) {
  return d.toLocaleDateString("en-CA");
}

function DemoPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [step, setStep] = useState<1 | 2 | 3>(1); // 1 date/time, 2 details, 3 done
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", practice: "" });

  const update =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const prettyDate = date
    ? new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // TODO: Plug in your backend / Calendly booking here.
    // Send { ...form, date, time } to your API route, webhook, or CRM.
    // Or drop your Calendly inline embed into the right column instead of this custom flow.
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-white selection:bg-[#FF6A55]/20">
      <SiteHeader />

      <main className="relative overflow-hidden pb-28 pt-32 lg:pt-40">
        {/* clean light background */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div
            className="absolute inset-x-0 top-0 h-[420px]"
            style={{
              background:
                "radial-gradient(ellipse 70% 100% at 50% 0%, rgba(249,115,22,0.06), transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-[1180px] px-5 sm:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
            {/* ── LEFT: pitch ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-[#FF6A55]" />
                <span className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[#FF6A55]">
                  Book your live demo
                </span>
              </div>

              <h1 className="font-display text-[40px] font-bold leading-[1.08] tracking-[-0.02em] text-slate-900 sm:text-[50px]">
                Supercharge your{" "}
                <span className="bg-gradient-to-r from-[#FF6A55] to-[#FFB23E] bg-clip-text text-transparent">
                  entire front office.
                </span>
              </h1>

              <p className="mt-5 max-w-md text-[17px] leading-relaxed text-slate-600">
                Stop losing patients to missed calls. In 20 minutes, see Solara answer every call,
                verify insurance, and fill your schedule — live, on your own setup.
              </p>

              {/* three quick bullets */}
              <ul className="mt-8 space-y-3">
                {[
                  "Never miss another patient call",
                  "Fill empty chairs automatically",
                  "See exactly how it fits your practice",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-[15px] font-semibold text-slate-800">
                    <Check className="h-5 w-5 shrink-0 text-[#FF6A55]" strokeWidth={2.5} />
                    {t}
                  </li>
                ))}
              </ul>

              {/* compact testimonial */}
              <div className="mt-9 flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#FF6A55] text-sm font-bold text-white">
                  R
                </span>
                <div>
                  <div className="flex gap-0.5 text-[#FFB23E]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="mt-0.5 text-sm text-slate-500">
                    "Booked 22 new patients in our first week." —{" "}
                    <span className="font-semibold text-slate-700">Dr. Ramirez</span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ── RIGHT: scheduler card ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_20px_50px_-12px_rgba(15,23,42,0.14)]"
            >
              {/* progress header */}
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 sm:px-8">
                <div className="flex items-center gap-2.5">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="flex items-center gap-2.5">
                      <span
                        className={`grid h-7 w-7 place-items-center rounded-full text-xs font-bold transition ${
                          step >= n
                            ? "bg-[#FF6A55] text-white"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {step > n ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : n}
                      </span>
                      {n < 3 && (
                        <span
                          className={`h-0.5 w-6 rounded-full transition ${
                            step > n ? "bg-[#FF6A55]" : "bg-slate-100"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {step === 1 ? "Pick a time" : step === 2 ? "Your details" : "Confirmed"}
                </span>
              </div>

              <div className="px-6 py-7 sm:px-8">
                <AnimatePresence mode="wait">
                  {/* STEP 1 — date + time */}
                  {step === 1 && (
                    <motion.div
                      key="s1"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.25 }}
                    >
                      <h2 className="font-display text-xl font-bold text-slate-900">
                        Select a date & time
                      </h2>
                      <p className="mt-1 text-sm text-slate-500">
                        All times shown in your local timezone.
                      </p>

                      <div className="mt-5 grid gap-6 sm:grid-cols-[1fr_180px]">
                        <BookingCalendar selected={date} onSelect={(d) => { setDate(d); setTime(""); }} />

                        {/* time slots */}
                        <div>
                          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                            {date ? prettyDate.split(",")[0] : "Available times"}
                          </div>
                          <div className="max-h-[280px] space-y-2 overflow-y-auto pr-1">
                            {!date && (
                              <div className="rounded-xl border border-dashed border-slate-200 px-3 py-8 text-center text-sm text-slate-400">
                                Pick a day first
                              </div>
                            )}
                            {date &&
                              TIME_SLOTS.map((slot) => (
                                <button
                                  key={slot}
                                  onClick={() => setTime(slot)}
                                  className={`w-full rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${
                                    time === slot
                                      ? "border-[#FF6A55] bg-[#FF6A55] text-white shadow-sm"
                                      : "border-slate-200 text-slate-700 hover:border-[#FF6A55]/50 hover:text-slate-900"
                                  }`}
                                >
                                  {slot}
                                </button>
                              ))}
                          </div>
                        </div>
                      </div>

                      <button
                        disabled={!date || !time}
                        onClick={() => setStep(2)}
                        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6A55] py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#FF6A55]/25 transition hover:bg-[#E55A45] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Continue
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </motion.div>
                  )}

                  {/* STEP 2 — details */}
                  {step === 2 && (
                    <motion.form
                      key="s2"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.25 }}
                      onSubmit={handleSubmit}
                    >
                      {/* chosen slot chip */}
                      <div className="mb-5 flex items-center gap-3 rounded-2xl bg-[#FFF4EB] px-4 py-3">
                        <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-[#FF6A55] shadow-sm">
                          <CalendarIcon className="h-5 w-5" />
                        </div>
                        <div className="text-sm">
                          <div className="font-bold text-slate-900">{prettyDate}</div>
                          <div className="text-slate-500">{time} · 20 minutes</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="ml-auto text-xs font-semibold text-[#FF6A55] hover:underline"
                        >
                          Change
                        </button>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <PageField icon={User} label="Full name">
                          <input required value={form.name} onChange={update("name")} placeholder="Jane Cooper" className={pageInput} />
                        </PageField>
                        <PageField icon={Building2} label="Practice name">
                          <input required value={form.practice} onChange={update("practice")} placeholder="Bright Smile Dental" className={pageInput} />
                        </PageField>
                        <PageField icon={Mail} label="Work email">
                          <input required type="email" value={form.email} onChange={update("email")} placeholder="jane@practice.com" className={pageInput} />
                        </PageField>
                        <PageField icon={Phone} label="Phone">
                          <input required type="tel" value={form.phone} onChange={update("phone")} placeholder="(555) 012-3456" className={pageInput} />
                        </PageField>
                      </div>

                      <div className="mt-6 flex gap-3">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                          <ArrowLeft className="h-4 w-4" />
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={submitting}
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#FF6A55] py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#FF6A55]/25 transition hover:bg-[#E55A45] disabled:opacity-70"
                        >
                          {submitting ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" /> Confirming…
                            </>
                          ) : (
                            <>
                              Confirm my demo
                              <ArrowRight className="h-4 w-4" />
                            </>
                          )}
                        </button>
                      </div>
                    </motion.form>
                  )}

                  {/* STEP 3 — confirmed */}
                  {step === 3 && (
                    <motion.div
                      key="s3"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="py-8 text-center"
                    >
                      <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-[#16C4B3]/12 text-[#16C4B3]">
                        <Check className="h-8 w-8" strokeWidth={2.5} />
                      </div>
                      <h2 className="font-display text-2xl font-bold text-slate-900">
                        Your demo is booked{form.name ? `, ${form.name.split(" ")[0]}` : ""}!
                      </h2>
                      <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
                        We've reserved <span className="font-semibold text-slate-700">{prettyDate}</span> at{" "}
                        <span className="font-semibold text-slate-700">{time}</span>. A calendar invite
                        with the meeting link is on its way to {form.email || "your inbox"}.
                      </p>
                      <a
                        href="/"
                        className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-7 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                      >
                        Back to home
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* ── booking calendar ── */
function BookingCalendar({
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

  const [view, setView] = useState(() => {
    const base = selDate ?? today;
    return { y: base.getFullYear(), m: base.getMonth() };
  });

  const firstOfMonth = new Date(view.y, view.m, 1);
  const startWeekday = firstOfMonth.getDay();
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const canPrev =
    view.y > today.getFullYear() || (view.y === today.getFullYear() && view.m > today.getMonth());

  const cells: (number | null)[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const shift = (delta: number) =>
    setView((v) => {
      const m = v.m + delta;
      if (m < 0) return { y: v.y - 1, m: 11 };
      if (m > 11) return { y: v.y + 1, m: 0 };
      return { ...v, m };
    });

  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white p-4">
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="font-display text-sm font-bold text-slate-900">
          {MONTHS[view.m]} {view.y}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => canPrev && shift(-1)}
            disabled={!canPrev}
            aria-label="Previous month"
            className="grid h-8 w-8 place-items-center rounded-lg text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => shift(1)}
            aria-label="Next month"
            className="grid h-8 w-8 place-items-center rounded-lg text-slate-600 transition hover:bg-slate-100"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mb-1 grid grid-cols-7 gap-1">
        {WEEKDAYS.map((w) => (
          <div key={w} className="grid h-8 place-items-center text-[11px] font-semibold text-slate-400">
            {w}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) return <div key={`e${i}`} />;
          const iso = toISO(new Date(view.y, view.m, day));
          const isPast = iso < todayISO;
          const isToday = iso === todayISO;
          const isSelected = iso === selected;
          // Disable weekends for demo bookings
          const weekday = new Date(view.y, view.m, day).getDay();
          const isWeekend = weekday === 0 || weekday === 6;
          const disabled = isPast || isWeekend;

          return (
            <button
              key={iso}
              disabled={disabled}
              onClick={() => onSelect(iso)}
              className={`grid h-10 place-items-center rounded-xl text-[13px] font-semibold transition ${
                isSelected
                  ? "bg-[#FF6A55] text-white shadow-sm"
                  : disabled
                    ? "cursor-not-allowed text-slate-300"
                    : "text-slate-700 hover:bg-[#FFF4EB]"
              } ${isToday && !isSelected ? "ring-1 ring-inset ring-[#FF6A55]/40" : ""}`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const pageInput =
  "w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[#FF6A55] focus:bg-white focus:ring-2 focus:ring-[#FF6A55]/20";

function PageField({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-600">
        <Icon className="h-3.5 w-3.5 text-[#FF6A55]" />
        {label}
      </span>
      {children}
    </label>
  );
}
