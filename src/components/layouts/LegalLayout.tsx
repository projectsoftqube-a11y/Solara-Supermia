import { ReactNode, useEffect, useRef, useState } from "react";
import { SiteHeader } from "../SiteHeader";
import { Footer } from "../sections/Footer";
import { ChevronRight, ChevronDown, ArrowUp, ListOrdered, Mail, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export type LegalSection = {
  id: string;
  title: string;
  content: ReactNode;
};

interface LegalLayoutProps {
  title: string;
  eyebrow?: string;
  intro?: string;
  lastUpdated: string;
  sections: LegalSection[];
  contactEmail?: string;
}

export function LegalLayout({
  title,
  eyebrow = "Legal",
  intro,
  lastUpdated,
  sections,
  contactEmail = "privacy@supermia.ai",
}: LegalLayoutProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const [tocOpen, setTocOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Reading progress, back-to-top visibility, and table-of-contents scroll-spy.
  useEffect(() => {
    // Distance from the viewport top at which a section counts as "current".
    const ACTIVATION_OFFSET = 140;

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0);
      setShowTop(window.scrollY > 600);

      // Active section = the last one whose top has passed the activation line.
      let current = sections[0]?.id ?? "";
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= ACTIVATION_OFFSET) current = s.id;
        else break;
      }

      // At the very bottom, always highlight the final section — otherwise a
      // short last section can never reach the activation line.
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 2) {
        current = sections[sections.length - 1]?.id ?? current;
      }

      setActiveId(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  const jumpTo = (id: string) => {
    setTocOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    // overflow-x-clip (not -hidden): `hidden` creates a scroll container that
    // would break position: sticky on the sidebar below.
    <div className="min-h-screen bg-[#FAF8F4] selection:bg-[#FF6A55]/20 overflow-x-clip">
      {/* Reading progress */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-[#FF6A55] via-[#FFB23E] to-[#16C4B3] transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <SiteHeader />

      <main className="relative pt-24 sm:pt-32 lg:pt-36 pb-16 sm:pb-24">
        {/* Ambient background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-[15%] -left-[20%] w-[70%] h-[45%] rounded-full bg-gradient-to-br from-[#FFB23E]/20 to-[#FF6A55]/5 blur-[100px]" />
          <div className="absolute top-[25%] -right-[20%] w-[60%] h-[50%] rounded-full bg-gradient-to-bl from-[#16C4B3]/12 to-transparent blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
          {/* ---------- Hero ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 sm:mb-14"
          >
            {/* Breadcrumb */}
            <nav className="flex flex-wrap items-center gap-1.5 text-[12px] sm:text-sm font-medium mb-5">
              <a href="/" className="text-slate-500 hover:text-[#FF6A55] transition-colors">
                Home
              </a>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              <span className="text-slate-500">{eyebrow}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              <span className="text-slate-900 font-semibold">{title}</span>
            </nav>

            <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] border border-white/60 bg-gradient-to-br from-white via-white to-[#FFF6EC] p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.18)]">
              <div className="pointer-events-none absolute -top-20 -right-16 w-56 h-56 rounded-full bg-gradient-to-br from-[#FF6A55]/15 to-transparent blur-3xl" />

              <span className="relative inline-flex items-center gap-2 rounded-full bg-[#FFF0EB] border border-[#FF6A55]/20 px-3 py-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-[#FF6A55] mb-5">
                <ShieldCheck className="w-3.5 h-3.5" />
                {eyebrow}
              </span>

              <h1 className="relative font-display font-black tracking-tight text-slate-900 leading-[1.1] text-[27px] sm:text-5xl lg:text-6xl mb-4 break-words">
                {title}
              </h1>

              {intro && (
                <p className="relative text-[15px] sm:text-lg text-slate-600 leading-relaxed max-w-2xl mb-6">
                  {intro}
                </p>
              )}

              <div className="relative flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3.5 py-2 text-[11px] sm:text-xs font-semibold text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16C4B3]" />
                  Last updated: {lastUpdated}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-3.5 py-2 text-[11px] sm:text-xs font-semibold text-slate-600">
                  <ListOrdered className="w-3.5 h-3.5 text-[#FF6A55]" />
                  {sections.length} sections
                </span>
              </div>
            </div>
          </motion.div>

          {/* ---------- Mobile TOC ---------- */}
          <div className="lg:hidden mb-8 sticky top-[72px] z-30">
            <button
              onClick={() => setTocOpen((v) => !v)}
              className="flex w-full items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/95 backdrop-blur px-4 py-3.5 shadow-sm"
              aria-expanded={tocOpen}
            >
              <span className="flex items-center gap-2.5 min-w-0">
                <ListOrdered className="w-4 h-4 text-[#FF6A55] shrink-0" />
                <span className="text-[13px] font-bold text-slate-900 truncate">
                  {sections.find((s) => s.id === activeId)?.title ?? "Contents"}
                </span>
              </span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${tocOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {tocOpen && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden mt-2 rounded-2xl border border-slate-200 bg-white shadow-lg"
                >
                  {sections.map((s, i) => (
                    <li key={s.id} className="border-b border-slate-100 last:border-0">
                      <button
                        onClick={() => jumpTo(s.id)}
                        className={`flex w-full items-center gap-3 px-4 py-3 text-left text-[13px] font-medium transition-colors ${
                          activeId === s.id
                            ? "text-[#FF6A55] bg-[#FFF6F3]"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <span className="text-[11px] font-bold text-slate-300 w-4 shrink-0">
                          {i + 1}
                        </span>
                        <span className="min-w-0 break-words">{s.title}</span>
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* ---------- Body ---------- */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            {/* Desktop sidebar */}
            <aside className="hidden lg:block lg:col-span-3 sticky top-28">
              <div className="rounded-[24px] border border-slate-200/70 bg-white/80 backdrop-blur p-6 shadow-[0_12px_32px_-12px_rgba(15,23,42,0.12)]">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#FF6A55] mb-5">
                  Contents
                </h3>
                <nav className="flex flex-col">
                  {sections.map((s, i) => {
                    const active = activeId === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => jumpTo(s.id)}
                        className={`group relative flex w-full items-start gap-3 border-l-2 px-4 py-2.5 text-left text-[14px] transition-colors ${
                          active
                            ? "border-[#FF6A55] text-slate-900 font-semibold"
                            : "border-slate-200 font-medium text-slate-500 hover:border-slate-300 hover:text-slate-900"
                        }`}
                      >
                        <span
                          className={`text-[11px] font-bold w-4 shrink-0 pt-0.5 ${
                            active ? "text-[#FF6A55]" : "text-slate-300"
                          }`}
                        >
                          {i + 1}
                        </span>
                        <span className="leading-snug">{s.title}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Content */}
            <div ref={contentRef} className="lg:col-span-9 min-w-0 space-y-5 sm:space-y-7">
              {sections.map((s, i) => (
                <motion.section
                  key={s.id}
                  id={s.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="scroll-mt-28 rounded-[20px] sm:rounded-[28px] border border-slate-200/70 bg-white p-5 sm:p-8 lg:p-10 shadow-[0_10px_30px_-15px_rgba(15,23,42,0.12)] transition-shadow hover:shadow-[0_20px_45px_-20px_rgba(15,23,42,0.18)]"
                >
                  <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5">
                    <span className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF6A55] to-[#FFB23E] text-[13px] sm:text-base font-black text-white shadow-md shadow-[#FF6A55]/25">
                      {i + 1}
                    </span>
                    <h2 className="font-display font-bold text-slate-900 tracking-tight leading-snug text-[19px] sm:text-2xl lg:text-[28px] pt-0.5 min-w-0 break-words">
                      {s.title}
                    </h2>
                  </div>

                  {/* Body copy styling lives in styles.css (.legal-content) —
                      this project has no @tailwindcss/typography plugin. */}
                  <div className="legal-content pl-0 sm:pl-14">{s.content}</div>
                </motion.section>
              ))}

              {/* Contact card */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-[20px] sm:rounded-[28px] bg-[#0F172A] p-6 sm:p-10 text-center sm:text-left"
              >
                <div className="pointer-events-none absolute -top-16 -right-10 w-52 h-52 rounded-full bg-gradient-to-br from-[#FF6A55]/25 to-transparent blur-3xl" />
                <div className="relative flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
                  <span className="mx-auto sm:mx-0 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 border border-white/15">
                    <Mail className="w-5 h-5 text-[#FFB23E]" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display font-bold text-white text-lg sm:text-xl mb-1.5">
                      Questions about this policy?
                    </h3>
                    <p className="text-[14px] text-slate-400 leading-relaxed break-words">
                      Our compliance team is happy to help clarify anything on this page.
                    </p>
                  </div>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6A55] px-5 py-3 text-[14px] font-bold text-white shadow-lg shadow-[#FF6A55]/25 transition-colors hover:bg-[#FF8569] whitespace-nowrap"
                  >
                    Contact us
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="fixed bottom-5 right-4 sm:bottom-8 sm:right-8 z-40 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white border border-slate-200 shadow-xl text-slate-700 hover:text-[#FF6A55] hover:border-[#FF6A55]/30 transition-colors"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
