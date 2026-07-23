import { motion } from "motion/react";
import { Sparkles, Gift, Clock, ArrowRight, Check } from "lucide-react";

export function FoundingOffer() {
  return (
    <section id="founding" className="relative py-20 md:py-28 overflow-hidden bg-[#0A0A0A] text-white">
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-[#FF6A55]/15 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-[#FFB23E]/10 to-transparent blur-[120px] pointer-events-none" />
      
      {/* Top Border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="container-content relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 lg:mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFB23E]" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-300">Founding Cohort</span>
            <span className="bg-white/10 text-white text-[10px] font-bold px-2 py-0.5 rounded-full ml-1">19 of 25 left</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.05] tracking-tight mb-6"
          >
            Your first <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB23E] via-[#FF6A55] to-[#E54830]">
              2 months
            </span>{" "}
            are on us.
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-400 max-w-2xl font-medium leading-relaxed"
          >
            Join the founding cohort and run your whole front office free. Use the time to launch Solara, test it on real calls, and watch the schedule fill before a monthly bill ever starts.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid lg:grid-cols-12 gap-5 max-w-5xl mx-auto">
          
          {/* Main Pricing Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-5 relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#FF6A55]/20 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative h-full flex flex-col p-8 rounded-3xl bg-[#111111] border border-white/10 overflow-hidden shadow-2xl">
              {/* Card internal glow */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#FF6A55]/20 blur-[60px] rounded-full pointer-events-none" />
              
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-3xl border-b border-l border-white/5 flex items-start justify-end p-5">
                <Gift className="w-6 h-6 text-[#FF6A55]" />
              </div>
              
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#FFB23E] font-bold mb-4 mt-2">Founding Offer</div>
              <div className="text-7xl lg:text-8xl font-display font-bold text-white tracking-tighter leading-none mb-2">$0</div>
              <div className="text-lg text-[#FF6A55] font-bold mb-8">for your first 2 months</div>
              
              <div className="mt-auto space-y-4 text-center">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">
                    Then your locked founding rate,<br />confirmed at onboarding
                  </p>
                </div>
                
                <a 
                  data-cta="book_demo"
                  data-position="founding_section"
                  href="/book-a-demo"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black font-bold text-base hover:bg-slate-200 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
                >
                  Book a 20-min demo
                  <ArrowRight className="w-4 h-4" />
                </a>
                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 font-medium">
                  <Clock className="w-3.5 h-3.5" /> Cancel anytime · No setup fee
                </div>
              </div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            
            {/* Stats row */}
            <div className="grid sm:grid-cols-3 gap-5">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="p-5 rounded-2xl bg-[#111111] border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className="text-2xl font-display font-bold text-white mb-1">$0</div>
                <div className="text-xs text-slate-400 font-medium leading-relaxed">monthly fee while you onboard</div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="p-5 rounded-2xl bg-[#111111] border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className="text-2xl font-display font-bold text-white mb-1">$2,500</div>
                <div className="text-xs text-slate-400 font-medium leading-relaxed">white-glove setup included</div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="p-5 rounded-2xl bg-[#111111] border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className="text-2xl font-display font-bold text-white mb-1">90 days</div>
                <div className="text-xs text-slate-400 font-medium leading-relaxed">to prove it works in clinic</div>
              </motion.div>
            </div>

            {/* Checklist */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="flex-1 p-6 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#111111] border border-white/10 relative overflow-hidden"
            >
              {/* Highlight flare */}
              <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#FFB23E]/5 blur-[80px] rounded-full pointer-events-none" />
              
              <ul className="grid sm:grid-cols-2 gap-4 sm:gap-6 relative z-10 h-full content-center">
                {[
                  "Run insurance, intake, booking, recall, notes, SEO, and Google Ads from day one",
                  "Founder-assisted setup tuned around your practice",
                  "Keep your locked founding rate after onboarding confirms your plan",
                  "No risk: 30-day money-back if it is not working"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#16C4B3]/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-[#16C4B3]" />
                    </div>
                    <span className="text-sm text-slate-300 font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}
