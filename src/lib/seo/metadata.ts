import type { Metadata } from "next";

import { baseOpenGraph, baseTwitter } from "@/lib/metadata";
import { ogImagePath } from "@/lib/seo/og";

type PageMetadataInput = {
  title: string;
  description: string;
  /** Site-relative path, e.g. "/pricing". Resolved against metadataBase. */
  path: string;
  /** Keep the page out of search results (thank-you pages and the like). */
  noindex?: boolean;
  /** Open Graph type; articles get "article". */
  type?: "website" | "article";
};

/**
 * Metadata for every page: unique title and description, a self-referencing
 * canonical, and matching Open Graph / Twitter cards with a per-page image.
 */
export function pageMetadata({
  title,
  description,
  path,
  noindex,
  type = "website",
}: PageMetadataInput): Metadata {
  const image = { url: ogImagePath(path), width: 1200, height: 630, alt: title };

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      ...baseOpenGraph,
      type,
      title,
      description,
      url: path,
      images: [image],
    },
    twitter: { ...baseTwitter, title, description, images: [image] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
