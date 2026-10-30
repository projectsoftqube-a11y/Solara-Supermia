import { ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CtaBand } from "@/components/inner/ContentBlocks";
import { formatDate, PageHero } from "@/components/inner/PageHero";
import { Band, Container, PageShell } from "@/components/inner/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { postPath, posts, readingMinutes, type BlogPost } from "@/content/blog";
import { getFeature } from "@/content/features";
import { pageMetadata } from "@/lib/seo/metadata";
import { getPage } from "@/lib/seo/pages";
import { itemListNode, webPageNode } from "@/lib/seo/schema";

const PATH = "/blog";
const page = getPage(PATH);

export const metadata: Metadata = pageMetadata(page);

function PostCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  const image = getFeature(post.relatedFeatures[0])?.image;

  return (
    <article
      className={`group relative flex h-full overflow-hidden rounded-[32px] ring-1 transition hover:-translate-y-1 hover:shadow-[0_32px_64px_-40px_rgba(15,23,42,0.5)] ${
        featured
          ? "flex-col bg-gradient-to-br from-[#0A1A1F] to-[#173B42] text-white ring-white/10 lg:flex-row-reverse"
          : "flex-col bg-white text-slate-900 ring-slate-900/5"
      }`}
    >
      {image && (
        <div
          className={`relative overflow-hidden ${featured ? "aspect-[16/10] lg:aspect-auto lg:w-1/2" : "aspect-[16/10]"}`}
        >
          <Image
            src={image.src}
            alt=""
            fill
            sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1280px) 33vw, 50vw"}
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        </div>
      )}
      <div
        className={`flex flex-1 flex-col p-7 sm:p-9 ${featured ? "justify-center lg:w-1/2 lg:p-14 xl:p-20" : ""}`}
      >
        <p
          className={`text-[12px] font-bold tracking-[0.2em] uppercase ${
            featured ? "text-[#FFB23E]" : "text-[#C13A22]"
          }`}
        >
          {featured ? `Latest · ${post.category}` : post.category}
        </p>
        <h2
          className={`mt-4 font-display leading-[1.12] font-extrabold tracking-[-0.02em] text-balance ${
            featured ? "text-[32px] sm:text-5xl xl:text-[56px]" : "text-[25px]"
          }`}
        >
          <Link href={postPath(post.slug)} className="after:absolute after:inset-0">
            {post.h1}
          </Link>
        </h2>
        <p
          className={`mt-4 flex-1 leading-relaxed ${
            featured ? "max-w-xl flex-none text-lg text-slate-300" : "text-[16px] text-slate-600"
          }`}
        >
          {post.description}
        </p>
        <div
          className={`mt-7 flex items-center justify-between gap-4 text-[14px] ${
            featured ? "text-slate-300" : "text-slate-600"
          }`}
        >
          <span className="inline-flex items-center gap-2">
            <Clock className="h-4 w-4" aria-hidden="true" />
            {readingMinutes(post)} min read ·{" "}
            <time dateTime={post.dateModified}>{formatDate(post.dateModified)}</time>
          </span>
          <ArrowRight
            className={`h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1 ${
              featured ? "text-[#FFB23E]" : "text-[#C13A22]"
            }`}
            aria-hidden="true"
          />
        </div>
      </div>
    </article>
  );
}

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
            datePublished: page.datePublished,
            dateModified: page.lastModified,
            speakable: [".answer-block"],
          }),
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
        eyebrow="Blog"
        title="Practical guides for running a dental front office"
        highlight="dental front office"
        answer="The Solara blog publishes practical, sourced guides for dental practice owners and office managers: verifying insurance, running recall, reducing no-shows, going paperless with intake, automating Open Dental workflows and tracking the front-office numbers that matter. Every factual claim links to its source."
        updated={page.lastModified}
      />

      <Band tone="cream" size="flush" aria-label="Posts">
        <Container>
          <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post, i) => (
              <li
                key={post.slug}
                className={i === 0 ? "reveal md:col-span-2 xl:col-span-3" : "reveal"}
              >
                <PostCard post={post} featured={i === 0} />
              </li>
            ))}
          </ul>
        </Container>
      </Band>

      <CtaBand />
    </PageShell>
  );
}
