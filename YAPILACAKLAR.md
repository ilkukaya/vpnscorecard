# VPNScorecard — Durum Raporu ve Yapılacaklar

Bu dosya teknik bilgi gerektirmeden siteyi yönetebilmeniz için yazıldı.

---

## 1. Başlangıçta tespit edilen sorunlar

| Sorun | Neden önemliydi | Ne yapıldı |
|---|---|---|
| Hız testi rakamları (ör. "887 Mbps") gerçekte ölçülmemişti | Sahte test iddiası tüketici hukuku (ABD FTC, AB, Türkiye Reklam Kurulu) açısından risk; Google da güvenilmez içerik olarak değerlendirir | Tüm uydurma ölçümler kaldırıldı. Puanlar artık kamuya açık kanıtlara (bağımsız denetimler, sağlayıcı belgeleri, yayınlanmış fiyatlar) dayanıyor ve bu açıkça yazıyor |
| Haftalık bot her pazartesi fiyatları "doğrulandı" diye işaretliyordu ama aslında hiçbir şeyi güncellemiyordu; süresi dolmuş kampanyalar "güncel" görünüyordu | Yanıltıcı reklam riski | Bot kaldırıldı. Yerine her ay size GitHub'da hatırlatma açan dürüst bir iş akışı kondu. Fiyatlar "1 Nisan 2026 itibarıyla" diye tarihli gösteriliyor |
| Tüm affiliate linkleri `YOURID` içeriyordu | Tıklamalar hiç komisyon getirmiyordu | Tek bir dosyada (`data/affiliates.json`) toplandı. Link girilene kadar ziyaretçi resmi siteye gidiyor (kırık link yok) |
| 12 blog yazısının hepsi "içerik buraya eklenecek" diyen boş sayfalardı | Google ve AdSense boş içeriği cezalandırır/reddeder | 11 gerçek, kapsamlı rehber yazıldı ve 14 dile çevrildi |
| "Çin için en iyi VPN" sayfası | Çin'de onaysız VPN kullanımı yasadışı | Kaldırıldı; yerine "Ülkelere göre VPN yasallığı" rehberi eklendi |
| Gizlilik politikası, kullanım şartları, iletişim sayfası yoktu | AdSense ve affiliate programları bunları şart koşar; KVKK/GDPR gereği | Hepsi eklendi (14 dilde) |
| Google Fonts dış sunucudan yükleniyordu | Almanya'da GDPR davalarına konu oldu | Fontlar sitenin kendi sunucusundan yükleniyor |
| Plausible analitik kodu vardı (ücretli servis) | Hesap yoksa çalışmaz | Ücretsiz Cloudflare Web Analytics desteği eklendi (çerezsiz, izin banner'ı gerektirmez) |
| Site yalnızca 3 dildeydi, tasarım hazır şablon görünümündeydi | — | 14 dil, tamamen yeni editoryal tasarım |
| `vpnscorecard.com` alan adı Netlify'a bağlı değil | Site şu an `vpnscorecard.netlify.app` adresinde yayında | Site hangi adreste yayındaysa kendi adresini otomatik kullanacak şekilde ayarlandı (aşağıya bakın) |

## 2. Yapılanlar (özet)

- **Yeni tasarım**: "yapay zekâ şablonu" görünümünden uzak, güven veren editoryal stil; mobilde alt kısımda sabit "Siteyi ziyaret et" çubuğu; sağdan sola (Arapça) desteği.
- **14 dil**: İngilizce, İspanyolca, Portekizce, Fransızca, Almanca, İtalyanca, Felemenkçe, Lehçe, Türkçe, Arapça, Hintçe, Endonezce, Japonca, Korece.
  - **Bilerek eklenmeyen diller**: Rusça (Rusya'da VPN reklamı yasak), Farsça (İran), Basitleştirilmiş Çince (Çin). Hukuki risk almamak için.
- **Hukuki koruma**: VPN'in yasak veya kısıtlı olduğu ülkelerden (Çin, Rusya, İran, Belarus, Kuzey Kore, Türkmenistan, Umman, Irak, Myanmar, Pakistan) gelen ziyaretçiler VPN sağlayıcı linklerine tıkladığında satış sayfasına değil, "bu bölgede kullanılamaz" uyarı sayfasına yönlendirilir. Her sayfada "yasalara uygun kullanın" uyarısı ve affiliate açıklaması var.
- **Yaklaşık 1.390 sayfa**: 21 VPN incelemesi, 31 karşılaştırma, 16 "en iyi VPN" listesi (streaming, oyun, gizlilik, ucuz, ücretsiz, aile, iPhone, Android…), fiyat karşılaştırması, VPN bulucu test, "IP adresim ne" aracı, ülkelere göre yasallık — hepsi 14 dilde.
- **SEO**: her sayfada doğru canonical ve 14 dilli hreflang, site haritası, yapılandırılmış veri (Review, FAQ, Breadcrumb, ItemList, Article), her VPN için otomatik paylaşım görseli.
- **AEO / GEO (yapay zekâ arama motorları)**: her sayfanın başında "Kısa cevap" kutusu, SSS bölümleri, `llms.txt` dosyası, ChatGPT/Claude/Perplexity/Google botlarına açık `robots.txt`.
- **IndexNow**: her canlı yayından sonra Bing, Yandex, Naver'a otomatik bildirim.
- **"IP adresim ne?" aracı**: çok aranan bir anahtar kelime; ücretsiz Netlify Edge Function ile çalışır, hiçbir veri kaydetmez.
- **İletişim formu**: Netlify Forms (ücretsiz, ayda 100 mesaj) — Netlify'da açıldı. Mesajlar Netlify panelinde "Forms" bölümünde görünür.
- **Otomatik kontrol**: her değişiklikte GitHub veriyi doğrular ve siteyi test amaçlı derler.

## 3. Sizin yapmanız gerekenler (sırasıyla)

### Adım 1 — Alan adı (en önemlisi)
Site şu anda **https://vpnscorecard.netlify.app** adresinde. Kendi alan adınız ciddi bir marka ve SEO için şart.
1. `vpnscorecard.com` size ait değilse bir alan adı satın alın (yıllık ~10–15 $; Netlify, Namecheap, Cloudflare Registrar). Bu, projedeki tek ücretli kalemdir.
2. Netlify → **vpnscorecard** projesi → **Domain management** → **Add a domain** → alan adını yazın ve ekrandaki talimatları izleyin. HTTPS sertifikası otomatik ve ücretsizdir.
3. Başka hiçbir şey değiştirmeniz gerekmez; site yeni adresi otomatik kullanır (bir kez **Deploys → Trigger deploy** yapmanız yeterli).

### Adım 2 — Affiliate programlarına başvuru
Site yayında ve içerik dolu olduğu için artık başvurabilirsiniz. Başvuru linkleri `data/affiliates.json` dosyasında. Önce en yüksek gelirli olanlar:
1. **NordVPN**, **Surfshark**, **Proton VPN**, **ExpressVPN**, **CyberGhost**, **PIA** (çoğu Impact, CJ veya kendi paneli üzerinden).
2. Onaylanınca size verilen takip linkini GitHub'da `data/affiliates.json` dosyasını açıp (kalem ikonu ile düzenle) ilgili VPN'in `"url": ""` kısmına yapıştırın → **Commit changes**. Site birkaç dakika içinde kendiliğinden güncellenir.
3. Başvuruda "trafik kaynağı" olarak: SEO / içerik sitesi, 14 dil, şeffaf puanlama.

### Adım 3 — Google Search Console ve Bing (ücretsiz)
1. https://search.google.com/search-console → **URL ön eki** ile sitenizi ekleyin → **HTML etiketi** yöntemini seçin → `content="..."` içindeki kodu kopyalayın.
2. Netlify → **Site configuration → Environment variables** → `PUBLIC_GOOGLE_SITE_VERIFICATION` adıyla kodu ekleyin → yeniden deploy.
3. Search Console'da **Site haritaları** → `sitemap-index.xml` gönderin.
4. Bing Webmaster Tools'da "Google Search Console'dan içe aktar" seçeneği tek tıkla aynı işi yapar.

### Adım 4 — Ücretsiz ziyaretçi istatistiği
Cloudflare hesabı açın (ücretsiz) → **Web Analytics** → sitenizi ekleyin → verilen token'ı Netlify'da `PUBLIC_CF_BEACON_TOKEN` olarak kaydedin. Çerez kullanmaz, izin banner'ı gerekmez.

### Adım 5 — Google AdSense (trafik gelmeye başlayınca)
1. https://adsense.google.com başvurusu yapın; Netlify'a `PUBLIC_ADSENSE_CLIENT` (ör. `ca-pub-123...`) ekleyin. Onaydan sonra bir reklam birimi oluşturup kimliğini `PUBLIC_ADSENSE_SLOT` olarak ekleyin.
2. **Zorunlu**: AdSense → **Gizlilik ve mesajlaşma** → **Avrupa düzenlemeleri** mesajını oluşturup yayınlayın (Google'ın ücretsiz, sertifikalı çerez izni penceresi). AB/İngiltere/İsviçre ziyaretçileri için yasal zorunluluktur.
3. Not: VPN sitelerinde asıl gelir affiliate'ten gelir; reklamlar yalnızca içerik aralarına yerleştirildi, "Siteyi ziyaret et" butonlarının yanına konmadı.

### Adım 6 — Hukuki bilgiler
- **Gizlilik politikasına** işletmeci adı/unvanı ve adres eklemeniz GDPR/KVKK açısından önerilir (şu an "VPNScorecard" yazıyor). `src/content/pages/*/privacy.md`
- Affiliate ve reklam geliri için bir mali müşavirle vergi durumunuzu konuşun.
- Bu dosyadaki bilgiler hukuki tavsiye değildir; büyük ölçekte gelir elde etmeye başladığınızda bir avukata kısa bir kontrol yaptırmanız iyi olur.

### Her ay (15 dakika)
GitHub her ayın 1'inde size "Monthly check" başlıklı bir hatırlatma açar. İlk 10 VPN'in fiyatını resmi sitelerinden kontrol edip `data/pricing.json` dosyasını güncelleyin ve `last_updated` tarihini değiştirin. Bunu bana da yaptırabilirsiniz.

## 4. Büyüme planı (ücretsiz)

Gerçekçi olmak gerekirse: VPN, internetin en rekabetçi affiliate alanlarından biridir. Yeni bir alan adının Google'da güven kazanması genellikle **6–12 ay** sürer. Dünyanın en çok ziyaret edilen sitesi olmak gerçekçi bir hedef değil; ama nişte ciddi ve kârlı bir site olmak mümkün. En etkili ücretsiz adımlar:

1. **İçerik düzenliliği**: ayda 4–8 yeni rehber (ör. "Netflix neden VPN hatası veriyor", "Router'a VPN kurulumu", "Oyunlarda ping düşürme"). Uzun kuyruklu, soru biçimli başlıklar hem Google'da hem ChatGPT/Perplexity cevaplarında öne çıkar.
2. **Güncellik**: fiyat ve puanları düzenli güncellemek hem kullanıcı güveni hem SEO için en büyük farktır.
3. **Backlink**: Reddit (r/VPN, r/privacy — kurallara uyarak, spam yapmadan), Quora, Medium ve dev.to'da faydalı cevaplar; basın/blogger'lara "IP adresim ne" ve "VPN yasallık haritası" gibi ücretsiz araçları kaynak olarak önerin.
4. **Sosyal medya**: YouTube Shorts / TikTok'ta 30 saniyelik "hangi VPN'i almalıyım" videoları, siteye yönlendirme.
5. **Ölçüm**: Search Console'da hangi sorguların görüntülendiğine bakıp o konularda içerik yazın.

## 5. Teknik not

- Canlı yayın: `main` dalına gelen her değişiklik Netlify tarafından otomatik yayınlanır.
- Tüm ayarlar ve dosya konumları için: [README.md](README.md)
