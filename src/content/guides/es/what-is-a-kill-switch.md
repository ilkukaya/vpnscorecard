---
title: "¿Qué es el kill switch de una VPN y debes activarlo?"
description: "Cómo funciona el kill switch de una VPN, la diferencia entre el kill switch de apps y el de sistema, y cómo activarlo."
summary: "El kill switch de una VPN bloquea tu tráfico de internet cada vez que se cae la conexión VPN, para que tu dirección IP real y tu tráfico sin cifrar nunca queden expuestos. Los kill switch de sistema bloquean todo el tráfico; los de apps solo cierran las apps seleccionadas. Deberías activarlo, sobre todo en el wifi público o cuando la privacidad sea importante."
date: "2026-01-25"
updated: "2026-09-26"
category: technical
readTime: 5
faq:
  - q: "¿El kill switch ralentiza mi internet?"
    a: "No. No hace nada mientras la VPN está conectada. Solo bloquea el tráfico durante los segundos en que la VPN se vuelve a conectar."
  - q: "¿Por qué no puedo conectarme a internet después de activar el kill switch?"
    a: "Probablemente la VPN está desconectada y el kill switch está bloqueando el tráfico, tal como debe hacer. Vuelve a conectar la VPN o desactiva temporalmente el kill switch."
  - q: "¿Los iPhone tienen kill switch?"
    a: "La mayoría de las apps de VPN ofrecen en iOS un kill switch o la opción «incluir todas las redes». Android también tiene un ajuste del sistema llamado «Bloquear conexiones sin VPN»."
---

Las conexiones VPN se caen de vez en cuando: al cambiar de red, cuando el portátil sale del modo de suspensión o cuando se reinicia un servidor. Durante unos segundos, tu dispositivo puede volver a la conexión normal sin cifrar. Un **kill switch** lo impide.

## Cómo funciona

El kill switch vigila la conexión VPN. Si el túnel se cae, bloquea de inmediato el tráfico de internet hasta que la VPN se vuelve a conectar. Nada sale de tu dispositivo fuera del túnel.

## Tipos de kill switch

- **Kill switch de sistema (de red):** bloquea todo el tráfico de internet cuando la VPN se desconecta. La opción más segura.
- **Kill switch de apps:** cierra o bloquea solo las apps que elijas, como un navegador o un cliente P2P.
- **Modo siempre activo o permanente:** bloquea el acceso a internet siempre que la VPN no esté conectada, incluso antes de que abras la app.

## Cuándo es más importante

- En el wifi público, donde una caída podría exponer tráfico sin cifrar.
- Cuando dependes de la VPN para mantener tu privacidad frente a tu proveedor de internet.
- Al compartir archivos P2P, donde otros pueden ver tu IP.

## Cómo activarlo

- **Windows/Mac:** ajustes de la app de VPN → Kill switch → Activado.
- **Android:** Ajustes → Red → VPN → tu VPN → activa *VPN siempre activada* y *Bloquear conexiones sin VPN*.
- **iPhone/iPad:** en la app de VPN, activa el kill switch o la opción «incluir todas las redes», si está disponible.

Todas las mejores VPN de nuestro [ranking](/) incluyen kill switch; nuestros análisis lo muestran en la sección de datos clave.
