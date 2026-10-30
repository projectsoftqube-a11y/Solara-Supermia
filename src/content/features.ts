/**
 * The /platform/* feature pages. Each page renders from one entry here, and
 * its metadata, Open Graph image, sitemap entry, llms.txt line and structured
 * data are all derived from the same entry.
 *
 * Every product claim below is taken from what Solara already states on the
 * site (home sections, FAQ, pricing, HIPAA page). Do not add capabilities,
 * statistics or integrations that are not confirmed.
 */

import type { Plan } from "@/content/plans";

export type ContentSection = {
  /** Question-form H2; the first paragraph answers it directly. */
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Step = { title: string; body: string };

export type Citation = { label: string; url: string };

export type FeaturePage = {
  slug: string;
  /** Short name for navigation and cards. */
  name: string;
  /** One line for menus and cards. */
  summary: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  /** 40–60 word standalone answer shown under the H1 (speakable). */
  answer: string;
  takeaways: string[];
  image: { src: string; alt: string };
  availability: Plan["id"][];
  availabilityNote: string;
  sections: ContentSection[];
  steps?: { heading: string; items: Step[] };
  faqIds: string[];
  related: string[];
  citations?: Citation[];
};

const PATIENT_PRISM: Citation = {
  label: "Patient Prism, Dental Patient Access Report (2025 call data)",
  url: "https://www.patientprism.com/report/dental-patient-access-report/",
};

export const features: FeaturePage[] = [
  {
    slug: "ai-dental-receptionist",
    name: "AI Receptionist",
    summary: "Answers every call 24/7 and books into OpenDental.",
    title: "AI Dental Receptionist That Books Into OpenDental | Solara",
    description:
      "Solara's AI dental receptionist answers every call 24/7, books into OpenDental, answers insurance questions and hands sensitive calls to your team.",
    eyebrow: "AI receptionist",
    h1: "The AI dental receptionist that answers every call",
    answer:
      "Solara's AI dental receptionist answers every call to your practice 24/7, including after hours, at lunch and when the line is busy. It books, reschedules and confirms appointments directly in OpenDental, answers insurance questions from your own settings, and transfers sensitive calls to your team with a summary of the conversation.",
    takeaways: [
      "Solara answers every inbound call 24/7, so after-hours and overflow calls stop going to voicemail.",
      "Appointments are booked straight into OpenDental with the right provider, operatory, service and duration.",
      "Patients get answers about accepted insurance, hours and services from settings your practice controls.",
      "Sensitive or complex calls are transferred to staff with a summary, so patients never repeat themselves.",
      "Every call is recorded and transcribed, so you can review quality and coach the AI at any time.",
    ],
    image: {
      src: "/images/custom_images/ai_receptionist_voice.png",
      alt: "Call dashboard showing a live patient call transcript and call analytics",
    },
    availability: ["essentials", "pro", "enterprise"],
    availabilityNote:
      "Inbound voice AI is included from Essentials. Pro adds outbound calling for recall, reminders and the waitlist.",
    sections: [
      {
        heading: "What does an AI dental receptionist do?",
        paragraphs: [
          "An AI dental receptionist is a voice agent that picks up a dental practice's phone calls and handles them the way a trained front-desk team member would: it greets the caller, understands what they need, and acts on it.",
          "With Solara, that means the call ends with something done, not a message taken. The receptionist works inside your real schedule and your own practice rules.",
        ],
        bullets: [
          "Books, reschedules and confirms appointments during the call",
          "Answers questions about services, hours and accepted insurance",
          "Covers after hours, lunch breaks and busy periods",
          "Transfers emergencies and complex questions to your team",
        ],
      },
      {
        heading: "How does Solara book an appointment during a call?",
        paragraphs: [
          "Solara checks provider and operatory availability, matches the right service and duration, books the appointment and confirms it, all in a single phone conversation.",
          "The booking is written back to OpenDental automatically, so there is no double entry and nothing to reconcile at the end of the day. The patient receives a confirmation text.",
        ],
      },
      {
        heading: "What happens when a call needs a person?",
        paragraphs: [
          "The AI recognises when a call needs a person and transfers it to your team with a summary of what was discussed, so staff pick up the conversation without missing context.",
          "That covers dental emergencies, complex clinical questions and anything sensitive. You decide which situations are handed over.",
        ],
      },
      {
        heading: "Can I control what the AI receptionist says and does?",
        paragraphs: [
          "Yes. In settings you choose the receptionist's name, voice and greeting, and you switch individual capabilities such as booking, rescheduling, FAQs and insurance questions on or off. The AI only does what you enable.",
          "Answers about insurance come from the carriers, plan types and payment options you configure, in your words, with your hours and your rules.",
        ],
      },
      {
        heading: "Why do missed calls matter so much for a dental practice?",
        paragraphs: [
          "Every unanswered call is a patient who may book somewhere else. In Patient Prism's analysis of 11.5 million calls to 8,280 dental practice and DSO locations in 2025, 31 of every 100 callers hung up before reaching anyone at the practice.",
          "An AI receptionist removes the hold queue and the voicemail box from that picture: the call is answered on the first ring, at any hour, and it can end in a booked appointment.",
        ],
      },
    ],
    steps: {
      heading: "How do you set up Solara's AI receptionist?",
      items: [
        {
          title: "Connect your phone and OpenDental",
          body: "Link your clinic phone number and your OpenDental account during guided onboarding.",
        },
        {
          title: "Set hours, services and providers",
          body: "Add your hours, services, providers and the insurance carriers you accept.",
        },
        {
          title: "Choose what the AI may do",
          body: "Pick the receptionist's name, voice and greeting, and turn capabilities on or off.",
        },
        {
          title: "Test it, then switch it on",
          body: "Run test calls in the preview sandbox, then go live on your real phone line.",
        },
      ],
    },
    faqIds: [
      "what-is-an-ai-dental-receptionist",
      "ai-receptionist-books-appointments",
      "answers-after-hours",
      "transfers-calls-to-staff",
      "emergencies-and-clinical-questions",
      "control-what-ai-does",
      "call-recordings-and-transcripts",
      "different-from-a-chatbot",
    ],
    related: [
      "dental-appointment-scheduling",
      "dental-insurance-verification",
      "dental-appointment-reminders",
    ],
    citations: [PATIENT_PRISM],
  },
  {
    slug: "dental-insurance-verification",
    name: "Insurance Verification",
    summary: "Eligibility and benefits on the chart before the visit.",
    title: "Automated Dental Insurance Verification | Solara",
    description:
      "Solara verifies dental insurance eligibility and benefits at intake, so coverage is on the chart before the patient sits down, with no carrier hold time.",
    eyebrow: "Insurance verification",
    h1: "Dental insurance verification, done before the patient sits down",
    answer:
      "Solara automates dental insurance verification. When a patient books, it checks eligibility and benefits with your configured carriers through a clearinghouse and saves the breakdown, including the plan, copay and remaining benefits, to the patient's chart, so coverage is confirmed before the visit instead of on hold with a carrier.",
    takeaways: [
      "Solara checks eligibility and benefits automatically at intake, as soon as a visit is booked.",
      "The plan, copay and remaining benefits are on the chart before the patient arrives.",
      "Patients can ask coverage questions on the phone, and Solara answers from your accepted-carrier settings.",
      "Insurance verification is included in every Solara plan.",
    ],
    image: {
      src: "/images/cap_insurance.png",
      alt: "Tablet at a dental front desk showing an insurance verified confirmation",
    },
    availability: ["essentials", "pro", "enterprise"],
    availabilityNote: "Insurance verification is included in every plan.",
    sections: [
      {
        heading: "What is dental insurance verification?",
        paragraphs: [
          "Dental insurance verification is the process of confirming that a patient's coverage is active and finding out what their plan will pay before treatment. Done well, it prevents surprise bills for the patient and denied claims for the practice.",
          "Done by hand, it means logging into payer portals or waiting on hold with carriers, often for the same handful of questions many times a day.",
        ],
      },
      {
        heading: "How does Solara verify dental insurance?",
        paragraphs: [
          "When a patient books, Solara queries the clearinghouse for that patient's coverage and receives an eligibility and benefits breakdown. The breakdown is saved to the patient's chart, ready for check-in.",
          "Because it runs at intake, coverage is confirmed before the chair is set, not at the front desk while the patient waits.",
        ],
        bullets: [
          "Eligibility and active coverage",
          "Plan and copay",
          "Remaining benefits for the year",
        ],
      },
      {
        heading: "Can patients ask insurance questions on the phone?",
        paragraphs: [
          "Yes. The same coverage questions your team answers many times a day are handled right in the conversation. You configure your accepted carriers, plan types and payment options in settings, and Solara answers patients from that.",
          "Solara also captures the patient's insurance details during intake, so the information is ready for verification without anyone re-typing it.",
        ],
      },
      {
        heading: "What changes for the front desk?",
        paragraphs: [
          "Your team stops sitting on hold with carriers and starts each visit knowing what is covered. The result is fewer billing surprises for patients and faster check-ins.",
          "Verified coverage also flows into the rest of Solara: the booking in OpenDental, the patient's chart and the questions the AI receptionist answers.",
        ],
      },
    ],
    steps: {
      heading: "What happens from booking to check-in?",
      items: [
        {
          title: "Patient books",
          body: "The visit is booked by phone, text, website chat or your team.",
        },
        {
          title: "Solara checks coverage",
          body: "Solara queries the clearinghouse for eligibility and benefits.",
        },
        {
          title: "Breakdown saved",
          body: "Plan, copay and remaining benefits are saved to the chart.",
        },
        {
          title: "Ready for check-in",
          body: "Your team sees coverage up front, before the patient sits down.",
        },
      ],
    },
    faqIds: [
      "how-insurance-verification-works",
      "verifies-insurance",
      "answers-insurance-questions",
      "what-every-plan-includes",
      "works-with-open-dental",
    ],
    related: ["dental-patient-intake-forms", "ai-dental-receptionist", "dental-practice-analytics"],
  },
  {
    slug: "dental-patient-intake-forms",
    name: "Digital Intake Forms",
    summary: "Forms, history and consents done on the patient's phone.",
    title: "Digital Dental Patient Intake Forms by Text | Solara",
    description:
      "Solara texts patients a secure intake link after they book. Forms, history and consents are completed on their phone and saved to the chart.",
    eyebrow: "Paperless intake",
    h1: "Paperless dental intake forms, completed before patients arrive",
    answer:
      "Solara sends digital intake forms automatically. As soon as a visit is booked, it texts the patient a secure link; the patient completes new-patient forms, medical history and consents on their phone before arriving, and the answers are saved to their chart. No clipboards in the waiting room and no re-typing at the front desk.",
    takeaways: [
      "A secure intake link is texted to the patient automatically when a visit is booked.",
      "Forms, medical history and consents are completed and signed digitally before arrival.",
      "Answers are saved to the patient's chart, so nobody re-types paperwork.",
      "Patients do not need to download an app; the form opens in their phone's browser.",
    ],
    image: {
      src: "/images/cap_forms.png",
      alt: "Patient completing a dental intake form on a smartphone in the waiting room",
    },
    availability: ["essentials", "pro", "enterprise"],
    availabilityNote: "Paperless intake is included in every plan. Pro adds the Form Builder.",
    sections: [
      {
        heading: "How do digital dental intake forms work?",
        paragraphs: [
          "Digital intake replaces the clipboard with a link. When a visit is booked, Solara texts the patient a secure intake link, the patient fills in the forms on their phone, and the completed answers are saved to their chart.",
          "Because it happens before the appointment, the patient arrives with the paperwork already done and the visit starts on time.",
        ],
      },
      {
        heading: "What can patients complete before the visit?",
        paragraphs: [
          "Patients complete their new-patient forms, health history and consents, and sign them digitally, all before they arrive.",
          "Solara also captures insurance details at intake, which feeds straight into insurance verification.",
        ],
        bullets: [
          "New-patient registration forms",
          "Medical and dental history",
          "Consents, signed digitally",
          "Insurance details",
        ],
      },
      {
        heading: "Do patients need an app or a portal login?",
        paragraphs: [
          "No. The intake link opens in the browser on the patient's phone. There is nothing to download and no account to create, which keeps completion simple for every age group.",
        ],
      },
      {
        heading: "Can a practice customise its intake forms?",
        paragraphs: [
          "Yes. The Pro plan includes the Form Builder, so you can shape the forms around the information your practice needs. Paperless intake itself is included in every plan.",
        ],
      },
      {
        heading: "Why move dental intake off paper?",
        paragraphs: [
          "Paper intake creates two jobs: the patient fills a form in the waiting room, then someone at the front desk types it into the system. Digital intake removes both, along with the errors that come from reading handwriting.",
          "It also frees the waiting room. Patients are not hunched over clipboards, and the front desk is not chasing missing signatures at check-in.",
        ],
      },
    ],
    steps: {
      heading: "What does the patient experience?",
      items: [
        {
          title: "Visit booked",
          body: "The appointment is booked by phone, text, chat or your team.",
        },
        {
          title: "Link arrives by text",
          body: "Solara texts a secure intake link to the patient.",
        },
        {
          title: "Completed on the phone",
          body: "Forms, history and consents are filled in and signed.",
        },
        {
          title: "Saved to the chart",
          body: "The answers are saved to the patient's chart before the visit.",
        },
      ],
    },
    faqIds: [
      "how-intake-works",
      "do-patients-need-an-app",
      "what-every-plan-includes",
      "is-solara-hipaa-compliant",
    ],
    related: [
      "dental-insurance-verification",
      "dental-appointment-scheduling",
      "ai-dental-clinical-notes",
    ],
  },
  {
    slug: "dental-appointment-scheduling",
    name: "Online & Text Booking",
    summary: "Patients book 24/7 by phone, text or website chat.",
    title: "Dental Appointment Booking by Phone, Text & Chat | Solara",
    description:
      "Patients book, reschedule and confirm dental appointments 24/7 by phone, text or website chat. Solara books the right provider and operatory in OpenDental.",
    eyebrow: "Scheduling",
    h1: "24/7 dental appointment booking by phone, text and chat",
    answer:
      "Solara lets patients book dental appointments around the clock by phone call, text message or the chat on your website. It checks provider and operatory availability, matches the right service and duration, books the visit in OpenDental and sends a confirmation, without anyone at the front desk picking up.",
    takeaways: [
      "Patients can book, reschedule or confirm by phone, text message or website chat, at any hour.",
      "Solara checks provider and operatory availability and matches the right service and duration.",
      "Every booking is written to OpenDental automatically, with no double entry.",
      "On Pro, smart scheduling prioritises emergencies and campaigns refill cancelled slots.",
    ],
    image: {
      src: "/images/cap_booking.png",
      alt: "Patient booking a dental appointment through a text message conversation",
    },
    availability: ["essentials", "pro", "enterprise"],
    availabilityNote:
      "Booking by phone, text and chat is included from Essentials. Pro adds smart scheduling and cancellation backfill.",
    sections: [
      {
        heading: "How can patients book with Solara?",
        paragraphs: [
          "Patients book through whichever channel suits them, and every channel ends in the same place: a confirmed appointment in your OpenDental schedule.",
        ],
        bullets: [
          "A phone call answered by the AI receptionist, day or night",
          "A text message to your practice number",
          "The chat helper on your website",
        ],
      },
      {
        heading: "How does Solara choose the right appointment slot?",
        paragraphs: [
          "Solara checks provider and operatory availability, then books the right service with the right duration, the same way an experienced scheduler would.",
          "On the Pro plan, smart scheduling adds emergency priority and smart durations, so urgent patients are seen sooner and the schedule stays realistic.",
        ],
      },
      {
        heading: "Can patients reschedule or confirm by text?",
        paragraphs: [
          "Yes. A patient can text your number and Solara books, reschedules or confirms the visit right in the message thread, then writes the change into OpenDental.",
        ],
      },
      {
        heading: "What happens when a patient cancels?",
        paragraphs: [
          "On the Pro plan, campaign generation automatically works to fill cancelled slots, and outbound voice AI can call through your waitlist. Open time is backfilled from your own patient list instead of being left empty.",
        ],
      },
    ],
    faqIds: [
      "ai-receptionist-books-appointments",
      "book-by-text",
      "works-with-open-dental",
      "answers-after-hours",
      "do-patients-need-an-app",
    ],
    related: [
      "ai-dental-receptionist",
      "dental-appointment-reminders",
      "dental-recall-reactivation",
    ],
  },
  {
    slug: "dental-recall-reactivation",
    name: "Recall & Reactivation",
    summary: "Brings overdue patients back and fills open chairs.",
    title: "Dental Recall & Patient Reactivation Software | Solara",
    description:
      "Solara finds overdue patients and brings them back with personalized texts and outbound AI calls, filling open hygiene slots from your own recall list.",
    eyebrow: "Recall & reactivation",
    h1: "Dental recall that keeps your hygiene schedule full",
    answer:
      "Solara automates dental recall and patient reactivation. It identifies patients who are overdue for a visit, sends personalized texts with a booking link, and on the Pro plan places outbound AI calls for recall, reminders and the waitlist, so open hygiene slots are filled from your own patient list instead of left empty.",
    takeaways: [
      "Solara identifies overdue and dormant patients from your own patient list.",
      "Personalized recall texts include a link, so patients book themselves.",
      "On Pro, outbound voice AI calls for recall, reminders and the waitlist.",
      "Campaigns refill cancelled slots, and unscheduled treatment plans are surfaced for follow-up.",
    ],
    image: {
      src: "/images/custom_images/patient_recall_sms.png",
      alt: "Recall dashboard with reactivation results next to a phone showing a recall text message",
    },
    availability: ["pro", "enterprise"],
    availabilityNote:
      "Outbound recall, campaigns and waitlist calling are part of the Pro and Enterprise plans.",
    sections: [
      {
        heading: "What is dental recall?",
        paragraphs: [
          "Dental recall is the routine of bringing existing patients back for their next periodic visit, usually a hygiene appointment. Reactivation is the same work aimed at patients who have drifted away and have not been seen in a long time.",
          "Both are usually the first jobs to slip when the front desk is busy, which is why hygiene schedules develop gaps.",
        ],
      },
      {
        heading: "How does Solara find patients who are due?",
        paragraphs: [
          "Solara works from your own patient list in OpenDental. It identifies patients who are overdue for a visit, reactivates dormant patients, and surfaces unscheduled treatment plans so nothing is forgotten.",
        ],
      },
      {
        heading: "Which channels does Solara use for recall?",
        paragraphs: [
          "Recall runs where patients actually respond, and it runs quietly in the background without anyone on your team dialing.",
        ],
        bullets: [
          "Personalized text messages with a booking link",
          "Outbound voice AI calls for recall, reminders and the waitlist (Pro)",
          "Campaign texts and emails for announcements and offers",
        ],
      },
      {
        heading: "How are cancelled appointments refilled?",
        paragraphs: [
          "When a slot opens, campaign generation on the Pro plan works to fill it automatically, and outbound calls can work through your waitlist. Open time is backfilled from your own recall list rather than lost.",
        ],
      },
    ],
    steps: {
      heading: "What does a recall run look like?",
      items: [
        {
          title: "Overdue patients found",
          body: "Solara identifies patients who are past due for a visit.",
        },
        {
          title: "Personal texts sent",
          body: "Each patient receives a personalized text with a booking link.",
        },
        {
          title: "Patients book themselves",
          body: "Bookings land in OpenDental like any other appointment.",
        },
        {
          title: "Follow-up continues",
          body: "On Pro, outbound AI calls follow up and work the waitlist.",
        },
      ],
    },
    faqIds: [
      "how-recall-works",
      "book-by-text",
      "sends-appointment-reminders",
      "how-much-does-solara-cost",
    ],
    related: [
      "dental-appointment-reminders",
      "dental-appointment-scheduling",
      "dental-practice-analytics",
    ],
  },
  {
    slug: "dental-appointment-reminders",
    name: "Appointment Reminders",
    summary: "Automated reminders and confirmations by text and email.",
    title: "Automated Dental Appointment Reminders by Text | Solara",
    description:
      "Solara sends automated dental appointment reminders and confirmations by text, email and WhatsApp where supported, so fewer patients miss their visit.",
    eyebrow: "Reminders",
    h1: "Automated dental appointment reminders and confirmations",
    answer:
      "Solara sends automated appointment reminders and confirmations so patients show up. Reminders go out by text message and email, and by WhatsApp where supported, and patients can confirm or reschedule by replying, which updates OpenDental without anyone on your team making a call.",
    takeaways: [
      "Reminders and confirmations go out automatically, with no one on your team dialing.",
      "Messages are sent by text and email, and by WhatsApp where supported.",
      "Patients confirm or reschedule by replying, and the change is written to OpenDental.",
      "Appointment confirmation and reminders are included from the Essentials plan.",
    ],
    image: {
      src: "/images/cap_reminders.png",
      alt: "Phone showing a dental appointment reminder with confirm and reschedule buttons",
    },
    availability: ["essentials", "pro", "enterprise"],
    availabilityNote:
      "Confirmations and reminders are included from Essentials. Pro adds outbound voice reminders.",
    sections: [
      {
        heading: "How do automated dental appointment reminders work?",
        paragraphs: [
          "Once a visit is on the schedule, Solara sends reminders and a confirmation request at the right time before the appointment. The patient replies to confirm, or to move the visit if their plans changed.",
          "Because Solara writes back to OpenDental, the schedule always reflects the latest confirmation or reschedule.",
        ],
      },
      {
        heading: "Which channels does Solara use for reminders?",
        paragraphs: [
          "Solara reaches patients on the channels they read: text message and email, and WhatsApp where supported. On the Pro plan, outbound voice AI can also call patients with reminders.",
        ],
      },
      {
        heading: "Can patients reschedule from a reminder?",
        paragraphs: [
          "Yes. A patient can reply in the same text thread and Solara reschedules or confirms the visit there and then, then updates OpenDental. A moved appointment frees its original slot for someone else.",
        ],
      },
      {
        heading: "Why automate dental reminders?",
        paragraphs: [
          "No-shows leave chairs, and the production they would have generated, sitting empty. Reminders are the simplest defence, but sending them by hand is exactly the kind of repetitive work that slips on a busy day.",
          "Automating them means every patient gets the same reliable nudge, whether the front desk is calm or swamped.",
        ],
      },
    ],
    faqIds: [
      "sends-appointment-reminders",
      "reminder-channels",
      "book-by-text",
      "works-with-open-dental",
    ],
    related: [
      "dental-appointment-scheduling",
      "dental-recall-reactivation",
      "ai-dental-receptionist",
    ],
  },
  {
    slug: "ai-dental-clinical-notes",
    name: "AI Clinical Notes",
    summary: "Visit notes written automatically after each appointment.",
    title: "AI Dental Clinical Notes, Written Automatically | Solara",
    description:
      "Solara writes dental visit notes automatically after each appointment, so your clinicians stop typing notes at the end of the day. Part of the Pro plan.",
    eyebrow: "Clinical notes",
    h1: "AI-written dental visit notes after every appointment",
    answer:
      "Solara writes dental visit notes automatically after each appointment, so dentists and hygienists stop typing notes at the end of a long day. Automatic visit notes are part of the Pro plan, alongside paperless intake, the 360° patient view and the activity hub that keep each patient's information in one place.",
    takeaways: [
      "Visit notes are generated automatically after every appointment.",
      "Clinicians spend less time on end-of-day documentation.",
      "Notes sit alongside intake answers and insurance details in Solara's patient view.",
      "Automatic visit notes are included in the Pro and Enterprise plans.",
    ],
    image: {
      src: "/images/cap_notes.png",
      alt: "Tablet displaying a structured dental visit note beside a stethoscope",
    },
    availability: ["pro", "enterprise"],
    availabilityNote: "Automatic visit notes are part of the Pro and Enterprise plans.",
    sections: [
      {
        heading: "What are AI dental clinical notes?",
        paragraphs: [
          "AI clinical notes are visit notes drafted by software instead of typed by hand. In a dental practice, that is the record of what happened at an appointment, written up after the patient leaves.",
          "Solara generates these notes automatically after every appointment, so documentation keeps pace with the schedule instead of piling up at the end of the day.",
        ],
      },
      {
        heading: "Who is responsible for the final note?",
        paragraphs: [
          "As with any clinical documentation, the treating clinician remains responsible for the record. AI-written notes remove the typing, not the professional judgement, so your team reviews them as part of its normal workflow.",
        ],
      },
      {
        heading: "How do notes fit with the rest of Solara?",
        paragraphs: [
          "Notes are one part of a connected front office. On the Pro plan, the 360° patient view and activity hub bring a patient's information together, alongside intake answers captured before the visit and insurance verified at booking.",
        ],
      },
      {
        heading: "How is patient information protected?",
        paragraphs: [
          "Solara is built to comply with HIPAA and the HITECH Act. Every practice signs a Business Associate Agreement before onboarding, ePHI is encrypted with TLS 1.3 in transit and AES-256 at rest, and every access to PHI is recorded in an audit log.",
        ],
      },
    ],
    faqIds: [
      "how-clinical-notes-work",
      "is-solara-hipaa-compliant",
      "call-recordings-and-transcripts",
    ],
    related: [
      "dental-patient-intake-forms",
      "dental-practice-analytics",
      "dental-insurance-verification",
    ],
  },
  {
    slug: "dental-practice-analytics",
    name: "Practice Analytics",
    summary: "Calls, bookings, revenue and insurance at a glance.",
    title: "Dental Practice Analytics & Reporting Dashboard | Solara",
    description:
      "See appointments, patients, revenue and insurance at a glance. Solara's dashboard tracks calls, bookings and revenue, with roll-ups across every location.",
    eyebrow: "Analytics",
    h1: "Dental practice analytics for calls, bookings and revenue",
    answer:
      "Solara's analytics dashboard shows a dental practice's appointments, patients, revenue and insurance at a glance. You can switch between calls, bookings and revenue across any date range, and the Enterprise plan adds revenue analytics by provider, procedure and carrier, with a roll-up across every location.",
    takeaways: [
      "One dashboard shows appointments, patients, revenue and insurance at a glance.",
      "Switch between calls, bookings and revenue, and change the date range.",
      "Data stays in sync with OpenDental, including procedure codes and revenue.",
      "Enterprise adds provider, procedure and carrier revenue analytics across locations.",
    ],
    image: {
      src: "/images/cap_analytics.png",
      alt: "Practice performance dashboard with appointment and revenue charts",
    },
    availability: ["essentials", "pro", "enterprise"],
    availabilityNote:
      "Reporting deepens by plan: Pro adds the 360° patient view and activity hub; Enterprise adds revenue analytics and multi-location roll-ups.",
    sections: [
      {
        heading: "What does Solara's dental analytics dashboard show?",
        paragraphs: [
          "The dashboard puts the numbers a practice owner asks about every week in one place: appointments, patients, revenue and insurance.",
          "You can switch between calls, bookings and revenue and change the range to see how the front office is performing over time.",
        ],
      },
      {
        heading: "Where does the data come from?",
        paragraphs: [
          "Solara keeps patients, appointments, providers, operatories, procedure codes, insurance and revenue in sync with OpenDental, and it records every call it handles. The dashboard reflects both, so there is no separate spreadsheet to maintain.",
        ],
      },
      {
        heading: "Can a dental group see every location in one place?",
        paragraphs: [
          "Yes. The Enterprise plan adds a multi-practice roll-up and centralized activity across all locations, plus revenue analytics broken down by provider, procedure and carrier, with role-based access for each team member.",
        ],
      },
      {
        heading: "Can I review individual calls?",
        paragraphs: [
          "Yes. Every call is recorded and transcribed, so you can review quality, see what patients are asking for, and coach the AI at any time.",
        ],
      },
      {
        heading: "Does Solara track where new patients come from?",
        paragraphs: [
          "Solara supports your search presence and Google Ads so nearby patients find your clinic, and that traffic is tracked through to real bookings rather than stopping at clicks.",
        ],
      },
    ],
    faqIds: [
      "what-analytics-show",
      "multi-location-support",
      "call-recordings-and-transcripts",
      "seo-and-google-ads-help",
    ],
    related: [
      "dental-recall-reactivation",
      "ai-dental-receptionist",
      "dental-insurance-verification",
    ],
  },
];

const BY_SLUG = new Map(features.map((feature) => [feature.slug, feature]));

export function getFeature(slug: string): FeaturePage | undefined {
  return BY_SLUG.get(slug);
}

export function featurePath(slug: string): string {
  return `/platform/${slug}`;
}
