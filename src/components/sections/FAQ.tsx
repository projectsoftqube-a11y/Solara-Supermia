"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowUpRight } from "lucide-react";

import { homeFaqs as faqs } from "@/content/faqs";

export function FAQ() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedIdx !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedIdx]);

  return (
    <section id="faq" className="relative overflow-hidden bg-[#FAF0DC] py-20 md:py-28">
      {/* Decorative background blur */}
      <div className="pointer-events-none absolute top-0 right-1/4 h-[600px] w-[600px] rounded-full bg-[#FF6A55]/5 blur-[100px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 font-display text-3xl leading-tight font-bold text-slate-900 sm:text-4xl lg:text-5xl"
          >
            Questions Dental Teams Ask Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg leading-relaxed text-slate-600"
          >
            Short answers to the questions that come up before clinics go live.
          </motion.p>
        </div>

        {/* Clean, static Grid of Questions */}
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-3">
          {faqs.map((faq, idx) => (
            <motion.details
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.03 }}
              className="h-full"
            >
              {/* The card opens the pop-up instead of expanding in place. */}
              <summary
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedIdx(idx);
                }}
                className="group flex h-full min-h-[140px] cursor-pointer list-none flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6A55]/40 hover:shadow-lg hover:shadow-[#FF6A55]/5 sm:p-8 [&::-webkit-details-marker]:hidden"
              >
                <h3 className="pr-4 text-[15px] leading-snug font-bold text-slate-800 transition-colors group-hover:text-[#FF6A55] sm:text-[17px]">
                  {faq.question}
                </h3>

                <div className="mt-6 flex items-center gap-1.5 text-sm font-bold text-[#FF6A55] transition-all">
                  Read more{" "}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </summary>
              {/* Kept in the server HTML so search and answer engines can read
                  every answer (and match the FAQPage data); shown in the pop-up. */}
              <p>{faq.answer}</p>
            </motion.details>
          ))}
        </div>
      </div>

      {/* Pop-up Modal overlay */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedIdx(null)}
              className="absolute inset-0 cursor-pointer bg-[#0A1A1F]/60 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.15 }}
              className="relative w-full max-w-2xl cursor-default overflow-hidden rounded-[2rem] bg-white p-8 shadow-2xl sm:rounded-[3rem] sm:p-12"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedIdx(null)}
                className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900 sm:top-8 sm:right-8"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mt-2 mb-6 font-mono text-[11px] font-bold tracking-[0.2em] text-[#FFB23E] uppercase">
                Answer
              </div>

              <h3 className="mb-6 pr-8 font-display text-2xl leading-tight font-bold text-slate-900 sm:text-3xl">
                {faqs[selectedIdx].question}
              </h3>

              <div className="mb-8 h-1 w-12 rounded-full bg-[#FF6A55]/30" />

              <p className="text-lg leading-relaxed text-slate-600 sm:text-xl">
                {faqs[selectedIdx].answer}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
