import { llmsFull } from "@/lib/seo/llms";

/** The full text of every content page as one Markdown document. */
export function GET() {
  return new Response(llmsFull(), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
