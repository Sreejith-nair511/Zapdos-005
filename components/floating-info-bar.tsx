"use client"
import useSWR from "swr"
import { useI18n } from "./i18n-provider"
import { Users, Server, Activity } from "lucide-react"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function FloatingInfoBar() {
  const { t } = useI18n()
  const { data: edgeData } = useSWR("/api/edge", fetcher, { refreshInterval: 5000 })
  const { data: mcpData } = useSWR("/api/mcp", fetcher, { refreshInterval: 3000 })
  
  const status = edgeData?.status ?? t("edgeOnline")
  const solar = edgeData?.solar ?? 96
  const network = edgeData?.network ?? "BharatNet"
  const lastSync = edgeData?.lastSync ?? t("justNow")
  const userCount = mcpData?.userCount ?? 439
  const cpuUsage = mcpData?.cpuUsage ?? "45%"
  const memoryUsage = mcpData?.memoryUsage ?? "65%"
  const uptime = mcpData?.uptime ?? "24h 0m 0s"

  return (
    <div
      className="w-full rounded-lg bg-secondary px-3 py-2 text-xs md:text-sm flex flex-wrap items-center justify-center gap-4 md:gap-8"
      role="status"
      aria-live="polite"
    >
      <span className="font-medium flex items-center gap-1">
        <Users className="h-4 w-4" />
        {`${userCount} Citizens Served`}
      </span>
      <span className="font-medium flex items-center gap-1">
        <Server className="h-4 w-4" />
        {`MCP Server: ${status}`}
      </span>
      <span className="font-medium flex items-center gap-1">
        <Activity className="h-4 w-4" />
        {`CPU: ${cpuUsage} | Memory: ${memoryUsage}`}
      </span>
      <span>{`${t("lastSync")}: ${lastSync}`}</span>
      <span>{`${t("solar")} ${solar}%`}</span>
      <span>{`${t("network")}: ${network}`}</span>
    </div>
  )
}