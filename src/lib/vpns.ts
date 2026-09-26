import vpnsData from '../../data/vpns.json';
import pricingData from '../../data/pricing.json';
import affiliates from '../../data/affiliates.json';

export type VPN = (typeof vpnsData.vpns)[number];

export const DATA_AS_OF = vpnsData.data_as_of;
export const LAST_REVIEWED = vpnsData.last_reviewed;
export const PRICES_AS_OF = pricingData.last_updated;

export const allVPNs: VPN[] = vpnsData.vpns
  .filter((v) => v.active)
  .sort((a, b) => b.scores.total - a.scores.total);

export function getVPN(id: string): VPN | undefined {
  return allVPNs.find((v) => v.id === id || v.slug === id);
}

export function rankOf(id: string): number {
  return allVPNs.findIndex((v) => v.id === id) + 1;
}

export const scoreCategories = [
  { key: 'speed', max: 25 },
  { key: 'privacy', max: 25 },
  { key: 'ease_of_use', max: 15 },
  { key: 'server_network', max: 15 },
  { key: 'value', max: 15 },
  { key: 'streaming', max: 5 },
] as const;

export function score10(v: VPN) {
  return (v.scores.total / 10).toFixed(1);
}

export function grade(total: number): 'outstanding' | 'excellent' | 'very_good' | 'good' | 'fair' {
  if (total >= 90) return 'outstanding';
  if (total >= 80) return 'excellent';
  if (total >= 70) return 'very_good';
  if (total >= 60) return 'good';
  return 'fair';
}

export function gradeTone(total: number) {
  if (total >= 85) return 'top';
  if (total >= 75) return 'high';
  if (total >= 65) return 'mid';
  return 'low';
}

// ---- Pricing ----
type Plan = { price: number; period?: string; total?: number; savings_percent?: number; note?: string };
const planOrder = ['monthly', 'six_month', 'yearly', 'two_year', 'three_year', 'five_year'] as const;
export type PlanKey = (typeof planOrder)[number];

export function pricing(id: string): any {
  return (pricingData.prices as any)[id] || null;
}

export function plans(id: string): { key: PlanKey; plan: Plan }[] {
  const p = pricing(id);
  if (!p) return [];
  return planOrder.filter((k) => p[k] && typeof p[k].price === 'number').map((k) => ({ key: k, plan: p[k] }));
}

/** Lowest effective monthly price across all plans. */
export function lowestPrice(id: string): { price: number; currency: string; key: PlanKey } | null {
  const p = pricing(id);
  const list = plans(id);
  if (!list.length) return null;
  const best = list.reduce((a, b) => (b.plan.price < a.plan.price ? b : a));
  return { price: best.plan.price, currency: p.currency || 'USD', key: best.key };
}

export function refundDays(id: string): number {
  return pricing(id)?.refund_days ?? 0;
}

export function connections(v: VPN): number | 'unlimited' {
  const c = (v.platform_support as any).simultaneous_connections;
  return c === 'unlimited' || c == null ? 'unlimited' : Number(c);
}

export function connectionsNum(v: VPN): number {
  const c = connections(v);
  return c === 'unlimited' ? 999 : c;
}

// ---- Affiliate / outbound ----
export function outboundUrl(id: string): string {
  const aff = (affiliates as any)[id];
  const v = getVPN(id);
  return (aff && aff.url) || v?.website || '/';
}

export function hasAffiliate(id: string): boolean {
  const aff = (affiliates as any)[id];
  return Boolean(aff && aff.url);
}

/** Internal redirect path used by every CTA. Netlify maps it to the right URL. */
export function goPath(id: string) {
  return `/go/${id}/`;
}

export function hasProgram(id: string): boolean {
  const aff = (affiliates as any)[id];
  return Boolean(aff && aff.program);
}

// ---- Feature helpers ----
export function streamingCount(v: VPN): number {
  return Object.values(v.streaming || {}).filter(Boolean).length;
}

export function freePlan(v: VPN): any {
  const f = (v as any).free_plan;
  return f && f.available ? f : null;
}

export function platforms(v: VPN) {
  const p = v.platform_support as any;
  return ['windows', 'mac', 'linux', 'ios', 'android', 'browser_extension', 'router', 'smart_tv'].map((k) => ({
    key: k,
    ok: Boolean(p[k]),
  }));
}
