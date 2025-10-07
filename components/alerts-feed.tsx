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
    <div className="rounded-xl bg-card p-3 sm:p-4 h-56 overflow-y-auto bg-gradient-to-br from-background to-secondary/10 backdrop-blur-sm" ref={ref}>
      <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2 px-1">{"AI Alerts"}</div>
      <ul className="grid gap-2">
        {list.map((a: any, idx: number) => (
          <li key={idx} className="flex flex-col gap-1 rounded-lg bg-secondary/50 px-3 py-2 hover:bg-secondary/70 transition-colors">
            <span className="text-sm font-medium">{a.message}</span>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{a.time}</span>
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                {a.type}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}