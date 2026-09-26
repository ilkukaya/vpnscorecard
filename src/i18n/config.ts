// Supported languages. Order controls the language switcher.
// Languages were chosen for global reach while avoiding markets where
// promoting VPN services is itself restricted (e.g. Russian, Persian,
// Simplified Chinese). See YAPILACAKLAR.md for the reasoning.
export const languages = {
  en: { name: 'English', english: 'English', hreflang: 'en', ogLocale: 'en_US', dir: 'ltr' },
  es: { name: 'Español', english: 'Spanish', hreflang: 'es', ogLocale: 'es_ES', dir: 'ltr' },
  pt: { name: 'Português', english: 'Portuguese', hreflang: 'pt', ogLocale: 'pt_BR', dir: 'ltr' },
  fr: { name: 'Français', english: 'French', hreflang: 'fr', ogLocale: 'fr_FR', dir: 'ltr' },
  de: { name: 'Deutsch', english: 'German', hreflang: 'de', ogLocale: 'de_DE', dir: 'ltr' },
  it: { name: 'Italiano', english: 'Italian', hreflang: 'it', ogLocale: 'it_IT', dir: 'ltr' },
  nl: { name: 'Nederlands', english: 'Dutch', hreflang: 'nl', ogLocale: 'nl_NL', dir: 'ltr' },
  pl: { name: 'Polski', english: 'Polish', hreflang: 'pl', ogLocale: 'pl_PL', dir: 'ltr' },
  tr: { name: 'Türkçe', english: 'Turkish', hreflang: 'tr', ogLocale: 'tr_TR', dir: 'ltr' },
  ar: { name: 'العربية', english: 'Arabic', hreflang: 'ar', ogLocale: 'ar_AR', dir: 'rtl' },
  hi: { name: 'हिन्दी', english: 'Hindi', hreflang: 'hi', ogLocale: 'hi_IN', dir: 'ltr' },
  id: { name: 'Bahasa Indonesia', english: 'Indonesian', hreflang: 'id', ogLocale: 'id_ID', dir: 'ltr' },
  ja: { name: '日本語', english: 'Japanese', hreflang: 'ja', ogLocale: 'ja_JP', dir: 'ltr' },
  ko: { name: '한국어', english: 'Korean', hreflang: 'ko', ogLocale: 'ko_KR', dir: 'ltr' },
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';
export const langs = Object.keys(languages) as Lang[];
export const nonDefaultLangs = langs.filter((l) => l !== defaultLang);
