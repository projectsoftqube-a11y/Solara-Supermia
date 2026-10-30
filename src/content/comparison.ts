/**
 * The capability comparison shown on the home page and the /compare pages:
 * Solara next to an in-house front desk and a basic website chatbot.
 */

import {
  ShieldCheck,
  Clock,
  Database,
  ClipboardList,
  FileText,
  AlarmClock,
  CalendarCheck,
  Mail,
  MessageCircle,
  Calendar,
  ChartColumn,
  Search,
  Headphones,
  type LucideIcon,
} from "lucide-react";

/** "yes" | "no" | "limited", or a short label that also counts as yes. */
export type Support = "yes" | "no" | "limited" | (string & {});

export type ComparisonRow = {
  name: string;
  icon: LucideIcon;
  /** In-house front desk. */
  fd: Support;
  /** Basic website chatbot. */
  bot: Support;
  solara: Support;
};

export const comparisonRows: ComparisonRow[] = [
  { name: "Verifies insurance", icon: ShieldCheck, fd: "limited", bot: "no", solara: "yes" },
  { name: "Answers every call 24/7", icon: Clock, fd: "no", bot: "limited", solara: "yes" },
  { name: "Books into OpenDental", icon: Database, fd: "limited", bot: "no", solara: "yes" },
  {
    name: "Sends & fills intake forms",
    icon: ClipboardList,
    fd: "limited",
    bot: "no",
    solara: "yes",
  },
  { name: "Writes visit notes", icon: FileText, fd: "limited", bot: "no", solara: "yes" },
  { name: "Recall & reactivation", icon: AlarmClock, fd: "limited", bot: "no", solara: "yes" },
  {
    name: "Fills cancellations & waitlist",
    icon: CalendarCheck,
    fd: "limited",
    bot: "no",
    solara: "yes",
  },
  { name: "Reminders & confirmations", icon: Mail, fd: "limited", bot: "limited", solara: "yes" },
  {
    name: "Website chat + text booking",
    icon: MessageCircle,
    fd: "no",
    bot: "limited",
    solara: "yes",
  },
  {
    name: "Smart scheduling by provider & op",
    icon: Calendar,
    fd: "limited",
    bot: "no",
    solara: "yes",
  },
  { name: "Analytics & reporting", icon: ChartColumn, fd: "limited", bot: "no", solara: "yes" },
  {
    name: "Gets you found on Google",
    icon: Search,
    fd: "no",
    bot: "no",
    solara: "SEO + Google Ads",
  },
  {
    name: "Works after hours & overflow",
    icon: Headphones,
    fd: "no",
    bot: "limited",
    solara: "yes",
  },
];
