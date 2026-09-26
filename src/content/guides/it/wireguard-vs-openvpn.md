---
title: "WireGuard vs OpenVPN: quale protocollo VPN usare?"
description: "WireGuard e OpenVPN a confronto su velocità, sicurezza, privacy e compatibilità, e quale impostazione scegliere nella tua app VPN."
summary: "Per la maggior parte delle persone, WireGuard (o un protocollo del fornitore basato su WireGuard, come NordLynx) è la scelta migliore: è più veloce, usa una crittografia moderna e si riconnette rapidamente sui dispositivi mobili. OpenVPN è più vecchio e più lento, ma estremamente collaudato e può essere camuffato da normale traffico HTTPS sulle reti restrittive. Usa WireGuard come impostazione predefinita e passa a OpenVPN (TCP) solo se una rete blocca WireGuard."
date: "2026-03-01"
updated: "2026-09-26"
category: technical
readTime: 6
faq:
  - q: "WireGuard è sicuro?"
    a: "Sì. WireGuard usa una crittografia moderna e ampiamente verificata (come ChaCha20 e Curve25519) e ha una base di codice molto ridotta, che lo rende più facile da sottoporre ad audit."
  - q: "WireGuard memorizza il mio indirizzo IP?"
    a: "WireGuard standard conserva nella memoria del server l'ultimo IP di un peer connesso. I buoni fornitori di VPN aggirano il problema, per esempio con il doppio NAT o cancellando i dati dopo la disconnessione."
  - q: "E IKEv2 o Lightway?"
    a: "IKEv2 è veloce e stabile sui dispositivi mobili, soprattutto su iPhone. Lightway è il moderno protocollo open source di ExpressVPN, con obiettivi simili a quelli di WireGuard. Sono entrambe buone scelte."
---

Un **protocollo VPN** è l'insieme di regole che la tua app VPN usa per costruire il tunnel cifrato. La maggior parte delle app ti permette di sceglierlo, e la scelta influisce su velocità, durata della batteria e affidabilità.

## WireGuard in breve

WireGuard è lo standard moderno. Il suo codice è minuscolo rispetto ai protocolli più vecchi (qualche migliaio di righe contro centinaia di migliaia), il che lo rende più facile da verificare e meno incline a nascondere bug.

- **Velocità:** di solito è l'opzione più veloce, con bassa latenza.
- **Sicurezza:** crittografia moderna, senza opzioni obsolete e deboli.
- **Mobile:** si riconnette quasi istantaneamente quando passi dal Wi-Fi ai dati mobili.
- **Avvertenza sulla privacy:** i fornitori affidabili aggiungono i propri sistemi affinché il tuo indirizzo IP non venga conservato sul server; NordLynx di NordVPN ne è un esempio.

## OpenVPN in breve

OpenVPN è il cavallo di battaglia del settore da circa vent'anni.

- **Velocità:** sensibilmente più lento di WireGuard sulla maggior parte delle connessioni.
- **Sicurezza:** molto maturo e ampiamente verificato, se configurato bene.
- **Flessibilità:** può funzionare sulla porta TCP 443, che sembra normale traffico web sicuro, quindi funziona sulle reti che bloccano altro traffico VPN.

## Fianco a fianco

| | WireGuard | OpenVPN |
|---|---|---|
| Velocità | Molto alta | Media |
| Dimensioni del codice | Molto ridotte | Grandi |
| Riconnessione su mobile | Istantanea | Più lenta |
| Funziona sulle reti restrittive | A volte bloccato | Bene (TCP 443) |
| Maturità | Più recente (2020 in Linux) | Molto maturo |

## Quale scegliere?

1. **Usa WireGuard** (o il protocollo del tuo fornitore basato su WireGuard) come impostazione predefinita.
2. **Passa a OpenVPN TCP** se la rete di un hotel, di una scuola o di un ufficio blocca la tua VPN, e solo dove ti è consentito usarne una.
3. **Prova IKEv2** su iPhone se ti serve la massima stabilità quando ti sposti tra reti diverse.

La riga «protocollo più veloce» nelle nostre [tabelle di confronto](/compare/) indica quale protocollo moderno offre ciascun fornitore.
