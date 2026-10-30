import { CalendarClock, CircleCheck } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

import {
  ButtonLink,
  Container,
  Eyebrow,
  Highlighted,
  NightBackdrop,
} from "@/components/inner/PageShell";
import type { HeroFact } from "@/content/feature-visuals";
import type { Photo } from "@/content/photos";

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

export function LastUpdated({ date }: { date: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-[13px] font-medium text-slate-400">
      <CalendarClock className="h-4 w-4 text-[#16C4B3]" aria-hidden="true" />
      Last updated <time dateTime={date}>{formatDate(date)}</time>
    </span>
  );
}

type PageHeroProps = {
  eyebrow: string;
  title: string;
  /** The phrase of the H1 painted with the brand gradient. */
  highlight?: string;
  /** 40–60 word standalone answer to the page's core question. */
  answer: string;
  updated: string;
  image?: Photo;
  /** Floating labels on the image. */
  chips?: readonly string[];
  /** Pinned over the bottom of the image, e.g. plan availability. */
  imageNote?: ReactNode;
  /** Replaces the image with a custom panel. */
  visual?: ReactNode;
  actions?: ReactNode;
  /** Stat tiles along the bottom of the hero. */
  facts?: HeroFact[];
  /** Extra full-width content, e.g. topic links. */
  children?: ReactNode;
};

function titleSize(title: string, split: boolean) {
  if (!split) return "text-[42px] sm:text-6xl lg:text-7xl xl:text-[88px]";
  if (title.length > 56) return "text-[36px] sm:text-5xl lg:text-[50px] xl:text-[62px]";
  return "text-[40px] sm:text-[56px] lg:text-[58px] xl:text-[74px]";
}

export function PageHero({
  eyebrow,
  title,
  highlight,
  answer,
  updated,
  image,
  chips,
  imageNote,
  visual,
  actions,
  facts,
  children,
}: PageHeroProps) {
  const side = visual ?? (image && <HeroImage image={image} chips={chips} note={imageNote} />);

  return (
    <section className="relative isolate overflow-clip bg-[#060F14] text-white">
      <NightBackdrop />

      <Container className="pt-32 pb-24 sm:pt-40 sm:pb-28 lg:pt-44 lg:pb-32">
        <div className={side ? "grid items-center gap-14 lg:grid-cols-12 lg:gap-12 xl:gap-20" : ""}>
          <div className={side ? "min-w-0 lg:col-span-7" : ""}>
            <Eyebrow tone="night">{eyebrow}</Eyebrow>

            <h1
              className={`mt-7 font-display leading-[1.03] font-extrabold tracking-[-0.03em] text-balance ${titleSize(title, Boolean(side))}`}
            >
              <Highlighted text={title} phrase={highlight} />
            </h1>

            <p className="answer-block mt-7 max-w-[860px] text-lg leading-relaxed text-slate-300 sm:text-xl lg:text-[21px]">
              {answer}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3.5">
              {actions ?? <HeroActions />}
            </div>

            <div className="mt-7">
              <LastUpdated date={updated} />
            </div>
          </div>

          {side && <div className="min-w-0 lg:col-span-5">{side}</div>}
        </div>

        {children}

        {facts && <FactStrip facts={facts} />}
      </Container>

      {/* The next section slides up over the hero as a rounded sheet. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-8 rounded-t-[32px] bg-[#FFF9F2] sm:h-12 sm:rounded-t-[48px]"
      />
    </section>
  );
}

function HeroImage({
  image,
  chips,
  note,
}: {
  image: Photo;
  chips?: readonly string[];
  note?: ReactNode;
}) {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-16 bg-[radial-gradient(closest-side,rgba(255,106,85,0.28),rgba(22,196,179,0.08)_65%,transparent)]"
      />
      <div className="relative overflow-hidden rounded-[32px] ring-1 ring-white/15">
        <Image
          src={image.src}
          alt={image.alt}
          width={1024}
          height={1024}
          priority
          sizes="(min-width: 1668px) 600px, (min-width: 1024px) 42vw, 100vw"
          className="aspect-[5/4] h-auto w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#060F14]/80 via-transparent to-transparent"
        />
      </div>
      {note && (
        <div className="relative z-10 mx-3 -mt-14 rounded-3xl border border-white/10 bg-[#0A1A1F]/95 p-5 sm:mx-6">
          {note}
        </div>
      )}

      {chips?.map((chip, i) => (
        <span
          key={chip}
          className={`absolute hidden items-center gap-2.5 rounded-2xl border border-white/15 bg-[#0A1A1F]/95 px-4 py-3 text-sm font-semibold whitespace-nowrap text-white shadow-[0_18px_40px_-18px_rgba(0,0,0,0.8)] sm:inline-flex ${
            i === 0
              ? "float-chip top-8 -left-5 xl:-left-10"
              : "float-chip-late top-1/3 -right-3 xl:-right-6"
          }`}
        >
          <CircleCheck className="h-4 w-4 text-[#16C4B3]" aria-hidden="true" />
          {chip}
        </span>
      ))}
    </div>
  );
}

function FactStrip({ facts }: { facts: HeroFact[] }) {
  return (
    <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-[28px] bg-white/10 ring-1 ring-white/10 lg:mt-20 lg:grid-cols-4">
      {facts.map((fact) => (
        <div
          key={fact.label}
          className="flex flex-col-reverse justify-end gap-2 bg-[#0A1A1F]/90 p-5 sm:p-7"
        >
          <dt className="text-[13px] leading-snug text-slate-300 sm:text-[15px]">{fact.label}</dt>
          <dd className="font-display text-2xl leading-tight font-extrabold tracking-tight text-white sm:text-[32px] xl:text-[38px]">
            {fact.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function HeroActions() {
  return (
    <>
      <ButtonLink href="/book-a-demo">Book a 20-min demo</ButtonLink>
      <ButtonLink href="/pricing" variant="ghost">
        See pricing
      </ButtonLink>
    </>
  );
}
