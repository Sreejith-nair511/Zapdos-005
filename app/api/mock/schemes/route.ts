import { NextResponse } from "next/server"

export async function GET() {
  const t = Math.floor(Date.now() / 7000)
  const status = (s: number) => ["🔄 Syncing", "✅ Active", "🛰 Online", "⚠️ Pending"][s % 4]
  return NextResponse.json(
    {
      pmkisan: status(t + 1),
      egram: status(t + 2),
      udise: status(t + 3),
      fasal: status(t + 4),
      bharatnet: status(t + 5),
    },
    { headers: { "cache-control": "no-store" } },
  )
}
