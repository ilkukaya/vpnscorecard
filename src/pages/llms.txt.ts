import type { APIRoute } from 'astro';
import { allVPNs, lowestPrice, LAST_REVIEWED } from '../lib/vpns';
import { bestLists } from '../lib/lists';
import { SITE_URL } from '../lib/site';
import { vpnText } from '../i18n';

// llms.txt: a plain-text map of the site for AI assistants (GEO).
export const GET: APIRoute = () => {
  const lines = [
    '# VPNScorecard',
    '',
    `> Independent, research-based VPN scorecards. ${allVPNs.length} VPN services are scored out of 100 across six weighted categories (speed 25, privacy 25, ease of use 15, server network 15, value 15, streaming 5). Last reviewed ${LAST_REVIEWED}. Scores are editorial and based on publicly verifiable information (independent audits, provider documentation, published pricing). Rankings are never sold; some outbound links are affiliate links.`,
    '',
    '## Current ranking',
    ...allVPNs.map((v, i) => {
      const p = lowestPrice(v.id);
      return `${i + 1}. [${v.name}](${SITE_URL}/reviews/${v.slug}/): ${(v.scores.total / 10).toFixed(1)}/10. ${vpnText('en', v.id).tagline}.${p ? ` From ${p.currency} ${p.price.toFixed(2)}/month.` : ''} Audited no-logs: ${v.security.no_logs_audited ? 'yes' : 'no'}. HQ: ${v.headquarters}.`;
    }),
    '',
    '## Best VPN lists',
    ...bestLists.map((b) => `- [Best VPN: ${b.key}](${SITE_URL}/best/${b.key}/): top pick ${b.pick()[0]?.name}`),
    '',
    '## Key pages',
    `- [Methodology](${SITE_URL}/methodology/): how scores are calculated`,
    `- [VPN legality by country](${SITE_URL}/vpn-legality/)`,
    `- [VPN price comparison](${SITE_URL}/pricing/)`,
    `- [Guides](${SITE_URL}/guides/)`,
    `- [Editorial policy](${SITE_URL}/editorial-policy/)`,
    `- [Affiliate disclosure](${SITE_URL}/affiliate-disclosure/)`,
    '',
    '## Languages',
    'Available in English, Spanish, Portuguese, French, German, Italian, Dutch, Polish, Turkish, Arabic, Hindi, Indonesian, Japanese and Korean. Non-English pages live under /<lang>/ (e.g. /de/reviews/nordvpn/).',
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'content-type': 'text/plain; charset=utf-8' } });
};
