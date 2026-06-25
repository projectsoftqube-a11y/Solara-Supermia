import { motion } from "motion/react";
import { Mail, Phone, ArrowUpRight, Sparkles, Activity, Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-[#02060A] text-[#FFF9F2] overflow-hidden pt-24 pb-8 sm:pt-32">
      {/* Top subtle glow edge */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FF6A55]/20 to-transparent" />

      {/* Background ambient light */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#FF6A55]/5 blur-[120px] pointer-events-none rounded-t-full" />

      {/* Spotlight for the logo */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white/5 blur-[100px] pointer-events-none rounded-br-full" />

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Brand Column */}
          <div className="flex flex-col items-start">
            {/* Logo with White Text */}
            <a
              href="/"
              className="relative mb-8 inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A55] rounded-sm ring-offset-4 ring-offset-[#02060A]"
            >
              <img
                src="/images/logo-white.svg"
                alt="Solara Dental AI"
                className="relative z-10 h-10 sm:h-12 w-auto hover:opacity-90 transition-opacity"
              />
            </a>

            <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-sm font-light">
              The complete AI front office, built specifically for dental clinics. Insurance,
              intake, booking, recall, and paperwork—handled automatically.
            </p>
          </div>

          {/* Product */}
          <div className="flex flex-col lg:pl-12">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFB23E] mb-6 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> Product
            </div>
            <ul className="space-y-4 text-slate-400">
              {[
                { label: "Pricing", href: "#pricing" },
                { label: "Everything it does", href: "#platform" },
                { label: "FAQ", href: "#faq" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm sm:text-base hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A55] rounded-md ring-offset-2 ring-offset-[#02060A]"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="https://app.solara.supermia.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm sm:text-base hover:text-[#FF6A55] transition-colors mt-2 font-medium"
                >
                  Log in{" "}
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFB23E] mb-6 flex items-center gap-2">
              <Activity className="w-3.5 h-3.5" /> Get in touch
            </div>
            <ul className="space-y-5 text-slate-400">
              <li>
                <a
                  href="mailto:hello@supermia.ai"
                  className="group inline-flex items-start gap-3 text-sm sm:text-base hover:text-white transition-colors"
                >
                  <div className="mt-0.5 p-1.5 rounded-md bg-white/5 group-hover:bg-[#FF6A55]/20 group-hover:text-[#FF6A55] transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-medium text-white mb-0.5">Email Support</div>
                    <div className="text-slate-500 text-sm">hello@supermia.ai</div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="tel:+15127333085"
                  className="group inline-flex items-start gap-3 text-sm sm:text-base hover:text-white transition-colors"
                >
                  <div className="mt-0.5 p-1.5 rounded-md bg-white/5 group-hover:bg-[#FF6A55]/20 group-hover:text-[#FF6A55] transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-medium text-white mb-0.5">Call Us</div>
                    <div className="text-slate-500 text-sm">+1 (512) 733-3085</div>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* Legal / Extra (HIDDEN) */}
          <div className="hidden">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFB23E] mb-6 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5" /> Legal
            </div>
            <ul className="space-y-4 text-slate-400">
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
                { label: "HIPAA Compliance", href: "/hipaa" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm sm:text-base hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A55] rounded-md ring-offset-2 ring-offset-[#02060A]"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Massive Typography Watermark */}
        <div className="relative w-full select-none flex justify-center pointer-events-none">
          <h2 className="text-[13vw] sm:text-[15vw] leading-normal p-[4vw] -my-[4vw] font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white/15 to-white/5 tracking-widest text-center">
            SOLARA
          </h2>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row gap-6 md:items-center justify-between text-slate-500 text-xs sm:text-sm">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
            <p>© {new Date().getFullYear()} Solara Dental AI</p>
            <p className="hidden sm:block text-white/20">|</p>
            <p>
              by{" "}
              <a
                href="https://supermia.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 font-bold hover:text-[#FF6A55] transition-colors"
              >
                SuperMIA
              </a>{" "}
              · Botfinity Inc.
            </p>
            <p className="hidden sm:block text-white/20">|</p>
            <p>All rights reserved.</p>
          </div>
          <p className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
            Made with{" "}
            <img
              src="/images/secondary-logo.svg"
              alt="Solara"
              className="h-4 w-auto drop-shadow-sm"
            />{" "}
            for dental teams.
          </p>
        </div>
      </div>
    </footer>
  );
}
