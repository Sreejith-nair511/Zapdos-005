"use client"

import dynamic from "next/dynamic"

// Dynamically import the InteractiveIndiaMap to avoid SSR issues with Leaflet
const InteractiveIndiaMap = dynamic(
  () => import("@/components/interactive-india-map").then((mod) => mod.InteractiveIndiaMap),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-96 flex items-center justify-center bg-secondary rounded-lg">
        <p>Loading interactive map...</p>
      </div>
    )
  }
)

export function DetailedIndiaMap() {
  return <InteractiveIndiaMap />
}