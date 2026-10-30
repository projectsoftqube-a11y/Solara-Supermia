<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project notes

- Next.js 16 App Router with **Cache Components** enabled. Every route is
  prerendered; reading the clock, `searchParams` or cookies during render needs
  a `<Suspense>` boundary or a client-side hook (see `src/lib/use-current-year.ts`
  and `BookingConfirmedPage`).
- Run `npm run check` (typecheck + lint + Prettier) and `npm run build` before
  committing. Both must pass.
- Avoid rewriting published git history (force pushing, or amending/rebasing
  pushed commits).
