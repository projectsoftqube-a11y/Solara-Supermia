/**
 * Every page gets its own 1200×630 Open Graph image, prerendered at build time
 * by app/og/[slug]/route.tsx. The slug is the page path with slashes turned
 * into "--" ("/" itself becomes "home").
 */

export function ogSlug(path: string): string {
  const trimmed = path.replace(/^\/+|\/+$/g, "");
  return trimmed ? trimmed.replaceAll("/", "--") : "home";
}

export function pathFromOgSlug(slug: string): string {
  return slug === "home" ? "/" : `/${slug.replaceAll("--", "/")}`;
}

export function ogImagePath(path: string): string {
  return `/og/${ogSlug(path)}`;
}
