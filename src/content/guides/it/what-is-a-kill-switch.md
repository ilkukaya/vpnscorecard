---
title: "Cos'è il kill switch di una VPN e dovresti attivarlo?"
description: "Come funziona il kill switch di una VPN, la differenza tra kill switch a livello di app e di sistema, e come attivarlo."
summary: "Il kill switch di una VPN blocca il traffico internet ogni volta che la connessione VPN cade, così il tuo vero indirizzo IP e il traffico non cifrato non vengono mai esposti. I kill switch a livello di sistema bloccano tutto il traffico; quelli a livello di app chiudono solo le app selezionate. Dovresti attivarlo, soprattutto sul Wi-Fi pubblico o quando la privacy è importante."
date: "2026-01-25"
updated: "2026-09-26"
category: technical
readTime: 5
faq:
  - q: "Il kill switch rallenta la connessione internet?"
    a: "No. Non fa nulla mentre la VPN è connessa. Blocca il traffico solo nei secondi in cui la VPN si riconnette."
  - q: "Perché non riesco a navigare dopo aver attivato il kill switch?"
    a: "Probabilmente la VPN è disconnessa e il kill switch sta bloccando il traffico, come previsto. Riconnetti la VPN o disattiva temporaneamente il kill switch."
  - q: "Gli iPhone hanno un kill switch?"
    a: "La maggior parte delle app VPN offre su iOS un kill switch o un'opzione «includi tutte le reti». Anche Android ha un'impostazione di sistema chiamata «Blocca connessioni senza VPN»."
---

Le connessioni VPN a volte cadono: quando cambi rete, quando il portatile si riattiva dalla sospensione o quando un server si riavvia. Per qualche secondo il tuo dispositivo potrebbe tornare alla normale connessione non cifrata. Un **kill switch** lo impedisce.

## Come funziona

Il kill switch controlla la connessione VPN. Se il tunnel cade, blocca immediatamente il traffico internet finché la VPN non si riconnette. Nulla lascia il tuo dispositivo al di fuori del tunnel.

## Tipi di kill switch

- **Kill switch a livello di sistema (rete):** blocca tutto il traffico internet quando la VPN si disconnette. È l'opzione più sicura.
- **Kill switch a livello di app:** chiude o blocca solo le app che scegli, come un browser o un client P2P.
- **Modalità sempre attiva / permanente:** blocca l'accesso a internet ogni volta che la VPN non è connessa, anche prima che tu apra l'app.

## Quando è più importante

- Sul Wi-Fi pubblico, dove una disconnessione potrebbe esporre traffico non cifrato.
- Quando ti affidi alla VPN per proteggere la tua privacy dal provider internet.
- Durante il file sharing P2P, in cui il tuo IP è visibile agli altri.

## Come attivarlo

- **Windows/Mac:** impostazioni dell'app VPN → Kill switch → Attivo.
- **Android:** Impostazioni → Rete → VPN → la tua VPN → attiva *VPN sempre attiva* e *Blocca connessioni senza VPN*.
- **iPhone/iPad:** nell'app VPN, attiva il kill switch o l'opzione «includi tutte le reti», se disponibile.

Tutte le VPN ai vertici della nostra [classifica](/) includono un kill switch; le nostre pagine di recensione lo indicano nella sezione dei dati chiave.
