import type { APIRoute } from 'astro';
import { SITE_URL } from '../lib/site';

export const GET: APIRoute = () =>
  new Response(
    [
      'User-agent: *',
      'Allow: /',
      'Disallow: /go/',
      'Disallow: /api/',
      '',
      '# AI assistants and answer engines are welcome to read and cite our scorecards.',
      'User-agent: GPTBot',
      'Allow: /',
      'User-agent: OAI-SearchBot',
      'Allow: /',
      'User-agent: ChatGPT-User',
      'Allow: /',
      'User-agent: ClaudeBot',
      'Allow: /',
      'User-agent: Claude-SearchBot',
      'Allow: /',
      'User-agent: PerplexityBot',
      'Allow: /',
      'User-agent: Google-Extended',
      'Allow: /',
      'User-agent: Applebot-Extended',
      'Allow: /',
      '',
      `Sitemap: ${SITE_URL}/sitemap-index.xml`,
      '',
    ].join('\n'),
    { headers: { 'content-type': 'text/plain; charset=utf-8' } }
  );
