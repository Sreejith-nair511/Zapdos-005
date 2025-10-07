"use client"

import Link from "next/link"
import { useI18n } from "@/components/i18n-provider"
import { Button } from "@/components/ui/button"
import { ChevronLeft, LogOut } from "lucide-react"
import { Auth } from "@/lib/auth"

export function AgentHeader({ agentName }: { agentName: string }) {
  const { t } = useI18n()
  
  const handleLogout = () => {
    Auth.logout()
  }
  
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-4">
        <Link href="/officer">
          <Button variant="outline" size="icon" aria-label="Back to dashboard">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-xl font-semibold">{agentName}</h1>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={handleLogout} aria-label="Logout">
          <LogOut className="h-4 w-4" />
          <span className="ml-2 hidden sm:inline">{t("logout")}</span>
        </Button>
        <div className="text-sm text-muted-foreground">
          {t("aiGovCenter")}
        </div>
      </div>
    </div>
  )
}