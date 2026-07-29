import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Calendar as CalendarIcon,
  AlertCircle,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  User,
  Phone,
  Clock,
  Loader2,
  Globe,
  MailOpen,
  Sparkles,
  Rocket,
  BadgePercent,
  HandHeart,
  Compass,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { submitCallbackRequest } from "@/lib/callback";
import { toE164 } from "@/components/PhoneInput";
import { EASTERN_TZ, getEasternNow } from "@/lib/eastern-time";

export const Route = createFileRoute("/schedule-call")({
  head: () => ({
    meta: [
      { title: "Schedule a Call — Solara Dental AI" },
      {
        name: "description",
        content:
          "Schedule a call with a Solara specialist. Pick a date on the calendar, choose a time, and enter your details.",
      },
    ],
  }),
  component: ScheduleCallPage,
});

/* ── constants ── */
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

function toISO(d: Date) {
  return d.toLocaleDateString("en-CA");
}

function formatUSPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (!digits) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

function ScheduleCallPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [dateOpen, setDateOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [consent, setConsent] = useState(false);
  const [sendError, setSendError] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
  });

  // Either popover overlaps the invitation card's top-right corner, so the VIP
  // seal steps out of the way while one is open.
  const pickerOpen = dateOpen || timeOpen;

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
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
    setSendError("");

    try {
      // This page collects a US number only, so it is always +1.
      const result = await submitCallbackRequest({
        data: {
          name: form.name.trim(),
          email: "", // no email field on this page — admin notification only
          phone: toE164(form.phone, "US"),
          phoneDisplay: form.phone,
          phoneCountry: "US",
          date,
          time,
          timezone: EASTERN_TZ,
        },
      });

      if (!result.ok) {
        setSendError(result.error);
        setSubmitting(false);
        return;
      }

      // Dedicated URL so the conversion is countable in analytics.
      // Booking details ride along in history state for the confirmation copy.
      navigate({
        to: "/thank-you",
        state: {
          booking: {
            name: form.name.trim(),
            phone: form.phone,
            date,
            time,
          },
        } as never,
      });
    } catch (err) {
      console.error("[schedule-call] submit failed", err);
      setSendError("Something went wrong. Please try again, or email solara@supermia.ai.");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBF6] selection:bg-[#FF6A55]/20">
      {/* Single full-height section: the form is the whole page now that the
          benefits grid is gone, so the wash spans the entire viewport. */}
      <main className="relative flex min-h-screen items-center overflow-hidden py-12 lg:py-16">
        {/* ══ Rich ambient background ══ */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {/* aurora mesh — full coverage */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 50% at 15% 6%, rgba(255,178,62,0.30), transparent 62%)," +
                "radial-gradient(55% 50% at 85% 4%, rgba(255,106,85,0.26), transparent 62%)," +
                "radial-gradient(50% 45% at 95% 45%, rgba(22,196,179,0.16), transparent 62%)," +
                "radial-gradient(55% 45% at 5% 45%, rgba(255,106,85,0.18), transparent 62%)," +
                "radial-gradient(60% 45% at 20% 96%, rgba(255,178,62,0.26), transparent 64%)," +
                "radial-gradient(60% 45% at 82% 98%, rgba(255,106,85,0.20), transparent 64%)",
            }}
          />
          {/* full-page grid, masked from the centre so it reaches every edge */}
          <div
            className="absolute inset-0 opacity-[0.7]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(15,23,42,0.045) 1px, transparent 1px)," +
                "linear-gradient(90deg, rgba(15,23,42,0.045) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage:
                "radial-gradient(ellipse 95% 90% at 50% 50%, black 45%, transparent 92%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 95% 90% at 50% 50%, black 45%, transparent 92%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)] lg:gap-16">
            {/* ── FORM column (renders on the RIGHT on desktop) ── */}
            <div className="lg:order-2">
            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8 text-center"
            >
              <h1 className="font-display text-[26px] sm:text-[34px] lg:text-[38px] font-extrabold leading-[1.1] tracking-tight sm:tracking-[-0.02em] text-slate-900">
                We'll take it from here,
                <span className="block bg-gradient-to-r from-[#FF6A55] via-[#FF8042] to-[#FFB23E] bg-clip-text text-transparent mt-1">
                  Doctor.
                </span>
              </h1>
              <p className="mx-auto mt-3 max-w-md text-[15px] sm:text-base leading-relaxed text-slate-600 font-medium">
                Leave your number and pick a time. Our AI agent calls you right on schedule.
              </p>
            </motion.div>

            {/* Centered Single Column Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10"
            >
              {/* soft glow behind the card */}
              <div className="pointer-events-none absolute -inset-4 rounded-[32px] bg-gradient-to-br from-[#FF6A55]/12 via-transparent to-[#FFB23E]/12 blur-2xl" />
              <div className="relative rounded-3xl border border-white/60 bg-white/90 p-6 shadow-[0_30px_70px_-20px_rgba(255,106,85,0.28)] backdrop-blur-xl ring-1 ring-slate-900/5 sm:p-8">
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Form Fields - Continuous Flow */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <PageField icon={User} label="Your Full Name">
                        <input
                          required
                          type="text"
                          maxLength={30}
                          enterKeyHint="next"
                          autoComplete="name"
                          value={form.name}
                          onChange={(e) => {
                            // Allow letters, spaces, hyphens, and apostrophes up to 30 characters
                            const sanitized = e.target.value
                              .replace(/[^a-zA-Z\s'-]/g, "")
                              .slice(0, 30);
                            setForm((f) => ({ ...f, name: sanitized }));
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              phoneInputRef.current?.focus();
                            }
                          }}
                          placeholder="Dr. Sarah Jenkins"
                          className={pageInput}
                        />
                      </PageField>

                      <PageField icon={Phone} label="Phone Number">
                        <input
                          ref={phoneInputRef}
                          required
                          type="tel"
                          inputMode="tel"
                          enterKeyHint="next"
                          autoComplete="tel"
                          maxLength={14}
                          value={form.phone}
                          onChange={(e) => {
                            const formatted = formatUSPhone(e.target.value);
                            setForm((f) => ({ ...f, phone: formatted }));
                            if (formatted.replace(/\D/g, "").length === 10) {
                              setTimeout(() => setDateOpen(true), 150);
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              phoneInputRef.current?.blur();
                              if (form.phone.replace(/\D/g, "").length === 10) {
                                setDateOpen(true);
                              }
                            }
                          }}
                          placeholder="(555) 234-5678"
                          className={pageInput}
                        />
                      </PageField>
                    </div>

                    {/* Date & Time Selection */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      {/* Date Dropdown */}
                      <div className="relative z-30">
                        <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-700">
                          <span className="flex items-center gap-1.5">
                            <CalendarIcon className="h-3.5 w-3.5 text-[#FF6A55]" />
                            Select Date
                          </span>
                        </div>
                        <CustomDateDropdown
                          selectedDate={date}
                          prettyDate={prettyDate}
                          isOpen={dateOpen}
                          onToggleOpen={setDateOpen}
                          onSelectDate={(d) => {
                            setDate(d);
                            setTime("");
                            setDateOpen(false);
                            setTimeout(() => setTimeOpen(true), 150);
                          }}
                        />
                      </div>

                      {/* Custom Redesigned Time Picker Dropdown */}
                      <div className="relative z-20">
                        <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-700">
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-[#FF6A55]" />
                            {date ? prettyDate.split(",")[0] : "Select Time"}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200/80 bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                            <Globe className="h-3 w-3 text-[#FF6A55]" />
                            EST (US Time)
                          </span>
                        </div>

                        <CustomTimeDropdown
                          disabled={!date}
                          selectedTime={time}
                          selectedDate={date}
                          isOpen={timeOpen}
                          onToggleOpen={setTimeOpen}
                          onSelectTime={(t) => setTime(t)}
                        />
                      </div>
                    </div>

                    {/* Selected Summary Pill */}
                    {date && time && (
                      <div className="flex items-center gap-3 rounded-2xl border border-[#FF6A55]/20 bg-[#FFF4EB] px-4 py-3 text-xs">
                        <CalendarIcon className="h-4 w-4 shrink-0 text-[#FF6A55]" />
                        <div className="text-slate-800 font-medium">
                          Selected: <span className="font-bold text-slate-900">{prettyDate}</span>{" "}
                          at <span className="font-bold text-slate-900">{time}</span>
                        </div>
                      </div>
                    )}

                    {/* Consent — required before an automated call may be placed */}
                    <label className="flex cursor-pointer items-start gap-2.5">
                      <span className="relative mt-px flex h-4.5 w-4.5 shrink-0 items-center justify-center">
                        <input
                          type="checkbox"
                          required
                          checked={consent}
                          onChange={(e) => setConsent(e.target.checked)}
                          className="peer h-4.5 w-4.5 cursor-pointer appearance-none rounded-[5px] border border-slate-300 bg-white transition checked:border-[#FF6A55] checked:bg-[#FF6A55] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6A55]/50"
                        />
                        <Check
                          className="pointer-events-none absolute h-3 w-3 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                          strokeWidth={3.5}
                        />
                      </span>
                      <span className="text-[11.5px] leading-relaxed text-slate-500">
                        I agree to receive an automated call from Solara's AI agent at this number.
                      </span>
                    </label>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={
                        !date ||
                        !time ||
                        !consent ||
                        form.name.trim().length < 2 ||
                        form.phone.replace(/\D/g, "").length !== 10 ||
                        submitting
                      }
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FF6A55] to-[#E55A45] py-4 text-sm font-bold text-white shadow-lg shadow-[#FF6A55]/25 transition hover:shadow-xl hover:shadow-[#FF6A55]/35 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Scheduling Your Live Demo…
                        </>
                      ) : (
                        <>
                          Submit
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>

                    {sendError && (
                      <p
                        role="alert"
                        className="flex items-start justify-center gap-1.5 text-center text-xs font-medium text-red-600"
                      >
                        <AlertCircle className="mt-px h-3.5 w-3.5 shrink-0" />
                        {sendError}
                      </p>
                    )}
                  </form>
              </div>
            </motion.div>
            </div>
            {/* ── END LEFT ── */}

            {/* ── PRODUCT VISUAL column (renders on the LEFT on desktop) ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative lg:order-1"
            >
              {/* VIP seal — sits outside the clipping wrapper so it can overhang the corner.
                  Hidden while a picker is open, since the popover overlaps this corner. */}
              <motion.img
                src="/images/vip-badge.png"
                alt="VIP"
                initial={{ scale: 0.6, opacity: 0, rotate: -14 }}
                animate={{
                  scale: pickerOpen ? 0.85 : 1,
                  opacity: pickerOpen ? 0 : 1,
                  rotate: 0,
                }}
                transition={
                  pickerOpen
                    ? { duration: 0.15, ease: "easeOut" }
                    : { delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }
                }
                className="pointer-events-none absolute -right-4 -top-4 z-30 h-20 w-20 drop-shadow-[0_14px_32px_rgba(229,72,47,0.55)] sm:-right-7 sm:-top-7 sm:h-32 sm:w-32"
              />

              {/* ══ Glass + Aurora invitation card ══ */}
              <div className="relative overflow-hidden rounded-[32px] p-[1.5px] shadow-[0_40px_100px_-30px_rgba(255,106,85,0.5)]">
                {/* Animated aurora background */}
                <div className="absolute inset-0 bg-[#0A0E17]">
                  <motion.div
                    aria-hidden="true"
                    animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.15, 1] }}
                    transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -left-1/4 -top-1/4 h-[130%] w-[80%] rounded-full bg-[#FF6A55]/50 blur-[90px]"
                  />
                  <motion.div
                    aria-hidden="true"
                    animate={{ x: [0, -40, 30, 0], y: [0, 30, -20, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -right-1/4 top-0 h-[110%] w-[75%] rounded-full bg-[#FFB23E]/40 blur-[90px]"
                  />
                  <motion.div
                    aria-hidden="true"
                    animate={{ x: [0, 25, -35, 0], y: [0, -20, 25, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-0 left-1/4 h-[90%] w-[70%] rounded-full bg-[#16C4B3]/30 blur-[90px]"
                  />
                </div>

                {/* Frosted glass panel */}
                <div className="relative rounded-[31px] bg-slate-950/40 p-6 text-white ring-1 ring-inset ring-white/15 backdrop-blur-2xl sm:p-8">
                  {/* top sheen */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                  {/* Header: badge + serial */}
                  <div className="flex items-center justify-between">
                    <motion.span
                      animate={{ boxShadow: ["0 0 0 0 rgba(255,178,62,0)", "0 0 16px 1px rgba(255,178,62,0.35)", "0 0 0 0 rgba(255,178,62,0)"] }}
                      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                      className="relative inline-flex items-center gap-2 rounded-full bg-white/10 py-1.5 pl-2 pr-4 ring-1 ring-white/20 backdrop-blur"
                    >
                      <span className="relative grid h-5 w-5 place-items-center rounded-full bg-white text-[#E5482F] shadow-sm">
                        <motion.span
                          animate={{ scale: [1, 1.18, 1] }}
                          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <MailOpen className="h-3 w-3" strokeWidth={2.5} />
                        </motion.span>
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white">
                        By invitation only
                      </span>
                    </motion.span>

                  </div>


                  {/* Title */}
                  <div className="mt-7">
                    <h3 className="font-display text-[31px] font-extrabold leading-[1.05] tracking-tight drop-shadow-sm">
                      Reserved for a
                      <span className="block bg-gradient-to-r from-white via-[#FFE7C7] to-[#FFB23E] bg-clip-text text-transparent">
                        select few practices.
                      </span>
                    </h3>
                    <p className="mt-3.5 max-w-sm text-[14px] leading-relaxed text-white/70">
                      Yours was chosen. Most practices never see this page, and the ones that do are
                      picked by hand. Claim your seat and everything after is handled for you.
                    </p>
                  </div>

                  {/* Perks as glowing glass chips */}
                  <ul className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {[
                      {
                        icon: Rocket,
                        title: "Priority Access",
                        desc: "Skip the waitlist and go live ahead of everyone else.",
                        tint: "from-[#FF8A5B] to-[#E5482F]",
                      },
                      {
                        icon: BadgePercent,
                        title: "Founder Pricing",
                        desc: "Early pricing, reserved for our first practices.",
                        tint: "from-[#FFB23E] to-[#F59A1E]",
                      },
                      {
                        icon: HandHeart,
                        title: "White-Glove Onboarding",
                        desc: "We set up your entire practice, end to end.",
                        tint: "from-[#16C4B3] to-[#0E8C80]",
                      },
                      {
                        icon: Compass,
                        title: "Shape the Product",
                        desc: "Your feedback goes straight onto the roadmap.",
                        tint: "from-[#FF8A5B] to-[#E5482F]",
                      },
                    ].map((p) => (
                      <li
                        key={p.title}
                        className="group/perk relative flex items-start gap-3 overflow-hidden rounded-2xl bg-white/6 p-3 ring-1 ring-white/10 backdrop-blur transition-colors hover:bg-white/10 sm:flex-col sm:gap-0 sm:p-4"
                      >
                        {/* tinted corner glow, keyed to the icon */}
                        <span
                          aria-hidden="true"
                          className={`pointer-events-none absolute -left-6 -top-6 h-16 w-16 rounded-full bg-gradient-to-br ${p.tint} opacity-20 blur-2xl transition-opacity group-hover/perk:opacity-35`}
                        />
                        <span
                          className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${p.tint} text-white shadow-lg ring-1 ring-white/20 sm:h-10 sm:w-10`}
                        >
                          <p.icon className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                        </span>
                        <div className="relative min-w-0 sm:mt-3">
                          <div className="text-[14px] font-bold leading-tight text-white sm:text-[14.5px]">
                            {p.title}
                          </div>
                          <div className="mt-1 text-[12.5px] leading-relaxed text-white/60">
                            {p.desc}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
            {/* ── END LEFT VISUAL ── */}
          </div>
        </div>
      </main>
    </div>
  );
}

/* ── Custom Redesigned Date Dropdown Component ── */
function CustomDateDropdown({
  selectedDate,
  prettyDate,
  isOpen,
  onToggleOpen,
  onSelectDate,
}: {
  selectedDate: string;
  prettyDate: string;
  isOpen: boolean;
  onToggleOpen: (open: boolean) => void;
  onSelectDate: (iso: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onToggleOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onToggleOpen]);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => onToggleOpen(!isOpen)}
        className={`flex w-full items-center justify-between rounded-xl border px-3.5 py-3 text-xs font-semibold transition ${
          isOpen
            ? "border-[#FF6A55] bg-white ring-2 ring-[#FF6A55]/20 text-slate-900 shadow-sm"
            : selectedDate
              ? "border-[#FF6A55]/60 bg-[#FFF4EB]/40 text-[#FF6A55]"
              : "border-slate-200 bg-white text-slate-700 hover:border-[#FF6A55]/50"
        }`}
      >
        <span className="flex items-center gap-2 truncate">
          <CalendarIcon
            className={`h-4 w-4 shrink-0 ${selectedDate ? "text-[#FF6A55]" : "text-slate-400"}`}
          />
          {prettyDate || "Select a date on calendar…"}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#FF6A55]" : ""
          }`}
        />
      </button>

      {/* Floating Calendar Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 top-full z-50 mt-2 w-[300px] sm:w-[320px] rounded-2xl border border-slate-200/90 bg-white p-2.5 shadow-[0_16px_36px_-8px_rgba(15,23,42,0.18)]"
          >
            <BookingCalendar
              selected={selectedDate}
              onSelect={(d) => {
                onSelectDate(d);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Custom Redesigned Time Dropdown Component ── */
function CustomTimeDropdown({
  disabled,
  selectedTime,
  selectedDate,
  isOpen,
  onToggleOpen,
  onSelectTime,
}: {
  disabled: boolean;
  selectedTime: string;
  selectedDate: string;
  isOpen: boolean;
  onToggleOpen: (open: boolean) => void;
  onSelectTime: (t: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  // The clock popover is tall; flip it above the trigger when the viewport
  // cannot fit it below.
  const [dropUp, setDropUp] = useState(false);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onToggleOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onToggleOpen]);

  useEffect(() => {
    if (!isOpen || !containerRef.current) return;
    const POPOVER_H = 380; // readout + clock face + actions
    const rect = containerRef.current.getBoundingClientRect();
    const below = window.innerHeight - rect.bottom;
    const above = rect.top;
    // Only flip when there genuinely is more room above, so we never make it worse.
    setDropUp(below < POPOVER_H && above > below);
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => onToggleOpen(!isOpen)}
        className={`flex w-full items-center justify-between rounded-xl border px-3.5 py-3 text-xs font-semibold transition ${
          disabled
            ? "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400"
            : isOpen
              ? "border-[#FF6A55] bg-white ring-2 ring-[#FF6A55]/20 text-slate-900 shadow-sm"
              : selectedTime
                ? "border-[#FF6A55]/60 bg-[#FFF4EB]/40 text-[#FF6A55]"
                : "border-slate-200 bg-white text-slate-700 hover:border-[#FF6A55]/50"
        }`}
      >
        <span className="flex items-center gap-2">
          <Clock className={`h-4 w-4 ${selectedTime ? "text-[#FF6A55]" : "text-slate-400"}`} />
          {selectedTime || (disabled ? "Pick date first" : "Pick a time…")}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#FF6A55]" : ""
          }`}
        />
      </button>

      {/* Floating Dropdown Menu */}
      <AnimatePresence>
        {isOpen && !disabled && (
          <motion.div
            initial={{ opacity: 0, y: dropUp ? -6 : 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: dropUp ? -6 : 6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={`absolute right-0 z-50 w-65 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_20px_45px_-8px_rgba(15,23,42,0.18)] ${
              dropUp ? "bottom-full mb-2" : "top-full mt-2"
            }`}
          >
            <div data-lenis-prevent className="p-3">
              <ClockPicker
                value={selectedTime}
                onChange={onSelectTime}
                onDone={() => onToggleOpen(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Analog clock time picker ──
   Two stages: drag/click the hour hand, then the minute hand. The user can land
   on any time; minutes snap to 5 so the hand does not feel jittery. */
function ClockPicker({
  value,
  onChange,
  onDone,
}: {
  value: string;
  onChange: (t: string) => void;
  onDone: () => void;
}) {
  const faceRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<"hour" | "minute">("hour");
  const [dragging, setDragging] = useState(false);

  const parsed = parseDisplayTime(value);
  const [hour, setHour] = useState(parsed?.hour ?? 9);
  const [minute, setMinute] = useState(parsed?.minute ?? 0);
  const [period, setPeriod] = useState<"AM" | "PM">(parsed?.period ?? "AM");

  // Keep the picker in step when the field is cleared or set elsewhere.
  useEffect(() => {
    const p = parseDisplayTime(value);
    if (!p) return;
    setHour(p.hour);
    setMinute(p.minute);
    setPeriod(p.period);
  }, [value]);

  // Mirrors the current selection so pointer handlers never read stale values.
  const liveRef = useRef({ hour, minute, period });
  liveRef.current = { hour, minute, period };

  const emit = (h: number, m: number, p: "AM" | "PM") =>
    onChange(`${h}:${String(m).padStart(2, "0")} ${p}`);

  // Convert a pointer position into an angle, then into an hour or minute.
  const applyFromPoint = (clientX: number, clientY: number, forStage: "hour" | "minute") => {
    const el = faceRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const deg = (Math.atan2(clientY - cy, clientX - cx) * 180) / Math.PI + 90;
    const norm = (deg + 360) % 360;

    // Read from the ref, not the render closure, so a fast drag always emits
    // the current hour/minute/period pairing.
    const cur = liveRef.current;
    if (forStage === "hour") {
      const h = Math.round(norm / 30) % 12 || 12;
      setHour(h);
      emit(h, cur.minute, cur.period);
    } else {
      const raw = Math.round(norm / 6) % 60;
      const snapped = (Math.round(raw / 5) * 5) % 60;
      setMinute(snapped);
      emit(cur.hour, snapped, cur.period);
    }
  };

  const handleDown = (e: React.PointerEvent) => {
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    applyFromPoint(e.clientX, e.clientY, stage);
  };
  const handleMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    applyFromPoint(e.clientX, e.clientY, stage);
  };
  const handleUp = () => {
    if (!dragging) return;
    setDragging(false);
    // Advance hour -> minute automatically, mirroring native pickers.
    if (stage === "hour") setStage("minute");
  };

  const handAngle = stage === "hour" ? (hour % 12) * 30 : minute * 6;
  const marks = stage === "hour"
    ? Array.from({ length: 12 }, (_, i) => ({ label: String(i + 1), angle: (i + 1) * 30 }))
    : Array.from({ length: 12 }, (_, i) => ({
        label: String(i * 5).padStart(2, "0"),
        angle: i * 30,
      }));

  return (
    <div className="select-none">
      {/* Readout — the two segments double as stage tabs */}
      <div className="mb-3 flex items-center justify-center gap-1.5">
        <button
          type="button"
          onClick={() => setStage("hour")}
          className={`rounded-xl px-2.5 py-1 font-display text-[28px] font-extrabold leading-none tabular-nums transition ${
            stage === "hour"
              ? "bg-[#FFF4EB] text-[#FF6A55] ring-1 ring-[#FF6A55]/25"
              : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
          }`}
        >
          {hour}
        </button>
        <span className="font-display text-[26px] font-extrabold leading-none text-slate-300">:</span>
        <button
          type="button"
          onClick={() => setStage("minute")}
          className={`rounded-xl px-2.5 py-1 font-display text-[28px] font-extrabold leading-none tabular-nums transition ${
            stage === "minute"
              ? "bg-[#FFF4EB] text-[#FF6A55] ring-1 ring-[#FF6A55]/25"
              : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
          }`}
        >
          {String(minute).padStart(2, "0")}
        </button>

        {/* AM/PM segmented control */}
        <div className="ml-2 flex overflow-hidden rounded-lg ring-1 ring-slate-200">
          {(["AM", "PM"] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => {
                setPeriod(p);
                emit(hour, minute, p);
              }}
              className={`px-2.5 py-1.5 text-[10.5px] font-bold transition ${
                period === p
                  ? "bg-[#FF6A55] text-white"
                  : "bg-white text-slate-500 hover:bg-slate-50"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Clock face */}
      <div
        ref={faceRef}
        onPointerDown={handleDown}
        onPointerMove={handleMove}
        onPointerUp={handleUp}
        onPointerCancel={handleUp}
        className={`relative mx-auto h-53 w-53 touch-none rounded-full bg-slate-50 ring-1 transition-shadow ${
          dragging ? "cursor-grabbing ring-[#FF6A55]/30" : "cursor-grab ring-slate-200/80"
        }`}
      >
        {/* hand */}
        <div
          className="absolute left-1/2 top-1/2 origin-bottom rounded-full bg-[#FF6A55]"
          style={{
            width: 2,
            height: "38%",
            transform: `translate(-50%, -100%) rotate(${handAngle}deg)`,
            transformOrigin: "50% 100%",
            transition: dragging ? "none" : "transform 200ms cubic-bezier(0.16,1,0.3,1)",
          }}
        />
        {/* hand tip */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 grid h-8 w-8 place-items-center rounded-full bg-[#FF6A55] shadow-[0_2px_10px_rgba(255,106,85,0.5)]"
          style={{
            transform: `rotate(${handAngle}deg) translateY(-76px) rotate(${-handAngle}deg) translate(-50%, -50%)`,
            transformOrigin: "0 0",
            transition: dragging ? "none" : "transform 200ms cubic-bezier(0.16,1,0.3,1)",
          }}
        />
        {/* centre pin */}
        <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6A55] ring-2 ring-white" />

        {/* numerals */}
        {marks.map((mk) => {
          const rad = ((mk.angle - 90) * Math.PI) / 180;
          const radius = 76;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;
          const active =
            stage === "hour"
              ? Number(mk.label) === hour
              : Number(mk.label) === minute;
          return (
            <span
              key={`${stage}-${mk.label}`}
              className={`pointer-events-none absolute grid h-8 w-8 place-items-center rounded-full text-[12.5px] tabular-nums transition-colors ${
                active ? "font-extrabold text-white" : "font-semibold text-slate-500"
              }`}
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {mk.label}
            </span>
          );
        })}
      </div>

      {/* Actions */}
      <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
        <span className="text-[11px] font-medium text-slate-400">
          {stage === "hour" ? "Choose the hour" : "Choose the minutes"}
        </span>
        <button
          type="button"
          onClick={() => {
            emit(hour, minute, period);
            onDone();
          }}
          className="rounded-lg bg-slate-950 px-4 py-2 text-[12px] font-bold text-white transition hover:bg-slate-800"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

/** Parse "9:30 AM" back into parts so the picker reopens where the user left it. */
function parseDisplayTime(v: string): { hour: number; minute: number; period: "AM" | "PM" } | null {
  const m = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(v?.trim() ?? "");
  if (!m) return null;
  return {
    hour: Number(m[1]),
    minute: Number(m[2]),
    period: m[3].toUpperCase() as "AM" | "PM",
  };
}

/* ── Interactive Visual Monthly Calendar Component ── */
function BookingCalendar({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (iso: string) => void;
}) {
  // "Today" in US Eastern, so a visitor abroad cannot pick a day that is
  // already past for the team taking the call.
  const todayISO = getEasternNow().iso;
  const [todayY, todayM] = todayISO.split("-").map(Number);
  const todayMonthIndex = todayM - 1;

  const [view, setView] = useState(() => {
    const [y, m] = (selected || todayISO).split("-").map(Number);
    return { y, m: m - 1 };
  });

  const firstOfMonth = new Date(view.y, view.m, 1);
  const startWeekday = firstOfMonth.getDay();
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const canPrev = view.y > todayY || (view.y === todayY && view.m > todayMonthIndex);

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
    <div className="w-full p-1">
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="font-display text-sm font-bold text-slate-900">
          {MONTHS[view.m]} {view.y}
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => canPrev && shift(-1)}
            disabled={!canPrev}
            aria-label="Previous month"
            className="grid h-8 w-8 place-items-center rounded-lg text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
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
          <div
            key={w}
            className="grid h-8 place-items-center text-[11px] font-semibold text-slate-400"
          >
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
          const weekday = new Date(view.y, view.m, day).getDay();
          const isWeekend = weekday === 0 || weekday === 6;
          const disabled = isPast || isWeekend;

          return (
            <button
              key={iso}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(iso)}
              className={`grid h-9 place-items-center rounded-xl text-xs font-semibold transition ${
                isSelected
                  ? "bg-[#FF6A55] text-white shadow-md shadow-[#FF6A55]/30 font-bold"
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
  "w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-3 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[#FF6A55] focus:bg-white focus:ring-2 focus:ring-[#FF6A55]/20 font-medium";

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
      <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-700">
        <Icon className="h-3.5 w-3.5 text-[#FF6A55]" />
        {label}
      </span>
      {children}
    </label>
  );
}
