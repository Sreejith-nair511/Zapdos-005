"use client"

import { AgentHeader } from "@/components/agent-header"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Network, 
  BarChart, 
  Users, 
  Calendar, 
  FileText,
  FileDigit,
  AlertTriangle,
  CheckCircle
} from "lucide-react"
import { useState, useEffect } from "react"
import { ReportGenerator, ReportData } from "@/lib/report-generator"
import { generateAIRecommendations, generateAISummary } from "@/lib/ai-service"

function CoordinatorAgentInner() {
  const [reportData, setReportData] = useState({
    activeAgents: 7,
    systemUptime: 98.5,
    totalAlerts: 124,
    resolvedIssues: 118,
    coordinationEfficiency: 92,
    alerts: [
      { id: 1, message: "Farm agent requires coordination with Water agent", time: "3:30 PM", severity: "medium" },
      { id: 2, message: "System maintenance scheduled for tonight", time: "1:15 PM", severity: "high" },
      { id: 3, message: "Weekly performance report generated", time: "10:00 AM", severity: "low" }
    ],
    recommendations: [
      "Schedule maintenance during low activity hours",
      "Review inter-agent communication protocols",
      "Optimize resource allocation between agents"
    ],
    summary: "The Coordinator Agent is managing 7 active agents with 98.5% system uptime. There have been 124 alerts with 118 resolved issues, achieving 92% coordination efficiency."
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
      title: "Coordinator Agent Report",
      timestamp: new Date().toLocaleString(),
      metrics: {
        "Active Agents": reportData.activeAgents.toString(),
        "System Uptime": `${reportData.systemUptime}%`,
        "Total Alerts": reportData.totalAlerts.toString(),
        "Resolved Issues": reportData.resolvedIssues.toString(),
        "Coordination Efficiency": `${reportData.coordinationEfficiency}%`
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
          <AgentHeader agentName="Coordinator Agent" />
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Coordinator Agent Dashboard</h1>
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
          <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/30 border-indigo-200 dark:border-indigo-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
              <Network className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportData.activeAgents}</div>
              <p className="text-xs text-muted-foreground">Currently online</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border-green-200 dark:border-green-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
              <BarChart className="h-4 w-4 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportData.systemUptime}%</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border-blue-200 dark:border-blue-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportData.totalAlerts}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/30 border-yellow-200 dark:border-yellow-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved Issues</CardTitle>
              <CheckCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportData.resolvedIssues}</div>
              <p className="text-xs text-muted-foreground">Successfully closed</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 border-purple-200 dark:border-purple-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Efficiency</CardTitle>
              <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportData.coordinationEfficiency}%</div>
              <p className="text-xs text-muted-foreground">Agent coordination</p>
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
  return <CoordinatorAgentInner />
}