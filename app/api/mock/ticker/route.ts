import { NextResponse } from "next/server"

const agents = [
  { name: "Farm Agent", kind: "info", msg: "Soil moisture below threshold." },
  { name: "Water Agent", kind: "warn", msg: "Tank level critical (40%)." },
  { name: "Education Agent", kind: "info", msg: "2 students absent > 3 days." },
  { name: "Welfare Agent", kind: "info", msg: "5 new beneficiaries verified." },
] as const

export async function GET() {
  const out = Array.from({ length: 6 }).map((_, i) => {
    const a = agents[(Math.floor(Date.now() / 3000) + i) % agents.length]
    return {
      id: `${i}-${a.name}`,
      agent: a.name,
      level: a.kind === "warn" ? "warn" : "info",
      message: a.msg,
    }
  })
  return NextResponse.json(out, { headers: { "cache-control": "no-store" } })
}
