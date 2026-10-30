# Solara

Marketing site for [Solara](https://solara.supermia.ai), the AI front office for
dental practices.

Built with Next.js 16 (App Router, Cache Components, Turbopack), React 19,
Tailwind CSS v4 and Motion.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script               | What it does                                    |
| -------------------- | ----------------------------------------------- |
| `npm run dev`        | Development server                              |
| `npm run build`      | Production build (prerenders every route)       |
| `npm run start`      | Serve the production build                      |
| `npm run check`      | Typecheck, lint and Prettier check in one go    |
| `npm run format`     | Format the whole repo with Prettier             |
| `npm run email:test` | Send the callback emails using your `.env` SMTP |
| `npm run seo:audit`  | Verify SEO on a running build (see below)       |

## Project structure

```
src/
  app/                 Routes (page.tsx = route, metadata lives here)
  components/
    pages/             Client-side page bodies for interactive routes
    sections/          Home page sections
    layouts/           Shared layouts (legal pages)
  lib/
    callback.ts        Server Action behind both callback forms
    email/             SMTP transport + email templates (server-only)
    site.ts            Site URL, default copy and public endpoints
public/                Images, videos and the brochure PDF
scripts/               One-off developer scripts
```

## SEO system

Every public page is registered in `src/lib/seo/pages.ts`. That registry
generates `sitemap.xml`, `llms.txt`, `llms-full.txt`, each page's metadata
(title, description, canonical, Open Graph) and its 1200×630 Open Graph image
(`/og/[slug]`). To add a page: add its content, register it there, and use
`pageMetadata(getPage(path))` in the route.

- **Content lives in `src/content/`**: features, comparison, FAQs, pricing
  plans, navigation and the verified US state data (`data/states.json`, with a
  source URL per fact). Pages and JSON-LD render from the same objects, so the
  FAQ schema always matches the visible text.
- **Structured data** (`src/lib/seo/schema.ts`): one `@graph` per page. The
  Organization, WebSite and SoftwareApplication nodes are emitted by the root
  layout and referenced by `@id` everywhere else. Never add ratings, reviews or
  other properties without real data.
- **Verification**: `npm run build && npm run start`, then `npm run seo:audit`
  checks every sitemap URL for status, title and description length and
  uniqueness, canonical, Open Graph, one H1 and heading order, JSON-LD validity
  and `@id` resolution, FAQ schema/text parity, internal links and OG images.

## Environment variables

Create a `.env` file (never committed). Only SMTP is required for the forms to
actually send email; without it, submissions still succeed and the server logs
that sending was skipped.

| Variable                   | Purpose                                                             |
| -------------------------- | ------------------------------------------------------------------- |
| `SMTP_HOST`, `SMTP_PORT`   | SMTP server, e.g. `smtp.gmail.com` / `587`                          |
| `SMTP_USER`, `SMTP_PASS`   | SMTP login (a Google App Password for Gmail)                        |
| `SMTP_SECURE`              | Optional. `true` for port 465; inferred from the port otherwise     |
| `SMTP_FROM`                | Optional. Visible From address                                      |
| `EMAIL_ADMIN`              | Where callback notifications go (default `solara@supermia.ai`)      |
| `SITE_URL`                 | Public origin used in email links and the email logo                |
| `EMAIL_LOGO_URL`           | Optional email logo override (PNG/JPG)                              |
| `NEXT_PUBLIC_API_BASE_URL` | Optional. Chatbot / voice-bot backend (defaults to production)      |
| `NEXT_PUBLIC_LIVEKIT_URL`  | Optional. LiveKit server for the voice bot (defaults to production) |

`NEXT_PUBLIC_*` values are inlined at build time, so redeploy after changing them.

## Deployment

Deployed on Vercel. `vercel.json` pins the framework preset to Next.js.
