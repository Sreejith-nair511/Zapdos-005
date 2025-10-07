import { NextResponse } from "next/server"

export async function GET() {
  const now = Date.now()
  const pts = Array.from({ length: 24 }).map((_, i) => {
    const t = new Date(now - (24 - i) * 5_000)
    const water = 20 + (i % 7) * 2 + Math.sin(i / 3) * 3
    const welfare = 70 + (i % 5) * 1.2 + Math.cos(i / 4) * 2
    return { t: t.toTimeString().slice(0, 5), water: Math.round(water), welfare: Math.round(welfare) }
  })
  return NextResponse.json(pts, { headers: { "cache-control": "no-store" } })
}
