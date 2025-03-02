import { create } from "zustand"
import { devtools } from "zustand/middleware"
import type { CryptoData } from "@/types"
import { mockCryptoData } from "./mockData"

interface CryptoStore {
  cryptos: CryptoData[]
  timeframe: "15m" | "1h" | "4h" | "12h" | "24h"
  isLoading: boolean
  error: string | null
  setTimeframe: (timeframe: "15m" | "1h" | "4h" | "12h" | "24h") => void
  refreshData: () => void
}

export const useCryptoStore = create<CryptoStore>()(
  devtools(
    (set) => ({
      cryptos: [],
      timeframe: "4h",
      isLoading: false,
      error: null,
      setTimeframe: (timeframe) => set({ timeframe }),
      refreshData: () => {
        set({ isLoading: true, error: null })
        setTimeout(() => {
          set({ cryptos: mockCryptoData, isLoading: false })
        }, 500) // Simüle edilmiş yükleme süresi
      },
    }),
    {
      name: "crypto-store",
    },
  ),
)

