import { ArrowRight, Clock, Scale, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  CtaBand,
  FaqList,
  KeyTakeaways,
  Sources,
  StorySections,
} from "@/components/inner/ContentBlocks";
import { GlassPanel } from "@/components/inner/HeroPanels";
import { PageHero } from "@/components/inner/PageHero";
import { Band, ButtonLink, Container, PageShell } from "@/components/inner/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { platformLinks } from "@/content/navigation";
import { featurePhotos } from "@/content/photos";
import {
  getState,
  sameRuleStates,
  stateAnswer,
  stateCitations,
  stateFaqs,
  stateH1,
  statePath,
  states,
  stateSections,
  stateTakeaways,
  zoneNames,
} from "@/content/states";
import { pageMetadata } from "@/lib/seo/metadata";
import { getPage } from "@/lib/seo/pages";
import { absoluteUrl, faqNode, ids, webPageNode } from "@/lib/seo/schema";

export function generateStaticParams() {
  return states.map((state) => ({ state: state.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/locations/[state]">): Promise<Metadata> {
  const { state: slug } = await params;
  if (!getState(slug)) return {};
  return pageMetadata(getPage(statePath(slug)));
}

export default async function StatePage({ params }: PageProps<"/locations/[state]">) {
  const { state: slug } = await params;
  const state = getState(slug);
  if (!state) notFound();

  const path = statePath(slug);
  const page = getPage(path);
  const faqs = stateFaqs(state);
  const peers = sameRuleStates(state);
  const allParty = state.recording.rule === "all-party";

  const facts = [
    {
      icon: Scale,
      label: "Call recording",
      value: allParty ? "All-party consent" : "One-party consent",
      detail: state.recording.statute,
    },
    {
      icon: Clock,
      label: zoneNames(state).length > 1 ? "Time zones" : "Time zone",
      value: zoneNames(state).join(", "),
      detail: "Solara answers 24/7",
    },
    ...(state.dentalBoard
      ? [
          {
            icon: ShieldCheck,
            label: "Licensing board",
            value: state.dentalBoard.name,
            detail: "Dentists and hygienists",
          },
        ]
      : []),
  ];

  return (
    <PageShell>
      <JsonLd
        nodes={[
          webPageNode({
            path,
            title: page.title,
            description: page.description,
            datePublished: page.datePublished,
            dateModified: page.lastModified,
            speakable: [".answer-block", ".key-takeaways"],
            about: `${absoluteUrl(path)}#service`,
          }),
          {
            "@type": "Service",
            "@id": `${absoluteUrl(path)}#service`,
            name: `AI dental front office for ${state.name} practices`,
            serviceType: "AI dental receptionist and front office software",
            provider: { "@id": ids.organization },
            isRelatedTo: { "@id": ids.software },
            areaServed: {
              "@type": "State",
              name: state.name,
              address: {
                "@type": "PostalAddress",
                addressRegion: state.abbr,
                addressCountry: "US",
              },
            },
            url: absoluteUrl(path),
          },
          faqNode(path, faqs),
        ]}
      />

      <PageHero
        eyebrow={`${state.name} · ${state.abbr}`}
        title={stateH1(state)}
        answer={stateAnswer(state)}
        updated={page.lastModified}
        visual={
          <GlassPanel>
            <div className="flex items-center justify-between gap-6">
              <span
                aria-hidden="true"
                className="bg-gradient-to-r from-[#FF6A55] to-[#FFB23E] bg-clip-text font-display text-[104px] leading-none font-extrabold tracking-tight text-transparent xl:text-[136px]"
              >
                {state.abbr}
              </span>
              <span
                className={`rounded-full px-4 py-2 text-[13px] font-bold ring-1 ${
                  allParty
                    ? "bg-[#FF6A55]/15 text-[#FF9E8D] ring-[#FF6A55]/30"
                    : "bg-[#16C4B3]/15 text-[#5EEAD4] ring-[#16C4B3]/30"
                }`}
              >
                {allParty ? "All-party" : "One-party"}
              </span>
            </div>
            <dl className="mt-7 divide-y divide-white/10">
              {facts.map((fact) => (
                <div key={fact.label} className="relative py-5 pl-14 last:pb-0">
                  <dt className="text-[12px] font-bold tracking-[0.16em] text-slate-300 uppercase">
                    <span className="absolute top-5 left-0 grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-[#FFB23E]">
                      <fact.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    {fact.label}
                  </dt>
                  <dd className="mt-1 font-display text-lg leading-snug font-bold text-white">
                    {fact.value}
                  </dd>
                  <dd className="mt-0.5 text-[14px] text-slate-300">{fact.detail}</dd>
                </div>
              ))}
            </dl>
          </GlassPanel>
        }
      />

      <KeyTakeaways
        items={stateTakeaways(state)}
        title={`Solara in ${state.name}: key takeaways`}
      />

      <StorySections
        sections={stateSections(state)}
        images={[featurePhotos.frontDeskCall, featurePhotos.frontDeskCalendar]}
      />

      <FaqList faqs={faqs} title={`${state.name} dental practice questions`} />

      <Sources citations={stateCitations(state)} />

      <Band tone="white" aria-labelledby="explore">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16 xl:gap-24">
            <div className="lg:col-span-7">
              <h2
                id="explore"
                className="font-display text-[32px] leading-[1.08] font-extrabold tracking-[-0.025em] sm:text-[44px]"
              >
                What Solara does for {state.name} practices
              </h2>
              <ul className="mt-9 grid gap-3 sm:grid-cols-2">
                {platformLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex h-full items-center gap-3.5 rounded-2xl bg-[#FFF9F2] p-4 text-[16px] font-semibold text-slate-900 ring-1 ring-slate-900/5 transition hover:text-[#C13A22] hover:ring-[#FF6A55]/30"
                    >
                      {link.icon && (
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#FFF0EB] text-[#C13A22]">
                          <link.icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                      <span className="min-w-0 flex-1">{link.label}</span>
                      <ArrowRight
                        className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-[#C13A22]"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5">
              <h2 className="font-display text-[32px] leading-[1.08] font-extrabold tracking-[-0.025em] sm:text-[44px]">
                Other {allParty ? "all-party" : "one-party"} consent states
              </h2>
              <ul className="mt-9 flex flex-wrap gap-2.5">
                {peers.map((peer) => (
                  <li key={peer.slug}>
                    <Link
                      href={statePath(peer.slug)}
                      className="inline-flex rounded-full bg-[#FFF9F2] px-4 py-2.5 text-[15px] font-medium text-slate-700 ring-1 ring-slate-900/10 transition hover:text-[#C13A22] hover:ring-[#FF6A55]/30"
                    >
                      Dental AI in {peer.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href="/locations" variant="dark">
                  See every state
                </ButtonLink>
                <ButtonLink href="/guides/dental-call-recording-laws" variant="dark">
                  Call recording laws
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </Band>

      <CtaBand
        title={`Bring Solara to your ${state.name} practice`}
        body="Book a 20-minute demo and watch Solara answer a real call, verify insurance and book into OpenDental."
      />
    </PageShell>
  );
}
