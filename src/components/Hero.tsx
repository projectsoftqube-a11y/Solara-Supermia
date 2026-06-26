import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  ShieldCheck,
  Calendar,
  ArrowRight,
  ChevronDown,
  Gift,
  Check,
  Database,
  ClipboardList,
  CalendarCheck,
  PhoneCall,
  Activity,
  LineChart,
  Bell,
  Mail,
} from "lucide-react";

const CAROUSEL_ITEMS = [
  {
    id: "insurance",
    label: "Insurance",
    icon: ShieldCheck,
    title: "Coverage verified before they sit down",
    desc: "Eligibility and benefits checked automatically at intake.",
    previewType: "insurance",
    previewTitle: "Delta Dental PPO - active · cleaning covered 100% · 2 left this year",
  },
  {
    id: "automation",
    label: "Automation",
    icon: Activity,
    title: "Paperwork handles itself",
    desc: "Forms sent, signed, and saved to the patient file without lifting a finger.",
    previewType: "automation",
    previewTitle: "Intake forms completed — John Doe",
  },
  {
    id: "booking",
    label: "Booking",
    icon: CalendarCheck,
    title: "Fill your empty chairs",
    desc: "Patients book themselves 24/7. Solara automatically finds the right slot.",
    previewType: "booking",
    previewTitle: "New appointment booked: Tue 10:30 AM",
  },
  {
    id: "recall",
    label: "Recall",
    icon: PhoneCall,
    title: "Bring patients back",
    desc: "Smart follow-ups ensure your hygiene schedule stays completely full.",
    previewType: "recall",
    previewTitle: "Recall message sent to 45 overdue patients",
  },
  {
    id: "overflow",
    label: "Front-desk overflow",
    icon: Database,
    title: "Never miss a call",
    desc: "When lines are busy, Solara steps in to answer questions and book appointments.",
    previewType: "overflow",
    previewTitle: "Call handled: Answered FAQ about pricing",
  },
  {
    id: "growth",
    label: "Growth",
    icon: LineChart,
    title: "Drive more revenue",
    desc: "Identify unscheduled treatment plans and reactivate dormant patients automatically.",
    previewType: "growth",
    previewTitle: "Identified $12k in unscheduled treatments",
  },
  {
    id: "reminders",
    label: "Reminders",
    icon: Bell,
    title: "Automated reminders",
    desc: "Ensure patients show up with perfectly timed text and email reminders.",
    previewType: "reminders",
    previewTitle: "Reminder sent: Tomorrow at 10:00 AM",
  },
  {
    id: "campaigns",
    label: "Campaigns",
    icon: Mail,
    title: "Campaign text and emails",
    desc: "Engage your patient base with targeted marketing blasts and announcements.",
    previewType: "campaigns",
    previewTitle: "Campaign delivered to 1,200 patients",
  },
];

export function Hero() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const activeItem = CAROUSEL_ITEMS[activeIdx];
  const ActiveIcon = activeItem.icon;

  return (
    <section id="top" className="relative overflow-hidden pt-32 md:pt-40 lg:pt-48 pb-20">
      {/* subtle background */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[600px]"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(249,115,22,0.06), transparent 60%)",
        }}
      />

      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
          {/* LEFT CONTENT */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[color:var(--primary-soft)] border border-[color:var(--border)] mb-6"
            >
              <Sparkles className="w-4 h-4 text-[color:var(--primary)]" />
              <span className="text-sm font-medium text-[color:var(--foreground)]">
                The complete AI front office for dental practices
              </span>
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="font-display font-bold text-[color:var(--foreground)] mb-4 leading-[1.08] text-4xl sm:text-5xl"
            >
              One platform for everything your front desk does:
              <span aria-hidden="true" className="block min-h-[1.5em] sm:min-h-[1.15em] mt-2">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeItem.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex items-center gap-3 align-middle"
                  >
                    <span className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[color:var(--primary)] to-[color:var(--primary-hover)] shadow-md shadow-[color:var(--primary)]/30">
                      <ActiveIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </span>
                    <span className="bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--primary-hover)] bg-clip-text text-transparent">
                      {activeItem.id === "insurance"
                        ? "insurance, verified"
                        : activeItem.id === "automation"
                          ? "paperwork, automated"
                          : activeItem.id === "booking"
                            ? "chairs, filled"
                            : activeItem.id === "recall"
                              ? "patients, recalled"
                              : activeItem.id === "overflow"
                                ? "calls, answered"
                                : activeItem.id === "reminders"
                                  ? "reminders, automated"
                                  : activeItem.id === "campaigns"
                                    ? "campaigns, delivered"
                                    : "revenue, driven"}
                    </span>
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-lg sm:text-xl text-[color:var(--secondary-foreground)] mb-8 leading-relaxed max-w-xl"
            >
              From insurance verification and patient intake to booking, recalls, paperwork, SEO,
              and Google Ads. Solara runs your entire front office automatically, 24/7. Not just a
              phone line. Your whole front desk, on autopilot.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="flex flex-col sm:flex-row gap-4 mb-3"
            >
              <a
                href="https://app.solara.supermia.ai/"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[color:var(--primary)] text-white font-semibold text-base hover:bg-[color:var(--primary-hover)] transition-colors shadow-lg shadow-[color:var(--primary)]/25"
              >
                <Calendar className="w-5 h-5" />
                Get Started
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#platform"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[color:var(--card)] border border-[color:var(--border)] text-[color:var(--foreground)] font-semibold text-base hover:border-[color:var(--primary)]/40 hover:shadow-md transition-all"
              >
                See everything it does
                <ChevronDown className="w-5 h-5 text-[color:var(--primary)]" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="inline-flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-8 rounded-2xl bg-[color:var(--card)]/70 border border-[color:var(--border)] px-3 py-2 shadow-sm backdrop-blur"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[color:var(--success)] to-[#0E8C80] text-white text-sm font-bold shadow-sm shadow-[color:var(--success)]/20">
                <Gift className="w-4 h-4" />
                First 2 months free
              </span>
              <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-[color:var(--secondary-foreground)]">
                <span className="inline-flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-[color:var(--success)]" /> No setup fee
                </span>
                <span className="inline-flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-[color:var(--success)]" /> Cancel anytime
                </span>
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="border-t border-[color:var(--border)] pt-6"
            >
              <p className="text-xs uppercase tracking-wide text-[color:var(--muted-foreground)] mb-3">
                Runs on the stack you already have
              </p>
              <p className="text-sm text-[color:var(--secondary-foreground)] flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="inline-flex items-center gap-1.5">
                  <Database className="w-4 h-4 text-[color:var(--primary)]" />
                  Syncs with OpenDental
                </span>
                <span className="text-[color:var(--muted-foreground)]">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[color:var(--primary)]" />
                  Insurance verified at intake
                </span>
                <span className="text-[color:var(--muted-foreground)]">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <ClipboardList className="w-4 h-4 text-[color:var(--primary)]" />
                  Paperless intake & notes
                </span>
              </p>
            </motion.div>
          </div>

          {/* RIGHT BENTO BOX */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              
              {/* Main Feature Card */}
              <div className="sm:col-span-7 flex flex-col justify-between bg-gradient-to-br from-[#FFF9F2] via-white to-[#FFF9F2] border border-[#FF6A55]/15 rounded-[32px] p-6 sm:p-8 shadow-[0_24px_48px_rgba(249,115,22,0.06)] h-[440px] relative overflow-hidden">
                <div className="flex items-center justify-between gap-2 mb-6 relative z-10">
                  <div className="flex items-center gap-2">
                    <img src="/images/logo.svg" alt="" className="h-10 w-auto object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  </div>
                  <div className="flex gap-1.5">
                    {CAROUSEL_ITEMS.map((item, idx) => (
                      <button 
                        key={item.id}
                        onClick={() => setActiveIdx(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIdx ? 'w-6 bg-[#FF6A55]' : 'w-2 bg-slate-200'}`}
                        aria-label={`Show: ${item.label}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex-1 relative z-10 flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={activeItem.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-[48px] h-[48px] rounded-2xl bg-[#FFDFD2] flex items-center justify-center mb-5 shadow-sm shadow-[#FF6A55]/10">
                        <ActiveIcon className="w-6 h-6 text-[#FF6A55]" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-2xl font-display font-bold text-slate-800 leading-tight mb-2">{activeItem.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed mb-6">{activeItem.desc}</p>
                      
                      <div className="rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/60 px-5 py-4 shadow-sm">
                        <div className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-1">What your team sees</div>
                        <div className="text-sm font-medium text-slate-700 leading-snug">{activeItem.previewTitle}</div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
                
                {/* Decorative background gradient */}
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-gradient-to-tl from-[#FF6A55]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
              </div>

              {/* Right Column Stack */}
              <div className="sm:col-span-5 flex flex-col gap-4">
                
                {/* Metrics Card */}
                <div className="flex-1 bg-white border border-slate-100 rounded-[32px] p-6 shadow-[0_12px_32px_rgba(0,0,0,0.04)] flex flex-col justify-center relative overflow-hidden">
                  <div className="flex items-center gap-2 mb-4">
                    <LineChart className="w-4 h-4 text-[#16C4B3]" />
                    <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Today's Impact</span>
                  </div>
                  <div className="space-y-4 relative z-10">
                    <div>
                      <div className="text-[28px] font-display font-bold text-slate-800 leading-none mb-1">94%</div>
                      <div className="text-xs text-slate-500">Insurance verified instantly</div>
                    </div>
                    <div>
                      <div className="text-[28px] font-display font-bold text-slate-800 leading-none mb-1">14</div>
                      <div className="text-xs text-slate-500">Appointments booked</div>
                    </div>
                  </div>
                  {/* Decorative background gradient */}
                  <div className="absolute -top-16 -right-16 w-48 h-48 bg-gradient-to-bl from-[#16C4B3]/10 to-transparent rounded-full blur-2xl pointer-events-none" />
                </div>

                {/* Live Activity Card */}
                <div className="flex-1 bg-[#0F172A] rounded-[32px] p-7 shadow-[0_20px_40px_rgba(0,0,0,0.12)] flex flex-col justify-center">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[11px] font-bold tracking-[0.15em] text-[#38BDF8] uppercase">Live Feed</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#16C4B3]"></span>
                  </div>
                  
                  <div className="relative z-10">
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={activeItem.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-4"
                      >
                        <div className="w-[46px] h-[46px] rounded-full bg-[#1E293B] flex items-center justify-center flex-shrink-0">
                          <ActiveIcon className="w-5 h-5 text-slate-300" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[15px] font-bold text-white truncate mb-0.5">{activeItem.label} Processing</div>
                          <div className="text-[13px] text-slate-400 truncate">Via Solara Neural Net</div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
                
              </div>
            </div>
            
            {/* Floating connecting badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute z-20 hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-xl border border-slate-100 left-[58%] top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <Sparkles className="w-5 h-5 text-[#FF6A55]" />
            </motion.div>
            
          </motion.div>
        </div>
      </div>
    </section>
  );
}
