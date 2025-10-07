"use client"

import { I18nProvider } from "@/components/i18n-provider"
import { AgentHeader } from "@/components/agent-header"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Zap, 
  Battery, 
  Sun, 
  Power, 
  Download,
  FileText,
  FileDigit,
  AlertTriangle,
  CheckCircle
} from "lucide-react"
import { useState } from "react"
import { ReportGenerator, ReportData } from "@/lib/report-generator"

function PowerAgentInner() {
  const [reportData, setReportData] = useState({
    gridLoad: 85,
    solarGeneration: 120,
    batteryLevel: 72,
    outages: 2,
    alerts: [
      { id: 1, message: "Grid load at 85%", time: "12:30 PM", severity: "medium" },
      { id: 2, message: "2 outages reported", time: "11:15 AM", severity: "high" },
      { id: 3, message: "Solar generation: 120kW", time: "10:00 AM", severity: "low" }
    ],
    recommendations: [
      "Schedule maintenance for transformer 3",
      "Optimize solar panel angle for afternoon",
      "Prepare backup generators for peak hours"
    ]
  })

  const generateReportData = (): ReportData => {
    return {
      title: "Power Agent Report",
      timestamp: new Date().toLocaleString(),
      metrics: {
        "Grid Load": `${reportData.gridLoad}%`,
        "Solar Generation": `${reportData.solarGeneration}kW`,
        "Battery Level": `${reportData.batteryLevel}%`,
        "Outages": reportData.outages.toString()
      },
      alerts: reportData.alerts,
      recommendations: reportData.recommendations,
      summary: "The Power Agent is monitoring grid stability with high load conditions. Solar generation is performing well and battery reserves are adequate. Two outages were reported and resolved."
    }
  }

  const downloadReport = (format: 'html' | 'pdf' = 'html') => {
    const data = generateReportData()
    ReportGenerator.downloadReport(data, format)
  }

  return (
    <div className="min-h-screen bg-background light-theme-bg">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <AgentHeader agentName="Power Agent" />
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Power Agent Dashboard</h1>
          <div className="flex gap-2">
            <Button onClick={() => downloadReport('html')} className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Download HTML
            </Button>
            <Button onClick={() => downloadReport('pdf')} variant="outline" className="flex items-center gap-2">
              <FileDigit className="h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/30 border-yellow-200 dark:border-yellow-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Grid Load</CardTitle>
              <Zap className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportData.gridLoad}%</div>
              <p className="text-xs text-muted-foreground">Current capacity usage</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 border-orange-200 dark:border-orange-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Solar Generation</CardTitle>
              <Sun className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportData.solarGeneration}kW</div>
              <p className="text-xs text-muted-foreground">Current production</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border-green-200 dark:border-green-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Battery Level</CardTitle>
              <Battery className="h-4 w-4 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportData.batteryLevel}%</div>
              <p className="text-xs text-muted-foreground">Backup storage</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 border-red-200 dark:border-red-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Outages</CardTitle>
              <Power className="h-4 w-4 text-red-600 dark:text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportData.outages}</div>
              <p className="text-xs text-muted-foreground">Reported today</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Recent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportData.alerts.map((alert) => (
                  <div 
                    key={alert.id} 
                    className={`p-4 rounded-lg border ${
                      alert.severity === "high" 
                        ? "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800" 
                        : alert.severity === "medium" 
                          ? "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800" 
                          : "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <p className="font-medium">{alert.message}</p>
                      <span className="text-xs text-muted-foreground">{alert.time}</span>
                    </div>
                    <div className="mt-2 flex items-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        alert.severity === "high" 
                          ? "bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-200" 
                          : alert.severity === "medium" 
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-200" 
                            : "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-200"
                      }`}>
                        {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)} Priority
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportData.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start p-4 bg-secondary rounded-lg">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm">{rec}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Power Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Area</th>
                    <th className="text-left py-2">Load</th>
                    <th className="text-left py-2">Status</th>
                    <th className="text-left py-2">Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3">Ward 1</td>
                    <td className="py-3">75%</td>
                    <td className="py-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-200">
                        Stable
                      </span>
                    </td>
                    <td className="py-3">2 min ago</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">Ward 2</td>
                    <td className="py-3">82%</td>
                    <td className="py-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-200">
                        High Load
                      </span>
                    </td>
                    <td className="py-3">5 min ago</td>
                  </tr>
                  <tr>
                    <td className="py-3">Ward 3</td>
                    <td className="py-3">68%</td>
                    <td className="py-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-200">
                        Stable
                      </span>
                    </td>
                    <td className="py-3">10 min ago</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default function PowerAgentPage() {
  return (
    <I18nProvider>
      <PowerAgentInner />
    </I18nProvider>
  )
}