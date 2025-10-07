"use client"
import useSWR from "swr"
import { useEffect, useRef } from "react"

const fetcher = (u: string) => fetch(u).then((r) => r.json())

export function AlertsFeed() {
  const { data } = useSWR("/api/alerts", fetcher, { refreshInterval: 5000 })
  const list = data?.alerts ?? []
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [list])

  return (
    <div className="rounded-xl bg-card p-4 h-56 overflow-y-auto" ref={ref}>
      <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">{"AI Alerts"}</div>
      <ul className="grid gap-2">
        {list.map((a: any, idx: number) => (
          <li key={idx} className="flex items-center justify-between rounded-lg bg-secondary px-3 py-2">
            <span>{a.message}</span>
            <span className="text-xs text-muted-foreground">{a.time}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
