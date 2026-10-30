import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { TableFrame } from "@/components/inner/ComparisonTable";
import { CtaBand, FaqList, KeyTakeaways, StorySections } from "@/components/inner/ContentBlocks";
import { ConsentSplit } from "@/components/inner/HeroPanels";
import { PageHero } from "@/components/inner/PageHero";
import { Band, Container, PageShell, SectionHeading } from "@/components/inner/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Faq } from "@/content/faqs";
import type { ContentSection } from "@/content/features";
import { featurePhotos } from "@/content/photos";
import { allPartyStates, statePath, states } from "@/content/states";
import { pageMetadata } from "@/lib/seo/metadata";
import { getPage } from "@/lib/seo/pages";
import { absoluteUrl, faqNode, ids, webPageNode } from "@/lib/seo/schema";

const PATH = "/guides/dental-call-recording-laws";
const page = getPage(PATH);

export const metadata: Metadata = pageMetadata({ ...page, type: "article" });

const allPartyNames = allPartyStates.map((s) => s.name);
const listNames = (names: string[]) =>
  names.length > 1 ? `${names.slice(0, -1).join(", ")} and ${names.at(-1)}` : (names[0] ?? "");

const sections: ContentSection[] = [
  {
    heading: "What is the difference between one-party and all-party consent?",
    paragraphs: [
      "Under one-party consent, a phone call may generally be recorded as long as one person on the call agrees to it. Under all-party consent (often called two-party consent), everyone on the call must agree before it is recorded.",
      "Federal law follows the one-party rule, and most states do too. A minority of states require all parties to consent, and a few have rules that differ between in-person conversations and phone calls, or between their criminal and civil statutes.",
    ],
  },
  {
    heading: "Which states require all-party consent to record a phone call?",
    paragraphs: [
      `In this guide, ${allPartyStates.length} jurisdictions are treated as all-party consent for phone calls: ${listNames(allPartyNames)}. Several of these have nuances, such as exceptions for calls where everyone is warned the call is recorded, which are noted in the table below.`,
    ],
  },
  {
    heading: "Why does call recording law matter for a dental practice?",
    paragraphs: [
      "Dental practices increasingly record calls for training and quality, and AI receptionists record and transcribe calls as part of how they work. Solara records and transcribes every call so you can review quality and coach the AI.",
      "That makes the consent rule in your state part of setting up any phone system that records. The simplest safeguard works everywhere: say at the start of the call that it is recorded.",
    ],
  },
  {
    heading: "What happens when the caller is in a different state?",
    paragraphs: [
      "Patients do not always call from the state the practice is in. When the two states have different rules, the common practical approach is to follow the stricter one, which in practice means announcing the recording to everyone on the call.",
    ],
  },
  {
    heading: "How do practices using Solara announce call recording?",
    paragraphs: [
      "In Solara's settings you choose the receptionist's name, voice and greeting. Adding a short recording notice to that greeting means every caller hears it before the conversation starts, whatever state they are calling from.",
      "This guide is general information, not legal advice. Laws change, and court decisions can narrow or widen how a statute applies, so confirm your obligations with counsel familiar with the law in your state.",
    ],
  },
];

const faqs: Faq[] = [
  {
    id: "how-many-all-party-states",
    question: "How many states require all-party consent to record a phone call?",
    answer: `This guide treats ${allPartyStates.length} jurisdictions as all-party consent for phone calls: ${listNames(allPartyNames)}. The rest generally allow a call to be recorded with one party's consent.`,
  },
  {
    id: "is-federal-law-one-party",
    question: "Is federal law one-party or all-party consent?",
    answer:
      "Federal law follows the one-party consent rule, so a call may generally be recorded when one person on it consents. State law can be stricter, which is why the state rule matters.",
  },
  {
    id: "should-practices-announce-recording",
    question: "Should a dental practice announce that calls are recorded?",
    answer:
      "Announcing that calls are recorded at the start of each call satisfies consent rules in one-party and all-party states alike. Practices using Solara add the notice to the AI receptionist's greeting in settings.",
  },
];

export default function RecordingLawsGuide() {
  const url = absoluteUrl(PATH);
  return (
    <PageShell>
      <JsonLd
        nodes={[
          webPageNode({
            path: PATH,
            title: page.title,
            description: page.description,
            datePublished: page.datePublished,
            dateModified: page.lastModified,
            speakable: [".answer-block", ".key-takeaways"],
            about: `${url}#article`,
          }),
          {
            "@type": "Article",
            "@id": `${url}#article`,
            headline: "Dental call recording laws by state",
            description: page.description,
            url,
            mainEntityOfPage: { "@id": `${url}#webpage` },
            datePublished: page.datePublished,
            dateModified: page.lastModified,
            author: { "@id": ids.organization },
            publisher: { "@id": ids.organization },
            inLanguage: "en-US",
            articleSection: "Compliance",
            about: ["Call recording", "Consent law", "Dental practice management"],
            citation: states.map((s) => s.recording.sourceUrl),
          },
          faqNode(PATH, faqs),
        ]}
      />

      <PageHero
        eyebrow="Guide"
        title="Dental call recording laws by state"
        highlight="laws by state"
        answer={`Recording a patient phone call is generally lawful with one party's consent in most US states, but ${allPartyStates.length} of the ${states.length} jurisdictions covered here require every party to consent. For dental practices whose phone system records calls, the safe default everywhere is to announce the recording at the start of each call.`}
        updated={page.lastModified}
        visual={
          <ConsentSplit
            allParty={allPartyStates.length}
            total={states.length}
            list={allPartyStates}
          />
        }
      />

      <KeyTakeaways
        items={[
          "One-party consent means one person on the call may consent; all-party consent means everyone must.",
          `${allPartyStates.length} jurisdictions in this guide are treated as all-party consent for phone calls.`,
          "When caller and practice are in different states, following the stricter rule is the common practical approach.",
          "Announcing the recording at the start of every call works in every state.",
        ]}
      />

      <StorySections
        sections={sections}
        images={[
          featurePhotos.frontDeskCall,
          featurePhotos.clinicianTablet,
          featurePhotos.afterHours,
        ]}
      />

      <Band tone="white" aria-labelledby="table">
        <Container>
          <SectionHeading
            eyebrow="State by state"
            id="table"
            title="Call recording consent rules in all 50 states and DC"
            intro="Rules apply to recording phone calls. Follow the source link for each state's statute or legal reference."
          />
          <div className="mt-14">
            <TableFrame>
              <table className="w-full min-w-[860px] border-collapse text-left text-[15.5px]">
                <caption className="sr-only">
                  Phone call recording consent rule and statute by US state
                </caption>
                <thead>
                  <tr className="bg-[#0A1A1F] text-white">
                    <th scope="col" className="px-6 py-5 text-[14px] font-semibold">
                      State
                    </th>
                    <th scope="col" className="px-6 py-5 text-[14px] font-semibold">
                      Consent rule
                    </th>
                    <th scope="col" className="px-6 py-5 text-[14px] font-semibold">
                      Statute
                    </th>
                    <th scope="col" className="px-6 py-5 text-[14px] font-semibold">
                      What to know
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {states.map((state) => (
                    <tr key={state.slug} className="border-t border-slate-100 align-top">
                      <th scope="row" className="px-6 py-5 font-semibold text-slate-900">
                        <Link
                          href={statePath(state.slug)}
                          className="hover:text-[#C13A22] hover:underline"
                        >
                          {state.name}
                        </Link>
                      </th>
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-[13px] font-bold whitespace-nowrap ${
                            state.recording.rule === "all-party"
                              ? "bg-[#FFF0EB] text-[#C13A22]"
                              : "bg-[#16C4B3]/10 text-[#0B7A70]"
                          }`}
                        >
                          {state.recording.rule === "all-party" ? "All-party" : "One-party"}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-slate-700">
                        <a
                          href={state.recording.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-start gap-1 underline decoration-slate-300 underline-offset-4 hover:text-[#C13A22]"
                        >
                          {state.recording.statute}
                          <ArrowUpRight className="mt-1 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        </a>
                      </td>
                      <td className="px-6 py-5 leading-relaxed text-slate-600">
                        {state.recording.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableFrame>
          </div>
          <p className="mt-6 text-[14px] text-slate-600">
            General information, not legal advice. Sources: each state&apos;s statute or the
            Reporters Committee for Freedom of the Press Reporter&apos;s Recording Guide, linked per
            row.
          </p>
        </Container>
      </Band>

      <FaqList faqs={faqs} title="Call recording questions" />

      <CtaBand
        title="Answer every call, with the greeting you choose"
        body="Solara answers 24/7, records and transcribes every call, and lets you write the greeting patients hear first."
      />
    </PageShell>
  );
}
