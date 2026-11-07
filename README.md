# kimdesign

Website for **kimdesign (کیم دیزاین)**, an architecture and renovation contractor.
Persian first (right-to-left, at `/`) and English second (at `/en/`), with light and dark modes.

Built with **Next.js 16 (App Router) + React 19 + TypeScript**. Every page is pre-rendered
to static HTML (`output: 'export'`), so it is fast, fully crawlable and can be hosted anywhere.

## Run it

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

`npm run build` optimises the pictures, builds the site and writes it to `out/`. Upload that
folder to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, nginx). `npm start`
serves `out/` locally. Other checks: `npm run lint`, `npm run typecheck`.

## Before launch: things to replace

| What | Where |
| --- | --- |
| **Price rates** (all mock values, in millions of Toman per m²) | `src/lib/pricing.ts` |
| Phone, email, address, hours, social links, map position | `src/content/site.ts` |
| Live domain (used for canonical URLs, sitemap and social cards) | `NEXT_PUBLIC_SITE_URL` env var (defaults to `https://kimdesign.ir`) |
| Where forms are sent | `NEXT_PUBLIC_FORM_ENDPOINT` env var (see below) |
| The six sample projects and their photos | `src/content/projects.ts` |
| Specialty descriptions, timelines | `src/content/specialties.ts` |
| FAQ answers (guarantee terms, payments) | `src/content/faq.ts` |
| Photos | `assets-src/img/` (see below) |

### Forms

The estimate inquiry and contact forms validate in the browser. If `NEXT_PUBLIC_FORM_ENDPOINT`
is set (Formspree, Basin, or your own API), they POST JSON to it. Without it, they open the
visitor's mail app with the message already written, addressed to the email in `site.ts`.

### Photos

Drop pictures into `assets-src/img/` (JPG, PNG or WebP). The build turns each into responsive
WebP files in `public/img/` and records their sizes, so pages never jump while loading. Use a
picture anywhere by its file name: `<Pic name="kitchen" alt="…" />`.

The current pictures are openly licensed stand-ins from Wikimedia Commons, StockSnap and
Openverse, listed with creator and licence on the Picture credits page (`/credits/`). **The
project photos are not kimdesign's own work**: replace them with real photographs of the
studio's jobs before launch, and remove the matching rows from `assets-src/img/credits.json`.

## Where things are

```
src/app/(fa)/…           Persian routes (root layout: lang="fa" dir="rtl")
src/app/(en)/en/…        English routes (root layout: lang="en" dir="ltr")
src/app/sitemap.ts       sitemap.xml with fa/en alternates
src/app/robots.ts        robots.txt
src/lib/pages.tsx        every page's title, description and structured data
src/lib/seo.ts           metadata (canonical, hreflang, Open Graph) and JSON-LD helpers
src/lib/pricing.ts       estimator data and formula
src/lib/i18n.ts          languages, routes, Persian digits and money formatting
src/views/               the pages (one component per page, both languages)
src/components/          bar and menu, footer, estimator, forms, project gallery, pictures
src/content/             business details and bilingual content
src/app/globals.css      design system: tokens, light/dark themes, layout, motion
```

Every piece of text is written once with both languages side by side (`{ fa: '…', en: '…' }`).

## SEO

- Static HTML for every page, one `h1` each, semantic landmarks and breadcrumbs
- Per-page titles and descriptions in both languages
- Canonical URLs, `hreflang` alternates (fa, en, x-default) in the head and in the sitemap
- Open Graph and Twitter cards with a 1200×630 image
- JSON-LD: `GeneralContractor` (with address, hours, area served) on every page,
  `WebSite`, `BreadcrumbList`, `ItemList` of `Service` (specialties) and of `CreativeWork`
  (projects), `FAQPage` (estimate page)
- `robots.txt`, `sitemap.xml`, web app manifest, icons, theme colour for both modes
- Self-hosted fonts (no layout shift), responsive WebP images with fixed dimensions

Lighthouse (mobile profile, compressed static hosting): SEO 100, Accessibility 100,
Best Practices 100, Performance 83–95.

## Design

The layout and interaction follow a boutique-hotel reference site: a framed first screen with
two offset pictures, a sticky bar (menu box, centred mark, framed action) that slides in after
the first screen, a four-column menu overlay, statement paragraphs, headings that mix thin and
heavy words, and ornamental bands between chapters.

Type: Persian pages use **Estedad** (hairline titles, heavy accent words, running text) and
**Parastoo** (statements, wordmark, large menu words), both self-hosted from `public/fonts`
under the SIL Open Font License. English pages use Cormorant Garamond and Karla. Here the bands are drawn from Persian
*hazarbaf* brick bonds, in the palette's own fired-brick brown, kashi blue and gold.
