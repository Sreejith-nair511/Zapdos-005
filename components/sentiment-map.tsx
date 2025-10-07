"use client"
import useSWR from "swr"

const fetcher = (u: string) => fetch(u).then((r) => r.json())

export function SentimentMap() {
  const { data } = useSWR("/api/sentiment", fetcher, { refreshInterval: 10000 })
  const regions = data?.regions ?? [
    { name: "Kerala", color: "bg-green-500", ai: 96, uptime: 98, happiness: 92 },
    { name: "Rajasthan", color: "bg-orange-500", ai: 90, uptime: 93, happiness: 88 },
  ]
  return (
    <div className="rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-4 ring-1 ring-purple-200 dark:ring-purple-800 border-2 border-purple-200 dark:border-purple-800">
      <div className="text-sm font-medium mb-3">{"Citizen Sentiment Map"}</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {regions.map((r: any) => (
          <div
            key={r.name}
            className={`group relative aspect-square rounded-lg ${r.color} text-white flex items-center justify-center`}
          >
            <span className="font-semibold">{r.name}</span>
            <div className="absolute bottom-1 left-1 right-1 hidden group-hover:block rounded bg-black/70 p-2 text-[11px] leading-tight">
              <div>{`AI Accuracy: ${r.ai}%`}</div>
              <div>{`Offline Uptime: ${r.uptime}%`}</div>
              <div>{`Happiness Index: ${r.happiness}%`}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
