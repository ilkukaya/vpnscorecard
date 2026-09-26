import { SITE_URL, SITE_NAME, abs } from './site';
import { languages, localized, type Lang } from '../i18n';

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function orgSchema() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE_NAME,
    url: SITE_URL + '/',
    logo: { '@type': 'ImageObject', url: abs('/icon-512.png'), width: 512, height: 512 },
    description: 'Independent, research-based VPN scorecards with transparent scoring.',
  };
}

export function websiteSchema(lang: Lang) {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL + '/',
    inLanguage: languages[lang].hreflang,
    publisher: { '@id': ORG_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: abs(localized('/search/', lang)) + '?q={search_term_string}' },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
  };
}

export function faqSchema(faq: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

export function itemListSchema(name: string, urls: { name: string; path: string }[]) {
  return {
    '@type': 'ItemList',
    name,
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    numberOfItems: urls.length,
    itemListElement: urls.map((u, i) => ({ '@type': 'ListItem', position: i + 1, name: u.name, url: abs(u.path) })),
  };
}

export function graph(nodes: any[]) {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes }).replace(/</g, '\\u003c');
}
