import { motion } from "motion/react";
import { Send, Building2, User, Mail, MessageSquare } from "lucide-react";

export function ContactForm() {
  return (
    <section id="demo" className="pb-20 md:pb-28 bg-[#FAF0DC] relative overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#FF6A55]/20 text-[#FF6A55] text-sm font-bold tracking-wide uppercase mb-6 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF6A55] animate-pulse" />
              Book a Demo
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
              Ready to automate your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A55] to-[#FFB23E]">front office?</span>
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-xl leading-relaxed font-medium">
              Schedule a personalized walkthrough of Solara. See how our AI handles insurance verification, patient intake, and recall automatically.
            </p>
            <ul className="space-y-4 text-slate-700 font-bold">
              {[
                "Custom live demonstration of your workflow",
                "Pricing and ROI breakdown for your clinic",
                "Direct integration with your practice management software"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#FF6A55]/10 flex items-center justify-center text-[#FF6A55] shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl shadow-slate-200/50 border border-slate-100 relative"
          >
            {/* Decorative top gradient line */}
            <div className="absolute top-0 inset-x-8 h-1 bg-gradient-to-r from-[#FF6A55] to-[#FFB23E] rounded-b-full opacity-50" />
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input type="text" placeholder="Dr. Sarah Smith" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6A55]/20 focus:border-[#FF6A55] transition-all font-medium" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Clinic Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input type="text" placeholder="Smile Dental" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6A55]/20 focus:border-[#FF6A55] transition-all font-medium" required />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Work Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input type="email" placeholder="sarah@smiledental.com" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6A55]/20 focus:border-[#FF6A55] transition-all font-medium" required />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Message (Optional)</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                  <textarea placeholder="Tell us about your current software setup..." rows={4} className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6A55]/20 focus:border-[#FF6A55] transition-all resize-none font-medium"></textarea>
                </div>
              </div>

              <button type="submit" className="w-full py-4 bg-[#FF6A55] hover:bg-[#FF8569] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#FF6A55]/25 hover:shadow-xl hover:-translate-y-0.5">
                Request Demo <Send className="w-4 h-4" />
              </button>
              
              <p className="text-center text-xs text-slate-500 font-bold">
                By submitting, you agree to our Privacy Policy.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
