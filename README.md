# Digital wedding invitation

React, TypeScript and Vite invitation with a Supabase RSVP form.

## Local setup

Use Node 22, run npm ci, copy .env.example to .env.local and set the wedding project's URL and public anon/publishable key. Run npm run dev. No service-role key belongs in frontend variables.

## Netlify (recommended)

Import this GitHub repository, select main, and keep netlify.toml settings: build command npm run typecheck && npm run build, output dist. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Netlify build environment variables, then deploy. Netlify's URL supplies the absolute sharing-image URL automatically. For a custom domain, set VITE_SITE_URL to the full HTTPS site URL and rebuild. Environment changes require a fresh build.

## RSVP database

Apply the migrations under supabase/migrations to the wedding project's database after reviewing them. The second existing migration drops meal/dietary columns: do not apply it to an existing database containing values in those columns without preserving them. RSVP clients insert only; read/manage responses through the Supabase dashboard. Check INSERT grants for anon and authenticated as well as the insert policy.

Without configuration the invitation remains readable, but RSVP submission is disabled. Confirm a real RSVP arrives in rsvp_responses before distributing the invitation.

## GitHub Pages alternative

Set GITHUB_PAGES=true during npm run build to produce repository-relative asset paths. Set VITE_SITE_URL=https://jaseel-mk.github.io/digital-wedding-invitation/ plus the Supabase environment variables. Deploy dist through a Pages Actions workflow; raw source files cannot be hosted directly. Netlify does not need GITHUB_PAGES.

## Personalization

Edit src/weddingConfig.ts, index.html metadata and public/wedding-preview.png together when changing the couple or wedding. Countdown uses the configured wedding offset for a consistent instant worldwide. Fonts, photographs and videos use external HTTPS services.

## Checks

Run npm run typecheck and npm run build. Preview with npm run preview.

