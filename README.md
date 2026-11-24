# Viralaty

Viralaty is an AI creator and marketing platform. This repository is the public website for that product: a Next.js marketing site for a done-for-you AI ads practice, with lead capture, email notification, and a small admin console.

The site copy (metadata, homepage, and structured data) presents Viralaty as a ChatGPT ads agency at [viralaty.com](https://viralaty.com). This codebase does not contain a creator studio, ad-account integrations, or campaign automation.

## Stack

- [Next.js](https://nextjs.org) 15 (App Router) and React 19
- TypeScript
- Tailwind CSS
- [Supabase](https://supabase.com): Postgres, Auth, Row Level Security, and one Edge Function
- Recharts, used on the admin analytics page
- Vercel config in `vercel.json`

The dev server listens on port **4028**.

## What is implemented

Checked against the current source.

### Marketing site

- Homepage sections: hero, opportunity, services, how it works, audience, process, case study, track record, why us, pricing, FAQ, and a closing CTA (`src/app/page.tsx` and `src/components/*Section.tsx`).
- Standalone pages: `/services`, `/about`, `/faq`, `/what-are-ai-ads`, `/guides`, `/free-tools`, `/privacy`, `/terms`, and a custom 404.
- Light and dark theme, stored in `localStorage` (`ThemeProvider`).
- SEO: per-page metadata, Open Graph and Twitter tags, `src/app/sitemap.ts`, `src/app/robots.ts` (disallows `/admin`), and JSON-LD for Organization and Service (`StructuredData`).
- Navbar, footer, and a floating control with a WhatsApp link and a booking link.

### Lead capture

- `/booking` validates name, email, company, budget, and service, inserts a row into `booking_leads`, then sends the visitor to `/booking/confirmation`.
- `/contact` validates a similar form, inserts into `contact_submissions`, and shows an on-page success state.
- Both forms then `POST` to the Supabase Edge Function `send-lead-email`. That function sends a Resend email to `hello@viralaty.com` when `RESEND_API_KEY` is set in the function environment. A failed email does not fail the form submission.
- The browser records `page_view` (route changes), `cta_click`, `form_start`, and `form_submit` into `analytics_events`.

### Admin

- `/admin` is an email-and-password sign-in screen using Supabase Auth. Lead data loads only when that user has a row in `admin_users`.
- Bookings and contacts can be searched, filtered by status (`new`, `reviewed`, `converted`), opened in a detail panel, and updated.
- `/admin/analytics` charts page views, CTA clicks, form submissions, sessions, top pages, and a funnel for 24 hours, 7 days, or 30 days. The page also subscribes to inserts on `analytics_events`. The migration does not add that table to the `supabase_realtime` publication, so live rows arrive only after that publication is enabled in the Supabase project.

### Database

Migrations in `supabase/migrations`:

- `booking_leads`, `contact_submissions`, and `admin_users`
- `analytics_events`
- Public `INSERT` on leads and analytics. Reads and updates of leads, and reads of analytics, go through `is_admin()`.

## What this repo does not include

- No model calls, content generation, creator tools, ad-platform APIs, or campaign management.
- Free tools are a catalog. Four cards are labeled coming soon. The other two expand to a short description and a link to `/contact`. None of them calculate or generate anything.
- Guide cards on `/guides` link to anchors on `/what-are-ai-ads`. There are no separate article routes. Links such as `/case-studies`, `/guides/chatgpt-ads-cost`, `/guides/chatgpt-ads-explained`, `/guides/chatgpt-ads-product-feed`, and `/guides/how-to-choose-chatgpt-ads-agency` have no pages.
- `AuthContext` (`signUp`, `signIn`, `signOut`, and a `user_profiles` query) is mounted in the root layout, and sign-up points at `/auth/callback`. There is no public auth screen, no `/auth/callback` route, and no `user_profiles` migration. The admin page calls Supabase Auth itself.
- `src/lib/supabase/server.ts` is not imported anywhere.
- `next.config.mjs` sets `typescript.ignoreBuildErrors` and `eslint.ignoreDuringBuilds`, so `npm run build` skips typecheck and lint. Use `npm run type-check` and `npm run lint` for those.
- `package-lock.json` is gitignored, so installs are not locked to a lockfile.
- The `admin_users` policy `admin_users_manage_own` is `FOR ALL` for the authenticated role, with the check `id = auth.uid()`. An authenticated user can write the admin row that matches their own id. Admin access is not a hard boundary until that policy is tightened.

## How to run

```bash
npm install
cp .env.example .env
```

Fill in the two Supabase values in `.env`, then:

```bash
npm run dev
```

Open [http://localhost:4028](http://localhost:4028).

Production build and server:

```bash
npm run build
npm run serve
```

To use leads, admin, and analytics against a real project:

1. Apply the SQL in `supabase/migrations` to the Supabase project.
2. Create an Auth user and insert that user's id into `public.admin_users`.
3. Deploy `supabase/functions/send-lead-email` and set `RESEND_API_KEY` as a function secret if you want the notification email. The function sends from `onboarding@resend.dev`.

The marketing pages render without Supabase. Forms, analytics writes, and `/admin` need the two public env vars and the tables above.

## Environment variables

| Name | Where it is read | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | `.env`, browser client, booking and contact forms | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `.env`, browser and server Supabase clients | Supabase anon key. Next.js exposes any `NEXT_PUBLIC_` variable to the browser |
| `RESEND_API_KEY` | `supabase/functions/send-lead-email` only | Resend API key. Set it as a Supabase function secret, not in `.env` |
| `DIST_DIR` | `next.config.mjs` | Optional. Overrides the Next.js output directory. Default is `.next` |

`.env` is gitignored. `.env.example` lists the Next.js names with empty values. `vercel.json` maps the two public Supabase variables to Vercel environment references.

## Scripts

| Script | What it runs |
| --- | --- |
| `npm run dev` | `next dev -p 4028` |
| `npm run build` | `next build` |
| `npm run serve` | `next start` (production server) |
| `npm run start` | `next dev -p 4028` (same as `dev`) |
| `npm run lint` | `next lint` |
| `npm run lint:fix` | `next lint --fix` |
| `npm run type-check` | `tsc --noEmit` |
| `npm run format` | Prettier on `src` |

## Status

The marketing site, booking and contact forms, Supabase lead storage, the Resend notification function, and the admin inbox and analytics dashboard are in the repo and wired together. The managed-ads product described on the pages is static copy. Several navigation links point at routes that were never added.

`.env` was committed with real values and has been removed from the git index. That does not erase it from history. Rotate the Supabase URL project credentials and the anon key, then update local `.env` and the Vercel environment.
