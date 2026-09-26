import { languages, langs, defaultLang, type Lang } from './config';

export { languages, langs, defaultLang, nonDefaultLangs, type Lang } from './config';

const uiModules = import.meta.glob('./ui/*.json', { eager: true, import: 'default' }) as Record<string, any>;
const vpnModules = import.meta.glob('./vpn/*.json', { eager: true, import: 'default' }) as Record<string, any>;

function byLang(mods: Record<string, any>): Partial<Record<Lang, any>> {
  const out: Partial<Record<Lang, any>> = {};
  for (const [path, mod] of Object.entries(mods)) {
    const code = path.split('/').pop()!.replace('.json', '') as Lang;
    out[code] = mod;
  }
  return out;
}

const ui = byLang(uiModules);
const vpnCopy = byLang(vpnModules);

function lookup(obj: any, key: string): any {
  return key.split('.').reduce((o, k) => (o && typeof o === 'object' ? o[k] : undefined), obj);
}

const warned = new Set<string>();

/** Translate a UI key. Falls back to English, then to the key itself. */
export function t(lang: Lang, key: string, params?: Record<string, string | number>): string {
  let value = lookup(ui[lang], key);
  if (value === undefined || value === '') value = lookup(ui[defaultLang], key);
  if (typeof value !== 'string') {
    if (!warned.has(key)) { warned.add(key); console.warn(`[i18n] missing key: ${key}`); }
    return key;
  }
  if (params) {
    for (const [k, v] of Object.entries(params)) value = value.replaceAll(`{${k}}`, String(v));
  }
  return value;
}

/** Raw (possibly non-string) UI value, e.g. arrays of FAQ items. */
export function tRaw<T = any>(lang: Lang, key: string): T {
  const v = lookup(ui[lang], key);
  return (v === undefined ? lookup(ui[defaultLang], key) : v) as T;
}

export function vpnText(lang: Lang, id: string): { tagline: string; verdict: string; pros: string[]; cons: string[] } {
  return vpnCopy[lang]?.[id] || vpnCopy[defaultLang]![id];
}

/** Path helper: localized('/reviews/', 'tr') -> '/tr/reviews/' */
export function localized(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return lang === defaultLang ? clean : `/${lang}${clean === '/' ? '/' : clean}`;
}

/** Strip a language prefix from a pathname. */
export function stripLang(pathname: string): string {
  const parts = pathname.split('/');
  if (parts[1] && (langs as string[]).includes(parts[1]) && parts[1] !== defaultLang) {
    return '/' + parts.slice(2).join('/');
  }
  return pathname;
}

export function langFromPath(pathname: string): Lang {
  const seg = pathname.split('/')[1];
  return seg && (langs as string[]).includes(seg) ? (seg as Lang) : defaultLang;
}

export function dir(lang: Lang) {
  return languages[lang].dir;
}

export function numberFmt(lang: Lang, n: number, opts?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat(lang, opts).format(n);
}

export function priceFmt(lang: Lang, n: number, currency = 'USD') {
  return new Intl.NumberFormat(lang, { style: 'currency', currency, minimumFractionDigits: 2 }).format(n);
}

export function dateFmt(lang: Lang, iso: string, opts: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }) {
  return new Intl.DateTimeFormat(lang, { ...opts, timeZone: 'UTC' }).format(new Date(iso));
}

export function monthYear(lang: Lang, iso: string) {
  return dateFmt(lang, iso, { year: 'numeric', month: 'long' });
}

export function countryName(lang: Lang, code: string) {
  try {
    return new Intl.DisplayNames([lang], { type: 'region' }).of(code) || code;
  } catch {
    return code;
  }
}
