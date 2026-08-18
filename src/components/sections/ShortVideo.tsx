import { useState } from "react";
import { motion } from "motion/react";
import { Play, Sparkles, Clock, Volume2, Check, ArrowRight } from "lucide-react";

/**
 * A single vertical YouTube Short, presented in a phone-style frame.
 *
 * The iframe is only mounted after the visitor clicks, so YouTube's player
 * scripts never load on first paint. Until then we show the poster image
 * straight from YouTube's thumbnail CDN.
 */
const BEATS = [
  "A patient calls after hours, and Solara picks up on the first ring.",
  "It finds an open slot and books the appointment on the call.",
  "The chart updates in OpenDental before the call even ends.",
];

const VIDEO_ID = "39giuJlNFTI";
const POSTER = `https://i.ytimg.com/vi/${VIDEO_ID}/oardefault.jpg`;
const POSTER_FALLBACK = `https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`;

export function ShortVideo() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="short" className="py-20 md:py-28 bg-[#FDFBF7]">
      <div className="mx-auto w-full max-w-[1080px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
          {/* ── Copy ── */}
          <div className="mx-auto max-w-lg text-center lg:mx-0 lg:max-w-none lg:text-left">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FF6A55]/20 bg-[#FF6A55]/5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#FF6A55] shadow-sm">
              <Sparkles size={14} /> 60-second look
            </span>

            <h2 className="mb-5 font-display text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl">
              Solara in under
              <br />
              <span className="text-slate-500">a minute.</span>
            </h2>

            <p className="text-lg font-medium leading-relaxed text-slate-600">
              No demo booking, no sign-up. Press play and watch a real call turn
              into a booked appointment.
            </p>

            {/* What the clip actually shows, so the section carries weight
                even before anyone presses play. */}
            <ul className="mt-7 space-y-3 text-left">
              {BEATS.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#FF6A55]/10 text-[#FF6A55]">
                    <Check className="h-3 w-3" strokeWidth={3.5} />
                  </span>
                  <span className="text-[15px] font-medium leading-relaxed text-slate-700">
                    {b}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 border-t border-slate-900/8 pt-6 lg:justify-start">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500">
                <Clock className="h-4 w-4 text-[#FF6A55]" />
                Under a minute
              </span>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500">
                <Volume2 className="h-4 w-4 text-[#FF6A55]" />
                Sound on
              </span>
              <a
                href="/schedule-call"
                className="group inline-flex items-center gap-1.5 text-sm font-bold text-[#FF6A55] transition-colors hover:text-[#E5482F]"
              >
                Book a live demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          {/* ── Player ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-[300px] sm:w-[320px] lg:w-[340px]"
          >
            {/* warm glow behind the phone */}
            <div className="pointer-events-none absolute -inset-6 rounded-[48px] bg-gradient-to-br from-[#FF6A55]/20 via-[#FFB23E]/10 to-transparent blur-2xl" />

            <div className="relative overflow-hidden rounded-[32px] border border-slate-200/70 bg-slate-950 shadow-[0_30px_70px_-20px_rgba(15,23,42,0.45)]">
              {/* 9:16 vertical frame */}
              <div className="relative aspect-[9/16] w-full">
                {playing ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&playsinline=1&modestbranding=1`}
                    title="Solara in under a minute"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full border-0"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setPlaying(true)}
                    aria-label="Play video: Solara in under a minute"
                    className="group absolute inset-0 h-full w-full cursor-pointer"
                  >
                    <img
                      src={POSTER}
                      alt=""
                      loading="lazy"
                      onError={(e) => {
                        // oardefault is missing on some Shorts; fall back.
                        const img = e.currentTarget;
                        if (img.src !== POSTER_FALLBACK) img.src = POSTER_FALLBACK;
                      }}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* scrim so the button reads on any thumbnail */}
                    <span className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-slate-950/30" />

                    {/* play button */}
                    <span className="absolute left-1/2 top-1/2 grid h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 shadow-[0_10px_30px_-6px_rgba(15,23,42,0.5)] backdrop-blur transition-transform duration-300 group-hover:scale-110">
                      <Play
                        className="ml-1 h-7 w-7 text-[#FF6A55]"
                        fill="currentColor"
                        strokeWidth={0}
                      />
                    </span>

                    <span className="absolute inset-x-0 bottom-0 p-5 text-center">
                      <span className="block text-[15px] font-bold text-white drop-shadow">
                        Tap to play
                      </span>
                      <span className="mt-0.5 block text-[12px] font-medium text-white/70">
                        Watch the front desk run itself
                      </span>
                    </span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
