import { NextResponse } from "next/server"

const palette = ["bg-green-500", "bg-orange-500", "bg-yellow-500", "bg-emerald-500", "bg-red-500"]

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export async function GET() {
  const regions = ["Kerala", "Rajasthan", "Karnataka", "Tamil Nadu", "Maharashtra", "Gujarat"].map((name) => ({
    name,
    color: palette[rand(0, palette.length - 1)],
    ai: rand(85, 98),
    uptime: rand(90, 99),
    happiness: rand(70, 95),
  }))
  return NextResponse.json({ regions })
}
