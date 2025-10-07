// This is a mock implementation since we can't use external libraries in this environment
// In a real implementation, you would use libraries like jsPDF, html2pdf, or similar

export interface ReportData {
  title: string
  timestamp: string
  metrics: Record<string, any>
  alerts: Array<{
    id: number
    message: string
    time: string
    severity: string
  }>
  recommendations: string[]
  summary: string
}

export class ReportGenerator {
  static generateHTML(reportData: ReportData): string {
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${reportData.title} - Digital Sarpanch Report</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f7fa;
          }
          .header {
            text-align: center;
            padding: 20px 0;
            border-bottom: 2px solid #2d86ff;
            margin-bottom: 30px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .logo {
            width: 80px;
            height: 80px;
            margin: 0 auto 15px;
            background: #2d86ff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 32px;
            font-weight: bold;
          }
          .title {
            font-size: 28px;
            color: #2d86ff;
            margin: 0;
          }
          .subtitle {
            font-size: 16px;
            color: #666;
            margin: 5px 0 0;
          }
          .section {
            background: white;
            margin-bottom: 25px;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .section-title {
            font-size: 20px;
            color: #2d86ff;
            margin-top: 0;
            padding-bottom: 10px;
            border-bottom: 1px solid #eee;
          }
          .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 15px;
          }
          .metric-card {
            background: #f0f7ff;
            padding: 15px;
            border-radius: 6px;
            text-align: center;
          }
          .metric-value {
            font-size: 24px;
            font-weight: bold;
            color: #2d86ff;
          }
          .metric-label {
            font-size: 14px;
            color: #666;
            margin-top: 5px;
          }
          .alert {
            padding: 12px 15px;
            margin-bottom: 10px;
            border-radius: 6px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .alert-high {
            background: #ffebee;
            border-left: 4px solid #f44336;
          }
          .alert-medium {
            background: #fff8e1;
            border-left: 4px solid #ffc107;
          }
          .alert-low {
            background: #e8f5e9;
            border-left: 4px solid #4caf50;
          }
          .alert-message {
            flex: 1;
          }
          .alert-time {
            font-size: 12px;
            color: #666;
          }
          .recommendations-list {
            padding-left: 20px;
          }
          .recommendations-list li {
            margin-bottom: 10px;
          }
          .footer {
            text-align: center;
            padding: 20px;
            color: #666;
            font-size: 14px;
            border-top: 1px solid #eee;
            margin-top: 30px;
          }
          .timestamp {
            color: #2d86ff;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">DS</div>
          <h1 class="title">${reportData.title}</h1>
          <p class="subtitle">Digital Sarpanch AI Agent Report</p>
        </div>
        
        <div class="section">
          <h2 class="section-title">Report Summary</h2>
          <p>${reportData.summary}</p>
          <p class="timestamp">Generated on: ${reportData.timestamp}</p>
        </div>
        
        <div class="section">
          <h2 class="section-title">Key Metrics</h2>
          <div class="metrics-grid">
            ${Object.entries(reportData.metrics).map(([key, value]) => `
              <div class="metric-card">
                <div class="metric-value">${value}</div>
                <div class="metric-label">${key}</div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="section">
          <h2 class="section-title">Recent Alerts</h2>
          ${reportData.alerts.map(alert => `
            <div class="alert alert-${alert.severity.toLowerCase()}">
              <div class="alert-message">${alert.message}</div>
              <div class="alert-time">${alert.time}</div>
            </div>
          `).join('')}
        </div>
        
        <div class="section">
          <h2 class="section-title">AI Recommendations</h2>
          <ul class="recommendations-list">
            ${reportData.recommendations.map(rec => `<li>${rec}</li>`).join('')}
          </ul>
        </div>
        
        <div class="footer">
          <p>This report was automatically generated by the Digital Sarpanch AI system.</p>
          <p>For more information, visit our dashboard at digital-sarpanch.example.com</p>
        </div>
      </body>
      </html>
    `
    
    return html
  }
  
  static generatePDF(reportData: ReportData): Promise<Blob> {
    // In a real implementation, this would generate an actual PDF
    // For now, we'll return a Blob with the HTML content
    const html = this.generateHTML(reportData)
    return Promise.resolve(new Blob([html], { type: 'application/pdf' }))
  }
  
  static downloadReport(data: ReportData, format: 'html' | 'pdf' = 'html'): void {
    if (format === 'html') {
      const html = this.generateHTML(data)
      const blob = new Blob([html], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${data.title.replace(/\s+/g, '_')}_report_${new Date().toISOString().slice(0, 10)}.${format}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } else {
      // For PDF, we'll generate HTML and download as PDF for now
      const html = this.generateHTML(data)
      const blob = new Blob([html], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${data.title.replace(/\s+/g, '_')}_report_${new Date().toISOString().slice(0, 10)}.${format}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }
}