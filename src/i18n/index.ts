import en from './en.json';
import es from './es.json';
import tr from './tr.json';

export const languages = {
  en: { label: 'English', flag: '🇺🇸', code: 'en' },
  es: { label: 'Español', flag: '🇪🇸', code: 'es' },
  tr: { label: 'Türkçe', flag: '🇹🇷', code: 'tr' },
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';
export const supportedLangs = Object.keys(languages) as Lang[];

const translations: Record<Lang, any> = { en, es, tr };

export function t(lang: Lang, key: string, params?: Record<string, string | number>): string {
  const keys = key.split('.');
  let value: any = translations[lang];

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Fallback to English
      value = translations.en;
      for (const fk of keys) {
        if (value && typeof value === 'object' && fk in value) {
          value = value[fk];
        } else {
          return key; // Return key if not found
        }
      }
      break;
    }
  }

  if (typeof value !== 'string') return key;

  if (params) {
    return Object.entries(params).reduce(
      (str, [k, v]) => str.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v)),
      value
    );
  }

  return value;
}

export function getLangFromUrl(url: URL): Lang {
  const [, langOrPage] = url.pathname.split('/');
  if (langOrPage && langOrPage in languages && langOrPage !== 'en') {
    return langOrPage as Lang;
  }
  return defaultLang;
}

export function getLocalizedPath(path: string, lang: Lang): string {
  // Remove any existing lang prefix
  const cleanPath = path.replace(/^\/(en|es|tr)/, '') || '/';
  if (lang === defaultLang) return cleanPath;
  return `/${lang}${cleanPath}`;
}

export function getAlternateLinks(currentPath: string): { lang: Lang; href: string }[] {
  const cleanPath = currentPath.replace(/^\/(en|es|tr)/, '') || '/';
  return supportedLangs.map(lang => ({
    lang,
    href: lang === defaultLang ? cleanPath : `/${lang}${cleanPath}`,
  }));
}

// VPN data translations - pros, cons, and taglines in each language
export const vpnTranslations: Record<string, Record<Lang, { tagline: string; pros: string[]; cons: string[] }>> = {
  nordvpn: {
    en: {
      tagline: "The fastest and most reliable VPN",
      pros: [
        "Independently audited no-logs policy (Deloitte)",
        "Fastest VPN with NordLynx protocol",
        "6,400+ servers in 111 countries",
        "Threat Protection blocks ads and malware",
        "10 simultaneous connections"
      ],
      cons: [
        "Router app setup is complex",
        "No RAM-only server infrastructure yet",
        "Slightly more expensive than budget options"
      ]
    },
    es: {
      tagline: "El VPN más rápido y confiable",
      pros: [
        "Política de no registros auditada independientemente (Deloitte)",
        "El VPN más rápido con protocolo NordLynx",
        "6.400+ servidores en 111 países",
        "Threat Protection bloquea anuncios y malware",
        "10 conexiones simultáneas"
      ],
      cons: [
        "La configuración del router es compleja",
        "Aún no tiene infraestructura de servidores solo RAM",
        "Un poco más caro que las opciones económicas"
      ]
    },
    tr: {
      tagline: "En hızlı ve en güvenilir VPN",
      pros: [
        "Bağımsız denetimli no-logs politikası (Deloitte)",
        "NordLynx ile piyasanın en hızlı VPN'i",
        "111 ülkede 6.400+ sunucu",
        "Threat Protection ile reklam ve malware engelleme",
        "10 eş zamanlı bağlantı hakkı"
      ],
      cons: [
        "Router uygulaması kurulumu karmaşık",
        "RAM-only sunucu altyapısı henüz yok",
        "Bütçe seçeneklerine göre biraz daha pahalı"
      ]
    }
  },
  expressvpn: {
    en: {
      tagline: "World standard in speed and reliability",
      pros: [
        "RAM-only server infrastructure (TrustedServer)",
        "High speed with Lightway protocol",
        "Wide server network in 105 countries",
        "Best router VPN support",
        "KPMG-audited no-logs policy"
      ],
      cons: [
        "One of the most expensive VPNs",
        "No dedicated IP feature",
        "No Double VPN",
        "8 simultaneous connection limit"
      ]
    },
    es: {
      tagline: "Estándar mundial en velocidad y confiabilidad",
      pros: [
        "Infraestructura de servidores solo RAM (TrustedServer)",
        "Alta velocidad con protocolo Lightway",
        "Amplia red de servidores en 105 países",
        "Mejor soporte VPN para router",
        "Política de no registros auditada por KPMG"
      ],
      cons: [
        "Uno de los VPN más caros",
        "Sin función de IP dedicada",
        "Sin Double VPN",
        "Límite de 8 conexiones simultáneas"
      ]
    },
    tr: {
      tagline: "Hız ve güvenilirlikte dünya standardı",
      pros: [
        "RAM-only sunucu altyapısı (TrustedServer teknolojisi)",
        "Lightway protokolü ile yüksek hız",
        "105 ülkede geniş sunucu ağı",
        "En iyi router VPN desteği",
        "KPMG bağımsız no-logs denetimi"
      ],
      cons: [
        "Piyasanın en pahalı VPN'lerinden",
        "Dedicated IP özelliği yok",
        "Double VPN yok",
        "8 eş zamanlı bağlantı limiti"
      ]
    }
  },
  surfshark: {
    en: {
      tagline: "Unlimited devices, unlimited freedom",
      pros: [
        "Unlimited simultaneous device connections",
        "Best price-performance ratio on the market",
        "Nexus technology with IP rotation",
        "Deloitte-audited no-logs policy",
        "CleanWeb ad blocker included"
      ],
      cons: [
        "Based in Netherlands (14 Eyes country)",
        "No RAM-only server infrastructure",
        "Fewer servers compared to NordVPN"
      ]
    },
    es: {
      tagline: "Dispositivos ilimitados, libertad ilimitada",
      pros: [
        "Conexiones simultáneas ilimitadas",
        "Mejor relación precio-rendimiento del mercado",
        "Tecnología Nexus con rotación de IP",
        "Política de no registros auditada por Deloitte",
        "Bloqueador de anuncios CleanWeb incluido"
      ],
      cons: [
        "Con sede en Países Bajos (país de 14 Eyes)",
        "Sin infraestructura de servidores solo RAM",
        "Menos servidores comparado con NordVPN"
      ]
    },
    tr: {
      tagline: "Sınırsız cihaz, sınırsız özgürlük",
      pros: [
        "Sınırsız eş zamanlı cihaz bağlantısı",
        "Fiyat/performans oranında piyasanın en iyisi",
        "Nexus teknolojisi ile IP rotasyonu",
        "Deloitte bağımsız no-logs denetimi",
        "CleanWeb ile reklam engelleme"
      ],
      cons: [
        "Hollanda merkezli (14 Eyes ülkesi)",
        "RAM-only sunucu altyapısı yok",
        "NordVPN'e kıyasla daha az sunucu"
      ]
    }
  }
};
