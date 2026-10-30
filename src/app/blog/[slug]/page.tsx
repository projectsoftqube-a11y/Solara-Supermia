import { Clock } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  ArticleSections,
  CtaBand,
  FaqList,
  KeyTakeaways,
  RelatedLinks,
  Sources,
} from "@/components/inner/ContentBlocks";
import { PageHero } from "@/components/inner/PageHero";
import { PageShell } from "@/components/inner/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPost, postPath, posts, readingMinutes, wordCount } from "@/content/blog";
import type { BlogPost } from "@/content/blog";
import { featurePath, getFeature } from "@/content/features";
import { platformLinks } from "@/content/navigation";
import { pageMetadata } from "@/lib/seo/metadata";
import { ogImagePath } from "@/lib/seo/og";
import { getPage } from "@/lib/seo/pages";
import { absoluteUrl, breadcrumbNode, faqNode, ids, webPageNode } from "@/lib/seo/schema";

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
    <div className="overflow-x-auto rounded-3xl border border-slate-200/80 bg-white">
      <table className="w-full min-w-[600px] border-collapse text-left text-[14.5px]">
        <caption className="px-5 pt-5 pb-3 text-left text-[13px] font-semibold text-slate-600">
          {table.caption}
        </caption>
        <thead>
          <tr className="bg-slate-900 text-white">
            {table.columns.map((column) => (
              <th key={column} scope="col" className="px-5 py-3.5 text-[13px] font-semibold">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr
              key={i}
              className={`border-t border-slate-100 align-top ${i % 2 ? "bg-slate-50/50" : ""}`}
            >
              {row.map((cell, j) =>
                j === 0 ? (
                  <th key={j} scope="row" className="px-5 py-3.5 font-semibold text-slate-900">
                    {cell}
                  </th>
                ) : (
                  <td key={j} className="px-5 py-3.5 text-slate-700">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const path = postPath(slug);
  const page = getPage(path);
  const url = absoluteUrl(path);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.h1, path },
  ];

  const relatedFeatures = post.relatedFeatures.map((featureSlug) => {
    const feature = getFeature(featureSlug);
    if (!feature) throw new Error(`Unknown feature ${featureSlug} in post ${slug}`);
    const href = featurePath(featureSlug);
    return {
      title: feature.name,
      href,
      summary: feature.summary,
      icon: platformLinks.find((link) => link.href === href)?.icon,
    };
  });
  const morePosts = posts.filter((p) => p.slug !== slug).slice(0, 4 - relatedFeatures.length);

  return (
    <PageShell>
      <JsonLd
        nodes={[
          webPageNode({
            path,
            title: page.title,
            description: page.description,
            crumbs,
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
          breadcrumbNode(path, crumbs),
          faqNode(path, post.faqs),
        ]}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow={post.category}
        title={post.h1}
        answer={post.answer}
        updated={post.dateModified}
        actions={
          <p className="inline-flex items-center gap-2 text-[14px] font-medium text-slate-600">
            <Clock className="h-4 w-4 text-[#C13A22]" aria-hidden="true" />
            {readingMinutes(post)} min read · By the Solara team
          </p>
        }
      />

      <KeyTakeaways items={post.takeaways} />

      <ArticleSections
        sections={post.sections}
        insert={
          post.table
            ? { afterSection: post.table.afterSection, node: <PostTable table={post.table} /> }
            : undefined
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
            cta: "Read the article",
          })),
        ]}
      />

      <CtaBand />
    </PageShell>
  );
}
