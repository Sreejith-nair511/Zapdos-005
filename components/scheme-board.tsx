"use client"
import useSWR from "swr"
import { motion } from "framer-motion"

const fetcher = (u: string) => fetch(u).then((r) => r.json())

interface Scheme {
  name: string
  purpose: string
  status: "Active" | "Syncing" | "Linked" | "Verification Needed" | "Synced" | "Pending" | "Online"
}

export function SchemeBoard() {
  const { data } = useSWR("/api/schemes", fetcher, { refreshInterval: 8000 })
  const schemes: Scheme[] = data?.schemes ?? [
    { name: "PM-Kisan", purpose: "Farmer Income Support", status: "Active" },
    { name: "eGramSwaraj", purpose: "Panchayat Governance Data", status: "Syncing" },
    { name: "UDISE+", purpose: "Education Analytics", status: "Linked" },
    { name: "PM Fasal Bima", purpose: "Crop Insurance", status: "Pending" },
    { name: "BharatNet", purpose: "Connectivity", status: "Online" },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
      case "Linked":
      case "Synced":
      case "Online":
        return "bg-green-100 text-green-800"
      case "Syncing":
        return "bg-amber-100 text-amber-800"
      case "Pending":
      case "Verification Needed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
      case "Linked":
      case "Synced":
      case "Online":
        return "✅"
      case "Syncing":
        return "🔄"
      case "Pending":
      case "Verification Needed":
        return "⚠️"
      default:
        return "❓"
    }
  }

  return (
    <div className="rounded-xl bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-3 sm:p-4 ring-1 ring-green-200 dark:ring-green-800 border-2 border-green-200 dark:border-green-800 backdrop-blur-sm">
      <div className="text-sm sm:text-base font-medium mb-3 bg-gradient-to-r from-green-600 to-saffron-500 bg-clip-text text-transparent">{"Unified Scheme Integration"}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
        {schemes.map((scheme) => (
          <div 
            key={scheme.name} 
            className="rounded-xl bg-secondary/50 p-3 sm:p-4 relative overflow-hidden hover:bg-secondary/70 transition-colors"
          >
            {/* Animated data beam effect for syncing status */}
            {scheme.status === "Syncing" && (
              <motion.div
                className="absolute top-0 left-0 h-full w-1 bg-blue-500"
                animate={{ 
                  x: [0, 200],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
            
            <div className="font-medium text-sm sm:text-base">{scheme.name}</div>
            <div className="text-xs sm:text-sm text-muted-foreground mt-1">{scheme.purpose}</div>
            
            <div className="mt-3 flex items-center justify-between">
              <div className={`inline-block rounded px-2 py-1 text-xs ${getStatusBadge(scheme.status)}`}>
                {getStatusIcon(scheme.status)} {scheme.status}
              </div>
              
              {/* Data beam visualization */}
              <div className="flex items-center">
                {(scheme.status === "Active" || scheme.status === "Linked" || scheme.status === "Online") && (
                  <motion.div
                    className="w-2 h-2 bg-green-500 rounded-full mr-1"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity
                    }}
                  />
                )}
                {scheme.status === "Syncing" && (
                  <motion.div
                    className="w-2 h-2 bg-blue-500 rounded-full mr-1"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}