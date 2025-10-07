"use client"
import useSWR from "swr"
import { motion } from "framer-motion"

const fetcher = (u: string) => fetch(u).then((r) => r.json())

export function EdgeGatewayCard() {
  const { data } = useSWR("/api/edge", fetcher, { refreshInterval: 5000 })
  const d = data ?? {
    status: "Online",
    cpuTemp: 48,
    storage: 62,
    latency: 42,
    mode: "Online",
    solar: 96,
    pending: 3,
  }

  // Determine status color
  const statusColor = d.status === "Online" ? "bg-green-500" : d.status === "Syncing" ? "bg-amber-500" : "bg-gray-400"

  return (
    <div className="rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-3 sm:p-4 ring-1 ring-blue-200 dark:ring-blue-800 border-2 border-blue-200 dark:border-blue-800 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="font-medium text-sm sm:text-base bg-gradient-to-r from-green-600 to-saffron-500 bg-clip-text text-transparent">{"Edge Gateway (Raspberry Pi)"}</div>
        <div
          className={`h-2 w-2 rounded-full ${statusColor}`}
          aria-label={`Status: ${d.status}`}
        />
      </div>
      
      {/* Raspberry Pi Visualization */};
      <div className="mt-3 flex justify-center">
        <div className="relative w-24 h-16 sm:w-32 sm:h-24 bg-gray-800 rounded-lg flex items-center justify-center">
          {/* Pi Board */}
          <div className="absolute inset-1 sm:inset-2 border-2 border-gray-600 rounded bg-gray-900"></div>
          
          {/* Status LED */}
          <motion.div 
            className={`absolute top-1 sm:top-2 right-1 sm:right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${statusColor}`}
            animate={{ 
              opacity: d.status === "Online" ? [0.5, 1, 0.5] : 1,
              scale: d.status === "Syncing" ? [1, 1.2, 1] : 1
            }}
            transition={{ 
              duration: d.status === "Online" ? 2 : 0.5,
              repeat: d.status === "Online" ? Infinity : 0
            }}
          />
          
          {/* GPIO Pins */}
          <div className="absolute right-0 top-2 sm:top-4 bottom-2 sm:bottom-4 w-0.5 sm:w-1 flex flex-col gap-0.5 sm:gap-1">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-0.5 sm:h-1 bg-gray-600 rounded-r"></div>
            ))}
          </div>
          
          {/* Micro USB / Power */}
          <div className="absolute left-1 sm:left-2 bottom-1 sm:bottom-2 w-2 sm:w-4 h-1 sm:h-2 bg-gray-700 rounded"></div>
        </div>
      </div>
      
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs sm:text-sm">
        <div className="rounded bg-secondary/50 p-2 flex items-center">
          <span>{`CPU Temp: ${d.cpuTemp}°C`}</span>
          {/* Temperature indicator */}
          <div className="ml-2 w-8 h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-red-500 rounded-full"
              style={{ width: `${Math.min(100, d.cpuTemp)}%` }}
              animate={{ width: `${Math.min(100, d.cpuTemp + Math.random() * 5 - 2.5)}%` }}
              transition={{ duration: 2 }}
            />
          </div>
        </div>
        <div className="rounded bg-secondary/50 p-2">{`Local Storage: ${d.storage}%`}</div>
        <div className="rounded bg-secondary/50 p-2">{`Latency: ${d.latency} ms`}</div>
        <div className="rounded bg-secondary/50 p-2">{`Mode: ${d.mode}`}</div>
        <div className="rounded bg-secondary/50 p-2 flex items-center">
          <span>{`Solar Battery: ${d.solar}%`}</span>
          {/* Battery indicator */}
          <div className="ml-2 w-8 h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className={`h-full rounded-full ${
                d.solar > 70 ? "bg-green-500" : d.solar > 30 ? "bg-yellow-500" : "bg-red-500"
              }`}
              style={{ width: `${d.solar}%` }}
              animate={{ width: `${Math.min(100, d.solar + Math.random() * 3 - 1.5)}%` }}
              transition={{ duration: 3 }}
            />
          </div>
        </div>
        <div className="rounded bg-secondary/50 p-2">{`Sync Pending: ${d.pending} files`}</div>
      </div>
      
      {/* Offline Queue Animation */}
      {d.pending > 0 && (
        <div className="mt-2 flex items-center text-xs text-muted-foreground">
          <motion.div
            className="w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-blue-500 rounded-full mr-2"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <span>{"Auto-syncing queued files…"}</span>
          <motion.span 
            className="ml-1"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ({d.pending})
          </motion.span>
        </div>
      )}
      
      {/* Solar Charge Curve */}
      <div className="mt-3">
        <div className="text-xs text-muted-foreground mb-1">Solar Charge Curve</div>
        <div className="h-6 sm:h-8 bg-secondary rounded relative overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 100 20">
            <motion.path
              d="M 0 15 Q 25 5, 50 10 T 100 5"
              fill="none"
              stroke="oklch(var(--chart-1))"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            />
          </svg>
        </div>
      </div>
    </div>
  )
}