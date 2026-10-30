import type { Metadata } from "next";
import Link from "next/link";

import { CtaBand, KeyTakeaways } from "@/components/inner/ContentBlocks";
import { PageHero } from "@/components/inner/PageHero";
import { Container, SectionHeading } from "@/components/inner/PageShell";
import { PageShell } from "@/components/inner/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { allPartyStates, statePath, states } from "@/content/states";
import { pageMetadata } from "@/lib/seo/metadata";
import { getPage } from "@/lib/seo/pages";
import { breadcrumbNode, itemListNode, webPageNode } from "@/lib/seo/schema";

const PATH = "/locations";
const page = getPage(PATH);

export const metadata: Metadata = pageMetadata(page);

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Locations", path: PATH },
];

/** States grouped by first letter for the directory. */
const byLetter = states.reduce<Record<string, typeof states>>((acc, state) => {
  (acc[state.name[0]] ??= []).push(state);
  return acc;
}, {});

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
            crumbs,
            datePublished: page.datePublished,
            dateModified: page.lastModified,
            speakable: [".answer-block", ".key-takeaways"],
          }),
          breadcrumbNode(PATH, crumbs),
          itemListNode(
            PATH,
            "Solara for dental practices by state",
            states.map((state) => ({ name: state.name, path: statePath(state.slug) })),
          ),
        ]}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow="Locations"
        title="Solara for dental practices in every US state"
        answer={`Solara is cloud software, so dental practices anywhere in the United States use it the same way: it answers every call 24/7, books into OpenDental and verifies insurance. What changes from state to state is the law on recording calls; ${allPartyStates.length} of the ${states.length} jurisdictions listed here generally require every party's consent.`}
        updated={page.lastModified}
      />

      <KeyTakeaways
        items={[
          "Solara works the same way in every state: your existing phone line plus OpenDental, with nothing to install.",
          `${allPartyStates.length} jurisdictions generally require all-party consent to record a phone call; the rest allow one-party consent.`,
          "Each state page lists its recording statute, time zones, dental licensing board and Medicaid dental program, with sources.",
          "Pricing is the same in every state.",
        ]}
      />

      <section aria-labelledby="states" className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Directory"
            id="states"
            title="Find your state"
            intro="Badges show each state's general rule for recording phone calls."
          />
          <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(byLetter).map(([letter, group]) => (
              <div key={letter}>
                <p
                  className="font-display text-3xl font-black text-[#FF6A55]/25"
                  aria-hidden="true"
                >
                  {letter}
                </p>
                <ul className="mt-2 space-y-1.5">
                  {group.map((state) => (
                    <li key={state.slug}>
                      <Link
                        href={statePath(state.slug)}
                        className="group -mx-3 flex items-center justify-between gap-3 rounded-xl px-3 py-2 transition hover:bg-white hover:shadow-sm"
                      >
                        <span className="text-[15px] font-semibold text-slate-800 group-hover:text-[#C13A22]">
                          Dental AI in {state.name}
                        </span>
                        <span
                          className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                            state.recording.rule === "all-party"
                              ? "bg-[#FFF0EB] text-[#C13A22]"
                              : "bg-[#16C4B3]/10 text-[#0B7A70]"
                          }`}
                        >
                          {state.recording.rule === "all-party" ? "All-party" : "One-party"}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-14 max-w-3xl text-[15px] leading-relaxed text-slate-600">
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
      </section>

      <CtaBand />
    </PageShell>
  );
}
