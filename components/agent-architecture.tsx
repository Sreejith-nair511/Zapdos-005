"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Agent {
  id: string
  name: string
  role: string
  status: "active" | "syncing" | "idle"
  output: string
  activityLog: string[]
}

const initialAgents: Agent[] = [
  {
    id: "farm",
    name: "🧑‍🌾 Farm Agent",
    role: "Predicts irrigation, pest threats",
    status: "active",
    output: "moisture %, irrigation alerts",
    activityLog: [
      "Farm Agent → 3 alerts sent today",
      "Farm Agent → Soil moisture at 42%",
      "Farm Agent → Pest detection in 2 fields"
    ]
  },
  {
    id: "water",
    name: "💧 Water Agent",
    role: "Optimizes irrigation schedules",
    status: "syncing",
    output: "rainfall forecast, tank level",
    activityLog: [
      "Water Agent → Tank level at 68%",
      "Water Agent → Scheduled irrigation for 5 fields",
      "Water Agent → Rainfall forecast: 70% chance"
    ]
  },
  {
    id: "power",
    name: "⚡ Power Agent",
    role: "Manages pump/grid load",
    status: "active",
    output: "power usage %, outage events",
    activityLog: [
      "Power Agent → Grid load at 85%",
      "Power Agent → 2 outages reported",
      "Power Agent → Solar generation: 120kW"
    ]
  },
  {
    id: "welfare",
    name: "🧾 Welfare Agent",
    role: "Finds scheme-eligible families",
    status: "idle",
    output: "PM-Kisan, MGNREGS applications",
    activityLog: [
      "Welfare Agent → 15 new applications verified",
      "Welfare Agent → Payments processed for 120 families",
      "Welfare Agent → 3 discrepancies flagged"
    ]
  },
  {
    id: "market",
    name: "💰 Market Agent",
    role: "Advises on crop pricing",
    status: "active",
    output: "mandi prices, sell recommendations",
    activityLog: [
      "Market Agent → Wheat price up by 5%",
      "Market Agent → 3 sell recommendations sent",
      "Market Agent → Market trends updated"
    ]
  },
  {
    id: "education",
    name: "🎓 Education Agent",
    role: "Tracks attendance, dropouts",
    status: "syncing",
    output: "daily attendance %, alerts",
    activityLog: [
      "Education Agent → 92% attendance rate",
      "Education Agent → 2 students absent > 3 days",
      "Education Agent → 1 dropout case reported"
    ]
  },
  {
    id: "coordinator",
    name: "🤝 Coordinator Agent",
    role: "Resolves inter-agent conflicts",
    status: "active",
    output: "message queue, priority logs",
    activityLog: [
      "Coordinator Agent → 5 conflicts resolved",
      "Coordinator Agent → Message queue: 12 items",
      "Coordinator Agent → Priority re-balanced"
    ]
  }
]

export function AgentArchitecture() {
  const [agents, setAgents] = useState<Agent[]>(initialAgents)
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null)
  const [activeConnections, setActiveConnections] = useState<boolean[]>(Array(6).fill(false))

  // Simulate status changes and activity
  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prev => {
        return prev.map(agent => {
          // Randomly change status occasionally
          const statuses: ("active" | "syncing" | "idle")[] = ["active", "syncing", "idle"]
          const shouldChange = Math.random() > 0.7
          
          if (shouldChange) {
            const newStatus = statuses[Math.floor(Math.random() * statuses.length)]
            return { ...agent, status: newStatus }
          }
          
          return agent
        })
      })
      
      // Animate connections randomly
      setActiveConnections(prev => {
        return prev.map(() => Math.random() > 0.5)
      })
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500"
      case "syncing": return "bg-blue-500"
      case "idle": return "bg-gray-500"
      default: return "bg-gray-500"
    }
  }

  const getStatusPulse = (status: string) => {
    switch (status) {
      case "active": return "animate-pulse"
      case "syncing": return "animate-pulse"
      case "idle": return ""
      default: return ""
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Multi-Agent Architecture</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative min-h-[500px]">
          {/* Agent Nodes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {agents.map((agent, index) => (
              <motion.div
                key={agent.id}
                className={`rounded-lg border p-4 cursor-pointer transition-all duration-300 ${
                  hoveredAgent === agent.id ? "ring-2 ring-primary" : ""
                }`}
                onMouseEnter={() => setHoveredAgent(agent.id)}
                onMouseLeave={() => setHoveredAgent(null)}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{agent.name}</h3>
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)} ${getStatusPulse(agent.status)}`} />
                </div>
                <p className="text-sm text-muted-foreground mt-1">{agent.role}</p>
                <Badge className="mt-2" variant="secondary">{agent.output}</Badge>
                
                {/* Activity Log (shown on hover) */}
                {hoveredAgent === agent.id && (
                  <motion.div
                    className="mt-2 p-2 bg-secondary rounded text-xs"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                  >
                    <p className="font-medium mb-1">Activity Log:</p>
                    <ul className="space-y-1">
                      {agent.activityLog.map((log, i) => (
                        <li key={i} className="truncate">{log}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Connection Lines */}
          <div className="absolute inset-0 pointer-events-none">
            {/* We'll add connection lines between agents here */}
            {/* For now, we'll add a visual representation of message passing */}
            {activeConnections.map((active, index) => (
              <motion.div
                key={index}
                className={`absolute w-1 h-1 rounded-full ${
                  active ? "bg-blue-500" : "bg-transparent"
                }`}
                style={{
                  top: `${20 + index * 15}%`,
                  left: `${30 + index * 10}%`,
                }}
                animate={{
                  scale: active ? [1, 1.5, 1] : 1,
                  opacity: active ? [0.5, 1, 0.5] : 0,
                }}
                transition={{
                  duration: 1,
                  repeat: active ? Infinity : 0,
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}