import { motion } from "motion/react";
import { Download, FileText, Check, ArrowRight } from "lucide-react";

// Drop your PDF at public/brochure/ and keep this filename (or tell Claude to change it).
const BROCHURE_URL = "/brochure/solara-brochure.pdf";

const INSIDE = [
  "Every job Solara runs across your practice, explained",
  "Pricing, plans, and what onboarding looks like",
  "How the OpenDental sync works, step by step",
];

export function Brochure() {
  return (
    <section id="brochure" className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[36px] border border-[#F0E6D8] bg-gradient-to-br from-[#FFF9F2] via-white to-[#FFF4EB] px-6 py-12 shadow-[0_30px_70px_-30px_rgba(255,106,85,0.35)] sm:px-14 sm:py-14"
        >
          {/* soft decorative glows */}
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[#FFB23E]/15 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-[#FF6A55]/10 blur-[100px]" />

          <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_auto]">
            {/* ── Copy ── */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#FF6A55]/25 bg-white px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#FF6A55] shadow-sm">
                <FileText className="h-3.5 w-3.5" /> The brochure
              </span>

              <h2 className="mt-5 font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl">
                Want the whole picture
                <span className="block bg-gradient-to-r from-[#FF6A55] to-[#FFB23E] bg-clip-text text-transparent">
                  in one place?
                </span>
              </h2>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-slate-600">
                Read it over coffee, share it with your team, or bring it to your next partner
                meeting. Everything Solara does, on paper.
              </p>

              <ul className="mt-7 space-y-3">
                {INSIDE.map((t) => (
                  <li key={t} className="flex items-center gap-3 text-[15px] font-medium text-slate-700">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#FF6A55]/12 text-[#FF6A55]">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={BROCHURE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6A55] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#FF6A55]/25 transition hover:-translate-y-0.5 hover:bg-[#E5482F] hover:shadow-xl"
                >
                  <Download className="h-4 w-4" />
                  Get the brochure
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <span className="text-sm font-medium text-slate-400">PDF · opens instantly</span>
              </div>
            </div>

            {/* ── Brochure mockup ── */}
            <div className="relative mx-auto hidden lg:block">
              {/* back sheet */}
              <div className="absolute left-4 top-4 h-72 w-56 rotate-6 rounded-2xl border border-slate-200 bg-white shadow-lg" />
              {/* front cover */}
              <motion.div
                initial={{ rotate: -6 }}
                whileHover={{ rotate: -2, y: -4 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="relative flex h-72 w-56 flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-[#FF7A4D] to-[#E5482F] p-6 text-white shadow-2xl ring-1 ring-white/20"
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/15 blur-2xl" />
                <div className="flex items-center justify-between">
                  <FileText className="h-7 w-7" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">
                    2026
                  </span>
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                    Solara
                  </div>
                  <div className="mt-1 font-display text-xl font-extrabold leading-tight">
                    Your entire practice, fully automated.
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-medium text-white/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/70" /> PDF · 2 min read
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
