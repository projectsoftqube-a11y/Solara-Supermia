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
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full blur-[140px] opacity-[0.18]"
        style={{
          background: isDark
            ? "radial-gradient(circle, #FF6A55 0%, transparent 60%)"
            : "radial-gradient(circle, #FF6A55 0%, transparent 65%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.15]"
        style={{ background: "radial-gradient(circle, #16C4B3 0%, transparent 60%)" }}
      />
      {isDark && (
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.04]" />
      )}

      <div className="container-content relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <span
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] mb-6 shadow-sm ${
              isDark
                ? "bg-white/10 border border-white/15 text-[#FFB23E] backdrop-blur-md"
                : "bg-white border border-[#E8E5D8] text-[#FF6A55]"
            }`}
          >
            <Sparkles size={14} /> {eyebrow}
          </span>
          <h2
            className={`font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-tight mb-5 ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            {title}{" "}
            <span className="relative whitespace-nowrap text-[#FF6A55]">
              {highlight}
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-[#FFB23E]/40"
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
            className={`text-lg sm:text-xl font-medium leading-relaxed ${
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
            className="absolute -inset-4 sm:-inset-6 rounded-[40px] opacity-60 blur-2xl pointer-events-none"
            style={{
              background:
                "linear-gradient(120deg, rgba(255,106,85,0.35), rgba(255,178,62,0.20), rgba(22,196,179,0.30))",
            }}
          />

          <div
            className={`relative rounded-[28px] sm:rounded-[32px] overflow-hidden border shadow-[0_40px_80px_-20px_rgba(15,23,42,0.45)] ${
              isDark ? "border-white/10 bg-[#0F172A]" : "border-white bg-white"
            }`}
          >
            {/* Browser chrome bar */}
            <div
              className={`flex items-center gap-2 px-5 py-3.5 border-b ${
                isDark ? "border-white/10 bg-[#0B1120]" : "border-slate-100 bg-[#FBFAF7]"
              }`}
            >
              <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <span className="w-3 h-3 rounded-full bg-[#28C840]" />
              <div
                className={`ml-3 hidden sm:flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-semibold ${
                  isDark ? "bg-white/5 text-slate-400" : "bg-white text-slate-400 border border-slate-100"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#16C4B3] animate-pulse" />
                app.solara.supermia.ai
              </div>
            </div>

            {/* Video */}
            <div className="relative aspect-video bg-black group">
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
                className="w-full h-full object-cover"
              />

              {/* Play overlay (before first play) */}
              {!hasStarted && (
                <button
                  onClick={togglePlay}
                  aria-label="Play video"
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 via-black/10 to-black/20 transition-opacity"
                >
                  <span className="relative flex items-center justify-center">
                    <span className="absolute w-24 h-24 rounded-full bg-[#FF6A55]/40 animate-ping" />
                    <span className="absolute w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm" />
                    <span className="relative flex items-center justify-center w-[72px] h-[72px] rounded-full bg-[#FF6A55] shadow-[0_12px_32px_rgba(255,106,85,0.5)] transition-transform duration-300 group-hover:scale-110">
                      <Play className="w-7 h-7 text-white ml-1" fill="currentColor" />
                    </span>
                  </span>
                </button>
              )}

              {/* Floating control bar (after start) */}
              {hasStarted && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-2.5 py-2 rounded-full bg-black/55 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={togglePlay}
                    aria-label={isPlaying ? "Pause" : "Play"}
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4" fill="currentColor" />
                    ) : (
                      <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                    )}
                  </button>
                  <button
                    onClick={toggleMute}
                    aria-label={isMuted ? "Unmute" : "Mute"}
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>
              )}

              {/* Corner badge */}
              <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/15 text-[11px] font-bold uppercase tracking-wider text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A55]" /> Live demo
              </div>
            </div>
          </div>

          {/* Stat badges */}
          {stats.length > 0 && (
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                  className={`rounded-2xl px-4 py-4 text-center border ${
                    isDark
                      ? "bg-white/[0.04] border-white/10 backdrop-blur-sm"
                      : "bg-white border-slate-200/60 shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
                  }`}
                >
                  <div
                    className={`text-2xl sm:text-3xl font-display font-bold mb-0.5 ${
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
