import { graph, type JsonLdNode } from "@/lib/seo/schema";

/**
 * Renders a JSON-LD @graph. `<` is escaped so text inside the data can never
 * close the script tag early.
 */
export function JsonLd({ nodes }: { nodes: JsonLdNode[] }) {
  const json = JSON.stringify(graph(nodes)).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
