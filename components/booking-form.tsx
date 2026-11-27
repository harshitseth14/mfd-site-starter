"use client";

import Link from "next/link";

import { useActionState, useEffect, useMemo, useState } from "react";

import { pickCallTime, requestCallBack } from "@/app/actions";
import { bookingDays, googleCalendarHref, HOURS, MODES, slotLabel, type BookingDay, type Mode } from "@/lib/booking";
import { modeTitle, type LeadState, type ScheduleState, type Topic } from "@/lib/consultation";
import { site } from "@/lib/site";

const PARTS = ["Morning", "Afternoon", "Evening"] as const;

/**
 * The free review, lead first. Step one: a name and a mobile number, emailed to us at once.
 * Step two, optional: a day, a time and how to talk. Skipping it is fine; we call them anyway.
 */
export function BookingForm({ topic }: { topic?: Topic } = {}) {
  const [lead, leadAction, sendingLead] = useActionState(requestCallBack, { status: "idle" } as LeadState);

  if (lead.status === "received") return <PickTime name={lead.name} phone={lead.phone} email={lead.email} topic={lead.topic} leadId={lead.lead} />;

  const values = lead.status === "invalid" || lead.status === "failed" ? lead.values : {};
  const errors = lead.status === "invalid" ? lead.errors : {};
  const key = lead.status === "idle" ? "start" : JSON.stringify(values);

  return (
    <form className="form booking" action={leadAction} key={key} noValidate>
      <div className="booking-head">
        <h3>Request a call back</h3>
        <p className="small-note">Your name, number and email. We call you, there is no fee.</p>
      </div>
      <div className="f2">
        <label htmlFor="b-name">
          Your name
          <input id="b-name" name="name" defaultValue={values.name ?? ""} autoComplete="name" required aria-invalid={errors.name ? true : undefined} aria-describedby={errors.name ? "b-name-err" : undefined} />
          {errors.name ? <span className="err" id="b-name-err">{errors.name}</span> : null}
        </label>
        <label htmlFor="b-phone">
          Mobile
          <input id="b-phone" name="phone" type="tel" defaultValue={values.phone ?? ""} autoComplete="tel" inputMode="tel" required aria-invalid={errors.phone ? true : undefined} aria-describedby={errors.phone ? "b-phone-err" : undefined} />
          {errors.phone ? <span className="err" id="b-phone-err">{errors.phone}</span> : null}
        </label>
      </div>
      <label htmlFor="b-email">
        Email
        <input id="b-email" name="email" type="email" defaultValue={values.email ?? ""} autoComplete="email" required aria-invalid={errors.email ? true : undefined} aria-describedby={errors.email ? "b-email-err" : undefined} />
        {errors.email ? <span className="err" id="b-email-err">{errors.email}</span> : null}
      </label>
      {topic ? <input type="hidden" name="topic" value={topic} /> : null}
      {/* A trap for bots. Not called "company" or anything autofill knows: browsers filled that in for real
          visitors with a saved company name, and their requests were silently dropped. */}
      <div className="trap" aria-hidden="true">
        <label htmlFor="b-hp">
          Leave this empty
          <input id="b-hp" name="b_hp" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <button className="btn" type="submit" disabled={sendingLead}>
        <span>{sendingLead ? "Sending…" : "Call me back"}</span>
        <span aria-hidden="true">→</span>
      </button>
      {lead.status === "failed" ? (
        <p className="err" role="alert">
          That did not go through. Please try again, or call {site.phones[0].display}.
        </p>
      ) : null}
      <p className="small-note">Next, if you like, you can pick a time that suits you.</p>
      <p className="small-note consent">
        We use your details only to get back to you, and never share or sell them. <Link href="/privacy">Privacy notice</Link>
      </p>
    </form>
  );
}

/** Step two: optional. A day, a time and how to talk; or skip and we call anyway. */
function PickTime({ name, phone, email, topic, leadId }: { name: string; phone: string; email: string; topic?: Topic; leadId?: string }) {
  const [state, action, pending] = useActionState(pickCallTime, { status: "idle" } as ScheduleState);
  const [days, setDays] = useState<BookingDay[] | null>(null);
  const [dayIndex, setDayIndex] = useState(0);
  const [startsAt, setStartsAt] = useState("");
  const [mode, setMode] = useState<Mode>("PHONE");
  const [skipped, setSkipped] = useState(false);
  const first = name.split(" ")[0];

  // Times depend on the moment the page is open, so they are worked out in the browser.
  useEffect(() => {
    const tick = () => setDays(bookingDays(HOURS, new Date()));
    tick();
    const id = window.setInterval(tick, 5 * 60_000);
    return () => window.clearInterval(id);
  }, []);

  const day = days?.[dayIndex];
  const byPart = useMemo(() => PARTS.map((p) => ({ part: p, slots: day?.slots.filter((s) => s.part === p) ?? [] })).filter((g) => g.slots.length > 0), [day]);

  if (state.status === "booked") {
    const details = `${modeTitle(state.mode)} with ${site.name}. ${site.phones[0].display}`;
    return (
      <div className="form booking done" role="status">
        <p className="mono">Booked</p>
        <h3>{slotLabel(state.startsAt)}</h3>
        <p>
          Thank you, {first}.{" "}
          {state.mode === "PHONE"
            ? `We will call you on ${phone} at that time.`
            : state.mode === "VIDEO"
              ? "We will WhatsApp you a video link before the call."
              : "We will WhatsApp you to confirm where to meet."}
        </p>
        <div className="done-actions">
          <a className="btn" href={googleCalendarHref(state.startsAt, HOURS.slotMinutes, `Free review with ${site.name}`, details)} target="_blank" rel="noopener noreferrer">
            <span>Add to Google Calendar</span>
            <span aria-hidden="true">→</span>
          </a>
          <p className="small-note">Need to change it? Call or WhatsApp us on {site.phones[0].display}.</p>
        </div>
      </div>
    );
  }

  if (skipped) {
    return (
      <div className="form booking done" role="status">
        <p className="mono">Received</p>
        <h3>Thank you, {first}.</h3>
        <p>We will call you on {phone}, usually the same day. If it is urgent, call {site.phones[0].display}.</p>
      </div>
    );
  }

  return (
    <form className="form booking" action={action} noValidate>
      <div className="booking-head">
        <h3>Thank you, {first}. We have your details.</h3>
        <p className="small-note">Would you like to pick a time? It is optional. Times are Indian Standard Time.</p>
      </div>
      <input type="hidden" name="name" value={name} />
      <input type="hidden" name="phone" value={phone} />
      <input type="hidden" name="email" value={email} />
      {topic ? <input type="hidden" name="topic" value={topic} /> : null}
      {leadId ? <input type="hidden" name="lead" value={leadId} /> : null}
      <input type="hidden" name="startsAt" value={startsAt} />
      <input type="hidden" name="mode" value={mode} />

      <div className="step">
        <fieldset>
          <legend className="mono">Pick a day</legend>
          <div className="days" role="radiogroup" aria-label="Day">
            {days === null
              ? Array.from({ length: 7 }, (_, i) => <span key={i} className="day skeleton" aria-hidden="true" />)
              : days.map((d, i) => (
                  <button
                    type="button"
                    key={d.date}
                    role="radio"
                    aria-checked={i === dayIndex}
                    className="day"
                    onClick={() => {
                      setDayIndex(i);
                      setStartsAt("");
                    }}
                  >
                    <span>{isToday(d.date) ? "Today" : d.weekday}</span>
                    <b>{d.short}</b>
                  </button>
                ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mono">Pick a time{day ? `, ${day.long}` : ""}</legend>
          <div className="times">
            {byPart.map((g) => (
              <div key={g.part} className="part">
                <span className="part-name">{g.part}</span>
                <div className="chips">
                  {g.slots.map((s) => (
                    <button type="button" key={s.startsAt} className="chip" aria-pressed={s.startsAt === startsAt} onClick={() => setStartsAt(s.startsAt)}>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {state.status === "invalid" && state.errors.startsAt ? <span className="err">{state.errors.startsAt}</span> : null}
        </fieldset>

        <fieldset>
          <legend className="mono">How would you like to talk?</legend>
          <div className="modes" role="radiogroup" aria-label="How to talk">
            {MODES.map((m) => (
              <button type="button" key={m.key} role="radio" aria-checked={mode === m.key} className="mode" onClick={() => setMode(m.key)} title={m.line}>
                {m.title}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="pick-actions">
          <button className="btn" type="submit" disabled={pending || !startsAt}>
            <span>{pending ? "Booking…" : startsAt ? `Book ${slotLabel(startsAt).split(", ")[1]}` : "Pick a time above"}</span>
            <span aria-hidden="true">→</span>
          </button>
          <button type="button" className="cta-line skip-link" onClick={() => setSkipped(true)}>
            No need, just call me
          </button>
        </div>
        {state.status === "failed" ? (
          <p className="err" role="alert">
            That did not go through. We still have your number and will call you.
          </p>
        ) : null}
      </div>
    </form>
  );
}

function isToday(date: string): boolean {
  return date === new Date(Date.now() + 330 * 60_000).toISOString().slice(0, 10);
}
