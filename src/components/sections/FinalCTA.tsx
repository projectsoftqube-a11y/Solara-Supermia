import { motion } from "motion/react";
import { Sparkles, Calendar, ArrowRight, Gift, Zap, Shield } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="relative py-20 md:py-28 bg-[#060F14] overflow-hidden min-h-screen flex items-center justify-center">
      {/* Immersive edge-to-edge background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#173B42] via-[#0A1A1F] to-[#040A0C]" />
      
      {/* Massive cinematic glowing orbs pushed to the far edges of the screen */}
      <motion.div 
        animate={{ opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-0 w-[1000px] h-[1000px] bg-[#FF6A55] rounded-full blur-[200px] pointer-events-none -translate-y-1/2 -translate-x-1/2 mix-blend-screen" 
      />
      <motion.div 
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/2 right-0 w-[1000px] h-[1000px] bg-[#FFB23E] rounded-full blur-[200px] pointer-events-none -translate-y-1/2 translate-x-1/2 mix-blend-screen" 
      />

      {/* Subtle architectural grid spanning the entire width */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
        backgroundSize: "80px 80px"
      }} />

      {/* Content wrapper with NO restrictive boxes - stretches edge to edge */}
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-12 max-w-[1920px] relative z-10 flex flex-col items-center justify-center text-center">
        
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[#FFB23E] text-sm sm:text-base font-bold uppercase tracking-[0.25em] mb-12 shadow-2xl"
        >
          <Sparkles className="w-5 h-5" />
          The complete AI front office
        </motion.div>

        {/* Massive Edge-to-Edge Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-7xl lg:text-[7rem] font-display font-bold text-white mb-10 leading-[1.05] tracking-tight max-w-[1600px] mx-auto"
        >
          Put your whole front desk on{" "}
          <span className="relative inline-block mt-2 sm:mt-0">
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A55] to-[#FFB23E]">autopilot.</span>
            <svg className="absolute -bottom-4 left-0 w-full h-5 text-[#FF6A55]/60" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="3" />
            </svg>
          </span>
        </motion.h2>

        {/* Subheadline scaled up */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-xl sm:text-2xl lg:text-3xl text-slate-300 leading-relaxed mb-16 max-w-4xl mx-auto font-light"
        >
          See exactly how Solara runs your front office: insurance, intake, booking, recall, notes, SEO, and Google Ads automatically. <span className="font-medium text-white">No commitment, no technical setup required.</span>
        </motion.p>

        {/* CTA Button scaled up */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex flex-col items-center justify-center gap-10"
        >
          <a 
            data-cta="book_demo" 
            data-position="final" 
            href="/book-a-demo"
            className="group relative inline-flex items-center justify-center gap-4 px-12 py-6 rounded-[2rem] bg-[#FF6A55] text-white font-bold text-xl lg:text-2xl transition-all hover:scale-105 hover:bg-[#ff7a68] shadow-[0_0_80px_rgba(255,106,85,0.4)] active:scale-95"
          >
            <Calendar className="w-7 h-7" />
            <span>Book a 20-min demo</span>
            <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
          </a>

          {/* Trust & Promos spread out horizontally */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 mt-4">
            <span className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#FFB23E]/10 border border-[#FFB23E]/20 text-[#FFB23E] font-bold text-base lg:text-lg">
              <Gift className="w-5 h-5" />
              First 2 months free on Essentials for founding clinics
            </span>
            <div className="flex flex-wrap items-center justify-center gap-3 text-slate-300 font-medium text-sm lg:text-base">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 shadow-sm">
                <Zap className="w-4 h-4 text-slate-400" /> No setup fee
              </span>
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 shadow-sm">
                <Shield className="w-4 h-4 text-slate-400" /> Cancel anytime
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
