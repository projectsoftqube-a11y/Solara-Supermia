import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ComparisonTable } from "@/components/inner/ComparisonTable";
import {
  CtaBand,
  FaqList,
  KeyTakeaways,
  RelatedLinks,
  StorySections,
} from "@/components/inner/ContentBlocks";
import { ScoreBoard } from "@/components/inner/HeroPanels";
import { PageHero } from "@/components/inner/PageHero";
import { Band, Container, PageShell, SectionHeading } from "@/components/inner/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { comparePages, comparePath, getComparePage } from "@/content/compare";
import { faqsById } from "@/content/faqs";
import { platformLinks } from "@/content/navigation";
import { comparePhotos, featurePhotos } from "@/content/photos";
import { pageMetadata } from "@/lib/seo/metadata";
import { getPage } from "@/lib/seo/pages";
import { faqNode, webPageNode } from "@/lib/seo/schema";

export function generateStaticParams() {
  return comparePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/compare/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  if (!getComparePage(slug)) return {};
  return pageMetadata(getPage(comparePath(slug)));
}

export default async function CompareDetailPage({ params }: PageProps<"/compare/[slug]">) {
  const { slug } = await params;
  const compare = getComparePage(slug);
  if (!compare) notFound();

  const path = comparePath(slug);
  const page = getPage(path);
  const faqs = faqsById(compare.faqIds);

  const other = comparePages.find((p) => p.slug !== slug)!;
  const receptionist = platformLinks[0];

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
          }),
          faqNode(path, faqs),
        ]}
      />

      <PageHero
        eyebrow={compare.eyebrow}
        title={compare.h1}
        answer={compare.answer}
        updated={page.lastModified}
        visual={<ScoreBoard columns={[compare.column, "solara"]} />}
      />

      <KeyTakeaways items={compare.takeaways} />

      <Band tone="sand" aria-labelledby="table">
        <Container>
          <SectionHeading
            eyebrow="Side by side"
            id="table"
            title={`How does Solara compare with ${compare.column === "fd" ? "an in-house front desk" : "a basic chatbot"}?`}
          />
          <div className="mt-14">
            <ComparisonTable
              columns={[compare.column, "solara"]}
              caption={`Front-office capabilities: ${compare.columnLabel} compared with Solara`}
            />
          </div>
        </Container>
      </Band>

      <StorySections
        sections={compare.sections}
        images={[comparePhotos[compare.column], featurePhotos.hygieneChair]}
      />

      <FaqList faqs={faqs} title="Common questions" />

      <RelatedLinks
        title="Keep comparing"
        cards={[
          {
            title: "The full comparison",
            href: "/compare",
            summary: "Solara, a front desk and a basic chatbot in one table.",
            image: featurePhotos.ownerTablets.src,
          },
          {
            title: other.name,
            href: comparePath(other.slug),
            summary: other.summary,
            image: comparePhotos[other.column].src,
          },
          {
            title: receptionist.label,
            href: receptionist.href,
            summary: receptionist.description ?? "",
            image: featurePhotos.frontDeskCalendar.src,
          },
        ]}
      />

      <CtaBand />
    </PageShell>
  );
}
