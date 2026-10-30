/**
 * Registry of every public page. The sitemap, robots, llms.txt, Open Graph
 * images and page metadata are all generated from this list, so adding a page
 * here is what makes it discoverable.
 */

import { postPath, posts } from "@/content/blog";
import { comparePages, comparePath } from "@/content/compare";
import { featurePath, features } from "@/content/features";
import { stateDescription, statePath, states, stateTitle } from "@/content/states";
import { CONTENT_PUBLISHED, CONTENT_UPDATED, DEFAULT_DESCRIPTION, DEFAULT_TITLE } from "@/lib/site";

export type PageGroup =
  | "Home"
  | "Platform"
  | "Integrations"
  | "Pricing"
  | "Compare"
  | "Resources"
  | "Blog"
  | "Locations"
  | "Company"
  | "Legal";

export type PageInfo = {
  path: string;
  /** <title> and og:title. 15–60 characters. */
  title: string;
  /** Meta description. 70–155 characters. */
  description: string;
  /** Short label for the OG image eyebrow, llms.txt and listings. */
  label: string;
  group: PageGroup;
  /** YYYY-MM-DD of the last substantive content change. */
  lastModified: string;
  datePublished?: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
};

const newPage = { lastModified: CONTENT_UPDATED, datePublished: CONTENT_PUBLISHED } as const;

const staticPages: PageInfo[] = [
  {
    path: "/",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    label: "AI front office for dental practices",
    group: "Home",
    lastModified: "2026-10-27",
    priority: 1,
    changeFrequency: "weekly",
  },
  {
    path: "/platform",
    title: "AI Dental Front Office Platform: Every Feature | Solara",
    description:
      "One AI front office for dental practices: calls, insurance verification, intake, booking, recall, reminders, notes and analytics, synced with OpenDental.",
    label: "Platform overview",
    group: "Platform",
    ...newPage,
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    path: "/integrations/open-dental",
    title: "OpenDental AI Integration for Calls & Booking | Solara",
    description:
      "Solara syncs with OpenDental: AI calls, bookings, insurance and intake write straight into your schedule and patient records, with no double entry.",
    label: "OpenDental integration",
    group: "Integrations",
    ...newPage,
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    path: "/pricing",
    title: "Solara Pricing: AI Dental Front Office Plans",
    description:
      "Compare Solara's Essentials, Pro and Enterprise plans: prices, AI call minutes, features and support. Founding clinics get 2 months free on Essentials.",
    label: "Pricing",
    group: "Pricing",
    ...newPage,
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    path: "/compare",
    title: "Solara vs. Front Desk vs. Chatbot: Comparison | Solara",
    description:
      "See how an AI front office compares with an in-house dental front desk and a basic website chatbot, across 13 front-office capabilities.",
    label: "Compare Solara",
    group: "Compare",
    ...newPage,
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    path: "/faq",
    title: "Solara FAQ: AI Dental Front Office Questions Answered",
    description:
      "Answers to the questions dental teams ask about Solara: pricing, setup, OpenDental, insurance verification, call handling, HIPAA and security.",
    label: "Frequently asked questions",
    group: "Resources",
    ...newPage,
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    path: "/guides/dental-call-recording-laws",
    title: "Dental Call Recording Laws by State (All 50) | Solara",
    description:
      "Is your state one-party or all-party consent? A state-by-state guide to call recording laws for dental practices, with the statute for each state.",
    label: "Call recording laws by state",
    group: "Resources",
    ...newPage,
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/blog",
    title: "Solara Blog: Dental Front Office Guides",
    description:
      "Practical, sourced guides for dental practices: insurance verification, recall, no-shows, digital intake, Open Dental workflows and front-office KPIs.",
    label: "Blog",
    group: "Blog",
    ...newPage,
    priority: 0.7,
    changeFrequency: "weekly",
  },
  {
    path: "/locations",
    title: "Solara for Dental Practices in All 50 States | Solara",
    description:
      "Solara serves dental practices across the US. Find your state for its call recording consent rule, time zones, dental board and Medicaid dental program.",
    label: "Locations",
    group: "Locations",
    ...newPage,
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    path: "/contact",
    title: "Contact Solara: Talk to the Dental AI Team",
    description:
      "Reach the Solara team by email or phone, book a 20-minute demo, or schedule a call at a time that suits your practice.",
    label: "Contact",
    group: "Company",
    ...newPage,
    priority: 0.6,
    changeFrequency: "yearly",
  },
  {
    path: "/book-a-demo",
    title: "Book a Demo — Supercharge Your Dental Practice with Solara",
    description:
      "Book a 20-minute demo and see how Solara runs your entire dental front office — insurance, calls, booking, intake, recall — on autopilot.",
    label: "Book a demo",
    group: "Company",
    lastModified: "2026-08-04",
    priority: 0.8,
    changeFrequency: "yearly",
  },
  {
    path: "/schedule-call",
    title: "Schedule a Call with a Solara Dental AI Specialist",
    description:
      "Schedule a call with a Solara specialist. Pick a date on the calendar, choose a time, and enter your details to hear Solara in action.",
    label: "Schedule a call",
    group: "Company",
    lastModified: "2026-07-30",
    priority: 0.6,
    changeFrequency: "yearly",
  },
  {
    path: "/privacy-policy",
    title: "Privacy Policy — Solara AI Front Office OS",
    description:
      "How Solara collects, uses, and protects practice and patient data across our AI front office platform for dental practices.",
    label: "Privacy policy",
    group: "Legal",
    lastModified: "2026-10-15",
    priority: 0.3,
    changeFrequency: "yearly",
  },
  {
    path: "/terms-conditions",
    title: "Terms & Conditions — Solara AI Front Office OS",
    description:
      "The terms governing your practice's use of the Solara AI Front Office OS platform, including services, responsibilities, and liability.",
    label: "Terms & conditions",
    group: "Legal",
    lastModified: "2026-10-10",
    priority: 0.3,
    changeFrequency: "yearly",
  },
  {
    path: "/hipaa-compliance",
    title: "HIPAA Compliance — Solara AI Front Office OS",
    description:
      "How Solara safeguards Protected Health Information (PHI) through HIPAA and HITECH-compliant architecture, BAAs, encryption, and audit logging.",
    label: "HIPAA compliance",
    group: "Legal",
    lastModified: "2026-10-12",
    priority: 0.5,
    changeFrequency: "yearly",
  },
];

const featurePages: PageInfo[] = features.map((feature) => ({
  path: featurePath(feature.slug),
  title: feature.title,
  description: feature.description,
  label: feature.name,
  group: "Platform",
  ...newPage,
  priority: 0.9,
  changeFrequency: "monthly",
}));

const compareDetailPages: PageInfo[] = comparePages.map((page) => ({
  path: comparePath(page.slug),
  title: page.title,
  description: page.description,
  label: page.name,
  group: "Compare",
  ...newPage,
  priority: 0.6,
  changeFrequency: "monthly",
}));

const statePages: PageInfo[] = states.map((state) => ({
  path: statePath(state.slug),
  title: stateTitle(state),
  description: stateDescription(state),
  label: `Dental practices in ${state.name}`,
  group: "Locations",
  ...newPage,
  priority: 0.5,
  changeFrequency: "monthly",
}));

const blogPages: PageInfo[] = posts.map((post) => ({
  path: postPath(post.slug),
  title: post.title,
  description: post.description,
  label: post.category,
  group: "Blog",
  lastModified: post.dateModified,
  datePublished: post.datePublished,
  priority: 0.7,
  changeFrequency: "monthly",
}));

export const pages: PageInfo[] = [
  ...staticPages,
  ...featurePages,
  ...compareDetailPages,
  ...blogPages,
  ...statePages,
];

const BY_PATH = new Map(pages.map((page) => [page.path, page]));

export function getPage(path: string): PageInfo {
  const page = BY_PATH.get(path);
  if (!page) throw new Error(`No page registered for ${path}`);
  return page;
}

export function hasPage(path: string): boolean {
  return BY_PATH.has(path);
}
