import type { Citation, ContentSection } from "@/content/features";
import type { Faq } from "@/content/faqs";

export type BlogCategory = "Insurance" | "Recall & retention" | "Patient experience" | "Operations";

export type BlogTable = {
  caption: string;
  columns: string[];
  rows: string[][];
  /** Render the table after this section index (0-based). */
  afterSection: number;
};

/**
 * One blog post. Rendered by app/blog/[slug]; its BlogPosting and FAQPage
 * structured data, sitemap entry and llms-full.txt text all come from here.
 */
export type BlogPost = {
  slug: string;
  /** Meta title, 15–60 characters, ending in " | Solara". */
  title: string;
  /** Meta description, 70–155 characters. */
  description: string;
  h1: string;
  category: BlogCategory;
  /** 40–60 word standalone answer to the post's core question. */
  answer: string;
  /** 3–5 complete, standalone sentences. */
  takeaways: string[];
  /** Question-form H2s; each section's first paragraph answers its heading. */
  sections: ContentSection[];
  table?: BlogTable;
  /** 3–5 questions; ids prefixed with the slug. */
  faqs: Faq[];
  /** Every external fact in the post is backed by one of these. */
  citations: Citation[];
  /** Slugs from content/features.ts that this post links to. */
  relatedFeatures: string[];
  /** YYYY-MM-DD */
  datePublished: string;
  /** YYYY-MM-DD */
  dateModified: string;
};
