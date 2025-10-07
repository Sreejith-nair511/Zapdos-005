"use client"

import { useState, useEffect } from "react"
import useSWR from "swr"
import { motion, AnimatePresence } from "framer-motion"
import { AlertCircle, CheckCircle, Info, AlertTriangle, Mic, Volume2, Brain, Check, Eye } from "lucide-react"

interface TickerItem {
  id: string
  agent: string
  level: "info" | "warn" | "error" | "success"
  message: string
  stt?: {
    transcription: string
    confidence: number
  }
  reasoning?: {
    steps: string[]
    confidence: number
  }
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const getAgentColor = (agent: string) => {
  switch (agent) {
    case "Farm Agent": return "text-green-500"
    case "Water Agent": return "text-blue-500"
    case "Power Agent": return "text-yellow-500"
    case "Welfare Agent": return "text-purple-500"
    case "Market Agent": return "text-orange-500"
    case "Education Agent": return "text-indigo-500"
    case "Coordinator Agent": return "text-pink-500"
    default: return "text-gray-500"
  }
}

const getLevelIcon = (level: string) => {
  switch (level) {
    case "warn": return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    case "error": return <AlertCircle className="h-4 w-4 text-red-500" />
    case "success": return <CheckCircle className="h-4 w-4 text-green-500" />
    default: return <Info className="h-4 w-4 text-blue-500" />
  }
}

export function LiveAIFeed() {
  const { data, error } = useSWR<TickerItem[]>("/api/mock/ticker", fetcher, {
    refreshInterval: 5000,
  })
  
  const [items, setItems] = useState<TickerItem[]>([])
  const [showWatsonXModal, setShowWatsonXModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<TickerItem | null>(null)
  
  // Update items when new data comes in
  useEffect(() => {
    if (data) {
      // Enhance data with WatsonX simulation
      const enhancedData = data.map(item => {
        // Add STT simulation for some items
        const shouldAddSTT = Math.random() > 0.7
        const stt = shouldAddSTT ? {
          transcription: "Citizen reporting water shortage in sector 3",
          confidence: Math.floor(Math.random() * 20) + 80 // 80-99%
        } : undefined
        
        // Add reasoning simulation for some items
        const shouldAddReasoning = Math.random() > 0.6
        const reasoning = shouldAddReasoning ? {
          steps: [
            "Input: Water level sensors show 23% capacity",
            "Rule: Trigger alert when below 30%",
            "Context: No rainfall forecast for next 5 days",
            "Decision: Send conservation alert to citizens",
            "Confidence: 94%"
          ],
          confidence: Math.floor(Math.random() * 15) + 85 // 85-99%
        } : undefined
        
        return {
          ...item,
          stt,
          reasoning
        }
      })
      setItems(enhancedData)
    }
  }, [data])

  const openWatsonXModal = (item: TickerItem) => {
    setSelectedItem(item)
    setShowWatsonXModal(true)
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Failed to load AI feed
      </div>
    )
  }

  return (
    <div className="bg-card rounded-lg border p-3 sm:p-4 h-64 overflow-hidden">
      <h3 className="font-semibold mb-2 text-lg">Live AI Feed</h3>
      <div className="h-52 overflow-y-auto">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col sm:flex-row sm:items-start gap-2 p-2 mb-2 rounded bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <div className="mt-0.5 flex-shrink-0">
                {getLevelIcon(item.level)}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`font-medium ${getAgentColor(item.agent)}`}>
                  {item.agent}
                </div>
                <p className="text-sm text-foreground">
                  {item.message}
                </p>
                {item.stt && (
                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                    <Mic className="h-3 w-3" />
                    <span>STT: {item.stt.transcription} (Conf: {item.stt.confidence}%)</span>
                  </div>
                )}
                {item.reasoning && (
                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                    <Brain className="h-3 w-3" />
                    <span>Reasoning: {item.reasoning.steps.length} steps (Conf: {item.reasoning.confidence}%)</span>
                  </div>
                )}
              </div>
              <div className="flex gap-1 flex-wrap sm:flex-nowrap mt-2 sm:mt-0">
                <button 
                  className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition-colors flex items-center gap-1 whitespace-nowrap flex-1 min-w-[80px]"
                  aria-label="Acknowledge"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Acknowledge clicked for item:', item.id);
                    // Add your acknowledge logic here
                  }}
                >
                  <Check className="h-3 w-3" />
                  <span className="hidden xs:inline">Acknowledge</span>
                </button>
                <button 
                  className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors flex items-center gap-1 whitespace-nowrap flex-1 min-w-[80px]"
                  aria-label="Verify"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openWatsonXModal(item);
                  }}
                >
                  <Eye className="h-3 w-3" />
                  <span className="hidden xs:inline">Verify</span>
                </button>
                <button 
                  className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors flex items-center gap-1 whitespace-nowrap flex-1 min-w-[80px]"
                  aria-label="Escalate"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Escalate clicked for item:', item.id);
                    // Add your escalate logic here
                  }}
                >
                  <AlertTriangle className="h-3 w-3" />
                  <span className="hidden xs:inline">Escalate</span>
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {items.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            No AI events at the moment
          </div>
        )}
      </div>

      {/* WatsonX Modal */}
      {showWatsonXModal && selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="w-full max-w-2xl rounded-xl bg-card p-3 sm:p-6 ring-1 ring-border max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg sm:text-xl font-semibold">IBM WatsonX Insights</h3>
              <button 
                className="text-2xl"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowWatsonXModal(false);
                }}
              >
                &times;
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-lg flex items-center gap-2">
                  <Mic className="h-5 w-5" />
                  Speech-to-Text Transcription
                </h4>
                {selectedItem.stt ? (
                  <div className="mt-2 p-3 bg-secondary rounded">
                    <p className="font-mono text-sm">{selectedItem.stt.transcription}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${selectedItem.stt.confidence}%` }}
                        ></div>
                      </div>
                      <span className="text-xs sm:text-sm font-medium">Confidence: {selectedItem.stt.confidence}%</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No STT data available for this event</p>
                )}
              </div>
              
              <div>
                <h4 className="font-medium text-lg flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI Reasoning Chain
                </h4>
                {selectedItem.reasoning ? (
                  <div className="mt-2 space-y-3">
                    {selectedItem.reasoning.steps.map((step, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs mt-0.5">
                          {index + 1}
                        </div>
                        <div className="ml-2 p-2 bg-secondary rounded flex-1">
                          <p className="text-sm">{step}</p>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center gap-2 mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${selectedItem.reasoning.confidence}%` }}
                        ></div>
                      </div>
                      <span className="text-xs sm:text-sm font-medium">Confidence: {selectedItem.reasoning.confidence}%</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No reasoning data available for this event</p>
                )}
              </div>
              
              <div className="flex gap-2 pt-4 flex-col sm:flex-row">
                <button 
                  className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Acknowledge clicked for item:', selectedItem?.id);
                    setShowWatsonXModal(false);
                    // Add your acknowledge logic here
                  }}
                >
                  <Check className="h-4 w-4" />
                  <span>Acknowledge</span>
                </button>
                <button 
                  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Verify clicked for item:', selectedItem?.id);
                    setShowWatsonXModal(false);
                    // Add your verify logic here
                  }}
                >
                  <Eye className="h-4 w-4" />
                  <span>Verify</span>
                </button>
                <button 
                  className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Escalate clicked for item:', selectedItem?.id);
                    setShowWatsonXModal(false);
                    // Add your escalate logic here
                  }}
                >
                  <AlertTriangle className="h-4 w-4" />
                  <span>Escalate</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}