"use client";

import { motion } from "motion/react";
import { CheckCircle2, XCircle, Minus, Calendar, ChartColumn, ArrowRight } from "lucide-react";

import { comparisonRows as features } from "@/content/comparison";
import Link from "next/link";

function Cell({ v }: { v: string }) {
  if (v === "yes") {
    return (
      <div className="flex items-center justify-center gap-2">
        <CheckCircle2 className="h-5 w-5 text-[#16C4B3]" />
      </div>
    );
  }
  if (v === "SEO + Google Ads") {
    return (
      <div className="flex items-center justify-center gap-2">
        <CheckCircle2 className="h-5 w-5 text-[#16C4B3]" />
        <span className="hidden text-[11px] leading-tight font-bold text-[#FF6A55] lg:inline">
          {v}
        </span>
      </div>
    );
  }
  if (v === "no") {
    return (
      <div className="flex items-center justify-center">
        <XCircle className="h-5 w-5 text-rose-300" />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center">
      <span className="inline-flex items-center gap-1 text-amber-600">
        <Minus className="h-4 w-4" />
        <span className="hidden text-[11px] font-medium sm:inline">Limited</span>
      </span>
    </div>
  );
}

export function Comparison() {
  return (
    <section
      id="compare"
      className="relative overflow-hidden bg-gradient-to-b from-[#FFF9F2] via-[#FAF0DC]/40 to-[#FFF9F2] py-20 md:py-28"
    >
      <div className="pointer-events-none absolute -top-40 -right-32 h-[32rem] w-[32rem] rounded-full bg-[#FF6A55]/8 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-[32rem] w-[32rem] rounded-full bg-[#FFB23E]/8 blur-[120px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-12">
        <div className="mx-auto mb-16 max-w-4xl text-center sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FF6A55]/20 bg-[#FF6A55]/10 px-4 py-2 shadow-sm"
          >
            <ChartColumn className="h-4 w-4 text-[#FF6A55]" />
            <span className="text-sm font-bold tracking-wider text-[#FF6A55] uppercase">
              Compare
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-6 font-display text-4xl leading-[1.1] font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
          >
            A full front office <span className="px-2 font-medium text-slate-300 italic">vs.</span>{" "}
            a receptionist <span className="px-2 font-medium text-slate-300 italic">vs.</span> a
            chatbot
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-3xl text-lg leading-relaxed font-medium text-slate-600 sm:text-xl"
          >
            Where a complete AI front office fits next to the alternatives most clinics already use.
          </motion.p>
        </div>

        {/* Desktop Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto hidden w-full max-w-360 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 md:block"
        >
          <div className="grid grid-cols-[1.7fr_1fr_1fr_1.2fr] bg-slate-900 text-white">
            <div className="px-5 py-4 text-sm font-semibold">Capability</div>
            <div className="px-3 py-4 text-center text-sm font-semibold">Front desk</div>
            <div className="px-3 py-4 text-center text-sm font-semibold">Basic chatbot</div>
            <div className="bg-gradient-to-br from-[#FF6A55] to-[#143138] px-3 py-4 text-center text-sm font-semibold">
              Solara
            </div>
          </div>

          {features.map((row, i) => (
            <div
              key={row.name}
              className={`grid grid-cols-[1.7fr_1fr_1fr_1.2fr] items-stretch border-t border-slate-100 transition-colors hover:bg-[#FAF0DC]/40 ${i % 2 !== 0 ? "bg-slate-50/40" : ""}`}
            >
              <div className="flex items-center gap-3 px-5 py-3.5">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 ring-1 ring-slate-200">
                  <row.icon className="h-4 w-4 text-slate-600" />
                </span>
                <span className="text-sm leading-snug font-semibold text-slate-900">
                  {row.name}
                </span>
              </div>
              <div className="flex items-center justify-center px-3 py-3.5">
                <Cell v={row.fd} />
              </div>
              <div className="flex items-center justify-center px-3 py-3.5">
                <Cell v={row.bot} />
              </div>
              <div className="flex items-center justify-center gap-2 border-l-2 border-[#FF6A55]/30 bg-[#FF6A55]/5 px-3 py-3.5">
                <Cell v={row.solara} />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Mobile Cards */}
        <div className="mx-auto mt-8 max-w-xl space-y-3 md:hidden">
          {features.map((row) => (
            <motion.div
              key={row.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 ring-1 ring-slate-200">
                  <row.icon className="h-4 w-4 text-slate-600" />
                </span>
                <span className="text-sm leading-snug font-bold text-slate-900">{row.name}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg bg-slate-50 py-2">
                  <div className="mb-1 text-[10px] tracking-wider text-slate-400 uppercase">
                    Front desk
                  </div>
                  <div className="flex justify-center">
                    <Cell v={row.fd} />
                  </div>
                </div>
                <div className="rounded-lg bg-slate-50 py-2">
                  <div className="mb-1 text-[10px] tracking-wider text-slate-400 uppercase">
                    Chatbot
                  </div>
                  <div className="flex justify-center">
                    <Cell v={row.bot} />
                  </div>
                </div>
                <div className="rounded-lg bg-[#FF6A55]/10 py-2">
                  <div className="mb-1 text-[10px] font-bold tracking-wider text-[#FF6A55] uppercase">
                    Solara
                  </div>
                  <div className="flex justify-center">
                    <Cell v={row.solara} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Premium 13/13 Capabilities Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="group relative mx-auto mt-12 w-full max-w-360 sm:mt-16"
        >
          {/* Animated gradient glow behind the card */}
          <div className="absolute -inset-[1px] rounded-[34px] bg-gradient-to-r from-[#FF6A55]/40 via-[#FFB23E]/40 to-[#FF6A55]/40 opacity-50 blur-sm transition-opacity duration-700 group-hover:opacity-100" />

          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0B0F17] shadow-2xl">
            {/* Inner background glow effects */}
            <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-gradient-to-bl from-[#FF6A55]/20 to-transparent blur-[80px]" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-[#FFB23E]/15 to-transparent blur-[80px]" />

            {/* Noise texture overlay for premium feel */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
              }}
            />

            <div className="relative grid items-center gap-8 px-8 py-8 sm:px-10 sm:py-10 lg:grid-cols-[auto_1fr_auto]">
              {/* Left side: The big metric */}
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="absolute inset-0 animate-pulse rounded-2xl bg-[#FF6A55] opacity-40 blur-lg" />
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-b from-[#FF6A55] to-[#E54830] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] ring-1 ring-white/10">
                    <CheckCircle2 className="h-8 w-8 text-white drop-shadow-md" />
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="bg-gradient-to-b from-white to-slate-400 bg-clip-text font-display text-4xl leading-none font-bold tracking-tight text-transparent sm:text-5xl">
                      13 / 13
                    </span>
                  </div>
                  <div className="mt-2 text-xs font-bold tracking-[0.15em] text-[#FFB23E] uppercase sm:text-sm">
                    Capabilities, run by Solara Dental AI
                  </div>
                </div>
              </div>

              {/* Middle: The pitch */}
              <p className="mx-auto max-w-2xl text-left text-base leading-relaxed font-medium text-slate-300 sm:text-lg lg:text-center">
                The only solution that <span className="text-white">verifies insurance</span>,{" "}
                <span className="text-white">books into your real schedule</span>, and{" "}
                <span className="text-white">runs the follow-up</span> — without hiring a second
                receptionist.
              </p>

              {/* Right side: Premium CTA */}
              <div className="flex justify-start lg:justify-end">
                <Link
                  data-cta="book_demo"
                  data-position="comparison"
                  className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-white px-8 py-4 text-base font-bold text-slate-900 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] active:scale-[0.98]"
                  href="/book-a-demo"
                >
                  <Calendar className="h-5 w-5 text-[#FF6A55]" />
                  <span className="relative">Request your white-glove call</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 transition-transform group-hover:translate-x-1">
                    <ArrowRight className="h-4 w-4 text-slate-900" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
