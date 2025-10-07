import { NextResponse } from "next/server"

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export async function GET() {
  const labels = ["Week 1", "Week 2", "Week 3", "Week 4"]
  const series = labels.map((label) => ({
    label,
    kerala: rand(70, 85),
    rajasthan: rand(55, 70),
    national: rand(55, 65),
    forecast: rand(75, 90),
  }))
  return NextResponse.json({ series })
}
