---
title: "Was ist ein VPN-Kill-Switch und sollten Sie ihn aktivieren?"
description: "Wie ein VPN-Kill-Switch funktioniert, was App- und System-Kill-Switches unterscheidet und wie Sie die Funktion aktivieren."
summary: "Ein VPN-Kill-Switch blockiert Ihren Internetverkehr, sobald die VPN-Verbindung abbricht, sodass Ihre echte IP-Adresse und unverschlüsselter Datenverkehr nie offengelegt werden. Kill Switches auf Systemebene blockieren den gesamten Datenverkehr; solche auf App-Ebene schließen nur ausgewählte Apps. Sie sollten ihn aktivieren, besonders im öffentlichen WLAN oder wenn Ihnen Datenschutz wichtig ist."
date: "2026-01-25"
updated: "2026-09-26"
category: technical
readTime: 5
faq:
  - q: "Macht ein Kill Switch mein Internet langsamer?"
    a: "Nein. Solange der VPN verbunden ist, tut er nichts. Er blockiert den Datenverkehr nur in den Sekunden, in denen sich der VPN neu verbindet."
  - q: "Warum komme ich nach dem Aktivieren des Kill Switch nicht mehr ins Internet?"
    a: "Wahrscheinlich ist der VPN getrennt, und der Kill Switch blockiert den Datenverkehr wie vorgesehen. Verbinden Sie den VPN erneut oder deaktivieren Sie den Kill Switch vorübergehend."
  - q: "Haben iPhones einen Kill Switch?"
    a: "Die meisten VPN-Apps bieten unter iOS einen Kill Switch oder eine Option wie „Alle Netzwerke einbeziehen“. Android hat zudem eine Systemeinstellung namens „Verbindungen ohne VPN blockieren“."
---

VPN-Verbindungen brechen gelegentlich ab – wenn Sie das Netzwerk wechseln, Ihr Laptop aus dem Ruhezustand erwacht oder ein Server neu startet. Für einige Sekunden kann Ihr Gerät dann auf die normale, unverschlüsselte Verbindung zurückfallen. Ein **Kill Switch** verhindert das.

## So funktioniert er

Der Kill Switch überwacht die VPN-Verbindung. Fällt der Tunnel aus, blockiert er sofort den Internetverkehr, bis der VPN wieder verbunden ist. Nichts verlässt Ihr Gerät außerhalb des Tunnels.

## Arten von Kill Switches

- **Kill Switch auf Systemebene (Netzwerk):** blockiert den gesamten Internetverkehr, wenn der VPN die Verbindung verliert. Die sicherste Option.
- **Kill Switch auf App-Ebene:** schließt oder blockiert nur die von Ihnen gewählten Apps, etwa einen Browser oder P2P-Client.
- **Dauerhaft aktiver Modus:** blockiert den Internetzugang immer dann, wenn der VPN nicht verbunden ist – sogar bevor Sie die App öffnen.

## Wann er am wichtigsten ist

- Im öffentlichen WLAN, wo ein Verbindungsabbruch unverschlüsselten Datenverkehr offenlegen könnte.
- Wenn Sie sich auf den VPN verlassen, um Ihre Aktivitäten vor Ihrem Internetanbieter zu schützen.
- Beim P2P-Filesharing, wo Ihre IP für andere sichtbar ist.

## So aktivieren Sie ihn

- **Windows/Mac:** Einstellungen der VPN-App → Kill Switch → An.
- **Android:** Einstellungen → Netzwerk → VPN → Ihr VPN → *Durchgehend aktives VPN* und *Verbindungen ohne VPN blockieren* aktivieren.
- **iPhone/iPad:** Aktivieren Sie in der VPN-App den Kill Switch oder die Option „Alle Netzwerke einbeziehen“, sofern verfügbar.

Alle Top-VPNs in unserem [Ranking](/) haben einen Kill Switch; unsere Bewertungsseiten zeigen ihn im Abschnitt mit den wichtigsten Fakten.
