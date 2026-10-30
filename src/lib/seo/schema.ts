/**
 * JSON-LD builders. Every page emits one @graph; the site-wide entities
 * (Organization, WebSite, SoftwareApplication) live at stable fragment ids and
 * are referenced by @id from page nodes, so crawlers merge every page into one
 * coherent entity.
 *
 * Rule: nodes are built from the same data the page renders. Never add a
 * property (ratings, reviews, founding date, address…) without real data.
 */

import type { Faq } from "@/content/faqs";
import { plans } from "@/content/plans";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  DEFAULT_DESCRIPTION,
  LOGO,
  PARENT_ORGANIZATION,
  SAME_AS,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

export type JsonLdNode = { "@type": string | string[]; "@id"?: string } & Record<string, unknown>;

export const ids = {
  organization: `${SITE_URL}/#organization`,
  website: `${SITE_URL}/#website`,
  logo: `${SITE_URL}/#logo`,
  software: `${SITE_URL}/#software`,
} as const;

export const absoluteUrl = (path: string) => (path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`);

const ref = (id: string) => ({ "@id": id });

/** Drops placeholder links so a "#" or example URL can never ship in sameAs. */
const verifiedProfiles = SAME_AS.filter(
  (url) => /^https:\/\/[^/]+\.[a-z]{2,}\//i.test(url) && !/example\.|#$/.test(url),
);

export function organizationNode(): JsonLdNode {
  return {
    "@type": "Organization",
    "@id": ids.organization,
    name: SITE_NAME,
    alternateName: "Solara Dental AI",
    url: `${SITE_URL}/`,
    description: DEFAULT_DESCRIPTION,
    logo: {
      "@type": "ImageObject",
      "@id": ids.logo,
      url: absoluteUrl(LOGO.url),
      contentUrl: absoluteUrl(LOGO.url),
      width: LOGO.width,
      height: LOGO.height,
      caption: SITE_NAME,
    },
    image: ref(ids.logo),
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: CONTACT_PHONE,
        email: CONTACT_EMAIL,
        areaServed: "US",
        availableLanguage: "English",
      },
    ],
    parentOrganization: {
      "@type": "Organization",
      name: PARENT_ORGANIZATION.name,
      url: PARENT_ORGANIZATION.url,
    },
    ...(verifiedProfiles.length ? { sameAs: verifiedProfiles } : {}),
  };
}

export function websiteNode(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    publisher: ref(ids.organization),
    inLanguage: "en-US",
  };
}

export function softwareNode(): JsonLdNode {
  return {
    "@type": "SoftwareApplication",
    "@id": ids.software,
    name: SITE_NAME,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Dental practice front office automation",
    operatingSystem: "Web",
    url: `${SITE_URL}/`,
    description: DEFAULT_DESCRIPTION,
    publisher: ref(ids.organization),
    offers: plans.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      description: plan.desc,
      url: absoluteUrl("/pricing"),
      seller: ref(ids.organization),
      priceCurrency: "USD",
      ...(plan.monthlyPrice !== undefined
        ? {
            price: plan.monthlyPrice,
            priceSpecification: [
              {
                "@type": "UnitPriceSpecification",
                price: plan.monthlyPrice,
                priceCurrency: "USD",
                unitText: "month",
                description: "Billed monthly",
              },
              {
                "@type": "UnitPriceSpecification",
                price: plan.annualPrice,
                priceCurrency: "USD",
                unitText: "month",
                description: "Billed annually",
              },
            ],
          }
        : {
            // Custom-priced tier: describe it without inventing a number.
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "USD",
              description: plan.customNote ?? "Custom pricing",
            },
          }),
    })),
  };
}

/** Site-wide entities, emitted once per page by the root layout. */
export function siteGraph(): JsonLdNode[] {
  return [organizationNode(), websiteNode(), softwareNode()];
}

type WebPageInput = {
  path: string;
  title: string;
  description: string;
  type?: "WebPage" | "CollectionPage" | "FAQPage" | "AboutPage" | "ContactPage";
  image?: string;
  datePublished?: string;
  dateModified?: string;
  /** CSS selectors for the page's answer block and takeaways. */
  speakable?: string[];
  /** Main subject of the page; defaults to the product. */
  about?: string;
};

export function webPageNode({
  path,
  title,
  description,
  type = "WebPage",
  image,
  datePublished,
  dateModified,
  speakable,
  about = ids.software,
}: WebPageInput): JsonLdNode {
  const url = absoluteUrl(path);
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: ref(ids.website),
    about: ref(about),
    publisher: ref(ids.organization),
    inLanguage: "en-US",
    ...(image ? { primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl(image) } } : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    ...(speakable?.length
      ? { speakable: { "@type": "SpeakableSpecification", cssSelector: speakable } }
      : {}),
  };
}

/** FAQPage node whose text is taken verbatim from the rendered FAQs. */
export function faqNode(path: string, faqs: Faq[]): JsonLdNode {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faq`,
    isPartOf: ref(`${absoluteUrl(path)}#webpage`),
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function itemListNode(
  path: string,
  name: string,
  items: { name: string; path: string; description?: string }[],
): JsonLdNode {
  return {
    "@type": "ItemList",
    "@id": `${absoluteUrl(path)}#itemlist`,
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: absoluteUrl(item.path),
      ...(item.description ? { description: item.description } : {}),
    })),
  };
}

export function graph(nodes: JsonLdNode[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
