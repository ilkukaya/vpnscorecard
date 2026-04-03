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
    privacy: 'Privacy',
    budget: 'Budget',
    beginners: 'Beginners',
    overall: 'Overall',
    router: 'Router',
    business: 'Business',
    multi_device: 'Multi-Device',
    family: 'Family',
    journalism: 'Journalism',
    free_tier: 'Free Tier',
    advanced: 'Advanced',
    max_privacy: 'Maximum Privacy',
    journalist: 'Journalist',
    activist: 'Activist',
    speed: 'Speed',
    china: 'China/Censorship',
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

export function getBestPrice(pricing: any): { price: number; plan: string; savings?: number } | null {
  if (!pricing) return null;
  if (pricing.three_year) return { price: pricing.three_year.price, plan: '3-year', savings: pricing.three_year.savings_percent };
  if (pricing.two_year) return { price: pricing.two_year.price, plan: '2-year', savings: pricing.two_year.savings_percent };
  if (pricing.five_year) return { price: pricing.five_year.price, plan: '5-year', savings: pricing.five_year.savings_percent };
  if (pricing.yearly) return { price: pricing.yearly.price, plan: '1-year', savings: pricing.yearly.savings_percent };
  if (pricing.six_month) return { price: pricing.six_month.price, plan: '6-month' };
  if (pricing.monthly) return { price: pricing.monthly.price, plan: '1-month' };
  return null;
}
