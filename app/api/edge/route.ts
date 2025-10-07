import { NextResponse } from "next/server"

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export async function GET() {
  const modes = ["Online", "Syncing", "Offline"] as const
  const mode = modes[rand(0, modes.length - 1)]
  const status = mode === "Offline" ? "Offline" : mode
  return NextResponse.json({
    status,
    lastSync: "Just Now",
    cpuTemp: rand(40, 55),
    storage: rand(50, 75),
    latency: rand(20, 80),
    mode,
    solar: rand(70, 100),
    pending: rand(0, 6),
    network: "BharatNet",
  })
}
