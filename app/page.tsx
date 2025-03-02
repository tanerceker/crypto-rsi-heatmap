import { HeatmapChart } from "@/components/heatmap/heatmap-chart"
import { CryptoTable } from "@/components/crypto-table"

export default function Home() {
  return (
    <main className="container mx-auto p-4 space-y-6">
      <HeatmapChart />
      <CryptoTable />
    </main>
  )
}

