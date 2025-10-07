"use client"
import useSWR from "swr"
import { useMemo } from "react"

const fetcher = (u: string) => fetch(u).then((r) => r.json())

export function LiveMetrics() {
  const { data } = useSWR("/api/metrics", fetcher, { refreshInterval: 5000 })
  const rows = useMemo(
    () =>
      data?.metrics ?? [
        { metric: "Crop Loss Reduction", kerala: 15, rajasthan: 12, national: 10 },
        { metric: "Welfare Enrollment", kerala: 100, rajasthan: 84, national: 78 },
        { metric: "Water Wastage Cut", kerala: 30, rajasthan: 22, national: 19 },
        { metric: "Citizen Satisfaction", kerala: 92, rajasthan: 88, national: 85 },
      ],
    [data],
  )
  const updated = data?.updated ?? "Just Now"

  return (
    <section className="grid gap-3">
      <div className="text-xs sm:text-sm text-muted-foreground px-2">{`Last updated: ${updated}`}</div>
      <div className="grid grid-cols-1 gap-3">
        {rows.map((r: any) => (
          <div
            key={r.metric}
            className="rounded-xl bg-card p-3 sm:p-4 shadow-sm ring-1 ring-border hover:shadow-md transition bg-gradient-to-br from-background to-secondary/10 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <div className="font-medium text-sm sm:text-base">{r.metric}</div>
              <div className="text-xs text-muted-foreground">{"per 5s refresh"}</div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="rounded-lg bg-secondary/50 p-2 sm:p-3">
                <div className="text-xs text-muted-foreground">Kerala</div>
                <div className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-green-600 to-saffron-500 bg-clip-text text-transparent">{r.kerala}%</div>
              </div>
              <div className="rounded-lg bg-secondary/50 p-2 sm:p-3">
                <div className="text-xs text-muted-foreground">Rajasthan</div>
                <div className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-green-600 to-saffron-500 bg-clip-text text-transparent">{r.rajasthan}%</div>
              </div>
              <div className="rounded-lg bg-secondary/50 p-2 sm:p-3">
                <div className="text-xs text-muted-foreground">National Avg.</div>
                <div className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-green-600 to-saffron-500 bg-clip-text text-transparent">{r.national}%</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}