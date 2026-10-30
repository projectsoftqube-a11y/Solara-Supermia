"use client";

import { motion } from "motion/react";
import { Sparkles, Calendar, ArrowRight, Gift, Zap, Shield } from "lucide-react";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#060F14] py-20 md:py-28">
      {/* Immersive edge-to-edge background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#173B42] via-[#0A1A1F] to-[#040A0C]" />

      {/* Massive cinematic glowing orbs pushed to the far edges of the screen */}
      <motion.div
        animate={{ opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute top-1/2 left-0 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6A55] mix-blend-screen blur-[200px]"
      />
      <motion.div
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="pointer-events-none absolute top-1/2 right-0 h-[1000px] w-[1000px] translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFB23E] mix-blend-screen blur-[200px]"
      />

      {/* Subtle architectural grid spanning the entire width */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Content wrapper with NO restrictive boxes - stretches edge to edge */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1920px] flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-12">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-12 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold tracking-[0.25em] text-[#FFB23E] uppercase shadow-2xl backdrop-blur-md sm:text-base"
        >
          <Sparkles className="h-5 w-5" />
          The complete AI front office
        </motion.div>

        {/* Massive Edge-to-Edge Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-10 max-w-[1600px] font-display text-5xl leading-[1.05] font-bold tracking-tight text-white sm:text-7xl lg:text-[7rem]"
        >
          Put your whole front desk on{" "}
          <span className="relative mt-2 inline-block sm:mt-0">
            <span className="bg-gradient-to-r from-[#FF6A55] to-[#FFB23E] bg-clip-text text-transparent italic">
              autopilot.
            </span>
            <svg
              className="absolute -bottom-4 left-0 h-5 w-full text-[#FF6A55]/60"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
            >
              <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="3" />
            </svg>
          </span>
        </motion.h2>

        {/* Subheadline scaled up */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mx-auto mb-16 max-w-4xl text-xl leading-relaxed font-light text-slate-300 sm:text-2xl lg:text-3xl"
        >
          See exactly how Solara runs your front office: insurance, intake, booking, recall, notes,
          SEO, and Google Ads automatically.{" "}
          <span className="font-medium text-white">
            No commitment, no technical setup required.
          </span>
        </motion.p>

        {/* CTA Button scaled up */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex flex-col items-center justify-center gap-10"
        >
          <Link
            data-cta="book_demo"
            data-position="final"
            href="/book-a-demo"
            className="group relative inline-flex items-center justify-center gap-4 rounded-[2rem] bg-[#FF6A55] px-12 py-6 text-xl font-bold text-white shadow-[0_0_80px_rgba(255,106,85,0.4)] transition-all hover:scale-105 hover:bg-[#ff7a68] active:scale-95 lg:text-2xl"
          >
            <Calendar className="h-7 w-7" />
            <span>Book a 20-min demo</span>
            <ArrowRight className="h-7 w-7 transition-transform group-hover:translate-x-2" />
          </Link>

          {/* Trust & Promos spread out horizontally */}
          <div className="mt-4 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-12">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-[#FFB23E]/20 bg-[#FFB23E]/10 px-6 py-3 text-base font-bold text-[#FFB23E] lg:text-lg">
              <Gift className="h-5 w-5" />
              First 2 months free on Essentials for founding clinics
            </span>
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-slate-300 lg:text-base">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 shadow-sm">
                <Zap className="h-4 w-4 text-slate-400" /> No setup fee
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 shadow-sm">
                <Shield className="h-4 w-4 text-slate-400" /> Cancel anytime
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
