import type { BlogPost } from "@/content/blog/types";

export const post: BlogPost = {
  slug: "dental-patient-recall-system",
  title: "Dental Patient Recall System: A Step-by-Step Guide | Solara",
  description:
    "Build a dental recall system that finds overdue patients, follows up in the right order and keeps your hygiene schedule full, step by step.",
  h1: "How to build a dental patient recall and reactivation system",
  category: "Recall & retention",
  answer:
    "A dental patient recall system is the routine a practice uses to bring existing patients back for their next periodic exam and cleaning. A working system follows each patient's dentist-set interval, books the next visit before they leave, finds anyone overdue, follows up in a planned sequence by text, email and phone, and tracks who returns.",
  takeaways: [
    "The ADA says some people need a dental visit once or twice a year and others need more, so recall intervals should be set for each patient.",
    "A 2020 Cochrane review found that, for adults, risk-based and six-month recall produced similar results for tooth decay, gum bleeding and quality of life.",
    "In a Helsinki study of 41,255 adults with no reminder system, 59.6% did not attend their follow-up oral health exam, on time or late.",
    "Booking the next visit at checkout is the simplest recall step, and a planned outreach sequence handles everyone who leaves without one.",
    "Measure recall monthly with a few counts: patients overdue, patients contacted, patients booked and recall visits kept.",
  ],
  sections: [
    {
      heading: "What is a dental recall system?",
      paragraphs: [
        "A dental recall system is the set of routines a practice uses to bring existing patients back for their next periodic exam and cleaning, at the interval their dentist has set. It covers who is due, how they are contacted, how they book and how the practice checks that they came back.",
        "Two related jobs sit alongside recall. Reactivation is outreach to dormant patients who have not been seen in a long time. Unscheduled treatment follow-up is outreach to patients who were diagnosed with treatment, such as a filling or a crown, but never booked it.",
        "All three slip on busy days because no patient is waiting on the line for them. A system turns them into a scheduled task with an owner, instead of something the front desk gets to when the phones are quiet.",
      ],
    },
    {
      heading: "How often should patients be recalled for a dental checkup?",
      paragraphs: [
        "There is no single correct recall interval. The American Dental Association's consumer site says some people need to visit the dentist once or twice a year while others may need more visits, and the ADA's 2013 statement on regular dental visits said their frequency should be tailored by each patient's dentist.",
        "The research supports that individual approach. A 2020 Cochrane review of two randomized trials with 1,736 participants found that, for adults, risk-based recall and six-month recall produced similar results over four years for tooth decay, gum bleeding and oral-health-related quality of life. It also found that intervals of up to 24 months may not harm these outcomes in adults, while the evidence for children and adolescents was too uncertain to guide practice.",
        "In the UK, NICE guideline CG19 suggests recall intervals from 3 to 24 months for adults, set from each patient's clinical assessment. For a US practice the lesson is simple: the recall interval is a clinical decision recorded per patient, and the recall system should follow that number rather than assume six months for everyone.",
      ],
    },
    {
      heading: "How do you find overdue and dormant patients?",
      paragraphs: [
        "You find overdue patients by running a report in your practice management software that lists active patients whose recall due date has passed and who have no future appointment. Run it on a fixed day each week so the list never grows unnoticed.",
        "The problem is easy to underestimate. In a Helsinki study of 41,255 adults in public dental care who had individual recall intervals but no reminder system, 59.6% did not attend their follow-up oral health exam, on time or late, and people with very long intervals were the least likely to return. CDC data show that only about two-thirds of US adults had a dental exam or cleaning in the past year, which leaves roughly one in three who did not.",
        "Split the list into groups, because each one needs a different message:",
      ],
      bullets: [
        "Due soon: recall date within the next 30 days and no appointment booked",
        "Recently overdue: past the recall date but seen within your reactivation cut-off",
        "Dormant: no visit for longer than a cut-off your practice chooses, such as 18 months",
        "Unscheduled treatment: diagnosed treatment with no appointment attached",
        "Do not contact: patients who moved, transferred care or asked not to be contacted",
      ],
    },
    {
      heading: "What outreach sequence brings overdue patients back?",
      paragraphs: [
        "The most reliable sequence starts before the patient leaves: book the next recall visit at checkout. For anyone who leaves without one, use a planned series of contacts that moves from low-effort channels, such as a text with a booking link, to a personal phone call if the patient does not respond.",
        "Reminders for preventive visits have trial support. In a study of 389 dental outpatients published in the Journal of Telemedicine and Telecare, patients who received a scaling reminder by postcard, text or phone call were 2.6 to 2.9 times more likely to return than patients who received none. For scheduled appointments, a Cochrane review found that text and phone call reminders produced similar attendance, and texts cost less per attendance in two studies.",
        "Keep every message short. Name the practice and the patient, say which visit is due and give one clear action. Stop the sequence as soon as the patient books, and honor anyone who asks not to be contacted.",
      ],
    },
    {
      heading: "How should a practice handle unscheduled treatment?",
      paragraphs: [
        "Treat unscheduled treatment as its own follow-up list, separate from hygiene recall. These patients have already been diagnosed, so the outreach is about removing whatever stopped them from booking, not reminding them that a cleaning is due.",
        "The usual blockers are cost, time and worry. A useful first call asks which one applies, then offers matching help: an updated estimate based on current benefits, a time that fits the patient's week, or a conversation with the dentist about the treatment. A review of US research on dental appointment-keeping grouped barriers into psychological, structural and health-literacy categories, so outreach works best when it addresses the patient's actual barrier.",
        "Clinical questions belong with the clinical team. The front desk and any automated message should invite the patient back and offer help, not give treatment advice.",
      ],
    },
    {
      heading: "How do you measure whether a recall system is working?",
      paragraphs: [
        "Measure recall with a small set of monthly counts taken from your schedule and patient list. The aim is to see where patients drop out: before contact, after contact or after booking.",
      ],
      bullets: [
        "Pre-appointment rate: hygiene patients who leave with their next visit booked",
        "Overdue count: active patients past their recall date with no appointment",
        "Contact rate: overdue patients reached at least once this month",
        "Booking rate: contacted patients who booked an appointment",
        "Show rate: booked recall appointments that were kept",
        "Reactivated patients: dormant patients seen again this month",
      ],
    },
    {
      heading: "How does Solara support a dental recall system?",
      paragraphs: [
        "Solara automates the outreach steps of recall for practices that use OpenDental. Its recall and reactivation features, part of the Pro and Enterprise plans, identify overdue and dormant patients from your own patient list, send personalized recall texts with a booking link and surface unscheduled treatment plans for follow-up. Bookings land in OpenDental like any other appointment.",
        "Outbound voice AI also calls patients for recall, reminders and the waitlist, and campaigns work to refill cancelled slots. Clinical decisions stay with your team: your dentists still set each patient's recall interval.",
      ],
    },
  ],
  table: {
    caption:
      "A sample recall outreach sequence. The timings are a starting point to adjust for your practice, not research-derived rules.",
    columns: ["When", "Channel", "Message goal"],
    rows: [
      ["At checkout", "In person", "Book the next recall visit before the patient leaves"],
      [
        "About 3 weeks before the due date",
        "Text with a booking link",
        "Tell the patient they are due and let them choose a time",
      ],
      [
        "Due date, if still unbooked",
        "Email",
        "Repeat the invitation with hours and booking options",
      ],
      [
        "1 to 2 weeks overdue",
        "Phone call",
        "Answer questions and remove barriers such as cost or timing",
      ],
      [
        "1 to 3 months overdue",
        "Text, then a second call",
        "Offer specific open times and confirm contact details",
      ],
      [
        "Past your dormant cut-off",
        "Reactivation text and email, then a call",
        "Invite the patient back and check whether anything has changed",
      ],
    ],
    afterSection: 3,
  },
  faqs: [
    {
      id: "dental-patient-recall-system-recall-vs-reactivation",
      question: "What is the difference between dental recall and reactivation?",
      answer:
        "Dental recall brings active patients back for their next periodic exam and cleaning at the interval their dentist set. Reactivation targets dormant patients who have not been seen for a long time, past a cut-off the practice chooses, and usually needs a more personal message.",
    },
    {
      id: "dental-patient-recall-system-six-month-interval",
      question: "Does every patient need a six-month dental recall?",
      answer:
        "No. The ADA says visit frequency should be tailored by each patient's dentist. A 2020 Cochrane review found that, for adults, risk-based and six-month recall produced similar outcomes, while evidence for children was uncertain. The interval is a clinical decision made per patient.",
    },
    {
      id: "dental-patient-recall-system-text-or-call",
      question: "Is texting or calling better for dental recall?",
      answer:
        "Both work, and a sequence that uses both reaches more patients. In one dental study, postcard, text and phone reminders all raised return visits for cleanings. A Cochrane review found texts and calls gave similar attendance for scheduled appointments, with texts costing less.",
    },
    {
      id: "dental-patient-recall-system-measure",
      question: "How should a dental practice measure recall?",
      answer:
        "Track a few monthly counts: hygiene patients who leave with their next visit booked, patients overdue with no appointment, overdue patients contacted, contacted patients who booked and recall visits kept. Watching where the numbers drop shows which step needs work.",
    },
  ],
  citations: [
    {
      label:
        "Fee PA et al. Recall intervals for oral health in primary care patients. Cochrane Database of Systematic Reviews 2020 (CD004346.pub5), summary",
      url: "https://www.cochrane.org/evidence/CD004346_recall-intervals-routine-dental-check-ups",
    },
    {
      label:
        "American Dental Association, MouthHealthy: Common questions about going to the dentist",
      url: "https://www.mouthhealthy.org/dental-care/questions-about-going-to-the-dentist/",
    },
    {
      label: "ADA statement on regular dental visits (June 2013), reported by Dental Tribune",
      url: "https://us.dental-tribune.com/news/ada-issues-statement-on-regular-dental-visits",
    },
    {
      label:
        "Scott H et al. Attitudes of NHS general dental practitioners to NICE guideline CG19 on recall intervals. Br Dent J 2022",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8916955/",
    },
    {
      label:
        "Haukka A et al. Adherence to individualized recall intervals for oral health examinations. Clin Exp Dent Res 2023",
      url: "https://pubmed.ncbi.nlm.nih.gov/36322122/",
    },
    {
      label: "CDC National Center for Health Statistics, FastStats: Oral and Dental Health",
      url: "https://www.cdc.gov/nchs/fastats/dental.htm",
    },
    {
      label:
        "Cheng CC et al. Effects of tooth scaling reminders for dental outpatients. J Telemed Telecare 2013",
      url: "https://pubmed.ncbi.nlm.nih.gov/23512651/",
    },
    {
      label:
        "Gurol-Urganci I et al. Mobile phone messaging reminders for attendance at healthcare appointments. Cochrane Database of Systematic Reviews 2013 (CD007458), summary",
      url: "https://www.cochrane.org/CD007458/EPOC_mobile-phone-text-messaging-reminders-attendance-healthcare-appointments",
    },
    {
      label:
        "Lapidos A et al. Toward a better understanding of dental appointment-keeping behavior. Community Dent Oral Epidemiol 2016",
      url: "https://pubmed.ncbi.nlm.nih.gov/26291443/",
    },
  ],
  relatedFeatures: ["dental-recall-reactivation", "dental-appointment-reminders"],
  datePublished: "2026-10-30",
  dateModified: "2026-10-30",
};
