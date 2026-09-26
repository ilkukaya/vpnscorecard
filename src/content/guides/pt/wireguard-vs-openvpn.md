---
title: "WireGuard vs OpenVPN: qual protocolo de VPN usar?"
description: "WireGuard e OpenVPN comparados em velocidade, segurança, privacidade e compatibilidade — e qual opção escolher no app da sua VPN."
summary: "Para a maioria das pessoas, o WireGuard (ou o protocolo baseado nele de um provedor, como o NordLynx) é a melhor escolha: é mais rápido, usa criptografia moderna e reconecta rapidamente no celular. O OpenVPN é mais antigo e mais lento, mas extremamente bem testado, e pode se disfarçar de tráfego HTTPS comum em redes restritivas. Use o WireGuard por padrão e mude para o OpenVPN (TCP) só se uma rede bloquear o WireGuard."
date: "2026-03-01"
updated: "2026-09-26"
category: technical
readTime: 6
faq:
  - q: "O WireGuard é seguro?"
    a: "Sim. O WireGuard usa criptografia moderna e bem revisada (como ChaCha20 e Curve25519) e tem uma base de código muito pequena, o que facilita a auditoria."
  - q: "O WireGuard armazena meu endereço IP?"
    a: "O WireGuard padrão mantém o último IP de um peer conectado na memória do servidor. Bons provedores de VPN contornam isso, por exemplo, com NAT duplo ou apagando os dados depois que você se desconecta."
  - q: "E o IKEv2 ou o Lightway?"
    a: "O IKEv2 é rápido e estável no celular, principalmente no iPhone. O Lightway é o protocolo moderno e de código aberto da ExpressVPN, com objetivos parecidos com os do WireGuard. Ambos são boas escolhas."
---

Um **protocolo de VPN** é o conjunto de regras que o app da sua VPN usa para montar o túnel criptografado. A maioria dos apps permite escolher, e essa escolha afeta a velocidade, a duração da bateria e a confiabilidade.

## WireGuard em resumo

O WireGuard é o padrão moderno. Seu código é minúsculo em comparação com protocolos mais antigos — alguns milhares de linhas contra centenas de milhares —, o que facilita a auditoria e reduz a chance de esconder bugs.

- **Velocidade:** geralmente a opção mais rápida, com baixa latência.
- **Segurança:** criptografia moderna, sem opções legadas fracas.
- **Celular:** reconecta quase instantaneamente quando você alterna entre Wi-Fi e dados móveis.
- **Ressalva de privacidade:** provedores confiáveis adicionam sistemas próprios para que seu endereço IP não fique guardado no servidor — o NordLynx, da NordVPN, é um exemplo.

## OpenVPN em resumo

O OpenVPN é o “burro de carga” do setor há cerca de duas décadas.

- **Velocidade:** perceptivelmente mais lento que o WireGuard na maioria das conexões.
- **Segurança:** muito maduro e amplamente auditado quando bem configurado.
- **Flexibilidade:** pode rodar pela porta TCP 443, que parece tráfego web seguro comum, então funciona em redes que bloqueiam outros tipos de tráfego de VPN.

## Lado a lado

| | WireGuard | OpenVPN |
|---|---|---|
| Velocidade | Muito rápido | Moderada |
| Tamanho do código | Muito pequeno | Grande |
| Reconexão no celular | Instantânea | Mais lenta |
| Funciona em redes restritivas | Às vezes é bloqueado | Bem (TCP 443) |
| Maturidade | Mais novo (2020 no Linux) | Muito maduro |

## Qual você deve escolher?

1. **Use o WireGuard** (ou o protocolo baseado nele do seu provedor) por padrão.
2. **Mude para o OpenVPN TCP** se a rede de um hotel, escola ou escritório bloquear sua VPN — e apenas onde você tiver permissão para usar uma.
3. **Experimente o IKEv2** no iPhone se precisar de estabilidade máxima ao alternar entre redes.

A linha “Protocolo mais rápido” nas nossas [tabelas de comparação](/compare/) mostra qual protocolo moderno cada provedor oferece.
