#!/usr/bin/env python3
"""Validates data/*.json and translation files. Run: python3 scripts/validate_data.py"""
import json, os, sys, glob, datetime

errors, warnings = [], []
def load(p):
    with open(p, encoding="utf-8") as f:
        return json.load(f)

vpns = load("data/vpns.json")["vpns"]
pricing = load("data/pricing.json")
aff = load("data/affiliates.json")
legal = load("data/vpn-legality.json")

ids = set()
for v in vpns:
    if v["id"] in ids: errors.append(f"duplicate id {v['id']}")
    ids.add(v["id"])
    s = v["scores"]
    total = sum(s[k] for k in ["speed", "privacy", "ease_of_use", "server_network", "value", "streaming"])
    if total != s["total"]: errors.append(f"{v['id']}: score parts sum to {total}, total says {s['total']}")
    for k, mx in [("speed", 25), ("privacy", 25), ("ease_of_use", 15), ("server_network", 15), ("value", 15), ("streaming", 5)]:
        if not 0 <= s[k] <= mx: errors.append(f"{v['id']}: {k}={s[k]} outside 0..{mx}")
    if v["id"] not in pricing["prices"]: warnings.append(f"{v['id']}: no pricing")
    if v["id"] not in aff: errors.append(f"{v['id']}: missing in affiliates.json")
    if not v["website"].startswith("https://"): errors.append(f"{v['id']}: website must be https")
    u = (aff.get(v["id"]) or {}).get("url", "")
    if u and not u.startswith("https://"): errors.append(f"{v['id']}: affiliate url must be https")

en_copy = load("src/i18n/vpn/en.json")
for f in glob.glob("src/i18n/vpn/*.json"):
    c = load(f)
    for i in ids:
        if i not in c: errors.append(f"{f}: missing {i}")

def keys(o, p=""):
    if isinstance(o, dict):
        for k, v in o.items(): yield from keys(v, f"{p}.{k}" if p else k)
    else:
        yield p
en_keys = set(keys(load("src/i18n/ui/en.json")))
for f in glob.glob("src/i18n/ui/*.json"):
    missing = en_keys - set(keys(load(f)))
    if missing: warnings.append(f"{f}: {len(missing)} keys missing (English fallback used), e.g. {sorted(missing)[:3]}")

for c in legal["countries"]:
    if c["status"] not in ("legal", "restricted", "banned"): errors.append(f"legality {c['code']}: bad status")

age = (datetime.date.today() - datetime.date.fromisoformat(pricing["last_updated"])).days
if age > 120: warnings.append(f"pricing.json is {age} days old — please re-check prices")

for w in warnings: print("WARN ", w)
for e in errors: print("ERROR", e)
print(f"{len(vpns)} VPNs checked: {len(errors)} errors, {len(warnings)} warnings")
sys.exit(1 if errors else 0)
