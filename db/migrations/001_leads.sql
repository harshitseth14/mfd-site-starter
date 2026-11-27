-- Every call-back request from the website, kept alongside the email we receive, so a lead is never lost.
-- Step one fills name, phone and email; step two (optional) adds the time they picked, how to talk and a note.
CREATE TABLE IF NOT EXISTS leads (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at      timestamptz NOT NULL DEFAULT now(),
  name            text NOT NULL,
  phone           text NOT NULL,
  email           text NOT NULL,
  topic           text,
  emailed_at      timestamptz,
  starts_at       timestamptz,
  mode            text,
  note            text,
  time_picked_at  timestamptz,
  time_emailed_at timestamptz
);

CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);
