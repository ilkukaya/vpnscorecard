import vpnsData from '../../data/vpns.json';
import pricingData from '../../data/pricing.json';
import speedTestData from '../../data/speed-tests.json';
import dealsData from '../../data/deals.json';

export interface VPN {
  id: string;
  ad: string;
  slug: string;
  logo: string;
  renk_hex: string;
  tagline: string;
  website: string;
  kurucu_ulke: string;
  is14Eyes: boolean;
  kurulus_yili: number;
  guvenlik: any;
  sunucu_agi: any;
  hiz_testleri: any;
  platform_destegi: any;
  streaming: any;
  musteri_hizmeti: any;
  puanlar: any;
  affiliate: any;
  artilari: string[];
  eksileri: string[];
  en_iyi_icin: string[];
  onerilen_plan: string;
  aktif: boolean;
  ucretsiz_plan?: any;
}

export function getAllVPNs(): VPN[] {
  return (vpnsData as any).vpnler.filter((v: VPN) => v.aktif);
}

export function getVPNBySlug(slug: string): VPN | undefined {
  return (vpnsData as any).vpnler.find((v: VPN) => v.slug === slug);
}

export function getVPNById(id: string): VPN | undefined {
  return (vpnsData as any).vpnler.find((v: VPN) => v.id === id);
}

export function getRankedVPNs(): VPN[] {
  return getAllVPNs().sort((a, b) => b.puanlar.toplam - a.puanlar.toplam);
}

export function getVPNsByUseCase(useCase: string): VPN[] {
  return getAllVPNs()
    .filter((v) => v.en_iyi_icin.includes(useCase))
    .sort((a, b) => b.puanlar.toplam - a.puanlar.toplam);
}

export function getStreamingVPNs(): VPN[] {
  return getAllVPNs()
    .filter((v) => {
      const s = v.streaming;
      return s && (s.netflix_us || s.disney_plus);
    })
    .sort((a, b) => b.puanlar.streaming - a.puanlar.streaming);
}

export function getPrivacyVPNs(): VPN[] {
  return getAllVPNs()
    .filter((v) => v.guvenlik.no_logs_bagimsiz_denetim)
    .sort((a, b) => b.puanlar.gizlilik - a.puanlar.gizlilik);
}

export function getBudgetVPNs(): VPN[] {
  const prices = (pricingData as any).fiyatlar;
  return getAllVPNs()
    .map((vpn) => {
      const pricing = prices[vpn.id];
      let monthlyPrice = Infinity;
      if (pricing) {
        if (pricing['2yil_plan']) monthlyPrice = pricing['2yil_plan'].fiyat;
        else if (pricing['1yil_plan']) monthlyPrice = pricing['1yil_plan'].fiyat;
        else if (pricing['aylik_plan']) monthlyPrice = pricing['aylik_plan'].fiyat;
      }
      return { ...vpn, _monthlyPrice: monthlyPrice };
    })
    .sort((a, b) => (a as any)._monthlyPrice - (b as any)._monthlyPrice) as VPN[];
}

export function getTorrentVPNs(): VPN[] {
  return getAllVPNs()
    .filter((v) => v.sunucu_agi.p2p_sunucu)
    .sort((a, b) => b.puanlar.hiz - a.puanlar.hiz);
}

export function getPricing(vpnId: string): any {
  return (pricingData as any).fiyatlar[vpnId] || null;
}

export function getSpeedTestResult(vpnId: string): any {
  return (speedTestData as any).sonuclar.find(
    (r: any) => r.vpn_id === vpnId
  ) || null;
}

export function getActiveDeals(): any[] {
  return (dealsData as any).kampanyalar || [];
}

export function getDealForVPN(vpnId: string): any {
  return getActiveDeals().find((d: any) => d.vpn_id === vpnId) || null;
}

export function getSpeedTestMetadata(): any {
  return {
    test_tarihi: (speedTestData as any).test_tarihi,
    test_sunucusu: (speedTestData as any).test_sunucusu,
    baglanti_hizi_mbps: (speedTestData as any).baglanti_hizi_mbps,
    test_saati: (speedTestData as any).test_saati,
    tekrar_sayisi: (speedTestData as any).tekrar_sayisi,
    metodoloji_versiyon: (speedTestData as any).test_metodolojisi,
  };
}

export function getVPNsForComparison(): { id: string; ad: string; slug: string; puanlar: any }[] {
  return getAllVPNs().map((v) => ({
    id: v.id,
    ad: v.ad,
    slug: v.slug,
    puanlar: v.puanlar,
  }));
}

export function getSonGuncelleme(): string {
  return (vpnsData as any).son_guncelleme;
}

export function getMetodolojiVersion(): string {
  return (vpnsData as any).test_metodolojisi_versiyon;
}
