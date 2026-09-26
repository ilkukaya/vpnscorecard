// Prefixes internal links in Markdown content with the language of the file,
// so translated content can keep English paths like "/methodology/".
const LANGS = ['es', 'pt', 'fr', 'de', 'it', 'nl', 'pl', 'tr', 'ar', 'hi', 'id', 'ja', 'ko'];

export default function rehypeLocalizeLinks() {
  return (tree, file) => {
    const p = (file.history && file.history[0]) || file.path || '';
    const m = p.match(/content\/(?:guides|pages)\/([a-z]{2})\//);
    const lang = m && m[1];
    if (!lang || !LANGS.includes(lang)) return;
    const walk = (node) => {
      if (node.type === 'element' && node.tagName === 'a' && node.properties && typeof node.properties.href === 'string') {
        const href = node.properties.href;
        if (href.startsWith('/') && !href.startsWith('//') && !LANGS.some((l) => href.startsWith(`/${l}/`))) {
          node.properties.href = `/${lang}${href}`;
        }
      }
      if (node.children) node.children.forEach(walk);
    };
    walk(tree);
  };
}
