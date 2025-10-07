import { NextResponse } from "next/server"

const pool = [
  "⚠️ Low rainfall detected. Activating irrigation pump control.",
  "✅ PM-Kisan payments credited to 100% eligible farmers.",
  "🌦 Rajasthan drought forecast — pre-alert sent to 28 villages.",
  "📞 New citizen call recorded in Ward 5.",
]

export async function GET() {
  const now = new Date()
  const alerts = Array.from({ length: 6 }).map((_, i) => ({
    message: pool[Math.floor(Math.random() * pool.length)],
    time: new Date(now.getTime() - i * 60000).toLocaleTimeString(),
  }))
  return NextResponse.json({ alerts })
}
