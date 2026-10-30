import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  ArticleSections,
  CtaBand,
  FaqList,
  KeyTakeaways,
  PlanAvailability,
  RelatedLinks,
  Sources,
  StepsSection,
} from "@/components/inner/ContentBlocks";
import { PageHero } from "@/components/inner/PageHero";
import { PageShell } from "@/components/inner/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqsById } from "@/content/faqs";
import { featurePath, features, getFeature } from "@/content/features";
import { integrationLink, platformLinks } from "@/content/navigation";
import { pageMetadata } from "@/lib/seo/metadata";
import { getPage } from "@/lib/seo/pages";
import { breadcrumbNode, faqNode, webPageNode } from "@/lib/seo/schema";

export function generateStaticParams() {
  return features.map((feature) => ({ slug: feature.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/platform/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const feature = getFeature(slug);
  if (!feature) return {};
  return pageMetadata(getPage(featurePath(slug)));
}

const iconFor = (href: string) => platformLinks.find((link) => link.href === href)?.icon;

export default async function FeaturePage({ params }: PageProps<"/platform/[slug]">) {
  const { slug } = await params;
  const feature = getFeature(slug);
  if (!feature) notFound();

  const path = featurePath(slug);
  const page = getPage(path);
  const faqs = faqsById(feature.faqIds);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Platform", path: "/platform" },
    { name: feature.name, path },
  ];

  const related = feature.related.map((relatedSlug) => {
    const other = getFeature(relatedSlug)!;
    const href = featurePath(relatedSlug);
    return { title: other.name, href, summary: other.summary, icon: iconFor(href) };
  });

  return (
    <PageShell>
      <JsonLd
        nodes={[
          webPageNode({
            path,
            title: page.title,
            description: page.description,
            crumbs,
            image: feature.image.src,
            datePublished: page.datePublished,
            dateModified: page.lastModified,
            speakable: [".answer-block", ".key-takeaways"],
          }),
          breadcrumbNode(path, crumbs),
          faqNode(path, faqs),
        ]}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow={feature.eyebrow}
        title={feature.h1}
        answer={feature.answer}
        updated={page.lastModified}
        image={feature.image}
        aside={
          <PlanAvailability available={feature.availability} note={feature.availabilityNote} />
        }
      />

      <KeyTakeaways items={feature.takeaways} />

      <ArticleSections sections={feature.sections} />

      {feature.steps && (
        <StepsSection heading={feature.steps.heading} items={feature.steps.items} />
      )}

      <FaqList faqs={faqs} title={`${feature.name}: common questions`} />

      {feature.citations && <Sources citations={feature.citations} />}

      <RelatedLinks
        title="Related parts of the platform"
        cards={[
          ...related,
          {
            title: integrationLink.label,
            href: integrationLink.href,
            summary: integrationLink.description ?? "",
            icon: integrationLink.icon,
          },
        ]}
      />

      <CtaBand />
    </PageShell>
  );
}
