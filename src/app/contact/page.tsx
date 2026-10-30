import { ArrowRight, CalendarDays, LogIn, Mail, Phone, PhoneCall } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { FaqList } from "@/components/inner/ContentBlocks";
import { PageHero } from "@/components/inner/PageHero";
import { Band, Container, PageShell } from "@/components/inner/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqsById } from "@/content/faqs";
import { featurePhotos } from "@/content/photos";
import { pageMetadata } from "@/lib/seo/metadata";
import { getPage } from "@/lib/seo/pages";
import { faqNode, ids, webPageNode } from "@/lib/seo/schema";
import { APP_URL, CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from "@/lib/site";

const PATH = "/contact";
const page = getPage(PATH);

export const metadata: Metadata = pageMetadata(page);

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

/** The demo card fills the left half; the others stack beside it. */
const OPTION_SPANS = [
  "sm:col-span-2 lg:col-span-6 lg:row-span-2",
  "sm:col-span-2 lg:col-span-6",
  "lg:col-span-3",
  "lg:col-span-3",
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
            datePublished: page.datePublished,
            dateModified: page.lastModified,
            speakable: [".answer-block"],
            about: ids.organization,
          }),
          faqNode(PATH, faqs),
        ]}
      />

      <PageHero
        eyebrow="Contact"
        title="Talk to the Solara team"
        answer={`You can reach Solara by email at ${CONTACT_EMAIL} or by phone at ${CONTACT_PHONE_DISPLAY}. The fastest way to see the product is a 20-minute demo booked online, or you can schedule a call back at a time that suits your practice.`}
        updated={page.lastModified}
        image={featurePhotos.frontDeskCall}
      />

      <Band tone="cream" size="flush" aria-label="Ways to reach Solara">
        <Container>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-12">
            {OPTIONS.map((option, i) => {
              const lead = i === 0;
              const external = option.href.startsWith("mailto:") || option.href.startsWith("tel:");
              const className = `group relative isolate flex h-full flex-col overflow-hidden rounded-[32px] p-8 ring-1 transition hover:-translate-y-1 sm:p-10 ${
                lead
                  ? "min-h-[440px] justify-end bg-[#0A1A1F] text-white ring-white/10"
                  : "bg-white text-slate-900 ring-slate-900/5 hover:shadow-[0_32px_64px_-40px_rgba(15,23,42,0.5)]"
              }`;
              const body = (
                <>
                  {lead && (
                    <>
                      <Image
                        src={featurePhotos.ownerTablets.src}
                        alt=""
                        fill
                        sizes="(min-width: 1668px) 770px, (min-width: 1024px) 50vw, 100vw"
                        className="-z-20 object-cover transition duration-700 group-hover:scale-105"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 bg-gradient-to-t from-[#060F14] via-[#060F14]/80 to-[#060F14]/10"
                      />
                    </>
                  )}
                  <span
                    className={`grid h-14 w-14 place-items-center rounded-2xl ${
                      lead
                        ? "border border-white/15 bg-white/10 text-[#FFB23E]"
                        : "bg-[#FFF0EB] text-[#C13A22]"
                    }`}
                  >
                    <option.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h2
                    className={`mt-6 font-display font-extrabold tracking-tight ${
                      lead ? "text-4xl sm:text-5xl" : "text-[26px] leading-tight"
                    }`}
                  >
                    {option.title}
                  </h2>
                  <p
                    className={`mt-3 text-[17px] leading-relaxed break-words ${
                      lead ? "max-w-lg flex-none text-slate-200" : "flex-1 text-slate-600"
                    }`}
                  >
                    {option.body}
                  </p>
                  <span
                    className={`mt-6 inline-flex items-center gap-2 text-[15px] font-semibold ${
                      lead ? "text-[#FFB23E]" : "text-[#C13A22]"
                    }`}
                  >
                    {option.cta}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </>
              );
              return (
                <li key={option.title} className={OPTION_SPANS[i]}>
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
            className="mt-8 inline-flex items-center gap-2 text-[16px] font-semibold text-slate-700 hover:text-[#C13A22]"
          >
            <LogIn className="h-4 w-4" aria-hidden="true" />
            Already a customer? Log in to Solara
          </a>
        </Container>
      </Band>

      <FaqList faqs={faqs} title="Before you get in touch" contactCard={false} />
    </PageShell>
  );
}
