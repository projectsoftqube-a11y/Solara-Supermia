/**
 * US state pages (/locations/[state]) and the call-recording guide.
 *
 * The facts come from data/states.json, compiled from official sources
 * (state legislatures, dental boards, Medicaid agencies) with a source URL per
 * record. The copy below only combines those facts with what Solara already
 * states about itself; nothing state-specific is invented here.
 */

import type { ContentSection } from "@/content/features";
import type { Faq } from "@/content/faqs";
import { plans } from "@/content/plans";

import statesData from "./data/states.json";

export type RecordingRule = "one-party" | "all-party";

export type StateRecord = {
  name: string;
  slug: string;
  abbr: string;
  timeZones: string[];
  recording: { rule: RecordingRule; statute: string; note: string; sourceUrl: string };
  dentalBoard: { name: string; url: string } | null;
  medicaidDental: { program: string; url: string } | null;
};

export const states: StateRecord[] = (statesData as StateRecord[])
  .map(({ name, slug, abbr, timeZones, recording, dentalBoard, medicaidDental }) => ({
    name,
    slug,
    abbr,
    timeZones,
    recording,
    dentalBoard,
    medicaidDental,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

const BY_SLUG = new Map(states.map((state) => [state.slug, state]));

export function getState(slug: string): StateRecord | undefined {
  return BY_SLUG.get(slug);
}

export function statePath(slug: string): string {
  return `/locations/${slug}`;
}

export const allPartyStates = states.filter((s) => s.recording.rule === "all-party");

/* ── Copy helpers ─────────────────────────────────────────────── */

const ZONE_NAMES: Record<string, string> = {
  "America/New_York": "Eastern",
  "America/Detroit": "Eastern",
  "America/Indiana/Indianapolis": "Eastern",
  "America/Kentucky/Louisville": "Eastern",
  "America/Kentucky/Monticello": "Eastern",
  "America/Indiana/Vincennes": "Eastern",
  "America/Indiana/Winamac": "Eastern",
  "America/Indiana/Marengo": "Eastern",
  "America/Indiana/Petersburg": "Eastern",
  "America/Indiana/Vevay": "Eastern",
  "America/Chicago": "Central",
  "America/Indiana/Knox": "Central",
  "America/Indiana/Tell_City": "Central",
  "America/Menominee": "Central",
  "America/North_Dakota/Center": "Central",
  "America/North_Dakota/New_Salem": "Central",
  "America/North_Dakota/Beulah": "Central",
  "America/Denver": "Mountain",
  "America/Boise": "Mountain",
  "America/Phoenix": "Mountain",
  "America/Los_Angeles": "Pacific",
  "America/Anchorage": "Alaska",
  "America/Juneau": "Alaska",
  "America/Sitka": "Alaska",
  "America/Nome": "Alaska",
  "America/Yakutat": "Alaska",
  "America/Metlakatla": "Alaska",
  "America/Adak": "Hawaii-Aleutian",
  "Pacific/Honolulu": "Hawaii-Aleutian",
};

/** Distinct time-zone names covering a state, e.g. ["Central", "Mountain"]. */
export function zoneNames(state: StateRecord): string[] {
  const names = state.timeZones.map((zone) => {
    const name = ZONE_NAMES[zone];
    if (!name) throw new Error(`Unmapped time zone ${zone} for ${state.name}`);
    return name;
  });
  return [...new Set(names)];
}

const list = (items: string[]) =>
  items.length <= 1
    ? (items[0] ?? "")
    : `${items.slice(0, -1).join(", ")}${items.length > 2 ? "," : ""} and ${items.at(-1)}`;

export function zonePhrase(state: StateRecord): string {
  const names = zoneNames(state);
  return names.length === 1 ? `the ${names[0]} time zone` : `the ${list(names)} time zones`;
}

const ruleLabel = (rule: RecordingRule) => (rule === "all-party" ? "all-party" : "one-party");

const article = (rule: RecordingRule) => (rule === "all-party" ? "an" : "a");

const [essentials, pro] = plans;

export function stateTitle(state: StateRecord): string {
  const full = `AI Dental Receptionist for ${state.name} Practices | Solara`;
  return full.length <= 60 ? full : `AI Dental Receptionist in ${state.name} | Solara`;
}

export function stateDescription(state: StateRecord): string {
  const consent = `${state.name} is ${article(state.recording.rule)} ${ruleLabel(state.recording.rule)} consent state.`;
  // Longest first; fall back for long state names to stay within 155 characters.
  const variants = [
    `Solara answers every call 24/7, books into OpenDental and verifies insurance for ${state.name} dental practices. ${consent}`,
    `Solara answers calls 24/7, books into OpenDental and verifies insurance for ${state.name} dental practices. ${consent}`,
    `Solara answers calls 24/7, books into OpenDental and checks insurance for ${state.name} dentists. ${consent}`,
  ];
  return variants.find((text) => text.length <= 155) ?? variants.at(-1)!;
}

export function stateH1(state: StateRecord): string {
  return `AI dental receptionist and front office for ${state.name} practices`;
}

export function stateAnswer(state: StateRecord): string {
  return `Solara is an AI front office for dental practices in ${state.name}. It answers every call 24/7, books appointments into OpenDental, verifies insurance and sends digital intake forms. Because Solara records every call, the main state-specific setting is ${state.name}'s ${ruleLabel(state.recording.rule)} consent rule for call recording under ${state.recording.statute}.`;
}

export function stateTakeaways(state: StateRecord): string[] {
  const { rule, statute } = state.recording;
  const zones = zoneNames(state);
  return [
    `${state.name} is ${article(rule)} ${ruleLabel(rule)} consent state for recording phone calls, under ${statute}.`,
    rule === "all-party"
      ? `Practices in ${state.name} should tell callers the call is recorded, which Solara's configurable greeting makes simple.`
      : `${state.name} law lets one party consent to a recording, though many practices still announce recording in their greeting.`,
    zones.length > 1
      ? `${state.name} spans the ${list(zones)} time zones; Solara answers 24/7, so every part of the state gets the same coverage.`
      : `${state.name} practices run on ${zones[0]} Time, and Solara answers 24/7 regardless of office hours.`,
    ...(state.dentalBoard
      ? [`Dentists in ${state.name} are licensed by the ${state.dentalBoard.name}.`]
      : []),
    "Solara works with your existing phone line and OpenDental, so there is nothing to install on site.",
  ];
}

export function stateSections(state: StateRecord): ContentSection[] {
  const { rule, statute, note } = state.recording;
  const sections: ContentSection[] = [
    {
      heading: `Does Solara work for dental practices in ${state.name}?`,
      paragraphs: [
        `Yes. Solara is cloud software, so a practice anywhere in ${state.name} uses it the same way: it works with your existing phone line and syncs with OpenDental. There is no hardware to install and no technical setup on your side.`,
        `Practices in ${zonePhrase(state)} get the same 24/7 coverage. Solara answers every call, including after hours, at lunch and when the line is busy, and can book the patient straight into the schedule.`,
      ],
    },
    {
      heading: `Can a dental practice record patient calls in ${state.name}?`,
      paragraphs: [
        rule === "all-party"
          ? `${state.name} is generally treated as an all-party (or two-party) consent state for phone calls: everyone on the call must agree to it being recorded. The rule comes from ${statute}.`
          : `${state.name} is a one-party consent state for phone calls: a recording is generally lawful when at least one person on the call consents. The rule comes from ${statute}.`,
        note,
        rule === "all-party"
          ? "Solara records and transcribes every call, so practices in this state should state clearly at the start of each call that it is recorded. Because you write the receptionist's greeting yourself, adding that notice takes one line."
          : "Solara records and transcribes every call. Even where one-party consent applies, many practices announce recording in their greeting, and because you write the greeting yourself, that takes one line.",
        "This is general information, not legal advice. Confirm your obligations with counsel familiar with the law in your state.",
      ],
    },
  ];

  if (state.medicaidDental) {
    sections.push({
      heading: `Can Solara answer patients' questions about ${state.medicaidDental.program}?`,
      paragraphs: [
        `Yes, if your practice accepts it. Solara answers coverage questions from the carriers, plan types and payment options you configure in settings, so adding ${state.medicaidDental.program} to your accepted plans lets the AI receptionist answer patients consistently, in your words.`,
        "For coverage checks, Solara verifies eligibility and benefits with your configured carriers at intake, so the result is on the chart before the visit.",
      ],
    });
  }

  if (state.dentalBoard) {
    sections.push({
      heading: `Who licenses dentists in ${state.name}?`,
      paragraphs: [
        `Dentists and dental hygienists in ${state.name} are licensed by the ${state.dentalBoard.name}. The board's rules, together with HIPAA, govern how a practice handles patient records and communications.`,
        "Solara supports that with a signed Business Associate Agreement for every practice, encryption of patient data in transit and at rest, US data residency, and an audit log of every access to protected health information.",
      ],
    });
  }

  sections.push({
    heading: `How much does Solara cost for a ${state.name} dental practice?`,
    paragraphs: [
      `Pricing is the same in every state. Essentials is $${essentials.monthlyPrice} per month, or $${essentials.annualPrice} per month billed annually, and Pro is $${pro.monthlyPrice} per month, or $${pro.annualPrice} per month billed annually. Enterprise is custom-priced for multi-location dental groups.`,
    ],
  });

  return sections;
}

/** Sources cited on a state page, in the order they appear. */
export function stateCitations(state: StateRecord) {
  return [
    {
      label: `${state.recording.statute} (call recording consent)`,
      url: state.recording.sourceUrl,
    },
    ...(state.medicaidDental
      ? [{ label: `${state.medicaidDental.program}`, url: state.medicaidDental.url }]
      : []),
    ...(state.dentalBoard ? [{ label: state.dentalBoard.name, url: state.dentalBoard.url }] : []),
  ];
}

export function stateFaqs(state: StateRecord): Faq[] {
  const { rule, statute } = state.recording;
  return [
    {
      id: `${state.slug}-recording-consent`,
      question: `Is ${state.name} a one-party or all-party consent state for call recording?`,
      answer:
        rule === "all-party"
          ? `${state.name} is generally treated as an all-party consent state for phone calls under ${statute}, so everyone on the call should agree to the recording. Practices using Solara should announce recording in their greeting.`
          : `${state.name} is a one-party consent state for phone calls under ${statute}, so a recording is generally lawful when one person on the call consents. Many practices still announce recording in their greeting.`,
    },
    {
      id: `${state.slug}-open-dental`,
      question: `Does Solara work with OpenDental practices in ${state.name}?`,
      answer: `Yes. Solara syncs with OpenDental for practices in ${state.name} and every other state, keeping patients, appointments, providers, operatories, procedure codes, insurance and revenue in sync with no double entry.`,
    },
    {
      id: `${state.slug}-after-hours`,
      question: `Can Solara answer after-hours calls for a ${state.name} dental office?`,
      answer: `Yes. Solara answers every call 24/7 for practices in ${zonePhrase(state)}, including after hours, at lunch and during busy periods, and can book the patient straight into the schedule.`,
    },
  ];
}

/** Other states with the same recording rule, for internal links. */
export function sameRuleStates(state: StateRecord, limit = 8): StateRecord[] {
  const peers = states.filter(
    (s) => s.slug !== state.slug && s.recording.rule === state.recording.rule,
  );
  // Start just after this state alphabetically so each page links to a
  // different slice of the list.
  const start = peers.findIndex((s) => s.name.localeCompare(state.name) > 0);
  const rotated = start === -1 ? peers : [...peers.slice(start), ...peers.slice(0, start)];
  return rotated.slice(0, limit);
}
