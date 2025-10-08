import { NextResponse } from "next/server"

// Simulate MCP server data with more realistic information
export async function GET() {
  // Serve 439 users as requested (Payyanur, Kerala pilot case)
  const userCount = 439
  
  // Simulate server metrics that change over time
  const timestamp = new Date().toISOString()
  const uptimeSeconds = Math.floor(Date.now() / 1000) % 86400 // Seconds in a day
  const uptime = `${Math.floor(uptimeSeconds / 3600)}h ${Math.floor((uptimeSeconds % 3600) / 60)}m ${uptimeSeconds % 60}s`
  
  // Simulate varying CPU and memory usage
  const cpuUsage = 45 + (Math.sin(Date.now() / 60000) * 10) // Oscillates between 35-55%
  const memoryUsage = 65 + (Math.cos(Date.now() / 45000) * 15) // Oscillates between 50-80%
  
  // Simulate network statistics
  const networkStats = {
    packetsSent: Math.floor(1000000 + (Date.now() % 100000)),
    packetsReceived: Math.floor(950000 + (Date.now() % 95000)),
    errors: Math.floor((Date.now() % 100)),
    latency: 25 + (Math.sin(Date.now() / 30000) * 10) // Oscillates between 15-35ms
  }
  
  // Simulate active connections by region with focus on Payyanur, Kerala
  const regions = [
    { name: "Payyanur, Kerala (Pilot)", users: 439, language: "Malayalam", activeConnections: 120 },
    { name: "Kasaragod, Kerala", users: 210, language: "Malayalam", activeConnections: 65 },
    { name: "Kannur, Kerala", users: 187, language: "Malayalam", activeConnections: 58 },
    { name: "Rajasthan", users: 142, language: "Hindi", activeConnections: 38 },
    { name: "Karnataka", users: 87, language: "Kannada", activeConnections: 25 }
  ]
  
  // Simulate service statuses with WatsonX focus
  const services = [
    { name: "Voice Recognition", status: "Operational", responseTime: "12ms" },
    { name: "Text-to-Speech", status: "Operational", responseTime: "8ms" },
    { name: "Analytics Engine", status: "Operational", responseTime: "45ms" },
    { name: "Database", status: "Operational", responseTime: "18ms" },
    { name: "WatsonX AI - Agriculture", status: "Operational", responseTime: "67ms" },
    { name: "WatsonX AI - Education", status: "Operational", responseTime: "52ms" },
    { name: "WatsonX AI - Welfare", status: "Operational", responseTime: "78ms" }
  ]
  
  // Simulate recent activity logs with IBM WatsonX logs focused on Payyanur results
  const recentLogs = [
    { timestamp: new Date(Date.now() - 1000).toISOString(), message: "WatsonX agriculture model processed crop advisory for paddy field in Payyanur", level: "INFO", service: "WatsonX AI - Agriculture" },
    { timestamp: new Date(Date.now() - 5000).toISOString(), message: "User query processed successfully: 'My paddy crop is drying'", level: "INFO", service: "WatsonX AI - Agriculture" },
    { timestamp: new Date(Date.now() - 10000).toISOString(), message: "WatsonX model loaded: agriculture-advisory-v2 (Payyanur dialect support)", level: "INFO", service: "WatsonX AI - Agriculture" },
    { timestamp: new Date(Date.now() - 15000).toISOString(), message: "Voice command recognized in Malayalam dialect (Payyanur variant)", level: "INFO", service: "Voice Recognition" },
    { timestamp: new Date(Date.now() - 20000).toISOString(), message: "WatsonX NLP processing complete - Intent: CROP_WATER_MANAGEMENT", level: "INFO", service: "WatsonX AI - Agriculture" },
    { timestamp: new Date(Date.now() - 30000).toISOString(), message: "New user registered from Payyanur, Kerala (Ward 439)", level: "INFO", service: "Database" },
    { timestamp: new Date(Date.now() - 45000).toISOString(), message: "TTS response generated in Malayalam (Payyanur dialect)", level: "INFO", service: "Text-to-Speech" },
    { timestamp: new Date(Date.now() - 60000).toISOString(), message: "WatsonX sentiment analysis completed - Positive feedback on IVR service", level: "INFO", service: "WatsonX AI" },
    { timestamp: new Date(Date.now() - 90000).toISOString(), message: "Predictive model updated - Crop irrigation schedule optimized", level: "INFO", service: "WatsonX AI - Agriculture" },
    { timestamp: new Date(Date.now() - 120000).toISOString(), message: "WatsonX cache invalidated for Payyanur region data refresh", level: "INFO", service: "WatsonX AI" },
    { timestamp: new Date(Date.now() - 150000).toISOString(), message: "Payyanur pilot results: 100% scheme enrollment, 15% crop loss reduction", level: "SUCCESS", service: "Analytics Engine" }
  ]

  // Simulate Payyanur pilot case results
  const pilotResults = {
    location: "Payyanur, Kerala (Ward: 439 People)",
    partnership: "Local Panchayat + IBM WatsonX",
    duration: "6 months",
    results: {
      schemeEnrollment: "100%",
      cropLossReduction: "15%",
      waterWastageReduction: "30%",
      schoolAttendanceImprovement: "18%",
      citizenSatisfaction: "92%"
    }
  }

  const data = {
    userCount,
    serverStatus: "Online",
    version: "MCP-v2.1.439",
    timestamp,
    uptime,
    cpuUsage: cpuUsage.toFixed(1) + "%",
    memoryUsage: memoryUsage.toFixed(1) + "%",
    networkStats,
    regions,
    services,
    recentLogs,
    pilotResults,
    lastSync: new Date().toISOString()
  }
  
  return NextResponse.json(data)
}