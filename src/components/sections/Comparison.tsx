import { motion } from "motion/react";
import { CheckCircle2, XCircle, Minus, ShieldCheck, Clock, Database, ClipboardList, FileText, AlarmClock, CalendarCheck, Mail, MessageCircle, Calendar, ChartColumn, Search, Headphones, ArrowRight } from "lucide-react";

const features = [
  { name: "Verifies insurance", icon: ShieldCheck, fd: "limited", bot: "no", solara: "yes" },
  { name: "Answers every call 24/7", icon: Clock, fd: "no", bot: "limited", solara: "yes" },
  { name: "Books into OpenDental", icon: Database, fd: "limited", bot: "no", solara: "yes" },
  { name: "Sends & fills intake forms", icon: ClipboardList, fd: "limited", bot: "no", solara: "yes" },
  { name: "Writes visit notes", icon: FileText, fd: "limited", bot: "no", solara: "yes" },
  { name: "Recall & reactivation", icon: AlarmClock, fd: "limited", bot: "no", solara: "yes" },
  { name: "Fills cancellations & waitlist", icon: CalendarCheck, fd: "limited", bot: "no", solara: "yes" },
  { name: "Reminders & confirmations", icon: Mail, fd: "limited", bot: "limited", solara: "yes" },
  { name: "Website chat + text booking", icon: MessageCircle, fd: "no", bot: "limited", solara: "yes" },
  { name: "Smart scheduling by provider & op", icon: Calendar, fd: "limited", bot: "no", solara: "yes" },
  { name: "Analytics & reporting", icon: ChartColumn, fd: "limited", bot: "no", solara: "yes" },
  { name: "Gets you found on Google", icon: Search, fd: "no", bot: "no", solara: "SEO + Google Ads" },
  { name: "Works after hours & overflow", icon: Headphones, fd: "no", bot: "limited", solara: "yes" },
];

function Cell({ v }: { v: string }) {
  if (v === "yes") {
    return (
      <div className="flex items-center justify-center gap-2">
        <CheckCircle2 className="w-5 h-5 text-[#16C4B3]" />
      </div>
    );
  }
  if (v === "SEO + Google Ads") {
    return (
      <div className="flex items-center justify-center gap-2">
        <CheckCircle2 className="w-5 h-5 text-[#16C4B3]" />
        <span className="hidden lg:inline text-[11px] font-bold text-[#FF6A55] leading-tight">{v}</span>
      </div>
    );
  }
  if (v === "no") {
    return (
      <div className="flex items-center justify-center">
        <XCircle className="w-5 h-5 text-rose-300" />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center">
      <span className="inline-flex items-center gap-1 text-amber-600">
        <Minus className="w-4 h-4" />
        <span className="text-[11px] font-medium hidden sm:inline">Limited</span>
      </span>
    </div>
  );
}

export function Comparison() {
  return (
    <section id="compare" className="py-20 md:py-28 bg-gradient-to-b from-[#FFF9F2] via-[#FAF0DC]/40 to-[#FFF9F2] relative overflow-hidden">
      <div className="absolute -top-40 -right-32 w-[32rem] h-[32rem] bg-[#FF6A55]/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-32 w-[32rem] h-[32rem] bg-[#FFB23E]/8 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-12 relative z-10 max-w-[1920px]">
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6A55]/10 border border-[#FF6A55]/20 mb-6 shadow-sm"
          >
            <ChartColumn className="w-4 h-4 text-[#FF6A55]" />
            <span className="text-sm font-bold text-[#FF6A55] uppercase tracking-wider">Compare</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-6 leading-[1.1] tracking-tight"
          >
            A full front office <span className="text-slate-300 font-medium italic px-2">vs.</span> a receptionist <span className="text-slate-300 font-medium italic px-2">vs.</span> a chatbot
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 leading-relaxed font-medium max-w-3xl mx-auto"
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
          className="hidden md:block w-full max-w-360 mx-auto rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 overflow-hidden"
        >
          <div className="grid grid-cols-[1.7fr_1fr_1fr_1.2fr] bg-slate-900 text-white">
            <div className="px-5 py-4 text-sm font-semibold">Capability</div>
            <div className="px-3 py-4 text-center text-sm font-semibold">Front desk</div>
            <div className="px-3 py-4 text-center text-sm font-semibold">Basic chatbot</div>
            <div className="px-3 py-4 text-center text-sm font-semibold bg-gradient-to-br from-[#FF6A55] to-[#143138]">Solara</div>
          </div>
          
          {features.map((row, i) => (
            <div key={row.name} className={`grid grid-cols-[1.7fr_1fr_1fr_1.2fr] items-stretch border-t border-slate-100 transition-colors hover:bg-[#FAF0DC]/40 ${i % 2 !== 0 ? "bg-slate-50/40" : ""}`}>
              <div className="px-5 py-3.5 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-slate-100 ring-1 ring-slate-200 flex items-center justify-center flex-shrink-0">
                  <row.icon className="w-4 h-4 text-slate-600" />
                </span>
                <span className="text-sm font-semibold text-slate-900 leading-snug">{row.name}</span>
              </div>
              <div className="px-3 py-3.5 flex items-center justify-center"><Cell v={row.fd} /></div>
              <div className="px-3 py-3.5 flex items-center justify-center"><Cell v={row.bot} /></div>
              <div className="px-3 py-3.5 flex items-center justify-center gap-2 bg-[#FF6A55]/5 border-l-2 border-[#FF6A55]/30">
                <Cell v={row.solara} />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3 max-w-xl mx-auto mt-8">
          {features.map((row) => (
            <motion.div
              key={row.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-8 h-8 rounded-lg bg-slate-100 ring-1 ring-slate-200 flex items-center justify-center flex-shrink-0">
                  <row.icon className="w-4 h-4 text-slate-600" />
                </span>
                <span className="text-sm font-bold text-slate-900 leading-snug">{row.name}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg bg-slate-50 py-2">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">Front desk</div>
                  <div className="flex justify-center"><Cell v={row.fd} /></div>
                </div>
                <div className="rounded-lg bg-slate-50 py-2">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">Chatbot</div>
                  <div className="flex justify-center"><Cell v={row.bot} /></div>
                </div>
                <div className="rounded-lg bg-[#FF6A55]/10 py-2">
                  <div className="text-[10px] uppercase tracking-wider text-[#FF6A55] font-bold mb-1">Solara</div>
                  <div className="flex justify-center"><Cell v={row.solara} /></div>
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
          className="w-full max-w-360 mx-auto mt-12 sm:mt-16 relative group"
        >
          {/* Animated gradient glow behind the card */}
          <div className="absolute -inset-[1px] bg-gradient-to-r from-[#FF6A55]/40 via-[#FFB23E]/40 to-[#FF6A55]/40 rounded-[34px] blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="relative rounded-[32px] overflow-hidden border border-white/10 bg-[#0B0F17] shadow-2xl">
            {/* Inner background glow effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#FF6A55]/20 to-transparent rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#FFB23E]/15 to-transparent rounded-full blur-[80px] pointer-events-none" />
            
            {/* Noise texture overlay for premium feel */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

            <div className="relative grid lg:grid-cols-[auto_1fr_auto] items-center gap-8 px-8 py-8 sm:px-10 sm:py-10">
              
              {/* Left side: The big metric */}
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#FF6A55] rounded-2xl blur-lg opacity-40 animate-pulse" />
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-b from-[#FF6A55] to-[#E54830] flex items-center justify-center relative shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] ring-1 ring-white/10">
                    <CheckCircle2 className="w-8 h-8 text-white drop-shadow-md" />
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 tracking-tight leading-none">
                      13 / 13
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm uppercase tracking-[0.15em] text-[#FFB23E] font-bold mt-2">
                    Capabilities, run by Solara Dental AI
                  </div>
                </div>
              </div>
              
              {/* Middle: The pitch */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed text-left lg:text-center max-w-2xl mx-auto font-medium">
                The only solution that <span className="text-white">verifies insurance</span>, <span className="text-white">books into your real schedule</span>, and <span className="text-white">runs the follow-up</span> — without hiring a second receptionist.
              </p>
              
              {/* Right side: Premium CTA */}
              <div className="flex justify-start lg:justify-end">
                <a 
                  data-cta="book_demo" 
                  data-position="comparison" 
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white text-slate-900 font-bold text-base transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] overflow-hidden" 
                  href="/book-a-demo"
                >
                  <Calendar className="w-5 h-5 text-[#FF6A55]" />
                  <span className="relative">Request your white-glove call</span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center transition-transform group-hover:translate-x-1">
                    <ArrowRight className="w-4 h-4 text-slate-900" />
                  </div>
                </a>
              </div>
              
            </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
