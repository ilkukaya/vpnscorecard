// Notifies Bing, Yandex, Seznam, Naver (IndexNow) after a successful production deploy.
// Free and optional: failures never break the build.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

export const onSuccess = async ({ constants, utils }) => {
  if (process.env.CONTEXT !== 'production') return;
  try {
    const site = (process.env.SITE_URL || process.env.URL || '').replace(/\/$/, '');
    const publish = constants.PUBLISH_DIR;
    const keyFile = readdirSync(publish).find((f) => /^[a-f0-9]{32}\.txt$/.test(f));
    if (!site || !keyFile) return;
    const key = keyFile.replace('.txt', '');
    const xml = readdirSync(publish).filter((f) => /^sitemap-\d+\.xml$/.test(f)).map((f) => readFileSync(join(publish, f), 'utf8')).join('');
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).slice(0, 10000);
    if (!urls.length) return;
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: new URL(site).host, key, keyLocation: `${site}/${keyFile}`, urlList: urls }),
    });
    console.log(`IndexNow: submitted ${urls.length} URLs -> HTTP ${res.status}`);
  } catch (e) {
    utils.status.show({ title: 'IndexNow skipped', summary: String(e) });
  }
};
