"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  ShieldCheck,
  Calendar,
  ArrowRight,
  ChevronDown,
  Gift,
  Check,
  Database,
  ClipboardList,
  CalendarCheck,
  PhoneCall,
  Activity,
  LineChart,
  Bell,
  Mail,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const CAROUSEL_ITEMS = [
  {
    id: "insurance",
    label: "Insurance",
    icon: ShieldCheck,
    title: "Coverage confirmed before the chair",
    desc: "Eligibility and benefits checked automatically at intake — nobody left on hold with a carrier.",
    previewType: "insurance",
    previewTitle: "Delta Dental PPO - active · cleaning covered 100% · 2 left this year",
  },
  {
    id: "automation",
    label: "Automation",
    icon: Activity,
    title: "Paperwork handles itself",
    desc: "Forms sent, signed, and saved to the patient file without lifting a finger.",
    previewType: "automation",
    previewTitle: "Intake forms completed — John Doe",
  },
  {
    id: "booking",
    label: "Booking",
    icon: CalendarCheck,
    title: "Fill your empty chairs",
    desc: "Patients book themselves 24/7. Solara automatically finds the right slot.",
    previewType: "booking",
    previewTitle: "New appointment booked: Tue 10:30 AM",
  },
  {
    id: "recall",
    label: "Recall",
    icon: PhoneCall,
    title: "Bring patients back",
    desc: "Smart follow-ups ensure your hygiene schedule stays completely full.",
    previewType: "recall",
    previewTitle: "Recall message sent to 45 overdue patients",
  },
  {
    id: "overflow",
    label: "Front-desk overflow",
    icon: Database,
    title: "Never miss a call",
    desc: "When lines are busy, Solara steps in to answer questions and book appointments.",
    previewType: "overflow",
    previewTitle: "Call handled: Answered FAQ about pricing",
  },
  {
    id: "growth",
    label: "Growth",
    icon: LineChart,
    title: "Drive more revenue",
    desc: "Identify unscheduled treatment plans and reactivate dormant patients automatically.",
    previewType: "growth",
    previewTitle: "Identified $12k in unscheduled treatments",
  },
  {
    id: "reminders",
    label: "Reminders",
    icon: Bell,
    title: "Automated reminders",
    desc: "Ensure patients show up with perfectly timed text and email reminders.",
    previewType: "reminders",
    previewTitle: "Reminder sent: Tomorrow at 10:00 AM",
  },
  {
    id: "campaigns",
    label: "Campaigns",
    icon: Mail,
    title: "Campaign text and emails",
    desc: "Engage your patient base with targeted marketing blasts and announcements.",
    previewType: "campaigns",
    previewTitle: "Campaign delivered to 1,200 patients",
  },
];

export function Hero() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const activeItem = CAROUSEL_ITEMS[activeIdx];
  const ActiveIcon = activeItem.icon;

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 md:pt-40 lg:pt-48">
      {/* subtle background */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[600px]"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(249,115,22,0.06), transparent 60%)",
        }}
      />

      <div className="relative z-10 container-wide">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* LEFT CONTENT */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative mb-6 inline-flex overflow-hidden rounded-full bg-orange-100 p-[1px] shadow-sm"
            >
              {/* Rotating Border Effect */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 aspect-square w-[300%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0_300deg,#FF6A55_360deg)] opacity-70"
              />

              <div className="relative inline-flex h-full w-full items-center gap-2 overflow-hidden rounded-full bg-[#FFF8ED] px-4 py-2">
                {/* Shine Effect */}
                <motion.div
                  initial={{ x: "-200%" }}
                  animate={{ x: "200%" }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut",
                  }}
                  className="pointer-events-none absolute inset-0 z-50 w-[40%] -skew-x-[20deg] bg-gradient-to-r from-transparent via-white/80 to-transparent"
                />

                <Sparkles className="relative z-10 h-4 w-4 text-[#FF6A55]" />
                <span className="relative z-10 text-sm font-medium text-slate-800">
                  Supercharge your Dental Practice with Solara
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mb-4 font-display text-4xl leading-[1.08] font-bold text-[color:var(--foreground)] sm:text-5xl"
            >
              Hire no one. Miss nothing.
              <span aria-hidden="true" className="mt-2 block min-h-[1.5em] sm:min-h-[1.15em]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeItem.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex items-center gap-3 align-middle"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[color:var(--primary)] to-[color:var(--primary-hover)] shadow-md shadow-[color:var(--primary)]/30 sm:h-12 sm:w-12">
                      <ActiveIcon className="h-5 w-5 text-white sm:h-6 sm:w-6" />
                    </span>
                    <span className="bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--primary-hover)] bg-clip-text text-transparent">
                      {activeItem.id === "insurance"
                        ? "insurance, verified"
                        : activeItem.id === "automation"
                          ? "paperwork, automated"
                          : activeItem.id === "booking"
                            ? "chairs, filled"
                            : activeItem.id === "recall"
                              ? "patients, recalled"
                              : activeItem.id === "overflow"
                                ? "calls, answered"
                                : activeItem.id === "reminders"
                                  ? "reminders, automated"
                                  : activeItem.id === "campaigns"
                                    ? "campaigns, delivered"
                                    : "revenue, driven"}
                    </span>
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mb-8 max-w-xl text-lg leading-relaxed text-[color:var(--secondary-foreground)] sm:text-xl"
            >
              Insurance verified before the patient sits down. Every call answered — after hours, at
              lunch, mid-rush. Empty chairs filled from your own recall list. Solara runs the entire
              front office in the background, so your team does dentistry instead of paperwork.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mb-3 flex flex-col gap-4 sm:flex-row"
            >
              <Link
                href="/book-a-demo"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[color:var(--primary)] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[color:var(--primary)]/25 transition-colors hover:bg-[color:var(--primary-hover)]"
              >
                <Calendar className="h-5 w-5" />
                Experience a Personalized Demo
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="#platform"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] px-8 py-4 text-base font-semibold text-[color:var(--foreground)] transition-all hover:border-[color:var(--primary)]/40 hover:shadow-md"
              >
                See everything it handles
                <ChevronDown className="h-5 w-5 text-[color:var(--primary)]" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mb-8 inline-flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)]/70 px-3 py-2 shadow-sm backdrop-blur"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[color:var(--success)] to-[#0E8C80] px-3 py-1.5 text-sm font-bold text-white shadow-sm shadow-[color:var(--success)]/20">
                <Gift className="h-4 w-4" />
                Your founding rate, locked for good
              </span>
              <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-[color:var(--secondary-foreground)]">
                <span className="inline-flex items-center gap-1">
                  <Check className="h-3.5 w-3.5 text-[color:var(--success)]" /> White-glove setup
                  included
                </span>
                <span className="inline-flex items-center gap-1">
                  <Check className="h-3.5 w-3.5 text-[color:var(--success)]" /> Cancel anytime
                </span>
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="border-t border-[color:var(--border)] pt-6"
            >
              <p className="mb-3 text-xs tracking-wide text-[color:var(--muted-foreground)] uppercase">
                Runs on the stack you already have
              </p>
              <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[color:var(--secondary-foreground)]">
                <span className="inline-flex items-center gap-1.5">
                  <Database className="h-4 w-4 text-[color:var(--primary)]" />
                  Syncs with OpenDental
                </span>
                <span className="text-[color:var(--muted-foreground)]">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-[color:var(--primary)]" />
                  Insurance verified at intake
                </span>
                <span className="text-[color:var(--muted-foreground)]">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <ClipboardList className="h-4 w-4 text-[color:var(--primary)]" />
                  Paperless intake & notes
                </span>
              </p>
            </motion.div>
          </div>

          {/* RIGHT BENTO BOX */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-12">
              {/* Main Feature Card */}
              <div className="relative flex h-[440px] flex-col justify-between overflow-hidden rounded-[32px] border border-[#FF6A55]/15 bg-gradient-to-br from-[#FFF9F2] via-white to-[#FFF9F2] p-6 shadow-[0_24px_48px_rgba(249,115,22,0.06)] sm:col-span-7 sm:p-8">
                <div className="relative z-10 mb-6 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/images/logo.svg"
                      alt=""
                      width={390}
                      height={123}
                      className="h-10 w-auto object-contain"
                    />
                  </div>
                  <div className="flex gap-1.5">
                    {CAROUSEL_ITEMS.map((item, idx) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveIdx(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIdx ? "w-6 bg-[#FF6A55]" : "w-2 bg-slate-200"}`}
                        aria-label={`Show: ${item.label}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="relative z-10 flex flex-1 flex-col justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeItem.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="mb-5 flex h-[48px] w-[48px] items-center justify-center rounded-2xl bg-[#FFDFD2] shadow-sm shadow-[#FF6A55]/10">
                        <ActiveIcon className="h-6 w-6 text-[#FF6A55]" strokeWidth={1.5} />
                      </div>
                      <p className="mb-2 font-display text-2xl leading-tight font-bold tracking-[-0.02em] text-slate-800">
                        {activeItem.title}
                      </p>
                      <p className="mb-6 text-sm leading-relaxed text-slate-500">
                        {activeItem.desc}
                      </p>

                      <div className="rounded-2xl border border-slate-200/60 bg-white/60 px-5 py-4 shadow-sm backdrop-blur-sm">
                        <div className="mb-1 text-[9px] font-bold tracking-widest text-slate-400 uppercase">
                          What your team sees
                        </div>
                        <div className="text-sm leading-snug font-medium text-slate-700">
                          {activeItem.previewTitle}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Decorative background gradient */}
                <div className="pointer-events-none absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-gradient-to-tl from-[#FF6A55]/10 to-transparent blur-3xl" />
              </div>

              {/* Right Column Stack */}
              <div className="flex flex-col gap-4 sm:col-span-5">
                {/* Metrics Card */}
                <div className="relative flex flex-1 flex-col justify-center overflow-hidden rounded-[32px] border border-slate-100 bg-white p-6 shadow-[0_12px_32px_rgba(0,0,0,0.04)]">
                  <div className="mb-4 flex items-center gap-2">
                    <LineChart className="h-4 w-4 text-[#16C4B3]" />
                    <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                      Today's Impact
                    </span>
                  </div>
                  <div className="relative z-10 space-y-4">
                    <div>
                      <div className="mb-1 font-display text-[28px] leading-none font-bold text-slate-800">
                        94%
                      </div>
                      <div className="text-xs text-slate-500">Insurance verified instantly</div>
                    </div>
                    <div>
                      <div className="mb-1 font-display text-[28px] leading-none font-bold text-slate-800">
                        14
                      </div>
                      <div className="text-xs text-slate-500">Appointments booked</div>
                    </div>
                  </div>
                  {/* Decorative background gradient */}
                  <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-gradient-to-bl from-[#16C4B3]/10 to-transparent blur-2xl" />
                </div>

                {/* Live Activity Card */}
                <div className="flex flex-1 flex-col justify-center rounded-[32px] bg-[#0F172A] p-7 shadow-[0_20px_40px_rgba(0,0,0,0.12)]">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="text-[11px] font-bold tracking-[0.15em] text-[#38BDF8] uppercase">
                      Live Feed
                    </span>
                    <span className="h-2.5 w-2.5 rounded-full bg-[#16C4B3]"></span>
                  </div>

                  <div className="relative z-10">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeItem.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-4"
                      >
                        <div className="flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-full bg-[#1E293B]">
                          <ActiveIcon className="h-5 w-5 text-slate-300" strokeWidth={1.5} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="mb-0.5 truncate text-[15px] font-bold text-white">
                            {activeItem.label} Processing
                          </div>
                          <div className="truncate text-[13px] text-slate-400">
                            Via Solara Neural Net
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating connecting badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute top-1/2 left-[58%] z-20 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-100 bg-white shadow-xl lg:flex"
            >
              <Sparkles className="h-5 w-5 text-[#FF6A55]" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
