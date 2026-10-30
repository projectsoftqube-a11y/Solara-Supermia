import type { Metadata } from "next";

import { BookADemoPage } from "@/components/pages/BookADemoPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo/metadata";
import { getPage } from "@/lib/seo/pages";
import { breadcrumbNode, ids, webPageNode } from "@/lib/seo/schema";

const PATH = "/book-a-demo";
const page = getPage(PATH);

export const metadata: Metadata = pageMetadata(page);

const crumbs = [
  { name: "Home", path: "/" },
  { name: page.label.replace(/^./, (c) => c.toUpperCase()), path: PATH },
];

export default function Page() {
  return (
    <>
      <JsonLd
        nodes={[
          webPageNode({
            path: PATH,
            title: page.title,
            description: page.description,
            type: "ContactPage",
            crumbs,
            dateModified: page.lastModified,
            about: ids.organization,
          }),
          breadcrumbNode(PATH, crumbs),
        ]}
      />
      <BookADemoPage />
    </>
  );
}
