import { createServerFn } from "@tanstack/react-start";

export type CallbackRequestInput = {
  name: string;
  /** Empty on /schedule-call, which does not ask for an email. */
  email: string;
  /** E.164, e.g. +12125550123 */
  phone: string;
  /** As displayed, e.g. (212) 555-0123 */
  phoneDisplay: string;
  phoneCountry: string;
  /** YYYY-MM-DD, US Eastern */
  date: string;
  /** e.g. "8 – 9 AM" */
  time: string;
  timezone: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Server-side re-validation — never trust what the browser sends. */
function validate(input: CallbackRequestInput) {
  const problems: string[] = [];
  if (!input.name?.trim()) problems.push("name");
  // Email is optional (the /schedule-call form omits it), but must be valid
  // when supplied — otherwise the confirmation would bounce.
  if (input.email?.trim() && !EMAIL_PATTERN.test(input.email.trim())) problems.push("email");
  if (!input.phone?.replace(/\D/g, "")) problems.push("phone");
  return problems;
}

function prettyDate(iso: string) {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export const submitCallbackRequest = createServerFn({ method: "POST" })
  .validator((data: CallbackRequestInput) => data)
  .handler(async ({ data }) => {
    const problems = validate(data);
    if (problems.length) {
      return { ok: false as const, error: `Invalid fields: ${problems.join(", ")}` };
    }

    // Imported lazily so nodemailer never reaches the client bundle.
    const { sendMail } = await import("./email/mailer.server");
    const { userConfirmationEmail, adminNotificationEmail } = await import("./email/templates");

    const submission = {
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone,
      phoneDisplay: data.phoneDisplay,
      phoneCountry: data.phoneCountry,
      date: data.date,
      dateLabel: prettyDate(data.date),
      time: data.time,
      timezone: data.timezone,
      submittedAt: new Date().toLocaleString("en-US", {
        timeZone: "America/New_York",
        dateStyle: "medium",
        timeStyle: "short",
      }),
    };

    const adminAddress = process.env.EMAIL_ADMIN || "solara@supermia.ai";
    const forAdmin = adminNotificationEmail(submission);

    const sends: Promise<void>[] = [
      sendMail({
        to: adminAddress,
        subject: forAdmin.subject,
        html: forAdmin.html,
        text: forAdmin.text,
        replyTo: submission.email || undefined,
      }),
    ];

    // No email address means no confirmation to send — the /schedule-call form
    // only collects a phone number.
    if (submission.email) {
      const forUser = userConfirmationEmail(submission);
      sends.push(
        sendMail({
          to: submission.email,
          subject: forUser.subject,
          html: forUser.html,
          text: forUser.text,
          replyTo: adminAddress,
        }),
      );
    }

    // Settled, not all: the visitor should still get a success screen even if
    // the confirmation copy bounces.
    const [adminResult, userResult] = await Promise.allSettled(sends);

    if (adminResult.status === "rejected") {
      console.error("[email] admin notification failed:", adminResult.reason);
      return { ok: false as const, error: "We couldn't submit your request. Please try again." };
    }
    if (userResult?.status === "rejected") {
      console.error("[email] confirmation failed:", userResult.reason);
    }

    return { ok: true as const };
  });
