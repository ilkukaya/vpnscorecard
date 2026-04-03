#!/usr/bin/env python3
"""
Server Count Check Script
Fetches current server counts from VPN provider websites.

Usage: python scripts/check_server_counts.py
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
}


def load_existing():
    filepath = os.path.join("data", "server-counts.json")
    with open(filepath, "r", encoding="utf-8") as f:
        return json.load(f)


def try_fetch_server_count(vpn_id, url):
    """Try to fetch server count from a VPN website."""
    try:
        r = requests.get(url, headers=HEADERS, timeout=15)
        r.raise_for_status()
        soup = BeautifulSoup(r.text, "lxml")
        stats = soup.select_one("[data-servers], .server-count, .servers-number")
        if stats:
            text = stats.text.strip().replace(",", "").replace("+", "")
            return int(text)
    except Exception as e:
        print(f"  WARN {vpn_id}: {e}")
    return None


def main():
    print("Checking server counts...")

    existing = load_existing()
    today = str(date.today())
    existing["last_updated"] = today

    updated = 0
    for vpn_id, url in VPN_SERVER_PAGES.items():
        count = try_fetch_server_count(vpn_id, url)
        if count and vpn_id in existing["server_counts"]:
            existing["server_counts"][vpn_id]["servers"] = count
            existing["server_counts"][vpn_id]["date"] = today
            existing["server_counts"][vpn_id]["source"] = "api_check"
            updated += 1
            print(f"  OK   {vpn_id}: {count} servers")
        else:
            print(f"  SKIP {vpn_id}: Could not fetch, keeping existing data")

    filepath = os.path.join("data", "server-counts.json")
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(existing, f, ensure_ascii=False, indent=2)

    print(f"\n{updated} VPN(s) updated")
    print("Done!")


if __name__ == "__main__":
    main()
