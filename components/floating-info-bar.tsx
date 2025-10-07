"use client"
import useSWR from "swr"
import { useI18n } from "./i18n-provider"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function FloatingInfoBar() {
  const { t } = useI18n()
  const { data } = useSWR("/api/edge", fetcher, { refreshInterval: 5000 })
  const status = data?.status ?? t("edgeOnline")
  const solar = data?.solar ?? 96
  const network = data?.network ?? "BharatNet"
  const lastSync = data?.lastSync ?? t("justNow")

  return (
    <div
      className="w-full rounded-lg bg-secondary px-3 py-2 text-xs md:text-sm flex items-center justify-center gap-4 md:gap-8"
      role="status"
      aria-live="polite"
    >
      <span className="font-medium">{`${status} |`}</span>
      <span>{`${t("lastSync")}: ${lastSync}`}</span>
      <span>{`${t("solar")} ${solar}%`}</span>
      <span>{`${t("network")}: ${network}`}</span>
    </div>
  )
}
