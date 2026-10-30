import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

/**
 * Search and AI crawlers are all welcome: being retrieved and cited by answer
 * engines is the point. Google-Extended and Applebot-Extended control use of
 * the content for AI training and grounding (not search indexing), so blocking
 * them would remove Solara from those AI answers while leaving it in search.
 *
 * Nothing is disallowed: the site has no search, filter, cart or API paths
 * that would waste crawl budget. Confirmation pages stay crawlable on purpose
 * so crawlers can see their noindex tag.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "CCBot",
  "meta-externalagent",
  "Amazonbot",
  "Bytespider",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
