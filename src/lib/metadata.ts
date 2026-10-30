import type { Metadata } from "next";

import { DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, DEFAULT_TITLE, SITE_NAME } from "@/lib/site";

/**
 * Open Graph defaults. Next.js replaces (not merges) a parent's `openGraph`
 * when a page sets its own, so pages spread this before overriding fields.
 */
export const baseOpenGraph = {
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  type: "website",
  siteName: SITE_NAME,
  images: [DEFAULT_OG_IMAGE],
} satisfies Metadata["openGraph"];

export const baseTwitter = {
  card: "summary_large_image",
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  images: [DEFAULT_OG_IMAGE],
} satisfies Metadata["twitter"];
