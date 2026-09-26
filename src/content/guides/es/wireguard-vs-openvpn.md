---
title: "WireGuard vs OpenVPN: ¿qué protocolo VPN deberías usar?"
description: "WireGuard y OpenVPN comparados en velocidad, seguridad, privacidad y compatibilidad, y qué opción elegir en tu app de VPN."
summary: "Para la mayoría de la gente, WireGuard (o el protocolo basado en WireGuard de un proveedor, como NordLynx) es la mejor opción: es más rápido, usa criptografía moderna y se reconecta enseguida en el móvil. OpenVPN es más antiguo y más lento, pero está muy probado y puede camuflarse como tráfico HTTPS normal en redes restrictivas. Usa WireGuard por defecto y cambia a OpenVPN (TCP) solo si una red bloquea WireGuard."
date: "2026-03-01"
updated: "2026-09-26"
category: technical
readTime: 6
faq:
  - q: "¿Es seguro WireGuard?"
    a: "Sí. WireGuard usa criptografía moderna y bien revisada (como ChaCha20 y Curve25519) y tiene una base de código muy pequeña, lo que facilita auditarlo."
  - q: "¿WireGuard guarda mi dirección IP?"
    a: "WireGuard estándar conserva en la memoria del servidor la última IP de un par conectado. Los buenos proveedores de VPN lo solucionan, por ejemplo con doble NAT o borrando los datos cuando te desconectas."
  - q: "¿Y qué hay de IKEv2 o Lightway?"
    a: "IKEv2 es rápido y estable en el móvil, sobre todo en iPhone. Lightway es el protocolo moderno y de código abierto de ExpressVPN, con objetivos similares a los de WireGuard. Ambos son buenas opciones."
---

Un **protocolo VPN** es el conjunto de reglas que usa tu app de VPN para crear su túnel cifrado. La mayoría de las apps te permiten elegirlo, y esa elección influye en la velocidad, la batería y la fiabilidad.

## WireGuard, en resumen

WireGuard es el estándar moderno. Su código es diminuto comparado con el de los protocolos antiguos —unos pocos miles de líneas frente a cientos de miles—, lo que facilita auditarlo y reduce la probabilidad de que oculte errores.

- **Velocidad:** normalmente la opción más rápida, con baja latencia.
- **Seguridad:** criptografía moderna, sin opciones heredadas débiles.
- **Móvil:** se reconecta casi al instante cuando pasas del wifi a los datos móviles.
- **Salvedad sobre la privacidad:** los proveedores de confianza añaden sus propios sistemas para que tu dirección IP no se conserve en el servidor; NordLynx, de NordVPN, es un ejemplo.

## OpenVPN, en resumen

OpenVPN ha sido el caballo de batalla del sector durante unas dos décadas.

- **Velocidad:** notablemente más lento que WireGuard en la mayoría de las conexiones.
- **Seguridad:** muy maduro y ampliamente auditado cuando está bien configurado.
- **Flexibilidad:** puede funcionar por el puerto TCP 443, que parece tráfico web seguro normal, así que funciona en redes que bloquean otro tráfico VPN.

## Frente a frente

| | WireGuard | OpenVPN |
|---|---|---|
| Velocidad | Muy rápido | Moderada |
| Tamaño del código | Muy pequeño | Grande |
| Reconexión en el móvil | Instantánea | Más lenta |
| Funciona en redes restrictivas | A veces bloqueado | Bien (TCP 443) |
| Madurez | Más reciente (2020 en Linux) | Muy maduro |

## ¿Cuál deberías elegir?

1. **Usa WireGuard** (o el protocolo de tu proveedor basado en WireGuard) por defecto.
2. **Cambia a OpenVPN TCP** si la red de un hotel, un centro educativo o una oficina bloquea tu VPN, y solo donde se te permita usarla.
3. **Prueba IKEv2** en iPhone si necesitas la máxima estabilidad al moverte entre redes.

La fila «Protocolo más rápido» de nuestras [tablas comparativas](/compare/) muestra qué protocolo moderno ofrece cada proveedor.
