# VPNScorecard

Independent VPN testing, scoring, and ranking platform.

**Site:** [vpnscorecard.com](https://vpnscorecard.com)

## Tech Stack

- **Framework:** Astro 4.x (SSG)
- **Styling:** Tailwind CSS 3.x
- **Interactive:** Astro Islands (React for Quiz)
- **Hosting:** Netlify Free Tier
- **CI/CD:** GitHub Actions
- **Data:** JSON files (no database)
- **Search:** Pagefind
- **Analytics:** Plausible (privacy-friendly, no cookie banner)

## Quick Start

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Validate data files
npm run validate
```

## Project Structure

```
vpnscorecard/
├── data/                    # JSON data files
│   ├── vpns.json           # Main VPN database (8 VPNs)
│   ├── pricing.json        # Weekly-updated pricing
│   ├── speed-tests.json    # Monthly speed test results
│   ├── deals.json          # Active campaigns
│   ├── server-counts.json  # Server count data
│   └── blog-posts.json     # Blog post metadata
├── src/
│   ├── components/         # Astro components
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── VPNCard.astro
│   │   ├── ScoreGauge.astro
│   │   ├── ScoreBreakdown.astro
│   │   ├── ComparisonTable.astro
│   │   ├── SpeedTestChart.astro
│   │   ├── PricingTable.astro
│   │   ├── ProConList.astro
│   │   ├── UseCaseMatch.astro
│   │   ├── AffiliateDisclosure.astro
│   │   ├── QuizWidget.tsx   # React quiz component
│   │   ├── FAQAccordion.astro
│   │   ├── TrustBadge.astro
│   │   └── CTAButton.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── ReviewLayout.astro
│   ├── lib/
│   │   ├── scoring.ts       # Scoring algorithm
│   │   ├── affiliateLinks.ts # UTM + affiliate link management
│   │   ├── vpnData.ts       # Data loading & filtering
│   │   └── formatters.ts    # Utility formatters
│   ├── pages/
│   │   ├── index.astro              # Homepage
│   │   ├── reviews/                 # 8 VPN review pages
│   │   ├── compare/                 # 5 comparison pages
│   │   ├── best/                    # 8 "best for" pages
│   │   ├── quiz.astro               # VPN finder quiz
│   │   ├── methodology.astro        # Testing methodology
│   │   ├── deals.astro              # Current deals
│   │   ├── about.astro              # About page
│   │   └── blog/                    # Dynamic blog pages
│   └── styles/
│       └── global.css
├── scripts/
│   ├── update_pricing.py     # Weekly price scraper
│   ├── validate_data.py      # JSON validation
│   ├── run_speed_tests.py    # Automated speed tests
│   └── check_server_counts.py # Server count checker
├── .github/workflows/
│   ├── update-pricing.yml    # Weekly price update
│   └── run-speed-tests.yml   # Monthly speed tests
├── public/
│   ├── logos/                # VPN logos (SVG)
│   ├── favicon.svg
│   ├── og-image.svg
│   └── robots.txt
├── astro.config.mjs
├── tailwind.config.mjs
├── netlify.toml
└── package.json
```

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Register for Affiliate Programs

Before deploying, register for these affiliate programs and replace `YOURID` in `data/vpns.json`:

| VPN | Commission | Register |
|-----|-----------|----------|
| NordVPN | 40% recurring | [affiliates.nordvpn.com](https://affiliates.nordvpn.com/) |
| ExpressVPN | $13 flat | [expressvpn.com/affiliates](https://www.expressvpn.com/affiliates) |
| Surfshark | 40% recurring | [surfshark.com/affiliate-program](https://surfshark.com/affiliate-program) |
| CyberGhost | 45% recurring | [cyberghostvpn.com/affiliates](https://www.cyberghostvpn.com/affiliates) |
| PIA | 33% recurring | [privateinternetaccess.com/affiliate](https://www.privateinternetaccess.com/affiliate) |
| Proton VPN | $10 flat | Contact Proton for affiliate program |

### 3. Update Affiliate IDs

Search for `YOURID` in `data/vpns.json` and replace with your actual affiliate IDs.

### 4. Deploy to Netlify

```bash
# Connect your GitHub repo to Netlify
# Netlify will auto-detect the build command from netlify.toml
npm run build
```

### 5. Configure Plausible Analytics

The Plausible script is already included in `BaseLayout.astro`. Just:
1. Sign up at [plausible.io](https://plausible.io)
2. Add `vpnscorecard.com` as your site
3. The tracking is already configured

## Scoring System

Each VPN is scored out of 100 points across 6 categories:

| Category | Weight | Criteria |
|----------|--------|----------|
| Speed & Performance | 25% | Download, upload, ping, consistency |
| Privacy & Security | 25% | No-logs audit, encryption, kill switch, jurisdiction |
| Ease of Use | 15% | App quality, setup, platform support |
| Server Network | 15% | Countries, servers, specialized features |
| Price & Value | 15% | Monthly cost, refund policy, connections |
| Streaming Support | 5% | Netflix, Disney+, BBC iPlayer, etc. |

## Automated Workflows

### Weekly Price Update (Mondays 06:00 UTC)
- Scrapes VPN pricing pages
- Updates `data/pricing.json` and `data/deals.json`
- Commits changes automatically

### Monthly Speed Tests (15th of each month, 20:00 UTC)
- Runs iperf3 speed tests
- Updates `data/speed-tests.json`
- Commits changes automatically

## Data Validation

```bash
npm run validate
# or
python scripts/validate_data.py
```

Validates all JSON files for:
- Required fields
- Score consistency
- Duplicate IDs
- Proper ranking order

## License

MIT
