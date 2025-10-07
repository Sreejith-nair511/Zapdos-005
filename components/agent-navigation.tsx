"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  Sprout, 
  Droplets, 
  Zap, 
  Users, 
  IndianRupee, 
  School, 
  Network 
} from "lucide-react"

export function AgentNavigation() {
  const agents = [
    { id: "farm", name: "Farm Agent", icon: Sprout, color: "text-orange-500" },
    { id: "water", name: "Water Agent", icon: Droplets, color: "text-blue-500" },
    { id: "power", name: "Power Agent", icon: Zap, color: "text-yellow-500" },
    { id: "welfare", name: "Welfare Agent", icon: Users, color: "text-purple-500" },
    { id: "market", name: "Market Agent", icon: IndianRupee, color: "text-green-500" },
    { id: "education", name: "Education Agent", icon: School, color: "text-teal-500" },
    { id: "coordinator", name: "Coordinator Agent", icon: Network, color: "text-pink-500" },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {agents.map((agent) => {
        const Icon = agent.icon
        return (
          <Link key={agent.id} href={`/agents/${agent.id}`}>
            <Button 
              variant="outline" 
              className="w-full h-auto flex flex-col items-center justify-center p-4 gap-2 hover:scale-105 transition-transform bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2 hover:border-blue-300 dark:hover:border-blue-700"
            >
              <Icon className={`h-8 w-8 ${agent.color}`} />
              <span className="text-sm font-medium text-center">{agent.name}</span>
            </Button>
          </Link>
        )
      })}
    </div>
  )
}