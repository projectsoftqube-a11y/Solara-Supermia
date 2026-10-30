/**
 * Every FAQ on the site. Pages pick entries by id, and the FAQPage structured
 * data is generated from the same objects, so the rendered text and the schema
 * text are always identical.
 */

import { plans } from "@/content/plans";

export type Faq = {
  id: string;
  question: string;
  answer: string;
};

const [essentials, pro, enterprise] = plans;

const usd = (n?: number) => (n === undefined ? "" : `$${n.toLocaleString("en-US")}`);

/** The 17 questions shown on the home page, in display order. */
const HOME: Faq[] = [
  {
    id: "free-first-two-months",
    question: "Is it really free for the first 2 months?",
    answer:
      "Yes, on the Essentials plan. Founding clinics run Essentials free for the first two months, with no setup fee and the option to cancel anytime. You use the time to launch Solara and see the schedule impact before any monthly bill starts. Pro and Enterprise are billed from the first month.",
  },
  {
    id: "more-than-a-voice-bot",
    question: "Is this just a voice bot?",
    answer:
      "No. Voice is one part. Solara verifies insurance, sends intake forms, books and reschedules, runs recall, writes notes, shows your numbers, and helps with SEO and Google Ads so new patients find you. All automatically.",
  },
  {
    id: "how-insurance-verification-works",
    question: "How does insurance verification work?",
    answer:
      "Solara checks eligibility and benefits with your configured carriers at intake, so the plan, copay, and remaining benefits are on the chart before the patient sits down. No more time on hold with carriers.",
  },
  {
    id: "seo-and-google-ads-help",
    question: "Do you really help with SEO and Google Ads?",
    answer:
      "Yes. Alongside the front office, Solara supports your search presence and Google Ads so nearby patients searching for a dentist find your clinic first, and that traffic is tracked through to real bookings.",
  },
  {
    id: "ai-receptionist-books-appointments",
    question: "Can an AI receptionist book dental appointments?",
    answer:
      "Yes. Solara Dental AI checks provider and operatory availability, matches the right service and duration, books the appointment, and confirms it - all in a single phone conversation.",
  },
  {
    id: "works-with-open-dental",
    question: "Does Solara Dental AI work with OpenDental?",
    answer:
      "Yes. The OpenDental integration keeps patients, appointments, providers, operatories, procedure codes, insurance, and revenue in sync automatically - no double entry.",
  },
  {
    id: "transfers-calls-to-staff",
    question: "Can it transfer calls to my staff?",
    answer:
      "Yes. For sensitive or complex situations, the AI receptionist transfers the call to your team and passes along a summary of the conversation, so the patient never has to repeat themselves.",
  },
  {
    id: "answers-insurance-questions",
    question: "Will it answer insurance questions?",
    answer:
      "Yes. You configure your accepted carriers, plan types, and payment options in settings, and the AI answers patient questions from that - in your words, your hours, your rules.",
  },
  {
    id: "sends-appointment-reminders",
    question: "Does it send appointment reminders?",
    answer:
      "Yes. Solara Dental AI sends automated reminders and confirmations by SMS - and WhatsApp where supported - to reduce no-shows without anyone on your team dialing.",
  },
  {
    id: "call-recordings-and-transcripts",
    question: "Can I review call recordings and transcripts?",
    answer:
      "Yes. Every call is recorded and transcribed, so you can review quality and coach the AI any time.",
  },
  {
    id: "setup-time",
    question: "How long does setup take?",
    answer:
      "We run a guided onboarding: connect your clinic phone number and OpenDental, set your hours, services, providers, and insurance, choose what the AI is allowed to do, then run a test in the preview sandbox and switch it on.",
  },
  {
    id: "different-from-a-chatbot",
    question: "How is it different from a chatbot?",
    answer:
      "Solara includes a website chatbot - but it doesn't stop there. It answers the actual phone call, books into your real schedule, writes back to OpenDental, and follows up. It acts - it doesn't just reply.",
  },
  {
    id: "control-what-ai-does",
    question: "Can I control what the AI is allowed to do?",
    answer:
      "Yes. In settings you choose the receptionist's name, voice, and greeting, and toggle capabilities like booking, rescheduling, FAQs, and insurance questions. The AI only does what you switch on.",
  },
  {
    id: "emergencies-and-clinical-questions",
    question: "What happens with emergencies or complex clinical questions?",
    answer:
      "The AI recognises when a call needs a person and transfers it to your team with a summary of what was discussed, so your staff can pick up the conversation without missing context.",
  },
  {
    id: "book-by-text",
    question: "Can patients book just by texting?",
    answer:
      "Yes. A patient can text your number and Solara books, reschedules, or confirms the visit right in the message thread - and writes it into OpenDental.",
  },
  {
    id: "verifies-insurance",
    question: "Does Solara verify insurance?",
    answer:
      "Yes. Solara checks the patient's coverage and eligibility before the visit, so your team sees the breakdown up front - fewer billing surprises and faster check-ins.",
  },
  {
    id: "seo-and-google-ads-included",
    question: "What SEO and Google Ads help is included?",
    answer:
      "Solara isn't only a front office. It also helps new patients find you. We support SEO and Google Ads so your clinic shows up when people nearby search for a dentist.",
  },
];

/** Additional questions used by the inner pages and /faq. */
const MORE: Faq[] = [
  {
    id: "what-is-an-ai-dental-front-office",
    question: "What is an AI dental front office?",
    answer:
      "An AI dental front office is software that handles a practice's front-desk work automatically: answering calls, booking appointments, verifying insurance, sending intake forms and reminders, running recall, and writing visit notes. Solara does this for dental practices and syncs everything with OpenDental.",
  },
  {
    id: "what-is-an-ai-dental-receptionist",
    question: "What is an AI dental receptionist?",
    answer:
      "An AI dental receptionist is a voice agent that answers a dental practice's phone calls, books and reschedules appointments, and answers patient questions. Solara's AI receptionist answers 24/7, books into OpenDental, and transfers sensitive calls to staff with a summary.",
  },
  {
    id: "how-much-does-solara-cost",
    question: "How much does Solara cost?",
    answer: `Solara has three plans. Essentials is ${usd(essentials.monthlyPrice)} per month, or ${usd(essentials.annualPrice)} per month billed annually. Pro is ${usd(pro.monthlyPrice)} per month, or ${usd(pro.annualPrice)} per month billed annually. ${enterprise.name} is custom-priced for multi-location dental groups.`,
  },
  {
    id: "what-every-plan-includes",
    question: "What is included in every Solara plan?",
    answer:
      "All plans include insurance verification, paperless intake, OpenDental integration, and unlimited concurrent calls.",
  },
  {
    id: "ai-call-minutes",
    question: "How many AI call minutes does each plan include?",
    answer:
      "Essentials includes 1,500 AI call minutes per month, Pro includes 5,000 AI call minutes per month, and Enterprise includes unlimited AI call minutes.",
  },
  {
    id: "annual-billing-savings",
    question: "Is there a discount for annual billing?",
    answer: `Yes. Annual billing lowers Essentials to ${usd(essentials.annualPrice)} per month, a saving of ${usd(essentials.savings)} a year, and Pro to ${usd(pro.annualPrice)} per month, a saving of ${usd(pro.savings)} a year.`,
  },
  {
    id: "support-response-times",
    question: "What support does each Solara plan include?",
    answer:
      "Essentials includes email support with a 24-hour response. Pro includes priority support with a 4-hour response. Enterprise includes a dedicated Customer Success Manager, white-glove onboarding, and 1-hour support.",
  },
  {
    id: "multi-location-support",
    question: "Does Solara work for dental groups with multiple locations?",
    answer:
      "Yes. The Enterprise plan adds a multi-practice roll-up, centralized activity across all locations, role-based team access, unlimited providers and operatories, and revenue analytics by provider, procedure and carrier.",
  },
  {
    id: "is-solara-hipaa-compliant",
    question: "Is Solara HIPAA compliant?",
    answer:
      "Solara is built to comply with HIPAA and the HITECH Act. Every practice signs a Business Associate Agreement before onboarding, ePHI is encrypted with TLS 1.3 in transit and AES-256 at rest, data is stored in US cloud regions, and every access to PHI is written to an audit log.",
  },
  {
    id: "which-pms-integrations",
    question: "Which practice management software does Solara integrate with?",
    answer:
      "Solara integrates with OpenDental, syncing patients, appointments, providers, operatories, procedure codes, insurance and revenue. The Enterprise plan adds custom integrations for the rest of a group's tech stack.",
  },
  {
    id: "answers-after-hours",
    question: "Does Solara answer calls after hours?",
    answer:
      "Yes. Solara's AI receptionist answers every call 24/7, including after hours, at lunch and during busy periods, and can book the patient straight into the schedule.",
  },
  {
    id: "how-recall-works",
    question: "How does Solara run patient recall?",
    answer:
      "Solara finds patients who are overdue for a visit and sends them personalized texts with a booking link. On the Pro plan, outbound voice AI also calls for recall, reminders and the waitlist, and campaigns fill cancelled slots automatically.",
  },
  {
    id: "how-intake-works",
    question: "How do digital intake forms work in Solara?",
    answer:
      "When a visit is booked, Solara texts the patient a secure intake link. The patient completes forms, history and consents on their phone before arriving, and the answers are saved to their chart.",
  },
  {
    id: "how-clinical-notes-work",
    question: "Can Solara write dental visit notes?",
    answer:
      "Yes. On the Pro plan, Solara writes visit notes automatically after each appointment, so the team does not have to type them up at the end of the day.",
  },
  {
    id: "what-analytics-show",
    question: "What does Solara's analytics dashboard show?",
    answer:
      "Solara's dashboard shows appointments, patients, revenue and insurance at a glance, and lets you switch between calls, bookings and revenue across a date range. Enterprise adds revenue analytics by provider, procedure and carrier across every location.",
  },
  {
    id: "reminder-channels",
    question: "Which channels does Solara use for appointment reminders?",
    answer:
      "Solara sends appointment reminders and confirmations by text message and email, and by WhatsApp where supported.",
  },
  {
    id: "do-patients-need-an-app",
    question: "Do patients need to download an app?",
    answer:
      "No. Patients talk to Solara on a normal phone call, reply by text message, or use the chat on your website. Intake forms open from a secure link in the browser on their phone.",
  },
];

const ALL: Faq[] = [...HOME, ...MORE];

const BY_ID = new Map(ALL.map((faq) => [faq.id, faq]));

/** The home page FAQ section, in its original order. */
export const homeFaqs: Faq[] = HOME;

/** Every FAQ, for the /faq page. */
export const allFaqs: Faq[] = ALL;

/** Look up FAQs by id; throws at build time if an id is misspelled. */
export function faqsById(ids: readonly string[]): Faq[] {
  return ids.map((id) => {
    const faq = BY_ID.get(id);
    if (!faq) throw new Error(`Unknown FAQ id: ${id}`);
    return faq;
  });
}
