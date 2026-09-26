import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import fs from 'node:fs';
import path from 'node:path';

const fontDir = path.resolve('node_modules/@fontsource/inter/files');
const fonts = [
  { name: 'Inter', data: fs.readFileSync(path.join(fontDir, 'inter-latin-400-normal.woff')), weight: 400 as const, style: 'normal' as const },
  { name: 'Inter', data: fs.readFileSync(path.join(fontDir, 'inter-latin-700-normal.woff')), weight: 700 as const, style: 'normal' as const },
  { name: 'Inter', data: fs.readFileSync(path.join(fontDir, 'inter-latin-800-normal.woff')), weight: 800 as const, style: 'normal' as const },
];

type Node = { type: string; props: Record<string, any> };
const h = (type: string, style: Record<string, any>, children?: any): Node => ({ type, props: { style, children } });

export async function renderOg(opts: { title: string; subtitle?: string; score?: string; color?: string }) {
  const tree = h('div', { width: 1200, height: 630, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#F7F6F2', padding: 72, fontFamily: 'Inter' }, [
    h('div', { display: 'flex', alignItems: 'center', gap: 16 }, [
      h('div', { width: 56, height: 56, borderRadius: 14, background: '#121417', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#14A37E', fontSize: 36, fontWeight: 800 }, '✓'),
      h('div', { display: 'flex', fontSize: 34, fontWeight: 800, color: '#121417' }, [h('span', {}, 'VPN'), h('span', { color: '#0F7B5F' }, 'Scorecard')]),
    ]),
    h('div', { display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 40 }, [
      h('div', { display: 'flex', flexDirection: 'column', maxWidth: opts.score ? 760 : 1050 }, [
        h('div', { fontSize: opts.title.length > 40 ? 64 : 80, fontWeight: 800, color: '#121417', lineHeight: 1.05, letterSpacing: -2 }, opts.title),
        opts.subtitle ? h('div', { fontSize: 32, color: '#5B6270', marginTop: 20 }, opts.subtitle) : h('div', {}, ''),
      ]),
      opts.score
        ? h('div', { width: 220, height: 220, borderRadius: 40, background: opts.color || '#0F7B5F', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }, [
            h('div', { fontSize: 96, fontWeight: 800, lineHeight: 1 }, opts.score),
            h('div', { fontSize: 26, marginTop: 8, opacity: 0.9 }, 'out of 10'),
          ])
        : h('div', {}, ''),
    ]),
    h('div', { height: 10, width: '100%', background: '#0F7B5F', borderRadius: 5 }, ''),
  ]);
  const svg = await satori(tree as any, { width: 1200, height: 630, fonts });
  return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
}
