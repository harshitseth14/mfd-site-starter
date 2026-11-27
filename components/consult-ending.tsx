import { BookingForm } from "@/components/booking-form";
import type { Topic } from "@/lib/consultation";
import { site, whatsappHref } from "@/lib/site";

type Phone = { display: string; tel: string };

/** The last screen of a page: how to reach us on the left, the call-back form on the right. */
export function ConsultEnding({
  label = "Free review",
  title,
  lede,
  phones = site.phones,
  topic,
  whatsappText = "Hello, I would like to know more about your services.",
}: {
  label?: string;
  title: readonly [string, string];
  lede: string;
  phones?: readonly Phone[];
  topic?: Topic;
  whatsappText?: string;
}) {
  return (
    <section className="screen ending" id="begin" aria-labelledby="begin-title">
      <div className="wrap end-g">
        <div className="end-words" data-reveal="">
          <p className="mono">{label}</p>
          <h2 id="begin-title">
            {title[0]}
            <em>{title[1]}</em>
          </h2>
          <p className="lede">{lede}</p>
          <div className="contact svc-contact">
            {phones.map((p) => (
              <a key={p.tel} href={`tel:${p.tel}`}>
                {p.display}
              </a>
            ))}
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a className="wa" href={whatsappHref(whatsappText)} target="_blank" rel="noopener noreferrer">
              Message us on WhatsApp →
            </a>
          </div>
          <p className="hours">
            {site.hours}
            <br />
            {site.afterHours}
          </p>
        </div>
        <BookingForm topic={topic} />
      </div>
    </section>
  );
}
