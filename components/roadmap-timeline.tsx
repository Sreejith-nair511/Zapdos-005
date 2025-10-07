"use client"
import { motion } from "framer-motion"
import { CheckCircle, Circle, Play, Globe } from "lucide-react"

export function RoadmapTimeline() {
  const phases = [
    { 
      title: "Phase 1 – Payyanur Pilot", 
      status: "Complete",
      progress: 100,
      description: "Initial implementation in Payyanur, Kerala",
      icon: "1️⃣",
      completed: true
    },
    { 
      title: "Phase 2 – Multi-district Rollout", 
      status: "Ongoing",
      progress: 45,
      description: "Expanding to multiple districts in Kerala and Rajasthan",
      icon: "2️⃣",
      completed: false
    },
    { 
      title: "Phase 3 – State Rollout & NIC Partnership", 
      status: "Planned",
      progress: 10,
      description: "State-wide implementation and partnership with National Informatics Centre",
      icon: "3️⃣",
      completed: false
    },
    { 
      title: "Phase 4 – National Integration", 
      status: "Planned",
      progress: 0,
      description: "Alliance with central government schemes",
      icon: "4️⃣",
      completed: false
    },
    { 
      title: "Phase 5 – Global Adaptation", 
      status: "Planned",
      progress: 0,
      description: "International partnerships and deployments in Africa, SE Asia",
      icon: "5️⃣",
      completed: false
    },
  ]
  
  return (
    <div className="rounded-xl bg-card p-4 ring-1 ring-border">
      <div className="text-sm font-medium mb-3 flex items-center gap-2">
        <Globe className="h-4 w-4" />
        {"🧭 Expansion Roadmap: From Ward to Nation"}
      </div>
      <div className="overflow-x-auto">
        <div className="flex min-w-[800px] items-center gap-6">
          {phases.map((p, i) => (
            <motion.div 
              key={p.title} 
              className="flex-1 min-w-[200px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="rounded-lg bg-secondary p-3 h-full border-2 border-transparent hover:border-primary transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{p.icon}</span>
                  <span className="font-medium text-sm">{p.title}</span>
                  {p.completed ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{p.description}</div>
                <div className="text-xs font-medium mt-2 flex items-center gap-1">
                  {p.status === "Ongoing" && <Play className="h-3 w-3 animate-pulse" />}
                  {p.status}
                </div>
                <div className="mt-2 h-2 w-full rounded bg-muted overflow-hidden">
                  <motion.div
                    className="h-2 rounded bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${p.progress}%` }}
                    transition={{ 
                      duration: 1.5, 
                      delay: 0.5 + i * 0.2,
                      ease: "easeOut"
                    }}
                  />
                </div>
                <div className="text-xs text-right mt-1 text-muted-foreground">
                  {p.progress}%
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}