import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  ArticleSections,
  CtaBand,
  FaqList,
  KeyTakeaways,
  RelatedLinks,
} from "@/components/inner/ContentBlocks";
import { ComparisonTable } from "@/components/inner/ComparisonTable";
import { PageHero } from "@/components/inner/PageHero";
import { Container, SectionHeading } from "@/components/inner/PageShell";
import { PageShell } from "@/components/inner/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { comparePages, comparePath, getComparePage } from "@/content/compare";
import { faqsById } from "@/content/faqs";
import { compareLinks, platformLinks } from "@/content/navigation";
import { pageMetadata } from "@/lib/seo/metadata";
import { getPage } from "@/lib/seo/pages";
import { breadcrumbNode, faqNode, webPageNode } from "@/lib/seo/schema";

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
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Compare", path: "/compare" },
    { name: compare.name, path },
  ];

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
            crumbs,
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
        eyebrow={compare.eyebrow}
        title={compare.h1}
        answer={compare.answer}
        updated={page.lastModified}
      />

      <KeyTakeaways items={compare.takeaways} />

      <section aria-labelledby="table" className="pt-16 sm:pt-24">
        <Container>
          <SectionHeading
            eyebrow="Side by side"
            id="table"
            title={`How does Solara compare with ${compare.column === "fd" ? "an in-house front desk" : "a basic chatbot"}?`}
          />
          <div className="mt-10">
            <ComparisonTable
              columns={[compare.column, "solara"]}
              caption={`Front-office capabilities: ${compare.columnLabel} compared with Solara`}
            />
          </div>
        </Container>
      </section>

      <ArticleSections sections={compare.sections} />

      <FaqList faqs={faqs} title="Common questions" />

      <RelatedLinks
        title="Keep comparing"
        cards={[
          {
            title: "The full comparison",
            href: "/compare",
            summary: "Solara, a front desk and a basic chatbot in one table.",
            icon: compareLinks[0].icon,
          },
          {
            title: other.name,
            href: comparePath(other.slug),
            summary: other.summary,
            icon: compareLinks.find((link) => link.href === comparePath(other.slug))?.icon,
          },
          {
            title: receptionist.label,
            href: receptionist.href,
            summary: receptionist.description ?? "",
            icon: receptionist.icon,
          },
        ]}
      />

      <CtaBand />
    </PageShell>
  );
}
