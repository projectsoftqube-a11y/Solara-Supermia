/**
 * Every blog post, newest first. Add a post by creating posts/<slug>.ts and
 * listing it here; the sitemap, llms.txt, OG image and /blog index pick it up.
 */

import { post as digitalIntakeForms } from "./posts/digital-dental-intake-forms";
import { post as frontOfficeKpis } from "./posts/dental-front-office-kpis";
import { post as insuranceChecklist } from "./posts/dental-insurance-verification-checklist";
import { post as recallSystem } from "./posts/dental-patient-recall-system";
import { post as openDentalAutomation } from "./posts/open-dental-front-office-automation";
import { post as reduceNoShows } from "./posts/reduce-dental-no-shows";
import type { BlogPost } from "./types";

export type { BlogPost } from "./types";

export const posts: BlogPost[] = [
  insuranceChecklist,
  recallSystem,
  reduceNoShows,
  digitalIntakeForms,
  openDentalAutomation,
  frontOfficeKpis,
].sort((a, b) => b.datePublished.localeCompare(a.datePublished));

const BY_SLUG = new Map(posts.map((post) => [post.slug, post]));

export function getPost(slug: string): BlogPost | undefined {
  return BY_SLUG.get(slug);
}

export function postPath(slug: string): string {
  return `/blog/${slug}`;
}

/** Words in the post body, for reading time and BlogPosting.wordCount. */
export function wordCount(post: BlogPost): number {
  const text = [
    post.answer,
    ...post.takeaways,
    ...post.sections.flatMap((s) => [s.heading, ...s.paragraphs, ...(s.bullets ?? [])]),
    ...post.faqs.flatMap((f) => [f.question, f.answer]),
  ].join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}

export function readingMinutes(post: BlogPost): number {
  return Math.max(1, Math.round(wordCount(post) / 230));
}
