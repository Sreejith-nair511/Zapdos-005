import { NextResponse } from "next/server"

function jitter(val: number, delta = 2) {
  const d = (Math.random() * 2 - 1) * delta
  return Math.max(0, Math.round((val + d) * 10) / 10)
}

export async function GET() {
  const base = [
    { metric: "Crop Loss Reduction", kerala: 15, rajasthan: 12, national: 10 },
    { metric: "Welfare Enrollment", kerala: 100, rajasthan: 84, national: 78 },
    { metric: "Water Wastage Cut", kerala: 30, rajasthan: 22, national: 19 },
    { metric: "Citizen Satisfaction", kerala: 92, rajasthan: 88, national: 85 },
  ]
  const metrics = base.map((row) => ({
    metric: row.metric,
    kerala: jitter(row.kerala, 1),
    rajasthan: jitter(row.rajasthan, 1),
    national: jitter(row.national, 1),
  }))
  return NextResponse.json({ metrics, updated: new Date().toLocaleTimeString() })
}
