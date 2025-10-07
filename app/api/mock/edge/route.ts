import { NextResponse } from "next/server"

export async function GET() {
  const t = Math.floor(Date.now() / 10000)
  const cpu = 42 + (t % 5)
  const battery = 70 + (t % 15)
  const queue = (t % 5) + 1
  const conn = ["GSM", "BharatNet", "Satellite"][t % 3]
  return NextResponse.json({ cpu, battery, queue, conn }, { headers: { "cache-control": "no-store" } })
}
