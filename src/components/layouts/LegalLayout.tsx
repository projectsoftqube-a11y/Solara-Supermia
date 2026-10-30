"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { ChevronDown, ArrowUp, ListOrdered, Mail } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Container, Eyebrow, Highlighted, NightBackdrop } from "@/components/inner/PageShell";

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
    <div className="min-h-screen overflow-x-clip bg-[#FFF9F2] selection:bg-[#FF6A55]/20">
      {/* Reading progress */}
      <div className="fixed top-0 right-0 left-0 z-[60] h-[3px] bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-[#FF6A55] via-[#FFB23E] to-[#16C4B3] transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <SiteHeader solid />

      <main id="main" className="relative pb-20 sm:pb-28">
        <section className="relative isolate overflow-clip bg-[#060F14] text-white">
          <NightBackdrop />
          <Container className="pt-32 pb-24 sm:pt-40 sm:pb-28 lg:pt-44 lg:pb-32">
            <Eyebrow tone="night">{eyebrow}</Eyebrow>

            <h1 className="mt-7 font-display text-[42px] leading-[1.03] font-extrabold tracking-[-0.03em] text-balance sm:text-6xl lg:text-7xl xl:text-[88px]">
              <Highlighted text={title} />
            </h1>

            {intro && (
              <p className="mt-7 max-w-[860px] text-lg leading-relaxed text-slate-300 sm:text-xl lg:text-[21px]">
                {intro}
              </p>
            )}

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[13px] font-semibold text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-[#16C4B3]" aria-hidden="true" />
                Last updated: {lastUpdated}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[13px] font-semibold text-white">
                <ListOrdered className="h-3.5 w-3.5 text-[#FFB23E]" aria-hidden="true" />
                {sections.length} sections
              </span>
            </div>
          </Container>

          {/* The body slides up over the hero as a rounded sheet. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-8 rounded-t-[32px] bg-[#FFF9F2] sm:h-12 sm:rounded-t-[48px]"
          />
        </section>

        <Container className="relative z-10 pt-8 sm:pt-12">
          {/* ---------- Mobile TOC ---------- */}
          <div className="sticky top-[72px] z-30 mb-8 lg:hidden">
            <button
              onClick={() => setTocOpen((v) => !v)}
              className="flex w-full items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/95 px-4 py-3.5 shadow-sm backdrop-blur"
              aria-expanded={tocOpen}
            >
              <span className="flex min-w-0 items-center gap-2.5">
                <ListOrdered className="h-4 w-4 shrink-0 text-[#FF6A55]" />
                <span className="truncate text-[13px] font-bold text-slate-900">
                  {sections.find((s) => s.id === activeId)?.title ?? "Contents"}
                </span>
              </span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${tocOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {tocOpen && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg"
                >
                  {sections.map((s, i) => (
                    <li key={s.id} className="border-b border-slate-100 last:border-0">
                      <button
                        onClick={() => jumpTo(s.id)}
                        className={`flex w-full items-center gap-3 px-4 py-3 text-left text-[13px] font-medium transition-colors ${
                          activeId === s.id
                            ? "bg-[#FFF6F3] text-[#FF6A55]"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <span className="w-4 shrink-0 text-[11px] font-bold text-slate-300">
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
          <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-14">
            {/* Desktop sidebar */}
            <aside className="sticky top-28 hidden lg:col-span-3 lg:block">
              <div className="rounded-[24px] border border-slate-200/70 bg-white/80 p-6 shadow-[0_12px_32px_-12px_rgba(15,23,42,0.12)] backdrop-blur">
                <p className="mb-5 font-display text-[11px] font-bold tracking-[0.18em] text-[#FF6A55] uppercase">
                  Contents
                </p>
                <nav className="flex flex-col">
                  {sections.map((s, i) => {
                    const active = activeId === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => jumpTo(s.id)}
                        className={`group relative flex w-full items-start gap-3 border-l-2 px-4 py-2.5 text-left text-[14px] transition-colors ${
                          active
                            ? "border-[#FF6A55] font-semibold text-slate-900"
                            : "border-slate-200 font-medium text-slate-500 hover:border-slate-300 hover:text-slate-900"
                        }`}
                      >
                        <span
                          className={`w-4 shrink-0 pt-0.5 text-[11px] font-bold ${
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
            <div ref={contentRef} className="min-w-0 space-y-5 sm:space-y-7 lg:col-span-9">
              {sections.map((s, i) => (
                <motion.section
                  key={s.id}
                  id={s.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="scroll-mt-28 rounded-[20px] border border-slate-200/70 bg-white p-5 shadow-[0_10px_30px_-15px_rgba(15,23,42,0.12)] transition-shadow hover:shadow-[0_20px_45px_-20px_rgba(15,23,42,0.18)] sm:rounded-[28px] sm:p-8 lg:p-10"
                >
                  <div className="mb-4 flex items-start gap-3 sm:mb-5 sm:gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF6A55] to-[#FFB23E] text-[13px] font-black text-white shadow-md shadow-[#FF6A55]/25 sm:h-10 sm:w-10 sm:text-base">
                      {i + 1}
                    </span>
                    <h2 className="min-w-0 pt-0.5 font-display text-[19px] leading-snug font-bold tracking-tight break-words text-slate-900 sm:text-2xl lg:text-[28px]">
                      {s.title}
                    </h2>
                  </div>

                  {/* Body copy styling lives in styles.css (.legal-content) —
                      this project has no @tailwindcss/typography plugin. */}
                  <div className="legal-content max-w-[920px] pl-0 sm:pl-14">{s.content}</div>
                </motion.section>
              ))}

              {/* Contact card */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-[20px] bg-[#0F172A] p-6 text-center sm:rounded-[28px] sm:p-10 sm:text-left"
              >
                <div className="pointer-events-none absolute -top-16 -right-10 h-52 w-52 rounded-full bg-gradient-to-br from-[#FF6A55]/25 to-transparent blur-3xl" />
                <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
                  <span className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 sm:mx-0">
                    <Mail className="h-5 w-5 text-[#FFB23E]" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-1.5 font-display text-lg font-bold text-white sm:text-xl">
                      Questions about this policy?
                    </h3>
                    <p className="text-[14px] leading-relaxed break-words text-slate-400">
                      Our compliance team is happy to help clarify anything on this page.
                    </p>
                  </div>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6A55] px-5 py-3 text-[14px] font-bold whitespace-nowrap text-white shadow-lg shadow-[#FF6A55]/25 transition-colors hover:bg-[#FF8569]"
                  >
                    Contact us
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
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
            className="fixed right-4 bottom-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-xl transition-colors hover:border-[#FF6A55]/30 hover:text-[#FF6A55] sm:right-8 sm:bottom-8 sm:h-12 sm:w-12"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <Footer wide />
    </div>
  );
}
