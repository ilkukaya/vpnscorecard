import vpnsData from '../../data/vpns.json';
import pricingData from '../../data/pricing.json';
import speedTestData from '../../data/speed-tests.json';
import dealsData from '../../data/deals.json';

export interface VPN {
  id: string;
  name: string;
  slug: string;
  logo: string;
  color_hex: string;
  color_text_hex?: string;
  tagline: string;
  website: string;
  headquarters: string;
  is14Eyes: boolean;
  founded_year: number;
  priority: string;
  security: any;
  server_network: any;
  speed_tests: any;
  platform_support: any;
  streaming: any;
  customer_support: any;
  scores: {
    speed: number;
    privacy: number;
    ease_of_use: number;
    server_network: number;
    value: number;
    streaming: number;
    total: number;
  };
  affiliate: any;
  pros: string[];
  cons: string[];
  best_for: string[];
  recommended_plan: string;
  active: boolean;
  free_plan?: any;
}

export function getAllVPNs(): VPN[] {
  return (vpnsData as any).vpns.filter((v: VPN) => v.active);
}

export function getVPNBySlug(slug: string): VPN | undefined {
  return (vpnsData as any).vpns.find((v: VPN) => v.slug === slug);
}

export function getVPNById(id: string): VPN | undefined {
  return (vpnsData as any).vpns.find((v: VPN) => v.id === id);
}

export function getRankedVPNs(): VPN[] {
  return getAllVPNs().sort((a, b) => b.scores.total - a.scores.total);
}

export function getVPNsByUseCase(useCase: string): VPN[] {
  return getAllVPNs()
    .filter((v) => v.best_for.includes(useCase))
    .sort((a, b) => b.scores.total - a.scores.total);
}

export function getStreamingVPNs(): VPN[] {
  return getAllVPNs()
    .filter((v) => {
      const s = v.streaming;
      return s && (s.netflix_us || s.disney_plus);
    })
    .sort((a, b) => b.scores.streaming - a.scores.streaming);
}

export function getPrivacyVPNs(): VPN[] {
  return getAllVPNs()
    .filter((v) => v.security.no_logs_audited)
    .sort((a, b) => b.scores.privacy - a.scores.privacy);
}

export function getBudgetVPNs(): VPN[] {
  const prices = (pricingData as any).prices;
  return getAllVPNs()
    .map((vpn) => {
      const pricing = prices[vpn.id];
      let monthlyPrice = Infinity;
      if (pricing) {
        if (pricing.two_year) monthlyPrice = pricing.two_year.price;
        else if (pricing.yearly) monthlyPrice = pricing.yearly.price;
        else if (pricing.monthly) monthlyPrice = pricing.monthly.price;
      }
      return { ...vpn, _monthlyPrice: monthlyPrice };
    })
    .sort((a, b) => (a as any)._monthlyPrice - (b as any)._monthlyPrice) as VPN[];
}

export function getTorrentVPNs(): VPN[] {
  return getAllVPNs()
    .filter((v) => v.server_network.p2p_servers)
    .sort((a, b) => b.scores.speed - a.scores.speed);
}

export function getPricing(vpnId: string): any {
  return (pricingData as any).prices[vpnId] || null;
}

export function getSpeedTestResult(vpnId: string): any {
  return (speedTestData as any).results.find(
    (r: any) => r.vpn_id === vpnId
  ) || null;
}

export function getActiveDeals(): any[] {
  return (dealsData as any).deals || [];
}

export function getDealForVPN(vpnId: string): any {
  return getActiveDeals().find((d: any) => d.vpn_id === vpnId) || null;
}

export function getSpeedTestMetadata(): any {
  return {
    test_date: (speedTestData as any).test_date,
    test_server: (speedTestData as any).test_server,
    connection_speed_mbps: (speedTestData as any).connection_speed_mbps,
    test_time: (speedTestData as any).test_time,
    repeat_count: (speedTestData as any).repeat_count,
    methodology: (speedTestData as any).methodology,
  };
}

export function getVPNsForComparison(): { id: string; name: string; slug: string; scores: any }[] {
  return getAllVPNs().map((v) => ({
    id: v.id,
    name: v.name,
    slug: v.slug,
    scores: v.scores,
  }));
}

export function getLastUpdated(): string {
  return (vpnsData as any).last_updated;
}

export function getMethodologyVersion(): string {
  return (vpnsData as any).methodology_version;
}
