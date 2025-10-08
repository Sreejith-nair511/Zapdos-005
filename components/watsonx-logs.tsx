"use client"

import useSWR from "swr"
import { useState, useEffect, useRef } from "react"
import { Terminal, Activity, Brain, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/components/i18n-provider"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function WatsonXLogs() {
  const { t, lang } = useI18n()
  const { data } = useSWR("/api/mcp", fetcher, { refreshInterval: 2000 })
  const [logs, setLogs] = useState<any[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [currentCommand, setCurrentCommand] = useState("")
  const logsEndRef = useRef<HTMLDivElement>(null)
  
  // Enhanced WatsonX logs with more realistic command line simulation
  const watsonCommands = [
    "watsonx --init",
    "watsonx model load --name agriculture-advisory-v2",
    "watsonx nlp process --input 'farmer query about water usage'",
    "watsonx inference --model agriculture-advisory-v2",
    "watsonx sentiment analyze --text 'positive feedback on service'",
    "watsonx cache invalidate --force",
    "watsonx model update --name predictive-analytics-v3",
    "watsonx health check",
    "watsonx status --detailed",
    "watsonx logs --tail 10"
  ]
  
  // Simulate command execution logs
  const simulateCommandExecution = (command: string) => {
    const timestamp = new Date().toISOString()
    const newLogs = [...logs]
    
    // Add command execution log
    newLogs.push({
      timestamp,
      message: `$ ${command}`,
      level: "COMMAND",
      service: "CLI"
    })
    
    // Add command output based on command type
    if (command.includes("init")) {
      newLogs.push({
        timestamp: new Date(Date.now() + 100).toISOString(),
        message: "IBM WatsonX AI Framework v2.1.439 initialized",
        level: "INFO",
        service: "WatsonX AI"
      })
      newLogs.push({
        timestamp: new Date(Date.now() + 200).toISOString(),
        message: "Loading core modules...",
        level: "INFO",
        service: "WatsonX AI"
      })
    } else if (command.includes("model load")) {
      newLogs.push({
        timestamp: new Date(Date.now() + 100).toISOString(),
        message: "Loading model: agriculture-advisory-v2",
        level: "INFO",
        service: "WatsonX AI"
      })
      newLogs.push({
        timestamp: new Date(Date.now() + 1500).toISOString(),
        message: "Model loaded successfully (3.2GB RAM, 2.1s load time)",
        level: "SUCCESS",
        service: "WatsonX AI"
      })
    } else if (command.includes("nlp process")) {
      newLogs.push({
        timestamp: new Date(Date.now() + 100).toISOString(),
        message: "Processing natural language input...",
        level: "INFO",
        service: "WatsonX AI"
      })
      newLogs.push({
        timestamp: new Date(Date.now() + 800).toISOString(),
        message: "Entities extracted: [water, usage, crops, irrigation]",
        level: "INFO",
        service: "WatsonX AI"
      })
      newLogs.push({
        timestamp: new Date(Date.now() + 1200).toISOString(),
        message: "Intent classified: AGRICULTURE_WATER_MANAGEMENT",
        level: "SUCCESS",
        service: "WatsonX AI"
      })
    } else if (command.includes("inference")) {
      newLogs.push({
        timestamp: new Date(Date.now() + 100).toISOString(),
        message: "Running inference on agriculture-advisory-v2 model...",
        level: "INFO",
        service: "WatsonX AI"
      })
      newLogs.push({
        timestamp: new Date(Date.now() + 2500).toISOString(),
        message: "Inference complete. Confidence: 94.2%",
        level: "SUCCESS",
        service: "WatsonX AI"
      })
      newLogs.push({
        timestamp: new Date(Date.now() + 2600).toISOString(),
        message: "Response generated: 'Based on soil moisture data, irrigate your paddy fields in 3 days.'",
        level: "OUTPUT",
        service: "WatsonX AI"
      })
    } else if (command.includes("health check")) {
      newLogs.push({
        timestamp: new Date(Date.now() + 100).toISOString(),
        message: "Performing system health check...",
        level: "INFO",
        service: "WatsonX AI"
      })
      newLogs.push({
        timestamp: new Date(Date.now() + 500).toISOString(),
        message: "CPU Usage: 45% | Memory: 6.2GB/8GB | GPU: 23%",
        level: "INFO",
        service: "WatsonX AI"
      })
      newLogs.push({
        timestamp: new Date(Date.now() + 600).toISOString(),
        message: "All systems operational",
        level: "SUCCESS",
        service: "WatsonX AI"
      })
    } else {
      // Default response for other commands
      newLogs.push({
        timestamp: new Date(Date.now() + 100).toISOString(),
        message: "Command executed successfully",
        level: "SUCCESS",
        service: "WatsonX AI"
      })
    }
    
    setLogs(newLogs)
    setCommandHistory(prev => [...prev, command])
  }
  
  // Auto-scroll to bottom of logs
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [logs])
  
  // Add real-time WatsonX logs from API
  useEffect(() => {
    if (data?.recentLogs) {
      // Filter for WatsonX related logs
      const watsonLogs = data.recentLogs.filter((log: any) => 
        log.service === "WatsonX AI" || log.message.includes("WatsonX")
      )
      setLogs(prevLogs => {
        // Merge with existing logs, avoiding duplicates
        const combined = [...prevLogs, ...watsonLogs]
        const unique = combined.filter((log, index, self) => 
          index === self.findIndex(t => t.timestamp === log.timestamp && t.message === log.message)
        )
        return unique.slice(-50) // Keep only last 50 logs
      })
    }
  }, [data])
  
  // Simulate periodic WatsonX activity
  useEffect(() => {
    const interval = setInterval(() => {
      if (isVisible && Math.random() > 0.7) { // 30% chance every 5 seconds
        const randomCommand = watsonCommands[Math.floor(Math.random() * watsonCommands.length)]
        simulateCommandExecution(randomCommand)
      }
    }, 5000)
    
    return () => clearInterval(interval)
  }, [isVisible])
  
  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentCommand.trim()) {
      simulateCommandExecution(currentCommand)
      setCurrentCommand("")
    }
  }
  
  const getLogColor = (level: string) => {
    switch (level) {
      case "ERROR": return "text-red-400"
      case "WARN": return "text-yellow-400"
      case "SUCCESS": return "text-green-400"
      case "OUTPUT": return "text-cyan-400"
      case "COMMAND": return "text-blue-400"
      default: return "text-gray-300"
    }
  }

  if (!isVisible) {
    return (
      <Button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 left-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg z-40"
        aria-label={t("watsonxLogs") || "Show WatsonX Logs"}
      >
        <Terminal className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <div className="fixed bottom-4 left-4 w-full max-w-2xl z-50">
      <Card className="bg-black text-green-400 border-green-400 shadow-xl">
        <CardHeader className="pb-2 px-3 py-2">
          <CardTitle className="text-lg flex items-center justify-between">
            <span className="flex items-center">
              <Brain className="h-5 w-5 mr-2 text-blue-400" />
              IBM WatsonX AI Terminal
            </span>
            <Button
              onClick={() => setIsVisible(false)}
              variant="ghost"
              size="sm"
              className="text-green-400 hover:text-white hover:bg-green-400/20 h-6 w-6 p-0"
              aria-label="Close logs"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <div className="font-mono text-xs max-h-80 overflow-y-auto bg-black border border-green-400 rounded mb-2 p-2">
            <div className="mb-1 text-gray-500">$ watsonx --version</div>
            <div className="mb-2">IBM WatsonX AI Framework v2.1.439</div>
            
            {logs.length > 0 ? (
              logs.map((log, index) => (
                <div key={index} className="mb-1">
                  <span className="text-gray-500 mr-2">
                    [{new Date(log.timestamp).toLocaleTimeString()}]
                  </span>
                  <span className={getLogColor(log.level)}>
                    {log.message}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-gray-500">root@watsonx:~$ Waiting for WatsonX activity...</div>
            )}
            <div ref={logsEndRef} />
          </div>
          
          <form onSubmit={handleCommandSubmit} className="flex">
            <span className="text-green-400 mr-2">root@watsonx:~$</span>
            <input
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              className="flex-1 bg-black text-green-400 border border-green-400 rounded px-2 py-1 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-green-400"
              placeholder="Enter WatsonX command..."
              aria-label="WatsonX command input"
            />
            <Button 
              type="submit"
              size="sm"
              className="ml-2 bg-green-600 hover:bg-green-700 text-white h-7 text-xs"
            >
              Run
            </Button>
          </form>
          
          <div className="flex items-center mt-2 pt-2 border-t border-green-400/30 text-xs">
            <Activity className="h-3 w-3 mr-1 animate-pulse text-blue-400" />
            <span>WatsonX AI: Operational | Language: {lang.toUpperCase()}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}