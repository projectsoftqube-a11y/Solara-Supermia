"use client";

import { motion } from "motion/react";
import { Sparkles, Gift, Clock, ArrowRight, Check } from "lucide-react";
import Link from "next/link";

export function FoundingOffer() {
  return (
    <section
      id="founding"
      className="relative overflow-hidden bg-[#0A0A0A] py-20 text-white md:py-28"
    >
      {/* Dynamic Background Effects */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      />
      <div className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-full -translate-x-1/2 bg-gradient-to-b from-[#FF6A55]/15 to-transparent blur-[120px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[600px] w-[600px] bg-gradient-to-tl from-[#FFB23E]/10 to-transparent blur-[120px]" />

      {/* Top Border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 container-content">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-center text-center lg:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#FFB23E]" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-slate-300 uppercase">
              Founding Cohort
            </span>
            <span className="ml-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-white">
              19 of 25 left
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-6 font-display text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Your first <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#FFB23E] via-[#FF6A55] to-[#E54830] bg-clip-text text-transparent">
              2 months
            </span>{" "}
            are on us.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl text-base leading-relaxed font-medium text-slate-400 sm:text-lg"
          >
            Join the founding cohort and run Essentials free for two months. Use the time to launch
            Solara, test it on real calls, and watch the schedule fill before a monthly bill ever
            starts.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="mx-auto grid max-w-5xl gap-5 lg:grid-cols-12">
          {/* Main Pricing Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="group relative lg:col-span-5"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[#FF6A55]/20 to-transparent opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-100" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#111111] p-8 shadow-2xl">
              {/* Card internal glow */}
              <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#FF6A55]/20 blur-[60px]" />

              <div className="absolute top-0 right-0 flex h-24 w-24 items-start justify-end rounded-bl-3xl border-b border-l border-white/5 bg-white/5 p-5">
                <Gift className="h-6 w-6 text-[#FF6A55]" />
              </div>

              <div className="mt-2 mb-4 font-mono text-[10px] font-bold tracking-widest text-[#FFB23E] uppercase">
                Founding Offer
              </div>
              <div className="mb-2 font-display text-7xl leading-none font-bold tracking-tighter text-white lg:text-8xl">
                $0
              </div>
              <div className="mb-1 text-lg font-bold text-[#FF6A55]">for your first 2 months</div>
              <div className="mb-8 text-xs font-semibold text-slate-400">
                on the Essentials plan
              </div>

              <div className="mt-auto space-y-4 text-center">
                <div className="rounded-2xl border border-white/5 bg-white/5 p-3">
                  <p className="text-xs leading-relaxed font-medium text-slate-400">
                    Then your locked founding rate,
                    <br />
                    confirmed at onboarding
                  </p>
                </div>

                <Link
                  data-cta="book_demo"
                  data-position="founding_section"
                  href="/book-a-demo"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-base font-bold text-black shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all hover:scale-[1.02] hover:bg-slate-200 active:scale-[0.98]"
                >
                  Book a 20-min demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <div className="flex items-center justify-center gap-2 text-[11px] font-medium text-slate-500">
                  <Clock className="h-3.5 w-3.5" /> Cancel anytime · No setup fee
                </div>
              </div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="flex flex-col gap-5 lg:col-span-7">
            {/* Stats row */}
            <div className="grid gap-5 sm:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="rounded-2xl border border-white/10 bg-[#111111] p-5 transition-colors hover:border-white/20"
              >
                <div className="mb-1 font-display text-2xl font-bold text-white">$0</div>
                <div className="text-xs leading-relaxed font-medium text-slate-400">
                  monthly fee while you onboard
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="rounded-2xl border border-white/10 bg-[#111111] p-5 transition-colors hover:border-white/20"
              >
                <div className="mb-1 font-display text-2xl font-bold text-white">$2,500</div>
                <div className="text-xs leading-relaxed font-medium text-slate-400">
                  white-glove setup included
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="rounded-2xl border border-white/10 bg-[#111111] p-5 transition-colors hover:border-white/20"
              >
                <div className="mb-1 font-display text-2xl font-bold text-white">90 days</div>
                <div className="text-xs leading-relaxed font-medium text-slate-400">
                  to prove it works in clinic
                </div>
              </motion.div>
            </div>

            {/* Checklist */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="relative flex-1 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#1A1A1A] to-[#111111] p-6"
            >
              {/* Highlight flare */}
              <div className="pointer-events-none absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-[#FFB23E]/5 blur-[80px]" />

              <ul className="relative z-10 grid h-full content-center gap-4 sm:grid-cols-2 sm:gap-6">
                {[
                  "Run insurance, intake, booking, recall, notes, SEO, and Google Ads from day one",
                  "Founder-assisted setup tuned around your practice",
                  "Keep your locked founding rate after onboarding confirms your plan",
                  "No risk: 30-day money-back if it is not working",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#16C4B3]/20">
                      <Check className="h-3 w-3 text-[#16C4B3]" />
                    </div>
                    <span className="text-sm leading-relaxed font-medium text-slate-300">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
