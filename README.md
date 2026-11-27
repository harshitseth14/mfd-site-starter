# mfd-site-starter

A website starter for Indian mutual fund distributors and insurance agents. Clone it, edit one file, and you have a fast,
accessible site that sends every enquiry to your inbox and keeps to the rules that apply to an AMFI-registered Mutual
Fund Distributor.

It began as the live website of a family-run distribution practice. Everything personal has been taken out: the
copy here describes a fictional firm, "Example Wealth & Insurance" in Nagpur, ARN-000000.

## What you get

- **Pages:** a homepage, one page for each service (investments, insurance, loans, real estate, family), corporates,
  our approach, our story, careers, a booking page, and privacy, terms and grievance pages.
- **A two-step enquiry form.** Step one takes a name, number and email and emails it to you straight away. Step two,
  which visitors may skip, lets them pick a time to talk. Every lead is also saved to Postgres, and any lead whose email
  failed is sent again with the next one, so none go unseen.
- **Compliance built in.** The AMFI risk line, ARN and EUIN, the IRDAI solicitation line, a lender note on loans and a
  plain "how we are paid" section sit on the pages that need them. Unit tests fail the build if the copy calls the firm
  an adviser, a wealth manager or a financial planner, or promises guaranteed returns.
- **Found by search engines and AI assistants:** structured data (schema.org), a sitemap, a link preview image and
  `/llms.txt`, each describing the firm as a distributor.
- **Safe by default:** a strict Content Security Policy and security headers, rate limits and a bot trap on the forms,
  and input checked with Zod on the server.
- **Fast and accessible:** pages are built ahead of time, the 3D sphere on the homepage loads after the page is
  usable and stops for reduced motion, and the layout works from a 320px phone up.

## Make it yours

1. Edit **`lib/site.ts`**: name, city, ARN, EUIN, phone numbers, email, hours, figures, your story and services. Every
   page, the structured data, `/llms.txt` and the emails read from it.
2. Edit the wording of each service page in `lib/service-pages.ts`, and the corporates page in `lib/corporates.ts`.
3. Replace the line-drawing placeholders in `assets/photos/` with your own photographs (same file names), and update
   their alt text in `components/photos.ts`. To show the founder's photo instead of initials, add it to
   `PEOPLE_PHOTOS` in the same file.
4. Replace `app/icon.svg`, `app/apple-icon.png` and `app/opengraph-image.png`.
5. Read the privacy and terms pages and have them checked for your firm before you publish.

Only claim what you can stand behind: figures, recognition and registrations must be true for your firm.

## Run it

Requires Node.js 20 or later.

```bash
npm ci
cp .env.example .env.local   # optional: add a database and mail settings
npm run dev                  # http://localhost:3200
```

Without a database the forms still work, and without mail settings each lead is printed to the terminal.

With a Postgres database (Neon, Supabase or your own), set `DATABASE_URL` and create the leads table:

```bash
npm run db:migrate
```

Checks:

```bash
npm run typecheck
npm test
npm run build
```

It deploys as a standard Next.js app. `vercel.json` sets Vercel's Singapore region (`sin1`); change it to the region nearest your database.

## Stack

Next.js 16 (App Router), React 19, TypeScript, plain CSS, node-postgres, Nodemailer, Zod, three.js for the homepage
sphere, and Vitest.

## Not legal or regulatory advice

This starter shows one way to present the required disclosures. It is not legal or compliance advice. Check the current
AMFI, SEBI and IRDAI rules, and your own registrations, before you publish.

## Licence

Copyright (C) 2026 Harshit Seth and contributors. Released under the GNU Affero General Public License v3.0; see
[LICENSE](LICENSE). If you run a modified version as a public website, the AGPL asks you to offer its source to your
visitors.
