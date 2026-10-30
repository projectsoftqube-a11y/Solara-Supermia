/**
 * Site-wide constants shared by metadata, layouts and server code.
 * Keep public URLs and default copy here so they are defined exactly once.
 */

export const SITE_URL = "https://solara.supermia.ai";

export const APP_URL = "https://app.solara.supermia.ai/";

export const SITE_NAME = "Solara";

export const DEFAULT_TITLE = "Solara - AI Front Office OS for Dental Practices";

export const DEFAULT_DESCRIPTION =
  "Solara is the AI front office operating system for dental practices. Insurance, calls, booking, intake, recall, notes, analytics — unified with OpenDental.";

export const DEFAULT_OG_IMAGE = "/images/logo.png";

export const CONTACT_EMAIL = "solara@supermia.ai";

/** Backend for the website chatbot (websocket) and voice-bot room tokens. */
export const BOT_API_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://solarasalesapi.supermia.ai";

export const LIVEKIT_URL =
  process.env.NEXT_PUBLIC_LIVEKIT_URL || "wss://test2-6qkwn1bd.livekit.cloud";

export const CONTACT_PHONE = "+1-512-733-3085";

export const CONTACT_PHONE_DISPLAY = "+1 (512) 733-3085";

/** Booking link used by the inline Calendly scheduler on /book-a-demo. */
export const CALENDLY_URL = "https://calendly.com/solara-supermia/30min";

export const BROCHURE_URL = "/brochure/solara-brochure.pdf";

/** Raster logo for structured data (search engines do not accept SVG logos). */
export const LOGO = { url: "/images/logo.png", width: 390, height: 123 } as const;

/** Parent brand, as credited in the footer. */
export const PARENT_ORGANIZATION = { name: "SuperMIA", url: "https://supermia.ai/" } as const;

/**
 * Verified social and directory profiles for Organization.sameAs. Leave empty
 * until real URLs are supplied; placeholders are filtered out regardless.
 */
export const SAME_AS: string[] = [];

/** Publication date of the inner pages added in the SEO build (YYYY-MM-DD). */
export const CONTENT_PUBLISHED = "2026-10-30";

/** Last substantive content update of those pages (YYYY-MM-DD). */
export const CONTENT_UPDATED = "2026-10-30";
