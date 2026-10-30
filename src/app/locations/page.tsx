import type { Metadata } from "next";
import Link from "next/link";

import { CtaBand, KeyTakeaways } from "@/components/inner/ContentBlocks";
import { ConsentSplit } from "@/components/inner/HeroPanels";
import { PageHero } from "@/components/inner/PageHero";
import { Band, Container, PageShell, SectionHeading } from "@/components/inner/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { allPartyStates, statePath, states } from "@/content/states";
import { pageMetadata } from "@/lib/seo/metadata";
import { getPage } from "@/lib/seo/pages";
import { itemListNode, webPageNode } from "@/lib/seo/schema";

const PATH = "/locations";
const page = getPage(PATH);

export const metadata: Metadata = pageMetadata(page);

export default function LocationsPage() {
  return (
    <PageShell>
      <JsonLd
        nodes={[
          webPageNode({
            path: PATH,
            title: page.title,
            description: page.description,
            type: "CollectionPage",
            datePublished: page.datePublished,
            dateModified: page.lastModified,
            speakable: [".answer-block", ".key-takeaways"],
          }),
          itemListNode(
            PATH,
            "Solara for dental practices by state",
            states.map((state) => ({ name: state.name, path: statePath(state.slug) })),
          ),
        ]}
      />

      <PageHero
        eyebrow="Locations"
        title="Solara for dental practices in every US state"
        highlight="every US state"
        answer={`Solara is cloud software, so dental practices anywhere in the United States use it the same way: it answers every call 24/7, books into OpenDental and verifies insurance. What changes from state to state is the law on recording calls; ${allPartyStates.length} of the ${states.length} jurisdictions listed here generally require every party's consent.`}
        updated={page.lastModified}
        visual={<ConsentSplit allParty={allPartyStates.length} total={states.length} />}
      />

      <KeyTakeaways
        items={[
          "Solara works the same way in every state: your existing phone line plus OpenDental, with nothing to install.",
          `${allPartyStates.length} jurisdictions generally require all-party consent to record a phone call; the rest allow one-party consent.`,
          "Each state page lists its recording statute, time zones, dental licensing board and Medicaid dental program, with sources.",
          "Pricing is the same in every state.",
        ]}
      />

      <Band tone="white" aria-labelledby="states">
        <Container>
          <SectionHeading
            eyebrow="Directory"
            id="states"
            title="Find your state"
            intro="Each tile shows the state's general rule for recording phone calls."
          />
          <ul className="mt-14 grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
            {states.map((state) => {
              const allParty = state.recording.rule === "all-party";
              return (
                <li key={state.slug}>
                  <Link
                    href={statePath(state.slug)}
                    className={`group flex h-full flex-col justify-between rounded-3xl p-5 ring-1 transition hover:-translate-y-1 hover:shadow-[0_24px_50px_-32px_rgba(15,23,42,0.5)] ${
                      allParty ? "bg-[#FFF0EB] ring-[#FF6A55]/20" : "bg-[#FAF8F4] ring-slate-900/5"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`font-display text-[42px] leading-none font-extrabold tracking-tight ${
                        allParty ? "text-[#C13A22]" : "text-[#0B7A70]"
                      }`}
                    >
                      {state.abbr}
                    </span>
                    <span className="mt-7 block text-[15px] leading-snug font-semibold text-slate-900">
                      Dental AI in {state.name}
                    </span>
                    <span
                      className={`mt-1 block text-[13px] font-semibold ${
                        allParty ? "text-[#C13A22]" : "text-[#0B7A70]"
                      }`}
                    >
                      {allParty ? "All-party" : "One-party"}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <p className="mt-12 max-w-3xl text-[17px] leading-relaxed text-slate-600">
            For the statute behind every state&apos;s rule in one table, read the{" "}
            <Link
              href="/guides/dental-call-recording-laws"
              className="font-semibold text-[#C13A22] underline-offset-4 hover:underline"
            >
              guide to dental call recording laws by state
            </Link>
            .
          </p>
        </Container>
      </Band>

      <CtaBand />
    </PageShell>
  );
}
