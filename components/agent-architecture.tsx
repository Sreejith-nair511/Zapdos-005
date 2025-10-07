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
  const [expandedAgents, setExpandedAgents] = useState<Record<string, boolean>>({})
  const [activeConnections, setActiveConnections] = useState<boolean[]>(Array(6).fill(false))

  // Toggle agent expansion for mobile
  const toggleAgent = (agentId: string) => {
    setExpandedAgents(prev => ({
      ...prev,
      [agentId]: !prev[agentId]
    }))
  }

  // Expand the first agent by default on mobile
  useEffect(() => {
    if (Object.keys(expandedAgents).length === 0) {
      setExpandedAgents({ [initialAgents[0].id]: true });
    }
  }, []);

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
    <Card className="w-full bg-gradient-to-br from-background to-secondary/10">
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="text-base sm:text-lg md:text-xl bg-gradient-to-r from-green-600 to-saffron-500 bg-clip-text text-transparent">
          Multi-Agent Architecture
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 md:p-6">
        <div className="relative min-h-[300px]">
          {/* Agent Nodes - Mobile-first accordion layout */}
          <div className="space-y-3 sm:space-y-4">
            {agents.map((agent, index) => (
              <motion.div
                key={agent.id}
                className="border rounded-lg overflow-hidden bg-card/50 backdrop-blur-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {/* Agent Header - Always visible */}
                <button
                  className="w-full flex items-center justify-between p-3 sm:p-4 text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 rounded-lg hover:bg-secondary/30 transition-colors"
                  onClick={() => toggleAgent(agent.id)}
                  aria-label={`Toggle ${agent.name} details`}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${getStatusColor(agent.status)} ${getStatusPulse(agent.status)}`} />
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base md:text-lg text-foreground">{agent.name}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">{agent.role}</p>
                    </div>
                  </div>
                  <div className={`transform transition-transform duration-200 flex-shrink-0 ${expandedAgents[agent.id] ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-foreground" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </button>
                
                {/* Agent Details - Collapsible on mobile */}
                <motion.div
                  className={`overflow-hidden ${expandedAgents[agent.id] ? '' : 'hidden'}`}
                  initial={false}
                  animate={{
                    height: expandedAgents[agent.id] ? "auto" : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-3 pb-3 sm:px-4 sm:pb-4 space-y-3 border-t border-border">
                    <Badge className="mt-2" variant="secondary">{agent.output}</Badge>
                    
                    {/* Activity Log */}
                    <div className="mt-2 p-3 bg-secondary/30 rounded">
                      <p className="font-medium mb-2 text-sm sm:text-base text-foreground">Activity Log:</p>
                      <ul className="space-y-1">
                        {agent.activityLog.map((log, i) => (
                          <li key={i} className="text-xs sm:text-sm text-foreground/80 truncate">{log}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Connection Visualization - Simplified for mobile */}
          <div className="mt-5 pt-4 sm:mt-6 sm:pt-4 border-t border-border">
            <h3 className="font-semibold mb-3 text-sm sm:text-base md:text-lg bg-gradient-to-r from-green-600 to-saffron-500 bg-clip-text text-transparent">
              Agent Communication & Coordination
            </h3>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3 rounded-lg bg-secondary/30">
                <p className="font-medium mb-1 text-xs sm:text-sm text-foreground">Message Passing:</p>
                <p className="text-xs sm:text-sm text-foreground/80">Agents communicate via Kafka message queues and Redis Streams for real-time coordination</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/30">
                <p className="font-medium mb-1 text-xs sm:text-sm text-foreground">Conflict Resolution:</p>
                <p className="text-xs sm:text-sm text-foreground/80">Coordinator Agent mediates between conflicting recommendations from specialized agents</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/30">
                <p className="font-medium mb-1 text-xs sm:text-sm text-foreground">Data Flow:</p>
                <p className="text-xs sm:text-sm text-foreground/80">Real-time sensor data → Specialized agents → Coordinated actions → Community impact</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}