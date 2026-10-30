import type { Metadata } from "next";

import { CtaBand, FaqList, KeyTakeaways, RelatedLinks } from "@/components/inner/ContentBlocks";
import { ComparisonTable } from "@/components/inner/ComparisonTable";
import { PageHero } from "@/components/inner/PageHero";
import { Container, SectionHeading } from "@/components/inner/PageShell";
import { PageShell } from "@/components/inner/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { comparePages, comparePath } from "@/content/compare";
import { comparisonRows } from "@/content/comparison";
import { faqsById } from "@/content/faqs";
import { compareLinks } from "@/content/navigation";
import { pageMetadata } from "@/lib/seo/metadata";
import { getPage } from "@/lib/seo/pages";
import { breadcrumbNode, faqNode, itemListNode, webPageNode } from "@/lib/seo/schema";

const PATH = "/compare";
const page = getPage(PATH);

export const metadata: Metadata = pageMetadata(page);

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Compare", path: PATH },
];

const faqs = faqsById([
  "different-from-a-chatbot",
  "more-than-a-voice-bot",
  "what-is-an-ai-dental-front-office",
]);

const solaraOnly = comparisonRows.filter((row) => row.fd !== "yes" && row.bot !== "yes").length;

export default function ComparePage() {
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
            "Solara comparisons",
            comparePages.map((p) => ({
              name: p.name,
              path: comparePath(p.slug),
              description: p.summary,
            })),
          ),
          faqNode(PATH, faqs),
        ]}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow="Compare"
        title="Solara vs. a front desk vs. a basic chatbot"
        answer={`Solara is a complete AI front office, so it covers work that neither an in-house front desk nor a basic website chatbot fully handles. Across the ${comparisonRows.length} front-office capabilities compared below, Solara covers every one, while the front desk and the chatbot each cover only some of them, or cover them only partly.`}
        updated={page.lastModified}
      />

      <KeyTakeaways
        items={[
          "A front desk handles most tasks, but only as time allows and only during office hours.",
          "A basic chatbot replies in a website chat window; it does not answer phones or touch your schedule.",
          `Solara covers all ${comparisonRows.length} capabilities; neither alternative fully covers ${solaraOnly === comparisonRows.length ? "any of them" : `${solaraOnly} of them`}.`,
          "Solara also supports SEO and Google Ads so nearby patients find your clinic first.",
        ]}
      />

      <section aria-labelledby="table" className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Side by side"
            id="table"
            title="Which front-office tasks does each option cover?"
            intro="“Limited” means the option can do it, but not consistently: only during office hours, only when staff have time, or only in a chat window."
          />
          <div className="mt-10">
            <ComparisonTable caption="Front-office capabilities of an in-house front desk, a basic chatbot and Solara" />
          </div>
        </Container>
      </section>

      <RelatedLinks
        eyebrow="Deep dives"
        title="Read the detailed comparisons"
        cards={comparePages.map((p) => ({
          title: p.name,
          href: comparePath(p.slug),
          summary: p.summary,
          icon: compareLinks.find((link) => link.href === comparePath(p.slug))?.icon,
        }))}
      />

      <FaqList faqs={faqs} title="Comparison questions" />

      <CtaBand />
    </PageShell>
  );
}
