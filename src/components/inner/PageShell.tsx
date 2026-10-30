import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ComponentProps, CSSProperties, ReactNode } from "react";

import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";

/** Shared frame for every inner page: header, main landmark, footer. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#FFF9F2] selection:bg-[#FF6A55]/20">
      <SiteHeader solid />
      <main id="main">{children}</main>
      <Footer wide />
    </div>
  );
}

/** The one content width for inner pages: 1540px, inside full-bleed bands. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`container-page ${className}`}>{children}</div>;
}

export type Tone = "cream" | "white" | "sand" | "night";

const TONES: Record<Tone, string> = {
  cream: "bg-[#FFF9F2] text-slate-900",
  white: "bg-white text-slate-900",
  sand: "bg-[#FAF0DC] text-slate-900",
  night: "bg-[#060F14] text-white",
};

const SIZES = {
  /** Directly under the hero, whose rounded sheet already adds the space above. */
  flush: "pt-10 pb-20 sm:pt-14 sm:pb-28",
  sm: "py-14 sm:py-16",
  md: "py-20 sm:py-28 lg:py-36",
  lg: "py-28 sm:py-36 lg:py-48",
};

const GRID_LINES: CSSProperties = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
  backgroundSize: "80px 80px",
};

/** The home page's closing-section atmosphere, for dark heroes and bands. */
export function NightBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-[#173B42] via-[#0A1A1F] to-[#040A0C]" />
      <div className="absolute top-1/2 left-0 h-[1400px] w-[1400px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(255,106,85,0.2),transparent)]" />
      <div className="absolute top-1/3 right-0 h-[1400px] w-[1400px] translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(255,178,62,0.14),transparent)]" />
      <div className="absolute inset-0 opacity-[0.03]" style={GRID_LINES} />
    </div>
  );
}

/** A full-bleed colour band. Pair with Container for the content width. */
export function Band({
  tone = "cream",
  size = "md",
  className = "",
  children,
  ...props
}: ComponentProps<"section"> & { tone?: Tone; size?: keyof typeof SIZES }) {
  return (
    <section
      {...props}
      className={`relative isolate overflow-clip ${TONES[tone]} ${SIZES[size]} ${className}`}
    >
      {tone === "night" && <NightBackdrop />}
      {children}
    </section>
  );
}

/** Small uppercase section label, used above H1s and H2s. */
export function Eyebrow({ children, tone = "cream" }: { children: ReactNode; tone?: Tone }) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-[12px] font-bold tracking-[0.2em] uppercase ${
        tone === "night"
          ? "border-white/10 bg-white/5 text-[#FFB23E]"
          : "border-[#FF6A55]/25 bg-white/70 text-[#C13A22]"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${tone === "night" ? "bg-[#FFB23E]" : "bg-[#FF6A55]"}`}
        aria-hidden="true"
      />
      {children}
    </span>
  );
}

export function GradientText({ children, tone = "night" }: { children: ReactNode; tone?: Tone }) {
  return (
    <span
      className={`bg-gradient-to-r box-decoration-clone bg-clip-text pb-[0.08em] text-transparent ${
        tone === "night"
          ? "from-[#FF6A55] to-[#FFB23E]"
          : "from-[#C13A22] via-[#D2432D] to-[#D9761A]"
      }`}
    >
      {children}
    </span>
  );
}

/** Paints one phrase of a heading (by default its last two words). */
export function Highlighted({
  text,
  phrase = text.split(" ").slice(-2).join(" "),
  tone,
}: {
  text: string;
  phrase?: string;
  tone?: Tone;
}) {
  const at = text.lastIndexOf(phrase);
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <GradientText tone={tone}>{phrase}</GradientText>
      {text.slice(at + phrase.length)}
    </>
  );
}

/** Section heading group: eyebrow + H2 + optional intro. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  id,
  tone = "cream",
  highlight,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  id?: string;
  tone?: Tone;
  highlight?: string;
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-5xl text-center" : "max-w-5xl"}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2
        id={id}
        className="mt-6 scroll-mt-32 font-display text-[34px] leading-[1.06] font-extrabold tracking-[-0.025em] text-balance sm:text-5xl lg:text-[56px] xl:text-[64px]"
      >
        {highlight ? <Highlighted text={title} phrase={highlight} tone={tone} /> : title}
      </h2>
      {intro && (
        <p
          className={`mt-6 text-lg leading-relaxed sm:text-xl ${
            align === "center" ? "mx-auto max-w-3xl" : "max-w-3xl"
          } ${tone === "night" ? "text-slate-300" : "text-slate-600"}`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

const BUTTONS = {
  primary:
    "bg-gradient-to-r from-[#D2432D] to-[#C13A22] text-white shadow-[0_18px_50px_-14px_rgba(255,106,85,0.75)] hover:brightness-110",
  ghost: "border border-white/15 bg-white/5 text-white hover:bg-white/10",
  dark: "bg-[#0A1A1F] text-white hover:bg-[#173B42]",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof BUTTONS;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-base font-semibold transition ${BUTTONS[variant]}`}
    >
      {children}
      {variant !== "ghost" && (
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </Link>
  );
}
