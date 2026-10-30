import { ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { CtaBand } from "@/components/inner/ContentBlocks";
import { formatDate, PageHero } from "@/components/inner/PageHero";
import { Container } from "@/components/inner/PageShell";
import { PageShell } from "@/components/inner/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { postPath, posts, readingMinutes } from "@/content/blog";
import { pageMetadata } from "@/lib/seo/metadata";
import { getPage } from "@/lib/seo/pages";
import { breadcrumbNode, itemListNode, webPageNode } from "@/lib/seo/schema";

const PATH = "/blog";
const page = getPage(PATH);

export const metadata: Metadata = pageMetadata(page);

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Blog", path: PATH },
];

export default function BlogIndexPage() {
  return (
    <PageShell>
      <JsonLd
        nodes={[
          webPageNode({
            path: PATH,
            title: page.title,
            description: page.description,
            type: "CollectionPage",
            crumbs,
            datePublished: page.datePublished,
            dateModified: page.lastModified,
            speakable: [".answer-block"],
          }),
          breadcrumbNode(PATH, crumbs),
          itemListNode(
            PATH,
            "Solara blog posts",
            posts.map((post) => ({
              name: post.h1,
              path: postPath(post.slug),
              description: post.description,
            })),
          ),
        ]}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow="Blog"
        title="Practical guides for running a dental front office"
        answer="The Solara blog publishes practical, sourced guides for dental practice owners and office managers: verifying insurance, running recall, reducing no-shows, going paperless with intake, automating Open Dental workflows and tracking the front-office numbers that matter. Every factual claim links to its source."
        updated={page.lastModified}
      />

      <section aria-label="Posts" className="pb-20 sm:pb-28">
        <Container>
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <article className="group relative flex h-full flex-col rounded-3xl border border-slate-200/80 bg-white p-7 transition hover:-translate-y-0.5 hover:border-[#FF6A55]/30 hover:shadow-[0_24px_50px_-30px_rgba(15,23,42,0.4)]">
                  <p className="text-[11px] font-bold tracking-[0.16em] text-[#C13A22] uppercase">
                    {post.category}
                  </p>
                  <h2 className="mt-3 font-display text-xl leading-snug font-bold text-slate-900">
                    <Link href={postPath(post.slug)} className="after:absolute after:inset-0">
                      {post.h1}
                    </Link>
                  </h2>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-slate-600">
                    {post.description}
                  </p>
                  <div className="mt-6 flex items-center justify-between text-[13px] text-slate-600">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      {readingMinutes(post)} min read ·{" "}
                      <time dateTime={post.dateModified}>{formatDate(post.dateModified)}</time>
                    </span>
                    <ArrowRight
                      className="h-4 w-4 text-[#C13A22] transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand />
    </PageShell>
  );
}
