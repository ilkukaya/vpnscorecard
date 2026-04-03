#!/usr/bin/env python3
"""
JSON Validation Script
Validates all data/*.json files and checks required fields.

Usage: python scripts/validate_data.py
"""

import json
import os
import sys


def load_json(filepath):
    """Load a JSON file."""
    with open(filepath, "r", encoding="utf-8") as f:
        return json.load(f)


def validate_vpns():
    """Validate vpns.json."""
    filepath = os.path.join("data", "vpns.json")
    data = load_json(filepath)

    required_fields = [
        "id", "name", "slug", "logo", "color_hex", "tagline", "website",
        "headquarters", "is14Eyes", "founded_year", "security", "server_network",
        "speed_tests", "platform_support", "streaming", "scores", "affiliate",
        "pros", "cons", "best_for", "active",
    ]

    errors = []
    vpn_ids = set()

    for vpn in data["vpns"]:
        if vpn["id"] in vpn_ids:
            errors.append(f"Duplicate VPN id: {vpn['id']}")
        vpn_ids.add(vpn["id"])

        for field in required_fields:
            if field not in vpn:
                errors.append(f"VPN {vpn.get('id', 'unknown')} missing field: {field}")

        if "scores" in vpn:
            s = vpn["scores"]
            calculated = (
                s.get("speed", 0) + s.get("privacy", 0) + s.get("ease_of_use", 0)
                + s.get("server_network", 0) + s.get("value", 0) + s.get("streaming", 0)
            )
            if s.get("total") != calculated:
                errors.append(
                    f"VPN {vpn['id']}: score mismatch "
                    f"(calculated: {calculated}, reported: {s.get('total')})"
                )

        if "security" in vpn:
            for sec_field in ["encryption", "protocols", "no_logs_policy", "kill_switch"]:
                if sec_field not in vpn["security"]:
                    errors.append(f"VPN {vpn['id']} security missing: {sec_field}")

    return errors


def validate_pricing():
    """Validate pricing.json."""
    filepath = os.path.join("data", "pricing.json")
    data = load_json(filepath)

    errors = []
    for vpn_id, pricing in data["prices"].items():
        if "currency" not in pricing:
            errors.append(f"Pricing {vpn_id}: currency missing")
        if "monthly" not in pricing and "free_plan" not in pricing:
            errors.append(f"Pricing {vpn_id}: at least one plan required")

    return errors


def validate_speed_tests():
    """Validate speed-tests.json."""
    filepath = os.path.join("data", "speed-tests.json")
    data = load_json(filepath)

    errors = []
    required_fields = [
        "vpn_id", "protocol", "download_mbps", "upload_mbps",
        "ping_ms", "consistency_percent", "rank",
    ]

    for result in data["results"]:
        for field in required_fields:
            if field not in result:
                errors.append(f"Speed test {result.get('vpn_id', 'unknown')} missing: {field}")

    rankings = [r["rank"] for r in data["results"]]
    if rankings != sorted(rankings):
        errors.append("Speed test rankings are inconsistent")

    return errors


def validate_deals():
    """Validate deals.json."""
    filepath = os.path.join("data", "deals.json")
    data = load_json(filepath)

    errors = []
    required_fields = [
        "vpn_id", "title", "description", "discount_percent",
        "monthly_price_usd", "link", "verified_date",
    ]

    for deal in data["deals"]:
        for field in required_fields:
            if field not in deal:
                errors.append(f"Deal {deal.get('vpn_id', 'unknown')} missing: {field}")

    return errors


def validate_server_counts():
    """Validate server-counts.json."""
    filepath = os.path.join("data", "server-counts.json")
    data = load_json(filepath)

    errors = []
    for vpn_id, counts in data["server_counts"].items():
        if "servers" not in counts:
            errors.append(f"Server counts {vpn_id}: servers missing")
        if "countries" not in counts:
            errors.append(f"Server counts {vpn_id}: countries missing")

    return errors


def main():
    print("Validating JSON data files...\n")

    all_errors = []

    validators = [
        ("vpns.json", validate_vpns),
        ("pricing.json", validate_pricing),
        ("speed-tests.json", validate_speed_tests),
        ("deals.json", validate_deals),
        ("server-counts.json", validate_server_counts),
    ]

    for name, validator in validators:
        try:
            errors = validator()
            if errors:
                print(f"FAIL {name}: {len(errors)} error(s)")
                for err in errors:
                    print(f"   - {err}")
                all_errors.extend(errors)
            else:
                print(f"OK   {name}: Valid")
        except FileNotFoundError:
            print(f"FAIL {name}: File not found")
            all_errors.append(f"{name} file not found")
        except json.JSONDecodeError as e:
            print(f"FAIL {name}: JSON parse error: {e}")
            all_errors.append(f"{name} JSON parse error")

    print()
    if all_errors:
        print(f"FAILED: {len(all_errors)} error(s) found!")
        sys.exit(1)
    else:
        print("ALL PASSED: All JSON files are valid!")
        sys.exit(0)


if __name__ == "__main__":
    main()
