/**
 * Presentation data for /platform/[slug]: what the hero highlights and which
 * photos sit beside the copy. Every fact here restates something the feature's
 * own page already says in content/features.ts.
 */

import { featurePhotos, type Photo } from "@/content/photos";

export type HeroFact = { value: string; label: string };

export type FeatureVisual = {
  /** The part of the H1 painted with the brand gradient. */
  highlight: string;
  facts: HeroFact[];
  /** Short labels floating on the hero image. */
  chips: [string, string];
  /** Photos placed beside every other section, in order. */
  gallery: Photo[];
};

export const featureVisuals: Record<string, FeatureVisual> = {
  "ai-dental-receptionist": {
    highlight: "answers every call",
    chips: ["Call answered 24/7", "Booked in OpenDental"],
    facts: [
      { value: "24/7", label: "Every call answered, including after hours" },
      { value: "OpenDental", label: "Appointments booked directly in your schedule" },
      { value: "Unlimited", label: "Concurrent calls on every plan" },
      { value: "Transcribed", label: "Every call recorded so you can review it" },
    ],
    gallery: [
      featurePhotos.frontDeskCall,
      featurePhotos.frontDeskCalendar,
      featurePhotos.afterHours,
    ],
  },
  "dental-insurance-verification": {
    highlight: "before the patient sits down",
    chips: ["Eligibility checked", "Saved to the chart"],
    facts: [
      { value: "At booking", label: "Eligibility and benefits checked automatically" },
      { value: "Your carriers", label: "Verified through a clearinghouse" },
      { value: "On the chart", label: "Plan, copay and remaining benefits saved" },
      { value: "Every plan", label: "Included from Essentials" },
    ],
    gallery: [featurePhotos.tabletDashboard, featurePhotos.insuranceApproved],
  },
  "dental-patient-intake-forms": {
    highlight: "before patients arrive",
    chips: ["Secure link texted", "Signed before arrival"],
    facts: [
      { value: "By text", label: "Secure link sent when a visit is booked" },
      { value: "No app", label: "Forms open in the phone's browser" },
      { value: "Signed", label: "Consents completed digitally before arrival" },
      { value: "On the chart", label: "Answers saved, nothing re-typed" },
    ],
    gallery: [
      featurePhotos.phoneIntake,
      featurePhotos.waitingRoomTablet,
      featurePhotos.tabletIntake,
    ],
  },
  "dental-appointment-scheduling": {
    highlight: "phone, text and chat",
    chips: ["Booked at any hour", "Written to OpenDental"],
    facts: [
      { value: "24/7", label: "Patients book at any hour" },
      { value: "3 channels", label: "Phone call, text message and website chat" },
      { value: "Right slot", label: "Provider, operatory, service and duration matched" },
      { value: "OpenDental", label: "Every booking written back automatically" },
    ],
    gallery: [featurePhotos.tabletCalendar, featurePhotos.frontDeskCalendar],
  },
  "dental-recall-reactivation": {
    highlight: "hygiene schedule full",
    chips: ["Overdue patient found", "Booking link sent"],
    facts: [
      { value: "Overdue", label: "Patients identified from your own list" },
      { value: "Personal", label: "Recall texts with a booking link" },
      { value: "Outbound", label: "AI calls for recall and the waitlist" },
      { value: "Pro", label: "Included in Pro and Enterprise" },
    ],
    gallery: [featurePhotos.hygieneChair, featurePhotos.performanceMonitor],
  },
  "dental-appointment-reminders": {
    highlight: "reminders and confirmations",
    chips: ["Reminder sent", "Confirmed by reply"],
    facts: [
      { value: "Automatic", label: "Nobody on your team has to dial" },
      { value: "3 channels", label: "Text, email and WhatsApp where supported" },
      { value: "By reply", label: "Patients confirm or reschedule in the thread" },
      { value: "OpenDental", label: "Changes written back automatically" },
    ],
    gallery: [featurePhotos.waitingRoomTablet, featurePhotos.frontDeskCalendar],
  },
  "ai-dental-clinical-notes": {
    highlight: "every appointment",
    chips: ["Note written after the visit", "Beside intake and insurance"],
    facts: [
      { value: "Every visit", label: "Notes generated after each appointment" },
      { value: "Less typing", label: "Less end-of-day documentation" },
      { value: "360°", label: "Patient view alongside intake and insurance" },
      { value: "Pro", label: "Included in Pro and Enterprise" },
    ],
    gallery: [featurePhotos.clinicianTablet, featurePhotos.hygieneChair],
  },
  "dental-practice-analytics": {
    highlight: "calls, bookings and revenue",
    chips: ["Any date range", "Synced with OpenDental"],
    facts: [
      { value: "One view", label: "Appointments, patients, revenue and insurance" },
      { value: "Any range", label: "Calls, bookings and revenue by date" },
      { value: "OpenDental", label: "Data stays in sync" },
      { value: "Enterprise", label: "Provider, procedure and carrier revenue" },
    ],
    gallery: [
      featurePhotos.performanceMonitor,
      featurePhotos.ownerTablets,
      featurePhotos.clinicianTablet,
    ],
  },
};
