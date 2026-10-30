import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { ogSlug, pathFromOgSlug } from "@/lib/seo/og";
import { hasPage, getPage, pages } from "@/lib/seo/pages";

/** One prerendered 1200×630 Open Graph card per registered page. */
export function generateStaticParams() {
  return pages.map((page) => ({ slug: ogSlug(page.path) }));
}

const asset = (file: string) => readFile(join(process.cwd(), "src/assets", file));

/** Fonts and logo, read once and cached so every card can be prerendered. */
async function loadAssets() {
  "use cache";
  const [bold, semibold, logo] = await Promise.all([
    asset("fonts/montserrat-latin-800-normal.woff"),
    asset("fonts/montserrat-latin-600-normal.woff"),
    asset("solara-mark.png"),
  ]);
  // Cached values are serialized, so pass the binaries through as base64.
  return {
    bold: bold.toString("base64"),
    semibold: semibold.toString("base64"),
    logo: `data:image/png;base64,${logo.toString("base64")}`,
  };
}

/** base64 → a standalone ArrayBuffer, which is what ImageResponse expects. */
function toArrayBuffer(base64: string): ArrayBuffer {
  const bytes = Buffer.from(base64, "base64");
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
}

export async function GET(_request: Request, { params }: RouteContext<"/og/[slug]">) {
  const { slug } = await params;
  const path = pathFromOgSlug(slug);
  if (!hasPage(path)) return new Response("Not found", { status: 404 });

  const page = getPage(path);
  const title = page.title.replace(/\s*\|\s*Solara$/, "");

  const assets = await loadAssets();
  const bold = toArrayBuffer(assets.bold);
  const semibold = toArrayBuffer(assets.semibold);
  const logo = assets.logo;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: "#FAF8F4",
        backgroundImage:
          "radial-gradient(circle at 0% 0%, rgba(255,178,62,0.35), transparent 45%), radial-gradient(circle at 100% 10%, rgba(255,106,85,0.25), transparent 40%), radial-gradient(circle at 85% 100%, rgba(22,196,179,0.18), transparent 40%)",
        fontFamily: "Montserrat",
        color: "#0F172A",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
        <img src={logo} width={64} height={52} alt="" />
        <span style={{ fontSize: 34, fontWeight: 800, letterSpacing: -1 }}>Solara</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <span
          style={{
            display: "flex",
            alignSelf: "flex-start",
            padding: "10px 20px",
            borderRadius: 999,
            background: "#FFF0EB",
            border: "2px solid rgba(255,106,85,0.25)",
            color: "#E5503C",
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {page.label}
        </span>
        <span
          style={{
            fontSize: title.length > 48 ? 58 : 68,
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: -2,
            maxWidth: 1000,
          }}
        >
          {title}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 24,
          fontWeight: 600,
          color: "#475569",
        }}
      >
        <span>AI front office for dental practices</span>
        <span style={{ color: "#E5503C" }}>solara.supermia.ai</span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Montserrat", data: bold, weight: 800, style: "normal" },
        { name: "Montserrat", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}
