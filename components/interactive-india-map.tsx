"use client"

import { useState, useEffect } from "react"
import { MapContainer, TileLayer, Polygon, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

interface RegionData {
  id: string
  name: string
  coordinates: [number, number][]
  satisfaction: number
  agentActivity: number
  uptime: number
  color: string
  highlightColor: string
}

interface LocationData {
  id: string
  name: string
  position: [number, number]
  region: string
  description: string
}

export function InteractiveIndiaMap() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)

  // Define the regions with more accurate coordinates
  const regions: RegionData[] = [
    {
      id: "kerala",
      name: "Kerala",
      coordinates: [
        [8.25, 74.8],
        [8.25, 77.4],
        [12.8, 77.4],
        [12.8, 74.8],
      ],
      satisfaction: 92,
      agentActivity: 100,
      uptime: 98,
      color: "#4caf50",
      highlightColor: "#2e7d32"
    },
    {
      id: "rajasthan",
      name: "Rajasthan",
      coordinates: [
        [23.0, 69.5],
        [23.0, 78.3],
        [30.2, 78.3],
        [30.2, 69.5],
      ],
      satisfaction: 88,
      agentActivity: 84,
      uptime: 92,
      color: "#ff9800",
      highlightColor: "#ef6c00"
    },
    {
      id: "maharashtra",
      name: "Maharashtra",
      coordinates: [
        [15.6, 72.7],
        [15.6, 80.9],
        [22.0, 80.9],
        [22.0, 72.7],
      ],
      satisfaction: 85,
      agentActivity: 78,
      uptime: 89,
      color: "#2196f3",
      highlightColor: "#0d47a1"
    }
  ]

  // Define the specific locations with accurate coordinates
  const locations: LocationData[] = [
    {
      id: "payyanur",
      name: "Payyanur",
      position: [12.1050687, 75.2058336],
      region: "kerala",
      description: "Pilot implementation site with full AI agent coverage"
    },
    {
      id: "nashik",
      name: "Nashik",
      position: [19.9973, 73.791],
      region: "maharashtra",
      description: "Agricultural hub with specialized farming agents"
    },
    {
      id: "jaipur",
      name: "Jaipur",
      position: [26.91243, 75.78727],
      region: "rajasthan",
      description: "Urban center with comprehensive governance services"
    }
  ]

  // Get the selected region data
  const selectedRegionData = regions.find(r => r.id === selectedRegion)
  const selectedLocationData = locations.find(l => l.id === selectedLocation)

  return (
    <div className="relative w-full rounded-xl bg-card border overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">India Implementation Map</h3>
        <p className="text-sm text-muted-foreground">Interactive map showing AI agent coverage across India</p>
      </div>
      
      <div className="p-4">
        <div className="relative w-full h-96 bg-blue-50 rounded-lg overflow-hidden">
          <MapContainer 
            center={[22.5, 78.5]} 
            zoom={5} 
            style={{ height: "100%", width: "100%" }}
            className="rounded-lg"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {/* Render regions as polygons */}
            {regions.map((region) => (
              <Polygon
                key={region.id}
                positions={region.coordinates as any}
                pathOptions={{
                  color: selectedRegion === region.id || hoveredRegion === region.id ? region.highlightColor : region.color,
                  fillColor: selectedRegion === region.id || hoveredRegion === region.id ? region.highlightColor : region.color,
                  fillOpacity: selectedRegion === region.id || hoveredRegion === region.id ? 0.7 : 0.5,
                  weight: selectedRegion === region.id || hoveredRegion === region.id ? 3 : 2
                }}
                eventHandlers={{
                  click: () => setSelectedRegion(region.id === selectedRegion ? null : region.id),
                  mouseover: () => setHoveredRegion(region.id),
                  mouseout: () => setHoveredRegion(null),
                }}
              />
            ))}
            
            {/* Render location markers */}
            {locations.map((location) => (
              <Marker
                key={location.id}
                position={location.position}
                eventHandlers={{
                  click: () => setSelectedLocation(location.id === selectedLocation ? null : location.id),
                }}
              >
                <Popup>
                  <div className="font-semibold">{location.name}</div>
                  <div className="text-sm text-muted-foreground">{location.description}</div>
                  <div className="mt-2 text-xs">
                    Region: {regions.find(r => r.id === location.region)?.name}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        
        {/* Details Panel */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Region Details */}
          {selectedRegionData && (
            <div className="rounded-lg p-4 border" style={{ borderColor: selectedRegionData.highlightColor }}>
              <h4 className="font-semibold text-lg" style={{ color: selectedRegionData.highlightColor }}>
                {selectedRegionData.name} Region
              </h4>
              <div className="mt-3 space-y-3">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Citizen Satisfaction</span>
                    <span className="font-semibold">{selectedRegionData.satisfaction}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        width: `${selectedRegionData.satisfaction}%`,
                        backgroundColor: selectedRegionData.highlightColor
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Agent Activity</span>
                    <span className="font-semibold">{selectedRegionData.agentActivity}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        width: `${selectedRegionData.agentActivity}%`,
                        backgroundColor: selectedRegionData.highlightColor
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>System Uptime</span>
                    <span className="font-semibold">{selectedRegionData.uptime}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        width: `${selectedRegionData.uptime}%`,
                        backgroundColor: selectedRegionData.highlightColor
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Location Details */}
          {selectedLocationData && (
            <div className="rounded-lg p-4 border bg-secondary">
              <h4 className="font-semibold text-lg">
                {selectedLocationData.name}
              </h4>
              <p className="text-sm mt-2">{selectedLocationData.description}</p>
              <div className="mt-3 p-2 bg-background rounded text-xs">
                <p>
                  <span className="font-medium">Region:</span> {regions.find(r => r.id === selectedLocationData.region)?.name}
                </p>
                <p className="mt-1">
                  This location is actively monitored by our AI agents for real-time governance services.
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {regions.map((region) => (
            <div 
              key={region.id} 
              className="rounded-lg p-3 border cursor-pointer hover:shadow-md transition-shadow"
              style={{ 
                backgroundColor: `${region.color}10`,
                borderColor: `${region.highlightColor}30`
              }}
              onClick={() => setSelectedRegion(region.id === selectedRegion ? null : region.id)}
              onMouseEnter={() => setHoveredRegion(region.id)}
              onMouseLeave={() => setHoveredRegion(null)}
            >
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: region.color }}
                />
                <h4 className="font-medium">{region.name}</h4>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                <div className="text-center">
                  <div className="text-muted-foreground">Satisfaction</div>
                  <div className="font-semibold">{region.satisfaction}%</div>
                </div>
                <div className="text-center">
                  <div className="text-muted-foreground">Activity</div>
                  <div className="font-semibold">{region.agentActivity}%</div>
                </div>
                <div className="text-center">
                  <div className="text-muted-foreground">Uptime</div>
                  <div className="font-semibold">{region.uptime}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}