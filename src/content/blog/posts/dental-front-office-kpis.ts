import type { BlogPost } from "@/content/blog/types";

export const post: BlogPost = {
  slug: "dental-front-office-kpis",
  title: "Dental Front Office KPIs to Track | Solara",
  description:
    "The front-office KPIs every dental practice should track, with simple formulas and practical fixes to keep calls answered and the schedule full.",
  h1: "Dental front office KPIs: what to track and how to improve them",
  category: "Operations",
  answer:
    "Dental front office KPIs are the measurable numbers that show how well a practice's front desk turns calls into visits and keeps the schedule full. The core set is call answer rate, new-patient call conversion, no-show and cancellation rate, hygiene reappointment rate, unscheduled treatment and insurance verification turnaround, reviewed every month.",
  takeaways: [
    "Front office KPIs measure how reliably the front desk turns phone calls into booked visits and booked visits into completed care.",
    "Each KPI needs a fixed formula and the same data source every month, so changes reflect performance rather than counting differences.",
    "ADA practice-management guidance asks whether cancellations and no-shows stay at 5% or less and whether 90% of recare patients are scheduled for their next visit.",
    "A systematic review of 14 randomized trials found that orthodontic patients who received reminders were less likely to miss appointments.",
    "Where no authoritative benchmark exists, such as call answer rate, the most useful comparison is the practice's own trend over time.",
  ],
  sections: [
    {
      heading: "What are dental front office KPIs?",
      paragraphs: [
        "Dental front office KPIs are the key performance indicators that track the work of the front desk: answering calls, booking patients, confirming visits, keeping hygiene patients on recall and getting insurance ready before the appointment. The ADA defines KPIs in general as measurable values business owners use to assess growth, profitability and other factors.",
        "Production and collections tell you how the practice did. Front office KPIs tell you why, because most lost production starts as a missed call, an empty slot or a patient who left without a next appointment. Tracking them gives an office manager something specific to fix each month.",
        "Every KPI works best with a named owner, one agreed formula and one source report. If the number changes because someone ran a different report or counted cancellations differently, the trend means nothing. Settle the definitions once, write them down, and review the numbers at the same team meeting each month.",
      ],
    },
    {
      heading: "Which front-office KPIs should a dental practice track?",
      paragraphs: [
        "A dental practice should track the handful of numbers that follow a patient from the first phone call to completed treatment. Each one maps to a step the front desk controls, so a drop points to a specific part of the workflow.",
        "Start with the six below, plus a monthly new-patient count. Write down the exact formula and the report it comes from, and keep both the same from month to month.",
      ],
      bullets: [
        "Call answer rate",
        "New-patient call conversion",
        "No-show and same-day cancellation rate",
        "Hygiene reappointment rate",
        "Unscheduled treatment",
        "Insurance verification turnaround",
      ],
    },
    {
      heading: "How do you measure call answer rate and new-patient call conversion?",
      paragraphs: [
        "Call answer rate is the share of inbound calls answered by a person or system that can help the caller, calculated as answered calls divided by total inbound calls. New-patient call conversion is the share of calls from prospective new patients that end with a booked appointment.",
        "Pull both from your phone system, not from memory. Exclude internal calls and spam, and count calls that went to voicemail or were abandoned on hold as unanswered. For conversion, someone has to tag each call by type, which is far easier when calls are recorded and can be reviewed.",
        "There is no authoritative national benchmark for either number, so compare the practice with itself. Break unanswered calls down by hour and day of week, and the pattern usually shows where coverage is thin: lunch, early morning, after hours or the busiest check-in times.",
      ],
      bullets: [
        "Cover the hours when unanswered calls cluster",
        "Return every missed call the same day and record the outcome",
        "Review recorded new-patient calls that did not book and coach from them",
        "Give staff one simple script for price and insurance questions",
      ],
    },
    {
      heading: "How do you calculate and reduce no-shows and cancellations?",
      paragraphs: [
        "The no-show and cancellation rate is the number of appointments that were missed or cancelled at short notice, divided by the total appointments scheduled for the same period. Track no-shows and short-notice cancellations separately as well as combined, because the fixes differ.",
        "The ADA's practice-management guidance asks whether the practice's cancellation and no-show rate is 5% or less. Decide in advance what counts as short notice for your office, such as less than one business day, and apply that rule the same way every month.",
        "Then break the rate down by provider, appointment type, day of week and time of day. A practice-wide average can hide a problem concentrated in one column of the schedule, such as new-patient visits or a particular morning, and a narrow problem is easier to fix than a broad one.",
        "Reminders are the best-supported fix. A 2019 systematic review and meta-analysis in the European Journal of Orthodontics, covering 14 randomized controlled trials, found that patients who received reminders were less likely to miss appointments (relative risk 0.39). A separate study in one orthodontic practice found no significant difference in no-show rates between phone, email and text reminders, and its authors suggested letting patients choose their reminder method.",
      ],
      bullets: [
        "Send reminders on the channel each patient prefers",
        "Ask patients to confirm, and follow up with those who do not",
        "Make rescheduling easy so patients move a visit instead of skipping it",
        "Keep a short-notice list to refill cancelled slots",
      ],
    },
    {
      heading: "How do you calculate hygiene reappointment rate?",
      paragraphs: [
        "Hygiene reappointment rate is the share of hygiene patients who leave their visit with the next recall appointment already scheduled, calculated as patients reappointed divided by hygiene patients seen in the period. It shows whether recall is being booked at the chair or left to chase later.",
        "The ADA's practice-management guidance asks whether 90% of the practice's recare patients are scheduled for their next appointment at all times. A related number is the share of active patients who are overdue and have no appointment at all.",
        "The right interval is a clinical decision, not a front-desk default. A 2020 Cochrane review found little to no difference in tooth decay, gum disease or quality of life for adults between six-monthly and risk-based check-ups, and found too little reliable evidence to say how often children should be seen. Book the interval the clinician sets for each patient.",
      ],
      bullets: [
        "Schedule the next hygiene visit before the patient leaves the chair",
        "Work the overdue list every week, not at the end of the quarter",
        "Send a booking link with recall messages so patients can schedule themselves",
      ],
    },
    {
      heading: "How should a practice track unscheduled treatment?",
      paragraphs: [
        "Unscheduled treatment is care a dentist has diagnosed and presented that is not yet on the schedule. Track it two ways: the number of patients with an open treatment plan and the total dollar value of that treatment, both reviewed monthly. Watching the dollar value alone can mislead, because one large case can hide a dozen small ones that are easier to schedule.",
        "It pairs with case acceptance, the share of treatment presentations patients accept. The ADA's practice-management guidance asks whether at least 75–80% of case presentations are accepted. A falling acceptance rate and a growing unscheduled list usually point to the same problem: patients leave without a clear next step or a clear cost.",
        "Cost uncertainty is a common reason patients wait. The ADA notes that dentists can submit a pre-estimate to clarify a patient's out-of-pocket cost, which gives the front desk a concrete number to discuss when it follows up.",
      ],
      bullets: [
        "Try to schedule accepted treatment before the patient leaves",
        "Give each patient a written estimate of their share",
        "Assign one person to work the unscheduled treatment list each week",
      ],
    },
    {
      heading: "How do you measure insurance verification turnaround?",
      paragraphs: [
        "Insurance verification turnaround is how far ahead of the visit a patient's coverage is confirmed. Measure it as the percentage of scheduled appointments with verified eligibility and benefits a set number of days before the visit, and track how many verifications still need manual follow-up.",
        "Fast verification is achievable for routine checks. Under the operating rules for the HIPAA eligibility transaction, health plans must respond to providers' eligibility inquiries in real time with information such as deductibles, copays and coinsurance. Delays usually come from the checks that fall back to carrier portals or phone calls.",
        "Those delays have a cost. ADA News reported that dental eligibility and benefit verification spending rose 15% to $2.1 billion in 2023, according to the 2024 CAQH Index, and that rising portal costs contributed to the increase.",
      ],
      bullets: [
        "Run the electronic eligibility check as soon as a visit is booked",
        "Capture insurance details on the intake form so they are complete and accurate",
        "Keep a daily list of verifications that failed or need a portal or phone check",
        "Re-check coverage at the start of each new benefit year",
      ],
    },
    {
      heading: "How can Solara help a practice track these numbers?",
      paragraphs: [
        "Solara answers every call 24/7 and records and transcribes each one, so calls can be reviewed for quality and coaching. Its analytics dashboard shows appointments, patients, revenue and insurance at a glance and lets you switch between calls, bookings and revenue over any date range. The Enterprise plan adds revenue analytics by provider, procedure and carrier across locations.",
        "Several of the fixes above run automatically as well. Solara sends reminders and confirmations by text and email, verifies eligibility and benefits at intake, and on the Pro plan places outbound recall calls and surfaces unscheduled treatment plans for follow-up.",
      ],
    },
  ],
  table: {
    caption: "Dental front office KPIs: how to calculate them and what they tell you",
    columns: ["KPI", "How to calculate", "What it tells you"],
    rows: [
      [
        "Call answer rate",
        "Answered inbound calls ÷ total inbound calls",
        "Whether patients can reach the practice when they call",
      ],
      [
        "New-patient call conversion",
        "New-patient calls that booked ÷ all new-patient calls",
        "How well the phone team turns interest into appointments",
      ],
      [
        "New patients per month",
        "Count of first visits completed in the month",
        "Whether the patient base is growing",
      ],
      [
        "No-show and cancellation rate",
        "Missed + short-notice cancelled appointments ÷ appointments scheduled",
        "How much booked time is lost before patients arrive",
      ],
      [
        "Hygiene reappointment rate",
        "Hygiene patients who left with a next visit booked ÷ hygiene patients seen",
        "Whether recall is booked at the chair or left to chase later",
      ],
      [
        "Unscheduled treatment",
        "Number of patients and dollar value of diagnosed treatment not on the schedule",
        "How much accepted or presented care is waiting",
      ],
      [
        "Case acceptance",
        "Treatment presentations accepted ÷ treatment presentations made",
        "Whether patients understand and agree to recommended care",
      ],
      [
        "Insurance verification turnaround",
        "Appointments verified a set number of days ahead ÷ appointments scheduled",
        "Whether coverage is known before the patient sits down",
      ],
    ],
    afterSection: 1,
  },
  faqs: [
    {
      id: "dental-front-office-kpis-call-answer-rate",
      question: "How do you calculate call answer rate for a dental office?",
      answer:
        "Divide the number of inbound calls that were answered by the total number of inbound calls in the same period, using your phone system's reports. Exclude spam and internal calls, and count voicemails and calls abandoned on hold as unanswered so the rate reflects what patients experienced.",
    },
    {
      id: "dental-front-office-kpis-no-show-rate",
      question: "What is an acceptable no-show and cancellation rate for a dental practice?",
      answer:
        "The ADA's practice-management guidance asks whether a practice's cancellation and no-show rate is 5% or less. Calculate it as missed and short-notice cancelled appointments divided by appointments scheduled, and track the two parts separately so you can see which one is driving the total.",
    },
    {
      id: "dental-front-office-kpis-hygiene-reappointment",
      question: "What is hygiene reappointment rate?",
      answer:
        "Hygiene reappointment rate is the percentage of hygiene patients who leave with their next recall visit already booked. The ADA's practice-management guidance asks whether 90% of recare patients are scheduled for their next appointment at all times, using the interval the clinician sets for each patient.",
    },
    {
      id: "dental-front-office-kpis-review-frequency",
      question: "How often should a dental practice review front-office KPIs?",
      answer:
        "Review the full set monthly with the same formulas and reports each time, so the trend is reliable. Numbers that change day to day, such as unanswered calls, unconfirmed appointments and the overdue recall list, are worth a quick weekly check so problems are fixed before they show up in monthly results.",
    },
  ],
  citations: [
    {
      label: "American Dental Association, Measuring Success (practice management)",
      url: "https://www.ada.org/resources/practice/practice-management/measuring-success20160428t155202",
    },
    {
      label:
        "Mohammed H, et al. Reminders improve oral hygiene and adherence to appointments in orthodontic patients: a systematic review and meta-analysis. Eur J Orthod. 2019",
      url: "https://pubmed.ncbi.nlm.nih.gov/29947755/",
    },
    {
      label:
        "Wegrzyniak, et al. Measuring the effectiveness of patient-chosen reminder methods in a private orthodontic practice. Angle Orthod. 2018",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8288327/",
    },
    {
      label: "Cochrane, Recall intervals for routine dental check-ups (2020)",
      url: "https://www.cochrane.org/evidence/CD004346_recall-intervals-routine-dental-check-ups",
    },
    {
      label: "American Dental Association, Least Expensive Alternative Treatment Clause",
      url: "https://www.ada.org/resources/practice/dental-insurance/least-expensive-alternative-treatment-clause",
    },
    {
      label: "CMS, Health Plan Eligibility and Benefits Transaction Basics",
      url: "https://www.cms.gov/files/document/eligibility-and-benefits-transactions.pdf",
    },
    {
      label:
        "ADA News, Benefit verification drives increased administrative spending in dental offices (March 2025)",
      url: "https://adanews.ada.org/ada-news/2025/march/benefit-verification-drives-increased-administrative-spending-in-dental-offices/",
    },
  ],
  relatedFeatures: ["dental-practice-analytics", "dental-appointment-reminders"],
  datePublished: "2026-10-30",
  dateModified: "2026-10-30",
};
