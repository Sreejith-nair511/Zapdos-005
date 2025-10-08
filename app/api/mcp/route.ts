import { NextResponse } from "next/server"

// Simulate MCP server data
export async function GET() {
  // Serve 439 users as requested
  const userCount = 439
  
  const data = {
    userCount,
    serverStatus: "Online",
    lastSync: new Date().toISOString(),
    regions: [
      { name: "Kerala", users: 156, language: "Malayalam" },
      { name: "Rajasthan", users: 142, language: "Hindi" },
      { name: "Karnataka", users: 87, language: "Kannada" },
      { name: "Tamil Nadu", users: 54, language: "Tamil" }
    ],
    uptime: "99.9%",
    version: "MCP-v2.1.439"
  }
  
  return NextResponse.json(data)
}