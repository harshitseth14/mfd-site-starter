import type { Metadata } from "next";

import { BookingForm } from "@/components/booking-form";
import { site, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a free review",
  description: "Pick a time for a free 30-minute review: by phone, on video or in person. We read what you own and owe against your goals, and do the rest.",
  alternates: { canonical: "/book" },
};

const NEXT = [
  { title: "Leave your details", line: "Your name, mobile and email. We call you, usually the same day." },
  { title: "Pick a time, if you like", line: "A free 30-minute call: on the phone, on video, or in person." },
  { title: "We read it as a balance sheet", line: "Set against your goals: what is right, and what can be improved." },
  { title: "You get a written plan", line: "For the parts that can be better, and nothing more. You decide." },
] as const;

/** /book: the same booking as the homepage's last section, on its own page. */
export default function BookPage() {
  return (
    <section className="screen book" aria-labelledby="book-title">
      <div className="wrap end-g">
        <div className="end-words" data-reveal="">
          <p className="mono">Free review</p>
          <h1 id="book-title">
            Book a call. <em>We do the rest.</em>
          </h1>
          <ol className="next-steps">
            {NEXT.map((n, i) => (
              <li key={n.title}>
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <b>{n.title}</b>
                  <p>{n.line}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="book-reach">
            Rather talk now? Call {site.phones[0].display} or{" "}
            <a href={whatsappHref("Hello, I would like to book a call.")} target="_blank" rel="noopener noreferrer">
              WhatsApp us
            </a>
            . {site.afterHours}
          </p>
        </div>
        <BookingForm />
      </div>
    </section>
  );
}
