import type { Metadata } from "next";
import Link from "next/link";

import { CtaBand, FaqItem } from "@/components/inner/ContentBlocks";
import { PageHero } from "@/components/inner/PageHero";
import { Band, Container, PageShell } from "@/components/inner/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { allFaqs, faqsById, type Faq } from "@/content/faqs";
import { pageMetadata } from "@/lib/seo/metadata";
import { getPage } from "@/lib/seo/pages";
import { absoluteUrl, ids, webPageNode, type JsonLdNode } from "@/lib/seo/schema";

const PATH = "/faq";
const page = getPage(PATH);

export const metadata: Metadata = pageMetadata(page);

const GROUPS: { title: string; id: string; faqIds: string[] }[] = [
  {
    title: "What Solara is",
    id: "about-solara",
    faqIds: [
      "what-is-an-ai-dental-front-office",
      "what-is-an-ai-dental-receptionist",
      "more-than-a-voice-bot",
      "different-from-a-chatbot",
      "do-patients-need-an-app",
    ],
  },
  {
    title: "Pricing and plans",
    id: "pricing",
    faqIds: [
      "how-much-does-solara-cost",
      "free-first-two-months",
      "what-every-plan-includes",
      "ai-call-minutes",
      "annual-billing-savings",
      "support-response-times",
      "multi-location-support",
    ],
  },
  {
    title: "Calls and booking",
    id: "calls",
    faqIds: [
      "ai-receptionist-books-appointments",
      "answers-after-hours",
      "book-by-text",
      "transfers-calls-to-staff",
      "emergencies-and-clinical-questions",
      "control-what-ai-does",
      "call-recordings-and-transcripts",
    ],
  },
  {
    title: "Insurance, intake and patient follow-up",
    id: "workflows",
    faqIds: [
      "how-insurance-verification-works",
      "verifies-insurance",
      "answers-insurance-questions",
      "how-intake-works",
      "sends-appointment-reminders",
      "reminder-channels",
      "how-recall-works",
      "how-clinical-notes-work",
      "what-analytics-show",
    ],
  },
  {
    title: "Setup, integrations and security",
    id: "setup",
    faqIds: [
      "setup-time",
      "works-with-open-dental",
      "which-pms-integrations",
      "is-solara-hipaa-compliant",
    ],
  },
  {
    title: "Getting found by new patients",
    id: "marketing",
    faqIds: ["seo-and-google-ads-help", "seo-and-google-ads-included"],
  },
];

const grouped = GROUPS.map((group) => ({ ...group, faqs: faqsById(group.faqIds) }));

// Every FAQ must appear exactly once on this page.
const shown = new Set(grouped.flatMap((g) => g.faqIds));
const missing = allFaqs.filter((faq) => !shown.has(faq.id));
if (missing.length || shown.size !== grouped.flatMap((g) => g.faqIds).length) {
  throw new Error(`/faq groups are out of date: ${missing.map((f) => f.id).join(", ")}`);
}

const listed: Faq[] = grouped.flatMap((g) => g.faqs);

/** The whole page is the FAQ, so the WebPage node itself is the FAQPage. */
function faqPageNode(): JsonLdNode {
  return {
    ...webPageNode({
      path: PATH,
      title: page.title,
      description: page.description,
      type: "FAQPage",
      datePublished: page.datePublished,
      dateModified: page.lastModified,
      speakable: [".answer-block"],
      about: ids.software,
    }),
    mainEntity: listed.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      url: `${absoluteUrl(PATH)}#${faq.id}`,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export default function FaqPage() {
  return (
    <PageShell>
      <JsonLd nodes={[faqPageNode()]} />

      <PageHero
        eyebrow="FAQ"
        title="Questions dental teams ask about Solara"
        highlight="ask about Solara"
        answer={`Solara is an AI front office for dental practices that answers calls 24/7, verifies insurance, sends intake forms, books and reminds patients, runs recall and writes visit notes, synced with OpenDental. Below are straight answers to the ${listed.length} questions practices ask most, grouped by topic.`}
        updated={page.lastModified}
      >
        <nav aria-label="FAQ topics" className="mt-12">
          <ul className="flex flex-wrap gap-3">
            {grouped.map((group) => (
              <li key={group.id}>
                <a
                  href={`#${group.id}`}
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-[15px] font-medium text-white transition hover:bg-white/10"
                >
                  {group.title}
                  <span className="font-mono text-[13px] text-[#FFB23E]">{group.faqs.length}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {grouped.map((group, i) => (
        <Band
          key={group.id}
          tone={i % 2 ? "white" : "cream"}
          size={i === 0 ? "flush" : "md"}
          aria-labelledby={group.id}
        >
          <Container>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 xl:gap-24">
              <div className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
                <span
                  aria-hidden="true"
                  className="font-mono text-[13px] font-bold tracking-[0.2em] text-[#C13A22] uppercase"
                >
                  {String(i + 1).padStart(2, "0")} / {String(grouped.length).padStart(2, "0")}
                </span>
                <h2
                  id={group.id}
                  className="mt-4 scroll-mt-32 font-display text-[34px] leading-[1.06] font-extrabold tracking-[-0.025em] text-balance sm:text-5xl xl:text-[60px]"
                >
                  {group.title}
                </h2>
              </div>
              <div className="min-w-0 space-y-3 lg:col-span-7">
                {group.faqs.map((faq) => (
                  <FaqItem key={faq.id} faq={faq} />
                ))}
              </div>
            </div>
          </Container>
        </Band>
      ))}

      <Band tone="sand" size="sm">
        <Container>
          <p className="max-w-4xl text-xl leading-relaxed text-slate-700 sm:text-2xl">
            Still have a question?{" "}
            <Link
              href="/contact"
              className="font-semibold text-[#C13A22] underline-offset-4 hover:underline"
            >
              Contact the Solara team
            </Link>{" "}
            or read about{" "}
            <Link
              href="/hipaa-compliance"
              className="font-semibold text-[#C13A22] underline-offset-4 hover:underline"
            >
              HIPAA compliance and security
            </Link>
            .
          </p>
        </Container>
      </Band>

      <CtaBand />
    </PageShell>
  );
}
