/**
 * The /compare pages. Each one is built on the capability table in
 * content/comparison.ts, which is the same table shown on the home page.
 */

import type { ContentSection } from "@/content/features";

export type ComparePage = {
  slug: string;
  name: string;
  summary: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  answer: string;
  takeaways: string[];
  /** Which alternative column of the comparison table this page is about. */
  column: "fd" | "bot";
  columnLabel: string;
  sections: ContentSection[];
  faqIds: string[];
};

export const comparePages: ComparePage[] = [
  {
    slug: "ai-front-office-vs-front-desk-staff",
    name: "Solara vs. an in-house front desk",
    summary: "What an AI front office covers that a busy front desk can't.",
    title: "AI Front Office vs. In-House Dental Front Desk | Solara",
    description:
      "How Solara's AI front office compares with an in-house dental front desk on calls, insurance, intake, recall and after-hours coverage, task by task.",
    eyebrow: "Compare",
    h1: "Solara vs. an in-house dental front desk",
    answer:
      "An in-house front desk handles calls, insurance, intake and recall during office hours, as time allows. Solara does the same front-office work automatically and around the clock: it answers every call 24/7, verifies insurance at intake, sends digital forms, runs recall and writes everything back to OpenDental, while your team focuses on patients in the office.",
    takeaways: [
      "A front desk can only answer calls while staff are at the desk; Solara answers every call 24/7.",
      "Insurance checks, intake, recall and reminders are done automatically instead of when there is time.",
      "Solara writes bookings and updates straight into OpenDental, so there is no double entry.",
      "Calls that need a person are transferred to your team with a summary of the conversation.",
    ],
    column: "fd",
    columnLabel: "In-house front desk",
    sections: [
      {
        heading: "What can't an in-house front desk cover?",
        paragraphs: [
          "A front desk is staffed for office hours and for one conversation at a time. Calls that come in after hours, at lunch or while every line is busy slip to voicemail, and website visitors who want to book at night have no one to talk to.",
          "Solara covers exactly those gaps: it answers every call 24/7, handles overflow when lines are busy, and books visits by text and website chat.",
        ],
      },
      {
        heading: "Where does Solara take work off the team?",
        paragraphs: [
          "Most front-office tasks are possible for a front desk, but only as time allows. Solara does them automatically, every time:",
        ],
        bullets: [
          "Verifying insurance eligibility and benefits at intake",
          "Sending and collecting digital intake forms",
          "Running recall and reactivation, and refilling cancellations",
          "Sending reminders and confirmations",
          "Writing visit notes and keeping OpenDental up to date",
        ],
      },
      {
        heading: "Does Solara replace front-desk staff?",
        paragraphs: [
          "Solara is built so a practice does not have to hire more people to keep up with the phones and the paperwork. Your team stays in charge of the patients in front of them, and Solara transfers any call that needs a person, with a summary, so nothing is lost in the handover.",
        ],
      },
    ],
    faqIds: [
      "what-is-an-ai-dental-front-office",
      "transfers-calls-to-staff",
      "answers-after-hours",
      "setup-time",
    ],
  },
  {
    slug: "ai-front-office-vs-dental-chatbot",
    name: "Solara vs. a basic chatbot",
    summary: "Why answering the phone and acting beats replying in a chat box.",
    title: "AI Dental Front Office vs. a Basic Chatbot | Solara",
    description:
      "A basic chatbot replies on your website. Solara answers phone calls, books into OpenDental, verifies insurance and follows up. See the full comparison.",
    eyebrow: "Compare",
    h1: "Solara vs. a basic dental website chatbot",
    answer:
      "A basic website chatbot answers questions in a chat window. Solara includes a website chat helper too, but it also answers the actual phone, books into your real OpenDental schedule, verifies insurance, sends intake forms and reminders, and follows up with recall. It acts on a patient's request instead of only replying to it.",
    takeaways: [
      "Most patients still call; Solara answers the phone as well as website chat and text.",
      "Solara books into your real OpenDental schedule instead of collecting a request to call back.",
      "Insurance verification, intake, recall and notes are outside what a basic chatbot does.",
      "Every call is recorded and transcribed so you can review and coach the AI.",
    ],
    column: "bot",
    columnLabel: "Basic chatbot",
    sections: [
      {
        heading: "What is the difference between Solara and a chatbot?",
        paragraphs: [
          "A basic chatbot lives in a chat window on your website and replies to typed questions. It does not pick up your phone, and it usually cannot touch your schedule.",
          "Solara answers the actual phone call, books into your real schedule, writes back to OpenDental and follows up afterwards. It acts; it does not just reply.",
        ],
      },
      {
        heading: "Which front-office jobs does a basic chatbot leave undone?",
        paragraphs: ["Compared capability by capability, a basic chatbot does not:"],
        bullets: [
          "Verify insurance or book into OpenDental",
          "Send and collect intake forms",
          "Write visit notes or run recall and reactivation",
          "Fill cancellations from a waitlist",
          "Provide analytics on calls, bookings and revenue",
        ],
      },
      {
        heading: "Does Solara still include website chat?",
        paragraphs: [
          "Yes. Solara includes a chat helper for your website that answers questions and books visits, and patients can also book, reschedule or confirm by text. Chat is one channel of the front office, not the whole thing.",
        ],
      },
    ],
    faqIds: [
      "different-from-a-chatbot",
      "more-than-a-voice-bot",
      "book-by-text",
      "call-recordings-and-transcripts",
    ],
  },
];

const BY_SLUG = new Map(comparePages.map((page) => [page.slug, page]));

export function getComparePage(slug: string): ComparePage | undefined {
  return BY_SLUG.get(slug);
}

export function comparePath(slug: string): string {
  return `/compare/${slug}`;
}
