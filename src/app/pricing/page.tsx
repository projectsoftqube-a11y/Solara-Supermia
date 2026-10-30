import { Gift } from "lucide-react";
import type { Metadata } from "next";

import { TableFrame } from "@/components/inner/ComparisonTable";
import { CtaBand, FaqList, KeyTakeaways } from "@/components/inner/ContentBlocks";
import { GlassPanel, PanelLabel } from "@/components/inner/HeroPanels";
import { PageHero } from "@/components/inner/PageHero";
import {
  Band,
  ButtonLink,
  Container,
  PageShell,
  SectionHeading,
} from "@/components/inner/PageShell";
import { Pricing } from "@/components/sections/Pricing";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqsById } from "@/content/faqs";
import { plans } from "@/content/plans";
import { pageMetadata } from "@/lib/seo/metadata";
import { getPage } from "@/lib/seo/pages";
import { faqNode, ids, webPageNode } from "@/lib/seo/schema";

const PATH = "/pricing";
const page = getPage(PATH);

export const metadata: Metadata = pageMetadata(page);

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

/** Every plan at a glance, read from the plan data. */
function PricePanel() {
  return (
    <GlassPanel>
      <PanelLabel>Billed annually</PanelLabel>
      <ul className="mt-5 divide-y divide-white/10">
        {plans.map((plan) => (
          <li key={plan.id} className="flex items-center justify-between gap-5 py-6 last:pb-0">
            <span className="min-w-0">
              <span className="block font-display text-2xl font-bold text-white">{plan.name}</span>
              <span className="mt-0.5 block text-[15px] text-slate-300">{plan.tagline}</span>
            </span>
            <span className="shrink-0 text-right">
              <span
                className={`font-display text-[44px] leading-none font-extrabold xl:text-[56px] ${
                  plan.popular
                    ? "bg-gradient-to-r from-[#FF6A55] to-[#FFB23E] bg-clip-text text-transparent"
                    : "text-white"
                }`}
              >
                {plan.annualPrice ? usd(plan.annualPrice) : plan.customLabel}
              </span>
              <span className="block text-[14px] text-slate-300">
                {plan.annualPrice ? "per month" : plan.customNote}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </GlassPanel>
  );
}

export default function PricingPage() {
  return (
    <PageShell>
      <JsonLd
        nodes={[
          webPageNode({
            path: PATH,
            title: page.title,
            description: page.description,
            datePublished: page.datePublished,
            dateModified: page.lastModified,
            speakable: [".answer-block", ".key-takeaways"],
            about: ids.software,
          }),
          faqNode(PATH, faqs),
        ]}
      />

      <PageHero
        eyebrow="Pricing"
        title="How much does Solara cost?"
        answer={`Solara has three plans for dental practices. Essentials costs ${usd(essentials.monthlyPrice!)} per month, or ${usd(essentials.annualPrice!)} per month billed annually. Pro costs ${usd(pro.monthlyPrice!)} per month, or ${usd(pro.annualPrice!)} per month billed annually. Enterprise is custom-priced for multi-location groups. Founding clinics run Essentials free for the first two months, with no setup fee.`}
        updated={page.lastModified}
        actions={<ButtonLink href="/book-a-demo">Book a 20-min demo</ButtonLink>}
        visual={<PricePanel />}
        facts={[
          { value: "$0", label: "Setup fee" },
          { value: "2 months", label: "Free on Essentials for founding clinics" },
          { value: "Unlimited", label: "Concurrent calls on every plan" },
          { value: "Anytime", label: "Cancel whenever you need to" },
        ]}
      />

      <KeyTakeaways
        items={[
          "All plans include insurance verification, paperless intake, OpenDental integration, and unlimited concurrent calls.",
          `Annual billing saves ${usd(essentials.savings!)} a year on Essentials and ${usd(pro.savings!)} a year on Pro.`,
          "Founding clinics run Essentials free for the first two months; Pro and Enterprise are billed from the first month.",
          "There is no setup fee, and you can cancel anytime.",
        ]}
      />

      <Pricing />

      <Band tone="white" aria-labelledby="plans">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:sticky lg:top-32 lg:col-span-4 lg:self-start">
              <SectionHeading
                eyebrow="Plans"
                id="plans"
                title="Which Solara plan is right for my practice?"
                intro="Essentials covers the always-on phone and chat agent for solo practices. Pro adds the complete front office for growing groups. Enterprise is built for multi-location dental groups."
              />
            </div>
            <div className="min-w-0 lg:col-span-8">
              <h3 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
                How do the plans compare on price?
              </h3>
              <div className="mt-6">
                <TableFrame>
                  <table className="w-full min-w-[620px] border-collapse text-left text-[16px]">
                    <caption className="sr-only">Solara plan prices and billing options</caption>
                    <thead>
                      <tr className="bg-[#0A1A1F] text-white">
                        <th scope="col" className="px-6 py-5 text-[14px] font-semibold">
                          Plan
                        </th>
                        {plans.map((plan) => (
                          <th
                            key={plan.id}
                            scope="col"
                            className={`px-6 py-5 text-[14px] font-semibold ${
                              plan.popular ? "bg-gradient-to-br from-[#D2432D] to-[#C13A22]" : ""
                            }`}
                          >
                            {plan.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {tableRows.map((row) => (
                        <tr key={row.label} className="border-t border-slate-100">
                          <th scope="row" className="px-6 py-5 font-semibold text-slate-900">
                            {row.label}
                          </th>
                          {row.values.map((value, j) => (
                            <td key={j} className="px-6 py-5 text-slate-700">
                              {value}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </TableFrame>
              </div>

              <div className="mt-6 flex flex-col gap-5 rounded-[28px] bg-gradient-to-br from-[#0A1A1F] to-[#173B42] p-7 text-white sm:flex-row sm:items-center sm:p-9">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-white/15 bg-white/10 text-[#FFB23E]">
                  <Gift className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold sm:text-2xl">Founding offer</h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-slate-300">
                    Founding clinics run {essentials.name} free for the first two months, with no
                    setup fee and the option to cancel anytime. {pro.name} and {enterprise.name} are
                    billed from the first month.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Band>

      <FaqList faqs={faqs} title="Pricing questions" />

      <CtaBand
        title="Get a price for your practice"
        body="Book a 20-minute demo and we will map Solara to your practice, your call volume and the plan that fits."
      />
    </PageShell>
  );
}
