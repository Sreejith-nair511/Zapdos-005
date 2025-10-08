"use client"

import { AgentHeader } from "@/components/agent-header"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Leaf, 
  BarChart, 
  Droplets, 
  Calendar, 
  FileText,
  FileDigit,
  AlertTriangle,
  CheckCircle
} from "lucide-react"
import { useState, useEffect } from "react"
import { ReportGenerator, ReportData } from "@/lib/report-generator"
import { generateAIRecommendations, generateAISummary } from "@/lib/ai-service"

function FarmAgentInner() {
  const [reportData, setReportData] = useState({
    activeFarms: 1247,
    cropHealth: 87,
    irrigationEfficiency: 92,
    seasonalAdvisories: 15,
    weatherAlerts: 3,
    alerts: [
      { id: 1, message: "Paddy fields showing signs of pest infestation", time: "2:15 PM", severity: "high" },
      { id: 2, message: "Weather advisory: Heavy rainfall expected", time: "11:30 AM", severity: "medium" },
      { id: 3, message: "Irrigation schedule updated for sector 3", time: "9:45 AM", severity: "low" }
    ],
    recommendations: [
      "Apply organic pesticide to affected paddy fields",
      "Prepare for heavy rainfall with proper drainage",
      "Optimize irrigation timing for water conservation"
    ],
    summary: "The Farm Agent is monitoring 1,247 active farms with 87% average crop health. Irrigation efficiency is at 92% with 15 seasonal advisories issued. Currently managing 3 active alerts."
  })

  const [isLoadingAI, setIsLoadingAI] = useState(false)

  // Generate AI recommendations when the component mounts
  useEffect(() => {
    generateAIInsights()
  }, [])

  const generateAIInsights = async () => {
    setIsLoadingAI(true)
    try {
      const data = generateReportData()
      
      // Generate AI recommendations
      const aiRecommendations = await generateAIRecommendations(data)
      
      // Generate AI summary
      const aiSummary = await generateAISummary(data)
      
      setReportData(prev => ({
        ...prev,
        recommendations: aiRecommendations,
        summary: aiSummary
      }))
    } catch (error) {
      console.error("Error generating AI insights:", error)
    } finally {
      setIsLoadingAI(false)
    }
  }

  const generateReportData = (): ReportData => {
    return {
      title: "Farm Agent Report",
      timestamp: new Date().toLocaleString(),
      metrics: {
        "Active Farms": reportData.activeFarms.toString(),
        "Crop Health": `${reportData.cropHealth}%`,
        "Irrigation Efficiency": `${reportData.irrigationEfficiency}%`,
        "Seasonal Advisories": reportData.seasonalAdvisories.toString(),
        "Weather Alerts": reportData.weatherAlerts.toString()
      },
      alerts: reportData.alerts,
      recommendations: reportData.recommendations,
      summary: reportData.summary
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
          <AgentHeader agentName="Farm Agent" />
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Farm Agent Dashboard</h1>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border-green-200 dark:border-green-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Farms</CardTitle>
              <Leaf className="h-4 w-4 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportData.activeFarms}</div>
              <p className="text-xs text-muted-foreground">Currently monitored</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border-blue-200 dark:border-blue-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Crop Health</CardTitle>
              <BarChart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportData.cropHealth}%</div>
              <p className="text-xs text-muted-foreground">Average health score</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/30 dark:to-cyan-800/30 border-cyan-200 dark:border-cyan-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Irrigation</CardTitle>
              <Droplets className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportData.irrigationEfficiency}%</div>
              <p className="text-xs text-muted-foreground">Efficiency rating</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/30 border-yellow-200 dark:border-yellow-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Advisories</CardTitle>
              <Calendar className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportData.seasonalAdvisories}</div>
              <p className="text-xs text-muted-foreground">This season</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 border-red-200 dark:border-red-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weather Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportData.weatherAlerts}</div>
              <p className="text-xs text-muted-foreground">Active alerts</p>
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
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="ml-3 text-sm">{rec}</p>
                  </div>
                ))}
              </div>
              <Button 
                onClick={generateAIInsights} 
                disabled={isLoadingAI}
                className="mt-4 w-full"
                variant="outline"
              >
                {isLoadingAI ? "Generating..." : "Refresh AI Insights"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default function Page() {
  return <FarmAgentInner />
}