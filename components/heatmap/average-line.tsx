"use client"

interface AverageLineProps {
  value: number
}

export function AverageLine({ value }: AverageLineProps) {
  return (
    <>
      <div
        className="absolute w-full border-t border-dashed border-orange-500 z-10"
        style={{
          top: `${100 - value}%`,
        }}
      />
      <div
        className="absolute right-2 text-sm font-medium text-orange-500"
        style={{
          top: `${100 - value}%`,
          transform: "translateY(-150%)",
        }}
      >
        AVG RSI: {value.toFixed(2)}
      </div>
    </>
  )
}

