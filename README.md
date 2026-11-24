# Nexora Corporate

Corporate website for a fictional African business consulting and technology firm, built with Next.js (App Router, Cache Components) and Sanity CMS. The Studio is embedded at `/studio`.

## Run

```bash
npm install --legacy-peer-deps
npm run dev
```

`.env.local` needs `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`. The site reads only the public dataset. It does not use an API token.

## Content model (Studio)

| Document | Purpose |
| --- | --- |
| Homepage | Hero, introduction, statistics (up to 4) and enquiry CTA |
| About Page (singleton) | Introduction, story, image, mission, vision, values, leadership |
| Service | Title, slug, icon, summary, image, inclusions, details, featured flag, order |
| News Article | Title, slug, publication date, category, image, excerpt, Portable Text body |
| Site Settings (singleton) | Company name, tagline, email, phone, address, office hours, social links |

Pages: `/`, `/about`, `/services`, `/services/[slug]`, `/news`, `/news/[slug]`, `/contact`.

## Caching

Sanity queries run inside `use cache` with `cacheLife('minutes')`, so pages are prerendered. Changes published in Studio appear within about a minute, with no webhook needed. When a new service or article is published, its page is rendered on its first visit. Images are resized by the Sanity CDN through a custom `next/image` loader.

## Contact form: demonstration behaviour

The business enquiry form validates on the client and again on the server through a Server Action. **No email service is connected, so enquiries are not sent or stored.** The form says this before and after submission. For production, connect a transactional email provider or CRM in `app/(site)/contact/actions.ts`.
