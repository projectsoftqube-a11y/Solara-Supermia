/**
 * Premium HTML email templates for the callback request flow.
 *
 * Email-client constraints these templates deliberately respect:
 *  - Table-based layout (Outlook ignores modern CSS layout)
 *  - Inline styles only (Gmail strips <style> in some contexts)
 *  - No SVG (Gmail/Outlook will not render it) — logo must be PNG/JPG
 *  - 600px max width, and a plain-text alternative for deliverability
 */

export type CallbackSubmission = {
  name: string;
  email: string;
  /** E.164, e.g. +12125550123 */
  phone: string;
  /** As the user typed it, e.g. (212) 555-0123 */
  phoneDisplay: string;
  phoneCountry: string;
  /** YYYY-MM-DD */
  date: string;
  /** e.g. "Thursday, July 23, 2026" */
  dateLabel: string;
  /** e.g. "8 – 9 AM" */
  time: string;
  timezone: string;
  submittedAt: string;
};

const BRAND = {
  primary: "#FF6A55",
  primaryDark: "#E55A45",
  amber: "#FFB23E",
  teal: "#16C4B3",
  ink: "#0F172A",
  body: "#4B5563",
  muted: "#6B7280",
  border: "#E7E1D8",
  canvas: "#FAF8F4",
  card: "#FFFFFF",
};

const FONT =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif";

export const SITE_URL = process.env.SITE_URL || "https://solara.supermia.ai";
/**
 * Must be a PNG/JPG on a public URL — SVG will not render in email clients.
 * This is the dark-wordmark logo, so the header below is light.
 */
const LOGO_URL = process.env.EMAIL_LOGO_URL || `${SITE_URL}/images/logo.png`;
const SUPPORT_EMAIL = process.env.EMAIL_ADMIN || "solara@supermia.ai";
const SUPPORT_PHONE = "+1 (512) 733-3085";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Logo image when a PNG URL is configured, otherwise a styled wordmark. */
function logoBlock() {
  if (LOGO_URL) {
    // 390x123 source shown at 150px wide — 2.6x, so it stays sharp on retina.
    return `<img src="${LOGO_URL}" width="150" height="47" alt="Solara" style="display:block;border:0;outline:none;text-decoration:none;width:150px;height:47px;" />`;
  }
  return `<span style="font-family:${FONT};font-size:26px;font-weight:800;letter-spacing:2px;color:${BRAND.ink};">SOLARA</span>`;
}

/** Shared chrome: preheader, header bar, card, footer. */
function shell({
  preheader,
  accent,
  eyebrow,
  content,
}: {
  preheader: string;
  accent: string;
  eyebrow: string;
  content: string;
}) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="x-apple-disable-message-reformatting" />
<title>Solara</title>
</head>
<body style="margin:0;padding:0;background-color:${BRAND.canvas};">
  <!-- preview text shown in the inbox list, hidden in the body -->
  <div style="display:none;font-size:1px;color:${BRAND.canvas};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
    ${escapeHtml(preheader)}
  </div>

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${BRAND.canvas};">
    <tr>
      <td align="center" style="padding:32px 16px;">

        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px;max-width:600px;">

          <!-- Header — light, because the logo has a dark wordmark -->
          <tr>
            <td align="center" style="background-color:#FFFFFF;border-radius:20px 20px 0 0;border-bottom:1px solid ${BRAND.border};padding:30px 32px 26px 32px;">
              ${logoBlock()}
              <div style="height:14px;line-height:14px;">&nbsp;</div>
              <span style="font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${accent};">
                ${escapeHtml(eyebrow)}
              </span>
            </td>
          </tr>

          <!-- Accent rule -->
          <tr><td style="font-size:0;line-height:0;height:4px;background-color:${accent};">&nbsp;</td></tr>

          <!-- Body -->
          <tr>
            <td style="background-color:${BRAND.card};padding:36px 32px 32px 32px;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:${BRAND.card};border-radius:0 0 20px 20px;border-top:1px solid ${BRAND.border};padding:24px 32px 28px 32px;">
              <p style="margin:0 0 6px 0;font-family:${FONT};font-size:13px;line-height:20px;color:${BRAND.muted};">
                <a href="mailto:${SUPPORT_EMAIL}" style="color:${BRAND.primary};text-decoration:none;font-weight:600;">${SUPPORT_EMAIL}</a>
                &nbsp;·&nbsp; ${SUPPORT_PHONE}
              </p>
              <p style="margin:0;font-family:${FONT};font-size:12px;line-height:18px;color:${BRAND.muted};">
                Solara — the AI front office for dental practices.<br />
                <a href="${SITE_URL}" style="color:${BRAND.muted};text-decoration:underline;">${SITE_URL.replace(/^https?:\/\//, "")}</a>
              </p>
            </td>
          </tr>

        </table>

        <div style="height:24px;line-height:24px;">&nbsp;</div>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** A label/value row inside the details card. */
function detailRow(label: string, value: string, isLast = false) {
  return `<tr>
    <td style="padding:12px 0;${isLast ? "" : `border-bottom:1px solid ${BRAND.border};`}">
      <span style="font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${BRAND.muted};">${escapeHtml(label)}</span><br />
      <span style="font-family:${FONT};font-size:15px;font-weight:600;color:${BRAND.ink};line-height:22px;">${value}</span>
    </td>
  </tr>`;
}

function detailsCard(rows: string) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${BRAND.canvas};border:1px solid ${BRAND.border};border-radius:14px;">
    <tr><td style="padding:6px 20px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">${rows}</table>
    </td></tr>
  </table>`;
}

function button(href: string, label: string) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" bgcolor="${BRAND.primary}" style="border-radius:12px;">
        <a href="${href}" style="display:inline-block;padding:14px 30px;font-family:${FONT};font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:12px;">
          ${escapeHtml(label)}
        </a>
      </td>
    </tr>
  </table>`;
}

/* ────────────────────────────────────────────────────────────
   1. Confirmation sent to the person who filled in the form
   ──────────────────────────────────────────────────────────── */

export function userConfirmationEmail(s: CallbackSubmission) {
  const firstName = s.name.trim().split(/\s+/)[0] || "there";

  const when = s.dateLabel
    ? `${escapeHtml(s.dateLabel)}${s.time ? `<br /><span style="color:${BRAND.body};font-weight:500;">${escapeHtml(s.time)} (${escapeHtml(s.timezone)})</span>` : ""}`
    : s.time
      ? `${escapeHtml(s.time)} (${escapeHtml(s.timezone)})`
      : "We'll reach out shortly";

  const steps = [
    "We review your callback request",
    "A Solara specialist calls you at your chosen time",
    "We discuss your practice's needs",
    "You get a personalised next step — no pressure",
  ]
    .map(
      (step, i) => `<tr>
        <td width="30" valign="top" style="padding:6px 0;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr><td width="22" height="22" align="center" valign="middle" bgcolor="${BRAND.canvas}" style="border-radius:11px;font-family:${FONT};font-size:11px;font-weight:700;color:${BRAND.primary};">${i + 1}</td></tr>
          </table>
        </td>
        <td valign="middle" style="padding:6px 0;font-family:${FONT};font-size:14px;line-height:22px;color:${BRAND.body};">${escapeHtml(step)}</td>
      </tr>`,
    )
    .join("");

  const content = `
    <h1 style="margin:0 0 14px 0;font-family:${FONT};font-size:28px;line-height:34px;font-weight:800;color:${BRAND.ink};">
      Thanks for reaching out, ${escapeHtml(firstName)}!
    </h1>

    <p style="margin:0 0 24px 0;font-family:${FONT};font-size:16px;line-height:26px;color:${BRAND.body};">
      We've got your callback request and a Solara specialist will be in touch. We're looking
      forward to showing you how much of your front office can simply run itself.
    </p>

    ${detailsCard(
      [
        detailRow("When we'll call", when),
        detailRow("Calling you on", `${escapeHtml(s.phoneDisplay)} <span style="color:${BRAND.muted};font-weight:500;">(${escapeHtml(s.phone)})</span>`),
        detailRow("Confirmation sent to", escapeHtml(s.email), true),
      ].join(""),
    )}

    <div style="height:28px;line-height:28px;">&nbsp;</div>

    <p style="margin:0 0 12px 0;font-family:${FONT};font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${BRAND.ink};">
      What happens next
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">${steps}</table>

    <div style="height:30px;line-height:30px;">&nbsp;</div>

    ${button(SITE_URL, "Explore what Solara does")}

    <div style="height:26px;line-height:26px;">&nbsp;</div>

    <p style="margin:0;font-family:${FONT};font-size:14px;line-height:22px;color:${BRAND.muted};">
      Need to change your time or reach us sooner? Just reply to this email — it comes straight
      to our team.
    </p>
  `;

  const text = [
    `Thanks for reaching out, ${s.name || "there"}!`,
    ``,
    `We've got your callback request and a Solara specialist will be in touch.`,
    ``,
    `When we'll call: ${s.dateLabel || "TBC"}${s.time ? ` at ${s.time} (${s.timezone})` : ""}`,
    `Calling you on: ${s.phoneDisplay} (${s.phone})`,
    `Confirmation sent to: ${s.email}`,
    ``,
    `What happens next:`,
    `  1. We review your callback request`,
    `  2. A Solara specialist calls you at your chosen time`,
    `  3. We discuss your practice's needs`,
    `  4. You get a personalised next step — no pressure`,
    ``,
    `Questions? Reply to this email or call ${SUPPORT_PHONE}.`,
    `${SITE_URL}`,
  ].join("\n");

  return {
    subject: "Thanks for reaching out — your Solara callback is confirmed",
    html: shell({
      preheader: `We'll call you${s.dateLabel ? ` on ${s.dateLabel}` : ""}${s.time ? ` at ${s.time} ${s.timezone}` : " shortly"}.`,
      accent: BRAND.primary,
      eyebrow: "Callback confirmed",
      content,
    }),
    text,
  };
}

/* ────────────────────────────────────────────────────────────
   2. Notification sent to the Solara team
   ──────────────────────────────────────────────────────────── */

export function adminNotificationEmail(s: CallbackSubmission) {
  const content = `
    <h1 style="margin:0 0 8px 0;font-family:${FONT};font-size:24px;line-height:30px;font-weight:800;color:${BRAND.ink};">
      New callback request
    </h1>
    <p style="margin:0 0 24px 0;font-family:${FONT};font-size:15px;line-height:24px;color:${BRAND.body};">
      <strong style="color:${BRAND.ink};">${escapeHtml(s.name)}</strong> asked for a call back.
      Details below.
    </p>

    ${detailsCard(
      [
        detailRow("Name", escapeHtml(s.name)),
        detailRow(
          "Email",
          s.email
            ? `<a href="mailto:${escapeHtml(s.email)}" style="color:${BRAND.primary};text-decoration:none;">${escapeHtml(s.email)}</a>`
            : `<span style="color:${BRAND.muted};font-weight:500;">Not provided — phone only</span>`,
        ),
        detailRow(
          "Phone",
          `<a href="tel:${escapeHtml(s.phone)}" style="color:${BRAND.primary};text-decoration:none;">${escapeHtml(s.phoneDisplay)}</a>
           <span style="color:${BRAND.muted};font-weight:500;">· ${escapeHtml(s.phone)} · ${escapeHtml(s.phoneCountry)}</span>`,
        ),
        detailRow("Preferred date", escapeHtml(s.dateLabel || "Not specified")),
        detailRow(
          "Preferred window",
          `${escapeHtml(s.time || "Not specified")} <span style="color:${BRAND.muted};font-weight:500;">(${escapeHtml(s.timezone)})</span>`,
        ),
        detailRow("Submitted", escapeHtml(s.submittedAt), true),
      ].join(""),
    )}

    <div style="height:28px;line-height:28px;">&nbsp;</div>

    ${button(`tel:${s.phone}`, `Call ${s.phoneDisplay}`)}

    <div style="height:20px;line-height:20px;">&nbsp;</div>

    <p style="margin:0;font-family:${FONT};font-size:13px;line-height:20px;color:${BRAND.muted};">
      ${
        s.email
          ? `Reply directly to this email to reach ${escapeHtml(s.name)} — the reply-to is set to their address.`
          : `No email address was given, so this lead is phone-only — no confirmation email was sent to them.`
      }
    </p>
  `;

  const text = [
    `NEW CALLBACK REQUEST`,
    ``,
    `Name:             ${s.name}`,
    `Email:            ${s.email || "Not provided — phone only"}`,
    `Phone:            ${s.phoneDisplay} (${s.phone}, ${s.phoneCountry})`,
    `Preferred date:   ${s.dateLabel || "Not specified"}`,
    `Preferred window: ${s.time || "Not specified"} (${s.timezone})`,
    `Submitted:        ${s.submittedAt}`,
  ].join("\n");

  return {
    subject: `New callback request — ${s.name}${s.time ? ` (${s.time} ET)` : ""}`,
    html: shell({
      preheader: `${s.name} · ${s.phoneDisplay} · ${s.dateLabel || "no date"} ${s.time || ""}`,
      accent: BRAND.teal,
      eyebrow: "Admin notification",
      content,
    }),
    text,
  };
}
