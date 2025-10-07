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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI-Powered Rural Services Platform Architecture</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Architecture Layers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {architectureLayers.map((layer, layerIndex) => (
              <motion.div
                key={layer.id}
                className="border rounded-lg p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: layerIndex * 0.1 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className={`p-2 rounded-full bg-${layer.color}-100 text-${layer.color}-600`}>
                    {layer.icon}
                  </div>
                  <h3 className="font-semibold">{layer.title}</h3>
                </div>
                
                <div className="space-y-2">
                  {layer.components.map((component) => (
                    <motion.div
                      key={component.id}
                      className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${
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
                      <span className="text-sm">{component.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Connection Visualization */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="font-semibold mb-4">Data Flow & Connections</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p><strong>Data Ingestion:</strong> Government APIs, Weather Feeds, Satellite Feeds, and Field Sensors feed into the Raw Data Store</p>
                <p><strong>Processing:</strong> Raw Data Store → FastAPI Backend → Central Database</p>
                <p><strong>AI Processing:</strong> WatsonX, LangChain, XGBoost, and LightGBM process data for the Multi-Agent System</p>
                <p><strong>Agent Communication:</strong> All agents communicate through the Messaging & Event Layer</p>
              </div>
              <div className="space-y-2">
                <p><strong>Edge Sync:</strong> Edge Devices sync data with the FastAPI Backend</p>
                <p><strong>Citizen Communication:</strong> Agents send alerts/insights to the Communication Layer for citizen delivery</p>
                <p><strong>Explainability:</strong> AI models are explained through SHAP and LIME to the Human Review Console</p>
                <p><strong>Infrastructure:</strong> All components are deployed and supported by the Cloud Infrastructure Layer</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}