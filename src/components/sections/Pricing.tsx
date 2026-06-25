import { useState } from "react";
import { motion } from "motion/react";
import { Check, ArrowRight, Sparkles, Zap, Shield, Gift, Clock, Crown, Building2, User } from "lucide-react";

const plans = [
  {
    id: "essentials",
    name: "Essentials",
    icon: User,
    tagline: "Solo practices",
    desc: "The always-on phone & chat agent. Stop losing after-hours calls.",
    monthlyPrice: 399,
    annualPrice: 339,
    savings: 720,
    cta: "Start a 30-day trial",
    features: [
      "Voice AI Agent — inbound only, 24/7",
      "Chat AI Agent — Web widget & SMS",
      "Appointment Confirmation & Reminders",
      "OpenDental sync — no double entry",
      "1,500 AI call minutes / month",
      "1 provider · 1 operatory",
      "HIPAA & GDPR · full audit trail",
      "Email support · 24-hour response",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    icon: Crown,
    tagline: "Growing groups",
    desc: "The complete always-on front office. Outbound, scheduling, intelligence & clinical.",
    monthlyPrice: 699,
    annualPrice: 599,
    savings: 1200,
    cta: "Get Started",
    popular: true,
    inheritLabel: "Everything in Essentials, plus",
    features: [
      "Outbound Voice AI — recall, reminders, waitlist",
      "Smart Scheduling — emergency priority, smart durations",
      "Campaign Generation — auto-fills cancelled slots",
      "Form Builder & paperless intake",
      "Visit notes written automatically",
      "360° Patient View & activity hub",
      "Insurance Verification — pre-arrival",
      "5,000 AI call minutes / month",
      "Up to 5 providers · 3 operatories",
      "Priority support · 4-hour response",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: Building2,
    tagline: "Multi-location",
    desc: "For dental groups with multiple locations. Scale, centralize, and report.",
    monthlyPrice: 1499,
    annualPrice: 1299,
    priceSuffix: "/ location",
    savings: 2400,
    cta: "Talk to sales",
    inheritLabel: "Everything in Pro, plus",
    features: [
      "Multi-practice / multi-location roll-up",
      "Revenue Analytics — provider, procedure & carrier",
      "Centralized Activity across all locations",
      "Role-Based Team Access",
      "Unlimited providers & operatories",
      "Unlimited AI call minutes",
      "Dedicated Customer Success Manager",
      "White-glove onboarding ($2,500 value)",
      "Guaranteed uptime · 1-hour support",
      "Custom integrations for your tech stack",
    ],
  },
];

export function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="relative py-20 md:py-28 overflow-hidden bg-[#FAFAF8]">
      {/* Subtle noise */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#FF6A55]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#FFB23E]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-content relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6A55]/10 border border-[#FF6A55]/20 mb-6"
          >
            <Gift className="w-3.5 h-3.5 text-[#FF6A55]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF6A55]">Founding offer · first 2 months free</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-5 leading-[1.1] tracking-tight"
          >
            Your whole front office -{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A55] to-[#FFB23E]">
              three ways
            </span>{" "}
            to get it.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            All plans include insurance verification, paperless intake, OpenDental integration, and unlimited concurrent calls.
          </motion.p>

          {/* Toggle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center p-1.5 rounded-full bg-slate-100/80 border border-slate-200/60 shadow-inner mt-4 mx-auto"
          >
            <button
              onClick={() => setAnnual(false)}
              className={`relative px-6 py-2.5 rounded-full text-[15px] font-bold transition-all duration-300 ease-out ${!annual ? "bg-white text-slate-900 shadow-[0_2px_8px_rgba(0,0,0,0.08)]" : "text-slate-500 hover:text-slate-700"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`relative px-6 py-2.5 rounded-full text-[15px] font-bold transition-all duration-300 ease-out flex items-center gap-2.5 ${annual ? "bg-white text-slate-900 shadow-[0_2px_8px_rgba(0,0,0,0.08)]" : "text-slate-500 hover:text-slate-700"}`}
            >
              Annual
              
              {/* Premium Inline Badge */}
              <span className={`px-2 py-0.5 rounded-md text-[11px] uppercase tracking-wide font-black transition-all duration-300 ${annual ? "bg-[#FF6A55]/10 text-[#FF6A55]" : "bg-slate-200/70 text-slate-500"}`}>
                Save 15%
              </span>
            </button>
          </motion.div>
        </div>

        {/* ═══════════ PRICING CARDS ═══════════ */}
        <div className="grid lg:grid-cols-12 gap-6 max-w-7xl mx-auto items-stretch">

          {/* ─── Essentials Card ─── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-4 relative group"
          >
            <div className="relative h-full rounded-[2rem] bg-white border border-slate-200/80 shadow-lg shadow-slate-200/40 p-8 transition-all duration-500 hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 overflow-hidden flex flex-col">
              {/* Subtle corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#16C4B3]/8 to-transparent pointer-events-none" />


              {/* Tier label */}
              <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#FF6A55] font-bold mb-4">Tier 01</div>

              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-slate-500" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-xl text-slate-900">Essentials</div>
                    <div className="text-xs text-slate-400 font-medium">Solo practices</div>
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-500 leading-relaxed mb-6">{plans[0].desc}</p>

              {/* Price */}
              <div className="mb-2">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-5xl font-display font-bold text-slate-900 tracking-tight">
                    ${annual ? plans[0].annualPrice : plans[0].monthlyPrice}
                  </span>
                  <span className="text-sm text-slate-400 font-medium">/ month</span>
                </div>
                <div className="h-5 mt-1">
                  {annual && (
                    <span className="text-xs font-bold text-[#16C4B3]">
                      Billed annually · save ${plans[0].savings}/yr
                    </span>
                  )}
                </div>
              </div>

              {/* Free badge */}
              <div className="mb-6">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#16C4B3]/10 text-[#0E8C80]">
                  <Gift className="w-3 h-3" /> First 2 months free
                </span>
              </div>

              {/* CTA */}
              <a
                data-cta="book_demo"
                data-position="pricing_essentials"
                href="https://app.solara.supermia.ai/"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm bg-slate-900 text-white hover:bg-slate-800 transition-all active:scale-[0.97] mb-8"
              >
                Start a 30-day trial
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Divider with label */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100" /></div>
                <div className="relative flex justify-start">
                  <span className="pr-3 bg-white text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    What's included
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3.5">
                {plans[0].features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <div className="mt-0.5 flex-shrink-0 w-4.5 h-4.5 rounded-full bg-[#16C4B3]/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-[#16C4B3]" />
                    </div>
                    <span className="text-[13px] text-slate-600 font-medium leading-snug">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* ─── Pro Card (Hero) ─── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="lg:col-span-4 relative"
          >
            {/* Outer glow ring */}
            <div className="absolute -inset-px rounded-[2.1rem] bg-gradient-to-b from-[#FF6A55]/60 via-[#FF6A55]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="relative h-full rounded-[2rem] overflow-hidden shadow-2xl shadow-[#FF6A55]/15 transition-all duration-500 hover:-translate-y-1 flex flex-col">
              {/* Dark card background with gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#0F1923] via-[#0B1219] to-[#080D12]" />
              
              {/* Decorative glow orbs */}
              <div className="absolute -top-20 -right-20 w-56 h-56 bg-[#FF6A55]/20 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-[#FFB23E]/10 rounded-full blur-[80px] pointer-events-none" />
              
              {/* Subtle grid lines */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                backgroundSize: "40px 40px"
              }} />

              {/* Most Chosen Pill */}
              <div className="absolute -top-0 left-1/2 -translate-x-1/2 translate-y-0 z-20">
                <div className="relative px-5 py-2 rounded-b-2xl bg-gradient-to-r from-[#FF6A55] to-[#E54830] text-white text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-[#FF6A55]/40 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  Most Chosen
                </div>
              </div>

              <div className="relative z-10 p-8 pt-12 flex flex-col flex-1">
                {/* Tier label */}
                <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#FFB23E] font-bold mb-4">Tier 02</div>

                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center">
                    <Crown className="w-5 h-5 text-[#FFB23E]" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-xl text-white">Pro</div>
                    <div className="text-xs text-white/40 font-medium">Growing groups</div>
                  </div>
                </div>

                <p className="text-sm text-white/50 leading-relaxed mb-6">{plans[1].desc}</p>

                {/* Price */}
                <div className="mb-2">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-5xl font-display font-bold text-white tracking-tight">
                      ${annual ? plans[1].annualPrice : plans[1].monthlyPrice}
                    </span>
                    <span className="text-sm text-white/30 font-medium">/ month</span>
                  </div>
                  <div className="h-5 mt-1">
                    {annual && (
                      <span className="text-xs font-bold text-[#FFB23E]">
                        Billed annually · save ${plans[1].savings}/yr
                      </span>
                    )}
                  </div>
                </div>

                {/* Free badge */}
                <div className="mb-6">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#FFB23E] text-[#0B1219]">
                    <Gift className="w-3 h-3" /> First 2 months free
                  </span>
                </div>

                {/* CTA */}
                <a
                  data-cta="book_demo"
                  data-position="pricing_pro"
                  href="https://app.solara.supermia.ai/"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-[#FF6A55] to-[#E54830] text-white hover:brightness-110 transition-all active:scale-[0.97] shadow-lg shadow-[#FF6A55]/30 mb-8"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </a>

                {/* Divider with label */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
                  <div className="relative flex justify-start">
                    <span className="pr-3 bg-transparent text-[10px] font-bold uppercase tracking-widest text-white/30" style={{ backgroundColor: 'transparent', textShadow: '0 0 20px rgba(11,18,25,1), 0 0 40px rgba(11,18,25,1)' }}>
                      Everything in Essentials, plus
                    </span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3.5">
                  {plans[1].features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="mt-0.5 flex-shrink-0 w-4.5 h-4.5 rounded-full bg-[#16C4B3]/15 flex items-center justify-center">
                        <Check className="w-3 h-3 text-[#16C4B3]" />
                      </div>
                      <span className="text-[13px] text-white/60 font-medium leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* ─── Enterprise Card ─── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="lg:col-span-4 relative group"
          >
            <div className="relative h-full rounded-[2rem] bg-white border border-slate-200/80 shadow-lg shadow-slate-200/40 p-8 transition-all duration-500 hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 overflow-hidden flex flex-col">
              {/* Subtle corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#FFB23E]/10 to-transparent pointer-events-none" />


              {/* Tier label */}
              <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#FF6A55] font-bold mb-4">Tier 03</div>

              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-slate-500" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-xl text-slate-900">Enterprise</div>
                    <div className="text-xs text-slate-400 font-medium">Multi-location</div>
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-500 leading-relaxed mb-6">{plans[2].desc}</p>

              {/* Price */}
              <div className="mb-2">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-5xl font-display font-bold text-slate-900 tracking-tight">
                    ${annual ? plans[2].annualPrice : plans[2].monthlyPrice}
                  </span>
                  <span className="text-sm text-slate-400 font-medium">/ location / mo</span>
                </div>
                <div className="h-5 mt-1">
                  {annual && (
                    <span className="text-xs font-bold text-[#FFB23E]">
                      Billed annually · save ${plans[2].savings}/yr
                    </span>
                  )}
                </div>
              </div>

              {/* Free badge */}
              <div className="mb-6">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#16C4B3]/10 text-[#0E8C80]">
                  <Gift className="w-3 h-3" /> First 2 months free
                </span>
              </div>

              {/* CTA */}
              <a
                data-cta="book_demo"
                data-position="pricing_enterprise"
                href="https://app.solara.supermia.ai/"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm bg-slate-900 text-white hover:bg-slate-800 transition-all active:scale-[0.97] mb-8"
              >
                Talk to sales
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Divider with label */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100" /></div>
                <div className="relative flex justify-start">
                  <span className="pr-3 bg-white text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Everything in Pro, plus
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3.5">
                {plans[2].features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <div className="mt-0.5 flex-shrink-0 w-4.5 h-4.5 rounded-full bg-[#FFB23E]/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-[#FFB23E]" />
                    </div>
                    <span className="text-[13px] text-slate-600 font-medium leading-snug">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Bottom trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 flex justify-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-x-8 gap-y-4 px-8 py-4 rounded-full bg-white/60 backdrop-blur-md border border-slate-200/60 shadow-sm">
            {[
              { text: "No setup fee", icon: Zap },
              { text: "Cancel anytime", icon: Clock },
              { text: "30-day money-back guarantee", icon: Shield },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 text-[14px] font-semibold text-slate-700">
                <div className="w-7 h-7 rounded-full bg-[#16C4B3]/15 flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-[#0E8C80]" />
                </div>
                {item.text}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
