import type { MetadataRoute } from "next";

import { features } from "@/content/features";
import { absoluteUrl } from "@/lib/seo/schema";
import { pages } from "@/lib/seo/pages";

/** Feature pages carry an image entry for their hero illustration. */
const featureImages = new Map(
  features.map((feature) => [`/platform/${feature.slug}`, absoluteUrl(feature.image.src)]),
);

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => {
    const image = featureImages.get(page.path);
    return {
      url: absoluteUrl(page.path),
      lastModified: page.lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      ...(image ? { images: [image] } : {}),
    };
  });
}
