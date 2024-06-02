# MÜDEK Yönetim Sistemi

MÜDEK Yönetim Sistemi, mühendislik eğitim programlarının standartlarını belirlemek, değerlendirmek ve iyileştirmek amacıyla tasarlanmış bir mobil uygulamadır. Bu sistem, öğretim üyeleri ve öğrencilerin ders bilgilerini düzenlemeleri, sınav notlarını kaydetmeleri ve değerlendirme yapmaları için etkili bir çözüm sunar. Ayrıca, MÜDEK standartlarına uygun olarak yapılan değerlendirmelerin sağlıklı ve güvenilir bir şekilde gerçekleştirilmesi için gerekli altyapıyı sağlar.

## Özellikler

- **MÜDEK Sorumlusu Girişi**: Akreditasyon sürecini yönetir, standartları belirler ve ders bilgilerini saklar. Değerlendirme kriterlerini tanımlar ve sistemdeki güncellemeleri gerçekleştirir.
- **Akademisyen Girişi**: Ders bilgilerini girer, günceller ve saklar. Sınav notlarını kaydeder ve öğrencileri değerlendirir. MÜDEK sorumlusunun belirlediği kriterlere göre öğrencilere puanlar verir.
- **Öğrenci Girişi**: Ders programlarını görüntüler, sınav notlarını kontrol eder ve akademik ilerlemelerini takip ederler. Kendi notlarına erişebilir ve ilgili belgeleri görüntüleyebilirler.
- **Veri Güvenliği ve Gizliliği**: Kullanıcı bilgileri güvenli bir şekilde saklanır ve sadece yetkili kullanıcılar tarafından erişilebilir.

## Kullanılan Teknolojiler

- **React Native**: Mobil uygulama geliştirmek için kullanılan açık kaynaklı bir framework.
- **Expo**: React Native uygulamaları geliştirmeyi ve çalıştırmayı kolaylaştıran bir araç seti.
- **Firebase**: Kullanıcı kimlik doğrulaması, veritabanı yönetimi ve dosya depolama gibi hizmetler sunan Google'ın platformu.
- **Visual Studio Code**: Geliştirme ortamı.

## Kullanım

1. **Kaydolma ve Giriş**: Uygulamayı indirin, kaydolun ve giriş yapın.
2. **MÜDEK Sorumlusu**:
   - Standartları belirleyin ve ders bilgilerini saklayın.
   - Değerlendirme kriterlerini tanımlayın ve güncellemeler yapın.
3. **Akademisyenler**:
   - Ders bilgilerini girin, güncelleyin ve saklayın.
   - Sınav notlarını kaydedin ve öğrencileri değerlendirin.
4. **Öğrenciler**:
   - Ders programlarını görüntüleyin.
   - Sınav notlarını kontrol edin ve akademik ilerlemelerinizi takip edin.

## Uygulamayı Kullanabilmek İçin

- Kök dizininde firebase.js dosyası oluşturarak, firebase ile projenizin konfigürasyonunu sağlayın. Böylece veri tabanı ve auth özelliklerini kullanabilirsiniz.
- Kodların çalışması için Node.js indirmeniz ve projeye konsoldan dahil etmeniz gerekiyor. Ayrıca projemde kullandığım tüm paketleri de tek tek indirmelisiniz.
- Akademisyen ve Müdek sorumlusu girişi kayıt olma ile değil firebase veri tabanından "teachers" ve "mudekmanagement" koleksiyonları içerisinde email ve password alanlarındaki bilgiye göre giriş sağlıyor.

## Tasarım

<img src="https://github.com/furkangenca/Mudek---Web/assets/148720624/219d3fdf-6cea-42b8-b1e9-caa8c3d6e3a1" width="850">
<img src="https://github.com/furkangenca/Mudek---Web/assets/148720624/b1b80eb3-3445-490f-b65b-ea938397f5bc" width="850">

### Öğrenci Bilgilendirme Alanı
<img src="https://github.com/furkangenca/Mudek---Web/assets/148720624/b95ec446-650d-48b5-a827-d84ac34ade4f" width="850">
<img src="https://github.com/furkangenca/Mudek---Web/assets/148720624/54f5cf66-3a61-4a86-907f-24a48b111157" width="850">

### Akademisyen Öğrenci Değerlendirme Ekranları
<img src="https://github.com/furkangenca/Mudek---Web/assets/148720624/3d908e41-dac0-4ee7-b721-25d2a5080d50" width="850">
<img src="https://github.com/furkangenca/Mudek---Web/assets/148720624/60f0c262-b66e-4886-8e56-1470814d4786" width="850">
<img src="(https://github.com/furkangenca/Mudek---Web/assets/148720624/1d72b8e8-1023-4188-bd37-598764e74d58" width="850">

### Müdek Denetleyicisi Sayfası
<img src="https://github.com/furkangenca/Mudek---Web/assets/148720624/5ea711a4-4f43-4de4-8ffd-1e325160d173" width="850">
<img src="https://github.com/furkangenca/Mudek---Web/assets/148720624/774f71ae-c5bf-4451-80d3-429e8d71287b" width="850">

