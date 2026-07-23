/**
 * Sends the real callback emails using your .env SMTP settings.
 *
 *   npm run email:test              -> sends both to EMAIL_ADMIN
 *   npm run email:test you@mail.com -> sends the confirmation to you instead
 *
 * Faster than submitting the form when you are debugging SMTP.
 */
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createRequire } from "node:module";
import "dotenv/config";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const nodemailer = require("nodemailer");

// Compile the shared templates so this script and the app stay in sync.
const tmp = mkdtempSync(join(tmpdir(), "solara-email-"));
const templatesJs = ts.transpileModule(readFileSync("src/lib/email/templates.ts", "utf8"), {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
}).outputText;
const templatesPath = join(tmp, "templates.mjs");
writeFileSync(templatesPath, templatesJs);
const { userConfirmationEmail, adminNotificationEmail } = await import(
  `file:///${templatesPath.replace(/\\/g, "/")}`
);

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, EMAIL_ADMIN } = process.env;

const missing = ["SMTP_HOST", "SMTP_USER", "SMTP_PASS"].filter((k) => !process.env[k]);
if (missing.length) {
  console.error(`\n  Missing in .env: ${missing.join(", ")}`);
  console.error("  Add your Gmail App Password to SMTP_PASS and re-run.\n");
  process.exit(1);
}

const admin = EMAIL_ADMIN || "solara@supermia.ai";
const recipient = process.argv[2] || admin;
const port = Number(SMTP_PORT || 587);

console.log(`\n  SMTP  : ${SMTP_USER}@${SMTP_HOST}:${port}`);
console.log(`  Sends : confirmation -> ${recipient}`);
console.log(`          admin copy   -> ${admin}\n`);

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port,
  secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

try {
  await transporter.verify();
  console.log("  [1/3] SMTP connection + credentials OK");
} catch (err) {
  console.error("\n  SMTP verification FAILED:", err.message);
  if (/Invalid login|535|BadCredentials/i.test(err.message)) {
    console.error(
      "\n  Gmail rejected the login. Check that:\n" +
        "    - 2-Step Verification is ON for this account\n" +
        "    - SMTP_PASS is the 16-char App Password with spaces removed\n" +
        "    - SMTP_USER is the full address (solara@supermia.ai)\n",
    );
  }
  process.exit(1);
}

const sample = {
  name: "Jane Cooper",
  email: recipient,
  phone: "+12125550123",
  phoneDisplay: "(212) 555-0123",
  phoneCountry: "US",
  date: "2026-07-24",
  dateLabel: "Friday, July 24, 2026",
  time: "8 – 9 AM",
  timezone: "America/New_York",
  submittedAt: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
};

const from = SMTP_FROM || `Solara <${SMTP_USER}>`;
const user = userConfirmationEmail(sample);
const adminMail = adminNotificationEmail(sample);

const r1 = await transporter.sendMail({
  from,
  to: recipient,
  subject: `[TEST] ${user.subject}`,
  html: user.html,
  text: user.text,
  replyTo: admin,
});
console.log(`  [2/3] Confirmation sent  (${r1.messageId})`);

const r2 = await transporter.sendMail({
  from,
  to: admin,
  subject: `[TEST] ${adminMail.subject}`,
  html: adminMail.html,
  text: adminMail.text,
  replyTo: recipient,
});
console.log(`  [3/3] Admin notification sent  (${r2.messageId})`);

console.log("\n  Done — check the inbox (and the spam folder).\n");
