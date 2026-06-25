import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, ClipboardList, Phone, AlarmClock, Search, Sparkles, CheckCircle2 } from "lucide-react";

// Data structure representing the scenarios
const scenarios = [
  {
    id: "insurance",
    label: "Insurance check",
    icon: ShieldCheck,
    steps: [
      "Patient books online for next week",
      "Solara instantly queries clearinghouse",
      "Eligibility and benefits breakdown returned"
    ],
    resultTitle: "Coverage verified",
    resultBadge: "No hold music",
    resultDesc: "Full breakdown saved to patient chart · Ready for check-in",
    image: "/images/walkthrough_insurance.png"
  },
  {
    id: "intake",
    label: "Intake form",
    icon: ClipboardList,
    steps: [
      "Visit booked for Tuesday",
      "Solara texts a secure intake link",
      "Patient fills it on their phone"
    ],
    resultTitle: "Paperwork done",
    resultBadge: "No paper",
    resultDesc: "New-patient forms completed · saved to chart",
    image: "/images/walkthrough_intake.png"
  },
  {
    id: "after_hours",
    label: "After hours",
    icon: Phone,
    steps: [
      "Patient calls at 8:30 PM",
      "Solara answers and speaks naturally",
      "Patient books an emergency slot for tomorrow"
    ],
    resultTitle: "Appointment booked",
    resultBadge: "24/7 Coverage",
    resultDesc: "Slot filled · Confirmation text sent to patient",
    image: "/images/walkthrough_afterhours.png"
  },
  {
    id: "recall",
    label: "Recall",
    icon: AlarmClock,
    steps: [
      "Solara identifies 40 overdue patients",
      "Personalized texts sent out silently",
      "8 patients book online via the link"
    ],
    resultTitle: "Schedule full",
    resultBadge: "Zero effort",
    resultDesc: "8 reactivations · $2,400+ production added",
    image: "/images/walkthrough_recall.png"
  },
  {
    id: "google",
    label: "Found on Google",
    icon: Search,
    steps: [
      "Patient searches 'dentist near me'",
      "Your clinic appears #1 in Google Maps",
      "Patient clicks and books instantly"
    ],
    resultTitle: "New patient won",
    resultBadge: "Top ranking",
    resultDesc: "SEO optimized · Google Business Profile managed",
    image: "/images/walkthrough_google.png"
  }
];

export function VoiceBot() {
  const [activeTab, setActiveTab] = useState(scenarios[1]); // Default to Intake form
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    
    const timer = setTimeout(() => {
      const currentIndex = scenarios.findIndex((t) => t.id === activeTab.id);
      const nextIndex = (currentIndex + 1) % scenarios.length;
      setActiveTab(scenarios[nextIndex]);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [activeTab, isPaused]);

  return (
    <section id="walkthrough" className="py-20 md:py-28 bg-[#FAF0DC] overflow-hidden">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E8E5D8] text-[#FF6A55] text-[11px] font-bold uppercase tracking-[0.18em] mb-6 shadow-sm">
            <Sparkles size={14} /> Live walkthrough
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-6 leading-[1.1] tracking-tight">
            A day at your front desk,<br /> <span className="text-[#FF6A55] relative whitespace-nowrap">handled<svg className="absolute -bottom-2 left-0 w-full h-3 text-[#FFB23E]/30" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg></span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 font-medium">
            Watch it play through, or tap any moment to see exactly what Solara does.
          </p>
        </div>

        {/* Layout Container */}
        <div 
          className="grid lg:grid-cols-[240px_1fr] xl:grid-cols-[280px_1fr] gap-8 lg:gap-12 items-start mt-8 sm:mt-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          
          {/* Left Panel: Vertical Tabs */}
          <div className="flex flex-col gap-3 sticky top-32 z-20">
            {scenarios.map((tab) => {
              const isActive = activeTab.id === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab)}
                  className={`relative overflow-hidden flex items-center gap-3.5 px-5 sm:px-6 py-4 rounded-2xl text-[15px] font-bold transition-all duration-300 text-left w-full ${
                    isActive 
                      ? "bg-[#FF6A55] text-white shadow-[0_16px_32px_rgba(255,106,85,0.25)] scale-105 sm:scale-[1.02] border border-[#FF6A55]" 
                      : "bg-white text-slate-500 border border-slate-200/60 hover:text-slate-800 hover:border-[#FF6A55]/30 hover:shadow-lg hover:bg-slate-50"
                  }`}
                >
                  <tab.icon size={20} className={isActive ? "text-white relative z-10" : "text-slate-400 relative z-10"} />
                  <span className="relative z-10">{tab.label}</span>
                  
                  {isActive && (
                    <motion.div
                      key={tab.id + (isPaused ? "-paused" : "-playing")}
                      initial={{ width: isPaused ? "100%" : "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: isPaused ? 0 : 3, ease: "linear" }}
                      className="absolute bottom-0 left-0 h-1 bg-white/40"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Panel: Content Area */}
          <div className="w-full min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, x: 20, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="grid lg:grid-cols-[1.1fr_1fr] gap-6 sm:gap-8 items-stretch h-full"
              >
              
              {/* Left Panel: High-End Photography Result */}
              <div className="relative rounded-[32px] shadow-[0_24px_48px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col min-h-[400px] group order-2 lg:order-1">
                {/* Full Bleed Image */}
                <div className="absolute inset-0">
                  <img 
                    src={activeTab.image} 
                    alt={activeTab.label} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  {/* Overlay Gradient for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-slate-950/10 pointer-events-none" />
                </div>
                
                <div className="relative z-10 p-6 sm:p-8 flex flex-col h-full justify-between">
                  {/* Top Badge */}
                  <div className="flex justify-end">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md shadow-lg">
                      <CheckCircle2 size={14} className="text-[#FFB23E]" />
                      {activeTab.resultBadge}
                    </span>
                  </div>
                  
                  {/* Bottom Content */}
                  <div className="mt-auto">
                    <motion.h3 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-3xl sm:text-4xl font-display font-bold leading-[1.1] mb-5 tracking-tight text-white drop-shadow-lg"
                    >
                      {activeTab.resultTitle}
                    </motion.h3>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="rounded-2xl bg-white/10 border border-white/20 p-4 sm:p-5 backdrop-blur-md transition-all duration-500 shadow-xl"
                    >
                      <div className="text-[10px] uppercase tracking-[0.2em] text-white/70 mb-1.5 font-bold flex items-center gap-2">
                        What your team sees
                      </div>
                      <div className="text-[14px] sm:text-[15px] font-bold leading-relaxed text-white">
                        {activeTab.resultDesc}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Right Panel: What happens */}
              <div className="rounded-[32px] bg-white border border-slate-200/60 shadow-xl shadow-slate-200/40 p-6 sm:p-8 relative overflow-hidden flex flex-col justify-center order-1 lg:order-2">
                

                <div className="space-y-3 sm:space-y-4 relative z-10">
                  {activeTab.steps.map((step, idx) => (
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + (idx * 0.1), type: "spring", stiffness: 100 }}
                      key={idx} 
                      className="group/step relative bg-slate-50/80 hover:bg-white border border-slate-200/50 hover:border-[#FF6A55]/30 rounded-[20px] p-4 sm:p-5 transition-all duration-300 shadow-sm hover:shadow-[0_12px_32px_rgba(255,106,85,0.08)] flex items-center gap-4 sm:gap-5 hover:-translate-y-0.5 cursor-default"
                    >
                      <div className="shrink-0 w-12 h-12 rounded-2xl bg-white shadow-[0_4px_12px_rgba(15,23,42,0.04)] flex items-center justify-center relative z-10 group-hover/step:scale-110 transition-transform duration-300 ring-1 ring-slate-100 group-hover/step:ring-[#FF6A55]/20">
                        <span className="bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-transparent font-display font-black text-xl group-hover/step:from-[#FF6A55] group-hover/step:to-[#FFB23E] transition-all">
                          {idx + 1}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold mb-1 group-hover/step:text-[#FF6A55] transition-colors">Step 0{idx + 1}</div>
                        <div className="text-[14px] sm:text-[15px] font-bold text-slate-700 leading-snug group-hover/step:text-slate-900 transition-colors">
                          {step}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
        </div>
      </div>
    </section>
  );
}
