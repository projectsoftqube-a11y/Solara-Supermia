import type { Metadata } from "next";

import { BookADemoPage } from "@/components/pages/BookADemoPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo/metadata";
import { getPage } from "@/lib/seo/pages";
import { ids, webPageNode } from "@/lib/seo/schema";

const PATH = "/book-a-demo";
const page = getPage(PATH);

export const metadata: Metadata = pageMetadata(page);

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
            dateModified: page.lastModified,
            about: ids.organization,
          }),
        ]}
      />
      <BookADemoPage />
    </>
  );
}
