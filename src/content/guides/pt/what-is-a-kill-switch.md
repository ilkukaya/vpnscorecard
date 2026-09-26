---
title: "O que é kill switch de VPN e por que você deve ativá-lo?"
description: "Como funciona o kill switch de uma VPN, a diferença entre kill switch por app e de sistema, e como ativá-lo."
summary: "O kill switch de uma VPN bloqueia seu tráfego de internet sempre que a conexão da VPN cai, para que seu endereço IP real e o tráfego não criptografado nunca fiquem expostos. O kill switch de sistema bloqueia todo o tráfego; o por app fecha apenas os apps selecionados. Você deve ativá-lo, principalmente em Wi-Fi público ou quando a privacidade importa."
date: "2026-01-25"
updated: "2026-09-26"
category: technical
readTime: 5
faq:
  - q: "O kill switch deixa minha internet mais lenta?"
    a: "Não. Ele não faz nada enquanto a VPN está conectada. Só bloqueia o tráfego durante os segundos em que a VPN se reconecta."
  - q: "Por que não consigo acessar a internet depois de ativar o kill switch?"
    a: "Provavelmente a VPN está desconectada e o kill switch está bloqueando o tráfego, como deveria. Reconecte a VPN ou desative o kill switch temporariamente."
  - q: "O iPhone tem kill switch?"
    a: "A maioria dos apps de VPN oferece um kill switch ou a opção “incluir todas as redes” no iOS. O Android também tem uma configuração de sistema chamada “Bloquear conexões sem VPN”."
---

As conexões de VPN às vezes caem — quando você troca de rede, quando o notebook sai do modo de suspensão ou quando um servidor reinicia. Por alguns segundos, seu dispositivo pode voltar à conexão normal, sem criptografia. O **kill switch** evita isso.

## Como funciona

O kill switch monitora a conexão da VPN. Se o túnel cair, ele bloqueia imediatamente o tráfego de internet até a VPN se reconectar. Nada sai do seu dispositivo fora do túnel.

## Tipos de kill switch

- **Kill switch de sistema (de rede):** bloqueia todo o tráfego de internet quando a VPN desconecta. É a opção mais segura.
- **Kill switch por app:** fecha ou bloqueia apenas os apps que você escolher, como o navegador ou um cliente P2P.
- **Modo sempre ativo / permanente:** bloqueia o acesso à internet sempre que a VPN não está conectada, mesmo antes de você abrir o app.

## Quando ele mais importa

- Em Wi-Fi público, onde uma queda poderia expor tráfego não criptografado.
- Quando você depende da VPN para ter privacidade em relação ao seu provedor de internet.
- Durante o compartilhamento de arquivos P2P, em que seu IP fica visível para outras pessoas.

## Como ativar

- **Windows/Mac:** configurações do app da VPN → Kill switch → Ativado.
- **Android:** Configurações → Rede → VPN → sua VPN → ative *VPN sempre ativa* e *Bloquear conexões sem VPN*.
- **iPhone/iPad:** no app da VPN, ative o kill switch ou a opção “incluir todas as redes”, se disponível.

Todas as principais VPNs do nosso [ranking](/) incluem kill switch; nossas páginas de análise mostram isso na seção de fatos principais.
