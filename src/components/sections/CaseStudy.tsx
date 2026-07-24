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
    <section id="results" className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF6A55]/10 text-[#FF6A55] text-xs font-bold uppercase tracking-[0.2em] mb-6"
          >
            <Sparkles size={14} /> By invitation
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-6 leading-[1.08] tracking-tight"
          >
            We're taking 25 practices. Personally.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 leading-relaxed font-medium max-w-2xl mx-auto"
          >
            Solara is rolling out to a hand-picked founding cohort — and every clinic in it gets founder-assisted, white-glove onboarding. Named results and case studies land on this page as our first practices go live. Early is the whole advantage. This is the room to be in.
          </motion.p>
        </div>

        {/* 3 Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {cohortCards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="relative bg-gradient-to-b from-slate-50/80 to-slate-100/50 rounded-[32px] p-8 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#FF6A55]/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#FF6A55]/10 flex items-center justify-center mb-6 text-[#FF6A55]">
                    <IconComponent size={24} />
                  </div>
                  <h3 className="text-xl font-display font-bold text-slate-900 mb-3">
                    {card.title}
                  </h3>
                  <p className="text-base text-slate-600 leading-relaxed font-medium">
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
            className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-slate-900 text-white font-bold text-[16px] hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 group"
          >
            Request your founding seat
            <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform text-[#FF6A55]" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}

