import { allVPNs, lowestPrice, connectionsNum, freePlan, type VPN } from './vpns';

export interface BestList {
  key: string;
  pick: () => VPN[];
}

const by = (fn: (v: VPN) => number) => (a: VPN, b: VPN) => fn(b) - fn(a) || b.scores.total - a.scores.total;
const p = (v: VPN) => v.platform_support as any;
const top = (list: VPN[], n = 7) => list.slice(0, n);

export const bestLists: BestList[] = [
  { key: 'streaming', pick: () => top(allVPNs.filter((v) => v.streaming?.netflix_us && v.streaming?.disney_plus).sort(by((v) => v.scores.streaming * 20 + v.scores.total))) },
  { key: 'gaming', pick: () => top([...allVPNs].sort(by((v) => v.scores.speed * 4 + v.scores.server_network))) },
  { key: 'torrenting', pick: () => top(allVPNs.filter((v) => v.server_network.p2p_servers).sort(by((v) => v.scores.privacy * 2 + v.scores.speed))) },
  { key: 'privacy', pick: () => top(allVPNs.filter((v) => v.security.no_logs_audited).sort(by((v) => v.scores.privacy * 4 + (v.fourteen_eyes ? 0 : 5)))) },
  { key: 'cheap', pick: () => top(allVPNs.filter((v) => v.scores.total >= 60 && lowestPrice(v.id)).sort((a, b) => lowestPrice(a.id)!.price - lowestPrice(b.id)!.price)) },
  { key: 'free', pick: () => top(allVPNs.filter((v) => freePlan(v))) },
  { key: 'families', pick: () => top(allVPNs.filter((v) => connectionsNum(v) >= 10).sort(by((v) => connectionsNum(v) >= 999 ? 5 : 0))) },
  { key: 'beginners', pick: () => top([...allVPNs].sort(by((v) => v.scores.ease_of_use * 5 + v.scores.total / 10))) },
  { key: 'travel', pick: () => top(allVPNs.filter((v) => v.server_network.country_count >= 60)) },
  { key: 'iphone', pick: () => top(allVPNs.filter((v) => p(v).ios)) },
  { key: 'android', pick: () => top(allVPNs.filter((v) => p(v).android)) },
  { key: 'windows', pick: () => top(allVPNs.filter((v) => p(v).windows)) },
  { key: 'mac', pick: () => top(allVPNs.filter((v) => p(v).mac)) },
  { key: 'linux', pick: () => top(allVPNs.filter((v) => p(v).linux)) },
  { key: 'router', pick: () => top(allVPNs.filter((v) => p(v).router)) },
  { key: 'smart-tv', pick: () => top(allVPNs.filter((v) => p(v).smart_tv)) },
];

export function getList(key: string) {
  return bestLists.find((l) => l.key === key);
}

// ---- Comparisons ----
export function comparePairs(): [VPN, VPN][] {
  const pool = allVPNs.slice(0, 8);
  const pairs: [VPN, VPN][] = [];
  for (let i = 0; i < pool.length; i++) for (let j = i + 1; j < pool.length; j++) pairs.push([pool[i], pool[j]]);
  const extra = [['protonvpn', 'tunnelbear'], ['surfshark', 'ipvanish'], ['nordvpn', 'ipvanish']];
  for (const [a, b] of extra) {
    const va = allVPNs.find((v) => v.id === a)!;
    const vb = allVPNs.find((v) => v.id === b)!;
    if (va && vb) pairs.push(va.scores.total >= vb.scores.total ? [va, vb] : [vb, va]);
  }
  return pairs;
}

export const pairSlug = (a: VPN, b: VPN) => `${a.slug}-vs-${b.slug}`;
