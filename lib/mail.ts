import "server-only";

import nodemailer from "nodemailer";

import { recipients } from "./recipients";
import { site } from "./site";

/**
 * Sends an email to our inbox, and to the extra addresses in LEAD_COPY_TO. Mail settings come from
 * the environment (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and optionally SMTP_FROM or EMAIL_FROM, and CONSULT_TO to
 * replace our inbox). Without them, as on a laptop, the email is printed to the server
 * log instead, so the forms can be tried safely. Returns "sent", or "logged" when it was only printed. Throws when the
 * mail server refuses it.
 */
export async function sendToUs(mail: { subject: string; text: string }): Promise<"sent" | "logged"> {
  const host = process.env.SMTP_HOST;
  if (!host) {
    console.info(`[website] No mail settings, so not emailed. It would have said:\n${mail.subject}\n${mail.text}`);
    return "logged";
  }
  const port = Number(process.env.SMTP_PORT ?? 465);
  // Time limits, so a slow or stuck mail server cannot keep a visitor waiting on "Sending…". The lead is
  // already saved by then, and one whose email fails is sent later with the next one.
  const transport = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
  await transport.sendMail({
    from: process.env.SMTP_FROM ?? process.env.EMAIL_FROM ?? process.env.SMTP_USER,
    to: recipients(process.env.CONSULT_TO ?? site.email, process.env.LEAD_COPY_TO),
    subject: mail.subject,
    text: mail.text,
  });
  return "sent";
}

/** Whether an email that was only printed to the log counts as delivered: on a laptop yes, on the live site no. */
export function loggedCounts(): boolean {
  return process.env.NODE_ENV !== "production";
}
