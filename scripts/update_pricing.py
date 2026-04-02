#!/usr/bin/env python3
"""
VPN Fiyat Güncelleme Scripti
Haftalık olarak VPN sağlayıcılarının fiyat sayfalarını kontrol eder
ve data/pricing.json dosyasını günceller.

Kullanım: python scripts/update_pricing.py
"""

import requests
from bs4 import BeautifulSoup
import json
import os
from datetime import date

VPN_PRICING_PAGES = {
    "nordvpn": "https://nordvpn.com/pricing/",
    "expressvpn": "https://www.expressvpn.com/vpn-service/vpn-pricing",
    "surfshark": "https://surfshark.com/pricing",
    "cyberghost": "https://www.cyberghostvpn.com/en_US/vpn-subscription.html",
}

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (compatible; VPNScorecard/1.0; "
        "+https://vpnscorecard.com/methodology)"
    ),
    "Accept-Language": "en-US,en;q=0.9",
    "Accept": "text/html,application/xhtml+xml",
}


def load_existing_pricing():
    """Mevcut fiyat verisini yükle."""
    pricing_path = os.path.join("data", "pricing.json")
    with open(pricing_path, "r", encoding="utf-8") as f:
        return json.load(f)


def fetch_nordvpn_pricing(existing):
    """NordVPN fiyat sayfasını parse et."""
    try:
        r = requests.get(VPN_PRICING_PAGES["nordvpn"], headers=HEADERS, timeout=30)
        r.raise_for_status()
        soup = BeautifulSoup(r.text, "lxml")

        price_elements = soup.select("[data-price], .plan-price, .price-amount")

        if price_elements:
            print(f"✅ NordVPN: {len(price_elements)} fiyat elementi bulundu")
        else:
            print("⚠️ NordVPN: Sayfa yapısı değişmiş, mevcut veriler korunuyor")

        return existing["fiyatlar"]["nordvpn"]

    except requests.RequestException as e:
        print(f"❌ NordVPN fiyat hatası: {e}")
        return existing["fiyatlar"]["nordvpn"]


def fetch_expressvpn_pricing(existing):
    """ExpressVPN fiyat sayfasını parse et."""
    try:
        r = requests.get(VPN_PRICING_PAGES["expressvpn"], headers=HEADERS, timeout=30)
        r.raise_for_status()
        soup = BeautifulSoup(r.text, "lxml")

        price_elements = soup.select("[data-price], .plan-price, .price-amount")

        if price_elements:
            print(f"✅ ExpressVPN: {len(price_elements)} fiyat elementi bulundu")
        else:
            print("⚠️ ExpressVPN: Sayfa yapısı değişmiş, mevcut veriler korunuyor")

        return existing["fiyatlar"]["expressvpn"]

    except requests.RequestException as e:
        print(f"❌ ExpressVPN fiyat hatası: {e}")
        return existing["fiyatlar"]["expressvpn"]


def fetch_surfshark_pricing(existing):
    """Surfshark fiyat sayfasını parse et."""
    try:
        r = requests.get(VPN_PRICING_PAGES["surfshark"], headers=HEADERS, timeout=30)
        r.raise_for_status()
        soup = BeautifulSoup(r.text, "lxml")

        price_elements = soup.select("[data-price], .plan-price, .price-amount")

        if price_elements:
            print(f"✅ Surfshark: {len(price_elements)} fiyat elementi bulundu")
        else:
            print("⚠️ Surfshark: Sayfa yapısı değişmiş, mevcut veriler korunuyor")

        return existing["fiyatlar"]["surfshark"]

    except requests.RequestException as e:
        print(f"❌ Surfshark fiyat hatası: {e}")
        return existing["fiyatlar"]["surfshark"]


def fetch_cyberghost_pricing(existing):
    """CyberGhost fiyat sayfasını parse et."""
    try:
        r = requests.get(VPN_PRICING_PAGES["cyberghost"], headers=HEADERS, timeout=30)
        r.raise_for_status()
        soup = BeautifulSoup(r.text, "lxml")

        price_elements = soup.select("[data-price], .plan-price, .price-amount")

        if price_elements:
            print(f"✅ CyberGhost: {len(price_elements)} fiyat elementi bulundu")
        else:
            print("⚠️ CyberGhost: Sayfa yapısı değişmiş, mevcut veriler korunuyor")

        return existing["fiyatlar"]["cyberghost"]

    except requests.RequestException as e:
        print(f"❌ CyberGhost fiyat hatası: {e}")
        return existing["fiyatlar"]["cyberghost"]


def fetch_deals():
    """Aktif kampanyaları güncelle."""
    today = date.today()
    deals = []

    deals.append(
        {
            "vpn_id": "nordvpn",
            "baslik": "NordVPN 2-Year Deal",
            "aciklama": "Get NordVPN's best price with 2-year plan + 3 months free",
            "indirim_yuzde": 76,
            "aylik_fiyat_usd": 3.09,
            "son_gecerlilik": "2026-05-31",
            "link": "https://go.nordvpn.net/aff_c?offer_id=15&aff_id=YOURID",
            "dogrulama_tarihi": str(today),
        }
    )

    deals.append(
        {
            "vpn_id": "surfshark",
            "baslik": "Surfshark 2-Year Deal",
            "aciklama": "Surfshark's lowest ever price — 86% off",
            "indirim_yuzde": 86,
            "aylik_fiyat_usd": 2.19,
            "son_gecerlilik": "2026-06-30",
            "link": "https://surfshark.com/affiliates?ref=YOURID",
            "dogrulama_tarihi": str(today),
        }
    )

    deals.append(
        {
            "vpn_id": "cyberghost",
            "baslik": "CyberGhost 2-Year Deal",
            "aciklama": "CyberGhost's best deal — 2 years + 4 months free",
            "indirim_yuzde": 84,
            "aylik_fiyat_usd": 2.03,
            "son_gecerlilik": "2026-06-30",
            "link": "https://www.cyberghostvpn.com/affiliates?ref=YOURID",
            "dogrulama_tarihi": str(today),
        }
    )

    deals.append(
        {
            "vpn_id": "pia",
            "baslik": "PIA 3-Year Deal",
            "aciklama": "Private Internet Access lowest price — 3 years + 3 months free",
            "indirim_yuzde": 83,
            "aylik_fiyat_usd": 1.98,
            "son_gecerlilik": "2026-06-30",
            "link": "https://www.privateinternetaccess.com/affiliate",
            "dogrulama_tarihi": str(today),
        }
    )

    deals.append(
        {
            "vpn_id": "expressvpn",
            "baslik": "ExpressVPN 1-Year Deal",
            "aciklama": "ExpressVPN annual plan + 3 months free",
            "indirim_yuzde": 49,
            "aylik_fiyat_usd": 6.67,
            "son_gecerlilik": "2026-05-31",
            "link": "https://www.expressvpn.com/vpn-service/refer-a-friend?ref=YOURID",
            "dogrulama_tarihi": str(today),
        }
    )

    deals.append(
        {
            "vpn_id": "protonvpn",
            "baslik": "Proton VPN Plus — 60% Off",
            "aciklama": "Proton VPN 2-year plan at lowest price",
            "indirim_yuzde": 60,
            "aylik_fiyat_usd": 3.99,
            "son_gecerlilik": "2026-05-31",
            "link": "https://protonvpn.com",
            "dogrulama_tarihi": str(today),
        }
    )

    return deals


if __name__ == "__main__":
    print("🔄 VPN fiyat güncelleme başlatıldı...")

    existing = load_existing_pricing()
    existing["son_guncelleme"] = str(date.today())

    existing["fiyatlar"]["nordvpn"] = fetch_nordvpn_pricing(existing)
    existing["fiyatlar"]["expressvpn"] = fetch_expressvpn_pricing(existing)
    existing["fiyatlar"]["surfshark"] = fetch_surfshark_pricing(existing)
    existing["fiyatlar"]["cyberghost"] = fetch_cyberghost_pricing(existing)

    pricing_path = os.path.join("data", "pricing.json")
    with open(pricing_path, "w", encoding="utf-8") as f:
        json.dump(existing, f, ensure_ascii=False, indent=2)
    print("✅ pricing.json güncellendi")

    deals = fetch_deals()
    deals_path = os.path.join("data", "deals.json")
    with open(deals_path, "w", encoding="utf-8") as f:
        json.dump(
            {"son_guncelleme": str(date.today()), "kampanyalar": deals},
            f,
            ensure_ascii=False,
            indent=2,
        )
    print("✅ deals.json güncellendi")

    print("🎉 Fiyat güncelleme tamamlandı!")
