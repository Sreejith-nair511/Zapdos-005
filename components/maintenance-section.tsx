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
      <div className="rounded-xl bg-card p-4 ring-1 ring-border">
        <div className="text-sm font-medium">{"Local Technicians"}</div>
        <ul className="mt-2 grid gap-2">
          {techs.map((t: any) => (
            <li key={t.id} className="flex items-center justify-between rounded bg-secondary px-3 py-2">
              <span>{t.name}</span>
              <span className={`text-xs rounded px-2 py-1 ${badge(t.status)}`}>{t.status}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl bg-card p-4 ring-1 ring-border">
        <div className="text-sm font-medium">{"Edge Node Health"}</div>
        <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
          <div className="rounded bg-secondary p-2">{`Temp: ${node.temp}°C`}</div>
          <div className="rounded bg-secondary p-2">{`Memory: ${node.memory}%`}</div>
          <div className="rounded bg-secondary p-2">{`Last Reboot: ${node.lastReboot}`}</div>
        </div>
      </div>
    </div>
  )
}