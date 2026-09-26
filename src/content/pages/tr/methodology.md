---
title: "VPN'leri Nasıl Puanlıyoruz (Metodoloji v3.0)"
description: "Her VPNScorecard puanının arkasındaki kurallar: ağırlıklandırılmış altı kategori, 100 puan ve her puan için gereken kanıtlar."
updated: "2026-09-26"
---

VPNScorecard'daki her VPN, altı kategoride **100 puan** üzerinden değerlendirilir. Ağırlıklar, çoğu kullanıcı için en önemli olanı yansıtır: önce gizlilik ve performans, ardından kullanılabilirlik, ağ, fiyat ve yayın (streaming).

| Kategori | Puan | Puan kazandıranlar |
|---|---|---|
| Hız ve performans | 25 | Modern protokol teknolojisi (WireGuard veya eşdeğeri), ağ kapasitesi, sunucu kalitesi |
| Gizlilik ve güvenlik | 25 | Bağımsız kayıt tutmama (no-logs) denetimleri, yargı bölgesi, yalnızca RAM tabanlı sunucular, kill switch, sızıntı koruması, açık kaynaklı uygulamalar |
| Kullanım kolaylığı | 15 | Uygulama kalitesi, kurulum, platform desteği, destek seçenekleri |
| Sunucu ağı | 15 | Ülke ve sunucu sayısı, P2P, gizleme (obfuscation) ve özel amaçlı sunucular |
| Fiyat/performans | 15 | Yayımlanmış fiyatlar, cihaz sınırı, iade süresi, ücretsiz plan |
| Yayın (streaming) | 5 | Büyük yayın uygulamalarıyla bildirilen uyumluluk |

Genel puan, altı kategorinin toplamıdır. Bunu 10 üzerinden gösteririz (örneğin 91/100, 9,1 olarak gösterilir).

## Bilgilerimiz nereden geliyor

Herkesin kontrol edebileceği kanıtlara dayanıyoruz:

1. Sağlayıcı veya denetim firması tarafından yayımlanan **bağımsız denetim raporları** (örneğin Deloitte, KPMG, Cure53 veya Securitum).
2. **Sağlayıcı belgeleri**: gizlilik politikaları, hizmet koşulları, özellik sayfaları, sunucu listeleri ve yardım merkezi makaleleri.
3. Her sağlayıcının kendi web sitesinde **yayımlanan fiyatlar**; kontrol ettiğimiz tarihle birlikte kaydedilir.
4. Veri sızıntıları veya mahkeme davaları gibi olaylar için saygın teknoloji yayınlarının ve güvenlik araştırmacılarının **kamuya açık haberleri**.

Şu anda kendi hız testi sonuçlarımızı yayımlamıyoruz. Hız puanları tek bir laboratuvar ölçümünü değil, protokol teknolojisini ve ağ kalitesini yansıtır; çünkü VPN hızı konuma, zamana ve bağlantıya göre çok büyük farklılıklar gösterir.

## Gizlilik ve güvenlik kuralları

- Kayıt tutmama politikası ancak **bağımsız olarak denetlenmişse** tam puan alır.
- Merkezin bir **14 Göz (14 Eyes)** ülkesinde olması puan kaybettirir, ancak denetlenmiş bir kayıt tutmama politikası bu etkiyi azaltır.
- **Yalnızca RAM tabanlı sunucular**, çalışan bir **kill switch**, **DNS sızıntısı koruması** ve **açık kaynaklı uygulamalar** ayrı ayrı puan kazandırır.
- Şeffaf şekilde ele alınmayan bilinen güvenlik olayları puan kaybettirir.

## Fiyat/performans kuralları

Fiyat/performans; yayımlanmış en düşük fiyata, tek bir aboneliğin kaç cihazı kapsadığına, iade süresine ve gerçekten kullanılabilir bir ücretsiz planın olup olmadığına göre değerlendirilir. Yenileme fiyatları ve uzun taahhüt süreleri de hesaba katılır.

## Ne sıklıkla güncelliyoruz

Puan tablosunu en az üç ayda bir ve bir sağlayıcı yeni bir denetim, bir güvenlik olayı veya yeni bir fiyat yapısı gibi önemli bir değişiklik duyurduğunda gözden geçiririz. Her sayfa, en son ne zaman güncellendiğini gösterir.

## Bağımsızlık

Komisyonların puanlamada hiçbir rolü yoktur. Sağlayıcılar listeye dahil edilmek, listeden çıkarılmak veya daha üst sıraya yerleştirilmek için ödeme yapamaz. Daha fazlası için [yayın ilkelerimizi](/editorial-policy/) okuyun.
