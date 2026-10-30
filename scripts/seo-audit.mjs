/**
 * SEO / AEO / GEO verification against a running build.
 *
 *   npm run build && npm run start          (in one terminal)
 *   npm run seo:audit                       (defaults to http://localhost:3000)
 *   npm run seo:audit -- https://staging.example.com
 *
 * Exits non-zero when any check fails, so it can gate CI.
 */

const ORIGIN = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const SITE = "https://solara.supermia.ai";

const failures = [];
const warnings = [];
const fail = (where, msg) => failures.push(`${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ");

const textOf = (html) =>
  decode(
    html
      .replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<style[\s\S]*?<\/style>/g, " ")
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();

const local = (url) => url.replace(SITE, ORIGIN);

async function get(url, init) {
  const res = await fetch(url, { redirect: "manual", ...init });
  return { res, body: res.headers.get("content-type")?.includes("image") ? "" : await res.text() };
}

/* ── 1. Machine-readable files ──────────────────────────────────── */

const files = [
  ["/robots.txt", "text/plain"],
  ["/sitemap.xml", "xml"],
  ["/llms.txt", "text/plain"],
  ["/llms-full.txt", "text/plain"],
  ["/manifest.webmanifest", "json"],
];
for (const [path, type] of files) {
  const { res, body } = await get(ORIGIN + path);
  if (res.status !== 200) fail(path, `status ${res.status}`);
  else if (!res.headers.get("content-type")?.includes(type))
    fail(path, `content-type ${res.headers.get("content-type")}`);
  else if (body.trim().length < 50) fail(path, "suspiciously empty");
}
{
  const { body } = await get(ORIGIN + "/robots.txt");
  if (!/Sitemap: https:\/\/solara\.supermia\.ai\/sitemap\.xml/.test(body))
    fail("/robots.txt", "no sitemap line");
  for (const bot of ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"]) {
    if (!body.includes(bot)) fail("/robots.txt", `${bot} not listed`);
  }
}

/* ── 2. Every sitemap URL ───────────────────────────────────────── */

const sitemap = (await get(ORIGIN + "/sitemap.xml")).body;
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (urls.length < 10) fail("/sitemap.xml", `only ${urls.length} URLs`);

const titles = new Map();
const descriptions = new Map();
const internalLinks = new Set();
const ogImages = new Set();
let jsonLdNodes = 0;

for (const url of urls) {
  const path = url.replace(SITE, "") || "/";
  const { res, body: html } = await get(local(url));
  if (res.status !== 200) {
    fail(
      path,
      `status ${res.status}${res.headers.get("location") ? ` → ${res.headers.get("location")}` : ""}`,
    );
    continue;
  }
  const head = html.match(/<head>([\s\S]*?)<\/head>/)?.[1] ?? "";
  const body = html.slice(html.indexOf("<body"));

  // Title + description
  const title = decode(head.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "");
  const desc = decode(head.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "");
  if (title.length < 15 || title.length > 60)
    fail(path, `title length ${title.length}: "${title}"`);
  if (desc.length < 70 || desc.length > 155) fail(path, `description length ${desc.length}`);
  if (titles.has(title)) fail(path, `duplicate title with ${titles.get(title)}`);
  if (descriptions.has(desc)) fail(path, `duplicate description with ${descriptions.get(desc)}`);
  titles.set(title, path);
  descriptions.set(desc, path);

  // Canonical + robots
  const canonical = head.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  const expected = path === "/" ? [SITE, `${SITE}/`] : [`${SITE}${path}`];
  if (!canonical) fail(path, "no canonical");
  else if (!expected.includes(canonical)) fail(path, `canonical ${canonical}`);
  if (/<meta name="robots" content="[^"]*noindex/.test(head))
    fail(path, "noindex page listed in sitemap");

  // Open Graph
  for (const prop of ["og:title", "og:description", "og:url", "og:image", "og:site_name"]) {
    if (!head.includes(`property="${prop}"`)) fail(path, `missing ${prop}`);
  }
  if (!head.includes('name="twitter:card" content="summary_large_image"'))
    fail(path, "twitter card");
  const og = head.match(/property="og:image" content="([^"]*)"/)?.[1];
  if (og) ogImages.add(og);

  // Headings
  const levels = [...body.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  const h1s = levels.filter((l) => l === 1).length;
  if (h1s !== 1) fail(path, `${h1s} <h1> elements`);
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] > levels[i - 1] + 1) {
      fail(path, `heading skip h${levels[i - 1]} → h${levels[i]}`);
      break;
    }
  }

  // Raw-HTML content (no JS needed)
  const text = textOf(body);
  const words = text.split(" ").length;
  if (words < 300 && !["/book-a-demo", "/schedule-call", "/contact"].includes(path))
    warn(path, `thin page: ${words} words`);
  if (
    path !== "/" &&
    !/answer-block/.test(body) &&
    !/^\/(privacy|terms|hipaa|book-a-demo|schedule-call)/.test(path.slice(0))
  )
    fail(path, "no answer block in server HTML");

  // JSON-LD
  const blocks = [
    ...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g),
  ].map((m) => m[1]);
  if (!blocks.length) fail(path, "no JSON-LD");
  const nodes = [];
  for (const block of blocks) {
    try {
      const data = JSON.parse(block);
      nodes.push(...(data["@graph"] ?? [data]));
    } catch (e) {
      fail(path, `invalid JSON-LD: ${e.message}`);
    }
  }
  jsonLdNodes += nodes.length;
  const defined = new Set();
  const refs = [];
  const walk = (value, inDefinition) => {
    if (Array.isArray(value)) return value.forEach((v) => walk(v, inDefinition));
    if (value && typeof value === "object") {
      const keys = Object.keys(value);
      if (value["@id"] && keys.length === 1) refs.push(value["@id"]);
      else if (value["@id"]) defined.add(value["@id"]);
      for (const [k, v] of Object.entries(value)) {
        if (v === undefined || v === null || v === "") fail(path, `empty JSON-LD value at "${k}"`);
        walk(v, true);
      }
    } else if (
      typeof value === "string" &&
      /undefined|null|TODO|lorem/i.test(value) &&
      value.length < 40
    ) {
      fail(path, `placeholder JSON-LD value "${value}"`);
    }
  };
  nodes.forEach((n) => walk(n, false));
  for (const ref of refs) if (!defined.has(ref)) fail(path, `unresolved @id ${ref}`);
  for (const type of ["Organization", "WebSite", "SoftwareApplication"]) {
    if (!nodes.some((n) => n["@type"] === type)) fail(path, `missing site entity ${type}`);
  }
  if (/"aggregateRating"|"reviewCount"|"ratingValue"/.test(blocks.join("")))
    fail(path, "rating markup present");

  // FAQ schema text must be identical to the rendered text
  const questions = nodes.flatMap((n) => (n["@type"] === "FAQPage" ? (n.mainEntity ?? []) : []));
  for (const q of questions) {
    if (!text.includes(q.name)) fail(path, `FAQ question not rendered: "${q.name.slice(0, 50)}"`);
    if (!text.includes(q.acceptedAnswer.text))
      fail(path, `FAQ answer not rendered for "${q.name.slice(0, 50)}"`);
  }

  // Internal links (checked once each below)
  for (const m of body.matchAll(/<a\b[^>]*href="(\/[^"#]*)"/g))
    internalLinks.add(m[1].split("?")[0]);
}

/* ── 3. Internal links and OG images ────────────────────────────── */

for (const href of internalLinks) {
  if (/^\/(brochure|images|videos|icons)\//.test(href)) {
    const res = await fetch(ORIGIN + href, { method: "HEAD" });
    if (res.status !== 200) fail(`link ${href}`, `status ${res.status}`);
    continue;
  }
  const res = await fetch(ORIGIN + href, { redirect: "manual" });
  if (res.status !== 200) fail(`link ${href}`, `status ${res.status}`);
  if (
    !urls.includes(`${SITE}${href === "/" ? "" : href}`) &&
    !urls.includes(`${SITE}${href}`) &&
    href !== "/"
  ) {
    if (!["/thank-you", "/booking-confirmed"].includes(href))
      warn(`link ${href}`, "linked but not in sitemap");
  }
}
for (const og of ogImages) {
  const res = await fetch(local(og));
  const type = res.headers.get("content-type");
  if (res.status !== 200 || !type?.includes("image/png"))
    fail(og, `OG image ${res.status} ${type}`);
}

/* ── Report ─────────────────────────────────────────────────────── */

console.log(
  `Checked ${urls.length} sitemap URLs, ${internalLinks.size} internal links, ${ogImages.size} OG images, ${jsonLdNodes} JSON-LD nodes.`,
);
if (warnings.length) console.log(`\nWarnings (${warnings.length}):\n  ${warnings.join("\n  ")}`);
if (failures.length) {
  console.log(`\nFAILED (${failures.length}):\n  ${failures.join("\n  ")}`);
  process.exit(1);
}
console.log("\nAll SEO checks passed.");
