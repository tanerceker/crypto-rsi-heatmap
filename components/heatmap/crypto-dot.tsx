"use client"

import type { CryptoData } from "@/types"
import { useState, useCallback, memo } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/theme-context"

interface CryptoDotProps {
  data: CryptoData
  position: {
    x: number
    y: number
  }
  timeframe: "15m" | "1h" | "4h" | "12h" | "24h"
  previousRSI: number
}

const CryptoDot = memo(function CryptoDot({ data, position, timeframe, previousRSI }: CryptoDotProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { theme } = useTheme()

  const getDotColor = useCallback(
    (rsi: number) => {
      if (theme === "light") {
        if (rsi > 70) return "bg-red-500"
        if (rsi > 55) return "bg-red-400"
        if (rsi > 45) return "bg-gray-400"
        if (rsi > 30) return "bg-emerald-400"
        return "bg-emerald-500"
      } else {
        if (rsi > 70) return "bg-red-500"
        if (rsi > 55) return "bg-red-400"
        if (rsi > 45) return "bg-gray-400"
        if (rsi > 30) return "bg-emerald-400"
        return "bg-emerald-500"
      }
    },
    [theme],
  )

  const handleMouseEnter = useCallback(() => setIsHovered(true), [])
  const handleMouseLeave = useCallback(() => setIsHovered(false), [])

  const isRising = data.rsi > previousRSI

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <div
            className="absolute flex flex-col items-center"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: "translate(-50%, -50%)", // Dot'u tam ortala
              zIndex: 20, // Dot'u her zaman trendline'ın üzerinde göster
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className={cn(
                "w-4 h-4 rounded-full cursor-pointer transition-all duration-150",
                getDotColor(data.rsi),
                isHovered && "scale-150 z-50",
                theme === "dark" && "ring-1 ring-gray-300",
              )}
            />
            <span
              className={cn(
                "text-xs font-medium whitespace-nowrap transition-all duration-150",
                isHovered ? "opacity-100" : "opacity-80",
                theme === "dark" ? "text-gray-200" : "text-gray-700",
                isRising ? "-mt-8" : "mt-1",
              )}
            >
              {data.symbol}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="start" sideOffset={5} alignOffset={-15} className="z-50">
          <div className="space-y-1">
            <p className="font-bold">{data.symbol}</p>
            <p>Fiyat: ${data.price.toFixed(2)}</p>
            <p>24s Değişim: {data.priceChange24h.toFixed(2)}%</p>
            <p>
              RSI ({timeframe}): {data.rsi.toFixed(2)}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
})

export { CryptoDot }

