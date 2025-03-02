import type { CryptoData } from "@/types"

function generateMockData(): CryptoData[] {
  const symbols = [
    "BTC",
    "ETH",
    "BNB",
    "ADA",
    "DOGE",
    "XRP",
    "DOT",
    "UNI",
    "LTC",
    "LINK",
    "BCH",
    "MATIC",
    "XLM",
    "ETC",
    "THETA",
    "VET",
    "FIL",
    "TRX",
    "XMR",
    "ALGO",
  ]

  return symbols.map((symbol) => {
    const baseRsi = 30 + Math.random() * 40 // 30 ile 70 arasında rastgele RSI
    let price: number

    switch (symbol) {
      case "BTC":
        price = 30000 + Math.random() * 5000
        break
      case "ETH":
        price = 1800 + Math.random() * 400
        break
      default:
        price = 0.1 + Math.random() * 100 // 0.1 ile 100 arasında rastgele fiyat
    }

    return {
      symbol,
      price,
      priceChange1h: (Math.random() - 0.5) * 5, // -2.5% ile 2.5% arasında
      priceChange24h: (Math.random() - 0.5) * 10, // -5% ile 5% arasında
      rsi: baseRsi,
      previousRsi: baseRsi + (Math.random() - 0.5) * 10, // Önceki RSI'yi simüle etmek için
    }
  })
}

export const mockCryptoData = generateMockData()

