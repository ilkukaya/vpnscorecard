export interface VPNScores {
  hiz: number;
  gizlilik: number;
  kullanim_kolayligi: number;
  sunucu_agi: number;
  fiyat_deger: number;
  streaming: number;
}

export interface SpeedTestResult {
  downloadMbps: number;
  uploadMbps: number;
  pingMs: number;
  consistencyPercent: number;
}

export interface VPNData {
  id: string;
  ad: string;
  slug: string;
  noLogsAudited: boolean;
  noLogsClaimed: boolean;
  encryption: string;
  killSwitch: boolean;
  dnsLeakProtection: boolean;
  is14Eyes: boolean;
  speedTest: SpeedTestResult;
}

export function calculateTotalScore(scores: VPNScores): number {
  return Object.values(scores).reduce((a, b) => a + b, 0);
}

export function getScoreLabel(total: number): { label: string; color: string } {
  if (total >= 90) return { label: 'Outstanding', color: '#10B981' };
  if (total >= 80) return { label: 'Excellent', color: '#3B82F6' };
  if (total >= 70) return { label: 'Very Good', color: '#8B5CF6' };
  if (total >= 60) return { label: 'Good', color: '#F59E0B' };
  return { label: 'Average', color: '#EF4444' };
}

export function calculateSpeedScore(
  downloadMbps: number,
  uploadMbps: number,
  pingMs: number,
  consistencyPercent: number
): number {
  const maxDownload = 950;
  const downloadScore = Math.min((downloadMbps / maxDownload) * 12, 12);
  const uploadScore = Math.min((uploadMbps / maxDownload) * 6, 6);
  const pingScore = pingMs < 20 ? 4 : pingMs < 50 ? 3 : pingMs < 100 ? 2 : 1;
  const consistencyScore = (consistencyPercent / 100) * 3;
  return Math.round(downloadScore + uploadScore + pingScore + consistencyScore);
}

export function calculatePrivacyScore(vpn: VPNData): number {
  let score = 0;
  if (vpn.noLogsAudited) score += 10;
  else if (vpn.noLogsClaimed) score += 5;
  if (vpn.encryption === 'AES-256' || vpn.encryption === 'AES-256-GCM') score += 5;
  if (vpn.killSwitch) score += 3;
  if (vpn.dnsLeakProtection) score += 3;
  if (!vpn.is14Eyes) score += 4;
  return Math.min(score, 25);
}

export function formatScoreForDisplay(score: number): string {
  return `${score}/100`;
}

export function getScoreColor(score: number): string {
  if (score >= 90) return 'text-score-excellent';
  if (score >= 80) return 'text-score-great';
  if (score >= 70) return 'text-score-good';
  if (score >= 60) return 'text-score-fair';
  return 'text-score-poor';
}

export function getScoreBgColor(score: number): string {
  if (score >= 90) return 'bg-score-excellent';
  if (score >= 80) return 'bg-score-great';
  if (score >= 70) return 'bg-score-good';
  if (score >= 60) return 'bg-score-fair';
  return 'bg-score-poor';
}
