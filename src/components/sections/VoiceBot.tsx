"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  ClipboardList,
  Phone,
  AlarmClock,
  Search,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";

// Data structure representing the scenarios
const scenarios = [
  {
    id: "insurance",
    label: "Insurance check",
    icon: ShieldCheck,
    steps: [
      "Patient books online for next week",
      "Solara instantly queries clearinghouse",
      "Eligibility and benefits breakdown returned",
    ],
    resultTitle: "Coverage verified",
    resultBadge: "No hold music",
    resultDesc: "Full breakdown saved to patient chart · Ready for check-in",
    image: "/images/walkthrough_insurance.png",
  },
  {
    id: "intake",
    label: "Intake form",
    icon: ClipboardList,
    steps: [
      "Visit booked for Tuesday",
      "Solara texts a secure intake link",
      "Patient fills it on their phone",
    ],
    resultTitle: "Paperwork done",
    resultBadge: "No paper",
    resultDesc: "New-patient forms completed · saved to chart",
    image: "/images/walkthrough_intake.png",
  },
  {
    id: "after_hours",
    label: "After hours",
    icon: Phone,
    steps: [
      "Patient calls at 8:30 PM",
      "Solara answers and speaks naturally",
      "Patient books an emergency slot for tomorrow",
    ],
    resultTitle: "Appointment booked",
    resultBadge: "24/7 Coverage",
    resultDesc: "Slot filled · Confirmation text sent to patient",
    image: "/images/walkthrough_afterhours.png",
  },
  {
    id: "recall",
    label: "Recall",
    icon: AlarmClock,
    steps: [
      "Solara identifies 40 overdue patients",
      "Personalized texts sent out silently",
      "8 patients book online via the link",
    ],
    resultTitle: "Schedule full",
    resultBadge: "Zero effort",
    resultDesc: "8 reactivations · $2,400+ production added",
    image: "/images/walkthrough_recall.png",
  },
  {
    id: "google",
    label: "Found on Google",
    icon: Search,
    steps: [
      "Patient searches 'dentist near me'",
      "Your clinic appears #1 in Google Maps",
      "Patient clicks and books instantly",
    ],
    resultTitle: "New patient won",
    resultBadge: "Top ranking",
    resultDesc: "SEO optimized · Google Business Profile managed",
    image: "/images/walkthrough_google.png",
  },
];

export function VoiceBot() {
  const [activeTab, setActiveTab] = useState(scenarios[1]); // Default to Intake form
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setTimeout(() => {
      const currentIndex = scenarios.findIndex((t) => t.id === activeTab.id);
      const nextIndex = (currentIndex + 1) % scenarios.length;
      setActiveTab(scenarios[nextIndex]);
    }, 3000);

    return () => clearTimeout(timer);
  }, [activeTab, isPaused]);

  return (
    <section id="walkthrough" className="overflow-hidden bg-[#FAF0DC] py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E8E5D8] bg-white px-3 py-1.5 text-[11px] font-bold tracking-[0.18em] text-[#FF6A55] uppercase shadow-sm">
            <Sparkles size={14} /> Live walkthrough
          </span>
          <h2 className="mb-6 font-display text-4xl leading-[1.1] font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            A day at your front desk,
            <br />{" "}
            <span className="relative whitespace-nowrap text-[#FF6A55]">
              handled
              <svg
                className="absolute -bottom-2 left-0 h-3 w-full text-[#FFB23E]/30"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 50 10 100 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
          <p className="text-lg font-medium text-slate-600 sm:text-xl">
            Watch it play through, or tap any moment to see exactly what Solara does.
          </p>
        </div>

        {/* Layout Container */}
        <div
          className="mt-8 grid items-start gap-8 sm:mt-12 lg:grid-cols-[240px_1fr] lg:gap-12 xl:grid-cols-[280px_1fr]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Panel: Vertical Tabs */}
          <div className="sticky top-32 z-20 flex flex-col gap-3">
            {scenarios.map((tab) => {
              const isActive = activeTab.id === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab)}
                  className={`relative flex w-full items-center gap-3.5 overflow-hidden rounded-2xl px-5 py-4 text-left text-[15px] font-bold transition-all duration-300 sm:px-6 ${
                    isActive
                      ? "scale-105 border border-[#FF6A55] bg-[#FF6A55] text-white shadow-[0_16px_32px_rgba(255,106,85,0.25)] sm:scale-[1.02]"
                      : "border border-slate-200/60 bg-white text-slate-500 hover:border-[#FF6A55]/30 hover:bg-slate-50 hover:text-slate-800 hover:shadow-lg"
                  }`}
                >
                  <tab.icon
                    size={20}
                    className={
                      isActive ? "relative z-10 text-white" : "relative z-10 text-slate-400"
                    }
                  />
                  <span className="relative z-10">{tab.label}</span>

                  {isActive && (
                    <motion.div
                      key={tab.id + (isPaused ? "-paused" : "-playing")}
                      initial={{ width: isPaused ? "100%" : "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: isPaused ? 0 : 3, ease: "linear" }}
                      className="absolute bottom-0 left-0 h-1 bg-white/40"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Panel: Content Area */}
          <div className="min-h-[500px] w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, x: 20, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="grid h-full items-stretch gap-6 sm:gap-8 lg:grid-cols-[1.1fr_1fr]"
              >
                {/* Left Panel: High-End Photography Result */}
                <div className="group relative order-2 flex min-h-[400px] flex-col overflow-hidden rounded-[32px] shadow-[0_24px_48px_rgba(0,0,0,0.15)] lg:order-1">
                  {/* Full Bleed Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={activeTab.image}
                      alt={activeTab.label}
                      fill
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    {/* Overlay Gradient for Text Readability */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-slate-950/10" />
                  </div>

                  <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-8">
                    {/* Top Badge */}
                    <div className="flex justify-end">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold tracking-wider text-white uppercase shadow-lg backdrop-blur-md">
                        <CheckCircle2 size={14} className="text-[#FFB23E]" />
                        {activeTab.resultBadge}
                      </span>
                    </div>

                    {/* Bottom Content */}
                    <div className="mt-auto">
                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-5 font-display text-3xl leading-[1.1] font-bold tracking-tight text-white drop-shadow-lg sm:text-4xl"
                      >
                        {activeTab.resultTitle}
                      </motion.h3>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="rounded-2xl border border-white/20 bg-white/10 p-4 shadow-xl backdrop-blur-md transition-all duration-500 sm:p-5"
                      >
                        <div className="mb-1.5 flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-white/70 uppercase">
                          What your team sees
                        </div>
                        <div className="text-[14px] leading-relaxed font-bold text-white sm:text-[15px]">
                          {activeTab.resultDesc}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Right Panel: What happens */}
                <div className="relative order-1 flex flex-col justify-center overflow-hidden rounded-[32px] border border-slate-200/60 bg-white p-6 shadow-xl shadow-slate-200/40 sm:p-8 lg:order-2">
                  <div className="relative z-10 space-y-3 sm:space-y-4">
                    {activeTab.steps.map((step, idx) => (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + idx * 0.1, type: "spring", stiffness: 100 }}
                        key={idx}
                        className="group/step relative flex cursor-default items-center gap-4 rounded-[20px] border border-slate-200/50 bg-slate-50/80 p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#FF6A55]/30 hover:bg-white hover:shadow-[0_12px_32px_rgba(255,106,85,0.08)] sm:gap-5 sm:p-5"
                      >
                        <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-[0_4px_12px_rgba(15,23,42,0.04)] ring-1 ring-slate-100 transition-transform duration-300 group-hover/step:scale-110 group-hover/step:ring-[#FF6A55]/20">
                          <span className="bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text font-display text-xl font-black text-transparent transition-all group-hover/step:from-[#FF6A55] group-hover/step:to-[#FFB23E]">
                            {idx + 1}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="mb-1 text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase transition-colors group-hover/step:text-[#FF6A55]">
                            Step 0{idx + 1}
                          </div>
                          <div className="text-[14px] leading-snug font-bold text-slate-700 transition-colors group-hover/step:text-slate-900 sm:text-[15px]">
                            {step}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
