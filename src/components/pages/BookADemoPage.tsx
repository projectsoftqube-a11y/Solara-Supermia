"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Check, Star, Clock, Video } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { Container, Eyebrow, GradientText, NightBackdrop } from "@/components/inner/PageShell";

const CALENDLY_URL = "https://calendly.com/solara-supermia/30min";

export function BookADemoPage() {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen overflow-x-clip bg-[#060F14] selection:bg-[#FF6A55]/20">
      <SiteHeader solid />

      <main id="main" className="relative isolate text-white">
        <NightBackdrop />

        <Container className="pt-32 pb-24 sm:pt-40 lg:pt-44 lg:pb-32">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-12 xl:gap-20">
            {/* ── LEFT: pitch ── */}
            <div className="min-w-0 lg:sticky lg:top-32 lg:col-span-5">
              <Eyebrow tone="night">Book your live demo</Eyebrow>

              <h1 className="mt-7 font-display text-[42px] leading-[1.03] font-extrabold tracking-[-0.03em] text-balance sm:text-6xl xl:text-[76px]">
                Supercharge your <GradientText>dental practice.</GradientText>
              </h1>

              <p className="mt-7 max-w-[620px] text-lg leading-relaxed text-slate-300 sm:text-xl">
                Every missed call is a lost patient. In just 20 minutes, watch Solara answer every
                call, verify insurance, and keep your chairs full — running live on your own setup.
              </p>

              {/* meeting meta */}
              <div className="mt-8 flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[14px] font-semibold text-white">
                  <Clock className="h-4 w-4 text-[#FFB23E]" />
                  30 minutes
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[14px] font-semibold text-white">
                  <Video className="h-4 w-4 text-[#FFB23E]" />
                  Google Meet / Zoom
                </span>
              </div>

              {/* three quick bullets */}
              <ul className="mt-9 space-y-3.5">
                {[
                  "Capture every call — even after hours",
                  "Turn empty chairs into booked revenue",
                  "Watch it run live on your own practice",
                ].map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-3 text-[17px] font-semibold text-slate-100"
                  >
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#16C4B3]" strokeWidth={2.5} />
                    {t}
                  </li>
                ))}
              </ul>

              {/* compact testimonial */}
              <div className="mt-10 flex items-center gap-3.5 rounded-3xl border border-white/10 bg-white/5 p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#C13A22] text-sm font-bold text-white">
                  R
                </span>
                <div className="min-w-0">
                  <div className="flex gap-0.5 text-[#FFB23E]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="mt-1 text-[15px] text-slate-300">
                    "Booked 22 new patients in our first week." —{" "}
                    <span className="font-semibold text-white">Dr. Ramirez</span>
                  </p>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Calendly scheduler ── */}
            <div className="min-w-0 overflow-hidden rounded-[32px] bg-white shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)] ring-1 ring-white/15 lg:col-span-7">
              <CalendlyEmbed
                url={CALENDLY_URL}
                className="h-[820px] sm:h-[760px] lg:h-[760px]"
                onEventScheduled={() => router.push("/booking-confirmed")}
              />
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
