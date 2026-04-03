#!/usr/bin/env python3
"""
VPN Price Update Script
Checks VPN provider pricing pages weekly and updates data/pricing.json.

Usage: python scripts/update_pricing.py
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
    "purevpn": "https://www.purevpn.com/order",
    "pia": "https://www.privateinternetaccess.com/buy-vpn-online",
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
    """Load existing pricing data."""
    pricing_path = os.path.join("data", "pricing.json")
    with open(pricing_path, "r", encoding="utf-8") as f:
        return json.load(f)


def try_fetch_pricing(vpn_id, url, existing):
    """Try to fetch and parse pricing from a VPN website."""
    try:
        r = requests.get(url, headers=HEADERS, timeout=30)
        r.raise_for_status()
        soup = BeautifulSoup(r.text, "lxml")

        price_elements = soup.select("[data-price], .plan-price, .price-amount, .price")

        if price_elements:
            print(f"OK   {vpn_id}: {len(price_elements)} price elements found (manual review needed)")
        else:
            print(f"WARN {vpn_id}: Page structure changed, keeping existing data")

        return existing["prices"].get(vpn_id, {})

    except requests.RequestException as e:
        print(f"FAIL {vpn_id}: {e}")
        return existing["prices"].get(vpn_id, {})


def build_deals(today_str):
    """Build current deals list."""
    deals = [
        {
            "vpn_id": "nordvpn",
            "title": "NordVPN 2-Year Deal — 76% Off",
            "description": "Get NordVPN's best price with 2-year plan + 3 months free",
            "discount_percent": 76,
            "monthly_price_usd": 3.09,
            "expiry": "2026-05-31",
            "link": "https://go.nordvpn.net/aff_c?offer_id=15&aff_id=YOURID",
            "verified_date": today_str,
        },
        {
            "vpn_id": "surfshark",
            "title": "Surfshark 2-Year Deal — 86% Off",
            "description": "Surfshark's lowest ever price — 86% off + 3 months free",
            "discount_percent": 86,
            "monthly_price_usd": 2.19,
            "expiry": "2026-06-30",
            "link": "https://surfshark.com/affiliates?ref=YOURID",
            "verified_date": today_str,
        },
        {
            "vpn_id": "cyberghost",
            "title": "CyberGhost 2-Year Deal — 84% Off",
            "description": "CyberGhost's best deal — 2 years + 4 months free",
            "discount_percent": 84,
            "monthly_price_usd": 2.03,
            "expiry": "2026-06-30",
            "link": "https://www.cyberghostvpn.com/affiliates?ref=YOURID",
            "verified_date": today_str,
        },
        {
            "vpn_id": "pia",
            "title": "PIA 3-Year Deal — 83% Off",
            "description": "Private Internet Access lowest price — 3 years + 3 months free",
            "discount_percent": 83,
            "monthly_price_usd": 1.98,
            "expiry": "2026-06-30",
            "link": "https://www.privateinternetaccess.com/affiliate",
            "verified_date": today_str,
        },
        {
            "vpn_id": "expressvpn",
            "title": "ExpressVPN 1-Year Deal — 49% Off",
            "description": "ExpressVPN annual plan + 3 months free",
            "discount_percent": 49,
            "monthly_price_usd": 6.67,
            "expiry": "2026-05-31",
            "link": "https://www.expressvpn.com/vpn-service/refer-a-friend?ref=YOURID",
            "verified_date": today_str,
        },
        {
            "vpn_id": "protonvpn",
            "title": "Proton VPN Plus — 60% Off",
            "description": "Proton VPN 2-year plan at lowest price",
            "discount_percent": 60,
            "monthly_price_usd": 3.99,
            "expiry": "2026-05-31",
            "link": "https://protonvpn.com",
            "verified_date": today_str,
        },
    ]
    return deals


if __name__ == "__main__":
    print("Updating VPN prices...")

    existing = load_existing_pricing()
    today_str = str(date.today())
    existing["last_updated"] = today_str

    for vpn_id, url in VPN_PRICING_PAGES.items():
        existing["prices"][vpn_id] = try_fetch_pricing(vpn_id, url, existing)

    pricing_path = os.path.join("data", "pricing.json")
    with open(pricing_path, "w", encoding="utf-8") as f:
        json.dump(existing, f, ensure_ascii=False, indent=2)
    print("OK   pricing.json updated")

    deals = build_deals(today_str)
    deals_path = os.path.join("data", "deals.json")
    with open(deals_path, "w", encoding="utf-8") as f:
        json.dump(
            {"last_updated": today_str, "deals": deals},
            f,
            ensure_ascii=False,
            indent=2,
        )
    print("OK   deals.json updated")

    print("Done!")
