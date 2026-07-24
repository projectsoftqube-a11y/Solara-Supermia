import { motion } from "motion/react";
import { ShieldCheck, FileSignature, CalendarCheck, X, Check, Sparkles, PhoneMissed, PhoneCall, ClipboardX, ClipboardCheck, ShieldAlert, UserMinus, UserCheck, SearchX, TrendingUp, ArrowRight, Calendar } from "lucide-react";

const blocks = [
  { 
    icon: ShieldCheck, 
    title: "Insurance ready", 
    body: "Verified before the chair is set. No paperwork ambush at check-in.",
    image: "/images/automation_insurance.png"
  },
  { 
    icon: FileSignature, 
    title: "Forms complete", 
    body: "Intake, history, consents — signed digitally before arrival.",
    image: "/images/automation_forms.png"
  },
  { 
    icon: CalendarCheck, 
    title: "Schedule filled", 
    body: "Recall and overflow handled by Solara, 24/7.",
    image: "/images/automation_schedule.png"
  },
];

const oldWayCards = [
  {
    icon: PhoneMissed,
    text: "Calls slip to voicemail the moment it gets busy",
    rotate: "-rotate-2",
    margin: "-ml-2 sm:-ml-6 mr-2 sm:mr-6",
    delay: 0.1
  },
  {
    icon: ClipboardX,
    text: "Patients hunched over clipboards in the waiting room",
    rotate: "rotate-1",
    margin: "ml-4 sm:ml-8 -mr-4 sm:-mr-8",
    delay: 0.2
  },
  {
    icon: ShieldAlert,
    text: "Staff on hold with carriers instead of with patients",
    rotate: "-rotate-1",
    margin: "-ml-1 sm:-ml-4 mr-1 sm:mr-4",
    delay: 0.3
  },
  {
    icon: UserMinus,
    text: "No-shows leave chairs — and revenue — sitting empty",
    rotate: "rotate-2",
    margin: "ml-2 sm:ml-6 -mr-2 sm:-mr-6",
    delay: 0.4
  },
  {
    icon: SearchX,
    text: "New patients search \"dentist near me\" and find someone else",
    rotate: "-rotate-1",
    margin: "-ml-3 sm:-ml-8 mr-3 sm:mr-8",
    delay: 0.5
  }
];

const newWayCards = [
  {
    icon: PhoneCall,
    text: "Every call answered and booked, day or night",
    delay: 0.1
  },
  {
    icon: ClipboardCheck,
    text: "Forms filled on the patient's phone before they arrive",
    delay: 0.2
  },
  {
    icon: ShieldCheck,
    text: "Coverage verified before they sit down",
    delay: 0.3
  },
  {
    icon: UserCheck,
    text: "Open slots backfilled from your own recall list",
    delay: 0.4
  },
  {
    icon: TrendingUp,
    text: "You're the first name they find on Google",
    delay: 0.5
  }
];

export function Automation() {
  return (
    <section id="automation" className="py-20 md:py-28 bg-[#FDFBF7]">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16 sm:mb-20">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF6A55]/5 border border-[#FF6A55]/20 text-[#FF6A55] text-[11px] font-bold uppercase tracking-[0.18em] mb-6 shadow-sm">
            <Sparkles size={14} /> Automation
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.1] text-slate-900 mb-6 tracking-tight">
            No clipboards. No paper.<br />
            <span className="text-slate-500">No chasing.</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-medium">
            Solara doesn't help your team work harder. It takes the work off the table entirely.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-4 sm:gap-6 lg:gap-8 md:grid-cols-3 w-full">
          {blocks.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="group relative h-64 sm:h-72 overflow-hidden rounded-[24px] border border-slate-200/50 shadow-sm"
            >
              <img 
                src={b.image} 
                alt={b.title} 
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent pointer-events-none" />
              
              <div className="absolute left-5 right-5 bottom-5">

                <h3 className="text-xl sm:text-2xl font-bold leading-tight text-white mb-2">{b.title}</h3>
                <p className="text-[14px] leading-relaxed text-white/80 font-medium">
                  {b.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Before and After Comparison (The "Night and Day" concept) */}
        <div className="w-full mx-auto mt-32 sm:mt-40 relative">
          <div className="text-center mb-16 sm:mb-20">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF0DC] border border-[#E8E5D8] text-[#FF6A55] text-[11px] font-bold uppercase tracking-[0.18em] mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              Night and Day
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-6 tracking-tight">
              Your clinic today,<br className="sm:hidden" /> <span className="text-[#FF6A55]">vs. with Solara</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 font-medium max-w-2xl mx-auto">
              Same front desk. Same patients. None of the chaos.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* The Old Way (Chaotic Side) */}
            <div className="bg-slate-100/50 border border-slate-200/80 rounded-[40px] p-8 sm:p-12 relative overflow-hidden shadow-inner">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-300" />
              
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-400">The old way</h3>
                <span className="px-3 py-1 rounded-full bg-slate-200/80 text-slate-500 text-[10px] font-bold uppercase tracking-wider">Chaotic</span>
              </div>
              
              <div className="flex flex-col gap-4 relative z-10 py-4">
                {oldWayCards.map((card, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20, rotate: 0 }}
                    whileInView={{ opacity: 1, x: 0, rotate: card.rotate === "rotate-1" ? 1 : card.rotate === "-rotate-1" ? -1 : card.rotate === "rotate-2" ? 2 : -2 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: card.delay, type: "spring", stiffness: 100 }}
                    className={`bg-white border border-slate-200 shadow-md p-4 sm:p-5 rounded-2xl flex items-center gap-4 ${card.margin} transition-all hover:z-20 hover:scale-105 hover:shadow-xl cursor-default`}
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                      <card.icon className="w-5 h-5 text-slate-400" />
                    </div>
                    <span className="text-[14px] sm:text-[15px] font-medium text-slate-500 leading-snug">
                      {card.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* With Solara (Organized Side) */}
            <div className="bg-gradient-to-b from-white to-[#FFF4E8] border border-[#FF6A55]/20 rounded-[40px] p-8 sm:p-12 relative overflow-hidden shadow-[0_24px_64px_rgba(255,106,85,0.08)]">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#FF6A55] to-[#FFB23E]" />
              
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FF6A55] opacity-[0.03] blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />

              <div className="flex items-center justify-between mb-10 relative z-10">
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">With Solara</h3>
                <span className="px-3 py-1 rounded-full bg-[#FF6A55]/10 text-[#FF6A55] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" /> Calm
                </span>
              </div>
              
              <div className="flex flex-col gap-4 relative z-10">
                {newWayCards.map((card, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: card.delay }}
                    className="group bg-white border border-[#FF6A55]/10 shadow-[0_8px_24px_rgba(255,106,85,0.04)] hover:shadow-[0_16px_32px_rgba(255,106,85,0.08)] hover:border-[#FF6A55]/30 p-4 sm:p-5 rounded-2xl flex items-center gap-4 transition-all hover:-translate-y-0.5 cursor-default"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6A55] to-[#FFB23E] flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300">
                      <card.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[14px] sm:text-[15px] font-bold text-slate-800 leading-snug">
                      {card.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
          
          {/* Bottom CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 sm:mt-24 text-center"
          >
            <a href="/book-a-demo" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#FF6A55] text-white font-bold text-base hover:bg-[#FF8569] transition-all duration-300 shadow-xl shadow-[#FF6A55]/20 hover:shadow-2xl hover:shadow-[#FF6A55]/30 hover:-translate-y-1">
              <Calendar className="w-5 h-5" />
              Book a 20-min demo
              <ArrowRight className="w-5 h-5" />
            </a>
            
            <div className="mt-8 flex justify-center">
              <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-5 px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl bg-white border border-slate-200 shadow-[0_8px_30px_rgba(15,23,42,0.04)] relative overflow-hidden group hover:border-[#FF6A55]/30 transition-colors">
                 <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#FF6A55] to-[#FFB23E] group-hover:w-2 transition-all"></div>
                 
                 <div className="flex items-center gap-2 text-[#FF6A55] font-black text-[11px] sm:text-[12px] uppercase tracking-[0.15em]">
                   <Sparkles className="w-3.5 h-3.5" /> First 2 months free
                 </div>
                 
                 <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                 
                 <div className="flex items-center gap-2 text-slate-500 font-bold text-[11px] sm:text-[12px] uppercase tracking-[0.15em]">
                   No setup fee
                 </div>
                 
                 <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                 
                 <div className="flex items-center gap-2 text-slate-500 font-bold text-[11px] sm:text-[12px] uppercase tracking-[0.15em]">
                   Cancel anytime
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
