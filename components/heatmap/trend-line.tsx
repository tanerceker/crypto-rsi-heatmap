"use client"

import { useTheme } from "@/lib/theme-context"
import { cn } from "@/lib/utils"

interface TrendLineProps {
  x: number
  currentRSI: number
  previousRSI: number
  chartHeight: number
}

export function TrendLine({ x, currentRSI, previousRSI, chartHeight }: TrendLineProps) {
  const { theme } = useTheme()

  const trendDirection = currentRSI > previousRSI ? "up" : "down"
  const lineColor = trendDirection === "up" ? "#10b981" : "#ef4444" // Yeşil ve kırmızı renk kodları

  const startY = ((100 - previousRSI) / 100) * chartHeight
  const endY = ((100 - currentRSI) / 100) * chartHeight
  const height = Math.abs(endY - startY)

  // Dot'un yarıçapı kadar boşluk bırakıyoruz (2px)
  const dotRadius = 2
  const adjustedStartY = trendDirection === "up" ? startY : startY + dotRadius
  const adjustedEndY = trendDirection === "up" ? endY - dotRadius : endY
  const adjustedHeight = Math.max(0, Math.abs(adjustedEndY - adjustedStartY))

  return (
    <div
      className={cn("absolute w-[2px] transform -translate-x-1/2")}
      style={{
        left: `${x}%`,
        top: `${Math.min(adjustedStartY, adjustedEndY)}px`,
        height: `${adjustedHeight}px`,
        backgroundImage: `repeating-linear-gradient(
          to bottom,
          ${lineColor} 0px,
          ${lineColor} 4px,
          transparent 4px,
          transparent 8px
        )`,
        zIndex: 15, // Dot'un altında, ama diğer elementlerin üstünde
      }}
    />
  )
}

