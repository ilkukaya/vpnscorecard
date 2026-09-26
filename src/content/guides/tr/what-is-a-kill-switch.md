---
title: "VPN Kill Switch Nedir, Açmalı mısınız?"
description: "VPN kill switch nasıl çalışır, uygulama düzeyi ile sistem düzeyi kill switch arasındaki fark nedir ve nasıl etkinleştirilir?"
summary: "VPN kill switch (acil durdurma anahtarı), VPN bağlantısı her koptuğunda internet trafiğinizi engeller; böylece gerçek IP adresiniz ve şifrelenmemiş trafiğiniz asla açığa çıkmaz. Sistem düzeyindeki kill switch'ler tüm trafiği engeller; uygulama düzeyindekiler ise yalnızca seçilen uygulamaları kapatır. Özellikle halka açık Wi-Fi'da veya gizliliğin önemli olduğu durumlarda açmalısınız."
date: "2026-01-25"
updated: "2026-09-26"
category: technical
readTime: 5
faq:
  - q: "Kill switch internetimi yavaşlatır mı?"
    a: "Hayır. VPN bağlıyken hiçbir şey yapmaz. Yalnızca VPN yeniden bağlanırken geçen birkaç saniye boyunca trafiği engeller."
  - q: "Kill switch'i açtıktan sonra neden internete bağlanamıyorum?"
    a: "VPN büyük olasılıkla bağlı değil ve kill switch, tasarlandığı gibi trafiği engelliyor. VPN'i yeniden bağlayın veya kill switch'i geçici olarak devre dışı bırakın."
  - q: "iPhone'larda kill switch var mı?"
    a: "Çoğu VPN uygulaması iOS'ta bir kill switch veya “tüm ağları dahil et” seçeneği sunar. Android'de de “VPN olmadan bağlantıları engelle” adlı bir sistem ayarı bulunur."
---

VPN bağlantıları zaman zaman kopar — ağ değiştirdiğinizde, dizüstü bilgisayarınız uyku modundan uyandığında veya bir sunucu yeniden başladığında. Birkaç saniye boyunca cihazınız normal, şifrelenmemiş bağlantıya geri dönebilir. **Kill switch** bunu önler.

## Nasıl çalışır

Kill switch, VPN bağlantısını izler. Tünel çökerse, VPN yeniden bağlanana kadar internet trafiğini anında engeller. Tünelin dışında cihazınızdan hiçbir şey çıkmaz.

## Kill switch türleri

- **Sistem düzeyi (ağ) kill switch:** VPN bağlantısı kesildiğinde tüm internet trafiğini engeller. En güvenli seçenektir.
- **Uygulama düzeyi kill switch:** Yalnızca seçtiğiniz uygulamaları (örneğin bir tarayıcı veya P2P istemcisi) kapatır ya da engeller.
- **Her zaman açık / kalıcı mod:** VPN bağlı olmadığı her an, uygulamayı açmadan önce bile internet erişimini engeller.

## En çok ne zaman önemlidir

- Bağlantı kopmasının şifrelenmemiş trafiği açığa çıkarabileceği halka açık Wi-Fi ağlarında.
- İnternet servis sağlayıcınıza karşı gizliliğiniz için VPN'e güvendiğinizde.
- IP adresinizin başkalarına göründüğü P2P dosya paylaşımı sırasında.

## Nasıl açılır

- **Windows/Mac:** VPN uygulaması ayarları → Kill switch → Açık.
- **Android:** Ayarlar → Ağ → VPN → VPN'iniz → *Her zaman açık VPN* ve *VPN olmadan bağlantıları engelle* seçeneklerini etkinleştirin.
- **iPhone/iPad:** VPN uygulamasında, varsa kill switch veya “tüm ağları dahil et” seçeneğini etkinleştirin.

[Sıralamamızdaki](/) en iyi VPN'lerin tamamında kill switch bulunur; inceleme sayfalarımız bunu temel bilgiler bölümünde gösterir.
