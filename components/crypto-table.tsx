"use client"

import { useCryptoStore } from "@/lib/store"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function CryptoTable() {
  const { cryptos, timeframe } = useCryptoStore()

  const formatNumber = (value: number | undefined, decimals = 2) => {
    if (value === undefined || isNaN(value)) return "N/A"
    return value.toFixed(decimals)
  }

  const getPercentageClass = (value: number | undefined) => {
    if (value === undefined || isNaN(value)) return ""
    return value > 0 ? "text-green-500" : "text-red-500"
  }

  if (cryptos.length === 0) {
    return <div>Veri yükleniyor...</div>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">#</TableHead>
          <TableHead>Sembol</TableHead>
          <TableHead className="text-right">Fiyat</TableHead>
          <TableHead className="text-right">Fiyat (1s%)</TableHead>
          <TableHead className="text-right">Fiyat (24s%)</TableHead>
          <TableHead className="text-right">RSI ({timeframe})</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cryptos.map((crypto, index) => (
          <TableRow key={crypto.symbol}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{crypto.symbol}</TableCell>
            <TableCell className="text-right">${formatNumber(crypto.price, 4)}</TableCell>
            <TableCell className={`text-right ${getPercentageClass(crypto.priceChange1h)}`}>
              {formatNumber(crypto.priceChange1h)}%
            </TableCell>
            <TableCell className={`text-right ${getPercentageClass(crypto.priceChange24h)}`}>
              {formatNumber(crypto.priceChange24h)}%
            </TableCell>
            <TableCell className="text-right">{formatNumber(crypto.rsi)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

