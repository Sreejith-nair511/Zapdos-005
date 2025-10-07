"use client"

import { useEffect, useState } from "react"
import { useI18n } from "./i18n-provider"
import { Button } from "@/components/ui/button"
import { 
  Zap, 
  Sun, 
  CloudRain, 
  TrendingUp, 
  Users, 
  AlertTriangle,
  RotateCcw,
  Download
} from "lucide-react"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DevRibbon() {
  const [active, setActive] = useState(false)
  const [seed, setSeed] = useState(12345)
  const { t } = useI18n()
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      setActive(params.get("dev") === "1")
      
      // Get seed from URL or generate one
      const urlSeed = params.get("seed")
      if (urlSeed) {
        setSeed(parseInt(urlSeed))
      } else {
        setSeed(Math.floor(Math.random() * 100000))
      }
    }
  }, [])
  
  // Trigger demo scenarios
  const triggerScenario = (scenario: string) => {
    // In a real implementation, this would trigger specific mock API responses
    console.log(`Triggering scenario: ${scenario}`)
    
    // Show a notification
    if (typeof window !== "undefined" && "Notification" in window) {
      new Notification("Demo Scenario", {
        body: `Triggered: ${scenario}`,
        icon: "/favicon.ico"
      })
    }
  }
  
  // Reset simulation
  const resetSimulation = () => {
    // In a real implementation, this would call the reset API
    console.log("Resetting simulation")
    window.location.reload()
  }
  
  // Download JSON data
  const downloadData = () => {
    // In a real implementation, this would download actual dashboard data
    const data = {
      timestamp: new Date().toISOString(),
      seed: seed,
      scenario: "current_state"
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `digital-sarpanch-data-${seed}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
  
  if (!active) return null
  
  return (
    <div className="fixed top-2 right-2 z-50">
      <div className="rounded-md bg-destructive text-destructive-foreground px-3 py-1.5 shadow flex items-center gap-2">
        <Zap className="h-4 w-4" />
        <span>{t("devActive")}</span>
      </div>
      
      <div className="mt-2 rounded-md bg-card border p-3 shadow-lg w-64">
        <h3 className="font-semibold text-sm mb-2">Developer Controls</h3>
        
        <div className="grid grid-cols-2 gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => triggerScenario("pilot-success")}
            title="Pilot Success"
          >
            <TrendingUp className="h-4 w-4" />
          </Button>
          
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => triggerScenario("drought")}
            title="Drought Scenario"
          >
            <Sun className="h-4 w-4" />
          </Button>
          
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => triggerScenario("market-shock")}
            title="Market Shock"
          >
            <AlertTriangle className="h-4 w-4" />
          </Button>
          
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => triggerScenario("school-alert")}
            title="School Alert"
          >
            <Users className="h-4 w-4" />
          </Button>
          
          <Button 
            size="sm" 
            variant="outline" 
            onClick={resetSimulation}
            title="Reset Simulation"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          
          <Button 
            size="sm" 
            variant="outline" 
            onClick={downloadData}
            title="Download Data"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="mt-3 pt-3 border-t">
          <div className="text-xs text-muted-foreground">
            <div>Seed: {seed}</div>
            <div className="mt-1">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => {
                  const newSeed = Math.floor(Math.random() * 100000)
                  setSeed(newSeed)
                  // Update URL
                  if (typeof window !== "undefined") {
                    const url = new URL(window.location.href)
                    url.searchParams.set("seed", newSeed.toString())
                    window.history.replaceState({}, "", url.toString())
                  }
                }}
              >
                New Seed
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}