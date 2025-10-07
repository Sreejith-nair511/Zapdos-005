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
      <div className="text-sm text-muted-foreground">{`Last updated: ${updated}`}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {rows.map((r: any) => (
          <div
            key={r.metric}
            className="rounded-xl bg-card p-4 shadow-sm ring-1 ring-border hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              <div className="font-medium">{r.metric}</div>
              <div className="text-xs text-muted-foreground">{"per 5s refresh"}</div>
            </div>
            <div className="mt-3 grid grid-cols-3 text-center">
              <div className="rounded-lg bg-secondary p-2">
                <div className="text-xs">Kerala</div>
                <div className="text-lg font-semibold">{r.kerala}%</div>
              </div>
              <div className="rounded-lg bg-secondary p-2">
                <div className="text-xs">Rajasthan</div>
                <div className="text-lg font-semibold">{r.rajasthan}%</div>
              </div>
              <div className="rounded-lg bg-secondary p-2">
                <div className="text-xs">National Avg.</div>
                <div className="text-lg font-semibold">{r.national}%</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
