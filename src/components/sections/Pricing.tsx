"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Check,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Gift,
  Clock,
  Crown,
  Building2,
  User,
} from "lucide-react";

import { plans } from "@/content/plans";
import Link from "next/link";

export function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="relative overflow-hidden bg-[#FAFAF8] py-20 md:py-28">
      {/* Subtle noise */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      />
      <div className="pointer-events-none absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full bg-[#FF6A55]/5 blur-[150px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-0 h-[600px] w-[600px] rounded-full bg-[#FFB23E]/5 blur-[150px]" />

      <div className="relative z-10 container-content">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FF6A55]/20 bg-[#FF6A55]/10 px-3.5 py-1.5"
          >
            <Gift className="h-3.5 w-3.5 text-[#FF6A55]" />
            <span className="text-[11px] font-bold tracking-wider text-[#FF6A55] uppercase">
              Founding offer · first 2 months free on Essentials
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-5 font-display text-4xl leading-[1.1] font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
          >
            Your whole front office -{" "}
            <span className="bg-gradient-to-r from-[#FF6A55] to-[#FFB23E] bg-clip-text text-transparent">
              three ways
            </span>{" "}
            to get it.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-500"
          >
            All plans include insurance verification, paperless intake, OpenDental integration, and
            unlimited concurrent calls.
          </motion.p>

          {/* Toggle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-4 inline-flex items-center rounded-full border border-slate-200/60 bg-slate-100/80 p-1.5 shadow-inner"
          >
            <button
              onClick={() => setAnnual(false)}
              className={`relative rounded-full px-6 py-2.5 text-[15px] font-bold transition-all duration-300 ease-out ${!annual ? "bg-white text-slate-900 shadow-[0_2px_8px_rgba(0,0,0,0.08)]" : "text-slate-500 hover:text-slate-700"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`relative flex items-center gap-2.5 rounded-full px-6 py-2.5 text-[15px] font-bold transition-all duration-300 ease-out ${annual ? "bg-white text-slate-900 shadow-[0_2px_8px_rgba(0,0,0,0.08)]" : "text-slate-500 hover:text-slate-700"}`}
            >
              Annual
              {/* Premium Inline Badge */}
              <span
                className={`rounded-md px-2 py-0.5 text-[11px] font-black tracking-wide uppercase transition-all duration-300 ${annual ? "bg-[#FF6A55]/10 text-[#FF6A55]" : "bg-slate-200/70 text-slate-500"}`}
              >
                Save 15%
              </span>
            </button>
          </motion.div>
        </div>

        {/* ═══════════ PRICING CARDS ═══════════ */}
        <div className="mx-auto grid max-w-7xl items-stretch gap-6 lg:grid-cols-12">
          {/* ─── Essentials Card ─── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="group relative lg:col-span-4"
          >
            <div className="relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-lg shadow-slate-200/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60">
              {/* Subtle corner accent */}
              <div className="pointer-events-none absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl from-[#16C4B3]/8 to-transparent" />

              {/* Tier label */}
              <div className="mb-4 font-mono text-[10px] font-bold tracking-[0.3em] text-[#FF6A55] uppercase">
                Tier 01
              </div>

              {/* Header */}
              <div className="mb-6 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100">
                    <User className="h-5 w-5 text-slate-500" />
                  </div>
                  <div>
                    <div className="font-display text-xl font-bold text-slate-900">Essentials</div>
                    <div className="text-xs font-medium text-slate-400">Solo practices</div>
                  </div>
                </div>
              </div>

              <p className="mb-6 text-sm leading-relaxed text-slate-500">{plans[0].desc}</p>

              {/* Price */}
              <div className="mb-2">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display text-5xl font-bold tracking-tight text-slate-900">
                    ${annual ? plans[0].annualPrice : plans[0].monthlyPrice}
                  </span>
                  <span className="text-sm font-medium text-slate-400">/ month</span>
                </div>
                <div className="mt-1 h-5">
                  {annual && (
                    <span className="text-xs font-bold text-[#16C4B3]">
                      Billed annually · save ${plans[0].savings}/yr
                    </span>
                  )}
                </div>
              </div>

              {/* Free badge */}
              <div className="mb-6">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#16C4B3]/10 px-2.5 py-1 text-[11px] font-bold text-[#0E8C80]">
                  <Gift className="h-3 w-3" /> First 2 months free
                </span>
              </div>

              {/* CTA */}
              <Link
                data-cta="book_demo"
                data-position="pricing_essentials"
                href="/book-a-demo"
                className="mb-8 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3.5 text-sm font-bold text-white transition-all hover:bg-slate-800 active:scale-[0.97]"
              >
                Book a 20-min demo
                <ArrowRight className="h-4 w-4" />
              </Link>

              {/* Divider with label */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-100" />
                </div>
                <div className="relative flex justify-start">
                  <span className="bg-white pr-3 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                    What's included
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3.5">
                {plans[0].features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <div className="mt-0.5 flex h-4.5 w-4.5 flex-shrink-0 items-center justify-center rounded-full bg-[#16C4B3]/10">
                      <Check className="h-3 w-3 text-[#16C4B3]" />
                    </div>
                    <span className="text-[13px] leading-snug font-medium text-slate-600">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* ─── Pro Card (Hero) ─── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="relative lg:col-span-4"
          >
            {/* Outer glow ring */}
            <div className="pointer-events-none absolute -inset-px rounded-[2.1rem] bg-gradient-to-b from-[#FF6A55]/60 via-[#FF6A55]/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="relative flex h-full flex-col overflow-hidden rounded-[2rem] shadow-2xl shadow-[#FF6A55]/15 transition-all duration-500 hover:-translate-y-1">
              {/* Dark card background with gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#0F1923] via-[#0B1219] to-[#080D12]" />

              {/* Decorative glow orbs */}
              <div className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-[#FF6A55]/20 blur-[80px]" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-[#FFB23E]/10 blur-[80px]" />

              {/* Subtle grid lines */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              {/* Most Chosen Pill */}
              <div className="absolute -top-0 left-1/2 z-20 -translate-x-1/2 translate-y-0">
                <div className="relative flex items-center gap-1.5 rounded-b-2xl bg-gradient-to-r from-[#FF6A55] to-[#E54830] px-5 py-2 text-[10px] font-bold tracking-widest text-white uppercase shadow-lg shadow-[#FF6A55]/40">
                  <Sparkles className="h-3 w-3" />
                  Most Chosen
                </div>
              </div>

              <div className="relative z-10 flex flex-1 flex-col p-8 pt-12">
                {/* Tier label */}
                <div className="mb-4 font-mono text-[10px] font-bold tracking-[0.3em] text-[#FFB23E] uppercase">
                  Tier 02
                </div>

                {/* Header */}
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md">
                    <Crown className="h-5 w-5 text-[#FFB23E]" />
                  </div>
                  <div>
                    <div className="font-display text-xl font-bold text-white">Pro</div>
                    <div className="text-xs font-medium text-white/40">Growing groups</div>
                  </div>
                </div>

                <p className="mb-6 text-sm leading-relaxed text-white/50">{plans[1].desc}</p>

                {/* Price */}
                <div className="mb-2">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display text-5xl font-bold tracking-tight text-white">
                      ${annual ? plans[1].annualPrice : plans[1].monthlyPrice}
                    </span>
                    <span className="text-sm font-medium text-white/30">/ month</span>
                  </div>
                  <div className="mt-1 h-5">
                    {annual && (
                      <span className="text-xs font-bold text-[#FFB23E]">
                        Billed annually · save ${plans[1].savings}/yr
                      </span>
                    )}
                  </div>
                </div>

                {/* Spacer keeps this card's CTA aligned with Essentials, which
                    is the only tier carrying the free-months badge. */}
                <div className="mb-6 h-[26px]" />

                {/* CTA */}
                <Link
                  data-cta="book_demo"
                  data-position="pricing_pro"
                  href="/book-a-demo"
                  className="mb-8 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FF6A55] to-[#E54830] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#FF6A55]/30 transition-all hover:brightness-110 active:scale-[0.97]"
                >
                  Book a 20-min demo
                  <ArrowRight className="h-4 w-4" />
                </Link>

                {/* Divider with label */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-start">
                    <span
                      className="bg-transparent pr-3 text-[10px] font-bold tracking-widest text-white/30 uppercase"
                      style={{
                        backgroundColor: "transparent",
                        textShadow: "0 0 20px rgba(11,18,25,1), 0 0 40px rgba(11,18,25,1)",
                      }}
                    >
                      Everything in Essentials, plus
                    </span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3.5">
                  {plans[1].features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="mt-0.5 flex h-4.5 w-4.5 flex-shrink-0 items-center justify-center rounded-full bg-[#16C4B3]/15">
                        <Check className="h-3 w-3 text-[#16C4B3]" />
                      </div>
                      <span className="text-[13px] leading-snug font-medium text-white/60">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* ─── Enterprise Card ─── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="group relative lg:col-span-4"
          >
            <div className="relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-lg shadow-slate-200/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60">
              {/* Subtle corner accent */}
              <div className="pointer-events-none absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl from-[#FFB23E]/10 to-transparent" />

              {/* Tier label */}
              <div className="mb-4 font-mono text-[10px] font-bold tracking-[0.3em] text-[#FF6A55] uppercase">
                Tier 03
              </div>

              {/* Header */}
              <div className="mb-6 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100">
                    <Building2 className="h-5 w-5 text-slate-500" />
                  </div>
                  <div>
                    <div className="font-display text-xl font-bold text-slate-900">Enterprise</div>
                    <div className="text-xs font-medium text-slate-400">Multi-location</div>
                  </div>
                </div>
              </div>

              <p className="mb-6 text-sm leading-relaxed text-slate-500">{plans[2].desc}</p>

              {/* Price */}
              <div className="mb-2">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display text-5xl font-bold tracking-tight text-slate-900">
                    {plans[2].customLabel}
                  </span>
                  <span className="text-sm font-medium text-slate-400">/ location / mo</span>
                </div>
                <div className="mt-1 h-5">
                  <span className="text-xs font-bold text-[#FFB23E]">{plans[2].customNote}</span>
                </div>
              </div>

              {/* Spacer keeps this card's CTA aligned with Essentials, which
                  is the only tier carrying the free-months badge. */}
              <div className="mb-6 h-6.5" />

              {/* CTA */}
              <Link
                data-cta="book_demo"
                data-position="pricing_enterprise"
                href="/book-a-demo"
                className="mb-8 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3.5 text-sm font-bold text-white transition-all hover:bg-slate-800 active:scale-[0.97]"
              >
                Book a 20-min demo
                <ArrowRight className="h-4 w-4" />
              </Link>

              {/* Divider with label */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-100" />
                </div>
                <div className="relative flex justify-start">
                  <span className="bg-white pr-3 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                    Everything in Pro, plus
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3.5">
                {plans[2].features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <div className="mt-0.5 flex h-4.5 w-4.5 flex-shrink-0 items-center justify-center rounded-full bg-[#FFB23E]/10">
                      <Check className="h-3 w-3 text-[#FFB23E]" />
                    </div>
                    <span className="text-[13px] leading-snug font-medium text-slate-600">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Bottom trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 flex justify-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-x-8 gap-y-4 rounded-full border border-slate-200/60 bg-white/60 px-8 py-4 shadow-sm backdrop-blur-md">
            {[
              { text: "No setup fee", icon: Zap },
              { text: "Cancel anytime", icon: Clock },
              { text: "30-day money-back guarantee", icon: Shield },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 text-[14px] font-semibold text-slate-700"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#16C4B3]/15">
                  <item.icon className="h-4 w-4 text-[#0E8C80]" />
                </div>
                {item.text}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
