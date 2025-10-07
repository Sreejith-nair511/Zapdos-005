"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Zap, 
  Calendar, 
  FileText, 
  Download,
  Filter,
  Search
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Agent {
  id: string
  name: string
  status: "active" | "paused" | "error"
  lastActive: string
  eventsProcessed: number
  alertFrequency: number
}

interface LogEntry {
  id: string
  timestamp: string
  agent: string
  action: string
  confidence: number
  status: "success" | "warning" | "error"
}

const mockAgents: Agent[] = [
  { id: "1", name: "Farm Agent", status: "active", lastActive: "2025-10-07 14:30:22", eventsProcessed: 1247, alertFrequency: 15 },
  { id: "2", name: "Water Agent", status: "active", lastActive: "2025-10-07 14:28:15", eventsProcessed: 892, alertFrequency: 10 },
  { id: "3", name: "Welfare Agent", status: "paused", lastActive: "2025-10-07 14:25:44", eventsProcessed: 563, alertFrequency: 5 },
  { id: "4", name: "Market Agent", status: "active", lastActive: "2025-10-07 14:32:10", eventsProcessed: 324, alertFrequency: 20 },
  { id: "5", name: "Education Agent", status: "active", lastActive: "2025-10-07 14:29:57", eventsProcessed: 756, alertFrequency: 12 },
]

const mockLogs: LogEntry[] = [
  { id: "1", timestamp: "2025-10-07 14:32:10", agent: "Farm Agent", action: "Irrigation triggered for Field A", confidence: 94, status: "success" },
  { id: "2", timestamp: "2025-10-07 14:31:45", agent: "Water Agent", action: "Tank level low alert sent", confidence: 88, status: "warning" },
  { id: "3", timestamp: "2025-10-07 14:30:22", agent: "Welfare Agent", action: "PM-Kisan application processed", confidence: 96, status: "success" },
  { id: "4", timestamp: "2025-10-07 14:29:57", agent: "Education Agent", action: "Dropout risk alert sent", confidence: 82, status: "warning" },
  { id: "5", timestamp: "2025-10-07 14:28:15", agent: "Market Agent", action: "Price fluctuation detected", confidence: 79, status: "warning" },
  { id: "6", timestamp: "2025-10-07 14:25:44", agent: "Farm Agent", action: "Pest detection in Field B", confidence: 91, status: "success" },
]

export function AgentControlConsole() {
  const [agents, setAgents] = useState<Agent[]>(mockAgents)
  const [logs, setLogs] = useState<LogEntry[]>(mockLogs)
  const [showLogs, setShowLogs] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedScenario, setSelectedScenario] = useState("")

  const toggleAgentStatus = (id: string) => {
    setAgents(agents.map(agent => 
      agent.id === id 
        ? { 
            ...agent, 
            status: agent.status === "active" ? "paused" : "active" 
          } 
        : agent
    ))
  }

  const updateAlertFrequency = (id: string, frequency: number) => {
    setAgents(agents.map(agent => 
      agent.id === id 
        ? { ...agent, alertFrequency: frequency } 
        : agent
    ))
  }

  const injectMockEvent = () => {
    const newLog: LogEntry = {
      id: (logs.length + 1).toString(),
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      agent: "Mock Agent",
      action: "Custom event injected by admin",
      confidence: Math.floor(Math.random() * 20) + 80,
      status: "success"
    }
    setLogs([newLog, ...logs])
  }

  const replayScenario = () => {
    if (!selectedScenario) return
    
    const scenarios: Record<string, LogEntry[]> = {
      drought: [
        { id: "s1", timestamp: new Date().toISOString().replace("T", " ").substring(0, 19), agent: "Water Agent", action: "Drought warning issued", confidence: 92, status: "warning" },
        { id: "s2", timestamp: new Date().toISOString().replace("T", " ").substring(0, 19), agent: "Farm Agent", action: "Irrigation conservation mode activated", confidence: 89, status: "success" },
      ],
      festival: [
        { id: "s3", timestamp: new Date().toISOString().replace("T", " ").substring(0, 19), agent: "Market Agent", action: "Festival pricing alert", confidence: 85, status: "warning" },
        { id: "s4", timestamp: new Date().toISOString().replace("T", " ").substring(0, 19), agent: "Welfare Agent", action: "Festival bonus distribution", confidence: 95, status: "success" },
      ],
      market: [
        { id: "s5", timestamp: new Date().toISOString().replace("T", " ").substring(0, 19), agent: "Market Agent", action: "Price shock detected", confidence: 78, status: "warning" },
        { id: "s6", timestamp: new Date().toISOString().replace("T", " ").substring(0, 19), agent: "Farm Agent", action: "Crop sale recommendation updated", confidence: 87, status: "success" },
      ]
    }
    
    const scenarioLogs = scenarios[selectedScenario] || []
    setLogs([...scenarioLogs, ...logs])
  }

  const exportLogs = () => {
    const csvContent = [
      ["Timestamp", "Agent", "Action", "Confidence", "Status"],
      ...logs.map(log => [
        log.timestamp,
        log.agent,
        log.action,
        log.confidence,
        log.status
      ])
    ].map(row => row.join(",")).join("\n")
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', 'agent_logs.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.agent.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          log.action.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || log.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Agent Control Console
          </span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowLogs(!showLogs)}
          >
            {showLogs ? "Hide Logs" : "Show Logs"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Agent Controls */}
        <div className="space-y-4">
          <h3 className="font-medium flex items-center gap-2">
            <Play className="h-4 w-4" />
            Agent Management
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map(agent => (
              <motion.div
                key={agent.id}
                className="rounded-lg border p-4"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{agent.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Last active: {agent.lastActive}
                    </p>
                  </div>
                  <Badge 
                    variant={agent.status === "active" ? "default" : "secondary"}
                    className={agent.status === "active" ? "bg-green-100 text-green-800" : ""}
                  >
                    {agent.status}
                  </Badge>
                </div>
                
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-sm">
                    {agent.eventsProcessed} events
                  </span>
                  <Button 
                    size="sm" 
                    variant={agent.status === "active" ? "secondary" : "default"}
                    onClick={() => toggleAgentStatus(agent.id)}
                  >
                    {agent.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                </div>
                
                <div className="mt-3">
                  <label className="text-sm text-muted-foreground">Alert Frequency</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input 
                      type="range" 
                      min="1" 
                      max="30" 
                      value={agent.alertFrequency}
                      onChange={(e) => updateAlertFrequency(agent.id, parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm w-10">{agent.alertFrequency}/hr</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Scenario Controls */}
        <div className="space-y-4">
          <h3 className="font-medium flex items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            Scenario Simulation
          </h3>
          
          <div className="flex flex-wrap gap-3">
            <Select value={selectedScenario} onValueChange={setSelectedScenario}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select scenario" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="drought">Drought</SelectItem>
                <SelectItem value="festival">Festival</SelectItem>
                <SelectItem value="market">Market Shock</SelectItem>
              </SelectContent>
            </Select>
            
            <Button onClick={replayScenario} disabled={!selectedScenario}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Replay Scenario
            </Button>
            
            <Button onClick={injectMockEvent} variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Inject Custom Event
            </Button>
          </div>
        </div>
        
        {/* Log Viewer */}
        {showLogs && (
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <h3 className="font-medium flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Agent Action Logs
            </h3>
            
            <div className="flex flex-wrap gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
              
              <Button onClick={exportLogs}>
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
            
            <div className="border rounded-lg max-h-96 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="bg-secondary sticky top-0">
                  <tr>
                    <th className="text-left p-3">Timestamp</th>
                    <th className="text-left p-3">Agent</th>
                    <th className="text-left p-3">Action</th>
                    <th className="text-left p-3">Confidence</th>
                    <th className="text-left p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map(log => (
                    <tr key={log.id} className="border-b hover:bg-secondary/50">
                      <td className="p-3">{log.timestamp}</td>
                      <td className="p-3">{log.agent}</td>
                      <td className="p-3">{log.action}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-blue-600 h-1.5 rounded-full" 
                              style={{ width: `${log.confidence}%` }}
                            ></div>
                          </div>
                          <span>{log.confidence}%</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge 
                          variant={log.status === "success" ? "default" : log.status === "warning" ? "secondary" : "destructive"}
                          className={
                            log.status === "success" ? "bg-green-100 text-green-800" : 
                            log.status === "warning" ? "bg-yellow-100 text-yellow-800" : 
                            "bg-red-100 text-red-800"
                          }
                        >
                          {log.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}