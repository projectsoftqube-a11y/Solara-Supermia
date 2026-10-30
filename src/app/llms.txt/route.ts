import { llmsIndex } from "@/lib/seo/llms";

/** Curated, Markdown overview of the site for LLM-based crawlers. */
export function GET() {
  return new Response(llmsIndex(), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
