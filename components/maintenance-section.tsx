"use client"
import useSWR from "swr"

const fetcher = (u: string) => fetch(u).then((r) => r.json())

export function MaintenanceSection() {
  const { data } = useSWR("/api/technicians", fetcher, { refreshInterval: 10000 })
  const techs = data?.techs ?? [
    { id: 1, name: "Arun Kumar (ITI)", status: "Available" },
    { id: 2, name: "Savita Rao (ITI)", status: "Busy" },
    { id: 3, name: "Naseer Ali (ITI)", status: "Available" },
  ]
  const node = data?.node ?? { temp: 48, memory: 62, lastReboot: "2d ago" }

  const badge = (s: string) => (s === "Available" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800")

  return (
    <div className="grid gap-3">
      <div className="rounded-xl bg-card p-3 sm:p-4 ring-1 ring-border bg-gradient-to-br from-background to-secondary/10 backdrop-blur-sm">
        <div className="text-sm sm:text-base font-medium mb-3 bg-gradient-to-r from-green-600 to-saffron-500 bg-clip-text text-transparent">{"Local Technicians"}</div>
        <ul className="grid gap-2">
          {techs.map((t: any) => (
            <li key={t.id} className="flex items-center justify-between rounded bg-secondary/50 px-3 py-2 hover:bg-secondary/70 transition-colors">
              <span className="text-sm">{t.name}</span>
              <span className={`text-xs rounded px-2 py-1 ${badge(t.status)}`}>{t.status}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl bg-card p-3 sm:p-4 ring-1 ring-border bg-gradient-to-br from-background to-secondary/10 backdrop-blur-sm">
        <div className="text-sm sm:text-base font-medium mb-3 bg-gradient-to-r from-green-600 to-saffron-500 bg-clip-text text-transparent">{"Edge Node Health"}</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs sm:text-sm">
          <div className="rounded bg-secondary/50 p-2 hover:bg-secondary/70 transition-colors">{`Temp: ${node.temp}°C`}</div>
          <div className="rounded bg-secondary/50 p-2 hover:bg-secondary/70 transition-colors">{`Memory: ${node.memory}%`}</div>
          <div className="rounded bg-secondary/50 p-2 hover:bg-secondary/70 transition-colors">{`Last Reboot: ${node.lastReboot}`}</div>
        </div>
      </div>
    </div>
  )
}