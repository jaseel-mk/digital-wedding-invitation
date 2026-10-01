/*
# Remove meal_preference and dietary_requirements from rsvp_responses

1. Modified Tables
- `rsvp_responses` — remove `meal_preference` (text) and ` dietary_requirements` (text[]) columns.
  These fields are no longer collected by the RSVP form.

2. Security
- No changes to RLS policies. INSERT-only access for anon + authenticated remains.

3. Notes
- This uses `ALTER TABLE ... DROP COLUMN` which is a destructive DDL operation on the schema,
  but since these columns were only created in the previous migration and contain no user data
  (the table was just created), this is safe to do.
- The frontend no longer sends these fields.
*/

ALTER TABLE rsvp_responses
  DROP COLUMN IF EXISTS meal_preference,
  DROP COLUMN IF EXISTS dietary_requirements;
