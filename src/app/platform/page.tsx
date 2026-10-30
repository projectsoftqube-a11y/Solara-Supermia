import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { CtaBand, FaqList, KeyTakeaways } from "@/components/inner/ContentBlocks";
import { ComparisonTable } from "@/components/inner/ComparisonTable";
import { PageHero } from "@/components/inner/PageHero";
import { Container, SectionHeading } from "@/components/inner/PageShell";
import { PageShell } from "@/components/inner/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqsById } from "@/content/faqs";
import { featurePath, features } from "@/content/features";
import { integrationLink, platformLinks } from "@/content/navigation";
import { pageMetadata } from "@/lib/seo/metadata";
import { getPage } from "@/lib/seo/pages";
import { breadcrumbNode, faqNode, itemListNode, webPageNode } from "@/lib/seo/schema";

const PATH = "/platform";
const page = getPage(PATH);

export const metadata: Metadata = pageMetadata(page);

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Platform", path: PATH },
];

const faqs = faqsById([
  "what-is-an-ai-dental-front-office",
  "more-than-a-voice-bot",
  "what-every-plan-includes",
  "works-with-open-dental",
  "setup-time",
  "is-solara-hipaa-compliant",
]);

const iconFor = (href: string) => platformLinks.find((link) => link.href === href)?.icon;

export default function PlatformPage() {
  return (
    <PageShell>
      <JsonLd
        nodes={[
          webPageNode({
            path: PATH,
            title: page.title,
            description: page.description,
            type: "CollectionPage",
            crumbs,
            datePublished: page.datePublished,
            dateModified: page.lastModified,
            speakable: [".answer-block", ".key-takeaways"],
          }),
          breadcrumbNode(PATH, crumbs),
          itemListNode(
            PATH,
            "Solara platform features",
            features.map((feature) => ({
              name: feature.name,
              path: featurePath(feature.slug),
              description: feature.summary,
            })),
          ),
          faqNode(PATH, faqs),
        ]}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow="The platform"
        title="One AI front office for your whole dental practice"
        answer="Solara is an AI front office operating system for dental practices. It answers every call 24/7, verifies insurance, sends digital intake forms, books and reminds patients, runs recall, writes visit notes and reports on the numbers, with everything synced to OpenDental so your team does dentistry instead of paperwork."
        updated={page.lastModified}
      />

      <KeyTakeaways
        items={[
          "Solara replaces a patchwork of phone, reminder, intake and recall tools with one connected system.",
          "Every feature writes back to OpenDental, so there is no double entry between tools.",
          "Insurance verification, paperless intake, OpenDental integration and unlimited concurrent calls come with every plan.",
          "Patients use the channels they already have: a phone call, a text message or your website chat.",
        ]}
      />

      <section aria-labelledby="features" className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Features"
            id="features"
            title="What does Solara handle for a dental practice?"
            intro="Eight connected parts of the front office, each with its own page explaining exactly how it works and which plan includes it."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const href = featurePath(feature.slug);
              const Icon = iconFor(href);
              return (
                <li key={feature.slug}>
                  <Link
                    href={href}
                    className="group flex h-full flex-col rounded-3xl border border-slate-200/80 bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#FF6A55]/30 hover:shadow-[0_24px_50px_-30px_rgba(15,23,42,0.4)]"
                  >
                    {Icon && (
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#FFF0EB] to-[#FFF6EC] text-[#C13A22] ring-1 ring-[#FF6A55]/15">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                    <h3 className="mt-5 font-display text-lg font-bold text-slate-900">
                      {feature.name}
                    </h3>
                    <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate-600">
                      {feature.summary}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#C13A22]">
                      How {feature.name.toLowerCase()} works
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href={integrationLink.href}
            className="group mt-6 flex flex-col items-start justify-between gap-4 rounded-3xl bg-slate-900 p-7 text-white transition hover:bg-slate-800 sm:flex-row sm:items-center"
          >
            <span>
              <span className="block text-[11px] font-bold tracking-[0.18em] text-[#FFB23E] uppercase">
                Integration
              </span>
              <span className="mt-2 block font-display text-xl font-bold">
                Everything syncs with OpenDental
              </span>
              <span className="mt-1 block text-[15px] text-slate-300">
                {integrationLink.description}
              </span>
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold">
              See the OpenDental integration
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
          </Link>
        </Container>
      </section>

      <section
        aria-labelledby="compare"
        className="border-t border-slate-200/70 bg-white py-16 sm:py-24"
      >
        <Container>
          <SectionHeading
            eyebrow="Compare"
            id="compare"
            title="How does an AI front office compare with a front desk or a chatbot?"
            intro="A full front office handles the whole patient journey. Here is how it lines up against the alternatives most clinics already use."
          />
          <div className="mt-10">
            <ComparisonTable caption="Solara compared with an in-house front desk and a basic chatbot" />
          </div>
          <Link
            href="/compare"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#C13A22] hover:underline"
          >
            Read the full comparison
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Container>
      </section>

      <FaqList faqs={faqs} title="Questions about the Solara platform" />

      <CtaBand />
    </PageShell>
  );
}
