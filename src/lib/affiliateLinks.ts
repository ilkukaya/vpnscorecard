export interface AffiliateLinkParams {
  vpnId: string;
  pageType: string;
  linkVariant?: string;
}

export function buildAffiliateLink(
  baseUrl: string,
  params: AffiliateLinkParams
): string {
  const separator = baseUrl.includes('?') ? '&' : '?';
  const utmParams = [
    `utm_source=vpnscorecard`,
    `utm_medium=review`,
    `utm_campaign=${params.vpnId}`,
    `utm_content=${params.pageType}`,
  ].join('&');

  if (params.linkVariant) {
    utmParams.concat(`&utm_variant=${params.linkVariant}`);
  }

  return `${baseUrl}${separator}${utmParams}`;
}

export function getBestAffiliateLink(
  vpn: any,
  pageType: string
): string {
  if (!vpn.affiliate) return vpn.website || '#';

  const affiliate = vpn.affiliate;

  let baseUrl: string;
  if (vpn.id === 'nordvpn' && affiliate.link_2yil) {
    baseUrl = affiliate.link_2yil;
  } else if (affiliate.link_ana) {
    baseUrl = affiliate.link_ana;
  } else if (affiliate.link_1yil) {
    baseUrl = affiliate.link_1yil;
  } else {
    return vpn.website || '#';
  }

  return buildAffiliateLink(baseUrl, {
    vpnId: vpn.id,
    pageType,
  });
}

export function getCTAText(vpn: any, context: string = 'default'): string {
  const pricing = vpn.pricingData;
  if (!pricing) return `Visit ${vpn.ad}`;

  const bestPlan = pricing['2yil_plan'] || pricing['1yil_plan'] || pricing['aylik_plan'];
  if (!bestPlan) return `Visit ${vpn.ad}`;

  const savings = bestPlan.tasarruf_yuzde;
  if (savings && savings >= 70) {
    return `Get ${vpn.ad} — ${savings}% Off`;
  }
  if (savings && savings >= 50) {
    return `Get ${vpn.ad} — ${savings}% Off`;
  }
  return `Visit ${vpn.ad} →`;
}

export function addNoFollow(attrs: Record<string, string>): Record<string, string> {
  return {
    ...attrs,
    rel: 'nofollow noopener sponsored',
    target: '_blank',
  };
}
