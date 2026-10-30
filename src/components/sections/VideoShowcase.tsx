"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Play, Pause, Sparkles, Volume2, VolumeX } from "lucide-react";

type Stat = { value: string; label: string };

type VideoShowcaseProps = {
  id: string;
  eyebrow: string;
  title: string;
  highlight: string;
  titleAfter?: string;
  description: string;
  src: string;
  poster?: string;
  theme?: "light" | "dark";
  stats?: Stat[];
};

export function VideoShowcase({
  id,
  eyebrow,
  title,
  highlight,
  titleAfter,
  description,
  src,
  poster,
  theme = "light",
  stats = [],
}: VideoShowcaseProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const isDark = theme === "dark";

  // Without an explicit poster, paint the frame at 0.5s so the player isn't blank before play.
  const videoSrc = poster || src.includes("#") ? src : `${src}#t=0.5`;

  const handlePlay = () => {
    const v = videoRef.current;
    document.querySelectorAll("video").forEach((el) => {
      if (el !== v) el.pause();
    });
    setIsPlaying(true);
    setHasStarted(true);
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
    } else {
      v.pause();
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  return (
    <section
      id={id}
      className={`relative overflow-hidden section-pad ${
        isDark ? "bg-[#0B1120]" : "bg-gradient-to-b from-[#FFF9F2] via-white to-[#FAF0DC]/40"
      }`}
    >
      {/* Decorative ambience */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-[900px] w-[900px] -translate-x-1/2 rounded-full opacity-[0.18] blur-[140px]"
        style={{
          background: isDark
            ? "radial-gradient(circle, #FF6A55 0%, transparent 60%)"
            : "radial-gradient(circle, #FF6A55 0%, transparent 65%)",
        }}
      />
      <div
        className="pointer-events-none absolute right-0 bottom-0 h-[600px] w-[600px] rounded-full opacity-[0.15] blur-[120px]"
        style={{ background: "radial-gradient(circle, #16C4B3 0%, transparent 60%)" }}
      />
      {isDark && <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.04]" />}

      <div className="relative z-10 container-content">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-12 max-w-3xl text-center sm:mb-16"
        >
          <span
            className={`mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold tracking-[0.18em] uppercase shadow-sm ${
              isDark
                ? "border border-white/15 bg-white/10 text-[#FFB23E] backdrop-blur-md"
                : "border border-[#E8E5D8] bg-white text-[#FF6A55]"
            }`}
          >
            <Sparkles size={14} /> {eyebrow}
          </span>
          <h2
            className={`mb-5 font-display text-4xl leading-[1.08] font-bold tracking-tight sm:text-5xl lg:text-6xl ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            {title}{" "}
            <span className="relative whitespace-nowrap text-[#FF6A55]">
              {highlight}
              <svg
                className="absolute -bottom-2 left-0 h-3 w-full text-[#FFB23E]/40"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 50 10 100 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            {titleAfter ? ` ${titleAfter}` : ""}
          </h2>
          <p
            className={`text-lg leading-relaxed font-medium sm:text-xl ${
              isDark ? "text-slate-300" : "text-slate-600"
            }`}
          >
            {description}
          </p>
        </motion.div>

        {/* Video frame */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="relative mx-auto max-w-5xl"
        >
          {/* Glow ring behind player */}
          <div
            className="pointer-events-none absolute -inset-4 rounded-[40px] opacity-60 blur-2xl sm:-inset-6"
            style={{
              background:
                "linear-gradient(120deg, rgba(255,106,85,0.35), rgba(255,178,62,0.20), rgba(22,196,179,0.30))",
            }}
          />

          <div
            className={`relative overflow-hidden rounded-[28px] border shadow-[0_40px_80px_-20px_rgba(15,23,42,0.45)] sm:rounded-[32px] ${
              isDark ? "border-white/10 bg-[#0F172A]" : "border-white bg-white"
            }`}
          >
            {/* Browser chrome bar */}
            <div
              className={`flex items-center gap-2 border-b px-5 py-3.5 ${
                isDark ? "border-white/10 bg-[#0B1120]" : "border-slate-100 bg-[#FBFAF7]"
              }`}
            >
              <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
              <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
              <span className="h-3 w-3 rounded-full bg-[#28C840]" />
              <div
                className={`ml-3 hidden items-center gap-2 rounded-full px-3.5 py-1 text-[11px] font-semibold sm:flex ${
                  isDark
                    ? "bg-white/5 text-slate-400"
                    : "border border-slate-100 bg-white text-slate-400"
                }`}
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#16C4B3]" />
                app.solara.supermia.ai
              </div>
            </div>

            {/* Video */}
            <div className="group relative aspect-video bg-black">
              <video
                ref={videoRef}
                src={videoSrc}
                poster={poster}
                playsInline
                preload="metadata"
                onClick={togglePlay}
                onPlay={handlePlay}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                className="h-full w-full object-cover"
              />

              {/* Play overlay (before first play) */}
              {!hasStarted && (
                <button
                  onClick={togglePlay}
                  aria-label="Play video"
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 via-black/10 to-black/20 transition-opacity"
                >
                  <span className="relative flex items-center justify-center">
                    <span className="absolute h-24 w-24 animate-ping rounded-full bg-[#FF6A55]/40" />
                    <span className="absolute h-20 w-20 rounded-full bg-white/20 backdrop-blur-sm" />
                    <span className="relative flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#FF6A55] shadow-[0_12px_32px_rgba(255,106,85,0.5)] transition-transform duration-300 group-hover:scale-110">
                      <Play className="ml-1 h-7 w-7 text-white" fill="currentColor" />
                    </span>
                  </span>
                </button>
              )}

              {/* Floating control bar (after start) */}
              {hasStarted && (
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/55 px-2.5 py-2 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                  <button
                    onClick={togglePlay}
                    aria-label={isPlaying ? "Pause" : "Play"}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4" fill="currentColor" />
                    ) : (
                      <Play className="ml-0.5 h-4 w-4" fill="currentColor" />
                    )}
                  </button>
                  <button
                    onClick={toggleMute}
                    aria-label={isMuted ? "Unmute" : "Mute"}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </button>
                </div>
              )}

              {/* Corner badge */}
              <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-[11px] font-bold tracking-wider text-white uppercase backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF6A55]" /> Live demo
              </div>
            </div>
          </div>

          {/* Stat badges */}
          {stats.length > 0 && (
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                  className={`rounded-2xl border px-4 py-4 text-center ${
                    isDark
                      ? "border-white/10 bg-white/[0.04] backdrop-blur-sm"
                      : "border-slate-200/60 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
                  }`}
                >
                  <div
                    className={`mb-0.5 font-display text-2xl font-bold sm:text-3xl ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {s.value}
                  </div>
                  <div
                    className={`text-xs font-medium ${
                      isDark ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
