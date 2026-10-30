import { ArrowRight, CalendarClock, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { Container, Eyebrow } from "@/components/inner/PageShell";
import type { Crumb } from "@/lib/seo/schema";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

/** "2026-10-30" → "October 30, 2026", without reading the clock. */
export function formatDate(iso: string) {
  return dateFormat.format(new Date(`${iso}T00:00:00Z`));
}

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-[13px] font-medium text-slate-600">
        {crumbs.map((crumb, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="font-semibold text-slate-800">
                  {crumb.name}
                </span>
              ) : (
                <>
                  <Link href={crumb.path} className="transition-colors hover:text-[#C13A22]">
                    {crumb.name}
                  </Link>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-300" aria-hidden="true" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function LastUpdated({ date }: { date: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-[13px] font-medium text-slate-600">
      <CalendarClock className="h-4 w-4 text-[#16C4B3]" aria-hidden="true" />
      Last updated <time dateTime={date}>{formatDate(date)}</time>
    </span>
  );
}

type PageHeroProps = {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  /** 40–60 word standalone answer to the page's core question. */
  answer: string;
  updated: string;
  image?: { src: string; alt: string };
  /** Shown under the image, e.g. plan availability. */
  aside?: ReactNode;
  actions?: ReactNode;
};

export function PageHero({
  crumbs,
  eyebrow,
  title,
  answer,
  updated,
  image,
  aside,
  actions,
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20">
      {/* Ambient backdrop: warm glow, teal accent, fading grid. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-32 h-[520px] w-[520px] rounded-full bg-[#FFB23E]/20 blur-[120px]" />
        <div className="absolute top-10 right-[-10%] h-[440px] w-[440px] rounded-full bg-[#FF6A55]/12 blur-[120px]" />
        <div className="absolute right-[20%] bottom-[-30%] h-[360px] w-[360px] rounded-full bg-[#16C4B3]/10 blur-[120px]" />
        <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,black,transparent_75%)] opacity-70" />
      </div>

      <Container>
        <Breadcrumbs crumbs={crumbs} />

        <div
          className={`mt-8 grid items-center gap-12 ${image ? "lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-16" : ""}`}
        >
          <div className="max-w-3xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="mt-5 font-display text-[34px] leading-[1.06] font-extrabold tracking-tight text-balance text-slate-900 sm:text-5xl lg:text-[56px]">
              {title}
            </h1>

            <div className="answer-block relative mt-7 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/85 p-5 shadow-[0_12px_40px_-18px_rgba(15,23,42,0.18)] backdrop-blur-sm sm:p-6">
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#FF6A55] via-[#FFB23E] to-[#16C4B3]"
              />
              <p className="text-[11px] font-bold tracking-[0.18em] text-[#C13A22] uppercase">
                In short
              </p>
              <p className="mt-2 text-[16px] leading-relaxed text-slate-700 sm:text-[17px]">
                {answer}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {actions ?? <HeroActions />}
            </div>

            <div className="mt-6">
              <LastUpdated date={updated} />
            </div>
          </div>

          {image && (
            <div className="relative">
              <div className="relative overflow-hidden rounded-[28px] border border-white bg-white shadow-[0_40px_80px_-40px_rgba(15,23,42,0.45)] ring-1 ring-slate-900/5">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1024}
                  height={1024}
                  priority
                  sizes="(min-width: 1024px) 520px, 100vw"
                  className="aspect-[4/3.4] h-auto w-full object-cover"
                />
              </div>
              {aside && (
                <div className="relative z-10 mx-4 -mt-10 rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.35)] backdrop-blur sm:mx-8">
                  {aside}
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

export function HeroActions() {
  return (
    <>
      <Link
        href="/book-a-demo"
        className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_12px_30px_-12px_rgba(15,23,42,0.6)] transition hover:bg-slate-800"
      >
        Book a 20-min demo
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </Link>
      <Link
        href="/pricing"
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-[15px] font-semibold text-slate-800 transition hover:border-[#FF6A55]/40 hover:text-[#C13A22]"
      >
        See pricing
      </Link>
    </>
  );
}
