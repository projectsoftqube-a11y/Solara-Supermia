import { motion } from "motion/react";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

const steps = [
  "Eligibility checked automatically",
  "“What's covered?” answered in the conversation",
  "Coverage confirmed before the visit",
  "Insurance captured at intake",
  "Repeat insurance questions off your team's plate"
];

export function Insurance() {
  return (
    <section id="insurance" className="py-20 md:py-28 bg-[#FDFBF7]">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1440px] grid items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
        
        {/* Left: Content */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FF6A55]/20 bg-[#FF6A55]/5 px-3 py-1.5 text-mono text-[11px] uppercase tracking-[0.18em] text-[#FF6A55] mb-6 font-bold shadow-sm">
            <ShieldCheck size={14} /> Insurance, handled
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.1] text-slate-900 mb-6 tracking-tight">
            We take care of your insurance.
          </h2>
          <div className="text-[17px] text-slate-600 leading-relaxed mb-10 max-w-2xl font-medium space-y-4">
            <p>
              The same insurance and coverage questions your team answers fifty times a day - handled right in the conversation. Solara checks eligibility, answers “what's covered,” and captures insurance at intake.
            </p>
            <p>
              So coverage is confirmed before the patient sits down - fewer billing surprises, faster check-ins, and a front desk that isn't stuck on hold with carriers.
            </p>
          </div>

          <ul className="space-y-4 mb-4">
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
                <p className="text-[16px] sm:text-[17px] font-medium text-slate-700">{label}</p>
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
          className="relative rounded-[32px] border border-slate-200/60 bg-white p-4 sm:p-5 shadow-[0_32px_64px_rgba(0,0,0,0.06)]"
        >
          <div className="relative overflow-hidden rounded-[24px] h-72 sm:h-96 mb-5">
            <img 
              src="/images/insurance_reception.png" 
              alt="Medical reception" 
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105" 
            />
            {/* Soft gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent pointer-events-none"></div>
            
            {/* Floating Tag over Image */}
            <div className="absolute left-4 right-4 bottom-4 rounded-[20px] bg-white/95 backdrop-blur p-4 shadow-xl">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#FF6A55]">Delta Dental PPO</div>
                  <div className="mt-1 text-[14px] sm:text-[15px] font-bold text-slate-900">Active coverage confirmed</div>
                </div>
                <span className="h-11 w-11 rounded-[14px] bg-[#16C4B3]/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-5 w-5 text-[#16C4B3]" strokeWidth={2.5} />
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 px-3 mb-2">
            <span className="w-12 h-12 rounded-[16px] bg-[#FFF9F2] border border-[#FF6A55]/10 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6 text-[#FF6A55]" strokeWidth={2.5} />
            </span>
            <div>
              <div className="text-[15px] sm:text-[16px] font-bold text-slate-900">Coverage, before the chair</div>
              <div className="text-[13px] font-medium text-slate-500">Captured and confirmed at intake</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[20px] border border-slate-200/60 bg-[#FDFBF7] p-4 sm:p-5 transition-colors hover:bg-slate-50">
      <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400 mb-1.5">{label}</div>
      <div className="text-[14px] sm:text-[15px] font-medium text-slate-900">{value}</div>
    </div>
  );
}
