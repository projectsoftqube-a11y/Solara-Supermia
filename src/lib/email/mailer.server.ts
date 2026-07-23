/**
 * SMTP transport. Server-only — the `.server.ts` suffix plus the dynamic
 * nodemailer import keep it out of the client bundle.
 *
 * Requires a Node runtime. Cloudflare Workers cannot open raw TCP sockets,
 * so SMTP will not work there — see README notes in this folder.
 */

export type MailMessage = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
};

export function readSmtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  const port = Number(process.env.SMTP_PORT || 587);

  return {
    host,
    port,
    // 465 is implicit TLS; 587/25 upgrade via STARTTLS.
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
    user,
    pass,
    from: process.env.SMTP_FROM || `Solara <${user}>`,
  };
}

export async function sendMail(message: MailMessage): Promise<void> {
  const config = readSmtpConfig();

  if (!config) {
    // Nothing configured yet — log so local development still shows the result
    // instead of throwing and failing the user's submission.
    console.warn(
      "[email] SMTP is not configured (SMTP_HOST / SMTP_USER / SMTP_PASS missing). " +
        `Skipped sending "${message.subject}" to ${message.to}.`,
    );
    return;
  }

  const nodemailer = (await import("nodemailer")).default;

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.pass },
  });

  await transporter.sendMail({
    from: config.from,
    to: message.to,
    subject: message.subject,
    html: message.html,
    text: message.text,
    replyTo: message.replyTo,
  });
}
