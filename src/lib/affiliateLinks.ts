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
  let utmParams = [
    `utm_source=vpnscorecard`,
    `utm_medium=review`,
    `utm_campaign=${params.vpnId}`,
    `utm_content=${params.pageType}`,
  ].join('&');

  if (params.linkVariant) {
    utmParams += `&utm_variant=${params.linkVariant}`;
  }

  return `${baseUrl}${separator}${utmParams}`;
}

export function getBestAffiliateLink(
  vpn: any,
  pageType: string
): string {
  if (!vpn.affiliate || !vpn.affiliate.program) return vpn.website || '#';

  const affiliate = vpn.affiliate;

  let baseUrl: string;
  if (affiliate.link_2year) {
    baseUrl = affiliate.link_2year;
  } else if (affiliate.link_main) {
    baseUrl = affiliate.link_main;
  } else if (affiliate.link_1year) {
    baseUrl = affiliate.link_1year;
  } else {
    return vpn.website || '#';
  }

  return buildAffiliateLink(baseUrl, {
    vpnId: vpn.id,
    pageType,
  });
}

export function getCTAText(vpn: any, pricing: any, context: string = 'default'): string {
  if (!pricing) return `Visit ${vpn.name}`;

  const bestPlan = pricing.two_year || pricing.yearly || pricing.three_year || pricing.monthly;
  if (!bestPlan) return `Visit ${vpn.name}`;

  const savings = bestPlan.savings_percent;
  if (savings && savings >= 50) {
    return `Get ${vpn.name} — ${savings}% Off`;
  }
  return `Visit ${vpn.name} →`;
}

export function addNoFollow(attrs: Record<string, string>): Record<string, string> {
  return {
    ...attrs,
    rel: 'nofollow noopener sponsored',
    target: '_blank',
  };
}
