/**
 * Header and footer navigation. Kept separate from the page content so the
 * client-side header does not bundle every page's copy. scripts/seo-audit.mjs
 * checks that every link here resolves to a real page.
 */

import {
  AlarmClock,
  BellRing,
  BookOpen,
  CalendarCheck,
  ChartColumn,
  ClipboardList,
  Database,
  FileDown,
  FileText,
  HelpCircle,
  LayoutGrid,
  Mail,
  MapPin,
  MessagesSquare,
  Newspaper,
  PhoneCall,
  Scale,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import { APP_URL, BROCHURE_URL } from "@/lib/site";

export type NavLink = {
  label: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
  external?: boolean;
};

export type NavMenu = { label: string; href?: string; items?: NavLink[]; footer?: NavLink };

export const platformLinks: NavLink[] = [
  {
    label: "AI Receptionist",
    href: "/platform/ai-dental-receptionist",
    description: "Answers every call 24/7 and books into OpenDental.",
    icon: PhoneCall,
  },
  {
    label: "Insurance Verification",
    href: "/platform/dental-insurance-verification",
    description: "Eligibility and benefits on the chart before the visit.",
    icon: ShieldCheck,
  },
  {
    label: "Digital Intake Forms",
    href: "/platform/dental-patient-intake-forms",
    description: "Forms, history and consents done on the patient's phone.",
    icon: ClipboardList,
  },
  {
    label: "Online & Text Booking",
    href: "/platform/dental-appointment-scheduling",
    description: "Patients book 24/7 by phone, text or website chat.",
    icon: CalendarCheck,
  },
  {
    label: "Recall & Reactivation",
    href: "/platform/dental-recall-reactivation",
    description: "Brings overdue patients back and fills open chairs.",
    icon: AlarmClock,
  },
  {
    label: "Appointment Reminders",
    href: "/platform/dental-appointment-reminders",
    description: "Automated reminders and confirmations by text and email.",
    icon: BellRing,
  },
  {
    label: "AI Clinical Notes",
    href: "/platform/ai-dental-clinical-notes",
    description: "Visit notes written automatically after each appointment.",
    icon: FileText,
  },
  {
    label: "Practice Analytics",
    href: "/platform/dental-practice-analytics",
    description: "Calls, bookings, revenue and insurance at a glance.",
    icon: ChartColumn,
  },
];

export const integrationLink: NavLink = {
  label: "OpenDental Integration",
  href: "/integrations/open-dental",
  description: "Two-way sync of patients, appointments, insurance and revenue.",
  icon: Database,
};

export const compareLinks: NavLink[] = [
  {
    label: "Full comparison",
    href: "/compare",
    description: "Solara vs. a front desk vs. a basic chatbot, side by side.",
    icon: LayoutGrid,
  },
  {
    label: "vs. In-house front desk",
    href: "/compare/ai-front-office-vs-front-desk-staff",
    description: "What an AI front office covers that a busy desk can't.",
    icon: Scale,
  },
  {
    label: "vs. Basic chatbot",
    href: "/compare/ai-front-office-vs-dental-chatbot",
    description: "Answering the phone and acting, not just replying.",
    icon: MessagesSquare,
  },
];

export const resourceLinks: NavLink[] = [
  {
    label: "Blog",
    href: "/blog",
    description: "Practical guides for running a dental front office.",
    icon: Newspaper,
  },
  {
    label: "FAQ",
    href: "/faq",
    description: "Straight answers about setup, pricing and security.",
    icon: HelpCircle,
  },
  {
    label: "Call recording laws",
    href: "/guides/dental-call-recording-laws",
    description: "One-party vs. all-party consent, state by state.",
    icon: BookOpen,
  },
  {
    label: "Locations",
    href: "/locations",
    description: "Solara for dental practices in all 50 states.",
    icon: MapPin,
  },
  {
    label: "HIPAA & security",
    href: "/hipaa-compliance",
    description: "BAAs, encryption and audit logging.",
    icon: ShieldCheck,
  },
  {
    label: "Brochure (PDF)",
    href: BROCHURE_URL,
    description: "Everything Solara does, on paper.",
    icon: FileDown,
    external: true,
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Talk to the Solara team.",
    icon: Mail,
  },
];

export const headerMenus: NavMenu[] = [
  {
    label: "Platform",
    items: platformLinks,
    footer: { label: "See the whole platform", href: "/platform" },
  },
  { label: "Pricing", href: "/pricing" },
  { label: "Compare", items: compareLinks },
  { label: "Blog", href: "/blog" },
  // Blog has its own top-level link, so the dropdown leaves it out.
  { label: "Resources", items: resourceLinks.filter((link) => link.href !== "/blog") },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Platform",
    links: [
      { label: "Platform overview", href: "/platform" },
      ...platformLinks.map(({ label, href }) => ({ label, href })),
      { label: integrationLink.label, href: integrationLink.href },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Pricing", href: "/pricing" },
      { label: "Book a demo", href: "/book-a-demo" },
      { label: "Schedule a call", href: "/schedule-call" },
      { label: "Contact", href: "/contact" },
      { label: "Log in", href: APP_URL, external: true },
    ],
  },
  {
    title: "Resources",
    links: [
      ...compareLinks.map(({ label, href }) => ({
        label: href === "/compare" ? "Compare Solara" : `Solara ${label}`,
        href,
      })),
      ...resourceLinks
        .filter((link) => link.href !== "/contact")
        .map(({ label, href, external }) => ({ label, href, external })),
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-conditions" },
      { label: "HIPAA Compliance", href: "/hipaa-compliance" },
    ],
  },
];
