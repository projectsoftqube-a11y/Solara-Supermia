"use client";

import { motion } from "motion/react";
import {
  ShieldCheck,
  FileSignature,
  CalendarCheck,
  Sparkles,
  PhoneMissed,
  PhoneCall,
  ClipboardX,
  ClipboardCheck,
  ShieldAlert,
  UserMinus,
  UserCheck,
  SearchX,
  TrendingUp,
  ArrowRight,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const blocks = [
  {
    icon: ShieldCheck,
    title: "Insurance ready",
    body: "Verified before the chair is set. No paperwork ambush at check-in.",
    image: "/images/automation_insurance.png",
  },
  {
    icon: FileSignature,
    title: "Forms complete",
    body: "Intake, history, consents — signed digitally before arrival.",
    image: "/images/automation_forms.png",
  },
  {
    icon: CalendarCheck,
    title: "Schedule filled",
    body: "Recall and overflow handled by Solara, 24/7.",
    image: "/images/automation_schedule.png",
  },
];

const oldWayCards = [
  {
    icon: PhoneMissed,
    text: "Calls slip to voicemail the moment it gets busy",
    rotate: "-rotate-2",
    margin: "-ml-2 sm:-ml-6 mr-2 sm:mr-6",
    delay: 0.1,
  },
  {
    icon: ClipboardX,
    text: "Patients hunched over clipboards in the waiting room",
    rotate: "rotate-1",
    margin: "ml-4 sm:ml-8 -mr-4 sm:-mr-8",
    delay: 0.2,
  },
  {
    icon: ShieldAlert,
    text: "Staff on hold with carriers instead of with patients",
    rotate: "-rotate-1",
    margin: "-ml-1 sm:-ml-4 mr-1 sm:mr-4",
    delay: 0.3,
  },
  {
    icon: UserMinus,
    text: "No-shows leave chairs — and revenue — sitting empty",
    rotate: "rotate-2",
    margin: "ml-2 sm:ml-6 -mr-2 sm:-mr-6",
    delay: 0.4,
  },
  {
    icon: SearchX,
    text: 'New patients search "dentist near me" and find someone else',
    rotate: "-rotate-1",
    margin: "-ml-3 sm:-ml-8 mr-3 sm:mr-8",
    delay: 0.5,
  },
];

const newWayCards = [
  {
    icon: PhoneCall,
    text: "Every call answered and booked, day or night",
    delay: 0.1,
  },
  {
    icon: ClipboardCheck,
    text: "Forms filled on the patient's phone before they arrive",
    delay: 0.2,
  },
  {
    icon: ShieldCheck,
    text: "Coverage verified before they sit down",
    delay: 0.3,
  },
  {
    icon: UserCheck,
    text: "Open slots backfilled from your own recall list",
    delay: 0.4,
  },
  {
    icon: TrendingUp,
    text: "You're the first name they find on Google",
    delay: 0.5,
  },
];

export function Automation() {
  return (
    <section id="automation" className="bg-[#FDFBF7] py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center sm:mb-20">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FF6A55]/20 bg-[#FF6A55]/5 px-3 py-1.5 text-[11px] font-bold tracking-[0.18em] text-[#FF6A55] uppercase shadow-sm">
            <Sparkles size={14} /> Automation
          </span>
          <h2 className="mb-6 font-display text-4xl leading-[1.1] font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            No clipboards. No paper.
            <br />
            <span className="text-slate-500">No chasing.</span>
          </h2>
          <p className="text-lg leading-relaxed font-medium text-slate-600 sm:text-xl">
            Solara doesn't help your team work harder. It takes the work off the table entirely.
          </p>
        </div>

        {/* Cards */}
        <div className="grid w-full gap-4 sm:gap-6 md:grid-cols-3 lg:gap-8">
          {blocks.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="group relative h-64 overflow-hidden rounded-[24px] border border-slate-200/50 shadow-sm sm:h-72"
            >
              <Image
                src={b.image}
                alt={b.title}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent" />

              <div className="absolute right-5 bottom-5 left-5">
                <h3 className="mb-2 text-xl leading-tight font-bold text-white sm:text-2xl">
                  {b.title}
                </h3>
                <p className="text-[14px] leading-relaxed font-medium text-white/80">{b.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Before and After Comparison (The "Night and Day" concept) */}
        <div className="relative mx-auto mt-32 w-full sm:mt-40">
          <div className="mb-16 text-center sm:mb-20">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E8E5D8] bg-[#FAF0DC] px-3 py-1.5 text-[11px] font-bold tracking-[0.18em] text-[#FF6A55] uppercase shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Night and Day
            </span>
            <h2 className="mb-6 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Your clinic today,
              <br className="sm:hidden" /> <span className="text-[#FF6A55]">vs. with Solara</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg font-medium text-slate-600 sm:text-xl">
              Same front desk. Same patients. None of the chaos.
            </p>
          </div>

          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            {/* The Old Way (Chaotic Side) */}
            <div className="relative overflow-hidden rounded-[40px] border border-slate-200/80 bg-slate-100/50 p-8 shadow-inner sm:p-12">
              <div className="absolute top-0 left-0 h-1.5 w-full bg-slate-300" />

              <div className="mb-10 flex items-center justify-between">
                <h3 className="font-display text-2xl font-bold text-slate-400 sm:text-3xl">
                  The old way
                </h3>
                <span className="rounded-full bg-slate-200/80 px-3 py-1 text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                  Chaotic
                </span>
              </div>

              <div className="relative z-10 flex flex-col gap-4 py-4">
                {oldWayCards.map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20, rotate: 0 }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                      rotate:
                        card.rotate === "rotate-1"
                          ? 1
                          : card.rotate === "-rotate-1"
                            ? -1
                            : card.rotate === "rotate-2"
                              ? 2
                              : -2,
                    }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 0.6,
                      delay: card.delay,
                      type: "spring",
                      stiffness: 100,
                    }}
                    className={`flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-md sm:p-5 ${card.margin} cursor-default transition-all hover:z-20 hover:scale-105 hover:shadow-xl`}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-100 bg-slate-50">
                      <card.icon className="h-5 w-5 text-slate-400" />
                    </div>
                    <span className="text-[14px] leading-snug font-medium text-slate-500 sm:text-[15px]">
                      {card.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* With Solara (Organized Side) */}
            <div className="relative overflow-hidden rounded-[40px] border border-[#FF6A55]/20 bg-gradient-to-b from-white to-[#FFF4E8] p-8 shadow-[0_24px_64px_rgba(255,106,85,0.08)] sm:p-12">
              <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-[#FF6A55] to-[#FFB23E]" />

              <div className="pointer-events-none absolute top-0 right-0 h-[400px] w-[400px] translate-x-1/3 -translate-y-1/3 rounded-full bg-[#FF6A55] opacity-[0.03] blur-[100px]" />

              <div className="relative z-10 mb-10 flex items-center justify-between">
                <h3 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
                  With Solara
                </h3>
                <span className="flex items-center gap-1.5 rounded-full bg-[#FF6A55]/10 px-3 py-1 text-[10px] font-bold tracking-wider text-[#FF6A55] uppercase">
                  <Sparkles className="h-3 w-3" /> Calm
                </span>
              </div>

              <div className="relative z-10 flex flex-col gap-4">
                {newWayCards.map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: card.delay }}
                    className="group flex cursor-default items-center gap-4 rounded-2xl border border-[#FF6A55]/10 bg-white p-4 shadow-[0_8px_24px_rgba(255,106,85,0.04)] transition-all hover:-translate-y-0.5 hover:border-[#FF6A55]/30 hover:shadow-[0_16px_32px_rgba(255,106,85,0.08)] sm:p-5"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6A55] to-[#FFB23E] shadow-inner transition-transform duration-300 group-hover:scale-110">
                      <card.icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-[14px] leading-snug font-bold text-slate-800 sm:text-[15px]">
                      {card.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center sm:mt-24"
          >
            <Link
              href="/book-a-demo"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6A55] px-8 py-4 text-base font-bold text-white shadow-xl shadow-[#FF6A55]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#FF8569] hover:shadow-2xl hover:shadow-[#FF6A55]/30"
            >
              <Calendar className="h-5 w-5" />
              Book a 20-min demo
              <ArrowRight className="h-5 w-5" />
            </Link>

            <div className="mt-8 flex justify-center">
              <div className="group relative inline-flex flex-wrap items-center justify-center gap-3 overflow-hidden rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-colors hover:border-[#FF6A55]/30 sm:gap-5 sm:px-6 sm:py-3.5">
                <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-gradient-to-b from-[#FF6A55] to-[#FFB23E] transition-all group-hover:w-2"></div>

                <div className="flex items-center gap-2 text-[11px] font-black tracking-[0.15em] text-[#FF6A55] uppercase sm:text-[12px]">
                  <Sparkles className="h-3.5 w-3.5" /> First 2 months free on Essentials
                </div>

                <div className="hidden h-1.5 w-1.5 rounded-full bg-slate-200 sm:block"></div>

                <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] text-slate-500 uppercase sm:text-[12px]">
                  No setup fee
                </div>

                <div className="hidden h-1.5 w-1.5 rounded-full bg-slate-200 sm:block"></div>

                <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] text-slate-500 uppercase sm:text-[12px]">
                  Cancel anytime
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
