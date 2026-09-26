# VPNScorecard

Research-based VPN scorecards in 14 languages. Static Astro site hosted on Netlify.

> Türkçe kurulum ve yapılacaklar listesi: **[YAPILACAKLAR.md](YAPILACAKLAR.md)**

## Stack

- **Astro 4** (static output) + **Tailwind CSS**, self-hosted fonts (Fraunces, Inter)
- **Pagefind** for search, **@astrojs/sitemap** with hreflang
- **Netlify**: hosting, Forms (contact), Edge Function (`/api/ip`), geo-aware redirects
- No database — everything lives in `data/*.json` and `src/content/`

## Commands

```bash
npm install
npm run dev       # local dev server
npm run build     # production build into dist/
npm run validate  # data + translation checks
```

## Where things live

| What | File |
|---|---|
| VPN facts & scores | `data/vpns.json` |
| Prices | `data/pricing.json` |
| **Affiliate links** | `data/affiliates.json` (paste your tracking URL into `url`) |
| VPN legality by country | `data/vpn-legality.json` |
| UI text per language | `src/i18n/ui/<lang>.json` |
| VPN taglines, verdicts, pros/cons | `src/i18n/vpn/<lang>.json` |
| Guides (articles) | `src/content/guides/<lang>/*.md` |
| Legal/static pages | `src/content/pages/<lang>/*.md` |
| Page templates | `src/views/*.astro` |
| Languages list | `src/i18n/config.ts` |

## How outbound links work

Every "Visit site" button links to `/go/<vpn-id>/`. At build time `astro.config.mjs` writes `dist/_redirects`:

- visitors from countries where VPN use is banned/restricted (`block_affiliate: true` in `data/vpn-legality.json`) are redirected to `/legal-notice/`;
- everyone else is redirected to the affiliate URL from `data/affiliates.json`, or to the official website while no affiliate URL is set.

## Optional environment variables (Netlify → Site configuration → Environment variables)

| Variable | Purpose |
|---|---|
| `SITE_URL` | Canonical URL (defaults to Netlify's `URL`, i.e. your primary domain) |
| `PUBLIC_ADSENSE_CLIENT` | e.g. `ca-pub-1234567890123456` — loads Google AdSense |
| `PUBLIC_ADSENSE_SLOT` | A display ad unit ID for in-page ad slots |
| `PUBLIC_CF_BEACON_TOKEN` | Cloudflare Web Analytics token (free, cookieless) |
| `PUBLIC_GA4_ID` | Google Analytics 4 ID (consent mode, default denied) |
| `PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console verification |
| `PUBLIC_BING_SITE_VERIFICATION` | Bing Webmaster Tools verification |
| `PUBLIC_YANDEX_VERIFICATION` | Yandex Webmaster verification |
| `PUBLIC_CONTACT_EMAIL` | Shows an email address on the contact page |

## SEO / AEO / GEO features

- Per-page canonical, hreflang (14 languages + x-default), Open Graph, Twitter cards
- Generated OG images per review (`/og/<slug>.png`)
- JSON-LD: Organization, WebSite + SearchAction, Review, BreadcrumbList, FAQPage, ItemList, Article
- "Short answer" boxes on every page for answer engines, FAQ sections
- `llms.txt` and an AI-crawler-friendly `robots.txt`
- IndexNow ping after each production deploy (`plugins/indexnow`)
- Localized 404 pages, legacy URL redirects

## Automation

- `.github/workflows/ci.yml` — validates data and builds on every PR/push
- `.github/workflows/freshness.yml` — opens a monthly reminder issue to re-check prices and facts (never changes data automatically)
