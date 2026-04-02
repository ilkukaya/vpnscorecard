#!/usr/bin/env python3
"""
Sunucu Sayısı Kontrol Scripti
VPN sağlayıcılarının API'lerinden veya web sayfalarından güncel sunucu sayılarını çeker.

Kullanım: python scripts/check_server_counts.py
"""

import requests
from bs4 import BeautifulSoup
import json
import os
from datetime import date

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (compatible; VPNScorecard/1.0; "
        "+https://vpnscorecard.com/methodology)"
    ),
    "Accept-Language": "en-US,en;q=0.9",
}

VPN_SERVER_PAGES = {
    "nordvpn": "https://nordvpn.com/servers/",
    "expressvpn": "https://www.expressvpn.com/vpn-server-locations",
    "surfshark": "https://surfshark.com/server-locations",
    "cyberghost": "https://www.cyberghostvpn.com/en_US/server-list.html",
    "protonvpn": "https://protonvpn.com/vpn-servers",
    "pia": "https://www.privateinternetaccess.com/vpn-servers",
    "ipvanish": "https://www.ipvanish.com/server-locations/",
    "mullvad": "https://mullvad.net/servers",
}


def load_existing():
    filepath = os.path.join("data", "server-counts.json")
    with open(filepath, "r", encoding="utf-8") as f:
        return json.load(f)


def check_nordvpn():
    try:
        r = requests.get(VPN_SERVER_PAGES["nordvpn"], headers=HEADERS, timeout=15)
        r.raise_for_status()
        soup = BeautifulSoup(r.text, "lxml")
        stats = soup.select_one("[data-servers], .server-count")
        if stats:
            return int(stats.text.strip().replace(",", ""))
    except Exception as e:
        print(f"⚠️ NordVPN: {e}")
    return None


def check_expressvpn():
    try:
        r = requests.get(VPN_SERVER_PAGES["expressvpn"], headers=HEADERS, timeout=15)
        r.raise_for_status()
        soup = BeautifulSoup(r.text, "lxml")
        stats = soup.select_one("[data-servers], .server-count")
        if stats:
            return int(stats.text.strip().replace(",", ""))
    except Exception as e:
        print(f"⚠️ ExpressVPN: {e}")
    return None


def check_surfshark():
    try:
        r = requests.get(VPN_SERVER_PAGES["surfshark"], headers=HEADERS, timeout=15)
        r.raise_for_status()
        soup = BeautifulSoup(r.text, "lxml")
        stats = soup.select_one("[data-servers], .server-count")
        if stats:
            return int(stats.text.strip().replace(",", ""))
    except Exception as e:
        print(f"⚠️ Surfshark: {e}")
    return None


def main():
    print("🔍 Sunucu sayısı kontrolü başlatıldı...")

    existing = load_existing()
    today = str(date.today())
    existing["son_guncelleme"] = today

    checks = {
        "nordvpn": check_nordvpn,
        "expressvpn": check_expressvpn,
        "surfshark": check_surfshark,
    }

    updated = 0
    for vpn_id, check_func in checks.items():
        count = check_func()
        if count:
            existing["sunucu_sayilari"][vpn_id]["sunucu"] = count
            existing["sunucu_sayilari"][vpn_id]["tarih"] = today
            existing["sunucu_sayilari"][vpn_id]["kaynak"] = "api_check"
            updated += 1
            print(f"✅ {vpn_id}: {count} sunucu")
        else:
            print(f"⚠️ {vpn_id}: Kontrol edilemedi, mevcut veri korundu")

    filepath = os.path.join("data", "server-counts.json")
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(existing, f, ensure_ascii=False, indent=2)

    print(f"\n✅ {updated} VPN güncellendi")
    print("🎉 Sunucu sayısı kontrolü tamamlandı!")


if __name__ == "__main__":
    main()
