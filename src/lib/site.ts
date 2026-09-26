// The public URL of the site. Netlify injects URL at build time (the primary
// domain once a custom domain is connected). SITE_URL can override it.
const raw =
  (typeof process !== 'undefined' && (process.env.SITE_URL || process.env.URL)) ||
  'https://vpnscorecard.netlify.app';

export const SITE_URL = raw.replace(/\/$/, '');
export const SITE_NAME = 'VPNScorecard';
export const CONTACT_EMAIL = process.env.PUBLIC_CONTACT_EMAIL || '';

export const env = {
  adsenseClient: process.env.PUBLIC_ADSENSE_CLIENT || '',
  cfBeaconToken: process.env.PUBLIC_CF_BEACON_TOKEN || '',
  ga4Id: process.env.PUBLIC_GA4_ID || '',
  googleVerification: process.env.PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  bingVerification: process.env.PUBLIC_BING_SITE_VERIFICATION || '',
  yandexVerification: process.env.PUBLIC_YANDEX_VERIFICATION || '',
};

export function abs(path: string) {
  return SITE_URL + (path.startsWith('/') ? path : `/${path}`);
}
