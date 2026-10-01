/*
# Create rsvp_responses table for wedding RSVP submissions

1. New Tables
- `rsvp_responses`
  - `id` (uuid, primary key)
  - `full_name` (text, not null) — guest's full name
  - `email` (text, nullable) — guest's email address
  - `attending` (text, not null) — "accept" or "decline"
  - `meal_preference` (text, nullable) — selected meal option
  - `dietary_requirements` (text array, nullable) — selected dietary requirements
  - `message` (text, nullable) — optional message for the couple
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `rsvp_responses`.
- This is a no-auth public wedding invitation site, so anon + authenticated can INSERT.
- No SELECT/UPDATE/DELETE for anon or authenticated — responses are write-only from the frontend.
- The wedding couple can view responses via the Supabase dashboard (service role bypasses RLS).

3. Notes
- Only INSERT is allowed from the frontend to prevent guests from reading or modifying other guests' responses.
- Email is nullable since declining guests may not provide one.
- dietary_requirements stored as an array of strings for flexible multi-select.
*/

CREATE TABLE IF NOT EXISTS rsvp_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text,
  attending text NOT NULL CHECK (attending IN ('accept', 'decline')),
  meal_preference text,
  dietary_requirements text[],
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE rsvp_responses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_rsvp" ON rsvp_responses;
CREATE POLICY "anon_insert_rsvp"
ON rsvp_responses FOR INSERT
TO anon, authenticated
WITH CHECK (true);
