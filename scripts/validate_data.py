#!/usr/bin/env python3
"""
JSON Doğrulama Scripti
Tüm data/*.json dosyalarını doğrular ve gerekli alanların varlığını kontrol eder.

Kullanım: python scripts/validate_data.py
"""

import json
import os
import sys


def load_json(filepath):
    """JSON dosyasını yükle."""
    with open(filepath, "r", encoding="utf-8") as f:
        return json.load(f)


def validate_vpns():
    """vpns.json doğrulama."""
    filepath = os.path.join("data", "vpns.json")
    data = load_json(filepath)

    required_fields = [
        "id", "ad", "slug", "logo", "renk_hex", "tagline", "website",
        "kurucu_ulke", "is14Eyes", "kurulus_yili", "guvenlik", "sunucu_agi",
        "hiz_testleri", "platform_destegi", "streaming", "puanlar", "affiliate",
        "artilari", "eksileri", "en_iyi_icin", "aktif",
    ]

    errors = []
    vpn_ids = set()

    for vpn in data["vpnler"]:
        if vpn["id"] in vpn_ids:
            errors.append(f"Duplicate VPN id: {vpn['id']}")
        vpn_ids.add(vpn["id"])

        for field in required_fields:
            if field not in vpn:
                errors.append(f"VPN {vpn.get('id', 'unknown')} eksik alan: {field}")

        if "puanlar" in vpn:
            total = sum(vpn["puanlar"].values()) - vpn["puanlar"].get("toplam", 0)
            if vpn["puanlar"].get("toplam") != total:
                errors.append(
                    f"VPN {vpn['id']}: toplam puan uyuşmazlığı "
                    f"(hesaplanan: {total}, bildirilen: {vpn['puanlar']['toplam']})"
                )

        if "guvenlik" in vpn:
            for sec_field in ["sifreleme", "protokoller", "no_logs_politikasi", "kill_switch"]:
                if sec_field not in vpn["guvenlik"]:
                    errors.append(f"VPN {vpn['id']} güvenlik eksik: {sec_field}")

    return errors


def validate_pricing():
    """pricing.json doğrulama."""
    filepath = os.path.join("data", "pricing.json")
    data = load_json(filepath)

    errors = []
    for vpn_id, pricing in data["fiyatlar"].items():
        if "para_birimi" not in pricing:
            errors.append(f"Pricing {vpn_id}: para_birimi eksik")
        if "aylik_plan" not in pricing and "ucretsiz_plan" not in pricing:
            errors.append(f"Pricing {vpn_id}: en az bir plan olmalı")

    return errors


def validate_speed_tests():
    """speed-tests.json doğrulama."""
    filepath = os.path.join("data", "speed-tests.json")
    data = load_json(filepath)

    errors = []
    required_fields = [
        "vpn_id", "protokol", "indirme_mbps", "yukleme_mbps",
        "ping_ms", "tutarlilik_yuzde", "siralamasi",
    ]

    for result in data["sonuclar"]:
        for field in required_fields:
            if field not in result:
                errors.append(f"Speed test {result.get('vpn_id', 'unknown')} eksik: {field}")

    rankings = [r["siralamasi"] for r in data["sonuclar"]]
    if rankings != sorted(rankings):
        errors.append("Speed test sıralaması tutarsız")

    return errors


def validate_deals():
    """deals.json doğrulama."""
    filepath = os.path.join("data", "deals.json")
    data = load_json(filepath)

    errors = []
    required_fields = [
        "vpn_id", "baslik", "aciklama", "indirim_yuzde",
        "aylik_fiyat_usd", "link", "dogrulama_tarihi",
    ]

    for deal in data["kampanyalar"]:
        for field in required_fields:
            if field not in deal:
                errors.append(f"Deal {deal.get('vpn_id', 'unknown')} eksik: {field}")

    return errors


def validate_server_counts():
    """server-counts.json doğrulama."""
    filepath = os.path.join("data", "server-counts.json")
    data = load_json(filepath)

    errors = []
    for vpn_id, counts in data["sunucu_sayilari"].items():
        if "sunucu" not in counts:
            errors.append(f"Server counts {vpn_id}: sunucu eksik")
        if "ulke" not in counts:
            errors.append(f"Server counts {vpn_id}: ulke eksik")

    return errors


def main():
    print("🔍 JSON doğrulama başlatıldı...\n")

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
                print(f"❌ {name}: {len(errors)} hata")
                for err in errors:
                    print(f"   - {err}")
                all_errors.extend(errors)
            else:
                print(f"✅ {name}: Geçerli")
        except FileNotFoundError:
            print(f"❌ {name}: Dosya bulunamadı")
            all_errors.append(f"{name} dosyası bulunamadı")
        except json.JSONDecodeError as e:
            print(f"❌ {name}: JSON parse hatası: {e}")
            all_errors.append(f"{name} JSON parse hatası")

    print()
    if all_errors:
        print(f"❌ Toplam {len(all_errors)} hata bulundu!")
        sys.exit(1)
    else:
        print("✅ Tüm JSON dosyaları geçerli!")
        sys.exit(0)


if __name__ == "__main__":
    main()
