---
title: "Qu'est-ce qu'un kill switch VPN et faut-il l'activer ?"
description: "Comment fonctionne le kill switch d'un VPN, la différence entre kill switch au niveau des applications et du système, et comment l'activer."
summary: "Le kill switch d'un VPN bloque votre trafic Internet dès que la connexion VPN tombe, afin que votre véritable adresse IP et votre trafic non chiffré ne soient jamais exposés. Les kill switch au niveau du système bloquent tout le trafic ; ceux au niveau des applications ne ferment que les applications sélectionnées. Vous devriez l'activer, surtout sur un Wi-Fi public ou lorsque la confidentialité compte."
date: "2026-01-25"
updated: "2026-09-26"
category: technical
readTime: 5
faq:
  - q: "Un kill switch ralentit-il ma connexion Internet ?"
    a: "Non. Il n'intervient pas tant que le VPN est connecté. Il ne bloque le trafic que pendant les quelques secondes où le VPN se reconnecte."
  - q: "Pourquoi n'ai-je plus accès à Internet après avoir activé le kill switch ?"
    a: "Le VPN est probablement déconnecté et le kill switch bloque le trafic, comme prévu. Reconnectez le VPN ou désactivez temporairement le kill switch."
  - q: "Les iPhone disposent-ils d'un kill switch ?"
    a: "La plupart des applications VPN proposent un kill switch ou une option « inclure tous les réseaux » sur iOS. Android dispose aussi d'un réglage système appelé « Bloquer les connexions sans VPN »."
---

Les connexions VPN tombent de temps en temps — lorsque vous changez de réseau, lorsque votre ordinateur portable sort de veille ou lorsqu'un serveur redémarre. Pendant quelques secondes, votre appareil peut alors repasser par la connexion normale, non chiffrée. Un **kill switch** l'en empêche.

## Comment il fonctionne

Le kill switch surveille la connexion VPN. Si le tunnel tombe, il bloque immédiatement le trafic Internet jusqu'à ce que le VPN se reconnecte. Rien ne quitte votre appareil en dehors du tunnel.

## Les types de kill switch

- **Kill switch au niveau du système (réseau) :** bloque tout le trafic Internet lorsque le VPN se déconnecte. L'option la plus sûre.
- **Kill switch au niveau des applications :** ferme ou bloque uniquement les applications que vous choisissez, comme un navigateur ou un client P2P.
- **Mode permanent (« always-on ») :** bloque l'accès à Internet chaque fois que le VPN n'est pas connecté, même avant l'ouverture de l'application.

## Quand il est le plus utile

- Sur un Wi-Fi public, où une coupure pourrait exposer du trafic non chiffré.
- Lorsque vous comptez sur le VPN pour préserver votre vie privée vis-à-vis de votre fournisseur d'accès.
- Lors du partage de fichiers en P2P, où votre IP est visible par les autres.

## Comment l'activer

- **Windows/Mac :** paramètres de l'application VPN → Kill switch → Activé.
- **Android :** Paramètres → Réseau → VPN → votre VPN → activez *VPN permanent* et *Bloquer les connexions sans VPN*.
- **iPhone/iPad :** dans l'application VPN, activez le kill switch ou l'option « inclure tous les réseaux » si elle est disponible.

Tous les meilleurs VPN de notre [classement](/) intègrent un kill switch ; nos pages de test l'indiquent dans la section « L'essentiel ».
