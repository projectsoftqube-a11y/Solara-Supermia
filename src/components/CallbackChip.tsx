import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PhoneCall, X, Check } from "lucide-react";
import { CallbackRequestForm, type CallbackSubmittedInfo } from "./CallbackRequestForm";

// Rotating attention messages shown above the pill.
const NUDGE_MESSAGES = [
  "Thanks for visiting! Schedule a call.",
  "We're ready to call you back.",
  "Schedule your live practice demo.",
  "Speak with our dental specialist.",
  "Request a call in 30 seconds.",
];

export function CallbackChip() {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<CallbackSubmittedInfo | null>(null);
  const [nudgeIdx, setNudgeIdx] = useState(0);

  // Cycle the attention message every few seconds (paused while the modal is open).
  useEffect(() => {
    if (open) return;
    const timer = setInterval(() => {
      setNudgeIdx((i) => (i + 1) % NUDGE_MESSAGES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [open]);

  // Lock page scroll while the modal is open.
  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY;
    const bodyStyle = document.body.style;
    const htmlStyle = document.documentElement.style;
    const prevBodyOverflow = bodyStyle.overflow;
    const prevBodyPosition = bodyStyle.position;
    const prevBodyTop = bodyStyle.top;
    const prevBodyWidth = bodyStyle.width;
    const prevHtmlOverflow = htmlStyle.overflow;

    bodyStyle.overflow = "hidden";
    bodyStyle.position = "fixed";
    bodyStyle.top = `-${scrollY}px`;
    bodyStyle.width = "100%";
    htmlStyle.overflow = "hidden";

    return () => {
      bodyStyle.overflow = prevBodyOverflow;
      bodyStyle.position = prevBodyPosition;
      bodyStyle.top = prevBodyTop;
      bodyStyle.width = prevBodyWidth;
      htmlStyle.overflow = prevHtmlOverflow;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const closeModal = () => {
    setOpen(false);
    // Reset the success state shortly after the close animation
    setTimeout(() => setResult(null), 300);
  };

  // Human-friendly "when" string for the success screen.
  const prettyWhen = (() => {
    if (!result) return " shortly";
    const at = result.timeLabel ? ` at ${result.timeLabel} ET` : "";
    if (!result.dateLabel) return at || " shortly";
    return ` on ${result.dateLabel}${at}`;
  })();

  return (
    <>
      {/* ── Always-visible callback pill, bottom-left ── */}
      <div className="fixed bottom-6 left-6 z-50 temp-hidden">
        {/* Rotating attention nudge above the pill */}
        <div className="pointer-events-none absolute bottom-full left-1 mb-3 h-8 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={nudgeIdx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex h-8 w-max items-center gap-2 whitespace-nowrap rounded-full bg-[color:var(--foreground)] px-4 text-[12px] font-semibold tracking-tight text-white shadow-[0_8px_22px_rgba(15,23,42,0.22)]"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--primary)]" />
              {NUDGE_MESSAGES[nudgeIdx]}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.button
          type="button"
          onClick={() => setOpen(true)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Request a callback"
          className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--primary-hover)] py-2 pl-2 pr-5 text-white shadow-[0_14px_34px_rgba(249,115,22,0.42)] transition-shadow duration-300 hover:shadow-[0_18px_44px_rgba(249,115,22,0.55)]"
        >
          {/* Continuous auto shine sweep */}
          <motion.span
            aria-hidden="true"
            initial={{ x: "-200%" }}
            animate={{ x: "350%" }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/3 -skew-x-[20deg] bg-gradient-to-r from-transparent via-white/60 to-transparent"
          />

          {/* Extra shine on hover (glides across immediately when hovered) */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/3 -translate-x-[200%] -skew-x-[20deg] bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[350%]"
          />

          {/* Icon disc */}
          <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/20 backdrop-blur">
            {/* ringing phone shake */}
            <motion.span
              animate={{ rotate: [0, 0, -18, 16, -14, 12, -8, 6, 0, 0] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                repeatDelay: 1.6,
                ease: "easeInOut",
                times: [0, 0.15, 0.28, 0.4, 0.52, 0.64, 0.76, 0.86, 0.94, 1],
              }}
              style={{ originX: "50%", originY: "70%" }}
            >
              <PhoneCall className="h-5 w-5" strokeWidth={2.2} />
            </motion.span>
            {/* green available ping */}
            <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--success)] opacity-60" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-[color:var(--success)] ring-2 ring-white" />
            </span>
          </span>

          {/* Label */}
          <span className="relative text-left leading-tight">
            <span className="block text-[13px] font-bold">Request a callback</span>
            <span className="block text-[11px] font-medium text-white/80">We'll ring you back</span>
          </span>
        </motion.button>
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            aria-modal="true"
            role="dialog"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
              onClick={closeModal}
            />

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 grid max-h-[92vh] w-full max-w-190 grid-cols-1 overflow-hidden rounded-lg bg-[color:var(--card)] shadow-[0_30px_80px_rgba(15,23,42,0.28)] md:grid-cols-[0.85fr_1fr]"
            >
              <button
                onClick={closeModal}
                aria-label="Close"
                className="absolute right-4 top-4 z-30 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white md:bg-transparent md:text-[color:var(--muted-foreground)] md:hover:bg-[color:var(--muted)] md:hover:text-[color:var(--foreground)]"
              >
                <X className="h-4 w-4" />
              </button>

              {/* ── Left brand rail ── */}
              <div className="relative hidden overflow-hidden bg-[color:var(--surface-dark)] p-7 text-white md:flex md:flex-col justify-between">
                <div className="relative z-10 flex flex-col">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--primary)]">
                    Schedule Your Call
                  </span>

                  <h3 className="mt-2 font-display text-[26px] font-bold leading-[1.15]">
                    Thanks for reaching out!
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/70">
                    Pick a day and time that works best for you. One of our specialists will call
                    you back.
                  </p>

                  <div className="mt-5 border-t border-white/10 pt-4">
                    <div className="mb-3 text-xs font-bold text-white">Here's what you'll fix</div>
                    <ul className="space-y-3">
                      {[
                        { pain: "Missed calls", gain: "Every call answered, 24/7" },
                        { pain: "Hours on hold with carriers", gain: "Insurance & eligibility checked automatically" },
                        { pain: "Empty chairs", gain: "Recall list fills your schedule" },
                        { pain: "Front-desk overload", gain: "Intake & paperwork run themselves" },
                      ].map((item) => (
                        <li key={item.pain} className="flex items-start gap-2.5">
                          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[color:var(--primary)]/15 text-[color:var(--primary)]">
                            <Check className="h-3 w-3" strokeWidth={3} />
                          </span>
                          <div className="leading-tight">
                            <div className="text-xs font-semibold text-white">{item.gain}</div>
                            <div className="text-[11px] text-white/50 line-through decoration-white/30">
                              {item.pain}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <div className="flex items-center gap-3">
                    {/* stacked avatars */}
                    <div className="flex -space-x-2">
                      {["#F97316", "#16C4B3", "#38BDF8"].map((c, i) => (
                        <span
                          key={i}
                          className="grid h-7 w-7 place-items-center rounded-full text-[10px] font-bold text-white ring-2 ring-[color:var(--surface-dark)]"
                          style={{ backgroundColor: c }}
                        >
                          {["DR", "SM", "JK"][i]}
                        </span>
                      ))}
                    </div>
                    <div className="leading-tight">
                      <div className="flex items-center gap-1 text-xs font-semibold text-white">
                        <span className="text-[color:var(--primary)]">★★★★★</span>
                      </div>
                      <div className="text-[11px] text-white/60">Loved by 200+ dental teams</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Right form panel ── */}
              <div className="relative overflow-y-auto px-6 py-7 sm:px-8">
                {/* soft top glow */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-32"
                  style={{
                    background:
                      "radial-gradient(ellipse 70% 100% at 50% 0%, rgba(249,115,22,0.08), transparent 70%)",
                  }}
                />

                <AnimatePresence mode="wait">
                  {result ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex min-h-105 flex-col items-center justify-center py-6 text-center"
                    >
                      <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-[color:var(--success)]/12 text-[color:var(--success)]">
                        <Check className="h-8 w-8" strokeWidth={2.5} />
                      </div>
                      <h4 className="font-display text-xl font-bold text-[color:var(--foreground)]">
                        You're all set{result.name ? `, ${result.name.split(" ")[0]}` : ""}!
                      </h4>
                      <p className="mx-auto mt-2 max-w-70 text-sm leading-relaxed text-[color:var(--muted-foreground)]">
                        Our team will call you{prettyWhen}. Talk soon.
                      </p>
                      <button
                        onClick={closeModal}
                        className="mt-6 inline-flex items-center justify-center rounded-xl bg-[color:var(--foreground)] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--surface-dark-2)]"
                      >
                        Done
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative"
                    >
                      {/* Mobile-only header (left rail is hidden on mobile) */}
                      <div className="mb-5 md:hidden">
                        <h3 className="font-display text-2xl font-bold leading-tight text-[color:var(--foreground)]">
                          Let's get you booked in
                        </h3>
                        <p className="mt-1 text-sm text-[color:var(--muted-foreground)]">
                          Pick a time and our team will call you back.
                        </p>
                      </div>

                      <CallbackRequestForm
                        showEmail
                        onSubmitted={setResult}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
