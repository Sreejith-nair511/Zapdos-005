"use client"

import { I18nProvider } from "@/components/i18n-provider"
import { AgentHeader } from "@/components/agent-header"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ShoppingCart, 
  TrendingUp, 
  Package, 
  Calendar, 
  FileText,
  FileDigit,
  AlertTriangle,
  CheckCircle
} from "lucide-react"
import { useState } from "react"
import { ReportGenerator, ReportData } from "@/lib/report-generator"

function MarketAgentInner() {
  const [reportData, setReportData] = useState({
    dailySales: 245000,
    vendors: 87,
    productsListed: 156,
    pendingOrders: 32,
    customerSatisfaction: 92,
    alerts: [
      { id: 1, message: "High demand for organic products", time: "1:30 PM", severity: "medium" },
      { id: 2, message: "Vendor registration pending approval", time: "11:45 AM", severity: "high" },
      { id: 3, message: "Market price update completed", time: "9:00 AM", severity: "low" }
    ],
    recommendations: [
      "Promote organic product vendors",
      "Review pending vendor registrations",
      "Implement dynamic pricing for seasonal products"
    ]
  })

  const generateReportData = (): ReportData => {
    return {
      title: "Market Agent Report",
      timestamp: new Date().toLocaleString(),
      metrics: {
        "Daily Sales": `₹${reportData.dailySales.toLocaleString()}`,
        "Active Vendors": reportData.vendors.toString(),
        "Products Listed": reportData.productsListed.toString(),
        "Pending Orders": reportData.pendingOrders.toString(),
        "Customer Satisfaction": `${reportData.customerSatisfaction}%`
      },
      alerts: reportData.alerts,
      recommendations: reportData.recommendations,
      summary: "The Market Agent is facilitating ₹2.45 lakh in daily sales across 87 vendors. Customer satisfaction is at 92%. There are 32 pending orders and 156 products listed."
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
          <AgentHeader agentName="Market Agent" />
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Market Agent Dashboard</h1>
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
              <CardTitle className="text-sm font-medium">Daily Sales</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{reportData.dailySales.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Today's revenue</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border-blue-200 dark:border-blue-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vendors</CardTitle>
              <ShoppingCart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportData.vendors}</div>
              <p className="text-xs text-muted-foreground">Active vendors</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 border-purple-200 dark:border-purple-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <Package className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportData.productsListed}</div>
              <p className="text-xs text-muted-foreground">Listed items</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/30 border-yellow-200 dark:border-yellow-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <Calendar className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportData.pendingOrders}</div>
              <p className="text-xs text-muted-foreground">Awaiting fulfillment</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 border-red-200 dark:border-red-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
              <CheckCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportData.customerSatisfaction}%</div>
              <p className="text-xs text-muted-foreground">Customer rating</p>
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
              <Calendar className="h-5 w-5" />
              Top Selling Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Product</th>
                    <th className="text-left py-2">Category</th>
                    <th className="text-left py-2">Sales Volume</th>
                    <th className="text-left py-2">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3">Organic Vegetables</td>
                    <td className="py-3">Produce</td>
                    <td className="py-3">1,250 kg</td>
                    <td className="py-3">₹45,000</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">Handmade Crafts</td>
                    <td className="py-3">Artisan</td>
                    <td className="py-3">85 units</td>
                    <td className="py-3">₹32,500</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">Dairy Products</td>
                    <td className="py-3">Dairy</td>
                    <td className="py-3">950 liters</td>
                    <td className="py-3">₹28,500</td>
                  </tr>
                  <tr>
                    <td className="py-3">Spices & Herbs</td>
                    <td className="py-3">Grocery</td>
                    <td className="py-3">75 kg</td>
                    <td className="py-3">₹22,750</td>
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

export default function MarketAgentPage() {
  return (
    <I18nProvider>
      <MarketAgentInner />
    </I18nProvider>
  )
}