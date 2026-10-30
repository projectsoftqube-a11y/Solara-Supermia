import { Clock } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TableFrame } from "@/components/inner/ComparisonTable";
import {
  ArticleBody,
  CtaBand,
  FaqList,
  KeyTakeaways,
  RelatedLinks,
  Sources,
} from "@/components/inner/ContentBlocks";
import { PageHero } from "@/components/inner/PageHero";
import { ButtonLink, PageShell } from "@/components/inner/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPost, postPath, posts, readingMinutes, wordCount } from "@/content/blog";
import type { BlogPost } from "@/content/blog";
import { featurePath, getFeature } from "@/content/features";
import { pageMetadata } from "@/lib/seo/metadata";
import { ogImagePath } from "@/lib/seo/og";
import { getPage } from "@/lib/seo/pages";
import { absoluteUrl, faqNode, ids, webPageNode } from "@/lib/seo/schema";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  if (!getPost(slug)) return {};
  return pageMetadata({ ...getPage(postPath(slug)), type: "article" });
}

/** A real <table> placed after the section it belongs to. */
function PostTable({ table }: { table: NonNullable<BlogPost["table"]> }) {
  return (
    <TableFrame>
      <table className="w-full min-w-[620px] border-collapse text-left text-[15.5px]">
        <caption className="px-6 pt-6 pb-4 text-left text-[14px] font-semibold text-slate-600">
          {table.caption}
        </caption>
        <thead>
          <tr className="bg-[#0A1A1F] text-white">
            {table.columns.map((column) => (
              <th key={column} scope="col" className="px-6 py-4 text-[14px] font-semibold">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i} className="border-t border-slate-100 align-top">
              {row.map((cell, j) =>
                j === 0 ? (
                  <th key={j} scope="row" className="px-6 py-4 font-semibold text-slate-900">
                    {cell}
                  </th>
                ) : (
                  <td key={j} className="px-6 py-4 text-slate-700">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </TableFrame>
  );
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const path = postPath(slug);
  const page = getPage(path);
  const url = absoluteUrl(path);

  const relatedFeatures = post.relatedFeatures.map((featureSlug) => {
    const feature = getFeature(featureSlug);
    if (!feature) throw new Error(`Unknown feature ${featureSlug} in post ${slug}`);
    const href = featurePath(featureSlug);
    return {
      title: feature.name,
      href,
      summary: feature.summary,
      image: feature.image.src,
    };
  });
  const primary = getFeature(post.relatedFeatures[0]);
  const morePosts = posts.filter((p) => p.slug !== slug).slice(0, 4 - relatedFeatures.length);

  return (
    <PageShell>
      <JsonLd
        nodes={[
          webPageNode({
            path,
            title: page.title,
            description: page.description,
            datePublished: post.datePublished,
            dateModified: post.dateModified,
            speakable: [".answer-block", ".key-takeaways"],
            about: `${url}#article`,
          }),
          {
            "@type": "BlogPosting",
            "@id": `${url}#article`,
            headline: post.h1,
            description: post.description,
            url,
            mainEntityOfPage: { "@id": `${url}#webpage` },
            image: absoluteUrl(ogImagePath(path)),
            datePublished: post.datePublished,
            dateModified: post.dateModified,
            author: { "@id": ids.organization },
            publisher: { "@id": ids.organization },
            inLanguage: "en-US",
            articleSection: post.category,
            wordCount: wordCount(post),
            citation: post.citations.map((c) => c.url),
          },
          faqNode(path, post.faqs),
        ]}
      />

      <PageHero
        eyebrow={post.category}
        title={post.h1}
        answer={post.answer}
        updated={post.dateModified}
        image={primary?.image}
        actions={
          <p className="inline-flex items-center gap-2.5 text-[16px] font-medium text-slate-300">
            <Clock className="h-4 w-4 text-[#FFB23E]" aria-hidden="true" />
            {readingMinutes(post)} min read · By the Solara team
          </p>
        }
      />

      <KeyTakeaways items={post.takeaways} />

      <ArticleBody
        sections={post.sections}
        insert={
          post.table
            ? { afterSection: post.table.afterSection, node: <PostTable table={post.table} /> }
            : undefined
        }
        aside={
          <div className="rounded-[28px] bg-gradient-to-br from-[#0A1A1F] to-[#173B42] p-7 text-white">
            <p className="text-[12px] font-bold tracking-[0.2em] text-[#FFB23E] uppercase">
              Solara
            </p>
            <p className="mt-4 font-display text-[26px] leading-tight font-extrabold tracking-tight">
              Let the front office run itself
            </p>
            <p className="mt-3 text-[16px] leading-relaxed text-slate-300">
              See a real call turn into a booked, verified appointment in OpenDental.
            </p>
            <div className="mt-6">
              <ButtonLink href="/book-a-demo">Book a demo</ButtonLink>
            </div>
          </div>
        }
      />

      <FaqList faqs={post.faqs} title="Frequently asked questions" />

      <Sources citations={post.citations} />

      <RelatedLinks
        title="Related reading"
        cards={[
          ...relatedFeatures,
          ...morePosts.map((p) => ({
            title: p.h1,
            href: postPath(p.slug),
            summary: p.description,
            image: getFeature(p.relatedFeatures[0])?.image.src,
            cta: "Read the article",
          })),
        ]}
      />

      <CtaBand />
    </PageShell>
  );
}
