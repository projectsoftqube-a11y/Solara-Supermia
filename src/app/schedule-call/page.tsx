import type { Metadata } from "next";

import { ScheduleCallPage } from "@/components/pages/ScheduleCallPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo/metadata";
import { getPage } from "@/lib/seo/pages";
import { ids, webPageNode } from "@/lib/seo/schema";

const PATH = "/schedule-call";
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
      <ScheduleCallPage />
    </>
  );
}
