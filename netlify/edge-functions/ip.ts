import type { Config, Context } from '@netlify/edge-functions';

// Returns the visitor's public IP and approximate location for the
// "What is my IP" tool. Nothing is logged or stored.
export default async (_req: Request, context: Context) => {
  const geo = context.geo || {};
  const body = {
    ip: context.ip || null,
    city: geo.city || null,
    region: geo.subdivision?.name || null,
    country: geo.country?.name || null,
    countryCode: geo.country?.code || null,
    timezone: geo.timezone || null,
    latitude: geo.latitude ?? null,
    longitude: geo.longitude ?? null,
  };
  return new Response(JSON.stringify(body), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store, private',
      'x-robots-tag': 'noindex',
    },
  });
};

export const config: Config = {
  path: '/api/ip',
};
