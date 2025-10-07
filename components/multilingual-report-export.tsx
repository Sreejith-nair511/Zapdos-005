"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Download, FileText, FileSpreadsheet, FileJson } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"

interface ReportData {
  metrics: Record<string, any>
  aiSummaries: string[]
  agentLogs: Record<string, string[]>
  watsonXTrace: string[]
}

export function MultilingualReportExport() {
  const { lang, t } = useI18n()
  const [isGenerating, setIsGenerating] = useState(false)
  
  // Supported languages for export
  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "Hindi" },
    { code: "ml", name: "Malayalam" },
    { code: "ta", name: "Tamil" },
    { code: "kn", name: "Kannada" },
    { code: "rj", name: "Rajasthani" }
  ]
  
  // Mock report data - in a real app, this would come from the actual dashboard data
  const generateReportData = (): ReportData => {
    return {
      metrics: {
        "Welfare Enrollment": { kerala: "100%", rajasthan: "84%", national: "78%" },
        "Crop Loss Reduction": { kerala: "15%", rajasthan: "12%", national: "10%" },
        "Water Efficiency": { kerala: "30%", rajasthan: "22%", national: "19%" },
        "Citizen Satisfaction": { kerala: "92%", rajasthan: "88%", national: "85%" }
      },
      aiSummaries: [
        "Fertilizer shortage predicted in 3 wards",
        "Irrigation alerts sent to 42 farmers",
        "5 new beneficiaries verified under PM-Kisan"
      ],
      agentLogs: {
        "Farm Agent": [
          "Soil moisture at 42% in Ward 5",
          "Pest detection in 2 fields",
          "3 irrigation alerts sent"
        ],
        "Water Agent": [
          "Tank level at 68%",
          "Scheduled irrigation for 5 fields",
          "Rainfall forecast: 70% chance"
        ]
      },
      watsonXTrace: [
        "Input: 'My fields need water'",
        "Parsed: Irrigation request for Ward 5",
        "Model confidence: 92%",
        "Decision: Send irrigation alert"
      ]
    }
  }
  
  const exportReport = async (format: "pdf" | "csv" | "json", language: string) => {
    setIsGenerating(true)
    
    try {
      // In a real implementation, we would:
      // 1. Fetch current dashboard data
      // 2. Translate content to the selected language
      // 3. Generate the report in the selected format
      // 4. Trigger download
      
      const reportData = generateReportData()
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Create a mock file for download
      const content = format === "json" 
        ? JSON.stringify(reportData, null, 2)
        : format === "csv"
        ? "Metric,Kerala,Rajasthan,National\n" + 
          Object.entries(reportData.metrics)
            .map(([key, value]) => `${key},${value.kerala},${value.rajasthan},${value.national}`)
            .join("\n")
        : `Digital Sarpanch Report\n\nMetrics:\n${Object.entries(reportData.metrics).map(([key, value]) => 
            `${key}: Kerala ${value.kerala}, Rajasthan ${value.rajasthan}, National ${value.national}`).join("\n")}`
      
      // Create and download file
      const blob = new Blob([content], { 
        type: format === "json" 
          ? "application/json" 
          : format === "csv" 
            ? "text/csv" 
            : "text/plain" 
      })
      
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `digital-sarpanch-report-${language}.${format}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
    } catch (error) {
      console.error("Error generating report:", error)
    } finally {
      setIsGenerating(false)
    }
  }
  
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-medium">Export Multilingual Reports</h3>
      
      <div className="flex flex-wrap gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" disabled={isGenerating}>
              <FileText className="h-4 w-4 mr-2" />
              {isGenerating ? "Generating..." : "Export PDF"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {languages.map((language) => (
              <DropdownMenuItem 
                key={language.code}
                onClick={() => exportReport("pdf", language.code)}
              >
                {language.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" disabled={isGenerating}>
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              {isGenerating ? "Generating..." : "Export CSV"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {languages.map((language) => (
              <DropdownMenuItem 
                key={language.code}
                onClick={() => exportReport("csv", language.code)}
              >
                {language.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" disabled={isGenerating}>
              <FileJson className="h-4 w-4 mr-2" />
              {isGenerating ? "Generating..." : "Export JSON"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {languages.map((language) => (
              <DropdownMenuItem 
                key={language.code}
                onClick={() => exportReport("json", language.code)}
              >
                {language.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <p className="text-xs text-muted-foreground">
        Reports include metrics, AI summaries, agent logs, and WatsonX trace in your selected language.
      </p>
    </div>
  )
}