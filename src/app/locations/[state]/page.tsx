import { ArrowRight, Clock, Scale, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArticleSections,
  CtaBand,
  FaqList,
  KeyTakeaways,
  Sources,
} from "@/components/inner/ContentBlocks";
import { PageHero } from "@/components/inner/PageHero";
import { Container } from "@/components/inner/PageShell";
import { PageShell } from "@/components/inner/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { platformLinks } from "@/content/navigation";
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
import { absoluteUrl, breadcrumbNode, faqNode, ids, webPageNode } from "@/lib/seo/schema";

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
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Locations", path: "/locations" },
    { name: state.name, path },
  ];
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
            crumbs,
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
          breadcrumbNode(path, crumbs),
          faqNode(path, faqs),
        ]}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow={`${state.name} · ${state.abbr}`}
        title={stateH1(state)}
        answer={stateAnswer(state)}
        updated={page.lastModified}
      />

      <section aria-label={`${state.name} at a glance`} className="-mt-4 pb-4">
        <Container>
          <dl className="grid gap-4 sm:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.label} className="rounded-2xl border border-slate-200/80 bg-white p-5">
                <dt className="flex items-center gap-2 text-[11px] font-bold tracking-[0.16em] text-slate-600 uppercase">
                  <fact.icon className="h-4 w-4 text-[#C13A22]" aria-hidden="true" />
                  {fact.label}
                </dt>
                <dd className="mt-2 font-display text-lg leading-snug font-bold text-slate-900">
                  {fact.value}
                </dd>
                <dd className="mt-1 text-[13px] text-slate-600">{fact.detail}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <KeyTakeaways
        items={stateTakeaways(state)}
        title={`Solara in ${state.name}: key takeaways`}
      />

      <ArticleSections
        sections={stateSections(state)}
        aside={
          <Link
            href="/guides/dental-call-recording-laws"
            className="block rounded-2xl bg-slate-900 p-5 text-white transition hover:bg-slate-800"
          >
            <span className="text-[11px] font-bold tracking-[0.16em] text-[#FFB23E] uppercase">
              Guide
            </span>
            <span className="mt-2 block font-display text-[15px] leading-snug font-bold">
              Call recording laws in all 50 states
            </span>
          </Link>
        }
      />

      <FaqList faqs={faqs} title={`${state.name} dental practice questions`} />

      <Sources citations={stateCitations(state)} />

      <section aria-labelledby="explore" className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2
                id="explore"
                className="font-display text-2xl font-bold tracking-tight text-slate-900"
              >
                What Solara does for {state.name} practices
              </h2>
              <ul className="mt-6 grid gap-2.5">
                {platformLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 text-[15px] font-semibold text-slate-800 ring-1 ring-slate-200/70 transition hover:text-[#C13A22] hover:ring-[#FF6A55]/30"
                    >
                      {link.label}
                      <ArrowRight
                        className="h-4 w-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-[#C13A22]"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900">
                Other {allParty ? "all-party" : "one-party"} consent states
              </h2>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {peers.map((peer) => (
                  <li key={peer.slug}>
                    <Link
                      href={statePath(peer.slug)}
                      className="inline-flex rounded-full bg-white px-4 py-2 text-[14px] font-medium text-slate-700 ring-1 ring-slate-200/80 transition hover:text-[#C13A22] hover:ring-[#FF6A55]/30"
                    >
                      Dental AI in {peer.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/locations"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#C13A22] hover:underline"
              >
                See every state
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        title={`Bring Solara to your ${state.name} practice`}
        body="Book a 20-minute demo and watch Solara answer a real call, verify insurance and book into OpenDental."
      />
    </PageShell>
  );
}
