![Preview App](/public/preview.jpg)

# Crypto RSI Heatmap

Bu proje, kripto para birimlerinin RSI (Göreceli Güç Endeksi) değerlerini gösteren interaktif bir ısı haritası uygulamasıdır. Kullanıcılar, farklı zaman dilimlerinde kripto paraların RSI değerlerini görselleştirebilir ve analiz edebilir.

## Kullanılan Teknolojiler

- React
- Next.js 13 (App Router)
- TypeScript
- Tailwind CSS
- Zustand (State yönetimi)
- Shadcn/ui (UI bileşenleri)
- Lucide React (İkonlar)

## Kurulum

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

1. Repoyu klonlayın:
   ```
   git clone <repo-url>
   ```

2. Proje dizinine gidin:
   ```
   cd crypto-rsi-heatmap
   ```

3. Bağımlılıkları yükleyin:
   ```
   npm install
   ```

4. Geliştirme sunucusunu başlatın:
   ```
   npm run dev
   ```

5. Tarayıcınızda \`http://localhost:3000\` adresine giderek uygulamayı görüntüleyin.

## Proje Yapısı

Proje, aşağıdaki ana bileşenlerden oluşmaktadır:

1. **Heatmap Chart**: Kripto para birimlerinin RSI değerlerini görselleştiren ana bileşen.
   - \`components/heatmap/heatmap-chart.tsx\`
   - \`components/heatmap/crypto-dot.tsx\`
   - \`components/heatmap/trend-line.tsx\`
   - \`components/heatmap/average-line.tsx\`

2. **Crypto Table**: Kripto para birimlerinin detaylı bilgilerini gösteren tablo bileşeni.
   - \`components/crypto-table.tsx\`

3. **Store**: Zustand kullanılarak oluşturulan merkezi state yönetimi.
   - \`lib/store.ts\`

4. **Mock Data**: Gerçek zamanlı veri yerine kullanılan örnek veri.
   - \`lib/mockData.ts\`

5. **Theme**: Karanlık/Aydınlık tema değiştirme özelliği.
   - \`lib/theme-context.tsx\`
   - \`components/theme-toggle.tsx\`

6. **Utilities**: RSI hesaplama gibi yardımcı fonksiyonlar.
   - \`utils/rsi.ts\`

## Özellikler

- Interaktif RSI ısı haritası
- Farklı zaman dilimleri için RSI görüntüleme (15dk, 1s, 4s, 12s, 24s)
- Kripto para birimlerinin detaylı bilgilerini gösteren tablo
- Karanlık/Aydınlık tema desteği
- Responsive tasarım

