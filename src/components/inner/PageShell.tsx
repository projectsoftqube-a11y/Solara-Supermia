import type { ReactNode } from "react";

import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";

/** Shared frame for every inner page: header, main landmark, footer. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#FAF8F4] selection:bg-[#FF6A55]/20">
      <SiteHeader />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}

/** Horizontal page container used by every inner-page section. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}

/** Small uppercase section label, used above H2s. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#FF6A55]/20 bg-[#FFF0EB] px-3 py-1.5 text-[11px] font-bold tracking-[0.16em] text-[#C13A22] uppercase">
      <span className="h-1.5 w-1.5 rounded-full bg-[#FF6A55]" aria-hidden="true" />
      {children}
    </span>
  );
}

/** Section heading pair: eyebrow + H2 + optional intro. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  id,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  id?: string;
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2
        id={id}
        className="mt-4 font-display text-3xl leading-[1.1] font-bold tracking-tight text-balance text-slate-900 sm:text-4xl"
      >
        {title}
      </h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-slate-600">{intro}</p>}
    </div>
  );
}
