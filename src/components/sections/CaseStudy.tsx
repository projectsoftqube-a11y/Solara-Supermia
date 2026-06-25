import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChartColumn, 
  Sparkles, 
  Star,
  ArrowRight,
  Quote,
  TrendingUp,
  MapPin
} from "lucide-react";

const cases = [
  {
    id: "northgate",
    practice: "Northgate Family Dental",
    location: "Phoenix, AZ",
    category: "Recall & reactivation",
    quote: "Recall used to be the thing we always meant to do. Now it just runs in the background. It's completely transformed our revenue.",
    author: "Dr. E. Romero",
    role: "Owner",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1600&q=80",
    stats: [
      { value: "210", label: "Overdue patients re-engaged" },
      { value: "47%", label: "Of those rebooked" },
      { value: "+$94k", label: "Recall revenue / quarter", isHeadline: true },
      { value: "0 hrs", label: "Of staff time" }
    ]
  },
  {
    id: "sunrise",
    practice: "Sunrise Dental",
    location: "Austin, TX",
    category: "Intake & Verification",
    quote: "Insurance verification and intake used to eat the morning. Now it's done before the patient walks in, freeing our team.",
    author: "Dr. R. Patel",
    role: "DDS",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=80",
    stats: [
      { value: "4 hrs", label: "Saved per day on insurance" },
      { value: "100%", label: "Forms completed prior to arrival" },
      { value: "Zero", label: "Morning bottlenecks", isHeadline: true },
      { value: "15m", label: "Wait time reduction" }
    ]
  },
  {
    id: "maple",
    practice: "Maple Dental",
    location: "Toronto, ON",
    category: "24/7 Operations",
    quote: "It's not a phone line - it's the whole front desk. Forms, recall, notes, and booking all happen without lifting a finger.",
    author: "Dr. J. Kim",
    role: "DDS",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1600&q=80",
    stats: [
      { value: "24/7", label: "Booking availability" },
      { value: "3x", label: "Increase in after-hours bookings" },
      { value: "100%", label: "Accurate OpenDental sync", isHeadline: true },
      { value: "0", label: "Missed new patient calls" }
    ]
  }
];

const testimonials = [
  {
    name: "Dr. R. Patel, DDS",
    practice: "Sunrise Dental",
    location: "Austin, TX",
    quote: "Insurance verification and intake used to eat the morning. Now it's done before the patient walks in, and the team is free to actually run the day.",
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80&auto=format&fit=crop"
  },
  {
    name: "Dr. J. Kim, DDS",
    practice: "Maple Dental",
    location: "Toronto, ON",
    quote: "It's not a phone line - it's the whole front desk. Forms, recall, notes, and booking all happen without anyone lifting a finger.",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80&auto=format&fit=crop"
  },
  {
    name: "Dr. E. Romero, DDS",
    practice: "Northgate Family Dental",
    location: "Phoenix, AZ",
    quote: "The OpenDental sync is the part I trusted last and now rely on most. Booked, rescheduled, or transferred - everything shows up where it should.",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80&auto=format&fit=crop"
  }
];

export function CaseStudy() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeCase = cases[activeIndex];

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cases.length);
    }, 10000); // 10 seconds to ensure enough reading time
    return () => clearInterval(timer);
  }, [isPaused, activeIndex]);

  return (
    <section id="results" className="py-20 md:py-28 bg-white relative">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-[#FF6A55] text-[11px] font-bold uppercase tracking-[0.2em] mb-6"
          >
            <ChartColumn size={14} /> Case results
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-slate-900 mb-6 leading-[1.05] tracking-tight"
          >
            Same front desk.<br />
            <span className="text-slate-400">Different results.</span>
          </motion.h2>
        </div>

        {/* Premium Immersive Case Study Frame */}
        <div 
          className="relative rounded-[40px] sm:rounded-[64px] overflow-hidden bg-slate-900 shadow-2xl shadow-slate-900/20 mb-32 flex flex-col"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Background Image & Gradients */}
          <div className="absolute inset-0 z-0 bg-slate-900">
            {cases.map((c, idx) => (
              <img 
                key={c.id}
                src={c.image} 
                alt={c.practice} 
                className={`absolute inset-0 w-full h-full object-cover mix-blend-luminosity transition-opacity duration-1000 ${
                  idx === activeIndex ? "opacity-40 lg:opacity-60" : "opacity-0"
                }`}
              />
            ))}
            
            {/* Gradients overlayed on top of the image to ensure text is always readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent lg:w-3/4 pointer-events-none" />
          </div>

          {/* Content Layer */}
          <div className="relative z-10 p-8 sm:p-12 lg:p-20 flex flex-col justify-between flex-1 min-h-[750px] lg:min-h-[800px]">
            
            {/* Top Navigation / Progress */}
            <div className="flex items-center gap-4 relative z-20">
              {cases.map((c, idx) => (
                <button
                  key={c.id}
                  onClick={() => setActiveIndex(idx)}
                  className="group relative flex-1 max-w-[200px]"
                >
                  <div className={`h-1.5 rounded-full overflow-hidden transition-colors ${idx === activeIndex ? "bg-white/20" : "bg-white/10 group-hover:bg-white/20"}`}>
                    {idx === activeIndex && (
                      <motion.div 
                        key={`${activeIndex}-${isPaused ? 'paused' : 'playing'}`}
                        initial={{ width: isPaused ? "100%" : "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: isPaused ? 0 : 10, ease: "linear" }}
                        className={`h-full ${isPaused ? 'bg-[#FF6A55]/50' : 'bg-[#FF6A55]'}`}
                      />
                    )}
                  </div>
                  <div className={`mt-3 text-[11px] font-bold uppercase tracking-wider transition-colors text-left ${idx === activeIndex ? "text-white" : "text-white/40 group-hover:text-white/70"}`}>
                    {c.practice}
                  </div>
                </button>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-end relative z-10 mt-20">
              
              {/* Left Column: Quote & Practice */}
              <div className="lg:col-span-6 xl:col-span-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCase.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-bold uppercase tracking-wider mb-8">
                      <MapPin size={12} className="text-[#FFB23E]" />
                      {activeCase.location}
                    </div>
                    
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white leading-[1.2] mb-6">
                      <Quote className="text-[#FF6A55] w-8 h-8 lg:w-10 lg:h-10 mb-4 opacity-50" />
                      "{activeCase.quote}"
                    </h3>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF6A55] to-[#FFB23E] p-[2px]">
                        <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {activeCase.author.charAt(4)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="text-white font-bold text-lg">{activeCase.author}</div>
                        <div className="text-[#FFB23E] font-semibold text-sm">{activeCase.role} · {activeCase.practice}</div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Column: Glass Stats Board */}
              <div className="lg:col-span-6 xl:col-span-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCase.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="grid sm:grid-cols-2 gap-4"
                  >
                    {activeCase.stats.map((stat, idx) => (
                      <div 
                        key={idx}
                        className={`rounded-[32px] p-6 sm:p-8 backdrop-blur-xl border transition-all ${
                          stat.isHeadline 
                            ? "bg-white/10 border-white/20 shadow-[0_32px_64px_rgba(0,0,0,0.3)] sm:col-span-2 lg:col-span-1" 
                            : "bg-white/5 border-white/10"
                        }`}
                      >
                        {stat.isHeadline && (
                          <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFB23E] mb-3 flex items-center gap-1.5">
                            <TrendingUp size={14} /> Headline result
                          </div>
                        )}
                        <div className={`font-display font-bold leading-none mb-3 ${
                          stat.isHeadline 
                            ? "text-5xl sm:text-6xl bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent" 
                            : "text-4xl sm:text-5xl text-white"
                        }`}>
                          {stat.value}
                        </div>
                        <div className="text-[15px] leading-snug font-medium text-white/60">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>
        </div>

        {/* Out-of-the-box Testimonial Grid */}
        <div className="mb-32 sm:mb-40 pt-10">
          <div className="text-center mb-20 sm:mb-24">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-4 tracking-tight">
              Trusted by leading practices
            </h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-x-6 gap-y-16 sm:gap-y-20">
            {testimonials.map((testimonial, idx) => (
              <motion.figure 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: idx === 1 ? 32 : 0 }} // Stagger the middle card down
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`relative bg-gradient-to-b from-white to-slate-50/50 rounded-[40px] p-8 sm:p-10 shadow-[0_8px_30px_rgba(15,23,42,0.04)] ring-1 ring-slate-900/5 hover:shadow-[0_30px_60px_rgba(255,106,85,0.08)] transition-all duration-500 flex flex-col h-full group ${idx === 1 ? 'md:translate-y-8' : ''}`}
              >
                {/* Giant Background Quote Mark */}
                <div className="absolute top-4 right-8 font-display text-[140px] leading-none text-[#FF6A55] opacity-[0.03] pointer-events-none select-none z-0 group-hover:opacity-[0.06] transition-opacity duration-500">
                  "
                </div>

                {/* Hover Glowing Bottom Border */}
                <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-[#FF6A55] to-[#FFB23E] rounded-t-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Breakout Avatar */}
                <div className="absolute -top-10 left-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6A55] to-[#FFB23E] rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-20 h-20 rounded-full object-cover relative z-10 border-4 border-white shadow-xl"
                    />
                  </div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 mt-12 flex-1 flex flex-col">
                  <blockquote className="text-[17px] text-slate-700 leading-relaxed font-medium flex-1 mb-8">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="mt-auto">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className="text-[#FFB23E] fill-current" />
                      ))}
                    </div>
                    <div className="font-bold text-slate-900 text-[16px]">{testimonial.name}</div>
                    <div className="text-[14px] font-semibold text-[#FF6A55] mt-1">
                      {testimonial.practice}
                    </div>
                  </div>
                </div>
              </motion.figure>
            ))}
          </div>
        </div>

        {/* Epic CTA Button */}
        <div className="text-center">
          <motion.a 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            href="https://app.solara.supermia.ai/"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-slate-900 text-white font-bold text-[16px] hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 group"
          >
            See Solara in action
            <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform text-[#FF6A55]" />
          </motion.a>
        </div>

      </div>
    </section>
  );
}
