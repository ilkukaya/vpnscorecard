import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';
import { readFileSync, writeFileSync } from 'node:fs';

const SITE = (process.env.SITE_URL || process.env.URL || 'https://vpnscorecard.netlify.app').replace(/\/$/, '');
const LANGS = ['en', 'es', 'pt', 'fr', 'de', 'it', 'nl', 'pl', 'tr', 'ar', 'hi', 'id', 'ja', 'ko'];
const NOINDEX = ['/search/', '/legal-notice/', '/contact/thanks/', '/404/'];

/** Writes dist/_redirects: outbound /go/ links, geo-restrictions, legacy URLs, localized 404s. */
function netlifyRedirects() {
  return {
    name: 'netlify-redirects',
    hooks: {
      'astro:build:done': ({ dir }) => {
        const vpns = JSON.parse(readFileSync('data/vpns.json', 'utf8')).vpns;
        const aff = JSON.parse(readFileSync('data/affiliates.json', 'utf8'));
        const legal = JSON.parse(readFileSync('data/vpn-legality.json', 'utf8'));
        const blocked = legal.countries.filter((c) => c.block_affiliate).map((c) => c.code.toLowerCase()).join(',');
        const active = vpns.filter((v) => v.active).sort((a, b) => b.scores.total - a.scores.total);
        const lines = ['# Generated at build time by astro.config.mjs — do not edit dist/_redirects by hand.', ''];

        lines.push('# Outbound links: visitors in countries where VPN use is banned/restricted see a notice instead.');
        lines.push(`/go/*  /legal-notice/  302!  Country=${blocked}`);
        for (const v of vpns) {
          const url = (aff[v.id] && aff[v.id].url) || v.website;
          lines.push(`/go/${v.id}/  ${url}  302!`);
          lines.push(`/go/${v.id}  ${url}  302!`);
        }
        lines.push('/go/*  /  302');
        lines.push('');

        lines.push('# Legacy URLs');
        const prefixes = ['', '/es', '/tr'];
        const legacy = {
          '/deals': '/pricing/',
          '/deals/': '/pricing/',
          '/blog': '/guides/',
          '/blog/*': '/guides/',
          '/best/best-vpn-for-streaming/': '/best/streaming/',
          '/best/best-vpn-for-netflix/': '/best/streaming/',
          '/best/best-vpn-for-gaming/': '/best/gaming/',
          '/best/best-vpn-for-torrenting/': '/best/torrenting/',
          '/best/best-vpn-for-privacy/': '/best/privacy/',
          '/best/best-cheap-vpn/': '/best/cheap/',
          '/best/best-vpn-for-china/': '/vpn-legality/',
        };
        for (const p of prefixes) {
          for (const [from, to] of Object.entries(legacy)) {
            lines.push(`${p}${from}  ${p}${to}  301`);
            if (from.endsWith('/')) lines.push(`${p}${from.slice(0, -1)}  ${p}${to}  301`);
          }
        }
        lines.push('');

        lines.push('# Reversed comparison slugs -> canonical order');
        const top = active.slice(0, 8);
        const pairs = [];
        for (let i = 0; i < top.length; i++) for (let j = i + 1; j < top.length; j++) pairs.push([top[i], top[j]]);
        const extra = [['protonvpn', 'tunnelbear'], ['surfshark', 'ipvanish'], ['nordvpn', 'ipvanish']];
        for (const [a, b] of extra) {
          const va = active.find((v) => v.id === a), vb = active.find((v) => v.id === b);
          if (va && vb) pairs.push(va.scores.total >= vb.scores.total ? [va, vb] : [vb, va]);
        }
        for (const l of LANGS) {
          const p = l === 'en' ? '' : `/${l}`;
          for (const [a, b] of pairs) lines.push(`${p}/compare/${b.slug}-vs-${a.slug}/*  ${p}/compare/${a.slug}-vs-${b.slug}/  301`);
        }
        lines.push('');

        lines.push('# Localized 404 pages');
        for (const l of LANGS.filter((x) => x !== 'en')) lines.push(`/${l}/*  /${l}/404/  404`);
        writeFileSync(new URL('./_redirects', dir), lines.join('\n') + '\n');
      },
    },
  };
}

export default defineConfig({
  site: SITE,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap({
      filter: (page) => !NOINDEX.some((p) => page.endsWith(p)) && !page.includes('/og/'),
      i18n: { defaultLocale: 'en', locales: Object.fromEntries(LANGS.map((l) => [l, l])) },
      serialize(item) {
        item.lastmod = new Date().toISOString();
        return item;
      },
    }),
    pagefind(),
    netlifyRedirects(),
  ],
  output: 'static',
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
});
