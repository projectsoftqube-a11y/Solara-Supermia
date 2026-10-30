import { ArrowRight, ArrowUpRight, Check, MessageCircleQuestion, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, type ComponentType, type ReactNode } from "react";

import {
  Band,
  ButtonLink,
  Container,
  Eyebrow,
  Highlighted,
  SectionHeading,
  type Tone,
} from "@/components/inner/PageShell";
import type { Faq } from "@/content/faqs";
import type { Citation, ContentSection, Step } from "@/content/features";
import type { Photo } from "@/content/photos";
import { plans, type Plan } from "@/content/plans";

/** Stable in-page anchor for a heading. */
export const anchorId = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const COLUMNS: Record<number, string> = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-3 xl:grid-cols-5",
};

/**
 * Numbered with a CSS counter rather than text, so the list reads as plain
 * sentences to speakable and answer engines.
 */
export function KeyTakeaways({
  items,
  title = "Key takeaways",
}: {
  items: string[];
  title?: string;
}) {
  return (
    <Band tone="cream" size="flush" aria-labelledby="key-takeaways">
      <Container>
        <h2
          id="key-takeaways"
          className="font-display text-[34px] leading-[1.06] font-extrabold tracking-[-0.025em] sm:text-5xl"
        >
          {title}
        </h2>
        <ul
          className={`key-takeaways mt-10 grid gap-5 [counter-reset:takeaway] sm:grid-cols-2 ${COLUMNS[items.length] ?? COLUMNS[4]}`}
        >
          {items.map((item) => (
            <li
              key={item}
              className="reveal flex flex-col gap-8 rounded-[28px] bg-white p-7 text-[17px] leading-relaxed text-slate-700 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.35)] ring-1 ring-slate-900/5 [counter-increment:takeaway] before:bg-gradient-to-r before:from-[#C13A22] before:to-[#D9761A] before:bg-clip-text before:font-display before:text-[44px] before:leading-none before:font-extrabold before:text-transparent before:content-[counter(takeaway,decimal-leading-zero)] first:bg-gradient-to-br first:from-[#0A1A1F] first:to-[#173B42] first:text-white first:before:from-[#FF6A55] first:before:to-[#FFB23E] sm:p-8"
            >
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </Band>
  );
}

const STORY_TONES: Tone[] = ["white", "cream", "night"];

/** The answer card in photo-less sections, one step off the band behind it. */
const CARD_TONES: Record<Tone, string> = {
  white: "bg-[#FFF9F2] ring-slate-900/5",
  cream: "bg-white ring-slate-900/5 shadow-[0_32px_64px_-48px_rgba(15,23,42,0.45)]",
  sand: "bg-white ring-slate-900/5",
  night: "bg-white/5 ring-white/10",
};

/** Bands cycle; a dark band never sits directly before the dark steps section. */
function storyTone(index: number, total: number): Tone {
  const tone = STORY_TONES[index % STORY_TONES.length];
  return tone === "night" && index === total - 1 ? "white" : tone;
}

function Bullets({ items, night }: { items: string[]; night: boolean }) {
  return (
    <ul className="mt-8 grid gap-3 sm:grid-cols-2">
      {items.map((bullet) => (
        <li
          key={bullet}
          className={`flex items-start gap-3 rounded-2xl p-4 text-[15.5px] leading-snug ring-1 ${
            night
              ? "bg-white/5 text-slate-200 ring-white/10"
              : "bg-slate-900/[0.03] text-slate-700 ring-slate-900/5"
          }`}
        >
          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#16C4B3]/20">
            <Check
              className={`h-3 w-3 ${night ? "text-[#5EEAD4]" : "text-[#0B7A70]"}`}
              strokeWidth={3}
              aria-hidden="true"
            />
          </span>
          {bullet}
        </li>
      ))}
    </ul>
  );
}

function StoryHeading({
  section,
  order,
  night,
}: {
  section: ContentSection;
  order: string;
  night: boolean;
}) {
  return (
    <>
      <span
        aria-hidden="true"
        className={`font-mono text-[13px] font-bold tracking-[0.2em] uppercase ${
          night ? "text-[#FF9E8D]" : "text-[#C13A22]"
        }`}
      >
        {order}
      </span>
      <h2
        id={anchorId(section.heading)}
        className="mt-4 scroll-mt-32 font-display text-[32px] leading-[1.06] font-extrabold tracking-[-0.025em] text-balance sm:text-[44px] xl:text-[54px]"
      >
        {section.heading}
      </h2>
    </>
  );
}

function StoryCopy({ section, night }: { section: ContentSection; night: boolean }) {
  return (
    <>
      <div className="space-y-5">
        {section.paragraphs.map((paragraph, i) => (
          <p
            key={i}
            className={
              i === 0
                ? `text-xl leading-relaxed sm:text-[22px] ${night ? "text-white" : "text-slate-800"}`
                : `text-[17px] leading-[1.75] ${night ? "text-slate-300" : "text-slate-600"}`
            }
          >
            {paragraph}
          </p>
        ))}
      </div>
      {section.bullets && <Bullets items={section.bullets} night={night} />}
    </>
  );
}

/**
 * Long-form body as a run of full-width bands. Every other section sits beside
 * a photo from `images`; the rest pair a sticky question with the answer.
 */
export function StorySections({
  sections,
  images = [],
  insert,
}: {
  sections: ContentSection[];
  images?: Photo[];
  /** Extra content (e.g. a table) rendered right after a section. */
  insert?: { afterSection: number; node: ReactNode };
}) {
  return sections.map((section, index) => {
    const tone = storyTone(index, sections.length);
    const night = tone === "night";
    const image = index % 2 === 0 ? images[index / 2] : undefined;
    const flip = index % 4 === 2;
    const order = `${String(index + 1).padStart(2, "0")} / ${String(sections.length).padStart(2, "0")}`;

    return (
      <Band key={section.heading} tone={tone} aria-labelledby={anchorId(section.heading)}>
        <Container>
          {image ? (
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
              <div className={`min-w-0 ${flip ? "lg:order-2" : ""}`}>
                <StoryHeading section={section} order={order} night={night} />
                <div className="mt-7">
                  <StoryCopy section={section} night={night} />
                </div>
              </div>
              <div className={`reveal ${flip ? "lg:order-1" : ""}`}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1024}
                  height={1024}
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="aspect-[5/4] h-auto w-full rounded-[32px] object-cover shadow-[0_40px_80px_-48px_rgba(15,23,42,0.6)] ring-1 ring-slate-900/5"
                />
              </div>
            </div>
          ) : (
            <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16 xl:gap-24">
              <div className="lg:col-span-5">
                <StoryHeading section={section} order={order} night={night} />
              </div>
              <div
                className={`min-w-0 rounded-[32px] p-7 ring-1 sm:p-10 lg:col-span-7 xl:p-14 ${CARD_TONES[tone]}`}
              >
                <StoryCopy section={section} night={night} />
              </div>
            </div>
          )}
          {insert?.afterSection === index && <div className="mt-14">{insert.node}</div>}
        </Container>
      </Band>
    );
  });
}

/** Three-column reading layout for blog posts: contents, article, side card. */
export function ArticleBody({
  sections,
  aside,
  insert,
}: {
  sections: ContentSection[];
  aside?: ReactNode;
  insert?: { afterSection: number; node: ReactNode };
}) {
  return (
    <Band tone="white" aria-label="Article">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[250px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)_320px] xl:gap-16">
          <aside className="hidden lg:block">
            <nav aria-label="On this page" className="sticky top-32">
              <p className="text-[12px] font-bold tracking-[0.2em] text-slate-600 uppercase">
                On this page
              </p>
              <ol className="mt-5 space-y-1 border-l border-slate-200">
                {sections.map((section) => (
                  <li key={section.heading}>
                    <a
                      href={`#${anchorId(section.heading)}`}
                      className="-ml-px block border-l-2 border-transparent py-2 pl-4 text-[14px] leading-snug text-slate-600 transition hover:border-[#FF6A55] hover:text-slate-900"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="mx-auto w-full max-w-[800px] min-w-0 space-y-16">
            {sections.map((section, index) => (
              <Fragment key={section.heading}>
                <section aria-labelledby={anchorId(section.heading)}>
                  <h2
                    id={anchorId(section.heading)}
                    className="scroll-mt-32 font-display text-[30px] leading-[1.1] font-extrabold tracking-[-0.02em] text-balance text-slate-900 sm:text-[38px]"
                  >
                    {section.heading}
                  </h2>
                  <div className="mt-6 space-y-5">
                    {section.paragraphs.map((paragraph, i) => (
                      <p
                        key={i}
                        className={
                          i === 0
                            ? "text-[19px] leading-relaxed text-slate-800"
                            : "text-[17px] leading-[1.8] text-slate-600"
                        }
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {section.bullets && <Bullets items={section.bullets} night={false} />}
                </section>
                {insert?.afterSection === index && insert.node}
              </Fragment>
            ))}
          </article>

          {aside && (
            <aside className="hidden xl:block">
              <div className="sticky top-32">{aside}</div>
            </aside>
          )}
        </div>
      </Container>
    </Band>
  );
}

export function StepsSection({ heading, items }: { heading: string; items: Step[] }) {
  return (
    <Band tone="night" aria-labelledby="steps">
      <Container>
        <SectionHeading eyebrow="How it works" title={heading} id="steps" tone="night" />
        <ol
          className={`mt-16 grid gap-10 sm:grid-cols-2 lg:gap-8 ${COLUMNS[items.length] ?? COLUMNS[4]}`}
        >
          {items.map((step, i) => (
            <li key={step.title} className="reveal relative border-t border-white/15 pt-8">
              <span
                aria-hidden="true"
                className="absolute -top-[7px] left-0 h-3.5 w-3.5 rounded-full bg-gradient-to-br from-[#FF6A55] to-[#FFB23E] shadow-[0_0_24px_rgba(255,106,85,0.8)]"
              />
              <span
                aria-hidden="true"
                className="bg-gradient-to-br from-[#FF6A55] to-[#FFB23E] bg-clip-text font-display text-[64px] leading-none font-extrabold text-transparent"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 font-display text-[22px] font-bold">{step.title}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-slate-300">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Band>
  );
}

export function FaqList({
  faqs,
  title = "Frequently asked questions",
  intro,
  contactCard = true,
}: {
  faqs: Faq[];
  title?: string;
  intro?: string;
  contactCard?: boolean;
}) {
  return (
    <Band tone="sand" aria-labelledby="faq">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-24">
          <div className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
            <SectionHeading eyebrow="FAQ" title={title} intro={intro} id="faq" />
            {contactCard && (
              <Link
                href="/contact"
                className="group mt-10 flex items-center gap-4 rounded-3xl bg-white/80 p-5 ring-1 ring-slate-900/5 transition hover:bg-white"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#0A1A1F] text-[#FFB23E]">
                  <MessageCircleQuestion className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[17px] font-bold text-slate-900">
                    Still have a question?
                  </span>
                  <span className="block text-[15px] text-slate-600">Talk to the Solara team</span>
                </span>
                <ArrowRight
                  className="h-5 w-5 shrink-0 text-[#C13A22] transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            )}
          </div>
          <div className="min-w-0 space-y-3 lg:col-span-7">
            {faqs.map((faq, i) => (
              <FaqItem key={faq.id} faq={faq} open={i === 0} />
            ))}
          </div>
        </div>
      </Container>
    </Band>
  );
}

/** A native <details> disclosure: the answer is always in the HTML. */
export function FaqItem({ faq, open }: { faq: Faq; open?: boolean }) {
  return (
    <details
      id={faq.id}
      open={open}
      className="group scroll-mt-32 rounded-3xl bg-white p-6 ring-1 ring-slate-900/5 transition open:shadow-[0_24px_60px_-40px_rgba(15,23,42,0.4)] sm:p-7"
    >
      <summary className="flex cursor-pointer list-none items-start justify-between gap-5 [&::-webkit-details-marker]:hidden">
        <h3 className="font-display text-[18px] leading-snug font-bold text-slate-900 sm:text-[20px]">
          {faq.question}
        </h3>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#FFF0EB] text-[#C13A22] transition group-open:rotate-45 group-open:bg-[#0A1A1F] group-open:text-[#FFB23E]">
          <Plus className="h-4 w-4" aria-hidden="true" />
        </span>
      </summary>
      <p className="mt-4 max-w-[70ch] text-[16px] leading-relaxed text-slate-600">{faq.answer}</p>
    </details>
  );
}

export type RelatedCard = {
  title: string;
  href: string;
  summary: string;
  icon?: ComponentType<{ className?: string }>;
  /** Decorative: the card's title already names it. */
  image?: string;
  /** Link text; defaults to "Explore {title}". */
  cta?: string;
};

export function RelatedLinks({
  title,
  cards,
  eyebrow = "Keep exploring",
}: {
  title: string;
  cards: RelatedCard[];
  eyebrow?: string;
}) {
  return (
    <Band tone="white" aria-labelledby="related">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} id="related" />
        <ul className={`mt-14 grid gap-6 sm:grid-cols-2 ${COLUMNS[cards.length] ?? COLUMNS[3]}`}>
          {cards.map((card) => (
            <li key={card.href} className="reveal">
              <Link
                href={card.href}
                className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-[#FFF9F2] ring-1 ring-slate-900/5 transition hover:-translate-y-1 hover:shadow-[0_32px_64px_-40px_rgba(15,23,42,0.5)]"
              >
                <span className="relative block aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#0A1A1F] to-[#173B42]">
                  {card.image ? (
                    <Image
                      src={card.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    card.icon && (
                      <span className="absolute inset-0 grid place-items-center text-[#FFB23E]">
                        <card.icon className="h-14 w-14" />
                      </span>
                    )
                  )}
                </span>
                <span className="flex flex-1 flex-col p-7">
                  <span className="font-display text-[22px] leading-snug font-bold text-slate-900">
                    {card.title}
                  </span>
                  <span className="mt-3 flex-1 text-[16px] leading-relaxed text-slate-600">
                    {card.summary}
                  </span>
                  <span className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-[#C13A22]">
                    {card.cta ?? `Explore ${card.title}`}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Band>
  );
}

export function Sources({ citations }: { citations: Citation[] }) {
  return (
    <Band tone="white" size="sm" aria-labelledby="sources" className="border-b border-slate-100">
      <Container>
        <h2
          id="sources"
          className="text-[12px] font-bold tracking-[0.2em] text-slate-600 uppercase"
        >
          Sources
        </h2>
        <ol className="mt-5 grid gap-x-12 gap-y-3 text-[15px] text-slate-600 md:grid-cols-2 xl:grid-cols-3">
          {citations.map((citation) => (
            <li key={citation.url}>
              <a
                href={citation.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-start gap-1 underline decoration-slate-300 underline-offset-4 transition hover:text-[#C13A22] hover:decoration-[#FF6A55]"
              >
                {citation.label}
                <ArrowUpRight className="mt-1 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ol>
      </Container>
    </Band>
  );
}

/** Which plans include a feature; sits on the dark hero image. */
export function PlanAvailability({ available, note }: { available: Plan["id"][]; note: string }) {
  return (
    <div>
      <p className="text-[11px] font-bold tracking-[0.2em] text-slate-300 uppercase">Included in</p>
      <ul className="mt-2.5 flex flex-wrap gap-2">
        {plans.map((plan) => {
          const included = available.includes(plan.id);
          return (
            <li
              key={plan.id}
              className={`rounded-full px-3 py-1 text-[13px] font-semibold ring-1 ${
                included
                  ? "bg-[#16C4B3]/15 text-[#5EEAD4] ring-[#16C4B3]/30"
                  : "bg-white/5 text-slate-300 line-through decoration-slate-400 ring-white/10"
              }`}
            >
              {plan.name}
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-[14px] leading-relaxed text-slate-200">{note}</p>
    </div>
  );
}

export function CtaBand({
  title = "See Solara run your front office",
  body = "Book a 20-minute demo and watch a real call turn into a booked, verified appointment in OpenDental.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <Band tone="night" size="lg" className="text-center">
      <Container className="flex flex-col items-center">
        <Eyebrow tone="night">The complete AI front office</Eyebrow>
        <h2 className="mt-9 max-w-[1500px] font-display text-[44px] leading-[1.03] font-extrabold tracking-[-0.03em] text-balance sm:text-7xl lg:text-[84px] xl:text-[104px]">
          <Highlighted text={title} />
        </h2>
        <p className="mt-8 max-w-3xl text-xl leading-relaxed text-slate-300 lg:text-2xl">{body}</p>
        <div className="mt-11 flex flex-wrap items-center justify-center gap-3.5">
          <ButtonLink href="/book-a-demo">Book a 20-min demo</ButtonLink>
          <ButtonLink href="/schedule-call" variant="ghost">
            Schedule a call
          </ButtonLink>
        </div>
        <p className="mt-8 text-[14px] text-slate-300">
          First 2 months free on Essentials for founding clinics · No setup fee · Cancel anytime
        </p>
      </Container>
    </Band>
  );
}
