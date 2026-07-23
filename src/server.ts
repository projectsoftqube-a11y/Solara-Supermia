import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

// Vite only loads VITE_-prefixed vars, and never into process.env — so
// server-side secrets (SMTP_*) in a local .env would otherwise be invisible.
// Dev only: in production the host supplies real environment variables, and
// this branch is tree-shaken away.
if (import.meta.env.DEV) {
  const dotenv = await import("dotenv");
  dotenv.config();

  // Surface email config status at startup — a missing app password otherwise
  // only shows up as a silently skipped send.
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (host && user && pass) {
    console.log(`[email] SMTP ready — ${user} via ${host}:${process.env.SMTP_PORT || 587}`);
  } else if (host || user) {
    console.warn(
      `[email] SMTP incomplete — missing ${["SMTP_HOST", "SMTP_USER", "SMTP_PASS"]
        .filter((k) => !process.env[k])
        .join(", ")}. Emails will be skipped until set in .env`,
    );
  }
}

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// Tell Vercel's CDN (and browsers) never to cache document responses so deploys
// always serve fresh HTML — eliminates the x-vercel-cache: HIT behavior.
function disableCaching(response: Response): Response {
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
  response.headers.set("CDN-Cache-Control", "no-store");
  response.headers.set("Vercel-CDN-Cache-Control", "no-store");
  return response;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!body.includes('"unhandled":true') || !body.includes('"message":"HTTPError"')) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return disableCaching(await normalizeCatastrophicSsrResponse(response));
    } catch (error) {
      console.error(error);
      return disableCaching(
        new Response(renderErrorPage(), {
          status: 500,
          headers: { "content-type": "text/html; charset=utf-8" },
        }),
      );
    }
  },
};
