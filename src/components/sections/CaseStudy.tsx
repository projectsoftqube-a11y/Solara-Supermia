"use client";

import { motion } from "motion/react";
import { Sparkles, ArrowRight, ShieldCheck, FileCheck, Database } from "lucide-react";

const cohortCards = [
  {
    icon: ShieldCheck,
    title: "Insurance, before the chair",
    body: "Eligibility and coverage verified at intake, so the front desk stops sitting on hold with carriers.",
  },
  {
    icon: FileCheck,
    title: "Paperless intake, every visit",
    body: "Forms, history, and consents completed on the patient's phone before they arrive.",
  },
  {
    icon: Database,
    title: "Straight into OpenDental",
    body: "Bookings, reschedules, and transfers write back to your real schedule — no double entry.",
  },
];

export function CaseStudy() {
  return (
    <section id="results" className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mx-auto mb-16 max-w-3xl text-center sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#FF6A55]/10 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-[#FF6A55] uppercase"
          >
            <Sparkles size={14} /> By invitation
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-6 font-display text-4xl leading-[1.08] font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
          >
            We're taking 25 practices. Personally.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg leading-relaxed font-medium text-slate-600 sm:text-xl"
          >
            Solara is rolling out to a hand-picked founding cohort — and every clinic in it gets
            founder-assisted, white-glove onboarding. Named results and case studies land on this
            page as our first practices go live. Early is the whole advantage. This is the room to
            be in.
          </motion.p>
        </div>

        {/* 3 Cards */}
        <div className="mb-16 grid gap-8 md:grid-cols-3">
          {cohortCards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="relative flex flex-col justify-between rounded-[32px] border border-slate-200/80 bg-gradient-to-b from-slate-50/80 to-slate-100/50 p-8 shadow-sm transition-all hover:border-[#FF6A55]/30 hover:shadow-md"
              >
                <div>
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF6A55]/10 text-[#FF6A55]">
                    <IconComponent size={24} />
                  </div>
                  <h3 className="mb-3 font-display text-xl font-bold text-slate-900">
                    {card.title}
                  </h3>
                  <p className="text-base leading-relaxed font-medium text-slate-600">
                    {card.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <motion.a
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            href="/book-a-demo"
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-slate-900 px-10 py-5 text-[16px] font-bold text-white shadow-xl transition-all hover:-translate-y-1 hover:bg-slate-800 hover:shadow-2xl"
          >
            Request your founding seat
            <ArrowRight
              size={20}
              className="text-[#FF6A55] transition-transform group-hover:translate-x-1.5"
            />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
