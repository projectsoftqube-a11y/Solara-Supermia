import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  CtaBand,
  FaqList,
  KeyTakeaways,
  PlanAvailability,
  RelatedLinks,
  Sources,
  StepsSection,
  StorySections,
} from "@/components/inner/ContentBlocks";
import { PageHero } from "@/components/inner/PageHero";
import { PageShell } from "@/components/inner/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { featureVisuals } from "@/content/feature-visuals";
import { faqsById } from "@/content/faqs";
import { featurePath, features, getFeature } from "@/content/features";
import { integrationLink } from "@/content/navigation";
import { featurePhotos } from "@/content/photos";
import { pageMetadata } from "@/lib/seo/metadata";
import { getPage } from "@/lib/seo/pages";
import { faqNode, webPageNode } from "@/lib/seo/schema";

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

export default async function FeaturePage({ params }: PageProps<"/platform/[slug]">) {
  const { slug } = await params;
  const feature = getFeature(slug);
  if (!feature) notFound();

  const path = featurePath(slug);
  const page = getPage(path);
  const faqs = faqsById(feature.faqIds);
  const visual = featureVisuals[slug];

  const related = feature.related.map((relatedSlug) => {
    const other = getFeature(relatedSlug)!;
    const href = featurePath(relatedSlug);
    return { title: other.name, href, summary: other.summary, image: other.image.src };
  });

  return (
    <PageShell>
      <JsonLd
        nodes={[
          webPageNode({
            path,
            title: page.title,
            description: page.description,
            image: feature.image.src,
            datePublished: page.datePublished,
            dateModified: page.lastModified,
            speakable: [".answer-block", ".key-takeaways"],
          }),
          faqNode(path, faqs),
        ]}
      />

      <PageHero
        eyebrow={feature.eyebrow}
        title={feature.h1}
        highlight={visual.highlight}
        answer={feature.answer}
        updated={page.lastModified}
        image={feature.image}
        chips={visual.chips}
        imageNote={
          <PlanAvailability available={feature.availability} note={feature.availabilityNote} />
        }
        facts={visual.facts}
      />

      <KeyTakeaways items={feature.takeaways} />

      <StorySections sections={feature.sections} images={visual.gallery} />

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
            image: featurePhotos.tabletCalendar.src,
          },
        ]}
      />

      <CtaBand />
    </PageShell>
  );
}
