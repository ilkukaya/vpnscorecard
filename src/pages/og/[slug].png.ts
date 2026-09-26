import type { APIRoute } from 'astro';
import { renderOg } from '../../lib/og';
import { allVPNs, gradeTone } from '../../lib/vpns';

const tones: Record<string, string> = { top: '#0F7B5F', high: '#2F6FB0', mid: '#B7791F', low: '#B4462C' };

export function getStaticPaths() {
  return [
    { params: { slug: 'default' }, props: { title: 'Every major VPN, scored in the open', subtitle: 'Transparent, research-based VPN rankings' } },
    ...allVPNs.map((v) => ({
      params: { slug: v.slug },
      props: { title: `${v.name} review`, subtitle: 'Scored on speed, privacy, value and more', score: (v.scores.total / 10).toFixed(1), color: tones[gradeTone(v.scores.total)] },
    })),
  ];
}

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOg(props as any);
  return new Response(png, { headers: { 'content-type': 'image/png' } });
};
