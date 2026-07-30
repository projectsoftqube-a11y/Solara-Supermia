import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  Calendar as CalendarIcon,
  Check,
  Clock,
  Phone,
  ShieldCheck,
} from "lucide-react";

type Booking = {
  name?: string;
  phone?: string;
  date?: string;
  time?: string;
};

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Your Seat Is Confirmed | Solara Dental AI" },
      {
        name: "description",
        content:
          "Your place is secured. You will receive your Solara call at the time you selected.",
      },
      // Conversion pages shouldn't be indexed, they skew organic traffic data.
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ThankYouPage,
});

function ThankYouPage() {
  const router = useRouter();

  // Details are handed over through history state by /schedule-call. A direct
  // visit (or a refresh that drops state) still renders a valid thank-you page.
  const [booking, setBooking] = useState<Booking>({});

  useEffect(() => {
    const state = (router.history.location.state ?? {}) as { booking?: Booking };
    if (state.booking) setBooking(state.booking);
  }, [router]);

  const prettyDate = booking.date
    ? new Date(`${booking.date}T00:00:00`).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    : "";

  const firstName = booking.name ? booking.name.trim().split(" ")[0] : "";
  const hasDetails = Boolean(prettyDate && booking.time);

  return (
    // One centred column at every width, so no breakpoint can push content
    // out of view. The page scrolls naturally when it needs to.
    <div className="relative flex min-h-dvh flex-col bg-[#FFFBF6] selection:bg-[#FF6A55]/20">
      {/* ══ Ambient wash ══ */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(65% 55% at 8% 0%, rgba(255,168,46,0.42), transparent 62%)," +
              "radial-gradient(55% 50% at 92% 2%, rgba(255,106,85,0.28), transparent 62%)," +
              "radial-gradient(50% 45% at 98% 55%, rgba(22,196,179,0.16), transparent 62%)," +
              "radial-gradient(60% 50% at 4% 60%, rgba(255,106,85,0.24), transparent 64%)," +
              "radial-gradient(70% 45% at 50% 104%, rgba(255,168,46,0.24), transparent 64%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(15,23,42,0.045) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(15,23,42,0.045) 1px, transparent 1px)",
            backgroundSize: "46px 46px",
            maskImage: "radial-gradient(ellipse 80% 70% at 50% 42%, black 30%, transparent 82%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at 50% 42%, black 30%, transparent 82%)",
          }}
        />
      </div>

      {/* Hairline accent */}
      <div className="relative z-10 h-[3px] w-full shrink-0 bg-[#FF6A55]" />

      {/* ══ Header ══ */}
      <header className="relative z-10 flex shrink-0 items-center justify-between border-b border-slate-900/8 px-6 py-4 sm:px-10">
        <a href="/" className="flex items-center gap-2.5">
          <img src="/images/secondary-logo.svg" alt="" className="h-7 w-7" />
          <span className="font-display text-[15px] font-extrabold tracking-tight text-slate-950">
            Solara
          </span>
        </a>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#16C4B3]/12 px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#0B7A70] ring-1 ring-[#16C4B3]/30">
          <span className="h-1.5 w-1.5 rounded-full bg-[#16C4B3]" />
          Booking confirmed
        </span>
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center px-5 py-10 sm:px-6 sm:py-14">
        <div className="w-full max-w-[560px]">
          {/* ── Confirmation mark ── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center"
          >
            <span className="relative grid h-16 w-16 place-items-center">
              <motion.span
                aria-hidden="true"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.12, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 rounded-full bg-[#16C4B3]/12 ring-1 ring-[#16C4B3]/25"
              />
              <motion.span
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative grid h-11 w-11 place-items-center rounded-full bg-[#16C4B3] text-white shadow-[0_8px_22px_-6px_rgba(22,196,179,0.8)]"
              >
                <Check className="h-5 w-5" strokeWidth={3.5} />
              </motion.span>
            </span>

            <h1 className="mt-6 font-display text-[32px] font-extrabold leading-[1.04] tracking-[-0.025em] text-slate-950 sm:text-[42px]">
             Dr {firstName ? `${firstName}, your seat` : "Your seat"}
              <br />
              is secured.
            </h1>

            <p className="mx-auto mt-4 max-w-[420px] text-[14.5px] leading-relaxed text-slate-600">
              {hasDetails
                ? "Our AI Onboarding Concierge will personally call you at your preferred date and time to help you get started with Solara.​"
                : "Your line is reserved for the time below. Answer when it rings and you will see exactly what Solara does for a practice like yours."}
            </p>
          </motion.div>

          {/* ── Appointment ticket ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 overflow-hidden rounded-3xl border border-slate-900/10 bg-white shadow-[0_24px_60px_-30px_rgba(15,23,42,0.4)]"
          >
            {hasDetails ? (
              <>
                <div className="flex items-center justify-between border-b border-dashed border-slate-900/12 px-5 py-3 sm:px-6">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                    Held for you
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#16C4B3]/12 px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-[0.12em] text-[#0E8C80]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#16C4B3]" />
                    Locked in
                  </span>
                </div>

                {/* Time and date side by side, the two facts that matter most */}
                <div className="grid grid-cols-2 divide-x divide-slate-900/8">
                  <div className="px-5 py-5 sm:px-6">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                      <Clock className="h-3 w-3 text-[#FF6A55]" />
                      Time
                    </div>
                    <div className="mt-2 font-display text-[24px] font-extrabold leading-none tracking-tight text-slate-950 sm:text-[28px]">
                      {booking.time}
                    </div>
                    <div className="mt-1 text-[11.5px] font-bold text-slate-400">EST</div>
                  </div>
                  <div className="px-5 py-5 sm:px-6">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                      <CalendarIcon className="h-3 w-3 text-[#FF6A55]" />
                      Date
                    </div>
                    <div className="mt-2 font-display text-[16px] font-extrabold leading-tight tracking-tight text-slate-950 sm:text-[18px]">
                      {prettyDate}
                    </div>
                  </div>
                </div>

                {booking.phone && (
                  <div className="flex items-center justify-between gap-3 border-t border-slate-900/8 bg-[#FFFBF6] px-5 py-3.5 sm:px-6">
                    <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                      <Phone className="h-3.5 w-3.5 text-[#FF6A55]" />
                      Ringing
                    </span>
                    <span className="text-[14px] font-bold tracking-tight text-slate-950">
                      {booking.phone}
                    </span>
                  </div>
                )}
              </>
            ) : (
              /* No booking in history state: keep the card meaningful and
                 give the visitor a route back to booking. */
              <>
                <div className="flex items-center justify-between border-b border-dashed border-slate-900/12 px-5 py-3 sm:px-6">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-1000">
                    VIP Onboarding​
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#16C4B3]/12 px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-[0.12em] text-[#0E8C80]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#16C4B3]" />
                    Slot Confirmed​
                  </span>
                </div>
                <div className="px-5 py-5 sm:px-6">
                  <div className="font-display text-[20px] font-extrabold leading-tight tracking-tight text-slate-950">
                    We will be in touch shortly
                  </div>
                  <div className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
                    Our AI agent will call to confirm the time that suits you best.
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-slate-900/8 bg-[#FFFBF6] px-5 py-3.5 sm:px-6">
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                    Prefer to book now
                  </span>
                  <a
                    href="/schedule-call"
                    className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#FF6A55] transition-colors hover:text-[#E5482F]"
                  >
                    Pick a time
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </>
            )}
          </motion.div>


          {/* ── Actions ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-col items-center gap-3"
          >
            <a
              href="/"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-[13.5px] font-bold text-white transition hover:bg-slate-800 sm:w-auto sm:px-8"
            >
              Back to home
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <span className="text-center text-[12.5px] font-medium text-slate-600">
              Your line to us stays open.{" "}
              <a
                href="mailto:solara@supermia.ai"
                className="font-bold text-[#E5482F] underline underline-offset-2 decoration-[#E5482F]/30 transition-colors hover:decoration-[#E5482F]"
              >
                solara@supermia.ai
              </a>
            </span>
          </motion.div>
        </div>
      </main>

      {/* ══ Footer ══ */}
      <footer className="relative z-10 flex shrink-0 flex-wrap items-center justify-between gap-x-6 gap-y-1 border-t border-slate-900/8 px-6 py-3.5 sm:px-10">
        <span className="text-[11.5px] font-medium text-slate-400">
          Solara, the AI front office for dental practices.
        </span>
        <span className="flex items-center gap-4 text-[11.5px] font-medium text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-[#16C4B3]" />
            HIPAA compliant
          </span>
          <a
            href="mailto:solara@supermia.ai"
            className="font-semibold text-slate-500 underline-offset-2 transition-colors hover:text-[#FF6A55] hover:underline"
          >
            solara@supermia.ai
          </a>
        </span>
      </footer>
    </div>
  );
}
