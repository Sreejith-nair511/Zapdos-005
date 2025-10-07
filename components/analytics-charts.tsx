"use client"
import useSWR from "swr"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
  ReferenceLine,
} from "recharts"
import { motion } from "framer-motion"

const fetcher = (u: string) => fetch(u).then((r) => r.json())

interface ChartData {
  label: string
  kerala: number
  rajasthan: number
  national: number
  forecast: number
  confidenceUpper?: number
  confidenceLower?: number
}

export function AnalyticsCharts() {
  const { data } = useSWR("/api/analytics", fetcher, { refreshInterval: 10000 })
  const series: ChartData[] = data?.series ?? [
    { label: "Week 1", kerala: 72, rajasthan: 60, national: 58, forecast: 75, confidenceLower: 70, confidenceUpper: 80 },
    { label: "Week 2", kerala: 74, rajasthan: 62, national: 59, forecast: 76, confidenceLower: 71, confidenceUpper: 81 },
    { label: "Week 3", kerala: 78, rajasthan: 65, national: 60, forecast: 79, confidenceLower: 74, confidenceUpper: 84 },
    { label: "Week 4", kerala: 81, rajasthan: 67, national: 61, forecast: 82, confidenceLower: 77, confidenceUpper: 87 },
  ]
  
  // Add more data points for smoother curves
  const extendedSeries = [...series]
  if (series.length > 0) {
    // Add some intermediate points for smoother animation
    for (let i = 0; i < series.length - 1; i++) {
      const current = series[i]
      const next = series[i + 1]
      extendedSeries.splice(i * 2 + 1, 0, {
        label: `Mid ${i+1}`,
        kerala: (current.kerala + next.kerala) / 2,
        rajasthan: (current.rajasthan + next.rajasthan) / 2,
        national: (current.national + next.national) / 2,
        forecast: (current.forecast + next.forecast) / 2,
        confidenceLower: current.confidenceLower && next.confidenceLower ? 
          (current.confidenceLower + next.confidenceLower) / 2 : undefined,
        confidenceUpper: current.confidenceUpper && next.confidenceUpper ? 
          (current.confidenceUpper + next.confidenceUpper) / 2 : undefined,
      })
    }
  }

  return (
    <div className="grid gap-4">
      <motion.div 
        className="rounded-xl bg-card p-4 ring-1 ring-border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-sm font-medium mb-2">{"Welfare Enrollment (%)"}</div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={series}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="kerala" fill="oklch(var(--chart-1))" name="Kerala" />
              <Bar dataKey="rajasthan" fill="oklch(var(--chart-2))" name="Rajasthan" />
              <Bar dataKey="national" fill="oklch(var(--chart-3))" name="National Avg" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div 
        className="rounded-xl bg-card p-4 ring-1 ring-border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="text-sm font-medium mb-2">{"Water Efficiency (%)"}</div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={series}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="kerala" fill="oklch(var(--chart-1))" name="Kerala" />
              <Bar dataKey="rajasthan" fill="oklch(var(--chart-2))" name="Rajasthan" />
              <Bar dataKey="national" fill="oklch(var(--chart-3))" name="National Avg" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div 
        className="rounded-xl bg-card p-4 ring-1 ring-border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="text-sm font-medium mb-2">{"Predictive Trends with Confidence Bands"}</div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={extendedSeries}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis domain={[50, 100]} />
              <Tooltip />
              <Legend />
              <ReferenceLine y={75} stroke="oklch(var(--muted-foreground))" strokeDasharray="3 3" />
              <Area 
                type="monotone" 
                dataKey="confidenceUpper" 
                fill="oklch(var(--chart-4) / 0.2)" 
                stroke="none" 
                name="Confidence Upper"
              />
              <Area 
                type="monotone" 
                dataKey="confidenceLower" 
                fill="oklch(var(--chart-4) / 0.2)" 
                stroke="none" 
                name="Confidence Lower"
              />
              <Line 
                type="monotone" 
                dataKey="forecast" 
                stroke="oklch(var(--chart-4))" 
                name="Forecast"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="kerala" 
                stroke="oklch(var(--chart-1))" 
                name="Kerala Actual"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div 
        className="rounded-xl bg-card p-4 ring-1 ring-border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="text-sm font-medium mb-2">{"Crop Health Index"}</div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={extendedSeries}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="kerala" 
                stroke="oklch(var(--chart-1))" 
                name="Kerala"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />
              <Line 
                type="monotone" 
                dataKey="rajasthan" 
                stroke="oklch(var(--chart-2))" 
                name="Rajasthan"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div 
        className="rounded-xl bg-card p-4 ring-1 ring-border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="text-sm font-medium mb-2">{"Attendance Tracking"}</div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={extendedSeries}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis domain={[80, 100]} />
              <Tooltip />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="kerala" 
                fill="oklch(var(--chart-1) / 0.3)" 
                stroke="oklch(var(--chart-1))" 
                name="Kerala"
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="rajasthan" 
                fill="oklch(var(--chart-2) / 0.3)" 
                stroke="oklch(var(--chart-2))" 
                name="Rajasthan"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  )
}