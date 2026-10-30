/**
 * /llms.txt and /llms-full.txt, generated from the page registry and the
 * content modules so they can never drift from the site.
 */

import { postPath, posts } from "@/content/blog";
import { comparePages, comparePath } from "@/content/compare";
import { comparisonRows } from "@/content/comparison";
import { allFaqs, type Faq } from "@/content/faqs";
import { featurePath, features, type ContentSection } from "@/content/features";
import { plans } from "@/content/plans";
import {
  stateAnswer,
  stateFaqs,
  stateH1,
  statePath,
  states,
  stateSections,
} from "@/content/states";
import { absoluteUrl } from "@/lib/seo/schema";
import { pages, type PageGroup } from "@/lib/seo/pages";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, DEFAULT_DESCRIPTION, SITE_NAME } from "@/lib/site";

const GROUP_ORDER: PageGroup[] = [
  "Home",
  "Platform",
  "Integrations",
  "Pricing",
  "Compare",
  "Resources",
  "Blog",
  "Company",
  "Legal",
  "Locations",
];

export function llmsIndex(): string {
  const lines = [
    `# ${SITE_NAME}`,
    "",
    `> ${DEFAULT_DESCRIPTION}`,
    "",
    "Solara is an AI front office operating system for dental practices in the United States. It answers every call 24/7, verifies insurance, sends digital intake forms, books and reminds patients, runs recall, writes visit notes and reports on practice performance, all synced with OpenDental. It is built for practice owners, office managers and dental groups.",
    "",
    `Contact: ${CONTACT_EMAIL} · ${CONTACT_PHONE_DISPLAY}. Full text of every page: ${absoluteUrl("/llms-full.txt")}`,
    "",
  ];

  for (const group of GROUP_ORDER) {
    const inGroup = pages.filter((page) => page.group === group);
    if (!inGroup.length) continue;
    lines.push(`## ${group}`, "");
    for (const page of inGroup) {
      // Posts are listed by title; everything else by its short label.
      const text =
        page.group === "Blog" && page.path !== "/blog"
          ? page.title.replace(/\s*\|\s*Solara$/, "")
          : page.label;
      lines.push(`- [${text}](${absoluteUrl(page.path)}): ${page.description}`);
    }
    lines.push("");
  }
  return lines.join("\n");
}

const sectionsMd = (sections: ContentSection[]) =>
  sections
    .map((s) =>
      [
        `### ${s.heading}`,
        "",
        ...s.paragraphs.flatMap((p) => [p, ""]),
        ...(s.bullets ?? []).map((b) => `- ${b}`),
      ]
        .join("\n")
        .trim(),
    )
    .join("\n\n");

const faqsMd = (faqs: Faq[]) => faqs.map((f) => `### ${f.question}\n\n${f.answer}`).join("\n\n");

export function llmsFull(): string {
  const out: string[] = [llmsIndex(), "---", ""];

  out.push("# Pricing", "", `Source: ${absoluteUrl("/pricing")}`, "");
  for (const plan of plans) {
    const price = plan.monthlyPrice
      ? `$${plan.monthlyPrice}/month billed monthly, $${plan.annualPrice}/month billed annually`
      : `${plan.customLabel} (${plan.customNote})`;
    out.push(
      `## ${plan.name} — ${price}`,
      "",
      plan.desc,
      "",
      ...plan.features.map((f) => `- ${f}`),
      "",
    );
  }

  for (const feature of features) {
    out.push(
      `# ${feature.h1}`,
      "",
      `Source: ${absoluteUrl(featurePath(feature.slug))}`,
      "",
      feature.answer,
      "",
      "## Key takeaways",
      "",
      ...feature.takeaways.map((t) => `- ${t}`),
      "",
      `Availability: ${feature.availabilityNote}`,
      "",
      sectionsMd(feature.sections),
      "",
    );
  }

  out.push(
    "# Solara vs. a front desk vs. a basic chatbot",
    "",
    `Source: ${absoluteUrl("/compare")}`,
    "",
    "| Capability | In-house front desk | Basic chatbot | Solara |",
    "| --- | --- | --- | --- |",
    ...comparisonRows.map((r) => `| ${r.name} | ${r.fd} | ${r.bot} | ${r.solara} |`),
    "",
  );
  for (const page of comparePages) {
    out.push(
      `# ${page.h1}`,
      "",
      `Source: ${absoluteUrl(comparePath(page.slug))}`,
      "",
      page.answer,
      "",
      sectionsMd(page.sections),
      "",
    );
  }

  for (const post of posts) {
    out.push(
      `# ${post.h1}`,
      "",
      `Source: ${absoluteUrl(postPath(post.slug))} (updated ${post.dateModified})`,
      "",
      post.answer,
      "",
      "## Key takeaways",
      "",
      ...post.takeaways.map((t) => `- ${t}`),
      "",
      sectionsMd(post.sections),
      "",
      ...(post.table
        ? [
            `| ${post.table.columns.join(" | ")} |`,
            `| ${post.table.columns.map(() => "---").join(" | ")} |`,
            ...post.table.rows.map((row) => `| ${row.join(" | ")} |`),
            "",
          ]
        : []),
      faqsMd(post.faqs),
      "",
      "Sources:",
      ...post.citations.map((c) => `- ${c.label}: ${c.url}`),
      "",
    );
  }

  out.push(
    "# Frequently asked questions",
    "",
    `Source: ${absoluteUrl("/faq")}`,
    "",
    faqsMd(allFaqs),
    "",
  );

  out.push(
    "# Dental call recording laws by state",
    "",
    `Source: ${absoluteUrl("/guides/dental-call-recording-laws")}`,
    "",
    "| State | Consent rule | Statute | Notes |",
    "| --- | --- | --- | --- |",
    ...states.map(
      (s) => `| ${s.name} | ${s.recording.rule} | ${s.recording.statute} | ${s.recording.note} |`,
    ),
    "",
  );

  for (const state of states) {
    out.push(
      `# ${stateH1(state)}`,
      "",
      `Source: ${absoluteUrl(statePath(state.slug))}`,
      "",
      stateAnswer(state),
      "",
      sectionsMd(stateSections(state)),
      "",
      faqsMd(stateFaqs(state)),
      "",
    );
  }

  return out.join("\n");
}
