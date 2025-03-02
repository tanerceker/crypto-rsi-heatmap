"use client"

import { useEffect, useMemo, useCallback } from "react"
import { useCryptoStore } from "@/lib/store"
import { CryptoDot } from "./crypto-dot"
import { TrendLine } from "./trend-line"
import { AverageLine } from "./average-line"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RefreshCw, Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useTheme } from "@/lib/theme-context"

export function HeatmapChart() {
  const { cryptos, timeframe, setTimeframe, isLoading, refreshData, error } = useCryptoStore()
  const { theme, toggleTheme } = useTheme()

  const chartHeight = 800 // Chart yüksekliği

  const heatmapZones = useMemo(
    () => [
      {
        name: "OVERSOLD",
        color: theme === "light" ? "bg-emerald-100/80" : "bg-emerald-950/80",
        startValue: 0,
        endValue: 30,
      },
      {
        name: "WEAK",
        color: theme === "light" ? "bg-emerald-50/80" : "bg-emerald-900/80",
        startValue: 30,
        endValue: 45,
      },
      {
        name: "NEUTRAL",
        color: theme === "light" ? "bg-gray-50/80" : "bg-gray-900/80",
        startValue: 45,
        endValue: 55,
      },
      {
        name: "STRONG",
        color: theme === "light" ? "bg-red-50/80" : "bg-red-950/80",
        startValue: 55,
        endValue: 70,
      },
      {
        name: "OVERBOUGHT",
        color: theme === "light" ? "bg-red-100/80" : "bg-red-900/80",
        startValue: 70,
        endValue: 100,
      },
    ],
    [theme],
  )

  const averageRSI = useMemo(() => {
    if (cryptos.length === 0) return 50
    return cryptos.reduce((sum, crypto) => sum + crypto.rsi, 0) / cryptos.length
  }, [cryptos])

  useEffect(() => {
    refreshData()
  }, [refreshData])

  const handleTimeframeChange = useCallback(
    (value: string) => {
      setTimeframe(value as "15m" | "1h" | "4h" | "12h" | "24h")
      refreshData()
    },
    [setTimeframe, refreshData],
  )

  const handleRefresh = useCallback(() => {
    refreshData()
  }, [refreshData])

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Crypto Market RSI Heatmap</CardTitle>
        <div className="flex items-center gap-2">
          <Select value={timeframe} onValueChange={handleTimeframeChange}>
            <SelectTrigger className="w-24">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15m">15 min</SelectItem>
              <SelectItem value="1h">1 hour</SelectItem>
              <SelectItem value="4h">4 hour</SelectItem>
              <SelectItem value="12h">12 hour</SelectItem>
              <SelectItem value="24h">24 hour</SelectItem>
            </SelectContent>
          </Select>
          <Button size="icon" variant="ghost" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} />
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "light" ? <Moon className="h-[1.2rem] w-[1.2rem]" /> : <Sun className="h-[1.2rem] w-[1.2rem]" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Hata</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="relative w-full h-[800px] border rounded-lg overflow-hidden">
          {heatmapZones.map((zone) => (
            <div
              key={zone.name}
              className={`absolute w-full ${zone.color}`}
              style={{
                top: `${100 - zone.endValue}%`,
                height: `${zone.endValue - zone.startValue}%`,
              }}
            >
              <span
                className={cn(
                  "absolute right-4 top-2 text-sm font-medium",
                  theme === "dark" ? "text-gray-300" : "text-gray-600",
                )}
              >
                {zone.name}
              </span>
            </div>
          ))}
          <AverageLine value={averageRSI} />
          {cryptos.map((crypto, index) => {
            const x = 5 + (index / cryptos.length) * 90
            return (
              <div key={crypto.symbol}>
                <TrendLine x={x} currentRSI={crypto.rsi} previousRSI={crypto.previousRsi} chartHeight={chartHeight} />
                <CryptoDot
                  data={crypto}
                  position={{
                    x,
                    y: 100 - crypto.rsi,
                  }}
                  timeframe={timeframe}
                  previousRSI={crypto.previousRsi}
                />
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

