"use client"

import { I18nProvider } from "@/components/i18n-provider"
import { AgentHeader } from "@/components/agent-header"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Droplets, 
  Waves, 
  CloudRain, 
  Gauge, 
  Download,
  FileText,
  FileDigit,
  AlertTriangle,
  CheckCircle
} from "lucide-react"
import { useState } from "react"
import { ReportGenerator, ReportData } from "@/lib/report-generator"

function WaterAgentInner() {
  const [reportData, setReportData] = useState({
    tankLevel: 68,
    rainfallForecast: "70%",
    waterUsage: 4200,
    efficiency: 85,
    alerts: [
      { id: 1, message: "Tank level critical (40%)", time: "11:30 AM", severity: "high" },
      { id: 2, message: "Scheduled irrigation for 5 fields", time: "10:15 AM", severity: "medium" },
      { id: 3, message: "Rainfall forecast: 70% chance", time: "9:00 AM", severity: "low" }
    ],
    recommendations: [
      "Optimize irrigation schedule for field 2",
      "Check for leaks in distribution system",
      "Increase water allocation for field 5"
    ]
  })

  const generateReportData = (): ReportData => {
    return {
      title: "Water Agent Report",
      timestamp: new Date().toLocaleString(),
      metrics: {
        "Tank Level": `${reportData.tankLevel}%`,
        "Rainfall Forecast": reportData.rainfallForecast,
        "Water Usage": `${reportData.waterUsage}L`,
        "Efficiency": `${reportData.efficiency}%`
      },
      alerts: reportData.alerts,
      recommendations: reportData.recommendations,
      summary: "The Water Agent is monitoring tank levels and has identified a critical situation. Rainfall is forecasted which will help replenish reserves. Irrigation schedules are optimized for maximum efficiency."
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
          <AgentHeader agentName="Water Agent" />
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Water Agent Dashboard</h1>
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
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border-blue-200 dark:border-blue-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tank Level</CardTitle>
              <Droplets className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportData.tankLevel}%</div>
              <p className="text-xs text-muted-foreground">Optimal range: 60-90%</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-900/30 dark:to-sky-800/30 border-sky-200 dark:border-sky-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rainfall Forecast</CardTitle>
              <CloudRain className="h-4 w-4 text-sky-600 dark:text-sky-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportData.rainfallForecast}</div>
              <p className="text-xs text-muted-foreground">Next 24 hours</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/30 dark:to-cyan-800/30 border-cyan-200 dark:border-cyan-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Water Usage</CardTitle>
              <Waves className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportData.waterUsage}L</div>
              <p className="text-xs text-muted-foreground">Today's consumption</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-800/30 border-teal-200 dark:border-teal-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Efficiency</CardTitle>
              <Gauge className="h-4 w-4 text-teal-600 dark:text-teal-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportData.efficiency}%</div>
              <p className="text-xs text-muted-foreground">Water usage optimization</p>
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
              <Waves className="h-5 w-5" />
              Irrigation Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Field</th>
                    <th className="text-left py-2">Scheduled Time</th>
                    <th className="text-left py-2">Water Allocation</th>
                    <th className="text-left py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3">Field 1</td>
                    <td className="py-3">Today 6:00 AM</td>
                    <td className="py-3">500L</td>
                    <td className="py-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-200">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">Field 2</td>
                    <td className="py-3">Today 7:30 AM</td>
                    <td className="py-3">400L</td>
                    <td className="py-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-200">
                        In Progress
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3">Field 3</td>
                    <td className="py-3">Today 9:00 AM</td>
                    <td className="py-3">300L</td>
                    <td className="py-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-200">
                        Scheduled
                      </span>
                    </td>
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

export default function WaterAgentPage() {
  return (
    <I18nProvider>
      <WaterAgentInner />
    </I18nProvider>
  )
}