import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ComparisonTable } from "@/components/inner/ComparisonTable";
import { CtaBand, FaqList, KeyTakeaways } from "@/components/inner/ContentBlocks";
import { PageHero } from "@/components/inner/PageHero";
import {
  Band,
  ButtonLink,
  Container,
  PageShell,
  SectionHeading,
} from "@/components/inner/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqsById } from "@/content/faqs";
import { featurePath, features } from "@/content/features";
import { integrationLink, platformLinks } from "@/content/navigation";
import { featurePhotos } from "@/content/photos";
import { pageMetadata } from "@/lib/seo/metadata";
import { getPage } from "@/lib/seo/pages";
import { faqNode, itemListNode, webPageNode } from "@/lib/seo/schema";

const PATH = "/platform";
const page = getPage(PATH);

export const metadata: Metadata = pageMetadata(page);

const faqs = faqsById([
  "what-is-an-ai-dental-front-office",
  "more-than-a-voice-bot",
  "what-every-plan-includes",
  "works-with-open-dental",
  "setup-time",
  "is-solara-hipaa-compliant",
]);

const iconFor = (href: string) => platformLinks.find((link) => link.href === href)?.icon;

/** Card widths of the feature bento, in the order of content/features.ts. */
const BENTO = [
  "sm:col-span-2 lg:col-span-6",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-3",
  "sm:col-span-2 lg:col-span-6",
  "lg:col-span-6",
  "lg:col-span-6",
];

const COLLAGE = [
  {
    photo: featurePhotos.frontDeskCall,
    className: "col-span-3 row-span-2",
    sizes: "(min-width: 1668px) 360px, (min-width: 1024px) 25vw, 60vw",
  },
  {
    photo: featurePhotos.hygieneChair,
    className: "col-span-2",
    sizes: "(min-width: 1668px) 240px, (min-width: 1024px) 17vw, 60vw",
  },
  {
    photo: featurePhotos.performanceMonitor,
    className: "col-span-2",
    sizes: "(min-width: 1668px) 240px, (min-width: 1024px) 17vw, 60vw",
  },
];

function HeroCollage() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-16 bg-[radial-gradient(closest-side,rgba(255,106,85,0.28),rgba(22,196,179,0.08)_65%,transparent)]"
      />
      <div className="relative grid h-[420px] grid-cols-5 grid-rows-2 gap-3 sm:h-[540px] sm:gap-4 xl:h-[620px]">
        {COLLAGE.map(({ photo, className, sizes }, i) => (
          <div
            key={photo.src}
            className={`relative overflow-hidden rounded-[28px] ring-1 ring-white/15 ${className}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              priority={i === 0}
              sizes={sizes}
              className="object-cover object-[62%_30%]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

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
            datePublished: page.datePublished,
            dateModified: page.lastModified,
            speakable: [".answer-block", ".key-takeaways"],
          }),
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
        eyebrow="The platform"
        title="One AI front office for your whole dental practice"
        highlight="whole dental practice"
        answer="Solara is an AI front office operating system for dental practices. It answers every call 24/7, verifies insurance, sends digital intake forms, books and reminds patients, runs recall, writes visit notes and reports on the numbers, with everything synced to OpenDental so your team does dentistry instead of paperwork."
        updated={page.lastModified}
        visual={<HeroCollage />}
        facts={[
          { value: String(features.length), label: "Connected parts of the front office" },
          { value: "24/7", label: "Every call answered, including after hours" },
          { value: "OpenDental", label: "Everything written back, with no double entry" },
          { value: "No app", label: "Patients use a call, a text or your website chat" },
        ]}
      />

      <KeyTakeaways
        items={[
          "Solara replaces a patchwork of phone, reminder, intake and recall tools with one connected system.",
          "Every feature writes back to OpenDental, so there is no double entry between tools.",
          "Insurance verification, paperless intake, OpenDental integration and unlimited concurrent calls come with every plan.",
          "Patients use the channels they already have: a phone call, a text message or your website chat.",
        ]}
      />

      <Band tone="white" aria-labelledby="features">
        <Container>
          <SectionHeading
            eyebrow="Features"
            id="features"
            title="What does Solara handle for a dental practice?"
            intro="Eight connected parts of the front office, each with its own page explaining exactly how it works and which plan includes it."
          />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-12">
            {features.map((feature, i) => {
              const href = featurePath(feature.slug);
              const Icon = iconFor(href);
              return (
                <li key={feature.slug} className={`reveal ${BENTO[i]}`}>
                  <Link
                    href={href}
                    className="group relative isolate flex h-full min-h-[400px] flex-col justify-end overflow-hidden rounded-[32px] bg-[#0A1A1F] p-7 text-white ring-1 ring-slate-900/5 sm:p-8 xl:min-h-[460px]"
                  >
                    <Image
                      src={feature.image.src}
                      alt={feature.image.alt}
                      fill
                      sizes={
                        i === 0 || i >= 5
                          ? "(min-width: 1668px) 770px, (min-width: 1024px) 50vw, 100vw"
                          : "(min-width: 1668px) 370px, (min-width: 1024px) 25vw, 50vw"
                      }
                      className="-z-20 object-cover transition duration-700 group-hover:scale-105"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 bg-gradient-to-t from-[#060F14] via-[#060F14]/85 to-[#060F14]/5"
                    />
                    {Icon && (
                      <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/15 bg-white/10 text-[#FFB23E]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                    <h3 className="mt-5 font-display text-2xl font-bold xl:text-[28px]">
                      {feature.name}
                    </h3>
                    <p className="mt-2 text-[16px] leading-relaxed text-slate-200">
                      {feature.summary}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-[15px] font-semibold text-[#FFB23E]">
                      See how it works
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
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
            className="group relative mt-5 grid overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0A1A1F] to-[#173B42] text-white lg:grid-cols-2"
          >
            <span className="p-8 sm:p-12 xl:p-16">
              <span className="block text-[12px] font-bold tracking-[0.2em] text-[#FFB23E] uppercase">
                Integration
              </span>
              <span className="mt-4 block font-display text-3xl leading-tight font-extrabold tracking-tight sm:text-[44px]">
                Everything syncs with OpenDental
              </span>
              <span className="mt-4 block max-w-xl text-lg leading-relaxed text-slate-300">
                {integrationLink.description}
              </span>
              <span className="mt-7 inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-[15px] font-semibold">
                See the OpenDental integration
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </span>
            <span className="relative block min-h-[280px]">
              <Image
                src={featurePhotos.tabletCalendar.src}
                alt={featurePhotos.tabletCalendar.alt}
                fill
                sizes="(min-width: 1668px) 770px, (min-width: 1024px) 50vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </span>
          </Link>
        </Container>
      </Band>

      <Band tone="cream" aria-labelledby="compare">
        <Container>
          <SectionHeading
            eyebrow="Compare"
            id="compare"
            title="How does an AI front office compare with a front desk or a chatbot?"
            intro="A full front office handles the whole patient journey. Here is how it lines up against the alternatives most clinics already use."
          />
          <div className="mt-14">
            <ComparisonTable caption="Solara compared with an in-house front desk and a basic chatbot" />
          </div>
          <div className="mt-9">
            <ButtonLink href="/compare" variant="dark">
              Read the full comparison
            </ButtonLink>
          </div>
        </Container>
      </Band>

      <FaqList faqs={faqs} title="Questions about the Solara platform" />

      <CtaBand />
    </PageShell>
  );
}
