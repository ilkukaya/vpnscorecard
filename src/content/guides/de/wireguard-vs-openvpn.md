---
title: "WireGuard vs. OpenVPN: Welches VPN-Protokoll sollten Sie nutzen?"
description: "WireGuard und OpenVPN im Vergleich: Tempo, Sicherheit, Datenschutz und Kompatibilität – und welche Einstellung Sie in Ihrer VPN-App wählen sollten."
summary: "Für die meisten Menschen ist WireGuard (oder ein WireGuard-basiertes Protokoll eines Anbieters wie NordLynx) die beste Wahl: Es ist schneller, nutzt moderne Kryptografie und verbindet sich auf Mobilgeräten schnell neu. OpenVPN ist älter und langsamer, aber äußerst gut erprobt und lässt sich in restriktiven Netzwerken als normaler HTTPS-Datenverkehr tarnen. Nutzen Sie standardmäßig WireGuard und wechseln Sie nur zu OpenVPN (TCP), wenn ein Netzwerk WireGuard blockiert."
date: "2026-03-01"
updated: "2026-09-26"
category: technical
readTime: 6
faq:
  - q: "Ist WireGuard sicher?"
    a: "Ja. WireGuard nutzt moderne, gut geprüfte Kryptografie (etwa ChaCha20 und Curve25519) und hat eine sehr kleine Codebasis, was die Prüfung erleichtert."
  - q: "Speichert WireGuard meine IP-Adresse?"
    a: "Standard-WireGuard hält die letzte IP eines verbundenen Peers im Arbeitsspeicher des Servers. Gute VPN-Anbieter umgehen das, zum Beispiel mit doppeltem NAT oder indem sie die Daten nach dem Trennen löschen."
  - q: "Was ist mit IKEv2 oder Lightway?"
    a: "IKEv2 ist auf Mobilgeräten schnell und stabil, besonders auf dem iPhone. Lightway ist das moderne Open-Source-Protokoll von ExpressVPN mit ähnlichen Zielen wie WireGuard. Beide sind eine gute Wahl."
---

Ein **VPN-Protokoll** ist das Regelwerk, mit dem Ihre VPN-App ihren verschlüsselten Tunnel aufbaut. Bei den meisten Apps können Sie wählen, und die Wahl beeinflusst Geschwindigkeit, Akkulaufzeit und Zuverlässigkeit.

## WireGuard im Überblick

WireGuard ist der moderne Standard. Sein Code ist im Vergleich zu älteren Protokollen winzig – einige Tausend Zeilen gegenüber Hunderttausenden –, was ihn leichter prüfbar macht und die Wahrscheinlichkeit versteckter Fehler senkt.

- **Geschwindigkeit:** meist die schnellste Option, mit geringer Latenz.
- **Sicherheit:** moderne Kryptografie ohne schwache Altlasten-Optionen.
- **Mobil:** verbindet sich fast sofort neu, wenn Sie zwischen WLAN und mobilen Daten wechseln.
- **Datenschutz-Hinweis:** Seriöse Anbieter ergänzen eigene Systeme, damit Ihre IP-Adresse nicht auf dem Server gespeichert bleibt – NordLynx von NordVPN ist ein Beispiel.

## OpenVPN im Überblick

OpenVPN ist seit rund zwei Jahrzehnten das Arbeitspferd der Branche.

- **Geschwindigkeit:** bei den meisten Verbindungen spürbar langsamer als WireGuard.
- **Sicherheit:** sehr ausgereift und bei guter Konfiguration umfassend geprüft.
- **Flexibilität:** kann über TCP-Port 443 laufen, was wie normaler sicherer Webverkehr aussieht – so funktioniert es auch in Netzwerken, die anderen VPN-Datenverkehr blockieren.

## Im direkten Vergleich

| | WireGuard | OpenVPN |
|---|---|---|
| Geschwindigkeit | Sehr schnell | Mittel |
| Codeumfang | Sehr klein | Groß |
| Neuverbindung auf Mobilgeräten | Sofort | Langsamer |
| Funktioniert in restriktiven Netzwerken | Teils blockiert | Gut (TCP 443) |
| Reife | Neuer (2020 in Linux) | Sehr ausgereift |

## Welches sollten Sie wählen?

1. **Nutzen Sie standardmäßig WireGuard** (oder das WireGuard-basierte Protokoll Ihres Anbieters).
2. **Wechseln Sie zu OpenVPN TCP**, wenn ein Hotel-, Schul- oder Büronetzwerk Ihren VPN blockiert – und nur dort, wo Sie einen VPN nutzen dürfen.
3. **Probieren Sie IKEv2** auf dem iPhone, wenn Sie beim Wechsel zwischen Netzwerken maximale Stabilität brauchen.

Die Zeile „Schnellstes Protokoll“ in unseren [Vergleichstabellen](/compare/) zeigt, welches moderne Protokoll jeder Anbieter bietet.
