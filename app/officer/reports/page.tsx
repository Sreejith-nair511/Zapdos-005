"use client"
import { I18nProvider } from "@/components/i18n-provider"
import { AccessibilitySuite } from "@/components/accessibility-suite"
import { DevRibbon } from "@/components/dev-ribbon"
import { OfficerHeader } from "@/components/officer-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Download, BarChart, PieChart } from "lucide-react"
import { Button } from "@/components/ui/button"

function ReportsInner() {
  const reports = [
    { id: 1, title: "Farm Agent Report", date: "2025-10-07", type: "PDF" },
    { id: 2, title: "Water Agent Report", date: "2025-10-07", type: "HTML" },
    { id: 3, title: "Power Agent Report", date: "2025-10-06", type: "PDF" },
    { id: 4, title: "Welfare Agent Report", date: "2025-10-06", type: "HTML" },
    { id: 5, title: "Market Agent Report", date: "2025-10-05", type: "PDF" },
    { id: 6, title: "Education Agent Report", date: "2025-10-05", type: "HTML" },
  ]

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 md:py-8 grid gap-6" role="main">
      <OfficerHeader />

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reports</h1>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
          <BarChart className="h-4 w-4 mr-2" />
          Generate New Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <Card key={report.id} className="vibrant-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{report.title}</span>
                <FileText className="h-5 w-5 text-blue-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{report.date}</span>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  {report.type}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="h-5 w-5 mr-2 text-green-500" />
              Report Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-muted-foreground">Chart visualization would appear here</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart className="h-5 w-5 mr-2 text-purple-500" />
              Report Generation Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-muted-foreground">Chart visualization would appear here</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Accessibility Suite */}
      <AccessibilitySuite />
      
      {/* Developer Features */}
      <DevRibbon />
    </main>
  )
}

export default function Page() {
  return (
    <I18nProvider>
      <ReportsInner />
    </I18nProvider>
  )
}