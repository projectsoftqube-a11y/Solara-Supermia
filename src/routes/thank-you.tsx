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

const NEXT_STEPS = [
  {
    title: "Your practice is reviewed before the call",
    desc: "The conversation starts already knowing your numbers.",
  },
  {
    title: "Two months, entirely on us",
    desc: "Go fully live before a single bill reaches you.",
  },
  {
    title: "Built by hand, around you",
    desc: "No hidden fees, no setup costs, no surprises.",
  },
];

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
    // Locked to the viewport: the page never scrolls, content is sized to fit.
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-[#FFFBF6] selection:bg-[#FF6A55]/20">
      {/* Hairline accent along the very top edge */}
      <div className="h-[3px] w-full shrink-0 bg-[#FF6A55]" />

      {/* ══ Header rail ══ */}
      <header className="flex shrink-0 items-center justify-between border-b border-slate-900/8 px-6 py-4 sm:px-10">
        <a href="/" className="flex items-center gap-2.5">
          <img src="/images/secondary-logo.svg" alt="" className="h-7 w-7" />
          <span className="font-display text-[15px] font-extrabold tracking-tight text-slate-950">
            Solara
          </span>
        </a>
        <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          Booking confirmed
        </span>
      </header>

      {/* Two full-height columns: ivory editorial left, white panel right */}
      <main className="grid flex-1 overflow-hidden lg:grid-cols-[1.05fr_0.95fr]">
        {/* ── LEFT: the confirmation ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col justify-center overflow-hidden px-6 py-8 sm:px-10 lg:pl-[max(2.5rem,calc((100vw-1080px)/2))]"
        >
          {/* faint editorial rule work, no glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.55]"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(15,23,42,0.05) 1px, transparent 1px)",
              backgroundSize: "72px 100%",
              maskImage: "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
            }}
          />
          <div className="relative">
            <div className="flex items-center gap-2.5">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#16C4B3] text-white">
                <Check className="h-3.5 w-3.5" strokeWidth={3.5} />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Confirmed
              </span>
            </div>

            <h1 className="mt-5 font-display text-[34px] font-extrabold leading-[1.03] tracking-[-0.02em] text-slate-950 sm:text-[46px] lg:text-[52px]">
              {firstName ? `${firstName}, your seat` : "Your seat"}
              <br />
              is secured.
            </h1>

            <p className="mt-5 max-w-[430px] text-[15px] leading-relaxed text-slate-600">
              {hasDetails
                ? "Your line is reserved for the time below. Answer when it rings and you will see exactly what Solara does for a practice like yours."
                : "Your place is held. Expect your call shortly to lock in the time that suits you."}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href="/"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-[13.5px] font-bold text-white transition hover:bg-slate-800"
              >
                Back to home
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <span className="text-[12.5px] text-slate-500">
                Need a different time?{" "}
                <a
                  href="mailto:solara@supermia.ai"
                  className="font-semibold text-[#FF6A55] underline-offset-2 hover:underline"
                >
                  solara@supermia.ai
                </a>
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── RIGHT: appointment + what follows ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-center overflow-hidden border-slate-900/8 bg-white px-6 py-8 sm:px-10 lg:border-l lg:pr-[max(2.5rem,calc((100vw-1080px)/2))]"
        >
          <div className="w-full max-w-100">
            {hasDetails && (
              <div className="overflow-hidden rounded-2xl border border-slate-900/10 bg-[#FFFBF6]">
                {/* Ticket header */}
                <div className="flex items-center justify-between border-b border-dashed border-slate-900/12 px-5 py-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                    Held for you
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#16C4B3]/12 px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-[0.12em] text-[#0E8C80]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#16C4B3]" />
                    Locked in
                  </span>
                </div>

                {/* Hero value: the appointment itself */}
                <div className="px-5 pb-5 pt-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                    <CalendarIcon className="h-3 w-3 text-[#FF6A55]" />
                    Your appointment
                  </div>
                  <div className="mt-2 font-display text-[26px] font-extrabold leading-none tracking-tight text-slate-950">
                    {booking.time}
                    <span className="ml-1.5 text-[13px] font-bold text-slate-400">EST</span>
                  </div>
                  <div className="mt-1.5 text-[13.5px] font-semibold text-slate-600">
                    {prettyDate}
                  </div>
                </div>

                {/* Callback number */}
                {booking.phone && (
                  <div className="flex items-center justify-between gap-3 border-t border-slate-900/8 bg-white px-5 py-3.5">
                    <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                      <Phone className="h-3.5 w-3.5 text-[#FF6A55]" />
                      Ringing
                    </span>
                    <span className="text-[14px] font-bold tracking-tight text-slate-950">
                      {booking.phone}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* What follows, tied to the card above by a shared column rule */}
            <div className={hasDetails ? "mt-8" : ""}>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  What follows
                </span>
                <span className="h-px flex-1 bg-slate-900/10" />
              </div>

              <ol className="mt-4 space-y-0">
                {NEXT_STEPS.map((item, i) => (
                  <motion.li
                    key={item.title}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.22 + i * 0.07,
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="relative flex gap-3.5 pb-4 last:pb-0"
                  >
                    {/* connecting rail */}
                    {i < NEXT_STEPS.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="absolute left-2.5 top-4.5 bottom-0 w-px bg-slate-900/10"
                      />
                    )}
                    <span className="relative z-10 mt-0.75 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white font-mono text-[9.5px] font-bold text-[#FF6A55] ring-1 ring-inset ring-[#FF6A55]/30">
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="text-[13.5px] font-bold leading-snug text-slate-900">
                        {item.title}
                      </div>
                      <div className="mt-0.5 text-[12.5px] leading-relaxed text-slate-500">
                        {item.desc}
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </motion.div>
      </main>

      {/* ══ Footer rail ══ */}
      <footer className="flex shrink-0 flex-wrap items-center justify-between gap-x-6 gap-y-1 border-t border-slate-900/8 px-6 py-3.5 sm:px-10">
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
