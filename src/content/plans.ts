/**
 * Solara pricing plans. The single source for the home pricing section, the
 * /pricing page and the Offer structured data, so prices can never drift.
 */

export type Plan = {
  id: "essentials" | "pro" | "enterprise";
  name: string;
  tagline: string;
  desc: string;
  /** USD per month, billed monthly. Absent for custom-priced plans. */
  monthlyPrice?: number;
  /** USD per month, billed annually. */
  annualPrice?: number;
  /** USD saved per year on annual billing. */
  savings?: number;
  custom?: boolean;
  customLabel?: string;
  customNote?: string;
  cta: string;
  popular?: boolean;
  inheritLabel?: string;
  features: string[];
};

export const plans: Plan[] = [
  {
    id: "essentials",
    name: "Essentials",
    tagline: "Solo practices",
    desc: "The always-on phone & chat agent. Stop losing after-hours calls.",
    monthlyPrice: 179,
    annualPrice: 149,
    savings: 360,
    cta: "Book a 20-min demo",
    features: [
      "Voice AI Agent — inbound only, 24/7",
      "Chat AI Agent — Web widget & SMS",
      "Appointment Confirmation & Reminders",
      "OpenDental sync — no double entry",
      "1,500 AI call minutes / month",
      "HIPAA & GDPR · full audit trail",
      "Email support · 24-hour response",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Growing groups",
    desc: "The complete always-on front office. Outbound, scheduling, intelligence & clinical.",
    monthlyPrice: 399,
    annualPrice: 349,
    savings: 600,
    cta: "Book a 20-min demo",
    popular: true,
    inheritLabel: "Everything in Essentials, plus",
    features: [
      "Outbound Voice AI — recall, reminders, waitlist",
      "Smart Scheduling — emergency priority, smart durations",
      "Campaign Generation — auto-fills cancelled slots",
      "Form Builder & paperless intake",
      "Visit notes written automatically",
      "360° Patient View & activity hub",
      "5,000 AI call minutes / month",
      "Priority support · 4-hour response",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "Multi-location",
    desc: "For dental groups with multiple locations. Scale, centralize, and report.",
    // Priced per engagement, so this tier shows "Custom" instead of a figure.
    custom: true,
    customLabel: "Custom",
    customNote: "Priced to your group",
    cta: "Book a 20-min demo",
    inheritLabel: "Everything in Pro, plus",
    features: [
      "Multi-practice / multi-location roll-up",
      "Revenue Analytics — provider, procedure & carrier",
      "Centralized Activity across all locations",
      "Role-Based Team Access",
      "Unlimited providers & operatories",
      "Unlimited AI call minutes",
      "Dedicated Customer Success Manager",
      "White-glove onboarding ($2,500 value)",
      "Guaranteed uptime · 1-hour support",
      "Custom integrations for your tech stack",
    ],
  },
];
