"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "motion/react";
import { Check, Star, Clock, Video } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";

const CALENDLY_URL = "https://calendly.com/solara-supermia/30min";

export function BookADemoPage() {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white selection:bg-[#FF6A55]/20">
      <SiteHeader />

      <main className="relative overflow-x-clip pt-32 pb-28 lg:pt-40">
        {/* clean light background */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div
            className="absolute inset-x-0 top-0 h-[420px]"
            style={{
              background:
                "radial-gradient(ellipse 70% 100% at 50% 0%, rgba(249,115,22,0.06), transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-[1180px] px-4 sm:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
            {/* ── LEFT: pitch ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:sticky lg:top-32"
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-[#FF6A55]" />
                <span className="text-[13px] font-semibold tracking-[0.16em] text-[#FF6A55] uppercase">
                  Book your live demo
                </span>
              </div>

              <h1 className="font-display text-[32px] leading-[1.08] font-bold tracking-[-0.02em] text-slate-900 sm:text-[44px] lg:text-[50px]">
                Supercharge your{" "}
                <span className="bg-gradient-to-r from-[#FF6A55] to-[#FFB23E] bg-clip-text text-transparent">
                  dental practice.
                </span>
              </h1>

              <p className="mt-5 max-w-md text-[16px] leading-relaxed text-slate-600 sm:text-[17px]">
                Every missed call is a lost patient. In just 20 minutes, watch Solara answer every
                call, verify insurance, and keep your chairs full — running live on your own setup.
              </p>

              {/* meeting meta */}
              <div className="mt-7 flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600">
                  <Clock className="h-3.5 w-3.5 text-[#FF6A55]" />
                  30 minutes
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600">
                  <Video className="h-3.5 w-3.5 text-[#FF6A55]" />
                  Google Meet / Zoom
                </span>
              </div>

              {/* three quick bullets */}
              <ul className="mt-8 space-y-3">
                {[
                  "Capture every call — even after hours",
                  "Turn empty chairs into booked revenue",
                  "Watch it run live on your own practice",
                ].map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-3 text-[15px] font-semibold text-slate-800"
                  >
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#FF6A55]" strokeWidth={2.5} />
                    {t}
                  </li>
                ))}
              </ul>

              {/* compact testimonial */}
              <div className="mt-9 flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#FF6A55] text-sm font-bold text-white">
                  R
                </span>
                <div className="min-w-0">
                  <div className="flex gap-0.5 text-[#FFB23E]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="mt-0.5 text-sm text-slate-500">
                    "Booked 22 new patients in our first week." —{" "}
                    <span className="font-semibold text-slate-700">Dr. Ramirez</span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ── RIGHT: Calendly scheduler ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_20px_50px_-12px_rgba(15,23,42,0.14)] sm:rounded-[28px]"
            >
              <CalendlyEmbed
                url={CALENDLY_URL}
                className="h-[820px] sm:h-[760px] lg:h-[700px]"
                onEventScheduled={() => router.push("/booking-confirmed")}
              />
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
