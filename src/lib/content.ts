import { getCollection, type CollectionEntry } from 'astro:content';
import { langs, type Lang } from '../i18n';

/** entry.slug looks like "en/what-is-a-vpn" */
export function splitSlug(slug: string): { lang: Lang; slug: string } {
  const [lang, ...rest] = slug.split('/');
  return { lang: lang as Lang, slug: rest.join('/') };
}

export async function guidesFor(lang: Lang) {
  const all = await getCollection('guides');
  return all
    .filter((e) => splitSlug(e.slug).lang === lang)
    .sort((a, b) => (b.data.updated || b.data.date).localeCompare(a.data.updated || a.data.date));
}

export async function guideLangs(slug: string): Promise<Lang[]> {
  const all = await getCollection('guides');
  return langs.filter((l) => all.some((e) => e.slug === `${l}/${slug}`));
}

export async function pageEntry(lang: Lang, slug: string): Promise<CollectionEntry<'pages'> | undefined> {
  const all = await getCollection('pages');
  return all.find((e) => e.slug === `${lang}/${slug}`) || all.find((e) => e.slug === `en/${slug}`);
}

export async function pageLangs(slug: string): Promise<Lang[]> {
  const all = await getCollection('pages');
  return langs.filter((l) => all.some((e) => e.slug === `${l}/${slug}`));
}
