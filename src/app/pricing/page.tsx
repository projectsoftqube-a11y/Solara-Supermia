import { ArrowRight, Check, Gift } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { CtaBand, FaqList, KeyTakeaways } from "@/components/inner/ContentBlocks";
import { PageHero } from "@/components/inner/PageHero";
import { Container, SectionHeading } from "@/components/inner/PageShell";
import { PageShell } from "@/components/inner/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqsById } from "@/content/faqs";
import { plans } from "@/content/plans";
import { pageMetadata } from "@/lib/seo/metadata";
import { getPage } from "@/lib/seo/pages";
import { breadcrumbNode, faqNode, ids, webPageNode } from "@/lib/seo/schema";

const PATH = "/pricing";
const page = getPage(PATH);

export const metadata: Metadata = pageMetadata(page);

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Pricing", path: PATH },
];

const faqs = faqsById([
  "how-much-does-solara-cost",
  "free-first-two-months",
  "what-every-plan-includes",
  "ai-call-minutes",
  "annual-billing-savings",
  "support-response-times",
  "multi-location-support",
]);

const [essentials, pro, enterprise] = plans;

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

/** Rows of the plan comparison table, read straight from the plan data. */
const tableRows: { label: string; values: string[] }[] = [
  {
    label: "Price, billed monthly",
    values: plans.map((p) =>
      p.monthlyPrice ? `${usd(p.monthlyPrice)} / month` : (p.customLabel ?? "Custom"),
    ),
  },
  {
    label: "Price, billed annually",
    values: plans.map((p) =>
      p.annualPrice ? `${usd(p.annualPrice)} / month` : (p.customNote ?? "Custom"),
    ),
  },
  {
    label: "Annual saving",
    values: plans.map((p) => (p.savings ? `${usd(p.savings)} / year` : "—")),
  },
  { label: "Best for", values: plans.map((p) => p.tagline) },
];

export default function PricingPage() {
  return (
    <PageShell>
      <JsonLd
        nodes={[
          webPageNode({
            path: PATH,
            title: page.title,
            description: page.description,
            crumbs,
            datePublished: page.datePublished,
            dateModified: page.lastModified,
            speakable: [".answer-block", ".key-takeaways"],
            about: ids.software,
          }),
          breadcrumbNode(PATH, crumbs),
          faqNode(PATH, faqs),
        ]}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow="Pricing"
        title="How much does Solara cost?"
        answer={`Solara has three plans for dental practices. Essentials costs ${usd(essentials.monthlyPrice!)} per month, or ${usd(essentials.annualPrice!)} per month billed annually. Pro costs ${usd(pro.monthlyPrice!)} per month, or ${usd(pro.annualPrice!)} per month billed annually. Enterprise is custom-priced for multi-location groups. Founding clinics run Essentials free for the first two months, with no setup fee.`}
        updated={page.lastModified}
        actions={
          <Link
            href="/book-a-demo"
            className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-[15px] font-semibold text-white transition hover:bg-slate-800"
          >
            Book a 20-min demo
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        }
      />

      <KeyTakeaways
        items={[
          "All plans include insurance verification, paperless intake, OpenDental integration, and unlimited concurrent calls.",
          `Annual billing saves ${usd(essentials.savings!)} a year on Essentials and ${usd(pro.savings!)} a year on Pro.`,
          "Founding clinics run Essentials free for the first two months; Pro and Enterprise are billed from the first month.",
          "There is no setup fee, and you can cancel anytime.",
        ]}
      />

      <section aria-labelledby="plans" className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Plans"
            id="plans"
            title="Which Solara plan is right for my practice?"
            intro="Essentials covers the always-on phone and chat agent for solo practices. Pro adds the complete front office for growing groups. Enterprise is built for multi-location dental groups."
          />

          <ul className="mt-12 grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <li
                key={plan.id}
                className={`relative flex flex-col rounded-[28px] p-7 sm:p-8 ${
                  plan.popular
                    ? "bg-slate-900 text-white shadow-[0_40px_80px_-40px_rgba(15,23,42,0.7)]"
                    : "border border-slate-200/80 bg-white"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-7 rounded-full bg-gradient-to-r from-[#FF6A55] to-[#FFB23E] px-3 py-1 text-[11px] font-bold tracking-wider text-slate-900 uppercase">
                    Most popular
                  </span>
                )}
                <h3 className="font-display text-2xl font-bold">{plan.name}</h3>
                <p
                  className={`mt-1 text-sm font-medium ${plan.popular ? "text-slate-400" : "text-slate-600"}`}
                >
                  {plan.tagline}
                </p>
                <p
                  className={`mt-4 text-[15px] leading-relaxed ${plan.popular ? "text-slate-300" : "text-slate-600"}`}
                >
                  {plan.desc}
                </p>

                <div className="mt-6">
                  {plan.monthlyPrice ? (
                    <>
                      <p className="flex items-baseline gap-1.5">
                        <span className="font-display text-5xl font-bold tracking-tight">
                          {usd(plan.annualPrice!)}
                        </span>
                        <span className={plan.popular ? "text-slate-400" : "text-slate-600"}>
                          / month
                        </span>
                      </p>
                      <p
                        className={`mt-1 text-[13px] ${plan.popular ? "text-slate-400" : "text-slate-600"}`}
                      >
                        Billed annually · {usd(plan.monthlyPrice)} / month billed monthly
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-display text-5xl font-bold tracking-tight">
                        {plan.customLabel}
                      </p>
                      <p className="mt-1 text-[13px] text-slate-600">{plan.customNote}</p>
                    </>
                  )}
                </div>

                {plan.inheritLabel && (
                  <p
                    className={`mt-7 text-[13px] font-semibold ${plan.popular ? "text-[#FFB23E]" : "text-[#C13A22]"}`}
                  >
                    {plan.inheritLabel}
                  </p>
                )}
                <ul className={`${plan.inheritLabel ? "mt-3" : "mt-7"} flex-1 space-y-3`}>
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-[14.5px] leading-snug">
                      <Check
                        className={`mt-0.5 h-4 w-4 shrink-0 ${plan.popular ? "text-[#FFB23E]" : "text-[#16C4B3]"}`}
                        strokeWidth={3}
                        aria-hidden="true"
                      />
                      <span className={plan.popular ? "text-slate-200" : "text-slate-700"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/book-a-demo"
                  className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold transition ${
                    plan.popular
                      ? "bg-gradient-to-r from-[#D2432D] to-[#C13A22] text-white hover:brightness-105"
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
                >
                  {plan.cta}
                  <span className="sr-only"> for the {plan.name} plan</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        aria-labelledby="compare-plans"
        className="border-t border-slate-200/70 bg-white py-16 sm:py-24"
      >
        <Container>
          <SectionHeading
            eyebrow="Side by side"
            id="compare-plans"
            title="How do the plans compare on price?"
          />
          <div className="mt-10 overflow-x-auto rounded-3xl border border-slate-200/80">
            <table className="w-full min-w-[560px] border-collapse text-left text-[15px]">
              <caption className="sr-only">Solara plan prices and billing options</caption>
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th scope="col" className="px-5 py-4 text-[13px] font-semibold">
                    Plan
                  </th>
                  {plans.map((plan) => (
                    <th key={plan.id} scope="col" className="px-5 py-4 text-[13px] font-semibold">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, i) => (
                  <tr
                    key={row.label}
                    className={`border-t border-slate-100 ${i % 2 ? "bg-slate-50/50" : ""}`}
                  >
                    <th scope="row" className="px-5 py-4 font-semibold text-slate-900">
                      {row.label}
                    </th>
                    {row.values.map((value, j) => (
                      <td key={j} className="px-5 py-4 text-slate-700">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex flex-col gap-4 rounded-3xl bg-[#FFF6EC] p-7 sm:flex-row sm:items-center">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-[#C13A22] shadow-sm">
              <Gift className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-display text-lg font-bold text-slate-900">Founding offer</h3>
              <p className="mt-1 text-[15px] leading-relaxed text-slate-600">
                Founding clinics run {essentials.name} free for the first two months, with no setup
                fee and the option to cancel anytime. {pro.name} and {enterprise.name} are billed
                from the first month.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <FaqList faqs={faqs} title="Pricing questions" />

      <CtaBand
        title="Get a price for your practice"
        body="Book a 20-minute demo and we will map Solara to your practice, your call volume and the plan that fits."
      />
    </PageShell>
  );
}
