"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Database, 
  Globe, 
  CloudRain, 
  Satellite, 
  Activity, 
  Server, 
  Clock, 
  Code, 
  Cloud, 
  Brain, 
  BarChart2, 
  BarChart, 
  Leaf, 
  Droplet, 
  Zap, 
  Gift, 
  ShoppingCart, 
  Book, 
  UserCheck, 
  MessageCircle, 
  Cpu, 
  RefreshCw, 
  Phone, 
  MessageSquare, 
  Volume2, 
  Radio, 
  Shield, 
  Lock
} from "lucide-react"

interface ArchitectureLayer {
  id: string
  title: string
  color: string
  icon: React.ReactNode
  components: {
    id: string
    name: string
    icon: React.ReactNode
  }[]
}

const architectureLayers: ArchitectureLayer[] = [
  {
    id: "data",
    title: "Data Ingestion & Storage",
    color: "blue",
    icon: <Database className="h-5 w-5" />,
    components: [
      { id: "gov-api", name: "Government APIs", icon: <Globe className="h-4 w-4" /> },
      { id: "weather", name: "Weather Feeds", icon: <CloudRain className="h-4 w-4" /> },
      { id: "satellite", name: "Satellite Feeds", icon: <Satellite className="h-4 w-4" /> },
      { id: "sensors", name: "Field Sensors", icon: <Activity className="h-4 w-4" /> },
      { id: "raw-db", name: "Raw Data Store", icon: <Server className="h-4 w-4" /> }
    ]
  },
  {
    id: "backend",
    title: "Backend & Processing",
    color: "purple",
    icon: <Server className="h-5 w-5" />,
    components: [
      { id: "fastapi", name: "FastAPI Backend", icon: <Code className="h-4 w-4" /> },
      { id: "scheduler", name: "Scheduler", icon: <Clock className="h-4 w-4" /> },
      { id: "central-db", name: "Central Database", icon: <Database className="h-4 w-4" /> },
      { id: "api-gateway", name: "API Gateway", icon: <Cloud className="h-4 w-4" /> }
    ]
  },
  {
    id: "ai",
    title: "AI & Intelligence",
    color: "orange",
    icon: <Brain className="h-5 w-5" />,
    components: [
      { id: "watsonx", name: "WatsonX", icon: <Brain className="h-4 w-4" /> },
      { id: "langchain", name: "LangChain", icon: <Code className="h-4 w-4" /> },
      { id: "xgboost", name: "XGBoost", icon: <BarChart2 className="h-4 w-4" /> },
      { id: "lightgbm", name: "LightGBM", icon: <BarChart className="h-4 w-4" /> }
    ]
  },
  {
    id: "agents",
    title: "Multi-Agent System",
    color: "green",
    icon: <UserCheck className="h-5 w-5" />,
    components: [
      { id: "farm", name: "Farm Agent", icon: <Leaf className="h-4 w-4" /> },
      { id: "water", name: "Water Agent", icon: <Droplet className="h-4 w-4" /> },
      { id: "power", name: "Power Agent", icon: <Zap className="h-4 w-4" /> },
      { id: "welfare", name: "Welfare Agent", icon: <Gift className="h-4 w-4" /> },
      { id: "market", name: "Market Agent", icon: <ShoppingCart className="h-4 w-4" /> },
      { id: "education", name: "Education Agent", icon: <Book className="h-4 w-4" /> },
      { id: "coordinator", name: "Coordinator Agent", icon: <UserCheck className="h-4 w-4" /> }
    ]
  },
  {
    id: "messaging",
    title: "Messaging & Event Layer",
    color: "yellow",
    icon: <MessageCircle className="h-5 w-5" />,
    components: [
      { id: "kafka", name: "Kafka", icon: <MessageCircle className="h-4 w-4" /> },
      { id: "redis", name: "Redis Streams", icon: <Database className="h-4 w-4" /> }
    ]
  },
  {
    id: "edge",
    title: "Edge Layer",
    color: "gray",
    icon: <Cpu className="h-5 w-5" />,
    components: [
      { id: "edge-device", name: "Edge Device", icon: <Cpu className="h-4 w-4" /> },
      { id: "local-ai", name: "Local AI Models", icon: <Brain className="h-4 w-4" /> },
      { id: "sqlite", name: "SQLite", icon: <Database className="h-4 w-4" /> },
      { id: "sync", name: "Sync Service", icon: <RefreshCw className="h-4 w-4" /> }
    ]
  },
  {
    id: "communication",
    title: "Communication Layer",
    color: "red",
    icon: <Phone className="h-5 w-5" />,
    components: [
      { id: "ivr", name: "IVR", icon: <Phone className="h-4 w-4" /> },
      { id: "sms", name: "SMS Gateway", icon: <MessageSquare className="h-4 w-4" /> },
      { id: "tts", name: "TTS (WatsonX)", icon: <Volume2 className="h-4 w-4" /> },
      { id: "loudspeakers", name: "Loudspeakers", icon: <Volume2 className="h-4 w-4" /> },
      { id: "radio", name: "Community Radio", icon: <Radio className="h-4 w-4" /> }
    ]
  },
  {
    id: "explainability",
    title: "Explainability & Safety",
    color: "teal",
    icon: <Shield className="h-5 w-5" />,
    components: [
      { id: "shap", name: "SHAP", icon: <BarChart className="h-4 w-4" /> },
      { id: "lime", name: "LIME", icon: <BarChart2 className="h-4 w-4" /> },
      { id: "human-review", name: "Human Review Console", icon: <UserCheck className="h-4 w-4" /> }
    ]
  },
  {
    id: "cloud",
    title: "Cloud Infrastructure",
    color: "black",
    icon: <Cloud className="h-5 w-5" />,
    components: [
      { id: "aws", name: "AWS", icon: <Cloud className="h-4 w-4" /> },
      { id: "gcp", name: "GCP", icon: <Cloud className="h-4 w-4" /> },
      { id: "docker", name: "Docker", icon: <Server className="h-4 w-4" /> },
      { id: "k8s", name: "Kubernetes", icon: <Server className="h-4 w-4" /> },
      { id: "security", name: "Security", icon: <Lock className="h-4 w-4" /> }
    ]
  }
]

export function PlatformArchitecture() {
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null)
  const [expandedLayers, setExpandedLayers] = useState<Record<string, boolean>>({})

  const toggleLayer = (layerId: string) => {
    setExpandedLayers(prev => ({
      ...prev,
      [layerId]: !prev[layerId]
    }))
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">AI-Powered Rural Services Platform Architecture</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Architecture Layers - Mobile-first accordion layout */}
          <div className="space-y-4">
            {architectureLayers.map((layer, layerIndex) => (
              <motion.div
                key={layer.id}
                className="border rounded-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: layerIndex * 0.05 }}
              >
                {/* Layer Header - Always visible */}
                <button
                  className="w-full flex items-center justify-between p-3 sm:p-4 text-left"
                  onClick={() => toggleLayer(layer.id)}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-2 rounded-full bg-secondary">
                      {layer.icon}
                    </div>
                    <h3 className="font-semibold text-sm sm:text-base">{layer.title}</h3>
                  </div>
                  <div className="transform transition-transform duration-200">
                    {expandedLayers[layer.id] ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </button>
                
                {/* Layer Content - Collapsible on mobile */}
                <motion.div
                  className={`overflow-hidden ${expandedLayers[layer.id] ? '' : 'hidden'}`}
                  initial={false}
                  animate={{
                    height: expandedLayers[layer.id] ? "auto" : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-3 pb-3 sm:px-4 sm:pb-4 space-y-2 border-t">
                    {layer.components.map((component) => (
                      <motion.div
                        key={component.id}
                        className={`flex items-center gap-2 p-2 rounded transition-colors ${
                          hoveredComponent === component.id 
                            ? "bg-secondary" 
                            : "hover:bg-secondary/50"
                        }`}
                        onMouseEnter={() => setHoveredComponent(component.id)}
                        onMouseLeave={() => setHoveredComponent(null)}
                        whileHover={{ x: 5 }}
                      >
                        <div className="flex-shrink-0 text-muted-foreground">
                          {component.icon}
                        </div>
                        <span className="text-xs sm:text-sm">{component.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Connection Visualization - Simplified for mobile */}
          <div className="mt-6 pt-4 border-t">
            <h3 className="font-semibold mb-3 text-sm sm:text-base">Data Flow & Connections</h3>
            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <p className="font-medium mb-1">Data Ingestion:</p>
                <p>Government APIs, Weather Feeds, Satellite Feeds, and Field Sensors → Raw Data Store</p>
              </div>
              <div>
                <p className="font-medium mb-1">Processing:</p>
                <p>Raw Data Store → FastAPI Backend → Central Database</p>
              </div>
              <div>
                <p className="font-medium mb-1">AI Processing:</p>
                <p>WatsonX, LangChain, XGBoost, LightGBM → Multi-Agent System</p>
              </div>
              <div>
                <p className="font-medium mb-1">Communication:</p>
                <p>Agents → Messaging Layer → Communication Layer → Citizens</p>
              </div>
              <div>
                <p className="font-medium mb-1">Infrastructure:</p>
                <p>All components deployed and supported by Cloud Infrastructure</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
