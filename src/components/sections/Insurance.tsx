"use client";

import { motion } from "motion/react";
import { ShieldCheck, CheckCircle2 } from "lucide-react";
import Image from "next/image";

const steps = [
  "Eligibility checked automatically",
  "“What's covered?” answered in the conversation",
  "Coverage confirmed before the visit",
  "Insurance captured at intake",
  "Repeat insurance questions off your team's plate",
];

export function Insurance() {
  return (
    <section id="insurance" className="bg-[#FDFBF7] py-20 md:py-28">
      <div className="mx-auto grid w-full max-w-[1440px] items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8">
        {/* Left: Content */}
        <div>
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FF6A55]/20 bg-[#FF6A55]/5 px-3 py-1.5 text-mono text-[11px] font-bold tracking-[0.18em] text-[#FF6A55] uppercase shadow-sm">
            <ShieldCheck size={14} /> Insurance, handled
          </span>
          <h2 className="mb-6 font-display text-4xl leading-[1.1] font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            We take care of your insurance verification.
          </h2>
          <div className="mb-10 max-w-2xl space-y-4 text-[17px] leading-relaxed font-medium text-slate-600">
            <p>
              The same insurance and coverage questions your team answers fifty times a day -
              handled right in the conversation. Solara checks eligibility, answers “what's
              covered,” and captures insurance at intake.
            </p>
            <p>
              So coverage is confirmed before the patient sits down - fewer billing surprises,
              faster check-ins, and a front desk that isn't stuck on hold with carriers.
            </p>
          </div>

          <ul className="mb-4 space-y-4">
            {steps.map((label, i) => (
              <motion.li
                key={label}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex items-start gap-3"
              >
                <div className="mt-1 flex shrink-0 items-center justify-center text-[#16C4B3]">
                  <CheckCircle2 size={20} strokeWidth={2.5} />
                </div>
                <p className="text-[16px] font-medium text-slate-700 sm:text-[17px]">{label}</p>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Right: Image & Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[32px] border border-slate-200/60 bg-white p-4 shadow-[0_32px_64px_rgba(0,0,0,0.06)] sm:p-5"
        >
          <div className="relative mb-5 h-72 overflow-hidden rounded-[24px] sm:h-96">
            <Image
              src="/images/insurance_reception.png"
              alt="Dental office manager working at a modern front desk"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            {/* Soft gradient overlay for text readability */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent"></div>

            {/* Floating Tag over Image */}
            <div className="absolute right-4 bottom-4 left-4 rounded-[20px] bg-white/95 p-4 shadow-xl backdrop-blur">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] font-bold tracking-wider text-[#FF6A55] uppercase">
                    Delta Dental PPO
                  </div>
                  <div className="mt-1 text-[14px] font-bold text-slate-900 sm:text-[15px]">
                    Active coverage confirmed
                  </div>
                </div>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[#16C4B3]/10">
                  <ShieldCheck className="h-5 w-5 text-[#16C4B3]" strokeWidth={2.5} />
                </span>
              </div>
            </div>
          </div>

          <div className="mb-2 flex items-center gap-4 px-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border border-[#FF6A55]/10 bg-[#FFF9F2]">
              <CheckCircle2 className="h-6 w-6 text-[#FF6A55]" strokeWidth={2.5} />
            </span>
            <div>
              <div className="text-[15px] font-bold text-slate-900 sm:text-[16px]">
                Coverage, before the chair
              </div>
              <div className="text-[13px] font-medium text-slate-500">
                Captured and confirmed at intake
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
