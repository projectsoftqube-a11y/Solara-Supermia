import { ArrowRight, CalendarDays, LogIn, Mail, Phone, PhoneCall } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { FaqList } from "@/components/inner/ContentBlocks";
import { PageHero } from "@/components/inner/PageHero";
import { Container } from "@/components/inner/PageShell";
import { PageShell } from "@/components/inner/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqsById } from "@/content/faqs";
import { pageMetadata } from "@/lib/seo/metadata";
import { getPage } from "@/lib/seo/pages";
import { breadcrumbNode, faqNode, ids, webPageNode } from "@/lib/seo/schema";
import { APP_URL, CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from "@/lib/site";

const PATH = "/contact";
const page = getPage(PATH);

export const metadata: Metadata = pageMetadata(page);

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: PATH },
];

const faqs = faqsById(["setup-time", "free-first-two-months", "how-much-does-solara-cost"]);

const OPTIONS = [
  {
    icon: CalendarDays,
    title: "Book a 20-minute demo",
    body: "Pick a time on our calendar and see Solara handle a real call, end to end.",
    href: "/book-a-demo",
    cta: "Book a demo",
  },
  {
    icon: PhoneCall,
    title: "Schedule a call back",
    body: "Choose a date and time and we will call you, in US Eastern Time.",
    href: "/schedule-call",
    cta: "Schedule a call",
  },
  {
    icon: Mail,
    title: "Email the team",
    body: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    cta: "Send an email",
  },
  {
    icon: Phone,
    title: "Call us",
    body: CONTACT_PHONE_DISPLAY,
    href: `tel:${CONTACT_PHONE.replaceAll("-", "")}`,
    cta: "Call now",
  },
];

export default function ContactPage() {
  return (
    <PageShell>
      <JsonLd
        nodes={[
          webPageNode({
            path: PATH,
            title: page.title,
            description: page.description,
            type: "ContactPage",
            crumbs,
            datePublished: page.datePublished,
            dateModified: page.lastModified,
            speakable: [".answer-block"],
            about: ids.organization,
          }),
          breadcrumbNode(PATH, crumbs),
          faqNode(PATH, faqs),
        ]}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow="Contact"
        title="Talk to the Solara team"
        answer={`You can reach Solara by email at ${CONTACT_EMAIL} or by phone at ${CONTACT_PHONE_DISPLAY}. The fastest way to see the product is a 20-minute demo booked online, or you can schedule a call back at a time that suits your practice.`}
        updated={page.lastModified}
      />

      <section aria-label="Ways to reach Solara" className="pb-16 sm:pb-24">
        <Container>
          <ul className="grid gap-5 sm:grid-cols-2">
            {OPTIONS.map((option) => {
              const external = option.href.startsWith("mailto:") || option.href.startsWith("tel:");
              const className =
                "group flex h-full flex-col rounded-3xl border border-slate-200/80 bg-white p-7 transition hover:-translate-y-0.5 hover:border-[#FF6A55]/30 hover:shadow-[0_24px_50px_-30px_rgba(15,23,42,0.4)]";
              const body = (
                <>
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#FFF0EB] text-[#C13A22]">
                    <option.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h2 className="mt-5 font-display text-xl font-bold text-slate-900">
                    {option.title}
                  </h2>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate-600">
                    {option.body}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#C13A22]">
                    {option.cta}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </>
              );
              return (
                <li key={option.title}>
                  {external ? (
                    <a href={option.href} className={className}>
                      {body}
                    </a>
                  ) : (
                    <Link href={option.href} className={className}>
                      {body}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-slate-700 hover:text-[#C13A22]"
          >
            <LogIn className="h-4 w-4" aria-hidden="true" />
            Already a customer? Log in to Solara
          </a>
        </Container>
      </section>

      <FaqList faqs={faqs} title="Before you get in touch" />
    </PageShell>
  );
}
