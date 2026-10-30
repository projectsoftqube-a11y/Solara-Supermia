import type { Metadata } from "next";

import {
  ArticleSections,
  CtaBand,
  FaqList,
  KeyTakeaways,
  RelatedLinks,
  StepsSection,
} from "@/components/inner/ContentBlocks";
import { PageHero } from "@/components/inner/PageHero";
import { PageShell } from "@/components/inner/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqsById } from "@/content/faqs";
import type { ContentSection } from "@/content/features";
import { platformLinks } from "@/content/navigation";
import { pageMetadata } from "@/lib/seo/metadata";
import { getPage } from "@/lib/seo/pages";
import { breadcrumbNode, faqNode, webPageNode } from "@/lib/seo/schema";

const PATH = "/integrations/open-dental";
const page = getPage(PATH);

export const metadata: Metadata = pageMetadata(page);

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Platform", path: "/platform" },
  { name: "OpenDental integration", path: PATH },
];

const IMAGE = {
  src: "/images/automation_schedule.png",
  alt: "Tablet showing a color-coded dental appointment calendar",
};

const faqs = faqsById([
  "works-with-open-dental",
  "which-pms-integrations",
  "setup-time",
  "ai-receptionist-books-appointments",
  "book-by-text",
]);

const sections: ContentSection[] = [
  {
    heading: "What does Solara sync with OpenDental?",
    paragraphs: [
      "Solara keeps the records your front office depends on in sync with OpenDental automatically, in both directions, so the schedule and the patient file are always the single source of truth.",
    ],
    bullets: [
      "Patients",
      "Appointments",
      "Providers and operatories",
      "Procedure codes",
      "Insurance",
      "Revenue",
    ],
  },
  {
    heading: "How do AI bookings reach the OpenDental schedule?",
    paragraphs: [
      "Before booking, Solara checks provider and operatory availability in OpenDental and matches the right service and duration. It then books the appointment, and every booking, reschedule and transfer is written back to OpenDental automatically.",
      "That holds for every channel: a phone call answered by the AI receptionist, a text message, or the chat on your website. There is no double entry and no end-of-day reconciliation.",
    ],
  },
  {
    heading: "Do I need to change my phone system?",
    paragraphs: [
      "No. Solara works with OpenDental and your existing phone line. During onboarding you connect your clinic phone number and your OpenDental account, and Solara starts answering on the number patients already know.",
    ],
  },
  {
    heading: "What else uses the OpenDental connection?",
    paragraphs: [
      "The same connection powers the rest of the platform. Insurance verified at intake is saved to the chart, recall works from your own patient list, reminders reflect the live schedule, and analytics read the revenue and procedure data already in OpenDental.",
    ],
  },
  {
    heading: "Does Solara work with other practice management systems?",
    paragraphs: [
      "Solara's practice management integration is with OpenDental. For dental groups, the Enterprise plan adds custom integrations for the rest of your tech stack, scoped during onboarding.",
    ],
  },
];

const relatedHrefs = [
  "/platform/ai-dental-receptionist",
  "/platform/dental-appointment-scheduling",
  "/platform/dental-insurance-verification",
];

export default function OpenDentalPage() {
  return (
    <PageShell>
      <JsonLd
        nodes={[
          webPageNode({
            path: PATH,
            title: page.title,
            description: page.description,
            crumbs,
            image: IMAGE.src,
            datePublished: page.datePublished,
            dateModified: page.lastModified,
            speakable: [".answer-block", ".key-takeaways"],
          }),
          breadcrumbNode(PATH, crumbs),
          faqNode(PATH, faqs),
        ]}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow="OpenDental integration"
        title="Solara and OpenDental: bookings that land straight in your schedule"
        answer="Solara integrates with OpenDental practice management software. It keeps patients, appointments, providers, operatories, procedure codes, insurance and revenue in sync, checks provider and operatory availability before booking, and writes every booking, reschedule and transfer back to OpenDental automatically, so there is no double entry or end-of-day reconciliation."
        updated={page.lastModified}
        image={IMAGE}
      />

      <KeyTakeaways
        items={[
          "Solara reads and writes OpenDental directly, so AI bookings appear in your real schedule.",
          "Provider and operatory availability is checked before every booking.",
          "Patients, insurance, procedure codes and revenue stay in sync with no double entry.",
          "Solara works with your existing phone line; there is nothing new to install.",
        ]}
      />

      <ArticleSections sections={sections} />

      <StepsSection
        heading="How do you connect Solara to OpenDental?"
        items={[
          {
            title: "Connect accounts",
            body: "Link your clinic phone number and OpenDental during guided onboarding.",
          },
          {
            title: "Map your practice",
            body: "Set hours, services, providers and the insurance carriers you accept.",
          },
          {
            title: "Set permissions",
            body: "Choose what the AI may do: booking, rescheduling, FAQs, insurance questions.",
          },
          {
            title: "Test and go live",
            body: "Run test calls in the preview sandbox, then switch Solara on.",
          },
        ]}
      />

      <FaqList faqs={faqs} title="OpenDental integration questions" />

      <RelatedLinks
        title="What runs on the OpenDental connection"
        cards={relatedHrefs.map((href) => {
          const link = platformLinks.find((l) => l.href === href)!;
          return { title: link.label, href, summary: link.description ?? "", icon: link.icon };
        })}
      />

      <CtaBand />
    </PageShell>
  );
}
