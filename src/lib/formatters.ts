export function formatPrice(price: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(price);
}

export function formatNumber(num: number): string {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(num >= 10000 ? 0 : 1)}K`;
  }
  return num.toString();
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateShort(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function getUseCaseLabel(useCase: string): string {
  const labels: Record<string, string> = {
    streaming: 'Streaming',
    gaming: 'Gaming',
    torrent: 'Torrenting',
    gizlilik: 'Privacy',
    butce_dostu: 'Budget',
    yeni_baslayanlar: 'Beginners',
    genel_kullanim: 'Overall',
    router_kullanimi: 'Router',
    kurumsal: 'Business',
    cok_cihaz: 'Multi-Device',
    aile: 'Family',
    gazetecilik: 'Journalism',
    ucretsiz_baslangic: 'Free Tier',
    ileri_duzey_kullanici: 'Advanced',
    ileri_duzey_gizlilik: 'Maximum Privacy',
    gazeteci: 'Journalist',
    aktivist: 'Activist',
    hiz: 'Speed',
  };
  return labels[useCase] || useCase;
}

export function getSpeedLabel(mbps: number): string {
  if (mbps >= 800) return 'Excellent';
  if (mbps >= 600) return 'Very Good';
  if (mbps >= 400) return 'Good';
  if (mbps >= 200) return 'Fair';
  return 'Below Average';
}

export function getRankBadge(rank: number): { label: string; color: string; bg: string } {
  if (rank === 1) return { label: '1st', color: 'text-rank-gold', bg: 'bg-yellow-50' };
  if (rank === 2) return { label: '2nd', color: 'text-rank-silver', bg: 'bg-gray-50' };
  if (rank === 3) return { label: '3rd', color: 'text-rank-bronze', bg: 'bg-orange-50' };
  return { label: `#${rank}`, color: 'text-gray-600', bg: 'bg-gray-50' };
}
