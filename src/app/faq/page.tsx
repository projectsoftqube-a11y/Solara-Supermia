import type { Metadata } from "next";
import Link from "next/link";

import { CtaBand, FaqItem } from "@/components/inner/ContentBlocks";
import { PageHero } from "@/components/inner/PageHero";
import { Container } from "@/components/inner/PageShell";
import { PageShell } from "@/components/inner/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { allFaqs, faqsById, type Faq } from "@/content/faqs";
import { pageMetadata } from "@/lib/seo/metadata";
import { getPage } from "@/lib/seo/pages";
import { absoluteUrl, breadcrumbNode, ids, webPageNode, type JsonLdNode } from "@/lib/seo/schema";

const PATH = "/faq";
const page = getPage(PATH);

export const metadata: Metadata = pageMetadata(page);

const crumbs = [
  { name: "Home", path: "/" },
  { name: "FAQ", path: PATH },
];

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
      crumbs,
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
      <JsonLd nodes={[faqPageNode(), breadcrumbNode(PATH, crumbs)]} />

      <PageHero
        crumbs={crumbs}
        eyebrow="FAQ"
        title="Questions dental teams ask about Solara"
        answer={`Solara is an AI front office for dental practices that answers calls 24/7, verifies insurance, sends intake forms, books and reminds patients, runs recall and writes visit notes, synced with OpenDental. Below are straight answers to the ${listed.length} questions practices ask most, grouped by topic.`}
        updated={page.lastModified}
      />

      <section className="pb-16 sm:pb-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16">
            <nav aria-label="FAQ topics" className="hidden lg:block">
              <div className="sticky top-32">
                <p className="text-[11px] font-bold tracking-[0.18em] text-slate-600 uppercase">
                  Topics
                </p>
                <ol className="mt-4 space-y-1 border-l border-slate-200">
                  {grouped.map((group) => (
                    <li key={group.id}>
                      <a
                        href={`#${group.id}`}
                        className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-[13.5px] text-slate-600 transition hover:border-[#FF6A55] hover:text-slate-900"
                      >
                        {group.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>

            <div className="min-w-0 space-y-14">
              {grouped.map((group) => (
                <section key={group.id} aria-labelledby={group.id}>
                  <h2
                    id={group.id}
                    className="scroll-mt-32 font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
                  >
                    {group.title}
                  </h2>
                  <div className="mt-6 space-y-3">
                    {group.faqs.map((faq) => (
                      <FaqItem key={faq.id} faq={faq} />
                    ))}
                  </div>
                </section>
              ))}

              <p className="text-[15px] text-slate-600">
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
            </div>
          </div>
        </Container>
      </section>

      <CtaBand />
    </PageShell>
  );
}
