import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Calendar as CalendarIcon,
  Check,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  User,
  Mail,
  Phone,
  Clock,
  Loader2,
  Star,
  Sun,
  Sunrise,
  Sunset,
  Globe,
  Bot,
  Database,
  MessageSquare,
  Stethoscope,
  ShieldCheck,
  BarChart3,
  Sparkles,
  PhoneCall,
  Zap,
  TrendingUp,
  FileCheck,
  Lock,
  Activity,
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

const TIME_CATEGORIES = [
  {
    name: "Morning",
    icon: Sunrise,
    slots: [
      "8:00 AM",
      "8:30 AM",
      "9:00 AM",
      "9:30 AM",
      "10:00 AM",
      "10:30 AM",
      "11:00 AM",
      "11:30 AM",
    ],
  },
  {
    name: "Afternoon",
    icon: Sun,
    slots: [
      "12:00 PM",
      "12:30 PM",
      "1:00 PM",
      "1:30 PM",
      "2:00 PM",
      "2:30 PM",
      "3:00 PM",
      "3:30 PM",
      "4:00 PM",
      "4:30 PM",
    ],
  },
  {
    name: "Evening",
    icon: Sunset,
    slots: ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM"],
  },
];

const ALL_TIME_SLOTS = TIME_CATEGORIES.flatMap((c) => c.slots);

const DEMO_FEATURES = [
  {
    image: "/images/custom_images/human_missed_calls_1784716295403.png",
    icon: Bot,
    badgeIcon: PhoneCall,
    title: "Never Miss a Patient Call",
    badge: "Zero Missed Calls",
    description:
      "Our AI answers calls and books appointments 24/7, so your front desk can focus entirely on the patients in your clinic.",
  },
  {
    image: "/images/custom_images/human_double_bookings_1784716305311.png",
    icon: Database,
    badgeIcon: Zap,
    title: "Eliminate Double Bookings",
    badge: "Flawless Schedule Sync",
    description:
      "Syncs seamlessly with your practice management software in real-time. No more manual data entry or double-booked chairs.",
  },
  {
    image: "/images/custom_images/human_hygiene_recalls_1784716317385.png",
    icon: MessageSquare,
    badgeIcon: TrendingUp,
    title: "Automate Hygiene Recalls",
    badge: "Keep Chairs Full",
    description:
      "Automatically text and reactivate overdue patients to keep your hygiene schedule fully booked without manual phone calls.",
  },
  {
    image: "/images/custom_images/human_patient_intake_1784716328742.png",
    icon: Stethoscope,
    badgeIcon: FileCheck,
    title: "Speed Up Patient Intake",
    badge: "No More Paperwork",
    description:
      "Patients complete digital intake forms on their phones before they arrive, completely eliminating waiting room bottlenecks.",
  },
  {
    image: "/images/custom_images/human_compliance_1784716338567.png",
    icon: ShieldCheck,
    badgeIcon: Lock,
    title: "Ensure Complete Compliance",
    badge: "Total Peace of Mind",
    description:
      "Your practice is fully protected. We use enterprise-grade encryption and guarantee 100% HIPAA compliance for total peace of mind.",
  },
  {
    image: "/images/custom_images/human_revenue_1784716348606.png",
    icon: BarChart3,
    badgeIcon: Activity,
    title: "Track Practice Revenue",
    badge: "Stop Leaking Revenue",
    description:
      "Easily track call conversions and uncaptured revenue in real-time. Get clear, actionable data to help your practice grow.",
  },
];

function toISO(d: Date) {
  return d.toLocaleDateString("en-CA");
}

function parseSlotToMinutes(slot: string): number {
  const [timePart, period] = slot.split(" ");
  const [hoursValue, minutesValue] = timePart.split(":").map(Number);
  let hours = hoursValue;
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;
  return hours * 60 + minutesValue;
}

function isSlotAvailable(slot: string, selectedDateISO: string): boolean {
  if (!selectedDateISO) return false;
  // Compared in US Eastern, not the visitor's zone — otherwise someone abroad
  // sees slots that have already passed for the team taking the call.
  const et = getEasternNow();

  if (selectedDateISO === et.iso) {
    const currentMinutes = et.hour * 60 + et.minute;
    const slotMinutes = parseSlotToMinutes(slot);
    // Slot must be in the future (with a 15-minute booking buffer)
    return slotMinutes > currentMinutes + 15;
  }
  return true;
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

  const phoneInputRef = useRef<HTMLInputElement>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [dateOpen, setDateOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sendError, setSendError] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
  });

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
        return;
      }
      setSubmitted(true);
    } catch (err) {
      console.error("[schedule-call] submit failed", err);
      setSendError("Something went wrong. Please try again, or email solara@supermia.ai.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white selection:bg-[#FF6A55]/20">
      <main className="relative overflow-hidden pb-28 pt-10">
        {/* subtle background glow */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div
            className="absolute inset-x-0 top-0 h-112.5"
            style={{
              background:
                "radial-gradient(ellipse 70% 100% at 50% 0%, rgba(249,115,22,0.07), transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-180">
            {/* Centered Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-9 text-center"
            >
              <h1 className="font-display text-[26px] sm:text-[46px] lg:text-[52px] font-extrabold leading-[1.15] sm:leading-[1.08] tracking-tight sm:tracking-[-0.03em] text-slate-900 mx-auto max-w-sm sm:max-w-none">
                Thank You for Continuing With Solara.{" "}
                <span className="block bg-gradient-to-r from-[#FF6A55] via-[#FF8042] to-[#FFB23E] bg-clip-text text-transparent mt-1 sm:mt-2">
                  Claim 2 Months On Us.
                </span>
              </h1>
              <p className="mx-auto mt-3 sm:mt-4 max-w-xl text-[14px] sm:text-base leading-relaxed text-slate-600 font-medium">
                Thanks for clicking! Fill out the short form below to schedule your demo and activate your complimentary 2-month plan.
              </p>
            </motion.div>

            {/* Centered Single Column Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 rounded-lg border border-slate-200/80 bg-white p-6 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.14)] sm:p-8"
            >
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
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

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={
                        !date ||
                        !time ||
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
                          Reserve Your Private Demo
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
                  </motion.form>
                ) : (
                  /* Confirmation View */
                  <motion.div
                    key="confirmed"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="py-1"
                  >
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex min-w-0 items-start gap-3 text-left">
                        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#16C4B3] text-white shadow-lg shadow-[#16C4B3]/25">
                          <Check className="h-5.5 w-5.5" strokeWidth={3} />
                        </div>
                        <div className="min-w-0">
                          <h2 className="font-display text-xl font-extrabold tracking-tight text-slate-950 sm:text-2xl">
                            {form.name ? `${form.name.split(" ")[0]}, ` : ""}you're booked.
                          </h2>
                          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm font-semibold text-slate-700">
                            <span className="inline-flex items-center gap-1.5">
                              <CalendarIcon className="h-4 w-4 text-[#FF6A55]" />
                              {prettyDate}
                            </span>
                            <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:inline-block" />
                            <span className="inline-flex items-center gap-1.5">
                              <Clock className="h-4 w-4 text-[#FF6A55]" />
                              {time} EST
                            </span>
                            <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:inline-block" />
                            <span className="inline-flex items-center gap-1.5">
                              <Phone className="h-4 w-4 text-[#FF6A55]" />
                              {form.phone}
                            </span>
                          </div>
                          <p className="mt-2 text-sm font-medium text-slate-500">
                            A Solara specialist will call you then.
                          </p>
                        </div>
                      </div>

                      <a
                        href="/"
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-slate-950/15 transition hover:bg-slate-800"
                      >
                        Home
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Connected Section Divider */}
        <div className="my-10 sm:my-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-slate-200" />
          <div className="flex items-center gap-2 rounded-full border border-[#FF6A55]/25 bg-[#FFF4EB] px-4 py-1 text-xs font-bold text-[#FF6A55] shadow-xs">
            <Sparkles className="h-4 w-4" />
            <span>Why Choose Solara</span>
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-slate-200 to-slate-200" />
        </div>

        {/* Full Screen Width Section Header */}
        <div className="mb-4 sm:mb-10 text-center px-4">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Key Benefits
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 font-medium hidden sm:block">
            Eliminate missed calls, automate patient hygiene recall, and connect your PMS seamlessly
            — so your team focuses on clinical patient care.
          </p>
        </div>

        {/* Desktop Bento Grid */}
        <div className="mx-auto hidden max-w-7xl px-4 py-4 sm:block lg:px-8">
          <div className="grid auto-rows-[240px] grid-cols-3 gap-5">
            {DEMO_FEATURES.map((feat, idx) => {
              const IconComp = feat.icon;
              const BadgeIconComp = feat.badgeIcon;
              // Bento sizing chosen so the 3-col grid packs with no gaps:
              // tile 0 is a large 2×2 hero block; the other 5 tiles are 1×1.
              // (2×2 adds 3 extra cells → 6 base + 3 = 9 = a clean 3×3 grid.)
              const isHero = idx === 0;

              return (
                <motion.div
                  key={`${feat.title}-${idx}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: idx * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className={`group relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6A55]/50 hover:shadow-xl ${
                    isHero ? "col-span-2 row-span-2" : ""
                  }`}
                >
                  {/* Full-bleed image */}
                  <img
                    src={feat.image}
                    alt={feat.title}
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Gradient scrim for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

                  {/* Badge */}
                  <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/95 px-3.5 py-1.5 text-[12px] font-bold text-slate-900 shadow-sm backdrop-blur-md">
                    <BadgeIconComp className="h-4 w-4 text-[#FF6A55]" />
                    <span className="whitespace-nowrap">{feat.badge}</span>
                  </span>

                  {/* Content overlaid at bottom */}
                  <div className="absolute inset-x-0 bottom-0 z-10 p-6">
                    <div className="mb-2 flex items-center gap-2">
                      <div className={`inline-flex items-center justify-center rounded-lg bg-[#FF6A55] text-white shadow-md ${isHero ? "h-10 w-10" : "h-8 w-8"}`}>
                        <IconComp className={isHero ? "h-5 w-5" : "h-4 w-4"} />
                      </div>
                      <h3 className={`font-bold text-white ${isHero ? "text-2xl" : "text-lg"}`}>{feat.title}</h3>
                    </div>
                    {/* Hero shows description always; smaller tiles reveal it on hover */}
                    <p
                      className={`leading-relaxed text-white/80 ${isHero ? "text-[15px]" : "text-sm"} ${
                        isHero
                          ? ""
                          : "max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:mt-1 group-hover:max-h-24 group-hover:opacity-100"
                      }`}
                    >
                      {feat.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile Column View */}
        <div className="flex flex-col px-6 pb-4 sm:hidden">
          {DEMO_FEATURES.map((feat, idx) => {
            const IconComp = feat.icon;
            return (
              <div
                key={`mobile-${feat.title}-${idx}`}
                className="flex items-center gap-2.5 py-2.5 border-b border-slate-200 last:border-0"
              >
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FFF4EB] text-[#FF6A55]">
                  <IconComp className="h-4 w-4" />
                </div>
                <h3 className="text-[15px] font-bold leading-tight text-slate-900">
                  {feat.title}
                </h3>
              </div>
            );
          })}
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
          {selectedTime || (disabled ? "Pick date first" : "Select a time slot…")}
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
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_20px_45px_-8px_rgba(15,23,42,0.18)]"
          >
            <div className="max-h-[285px] overflow-y-auto p-3 pr-2.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300 hover:[&::-webkit-scrollbar-thumb]:bg-[#FF6A55]/60">
              {(() => {
                const hasAnySlot = TIME_CATEGORIES.some((c) =>
                  c.slots.some((s) => isSlotAvailable(s, selectedDate)),
                );
                if (!hasAnySlot) {
                  return (
                    <div className="p-4 text-center text-xs font-medium text-slate-500">
                      No remaining slots available today. Please pick a future date on the calendar.
                    </div>
                  );
                }

                return TIME_CATEGORIES.map((category) => {
                  const CategoryIcon = category.icon;
                  const validSlots = category.slots.filter((s) => isSlotAvailable(s, selectedDate));
                  if (validSlots.length === 0) return null;

                  return (
                    <div key={category.name} className="mb-3.5 last:mb-0">
                      {/* Category Header */}
                      <div className="mb-2 flex items-center gap-1.5 rounded-lg border border-[#FF6A55]/15 bg-[#FFF4EB]/60 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#FF6A55]">
                        <CategoryIcon className="h-3 w-3 shrink-0" />
                        {category.name}
                      </div>

                      {/* Slot buttons grid */}
                      <div className="grid grid-cols-2 gap-1.5">
                        {validSlots.map((slot) => {
                          const isSelected = selectedTime === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => {
                                onSelectTime(slot);
                                onToggleOpen(false);
                              }}
                              className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition ${
                                isSelected
                                  ? "bg-gradient-to-r from-[#FF6A55] to-[#E55A45] text-white shadow-md shadow-[#FF6A55]/25 font-bold"
                                  : "border border-slate-100 text-slate-700 hover:border-[#FF6A55]/30 hover:bg-[#FFF4EB]/70 hover:text-[#FF6A55]"
                              }`}
                            >
                              <span>{slot}</span>
                              {isSelected && (
                                <Check className="h-3.5 w-3.5 stroke-[3] text-white" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
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
