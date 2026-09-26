---
title: "WireGuard vs OpenVPN: welk VPN-protocol moet je gebruiken?"
description: "WireGuard en OpenVPN vergeleken op snelheid, beveiliging, privacy en compatibiliteit — en welke instelling je in je VPN-app kiest."
summary: "Voor de meeste mensen is WireGuard (of een op WireGuard gebaseerd protocol van een aanbieder, zoals NordLynx) de beste keuze: het is sneller, gebruikt moderne cryptografie en maakt op mobiel snel opnieuw verbinding. OpenVPN is ouder en trager, maar zeer grondig getest en kan op restrictieve netwerken worden vermomd als normaal HTTPS-verkeer. Gebruik standaard WireGuard en stap alleen over op OpenVPN (TCP) als een netwerk WireGuard blokkeert."
date: "2026-03-01"
updated: "2026-09-26"
category: technical
readTime: 6
faq:
  - q: "Is WireGuard veilig?"
    a: "Ja. WireGuard gebruikt moderne, goed onderzochte cryptografie (zoals ChaCha20 en Curve25519) en heeft een zeer kleine codebase, waardoor het makkelijker te auditen is."
  - q: "Slaat WireGuard mijn IP-adres op?"
    a: "Standaard WireGuard bewaart het laatste IP van een verbonden peer in het servergeheugen. Goede VPN-aanbieders omzeilen dit, bijvoorbeeld met dubbele NAT of door de gegevens te wissen nadat je de verbinding verbreekt."
  - q: "En IKEv2 of Lightway?"
    a: "IKEv2 is snel en stabiel op mobiel, vooral op de iPhone. Lightway is het moderne opensource-protocol van ExpressVPN, met vergelijkbare doelen als WireGuard. Beide zijn goede keuzes."
---

Een **VPN-protocol** is de set regels die je VPN-app gebruikt om de versleutelde tunnel op te bouwen. In de meeste apps kun je zelf kiezen, en die keuze beïnvloedt snelheid, batterijduur en betrouwbaarheid.

## WireGuard in het kort

WireGuard is de moderne standaard. De code is piepklein vergeleken met oudere protocollen — een paar duizend regels tegenover honderdduizenden — waardoor het makkelijker te auditen is en er minder snel bugs in verborgen zitten.

- **Snelheid:** meestal de snelste optie, met lage latentie.
- **Beveiliging:** moderne cryptografie zonder zwakke verouderde opties.
- **Mobiel:** maakt vrijwel direct opnieuw verbinding als je wisselt tussen wifi en mobiele data.
- **Kanttekening voor privacy:** betrouwbare aanbieders voegen eigen systemen toe zodat je IP-adres niet op de server wordt bewaard — NordLynx van NordVPN is daar een voorbeeld van.

## OpenVPN in het kort

OpenVPN is al zo'n twintig jaar het werkpaard van de branche.

- **Snelheid:** op de meeste verbindingen merkbaar trager dan WireGuard.
- **Beveiliging:** zeer volwassen en uitgebreid geaudit, mits goed geconfigureerd.
- **Flexibiliteit:** kan via TCP-poort 443 draaien, wat eruitziet als normaal beveiligd webverkeer, zodat het werkt op netwerken die ander VPN-verkeer blokkeren.

## Naast elkaar

| | WireGuard | OpenVPN |
|---|---|---|
| Snelheid | Zeer snel | Gemiddeld |
| Omvang code | Zeer klein | Groot |
| Opnieuw verbinden op mobiel | Direct | Langzamer |
| Werkt op restrictieve netwerken | Soms geblokkeerd | Goed (TCP 443) |
| Volwassenheid | Nieuwer (2020 in Linux) | Zeer volwassen |

## Wat moet je kiezen?

1. **Gebruik standaard WireGuard** (of het op WireGuard gebaseerde protocol van je aanbieder).
2. **Stap over op OpenVPN TCP** als een hotel-, school- of kantoornetwerk je VPN blokkeert — en alleen waar je een VPN mag gebruiken.
3. **Probeer IKEv2** op de iPhone als je maximale stabiliteit nodig hebt bij het wisselen tussen netwerken.

De rij ‘Snelste protocol’ in onze [vergelijkingstabellen](/compare/) laat zien welk modern protocol elke aanbieder biedt.
