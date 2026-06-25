import { motion } from "motion/react";
import { CheckCircle2, ArrowRightLeft, Database } from "lucide-react";

const features = [
  "Books it in OpenDental for you - no double entry, not a parallel schedule",
  "Patients, providers, operatories, and appointments stay in OpenDental",
  "Procedure codes, insurance, and revenue follow through automatically"
];

export function OpenDental() {
  return (
    <section id="opendental" className="py-20 md:py-28 bg-[#FAF0DC] overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-white/40 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#FF6A55]/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1440px] relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6A55]/10 border border-[#FF6A55]/20 mb-6 shadow-sm"
            >
              <Database className="w-4 h-4 text-[#FF6A55]" />
              <span className="text-sm font-bold text-[#FF6A55] uppercase tracking-wider">OpenDental Integration</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-6 leading-[1.1] tracking-tight"
            >
              Bookings that land straight in <span className="text-[#FF6A55]">OpenDental</span>.
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-10 font-medium"
            >
              Works with OpenDental and your existing phone line. Solara checks provider and operatory availability, books the right service and duration, and writes back to OpenDental automatically. No double entry, no end-of-day reconciliation.
            </motion.p>
            
            <ul className="space-y-5 text-slate-700">
              {features.map((feature, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  className="flex items-start gap-4"
                >
                  <div className="w-6 h-6 rounded-full bg-[#FF6A55]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-[#FF6A55]" />
                  </div>
                  <span className="text-[16px] leading-relaxed font-semibold text-slate-800">{feature}</span>
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
            <div className="absolute inset-0 bg-[#FF6A55]/10 blur-[80px] rounded-[40px] pointer-events-none" />

            <div className="relative bg-white rounded-[32px] border border-slate-200/60 shadow-[0_32px_64px_rgba(15,23,42,0.06)] overflow-hidden">
              
              {/* Card Header */}
              <div className="bg-slate-900 px-8 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                    <Database className="w-4 h-4 text-[#FFB23E]" />
                  </div>
                  <div className="text-white text-[15px] font-bold">New appointment</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[13px] font-medium text-slate-300">Op 2 · Dr. Lin</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8 space-y-1">
                {[
                  { label: "Patient", value: "M. Alvarez (New)", highlight: true },
                  { label: "Service", value: "New-patient cleaning · 60 min" },
                  { label: "Provider / Op", value: "Dr. Lin · Op 2" },
                  { label: "Date / Time", value: "Tue 12 May · 10:30 AM" },
                  { label: "Insurance", value: "Delta Dental PPO · verified", verified: true }
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-slate-100 py-4 last:border-0">
                    <span className="text-[13px] font-bold uppercase tracking-wider text-slate-400">{row.label}</span>
                    <span className={`text-[15px] font-bold ${row.highlight ? 'text-slate-900' : 'text-slate-700'} flex items-center gap-2`}>
                      {row.value}
                      {row.verified && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                    </span>
                  </div>
                ))}
              </div>

              {/* Card Footer Success State */}
              <div className="bg-emerald-50/80 border-t border-emerald-100 px-8 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <ArrowRightLeft className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-[14px] text-emerald-800 font-bold">Synced to OpenDental</span>
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
              className="absolute -right-6 -bottom-6 bg-white rounded-2xl shadow-xl p-4 border border-slate-100 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-[#FAF0DC] flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-[#FFB23E]" />
              </div>
              <div>
                <div className="text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Status</div>
                <div className="text-[14px] font-bold text-slate-900">Zero double entry</div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
