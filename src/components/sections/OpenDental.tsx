"use client";

import { motion } from "motion/react";
import { CheckCircle2, ArrowRightLeft, Database } from "lucide-react";

const features = [
  "Books it in OpenDental for you - no double entry, not a parallel schedule",
  "Patients, providers, operatories, and appointments stay in OpenDental",
  "Procedure codes, insurance, and revenue follow through automatically",
];

export function OpenDental() {
  return (
    <section id="opendental" className="relative overflow-hidden bg-[#FAF0DC] py-20 md:py-28">
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute top-0 right-0 h-[800px] w-[800px] translate-x-1/3 -translate-y-1/2 rounded-full bg-gradient-to-b from-white/40 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[600px] w-[600px] -translate-x-1/4 translate-y-1/3 rounded-full bg-[#FF6A55]/5 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FF6A55]/20 bg-[#FF6A55]/10 px-4 py-2 shadow-sm"
            >
              <Database className="h-4 w-4 text-[#FF6A55]" />
              <span className="text-sm font-bold tracking-wider text-[#FF6A55] uppercase">
                OpenDental Integration
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-6 font-display text-4xl leading-[1.1] font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
            >
              Bookings that land straight in <span className="text-[#FF6A55]">OpenDental</span>.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mb-10 text-lg leading-relaxed font-medium text-slate-600 sm:text-xl"
            >
              Works with OpenDental and your existing phone line. Solara checks provider and
              operatory availability, books the right service and duration, and writes back to
              OpenDental automatically. No double entry, no end-of-day reconciliation.
            </motion.p>

            <ul className="space-y-5 text-slate-700">
              {features.map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FF6A55]/10">
                    <CheckCircle2 className="h-4 w-4 text-[#FF6A55]" />
                  </div>
                  <span className="text-[16px] leading-relaxed font-semibold text-slate-800">
                    {feature}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Right UI Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Ambient Glow behind card */}
            <div className="pointer-events-none absolute inset-0 rounded-[40px] bg-[#FF6A55]/10 blur-[80px]" />

            <div className="relative overflow-hidden rounded-[32px] border border-slate-200/60 bg-white shadow-[0_32px_64px_rgba(15,23,42,0.06)]">
              {/* Card Header */}
              <div className="flex items-center justify-between bg-slate-900 px-8 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-800">
                    <Database className="h-4 w-4 text-[#FFB23E]" />
                  </div>
                  <div className="text-[15px] font-bold text-white">New appointment</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                  <span className="text-[13px] font-medium text-slate-300">Op 2 · Dr. Lin</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="space-y-1 p-8">
                {[
                  { label: "Patient", value: "M. Alvarez (New)", highlight: true },
                  { label: "Service", value: "New-patient cleaning · 60 min" },
                  { label: "Provider / Op", value: "Dr. Lin · Op 2" },
                  { label: "Date / Time", value: "Tue 12 May · 10:30 AM" },
                  { label: "Insurance", value: "Delta Dental PPO · verified", verified: true },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b border-slate-100 py-4 last:border-0"
                  >
                    <span className="text-[13px] font-bold tracking-wider text-slate-400 uppercase">
                      {row.label}
                    </span>
                    <span
                      className={`text-[15px] font-bold ${row.highlight ? "text-slate-900" : "text-slate-700"} flex items-center gap-2`}
                    >
                      {row.value}
                      {row.verified && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                    </span>
                  </div>
                ))}
              </div>

              {/* Card Footer Success State */}
              <div className="flex items-center justify-between border-t border-emerald-100 bg-emerald-50/80 px-8 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                    <ArrowRightLeft className="h-4 w-4 text-emerald-600" />
                  </div>
                  <span className="text-[14px] font-bold text-emerald-800">
                    Synced to OpenDental
                  </span>
                </div>
                <span className="text-[13px] font-medium text-emerald-600/80">10:31 AM</span>
              </div>
            </div>

            {/* Decorative Floating Elements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute -right-6 -bottom-6 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FAF0DC]">
                <CheckCircle2 className="h-5 w-5 text-[#FFB23E]" />
              </div>
              <div>
                <div className="mb-0.5 text-[12px] font-bold tracking-wider text-slate-400 uppercase">
                  Status
                </div>
                <div className="text-[14px] font-bold text-slate-900">Zero double entry</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
