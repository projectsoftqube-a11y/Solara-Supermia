import { ArrowRight, ArrowUpRight, Check, CircleCheck, Plus } from "lucide-react";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";

import { Container, SectionHeading } from "@/components/inner/PageShell";
import type { Faq } from "@/content/faqs";
import type { Citation, ContentSection, Step } from "@/content/features";
import { plans, type Plan } from "@/content/plans";

/** Stable in-page anchor for a heading. */
export const anchorId = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export function KeyTakeaways({
  items,
  title = "Key takeaways",
}: {
  items: string[];
  title?: string;
}) {
  return (
    <section
      aria-labelledby="key-takeaways"
      className="border-y border-slate-200/70 bg-white py-14 sm:py-16"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16">
          <h2
            id="key-takeaways"
            className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            {title}
          </h2>
          <ul className="key-takeaways grid gap-4 sm:grid-cols-2">
            {items.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-2xl border border-slate-200/70 bg-[#FCFBF8] p-5 text-[15px] leading-relaxed text-slate-700"
              >
                <CircleCheck
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#16C4B3]"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

/** Long-form body: question-form H2s, a sticky table of contents on desktop. */
export function ArticleSections({
  sections,
  aside,
  insert,
}: {
  sections: ContentSection[];
  aside?: ReactNode;
  /** Extra content (e.g. a table) rendered in the article right after a section. */
  insert?: { afterSection: number; node: ReactNode };
}) {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16">
          <aside className="hidden lg:block">
            <nav aria-label="On this page" className="sticky top-32">
              <p className="text-[11px] font-bold tracking-[0.18em] text-slate-600 uppercase">
                On this page
              </p>
              <ol className="mt-4 space-y-1 border-l border-slate-200">
                {sections.map((section) => (
                  <li key={section.heading}>
                    <a
                      href={`#${anchorId(section.heading)}`}
                      className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-[13.5px] leading-snug text-slate-600 transition hover:border-[#FF6A55] hover:text-slate-900"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
              {aside && <div className="mt-8">{aside}</div>}
            </nav>
          </aside>

          <article className="min-w-0 space-y-14">
            {sections.map((section, index) => (
              <Fragment key={section.heading}>
                <section aria-labelledby={anchorId(section.heading)} className="scroll-mt-32">
                  <h2
                    id={anchorId(section.heading)}
                    className="scroll-mt-32 font-display text-2xl leading-tight font-bold tracking-tight text-balance text-slate-900 sm:text-[30px]"
                  >
                    {section.heading}
                  </h2>
                  <div className="mt-5 space-y-4 text-[16px] leading-[1.75] text-slate-600 sm:text-[17px]">
                    {section.paragraphs.map((paragraph, i) => (
                      <p
                        key={i}
                        className={i === 0 ? "text-[17px] text-slate-800 sm:text-lg" : undefined}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {section.bullets && (
                    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-3 rounded-xl bg-white px-4 py-3 text-[15px] text-slate-700 ring-1 ring-slate-200/70"
                        >
                          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#16C4B3]/12">
                            <Check
                              className="h-3 w-3 text-[#0E8C80]"
                              strokeWidth={3}
                              aria-hidden="true"
                            />
                          </span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
                {insert?.afterSection === index && insert.node}
              </Fragment>
            ))}
          </article>
        </div>
      </Container>
    </section>
  );
}

export function StepsSection({ heading, items }: { heading: string; items: Step[] }) {
  return (
    <section aria-labelledby="steps" className="bg-[#FFF6EC] py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="How it works" title={heading} id="steps" />
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((step, i) => (
            <li
              key={step.title}
              className="relative rounded-3xl border border-white bg-white/90 p-6 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.35)]"
            >
              <span className="bg-gradient-to-br from-[#FF6A55] to-[#FFB23E] bg-clip-text font-display text-4xl font-black text-transparent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function FaqList({
  faqs,
  title = "Frequently asked questions",
  intro,
}: {
  faqs: Faq[];
  title?: string;
  intro?: string;
}) {
  return (
    <section aria-labelledby="faq" className="py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="FAQ" title={title} intro={intro} id="faq" />
        <div className="mt-10 grid items-start gap-4 lg:grid-cols-2">
          {faqs.map((faq) => (
            <FaqItem key={faq.id} faq={faq} />
          ))}
        </div>
      </Container>
    </section>
  );
}

/** A native <details> disclosure: the answer is always in the HTML. */
export function FaqItem({ faq }: { faq: Faq }) {
  return (
    <details
      id={faq.id}
      className="group scroll-mt-32 rounded-2xl border border-slate-200/80 bg-white p-5 transition open:shadow-[0_18px_40px_-28px_rgba(15,23,42,0.35)] sm:p-6"
    >
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden">
        <h3 className="font-display text-[16px] leading-snug font-bold text-slate-900 sm:text-[17px]">
          {faq.question}
        </h3>
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#FFF0EB] text-[#C13A22] transition group-open:rotate-45">
          <Plus className="h-4 w-4" aria-hidden="true" />
        </span>
      </summary>
      <p className="mt-4 text-[15px] leading-relaxed text-slate-600">{faq.answer}</p>
    </details>
  );
}

export type RelatedCard = {
  title: string;
  href: string;
  summary: string;
  icon?: React.ComponentType<{ className?: string }>;
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
    <section
      aria-labelledby="related"
      className="border-t border-slate-200/70 bg-white py-16 sm:py-24"
    >
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} id="related" />
        <ul
          className={`mt-10 grid gap-5 sm:grid-cols-2 ${cards.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}
        >
          {cards.map((card) => (
            <li key={card.href}>
              <Link
                href={card.href}
                className="group flex h-full flex-col rounded-3xl border border-slate-200/80 bg-[#FCFBF8] p-6 transition hover:-translate-y-0.5 hover:border-[#FF6A55]/30 hover:bg-white hover:shadow-[0_24px_50px_-30px_rgba(15,23,42,0.4)]"
              >
                {card.icon && (
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#FFF0EB] text-[#C13A22]">
                    <card.icon className="h-5 w-5" />
                  </span>
                )}
                <span className="mt-5 font-display text-lg font-bold text-slate-900">
                  {card.title}
                </span>
                <span className="mt-2 flex-1 text-[15px] leading-relaxed text-slate-600">
                  {card.summary}
                </span>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#C13A22]">
                  {card.cta ?? `Explore ${card.title}`}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function Sources({ citations }: { citations: Citation[] }) {
  return (
    <section aria-labelledby="sources" className="pb-6">
      <Container>
        <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-6">
          <h2
            id="sources"
            className="text-[11px] font-bold tracking-[0.18em] text-slate-600 uppercase"
          >
            Sources
          </h2>
          <ol className="mt-3 space-y-2 text-[14px] text-slate-600">
            {citations.map((citation) => (
              <li key={citation.url}>
                <a
                  href={citation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 underline decoration-slate-300 underline-offset-4 transition hover:text-[#C13A22] hover:decoration-[#FF6A55]"
                >
                  {citation.label}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

export function PlanAvailability({ available, note }: { available: Plan["id"][]; note: string }) {
  return (
    <div>
      <p className="text-[11px] font-bold tracking-[0.18em] text-slate-600 uppercase">
        Included in
      </p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {plans.map((plan) => {
          const included = available.includes(plan.id);
          return (
            <li
              key={plan.id}
              className={`rounded-full px-3 py-1 text-[12.5px] font-semibold ${
                included
                  ? "bg-[#16C4B3]/12 text-[#0B7A70] ring-1 ring-[#16C4B3]/25"
                  : "bg-slate-100 text-slate-600 line-through decoration-slate-300"
              }`}
            >
              {plan.name}
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-[13.5px] leading-relaxed text-slate-600">{note}</p>
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
    <section className="pb-20 sm:pb-28">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[32px] bg-[#02060A] px-6 py-14 text-center sm:px-14 sm:py-20">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-24 left-1/2 h-72 w-[680px] -translate-x-1/2 rounded-full bg-[#FF6A55]/25 blur-[100px]" />
            <div className="absolute right-0 bottom-0 h-56 w-56 rounded-full bg-[#16C4B3]/15 blur-[90px]" />
          </div>
          <h2 className="mx-auto max-w-2xl font-display text-3xl leading-tight font-bold tracking-tight text-balance text-white sm:text-[42px]">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-slate-300">{body}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/book-a-demo"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D2432D] to-[#C13A22] px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_16px_40px_-14px_rgba(255,106,85,0.7)] transition hover:brightness-105"
            >
              Book a 20-min demo
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/schedule-call"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-[15px] font-semibold text-white transition hover:bg-white/10"
            >
              Schedule a call
            </Link>
          </div>
          <p className="mt-6 text-[13px] text-slate-400">
            First 2 months free on Essentials for founding clinics · No setup fee · Cancel anytime
          </p>
        </div>
      </Container>
    </section>
  );
}
